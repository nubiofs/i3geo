<?php
define ( "ONDEI3GEO", "../.." );
include (dirname ( __FILE__ ) . "/../../ms_configura.php");
include_once (dirname(__FILE__)."/../../classesphp/sani_request.php");
$id_menu = filter_var ( $_GET ["id_menu"], FILTER_SANITIZE_NUMBER_INT );
$nome_menu = filter_var ( $_GET ["nome_menu"], FILTER_SANITIZE_STRING );
// pega a extensao geografica
if ($ogcwsmap == "") {
	$ogcwsmap = $locaplic . "/aplicmap/ogcws.map";
}
$map = ms_newMapObj ( $ogcwsmap );
$mapext = $map->extent->minx . "," . $map->extent->miny . "," . $map->extent->maxx . "," . $map->extent->maxy;
//error_reporting ( 0 );
include ONDEI3GEO."/init/head.php";
//echo ms_GetVersionInt();exit;
?>
<link rel='stylesheet' type='text/css' href='../index.css'>
<body style="padding-top: 60px;" id="topo">
	<nav id="navbar" class="navbar navbar-default navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
					data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="../../init/index.php?home="><?php echo $mensagemInicia;?> <i
					class="fa fa-home fa-1x"></i></a>
			</div>
		</div>
	</nav>
    <div class="container-fluid migalha">
        <div class="row">
            <div class="btn-group btn-breadcrumb">
                <a class="btn btn-default" href="../../init/index.php?home=">i3Geo</a>
                <a class="btn btn-default" href="../index.php">OGC</a>
                <a class="btn btn-default" style="pointer-events: none"><?php echo $nome_menu ; ?></a>
            </div>
        </div>
    </div>

	<div class="container">
		<div class="row center-block">
			<div class="col-md-12">
				<div class="well" id="corpo">
					<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>
				</div>
			</div>
		</div>
	</div>

<?php include(ONDEI3GEO."/ogc/templates/modal.php");?>
<?php include(ONDEI3GEO."/ogc/templates/templatelista.php");?>
<?php include(ONDEI3GEO."/ogc/templates/templatecamadas.php");?>
<?php include(ONDEI3GEO."/ogc/templates/templatelinksogc.php");?>
<?php include(ONDEI3GEO."/ogc/templates/templatelinksdownload.php");?>

<script src='<?php echo ONDEI3GEO; ?>/ogc/headjs.php'></script>
<script src='index.js'></script>
<script src='<?php echo ONDEI3GEO; ?>/ogc/dicionario.js'></script>
<script>
	$(document).ready(function(){
		ogc.menu.id_menu = "<?php echo $id_menu ?>";
		ogc.menu.nome_menu = "<?php echo $nome_menu ?>";

		i3GEO.configura = {"locaplic" : "../..","sid": ""};
		var servico = window.location.href.split("/ogc")[0]+"/ogc.php?";
		tradLinks = i3GEO.idioma.objetoIdioma(ogc.dicionario);
		tradLinks["servico"] = servico;
		tradLinks["url"] = window.location.href.split("#")[0];
		tradLinks["url"] = tradLinks["url"].split("?")[0];
		tradLinks["urli3geo"] = window.location.href.split("/ogc")[0];
		tradLinks["mapext"] = "<?php echo $mapext;?>";
		ogc.menu.init($("#corpo"));
	});
</script>
</body>
</html>
