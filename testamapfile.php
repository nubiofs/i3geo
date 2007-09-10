<html>
<head>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
</head>
<script>
function roda()
{
	window.location.href = "?map="+document.getElementById("nomemap").value;
}
</script>
<body >
<form action="testamapfile.php" method="post" id=f >
  Nome do arquivo map (deve estar no diret�rio 'temas'):<br><br>
  <input id=nomemap class=digitar type="file" size=20 >
  <input id=map type="hidden" value="" name="map">
  <input type="button" onclick="roda()" class=executar value="Testar" size=10 name="submit">
</form>
</body>
</html>
<?php
/*
Title: Testa um mapfile.

Permite testar um mapfile espec�fico existente no diret�rio "temas".

File: testamapfile.php

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Colabora��o: Luis Henrique Weirich de Matos

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

About: Exemplo

testamapfile.php?map=bioma

Parameters:

map - nome do mapfile que ser� aberto. O arquivo � procurado no caminho indicado e no diret�rio i3geo/temas
*/
include("ms_configura.php");
include("classesphp/funcoes_gerais.php");
require_once("classesphp/pega_variaveis.php");
include_once ("classesphp/carrega_ext.php");
//
//carrega o phpmapscript
//
if (!function_exists('ms_GetVersion'))
{
	if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
	{
		if(!@dl('php_mapscript_48.dll'))
		dl('php_mapscript.dll');
	}
	else
	{dl('php_mapscript.so');}
}
if (isset($map) && $map != "")
{
	$tema = "";
	$map = str_replace("\\","/",$map);
	$map = basename($map);
	if (file_exists('temas/'.$map))
	{$tema = 'temas/'.$map;}
	if (file_exists('temas/'.$map.'.map'))
	{$tema = 'temas/'.$map.".map";}
	echo "<br>Testando: $tema<pre>";
	if ($tema != "")
	{
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$mapa = ms_newMapObj("aplicmap/geral1windows.map");}
		else
		{$mapa = ms_newMapObj("aplicmap/geral1.map");}
		$nmapa = ms_newMapObj($tema);
		$temasn = $nmapa->getAllLayerNames();
		foreach ($temasn as $teman)
		{
			$layern = $nmapa->getLayerByName($teman);
			$layern->set("status",MS_DEFAULT);
			ms_newLayerObj($mapa, $layern);
		}
		$objImagem = $mapa->draw();
		$nomer = ($objImagem->imagepath).nomeRandomico()."teste.png";
		$objImagem->saveImage($nomer);
		$nomer = ($objImagem->imageurl).basename($nomer);
		echo "<img src=".$nomer." />"; 
			
	}
	else
	{echo "<br>Arquivo n�o existe";}
}
?>