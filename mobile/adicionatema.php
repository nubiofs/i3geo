<?php
/*
Title: adicionatema.php

Adiciona um tema ao mapa

File: i3geo/mobile/adicionatema.php

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Parameters:

tmpfname - nome do mapfile em uso
*/

error_reporting(E_ALL);
require_once("../classesphp/funcoes_gerais.php");
include_once ("../classesphp/pega_variaveis.php");
include_once("../classesphp/carrega_ext.php");
include("../classesphp/classe_menutemas.php");
include("../ms_configura.php");
?>
<html>
<style>
body
{
	font:14pt arial,helvetica,clean,sans-serif;
	color:rgb(100,100,100);
}
p
{
	font:12pt arial,helvetica,clean,sans-serif;
	color:black;
}
input
{
	font:14pt arial,helvetica,clean,sans-serif;
	color:black;
	cursor:pointer;
	background-color:white;
}
h1
{
	font:16pt arial,helvetica,clean,sans-serif;
	color:brown;
}
</style>
<body>
<form id='f' action='adicionatema.php?' method='get'>
	<input type='hidden' name='tmpfname' value='<?php echo $tmpfname; ?>' />
	<input id='tipo' type=hidden name='tipo' value='retorno' />
	<input id='grupo' type=hidden name='grupo' value='' />
	<input id='subgrupo' type=hidden name='subgrupo' value='' />
	<input id='tid' type=hidden name='tid' value='' />
	<input id='idmenu' type=hidden name='idmenu' value='' />
</form>
<input type='button' value='retorna' style='cursor:pointer;' onclick='retorno()' /><br>
<?php
//
//identifica qual a url do i3geo
//
$protocolo = explode("/",$_SERVER['SERVER_PROTOCOL']);
$protocolo = $protocolo[0] . '://'.$_SERVER['SERVER_NAME'] .":". $_SERVER['SERVER_PORT'];
$urli3geo = str_replace("/mobile/adicionatema.php","",$protocolo.$_SERVER["PHP_SELF"]);
if ($tipo == "listatemas")
{
	$m = new Menutemas("","",$locsistemas,$locaplic,$menutemas,$urli3geo,$editores);
	$r = $m->pegaListaDeTemas($grupo,$subgrupo,$idmenu);
	echo "<h1>Escolha o tema:</h1>";
	foreach($r as $l)
	{
		echo "<input type='radio' onclick='adicionatema(\"".$l["tid"]."\")' />".$l["nome"]."<br>";
	}
}
if($tipo == "adicionatema")
{
	include("../classesphp/classe_mapa.php");
	$m = new Mapa($tmpfname);
	$m->adicionaTema($tid,$locaplic);
	$m->salva();
	$urln = "mobile.php?tmpfname=".$tmpfname;
	echo "<meta http-equiv='refresh' content='0;url=$urln'>";
}
if ($tipo == "adicionar")
{
	echo "<h1>Escolha o sub-grupo:</h1>";
	$m = new Menutemas("","",$locsistemas,$locaplic,$menutemas,$urli3geo,$editores);
	$menus = $m->pegaListaDeMenus();
	foreach ($menus as $menu)
	{
		if($menu["publicado"] != "NAO")
		{
			$r = $m->pegaListaDeGrupos($menu["idmenu"],"","sim");
			for($rid=0;$rid<count($r);$rid++)
			{
				$g = $r[$rid];
				echo $g["nome"]."<br>";
				$sub = $g["subgrupos"];
				for($sid=0;$sid<count($sub);$sid++)
				{
					$s = $sub[$sid];
					echo "<input type='radio' onclick='listatemas(\"".$rid."\",\"".$sid."\",\"".$menu["idmenu"]."\")' /><span style='color:gray;font-size:12pt;'>".$s["nome"]."</span><br>";
				}
			}
		}
	}
}
?>
<input type='button' value='retorna' style='cursor:pointer;' onclick='retorno()' /><br>
</body>
<script>
function retorno()
{
	document.getElementById('tipo').value='retorno';
	document.getElementById('f').action = 'mobile.php';
	document.getElementById('f').submit();
}
function listatemas(grupo,sub,menu)
{
	document.getElementById("tipo").value = "listatemas";
	document.getElementById("grupo").value = grupo;
	document.getElementById("subgrupo").value = sub;
	document.getElementById("idmenu").value = menu;
	document.getElementById('f').submit();	
}
function adicionatema(tid)
{
	document.getElementById("tipo").value = "adicionatema";
	document.getElementById("tid").value = tid;
	document.getElementById('f').submit();	
}
</script>
</html>