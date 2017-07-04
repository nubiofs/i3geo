<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Category" content="i3Geo Mapa interativo MMA geoprocessamento sig mobile">
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
<title>i3GEO - OpenLayers</title>
<script src="../pacotes/ol3/ol.js"></script>
<script src="../js/i3geo.js"></script>
<!-- lista com os links que serao mostrados na guia ferramentas -->
<script src="../js/listaDeFerramentas.js"></script>
<!-- configuracoes default tipo pode ser OL (openLayers) ou GM (googlemaps) -->
<script src="../interface/config.php?tipo=OL"></script>
<script src="../admin1/js/core.js"></script>
<link rel="stylesheet" type="text/css" href="../pacotes/ol3/ol.css">
<link rel="stylesheet" type="text/css" href="../pacotes/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../pacotes/bootstrap-material-design/dist/css/bootstrap-material-design.min.css">
<!-- <link rel="stylesheet" type="text/css" href="../pacotes/bootstrap-accessibility-plugin/plugins/js/bootstrap-accessibility.min.js"> -->
<link rel="stylesheet" type="text/css" href="../css/default.css">
<style>
.ol-attribution img {
	display: none;
}

.ol-attribution.ol-uncollapsible {
	height: 2.1em;
	right: 24px;
	background: none;
	margin-bottom: 15px;
}
.foraDoMapa + span > span {
	background-color: yellow;
}
</style>
</head>
	<!-- As palavras entre {{{}}} sao utilizadas para a traducao. Veja i3geo/js/dicionario.js
		Marque com data-traduzir="true" os elementos que deverao passar pelo tradutor
	-->
<body id="i3geo" style='background: white;'>
	<!-- inclui o nome do usuario logado
	<div id="i3GEONomeLogin"
		style="position: absolute; left: 10px; top: 2px; font-size: 11px; z-index: 50000"></div>
	-->
	<!-- Aqui vai o mapa. O div a ser inserido e padronizado e depende da interface usar openlayers ou googlemaps
	Se os estilos width e height nao estiverem definidos, o tamanho do mapa abrangera a tela toda
	-->
	<div id="mapai3Geo" >
	</div>
	<!-- aqui sera incluida a escala numerica. E necessario ter o id=i3GEOescalanum para que o valor seja atualizado-->
	<form class="escalanumerica hidden-xs" onsubmit="javascript:i3GEO.navega.aplicaEscala($i('i3GEOescalanum').value);return false;">
		<input id='i3GEOescalanum' type='text' name='' value='' size='10' title=''  >
	</form>

	<!-- aqui sera incluido o gadget que mostra a coordenada geografica da posicao do mouse -->
	<div class="localizarxy fundoRodape hidden-xs hidden-sm" >
		<div class="i3GeoMascaraCoord" style="display: block;">
			<select onchange="javascript:i3GEO.coordenadas.mudaTipo(this,'localizarxy');" class="i3geoCoordenadasComboTipo">
				<option>DMS:</option>
				<option value="janela">janela</option>
				<option value="geoProj">DMS</option>
				<option value="dd">Dec. de grau</option>
				<option value="geohash">GeoHash</option>
				<option value="policonicaSad69">Polic SAD-69</option>
				<option value="utmSad69Proj">UTM Sad-69</option>
				<option value="utmSirgas2000Proj">UTM Sirgas</option>
			</select>
		</div>
		<div class="i3GeoMascaraCoord" id="localizarxygeoProj" style="display: block;position: absolute;top: 0px;left: 60px;">
			X:
			<input name="" value="-00" size="3" title="grau" id="localizarxygeoProjxg" type="text">
			<input name="" value="00" size="2" title="minuto" id="localizarxygeoProjxm" type="text">
			<input name="" value="00.00" size="5" title="segundo" id="localizarxygeoProjxs" type="text">
			Y:
			<input name="" value="-00" size="3" title="grau" id="localizarxygeoProjyg" type="text">
			<input name="" value="00" size="2" title="minuto" id="localizarxygeoProjym" type="text">
			<input name="" value="00.00" size="5" title="segundo" id="localizarxygeoProjys" type="text">
			<img class="ticfind" style="margin-left:8px;" title="zoom" onclick="i3GEO.coordenadas.zoomPontoGeo()" src="../imagens/branco.gif">
		</div>
		<div id="localizarxydd" class="i3GeoMascaraCoord" style="display: none;position: absolute;top: 0px;left: 60px;">
			X: <input name="" value="00" size="12" title="X" id="localizarxyddX" type="text">
			Y: <input name="" value="00" size="12" title="Y" id="localizarxyddY" type="text">
		</div>
		<div id="localizarxygeohash" class="i3GeoMascaraCoord" style="display: none;position: absolute;top: 0px;left: 60px;">
			GeoHash <input name="" value="00" size="12" title="Cod" id="localizarxygeohashCodigo" type="text">
			<img class="ticfind" style="margin-left:8px;" title="zoom" onclick="i3GEO.coordenadas.geohash.zoomCodigo('localizarxygeohashCodigo')" src="../imagens/branco.gif">
		</div>
		<div id="localizarxypoliconicaSad69" class="i3GeoMascaraCoord" style="display: none;position: absolute;top: 0px;left: 60px;">
			X: <input name="" value="00" size="12" title="X" id="localizarxypoliconicaSad69X" type="text">
			Y: <input name="" value="00" size="12" title="Y" id="localizarxypoliconicaSad69Y" type="text">
		</div>
		<div id="localizarxyutmSad69Proj" class="i3GeoMascaraCoord" style="display: none;position: absolute;top: 0px;left: 60px;">
			X: <input name="" value="00" size="12" title="X" id="localizarxyutmSad69ProjX" type="text">
			Y: <input name="" value="00" size="12" title="Y" id="localizarxyutmSad69ProjY" type="text">
			Zn: <input name="" value="--" size="2" title="Zona" id="localizarxyutmSad69ProjZN" type="text">
		</div>
		<div id="localizarxyutmSirgas2000Proj" class="i3GeoMascaraCoord" style="display: none;position: absolute;top: 0px;left: 60px;">
			X: <input name="" value="00" size="12" title="X" id="localizarxyutmSirgas2000ProjX" type="text">
			Y: <input name="" value="00" size="12" title="Y" id="localizarxyutmSirgas2000ProjY" type="text">
			Zn: <input name="" value="--" size="2" title="Zona" id="localizarxyutmSirgas2000ProjZN" type="text">
		</div>
	</div>
	<!-- barra de icones de navegacao -->
	<div class="ol-i3GEOcontrols ol-control" data-traduzir="true">
		<button title="{{{d2t}}}" onclick="i3GEO.Interface.zoom2ext(i3GEO.parametros.extentTotal)" style="float: left;">
			<img style="width:20px;" src="../imagens/gisicons/projection.png">
		</button>
		<button onclick="i3GEO.Interface.zoomli()" style="float: left;">
			<img style="width:20px;" src="../imagens/gisicons/zoom-region.png">
		</button>
		<br>
		<button title="{{{volta}}}" onclick="i3GEO.navega.extensaoAnterior()" style="float: left;">
			<img style="width:16px;" src="../imagens/oxygen/16x16/draw-triangle1.png">
		</button>
		<button title="{{{avanca}}}" onclick="i3GEO.navega.extensaoProximo()" style="float: left;">
			<img style="width:16px;" src="../imagens/oxygen/16x16/draw-triangle2.png">
		</button>
		<br>
		<button title="{{{x79}}}" data-template="../interface/templates/ferramentasLink.html" onclick="i3GEO.marcador.inicia(this)" style="float: left;">
			<img style="width:20px;" src="../imagens/gisicons/save1.png">
		</button>
		<button title="{{{d9}}}" onclick="i3GEO.maparef.inicia()" style="float: left;">
			<img style="width:20px;" src="../imagens/gisicons/map-reference.png">
		</button>
	</div>
	<!--barra de progresso que e mostrada conforme as camadas sao desenhadas no mapa. Esse elemento deve ter o id="i3GEOprogressoCamadas" -->
	<div id="i3GEOprogressoCamadas" class="progress" style="display:block;position:absolute;top:0px; height:5px;width:0%;margin:auto;">
		<div class="progress-bar progress-bar-striped active"  role="progressbar" style="width:100%">
		</div>
	</div>
	<!--barra de aguarde id="i3GEObarraAguarde" -->
	<div id="i3GEObarraAguarde" class="progress" style="display:block;position:absolute;top:0px; height:5px;width:0%;margin:auto;">
		<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style="width:100%">
		</div>
	</div>
	<!-- mensagem de copyright -->
	<div id="i3GEOcopyright">i3Geo</div>
	<!-- botoes laterais que abrem guias moveis -->
	<div id="i3GEOguiaMovel" >
		<!-- configuracao para todos os botoes
			data-idconteudo - id do DIV que contem o conteudo da guia e que sera mostrado ao ser clicado
		-->
		<div class="iconesGuiaMovel" data-traduzir="true" style="right:0px;border-radius:4px; padding:2px;cursor: pointer; position: absolute; top: 5px; width: auto; z-index: 5000; background-color: rgba(255,255,255,.4);">
			<!-- ferramentas
				data-idLista - id do DIV dentro de idconteudo que sera utilizado para mostrar as "pastas" que abrem o proximo nivel
				data-idLinks - id do DIV dentro de idconteudo que sera utilizado para mostrar a lista de links que abre cada ferramenta
				data-idMigalha - id do DIV que sera utilizado para mostrar o link de retorno ao nivel anterior
			-->
			<div data-idconteudo="guia8obj" data-idLinks="listaFerramentasLinks" data-idMigalha="migalhaFerramentas" data-idLista="listaFerramentas" onclick="i3GEO.guias.ativa('ferramentas',this)">
				<button title="{{{u15a}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/gisicons/tools.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<!-- temas existentes no mapa
				data-idListaDeCamadas - id onde sera incluida a lista de camadas
				data-idListaFundo - id onde sera incluida a lista de camadas de fundo (mapa base)
				data-verificaAbrangencia - se for uma string, faz a verificacao se a camada esta fora da abrangencia atual do mapa,
					inserindo ou nao a string como uma classe CSS. Pode degradar a performance e depende
					do metadata existente na camada. Deixe vazio para nao ativar a operacao.
			-->
			<div onclick="i3GEO.guias.ativa('temas',this)" data-verificaAbrangencia="" data-idconteudo="guia1obj" data-idListaFundo="listaFundo" data-idListaDeCamadas="listaTemas" style="margin-top: 3px;">
				<button title="{{{g4a}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/layer.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<!-- catalogo de adicao de temas ao mapa
				data-idCatalogo - id do DIV que contem a primeira pagina do catalogo. Esse DIV sera escondido e mostrado conforme o usuario navega pelo catalogo
				data-idMenus - id do DIV que recebera a lista de menus cadastrados no sistema de administracao
				data-idNavegacao - id do DIV que recebera a lista de opcoes apos o usuario clicar em um item do catalogo principal
				data-idMigalha - id do DIV que recebera o link para retorno ao nivel anterior do catalogo

				Variaveis javascript:
				i3GEO.catalogoMenus.IDSMENUS - (array) apenas os menus com idmenu que constem nessa lista serao mostrados. Por default e vazio.
			-->
			<div onclick="i3GEO.guias.ativa('adiciona',this)"  data-idconteudo="guia2obj" data-idMigalha="catalogoMigalha" data-idNavegacao="catalogoNavegacao" data-idCatalogo="catalogoPrincipal" data-idMenus="catalogoMenus" style="margin-top: 3px;">
				<button title="{{{g1a}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/catalogo.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<!-- legenda -->
			<div onclick="i3GEO.guias.ativa('legenda',this)" data-idconteudo="guia4obj" data-idLegenda="legendaHtml" style="margin-top: 3px;">
				<button title="{{{g3}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/legenda.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<div onclick="i3GEO.guias.ativa('dobraPagina',this)" style="margin-top: 3px;">
				<button title="{{{trocaInterface}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/googlemaps.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<!-- Busca -->
			<div onclick="i3GEO.guias.ativa('buscaRapida',this)" data-idconteudo="guia7obj" style="margin-top: 3px;">
				<button class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/gisicons/search.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<div onclick="i3GEO.guias.ativa('identificaBalao',this)" style="margin-top: 3px;" >
				<button title="{{{d7a}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/gisicons/tips.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
			<div onclick="i3GEO.guias.ativa('identifica',this)" style="margin-top: 3px;">
				<button title="{{{d7}}}" class="btn btn-default iconeGuiaMovel" style="box-shadow: none;">
					<img src="../imagens/gisicons/pointer-info.png" style="cursor: pointer; padding: 3px;">
				</button>
			</div>
		</div>
		<!-- veja i3GEO.guias.CONFIGURA -->
		<!-- Os IDs sao definidos no botao que ativa a guia veja: "i3GEOguiaMovel" -->
		<!-- se height nao estiver definido sera utilizada a altura do mapa -->
		<div id="i3GEOguiaMovelMolde" >
			<div id="i3GEOguiaMovelConteudo" >
				<!-- camadas existentes no mapa -->
				<div id='guia1obj' data-traduzir="true" style='display: none;'>
					<div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');"><span class="pull-left">{{{g4a}}}</span>X</div>
					<div class="noprint" >
             			<a href="javascript:void(0)" data-target="#" class="dropdown-toggle" data-toggle="dropdown">
             				{{{opcoes}}}
             				<span class="caret"></span>
              			</a>
              			<ul class="dropdown-menu">
							<li><a onclick="i3GEO.arvoreDeCamadas.atualiza(i3GEO.arvoreDeCamadas.CAMADAS,true)" href="javascript:void(0)" >Refresh</a></li>
							<li><a onclick="i3GEO.arvoreDeCamadas.aplicaTemas('ligartodos')" href="javascript:void(0)" >{{{t3a}}}</a></li>
							<li><a onclick="i3GEO.arvoreDeCamadas.aplicaTemas('desligartodos')" href="javascript:void(0)" >{{{t3b}}}</a></li>
							<li><a onclick="i3GEO.arvoreDeCamadas.dialogo.excluir()" href="javascript:void(0)" >{{{t12}}}</a></li>
							<li><a onclick="i3GEO.arvoreDeCamadas.dialogo.filtro()" href="javascript:void(0)" >{{{t2a}}}</a></li>
							<li><a onclick="i3GEO.mapa.dialogo.opacidade()" href="javascript:void(0)" >{{{t20}}}</a></li>
							<li><a onclick="i3GEO.mapa.dialogo.animacao()" href="javascript:void(0)" >{{{p21}}}</a></li>
							<li><a onclick="i3GEO.mapa.dialogo.imprimir()" href="javascript:void(0)" >{{{d12}}}</a></li>
							<li><a onclick="i3GEO.mapa.limpasel()" href="javascript:void(0)" >{{{t4}}}</a></li>
						</ul>
					</div>
					<!-- Esta div acrescenta a lista de de camadas dispon&iacute;veis no mapa atual -->
					<div id="listaTemas" style="overflow:none;" data-template="../interface/templates/camada.html"></div>
					<!-- Esta div acrescenta a lista de de camadas de fundo
					A lista de camadas de fundo e obtida da variavel i3GEO.Interface.openlayers.LAYERSADICIONAIS
					Essa variavel e definida via javascript, e no caso das interfaces padrao do i3Geo, e definida
					no programa interface/config.php
					-->
					<div class="list-group condensed">
						<label>Camadas de fundo</label>
						<a data-target="#collapseFundo" class="btn btn-sm btn-primary pull-right" style="margin-top: 0px;padding-top: 0px;padding-bottom: 0px;" type="button" data-toggle="collapse" >
	  						<span class="caret"></span>
						</a>
						<div style="margin-left:0px;" class="collapse text-left" id="collapseFundo">
							<form>
								<div id="listaFundo" class="form-group" data-template="../interface/templates/camadaFundo.html"></div>
							</form>
						</div>
					</div>
				</div>
				<!-- Catalogo de temas -->
				<div id='guia2obj' data-traduzir="true" style='display: none; text-align:left;'>
					<div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');i3GEO.catalogoMenus.mostraCatalogoPrincipal();"><span class="pull-left">{{{g1a}}}</span> X</div>
					<!-- aqui entra a lista de elementos quando uma das opcoes e clicada -->
					<div id="catalogoMigalha" data-template="../interface/templates/catalogoMigalha.html"></div>
					<div id="catalogoNavegacao"></div>
					<!-- Opcoes -->
					<div id="catalogoPrincipal">
						<div class="noprint" >
	             			<a href="javascript:void(0)" data-target="#" class="dropdown-toggle" data-toggle="dropdown">
	             				{{{opcoes}}}
	             				<span class="caret"></span>
	              			</a>
	              			<ul class="dropdown-menu">
	 							<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.atualiza()">Refresh</a>
								</li>
								<li class="divider"></li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.conectaservico()" >{{{a15}}}</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.uploadarquivo()">{{{a14}}}</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.downloadbase()">{{{a3}}}</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.importarwmc()">{{{a3a}}}</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.nuvemTags()">{{{a5a}}}</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.carouselTemas()">Miniaturas</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.buscaInde()">Busca na INDE</a>
								</li>
								<li>
								<a href="javascript:void(0)" onclick="i3GEO.mapa.dialogo.metaestat()">Cartogramas estatisticos</a>
								</li>
								<li><a href="http://localhost/i3geo/kml.php?tipoxml=kml" target="_blank">{{{a13}}}</a>
								</li>
							</ul>
						</div>
						<!-- busca tema no catalogo -->
						<div class="form-group label-floating">
							<label class="control-label" for="i3GEObuscatema">{{{a1}}}</label>
							<div class="input-group">
								<input id="i3GEObuscatema" class="form-control" type="text" value="">
								<span class="input-group-btn">
									<a onclick="i3GEO.arvoreDeTemas.buscaTema2($i('i3GEObuscatema').value);return false;" role="button" type="button" class="btn btn-warning btn-fab btn-fab-mini" href="javascript:void(0)">
										<span class="material-icons md-18">send</span>
									</a>
								</span>
							</div>
						</div>
						<!-- A lista de menus e uma funcao de i3GEO.guias.CONFIGURA.adiciona
							Nessa funcao ficam tambem os parametros:
							"idOndeMenus": "catalogoMenus",
							"idCatalogoPrincipal": "catalogoPrincipal",
							"idCatalogoNavegacao": "catalogoNavegacao",
							"idOndeMigalha": "catalogoMigalha"
						-->
						<div id="catalogoMenus" data-templateDir="../interface/templates/dir.html" data-templateTema="../interface/templates/tema.html"></div>

						<div id="arvoreAdicionaTema"></div>

						<!--
						As funcoes de inicializacao recebem um objeto com parametros. Que por padrao sao:
						config: {
							'templateDir': 'templates/dir.html',
							'templateTema': 'templates/tema.html',
							'idCatalogoPrincipal': 'catalogoPrincipal',
							'idCatalogoNavegacao': 'catalogoNavegacao',
							'idOndeMigalha': 'catalogoMigalha'
						}

						exemplo:

						onclick="i3GEO.catalogoInde.inicia({'templateDir': 'templates/dir.html','templateTema': 'templates/tema.html','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'})"
						-->

						<!-- servicos da INDE brasileira -->
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoInde.inicia()" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoInde.inicia()" role="button" href="javascript:void(0)">
								<h4>INDE-Br</h4></a>
								<h6>Infraestrutura Nacional de Dados Espaciais do Brasil</h6>
							</label>
						</div></div><hr>
						<!-- lista de wms cadastrados no sistema de administracao -->
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoOgc.inicia();return false;" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoOgc.inicia()" role="button" href="javascript:void(0)">
								<h4>OGC-WMS</h4></a>
								<h6>{{{descOgcWms}}}</h6>
							</label>
						</div></div><hr>
						<!--  regioes cadastradas no sistema de metadados -->
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoRegioes.inicia()" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoRegioes.inicia()" role="button" href="javascript:void(0)">
								<h4>{{{x87}}}</h4></a>
								<h6>{{{descLimLoc}}}</h6>
							</label>
						</div></div><hr>
						<!--  camadas que vem do sistema de metadados estatisticos -->
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoMetaestat.inicia()" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoMetaestat.inicia()" role="button" href="javascript:void(0)">
								<h4>{{{x57}}}</h4></a>
								<h6>{{{descMeta}}}</h6>
							</label>
						</div></div><hr>
						<!--  mapas cadastrados no sistema de administracao (nao funcional)
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoMapas.inicia({'seletorTemplateDir': '#guia2objTemplateDir','seletorTemplateTema': '#guia2objTemplateTema','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'})" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoMapas.inicia({'seletorTemplateDir': '#guia2objTemplateDir','seletorTemplateTema': '#guia2objTemplateTema','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'})" role="button" href="javascript:void(0)">
								<h4>{{{x90}}}</h4></a>
								<h6>{{{descMapas}}}</h6>
							</label>
						</div></div><hr>
						-->
						<!--  camadas por estrelas -->
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoEstrelas.inicia({'valorEstrela':5,'numEstrelas':1})" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoEstrelas.inicia({'valorEstrela':5,'numEstrelas':1})" role="button" href="javascript:void(0)">
								<h4>{{{t46}}}</h4></a>
								<h6>{{{descEstrelas}}}</h6>
							</label>
						</div></div><hr>
						<!--  sistemas que adicionam camadas -->
						<div class="list-group condensed"><div class="row-content text-left">
							<a onclick="i3GEO.catalogoSistemas.inicia()" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
							<label style="width: 265px;vertical-align: middle;">
								<a onclick="i3GEO.catalogoSistemas.inicia()" role="button" href="javascript:void(0)">
								<h4>{{{a11}}}</h4></a>
								<h6>{{{descSistemas}}}</h6>
							</label>
						</div></div><hr>
						<!--  navegacao em diretorios -->
						<div class="list-group condensed"><div class="row-content text-left">
								<a onclick="i3GEO.catalogoDir.inicia()" role="button" class="btn btn-primary btn-fab btn-fab-mini" href="javascript:void(0)"><span class="material-icons md-18">folder_open</span></a>
								<label style="width: 265px;vertical-align: middle;">
									<a onclick="i3GEO.catalogoDir.inicia()" role="button" href="javascript:void(0)">
									<h4>{{{a6}}}</h4></a>
									<h6>{{{descDir}}}</h6>
								</label>
						</div></div><hr>
					</div>
				</div>
				<!-- Legenda -->
				<div data-traduzir="true" id='guia4obj' style='display: none; text-align: left'>
					<div class="i3GEOfechaGuia" onclick="i3GEO.legenda.off('legendaHtml');i3GEO.guias.abreFecha('fecha');"><span class="pull-left">{{{g3}}}</span>X</div>
					<a href='javascript:void(0)' onclick="i3GEO.legenda.inicia({'janela':true})" class='btn btn-primary btn-sm btn-raised'>{{{x11}}}</a>
					<div id="legendaHtml" data-template="templates/legenda.html" data-size="35,25" style='display: none; text-align: left'></div>
				</div>
				<!-- busca
				Funcoes de busca por registros. Pode ser feita nos temas existentes no mapa, em um servico de busca e no google
				No botao que dispara a busca, ficam os parametros de configuracao
				Esses parametros indicam qual o checkbox que define o tipo de busca, o local onde os dados serao mostrados e o template para formatar o resultado
				-->
				<div data-traduzir="true" id='guia7obj' style='display: none; text-align: left'>
					<div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');"><span class="pull-left">{{{u15a}}}</span> X</div>
					<form>
						<div class="form-group label-floating">
							<label class="control-label" for="valorBuscaRapida">{{{x36}}}</label>
							<div class="input-group">
								<input class="form-control" type="text" value="" name="valorBuscaRapida">
								<span class="input-group-btn">
									<a onclick="i3GEO.busca.inicia(this);return false;"
									data-templateGoogle="../interface/templates/buscaEmTemas.html"
									data-inputGoogle="[name=google]"
									data-ondeGoogle=".i3GEOresultadoBuscaGoogle"
									data-templateTemasMapa="../interface/templates/buscaEmTemas.html"
									data-inputTemasMapa="[name=temasMapa]"
									data-ondeTemasMapa=".i3GEOresultadoBuscaTemasMapa"
									data-templateServico="../interface/templates/buscaEmServico.html"
									data-ondeConteiner="#guia7obj"
									data-inputOndePalavra="[name=valorBuscaRapida]"
									data-inputServicosExternos="[name=servicosExternos]"
									data-ondeServicosExternos=".i3GEOresultadoBuscaServicos" role="button" type="button" class="btn btn-warning btn-fab btn-fab-mini" href="javascript:void(0)">
										<span class="material-icons md-18">send</span>
									</a>
								</span>
							</div>
						</div>
						<h4>{{{x37}}}:</h4>
						<div class="form-inline" style="width:100%;">
							<div class="list-group condensed">
								<div class="checkbox text-left">
								<label>
									<input checked class="noprint" value="on" type="checkbox" value="" name="servicosExternos" >
									<span class="checkbox-material noprint"><span class="check"></span></span> {{{x38}}}
								</label>
								</div>
							</div>
							<div class="list-group condensed">
								<div class="checkbox text-left">
								<label>
									<input class="noprint" value="on" type="checkbox" name="temasMapa">
									<span class="checkbox-material noprint"><span class="check"></span></span> {{{x39}}}
								</label>
								</div>
							</div>
							<!-- Apenas para a interface google maps
							<div class="list-group condensed">
								<div class="checkbox text-left">
								<label>
									<input class="noprint" value="on" type="checkbox" name="google">
									<span class="checkbox-material noprint"><span class="check"></span></span> Google
								</label>
								</div>
							</div>
							 -->
						</div>
					</form>
					<hr>
					<div class="i3GEOresultadoBuscaServicos" ></div>
					<div class="i3GEOresultadoBuscaTemasMapa" ></div>
					<div class="i3GEOresultadoBuscaGoogle" ></div>
					<div class="alert alert-info" role="alert">{{{x40}}}</div>
				</div>
				<!-- Ferramentas -->
				<div data-traduzir="true" id='guia8obj' style='display: none; text-align: left'>
					<div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');"><span class="pull-left">{{{u15a}}}</span> X</div>
					<div class="form-inline" style="width:100%;">
						<div class="text-center form-group" style="margin:4px;">
							<a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.analise.dialogo.area();" role="button" class="btn btn-success btn-fab btn-fab-mini" href="javascript:void(0)">
							<img style="margin-top:4px;" src="../imagens/gisicons/area-measure.png">
							</a>
							<h6>{{{d21at}}}</h6>
						</div>
						<div class="text-center form-group" style="margin:4px;">
							<a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.analise.dialogo.distancia();" role="button" class="btn btn-success btn-fab btn-fab-mini" href="javascript:void(0)">
							<img style="margin-top:4px;" src="../imagens/gisicons/length-measure.png">
							</a>
							<h6>{{{d21t}}}</h6>
						</div>
						<div class="text-center form-group" style="margin:4px;">
							<a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.mapa.dialogo.selecao();" role="button" class="btn btn-success btn-fab btn-fab-mini" href="javascript:void(0)">
							<img style="margin-top:4px;" src="../imagens/gisicons/select.png">
							</a>
							<h6>{{{d24t}}}</h6>
						</div>
						<div class="text-center form-group" style="margin:4px;">
							<a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.mapa.dialogo.geolocal();" role="button" class="btn btn-success btn-fab btn-fab-mini" href="javascript:void(0)">
							<img style="margin-top:4px;" src="../imagens/gisicons/layer-gps.png">
							</a>
							<h6>{{{localiza}}}</h6>
						</div>
					</div>
					<div class="clearfix"></div>
					<hr>
					<div id="migalhaFerramentas" data-template="../interface/templates/ferramentasMigalha.html" style='display: block; text-align: left;'></div>
					<div id="listaFerramentasLinks" data-template="../interface/templates/ferramentasLink.html" style='display: block; text-align: left'></div>
					<div id="listaFerramentas" data-template="../interface/templates/ferramentasFolder.html" style='display: block; text-align: left'></div>
				</div>
			</div>
		</div>
	</div>
	<!--  para mostrar o banner de abertura -->
	<script id="i3GEOlogoMarcaTemplate" type="x-tmpl-mustache">
	<div>
		<table>
			<tr>
				<td>
					<h4 >i3Geo - Software livre para cria&ccedil;&atilde;o de mapas
						interativos e geoprocessamento</h4>
					<h4 >Baseado no Mapserver, &eacute; licenciado sob GPL e integra o
						Portal do Software P&uacute;blico Brasileiro</h4>
				</td>
			</tr>
		</table>
		<img class="img-thumbnail" src="../imagens/i3Geo_big.png" style="width:50px">
		<img class="img-thumbnail" src="../imagens/mapserv.png" style="width:50px">
		<img class="img-thumbnail" src="../imagens/pspb.png" style="width:50px">
		<div>&nbsp;</div>
	</div>
	</script>
	<script>
	//ativa o banner de inicializacao
	i3GEO.janela.tempoMsg($i("i3GEOlogoMarcaTemplate").innerHTML,4000);
	(function() {
		var parametrosMapa = {
				layers: {
					add: ["<?php echo strip_tags($_GET["temaEdicao"]); ?>"],
					on: ["<?php echo strip_tags($_GET["temaEdicao"]); ?>"],
					off: []
				}
		};
		var config = {
			//id do elemento HTML onde o corpo do mapa sera renderizado
			mapBody : "mapai3Geo",
			//tipo de mapa. Pode ser:
			//OL - utiliza o OpenLayers e coordenadas geograficas
			//OSM - utiliza o OpenLayers e o OpenStreetMap como fundo, em projecao semelhante ao GoogleMaps
			//GM - utiliza o GoogleMaps como motor de controle do mapa
			mapType : "OL",
			//armazena em um cookie a ultima extensao geografica do mapa e utiliza essa extensao quando o mapa for aberto
			saveExtension : true,
			//aplica um filtro de cores apos a renderizacao da imagem de cada camada que compoe o mapa cinza|sepiaclara|sepianormal
			posRenderType : "",
			//Altura e largura do tooltip (balao identifica)
			toolTipSize : ["100px","200px"],
			//Endereco do servidor i3Geo. Utilizado para gerar as requisicoes AJAX
			//Por default e definido como: i3GEO.util.protocolo() + "://" + window.location.host + "/i3geo"
			i3GeoServer : "",
			//Funcao que sera executada apos a inicializacao do mapa
			afterStart : function(){
				i3GEO.mapa.ativaTema("<?php echo strip_tags($_GET["temaEdicao"]); ?>");
				i3GEO.mapa.dialogo.atalhosedicao();
			},
			//configuracoes especificas para a interface que utiliza o OpenLayers
			openLayers : {
				//utiliza ou nao tiles ao renderizar as camadas do mapa
				//a utilizacao de tiles pode ser definida em cada camada, mas se essa propriedade for true, a definicao das camadas nao serao consideradas
				singleTile : false,
				//opcoes de inicializacao do mapa conforme definido na API do OpenLayers
				MapOptions : {
					layers : [],
					controls : [
						new ol.control.Zoom(),
						new ol.control.ZoomSlider(),
						new ol.control.ScaleLine(),
						new ol.control.Attribution({
							collapsible: false
						})
					],
					loadTilesWhileAnimating : true,
					loadTilesWhileInteracting : true,
					//os objetos devem ser comentados na interface googleMaps
					interactions : [
						new ol.interaction.DoubleClickZoom(),
						new ol.interaction.KeyboardPan(),
						new ol.interaction.KeyboardZoom(),
						new ol.interaction.MouseWheelZoom(),
						new ol.interaction.PinchRotate(),
						new ol.interaction.PinchZoom(),
						new ol.interaction.DragZoom(),
						new ol.interaction.DragPan()
					]
				},
				//opcoes para o objeto view, que e uma instancia de MapOptions
				ViewOptions : {

				}
			}
		};
		//
		//inicia o mapa
		//Veja tambem config.php
		//
		//O primeiro parametro permite alterar o mapa, inserindo camadas e outras definicoes que afetam o corpo do mapa
		//O segundo parametro inclui configuracoes que afetam o funcionamento da interface que controla a visualizacao do mapa
		//
		i3GEO.init(parametrosMapa,config);
	})();
	</script>
</body>

</html>
