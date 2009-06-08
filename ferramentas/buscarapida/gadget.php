<?php
include_once("../../classesphp/pega_variaveis.php");
?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
      <link rel="stylesheet" type="text/css" href="../../css/ferramentas.css">
      <link rel="stylesheet" type="text/css" href="../../css/botoes.css">
  	<title></title>
  </head>
  <body class="yui-skin-sam;" style="overflow:auto;">
<div style="top:5px;left:1px;display:block;width:90%;"  id="resultado" >Aguarde...</div>
	<script src="../../pacotes/cpaint/cpaint2.inc.compressed.js" type="text/javascript"></script>
	<script language="JavaScript" type="text/javascript" src="../funcoes.js"></script>
    <script language="JavaScript" type="text/javascript" src="index.js"></script>

<script type="text/javascript">


var mapaLugar = function(wkt,layer,gid,nm)
{
	var re = new RegExp("POLYGON", "g")
	wkt = wkt.replace(re,"")
	wkt = wkt.split("(")[2].split(")")[0]
	wkt = wkt.split(",");
	x = new Array();
	y = new Array();
	for (w=0;w<wkt.length; w++)
	{
 		temp = wkt[w].split(" ");
 		x.push(temp[0])
 		y.push(temp[1])
	}
	x.sort(sortNumber)
	xMin = x[0]
	xMax = x[(x.length)-1]
	y.sort(sortNumber)
	yMin = y[0]
	yMax = y[(y.length)-1]
	var ext = xMin+" "+yMin+" "+xMax+" "+yMax
	var url = "<?php echo $locaplic;?>/ms_criamapa.php?srs_wms=epsg:4291&image_wms=image/png&versao_wms=1.1.1"
	url += "&url_wms=http://mapas.mma.gov.br/webservices/geonameswms.php?gid="+gid+"&";
	url += "&layer_wms="+layer+"&style_wms=default"
	url += "&nome_wms="+nm+" - "+layer
	url += "&mapext="+ext
	url += "&interface=googlemaps.phtml"
	window.open(url)
}
i3GEO.buscaRapida.funcaoZoom = mapaLugar
i3GEObuscaRapida.inicia("<?php echo $palavra;?>","<?php echo $locaplic;?>")
  </script>


  </body>
</html>