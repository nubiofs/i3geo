<?php
include_once(dirname(__FILE__)."/../../admin/php/login.php");
$funcoesEdicao = array(
		"LISTARQUIVOS",
		"LISTADRIVES"
);
if(in_array(strtoupper($funcao),$funcoesEdicao)){
	if(verificaOperacaoSessao("admin/html/editormapfile") == false){
		//se nao estiver logado permite acesso a pasta i3geo/aplicmap/dados
		//localiza a pasta aplicmap/dados
		$d = dirname(__FILE__); //precisa descer ainda
		$d = dirname($d);
		$d = dirname($d)."/aplicmap/dados"; //pasta permitida
		if(strpos($diretorio,$d) === false){
			if(strtoupper($funcao) == "LISTADRIVES"){
				//lista a pasta default
				$retorno = 	array(
					"drives"=>array(
						array("caminho"=>$d,"nome"=>"Dados")
					)
				);
				cpjson($retorno);
			}
		}
	}
}
$retorno = ""; //string que ser&aacute; retornada ao browser via JSON
switch (strtoupper($funcao))
{
/*
Valor: LISTADRIVES

Pega a lista de drives registrados para o usu&aacute;rio atual.

A lista de drives &eacute; definida no ms_configura e permite que o usu&aacute;rio navegue pelos arquivos do servidor.
*/
	case "LISTADRIVES":
		include(dirname(__FILE__)."/../ms_configura.php");
		$retorno = $navegadoresLocais[0];
	break;
/*
Valor: LISTAARQUIVOS*

Lista os arquivos de um diret�rio.
*/
	case "LISTAARQUIVOS":
		$retorno = listaArquivos($diretorio,true);
	break;
}
cpjson($retorno);
?>