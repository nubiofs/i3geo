<?php
/*
 * Licenca:
 *
 * GPL2
 *
 * i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet
 *
 * Direitos Autorais Reservados (c) 2006 Edmar Moretti
 * Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com
 *
 * Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
 * e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
 * GNU conforme publicada pela Free Software Foundation;
 *
 * Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
 * por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
 * de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
 * Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
 * Voc&ecirc; deve ter recebido uma copia da Licen&ccedil;a P&uacute;blica Geral do
 * GNU junto com este programa; se n&atilde;o, escreva para a
 * Free Software Foundation, Inc., no endere&ccedil;o
 * 59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
 */
error_reporting ( 0 );
//
// pega as variaveis passadas com get ou post
//

include_once (dirname ( __FILE__ ) . "/../../../admin/php/login.php");
$funcoesEdicao = array (
		"LISTA",
		"ADICIONAR"
);
if (in_array ( strtoupper ( $funcao ), $funcoesEdicao )) {
	if (verificaOperacaoSessao ( "admin/html/editormapfile" ) === false) {
		header ( "HTTP/1.1 403 Vc nao pode realizar essa operacao" );
		exit ();
	}
}
include (dirname ( __FILE__ ) . "/../../../admin/php/conexao.php");

// $id_mapa = $_POST["id_mapa"];
// testaSafeNumerico([$id_mapa]);

$funcao = strtoupper ( $funcao );
switch ($funcao) {
	case "ADICIONAR" :
		$codigo = $_POST ["codigo"];
		$codigo = str_replace ( " ", "", removeAcentos ( $codigo ) );
		$codigo = str_replace ( ".", "", $codigo );
		$codigo = strip_tags ( $codigo );
		$codigo = htmlspecialchars ( $codigo, ENT_QUOTES );
		$arq = $locaplic . "/temas/" . $codigo . ".map";
		if ($codigo == "" || file_exists ( $arq )) {
			header ( "HTTP/1.1 400 arquivo ja existe" );
			exit ();
		}
		$novo = adicionar ( $locaplic, $_POST ["link_tema"], $codigo, $_POST ["acessopublico"], $_POST ["metaestat"], $_POST ["titulo"], $_POST ["desc_tema"], $_POST ["tituloEN"], $_post ["tituloES"], $dbhw );
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		retornaJSON ( array (
				"codigo" => $codigo
		) );
		exit ();
		break;
	case "EXCLUIR" :
		$codigo = $_POST ["codigo"];
		$codigo = str_replace ( " ", "", removeAcentos ( $codigo ) );
		$codigo = str_replace ( ".", "", $codigo );
		$codigo = strip_tags ( $codigo );
		$codigo = htmlspecialchars ( $codigo, ENT_QUOTES );
		$retorna = excluir ( $codigo, $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($retorna === false) {
			header ( "HTTP/1.1 400 $retorna" );
			exit ();
		}
		retornaJSON ( array (
				"codigo" => $codigo
		) );
		exit ();
		break;
	case "LISTA" :
		$retorna = lista ( $dbh );
		$dbhw = null;
		$dbh = null;
		if ($retorna === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		retornaJSON ( $retorna );
		exit ();
		break;
	case "LIMPACACHE" :
		$mapfile = $locaplic."/temas/".$_POST["codigo"].".map";
		if(!file_exists($mapfile)){
			header ( "HTTP/1.1 403 arquivo nao existe" );
			exit ();
		}
		$mapa = ms_newMapObj($mapfile);
		$nomes = $mapa->getalllayernames();
		//$cachedir e $dir_tmp vem de ms_configura.php
		if($cachedir != ""){
			$d = $cachedir;
		}
		else{
			$d = $dir_tmp."/cache";
		}
		foreach($nomes as $nome){
			$nome = str_replace(".","",$nome);
			$nome = strip_tags($nome);
			$nome = htmlspecialchars($nome, ENT_QUOTES);
			$dirs[] = $d."/".$nome;
			$dirs[] = $d."/googlemaps/".$nome;
			$dirs[] = $d."/wmts/".$nome;
			foreach($dirs as $dir){
				rrmdir($dir);
			}
		}
		retornaJSON("ok");
		exit ();
		break;
}
cpjson ( $retorno );
function excluir($codigo, $dbhw) {
	global $locaplic, $esquemaadmin;
	// pega o id do tema
	// se o mapfile nao estiver registrado, $id sera vazio
	$dados = pegaDados ( "SELECT id_tema from " . $esquemaadmin . "i3geoadmin_temas WHERE codigo_tema = '" . $codigo . "'", $dbhw, false );
	if (count ( $dados ) > 0) {
		$id = $dados [0] ["id_tema"];
	} else {
		$id = "";
	}
	// verifica se o tema esta em uso
	if ($id != "") {
		$r = pegaDados ( "SELECT id_tema from " . $esquemaadmin . "i3geoadmin_n3 where id_tema ='$id'", $dbhw, false );
		if (count ( $r ) > 0) {
			return "o tema e utilizado em algum subgrupo";
		}
		$r = pegaDados ( "SELECT id_tema from " . $esquemaadmin . "i3geoadmin_raiz where id_tema ='$id'", $dbhw, false );
		if (count ( $r ) > 0) {
			return "o tema e utilizado em alguma raiz";
		}
	}
	if (!file_exists ( "$locaplic/temas/" . $codigo . ".map" )) {
		return "o arquivo mapfile nao existe";
	}
	//verifica se pode escrever
	$handle = fopen("$locaplic/temas/" . $codigo . ".map", "r+");
	if($handle == false){
		return "o arquivo nao pode ser apagado verifique as permissoes";
	}
	fclose($handle);
	//tenta excluir do banco
	$resultado = i3GeoAdminExclui ( $esquemaadmin . "i3geoadmin_temas", "id_tema", $id, $dbhw, true );
	if ($resultado === false) {
		return "nao foi possivel excluir do banco de dados";
	}
	unlink("$locaplic/temas/" . $codigo . ".map");
	return true;
}
function adicionar($locaplic, $link_tema, $codigo, $acessopublico, $metaestat, $titulo, $desc_tema, $tituloEN, $tituloES, $dbhw) {
	global $convUTF, $esquemaadmin;
	$arq = $locaplic . "/temas/" . $codigo . ".map";
	if (empty ( $acessopublico ) || $acessopublico == "on") {
		$acessopublico = "SIM";
	} else {
		$acessopublico = "SIM";
	}
	$tipoLayer = "line";
	$dados [] = "MAP";
	$dados [] = "SYMBOLSET ../symbols/simbolosv6.sym";
	$dados [] = 'FONTSET   "../symbols/fontes.txt"';
	$dados [] = "LAYER";
	$dados [] = '	NAME "' . $codigo . '"';
	$dados [] = '	TEMPLATE "none.htm"';
	if (! empty ( $metaestat ) && $metaestat == "SIM") {
		$dados [] = '	CONNECTIONTYPE POSTGIS';
		$tipoLayer = "polygon";
	}
	$dados [] = "	TYPE " . $tipoLayer;
	$dados [] = '	DATA ""';
	$dados [] = '	CONNECTION ""';
	$dados [] = '	STATUS DEFAULT';
	$dados [] = '	METADATA';
	$dados [] = '		TEMA "' . $titulo . '"';
	$dados [] = '		CLASSE "SIM"';
	$tipoa_tema = "";
	if (! empty ( $metaestat ) && $metaestat == "SIM") {
		$dados [] = '		METAESTAT "SIM"';
		// para marcar no banco de dados de administracao
		$tipoa_tema = "META";
	}
	$dados [] = '		permiteogc "' . $acessopublico . '"';
	$dados [] = '		permitedownload "' . $acessopublico . '"';
	$dados [] = '		permitekml "' . $acessopublico . '"';
	$dados [] = '		permitekmz "' . $acessopublico . '"';
	$dados [] = '	END';
	$dados [] = '    CLASS';
	$dados [] = '        NAME ""';
	$dados [] = '        STYLE';
	$dados [] = '        	COLOR 0 0 0';
	$dados [] = '        	SIZE 12';
	$dados [] = '        END';
	$dados [] = '    END';
	$dados [] = "END";
	$dados [] = "END";

	// abre o arquivo para ver se nao deu erro antes de adicionar ao banco
	$fp = fopen ( $arq, "w" );
	if ($fp === false) {
		return false;
	}
	if ($convUTF != true) {
		$titulo = utf8_decode ( $titulo );
		$desc_tema = utf8_decode ( $desc_tema );
	}
	try {
		$dataCol = array (
				"link_tema" => $link_tema,
				"kml_tema" => $acessopublico,
				"kmz_tema" => $acessopublico,
				"ogc_tema" => $acessopublico,
				"download_tema" => $acessopublico,
				"desc_tema" => $desc_tema,
				"tipoa_tema" => $tipoa_tema,
				"tags_tema" => '',
				"nome_tema" => $titulo,
				"codigo_tema" => $codigo,
				"it" => "",
				"es" => $tituloES,
				"en" => $tituloEN
		);
		i3GeoAdminInsert ( $dbhw, "i3geoadmin_temas", $dataCol );
		// salva o arquivo mapfile
		foreach ( $dados as $dado ) {
			fwrite ( $fp, $dado . "\n" );
		}
		fclose ( $fp );
		return $retorna;
	} catch ( PDOException $e ) {
		return false;
	}
}
function lista($dbh, $filtro = "") {
	global $locaplic, $esquemaadmin;
	$arquivos = array ();
	if (is_dir ( $locaplic . "/temas" )) {
		if ($dh = opendir ( $locaplic . "/temas" )) {
			$extensao = "";
			while ( ($file = readdir ( $dh )) !== false ) {
				if (! stristr ( $file, '.map' ) === FALSE) {
					$file = str_replace ( ".map", "", $file );
					$arquivos [] = array (
							"nome" => $file
					);
				}
			}
		}
		closedir ( $dh );
	}
	sort ( $arquivos );

	//
	// pega o nome de cada tema filtrando a listagem se for o caso
	//
	$regs = pegaDados ( "select * from " . $esquemaadmin . "i3geoadmin_temas ", $dbh, false );

	$nomes = array ();
	$ids = array ();
	foreach ( $regs as $reg ) {
		$nomes [$reg ["codigo_tema"]] = $reg ["nome_tema"];
		$ids [$reg ["codigo_tema"]] = $reg ["id_tema"];
	}
	$lista = array ();

	foreach ( $arquivos as $arq ) {
		$arq = $arq ["nome"];
		$nT = explode ( ".", $arq );
		$n = $nomes [$nT [0]];
		if (! $n) {
			$n = "";
		}
		$id = $ids [$nT [0]];
		if (! $id) {
			$id = "";
		}
		$imagem = "";
		if (file_exists ( $locaplic . "/temas/miniaturas/" . $arq . ".map.mini.png" )) {
			$imagem = $arq . ".map.mini.png";
		}

		if ($_POST ["checaNomes"] == "true") {
			if (file_exists ( $locaplic . "/temas/" . $arq . ".map" )) {
				$handle = fopen ( $locaplic . "/temas/" . $arq . ".map", "r" );
				while ( ! feof ( $handle ) ) {
					$linha = fgets ( $handle );
					if (stripos ( $linha, "'TEMA'" ) !== false || stripos ( $linha, '"TEMA"' ) !== false) {
						$ntema = str_replace ( array (
								"'TEMA'",
								'"TEMA"',
								"'tema'",
								'"tema"'
						), "", $linha );
						$ntema = trim ( str_replace ( array (
								"'",
								'"'
						), "", $ntema ) );
						if ($n != $ntema && $n != utf8_decode ( $ntema ) && $n != "") {
							$n .= "<span style=color:red;margin-left:5px >" . utf8_decode ( $ntema ) . "</span>";
						}
						break;
					}
				}
				fclose ( $handle );
			}
		}
		if ($_POST ["checaNames"] == "true") {
			if (file_exists ( $locaplic . "/temas/" . $arq . ".map" )) {
				$handle = fopen ( $locaplic . "/temas/" . $arq . ".map", "r" );
				// deve buscar dentro de LAYER pois pode haver simbolos antes
				$elayer = false;
				while ( ! feof ( $handle ) ) {
					$linha = trim ( fgets ( $handle ) );
					if (stripos ( $linha, "LAYER" ) === 0) {
						$elayer = true;
					}
					if ($elayer == true && stripos ( $linha, "NAME" ) === 0) {
						$ntema = ltrim ( $linha, "NAMEname" );
						$ntema = trim ( str_replace ( array (
								"'",
								'"'
						), "", $ntema ) );
						if ($arq != $ntema) {
							$n .= "<img style='margin-left:3px;' src='../imagens/face-sad.png' title='Nome do LAYER diferente do nome do arquivo' />";
						}
						break;
					}
				}
				fclose ( $handle );
			}
		}
		if (isset ( $filtro ) && $filtro != "" && $n != "") {
			$lista [] = array (
					"id_tema" => $id,
					"nome" => $n,
					"codigo" => $arq,
					"imagem" => $imagem,
					"extensao" => $extensao
			);
		}
		if (! isset ( $filtro ) || $filtro == "") {
			$lista [] = array (
					"id_tema" => $id,
					"nome" => $n,
					"codigo" => $arq,
					"imagem" => $imagem,
					"extensao" => $extensao
			);
		}
	}
	return $lista;
}
function rrmdir($dir) {
	if (is_dir($dir)) {
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != "." && $object != "..") {
				if (filetype($dir."/".$object) == "dir") {
					rrmdir($dir."/".$object);
				} else {
					$object = str_replace(".png","",$object).".png";
					chmod($dir."/".$object,077);
					unlink($dir."/".$object);
				}
			}
		}
		reset($objects);
		//rmdir($dir);
	}
}
?>
