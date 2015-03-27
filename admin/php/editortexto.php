<?php
//TODO verificar se e possivel usar menu de contexto
//TODO incluir a lista de itens que podem ser usados em METADATA
//TODO ao salvar um mapfile, atualizar o banco de dados conforme os metadados que o usu�rio pode ter modificado
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
<title>Editor texto</title>

<script src="../../pacotes/codemirror/lib/codemirror.js"></script>
<script src="../../pacotes/codemirror/mode/scribe/scribe.js"></script>
<link rel=stylesheet href="../../pacotes/codemirror/doc/docs.css">
<link rel="stylesheet" href="../../pacotes/codemirror/lib/codemirror.css">
<link rel="stylesheet" href="../../pacotes/codemirror/theme/ambiance.css">
<link rel="stylesheet" href="../../pacotes/codemirror/theme/cobalt.css">
<link rel="stylesheet" href="../../pacotes/codemirror/theme/night.css">
<link rel="stylesheet" href="../../pacotes/codemirror/theme/neo.css">
<link rel="stylesheet" href="../../pacotes/codemirror/theme/elegant.css">
<link rel="stylesheet" type="text/css" href="../html/admin.css">
<style type="text/css">
body {
	margin-left: 10px;
	font-size: 14px;
	margin: auto;
    width: 1100px;
}
.CodeMirror {
	height:500px;
	float: left;
	width: 500px;
}
#selectComboMapfile {
	width:520px;
	text-overflow: ellipsis;
	font-size:	14px;
}
.cm-s-elegant span.cm-builtin{
	color: red;
}
.cm-s-elegant span.cm-keyword.cm-block {
	color: blue;
}
</style>
</head>
<body class=" yui-skin-sam ">
	<div class="" id="divGeral" style="width: 100%;">
		<div id=cabecalhoPrincipal ></div>
		<fieldset>
		Mais detalhes sobre a edi&ccedil;&atilde;o de mapfiles: <a href="http://mapserver.org/mapfile/index.html#mapfile" target="_new">Documenta&ccedil;&atilde;o do Mapserver</a>
		<br><br>
		<form style="width: 98%;" onsubmit="atualizaTextArea()" action="editortexto.php?mapfile=<?php echo $_GET["mapfile"];?>" method=post>
			<input type=submit value="Salvar" />
			<input type=button value="Testar" onclick="testar()" />
			<input type=button value="Testar no i3Geo" onclick="abrirI3geo()" />
			(Salve antes de testar)
		</fieldset>
		<fieldset style="position: relative; float: left; width:500px;margin: 5px;padding:5px;">
		<legend>Editor</legend>

			<?php
			//evita erros removendo caracteres PHP
			if(isset($_POST["texto"])){
				$gravarTexto = $_POST["texto"];
				$_POST["texto"] = "";
			}
			include_once(dirname(__FILE__)."/login.php");
			if(verificaOperacaoSessao("admin/php/editortexto") == false){
				echo "Vc nao pode realizar essa operacao.";exit;
			}
			error_reporting(0);
			$mapfile = $locaplic."/temas/".$_GET["mapfile"].".map";
			if(!file_exists($mapfile))
			{
				echo "Arquivo $mapfile n&atilde;o existe.";exit;
			}
			//remove o cache OGC
			$agora = intval(time() / 1000);
			$nomeMapfileTmp = $dir_tmp."/ogc_".md5($mapfile)."_".$agora.".map";
			$nomeMapfileTmp = str_replace(",","",$nomeMapfileTmp);
			$nomeMapfileTmp = str_replace(" ","",$nomeMapfileTmp);
			chmod($nomeMapfileTmp,0777);
			unlink($nomeMapfileTmp);
			//
			if($_POST["tipo"] == "gravar"){
				$fp = fopen($mapfile,"w");
				if($fp == false){
					echo "<span style=color:red <b>N&atilde;o foi poss&iacute;vel salvar o arquivo. Verifique as permiss&otilde;es ou se h&aacute; algum erro no mapfile</b></span><br><br>";
				}
				else{
					fwrite($fp,$gravarTexto);
				}
				fclose($fp);
			}
			?>

			
			<div style=float:left; >
			Estilo: <select onchange="mudaEstilo(this.value)">
				<option value=elegant >Elegant</option>
				<option value=ambiance >Ambiance</option>
				<option value=cobalt >Cobalt</option>
				<option value=night >Night</option>
				<option value=neo >Neo</option>
			</select>
			<input type=button value="+ extender" onclick="editorCM.setSize('1100px')" />
			<input type=button value="- reduzir" onclick="editorCM.setSize('500px')" />
			</div>

			<br><br>
			<?php
			echo "<TEXTAREA id=editor name=texto cols=100 rows=20 style='width:500px;float:left;height:500px'>";
			echo file_get_contents($mapfile);
			echo "</TEXTAREA>";
			?>
			<br><br>

Ctrl+a - Seleciona tudo<br>
Ctrl+d - Apaga a linha<br>
Ctrl-z - Desfazer<br>
Ctrl-Up - Sobe<br>
Alt-left - In�cio da linha<br>

			
			</fieldset>
			
			<fieldset style="position: relative; float: left; width:520px;margin: 5px;padding:10px;left:10px;">
			<legend>Mapfile em edi&ccedil;&atilde;o</legend>
			<div id=filtroDeLetras ></div>
			<div id="comboMapfiles" >Aguarde...</div>
			<?php
			$mapfile = str_replace("\\","/",$mapfile);

			echo "<iframe id='mapaPreview' src='../../mashups/openlayers.php?nocache=sim&DESLIGACACHE=sim&controles=navigation,panzoombar,scaleline,mouseposition&botoes=identifica&largura=450&fundo=".$mapfile."&temas=".$mapfile."' cols=100 rows=20 style='position:relative;top:2px;overflow:hidden;width:525px;height:500px;border:1px solid gray;'>";
			echo "</iframe>";
			echo "<input type=hidden name=tipo value=gravar />";

			if(!@ms_newMapObj($mapfile)){
				echo "<span style=color:red <b>N&atilde;o foi poss&iacute;vel criar o mapa. Verifique as permiss&otilde;es ou se h&aacute; algum erro no mapfile</b></span><br><br>";
			}
			else{
				$mapa = ms_newMapObj($mapfile);
				$n = $mapa->numlayers;
				echo "<br>Ajudante de cores RGB: <input type=text value='clique' size=10 id='corrgb' onclick=\"i3GEO.util.abreCor('','corrgb','rgbSep')\" />";
				echo "<br><br>Colunas dos layers:<br><br>";
				for($i=0;$i<$n;$i++){
					if(@$mapa->getlayer($i)){
						$l = $mapa->getlayer($i);
						echo $l->name.": ".(implode(",",pegaItens($l)))."<br><br>";
					}
					else{
						echo "<span style=color:red <b>N&atilde;o foi poss&iacute;vel criar o LAYER {$l->name}. Verifique as permiss&otilde;es ou se h&aacute; algum erro no mapfile</b></span><br><br>";
					}
				}
			}
			?>
			</fieldset>
		</form>
	</div>
	<script type="text/javascript" src="../js/core.js"></script>
	<script src="../../classesjs/classe_util.js" type="text/javascript"></script>
	<script>
i3GEO.configura = {locaplic: "../../"};


cabecalhoGeral("cabecalhoPrincipal","","../html/");
core_listaDeLetras("filtroDeLetras","filtraLetra",true);

var editorCM = CodeMirror.fromTextArea(document.getElementById("editor"), {
	mode: 'scribe',
	tabMode: 'indent',
	lineNumbers: true,
	theme: "elegant"
});

function getSelectedRange() {
	return { from: editorCM.getCursor(true), to: editorCM.getCursor(false) };
}

function mudaEstilo(novo){
	editorCM.setOption('theme',novo)
}

function atualizaTextArea(){
	document.getElementById("editor").value = editorCM.getValue();
}
function filtraLetra(letra) {
	letraAtual = letra;
	if (letra == "Todos") {
		letra = "";
	}
	i3GEO.util.insereCookie("I3GEOletraAdmin", letra);
	core_pegaMapfiles("comboMapfiles()", letra);
}
function comboMapfiles(){
	var n = $mapfiles.length,
		i,ins;
	ins = "<select size=8 id='selectComboMapfile' onchange='mudaMapfile(this)'><option value=''>Edite outro mapfile</option>";
	for(i=0;i<n;i++){
		if($mapfiles[i].extensao === "map"){
			ins += "<option title='"+$mapfiles[i].nome+"' value='"+$mapfiles[i].codigo+"'>"+$mapfiles[i].codigo+" - "+$mapfiles[i].nome+"</optiona>";
		}
	}
	ins += "</select>";
	$i("comboMapfiles").innerHTML = ins;
	$i("selectComboMapfile").value = "<?php echo $_GET["mapfile"];?>";
};
core_pegaMapfiles("comboMapfiles()","","");
function mudaMapfile(obj){
	if(obj.value != ""){
		window.location.href = "editortexto.php?mapfile="+obj.value;
	}
}
function testar(){
	window.open("../../testamapfile.php?map=<?php echo $_GET["mapfile"]; ?>");
}
function abrirI3geo(){
	window.open("../../ms_criamapa.php?layers=<?php echo $_GET["mapfile"]; ?>");
}
</script>