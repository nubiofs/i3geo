/**
 * Title: Guias
 *
 * Cria e controla os blocos de op&ccedil;&otilde;es ativados por meio de guias
 * ou bot&otilde;es
 *
 * As guias alternam conte&uacute;dos para exibi&ccedil;&atilde;o conforme as escolhas feitas pelo usu&aacute;rio
 *
 * Namespace:
 *
 * i3GEO.guias
 *
 * Veja:
 *
 * <http://localhost/i3geo/classesjs/classe_guias.js>
 */
/**
 * Licen&ccedil;a
 *
 * GPL2
 *
 * i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet
 *
 * Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com
 *
 * Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a
 * P&uacute;blica Geral GNU conforme publicada pela Free Software Foundation;
 *
 * Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til, por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a
 * garantia impl&iacute;cita de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA. Consulte a Licen&ccedil;a
 * P&uacute;blica Geral do GNU para mais detalhes. Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
 * GNU junto com este programa; se n&atilde;o, escreva para a Free Software Foundation, Inc., no endere&ccedil;o 59 Temple Street, Suite
 * 330, Boston, MA 02111-1307 USA.
 */
if (typeof (i3GEO) === 'undefined') {
    var i3GEO = {};
}
i3GEO.guias =
{
	LARGURAGUIAMOVEL : 350,
	/**
	 * Propriedade: CONFIGURA
	 *
	 * Define os par&acirc;metros de cada guia que ser&aacute; mostrada no mapa, como t&iacute;tulo, conte&uacute;do, etc.
	 *
	 * Voc&ecirc; pode modificar o nome de uma guia como no exemplo
	 *
	 * i3GEO.guias.CONFIGURA.legenda.titulo = "nome diferente";
	 *
	 * Por padr&atilde;o s&atilde;o definidas as guias legenda, temas, adiciona e mapas (links)
	 *
	 * Exemplo:
	 *
	 * (start code)
	 *
	 * i3GEO.guias.CONFIGURA.legenda = { icone : "imagens/gisicons/show-legend.png", titulo : "Legenda", id : "guia4", idconteudo :
	 * "guia4obj", click : function() { i3GEO.guias.mostra("legenda"); i3GEO.mapa.legendaHTML.cria("guia4obj"); } };
	 *
	 * (end)
	 *
	 * Tipo:
	 *
	 * {objeto}
	 */
	CONFIGURA : {
	    "zoomanterior" : {
		icone : "imagens/gisicons/zoom-last.png",
		titulo : "",
		id : "guiaZoomanterior",
		idconteudo : "",
		click : function() {
		    i3GEO.navega.extensaoAnterior();
		}
	    },
	    "zoomli" : {
		icone : "imagens/gisicons/zoom-region.png",
		titulo : $trad("d3"),
		id : "guiaZoomli",
		idconteudo : "",
		click : function() {
		    if (DetectaMobile("DetectMobileLong")) {
			i3GEO.janela.tempoMsg($trad("x70"));
		    } else {
			i3GEO.janela.tempoMsg($trad("x69"));
		    }
		    if (i3GEO.Interface.ATUAL === "googlemaps") {
			// alert("Pressione a tecla CTRL junto com o bot&atilde;o esquerdo do mouse");
			i3GeoMap.setOptions({
			    draggable : true
			});
		    }
		}
	    },
	    "zoomproximo" : {
		icone : "imagens/gisicons/zoom-next.png",
		titulo : "",
		id : "guiaZoomproximo",
		idconteudo : "",
		click : function() {
		    i3GEO.navega.extensaoProximo();
		}
	    },
	    "zoomtot" : {
		icone : "imagens/gisicons/zoom-extent.png",
		titulo : $trad("d2"),
		id : "guiaZoomtot",
		idconteudo : "",
		click : function() {
		    if (i3GEO.Interface.ATUAL === "openlayers") {
			i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.extentTotal);
			return;
		    }
		    if (i3GEO.Interface.ATUAL === "googlemaps") {
			i3GEO.Interface.googlemaps.zoom2extent(i3GEO.parametros.extentTotal);
			return;
		    }
		}
	    },
	    "identificaBalao" : {
		icone : "imagens/gisicons/tips.png",
		titulo : $trad("d7a"),
		id : "guiaIdentificaBalao",
		idconteudo : "",
		click : function() {
		    if (typeof (console) !== 'undefined')
			console.info("click no botao identifica balao");

		    i3GEO.mapa.ativaIdentificaBalao();
		}
	    },
	    "identifica" : {
		icone : "imagens/gisicons/pointer-info.png",
		titulo : $trad("d7"),
		id : "guiaIdentifica",
		idconteudo : "",
		click : function() {
		    if (typeof (console) !== 'undefined')
			console.info("click no botao identifica");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    i3GEO.mapa.ativaIdentifica();

		}
	    },
	    "mapas" : {
		icone : "imagens/gisicons/show-links.png",
		titulo : "Links",
		id : "guia5",
		idconteudo : "guia5obj",
		mostraLink : function(id, url) {
		    $i("i3geoMapasLink_" + id).innerHTML = "<a href='" + url + "' target=_blank >" + $trad("abreMapa") + "</a>";
		},
		click : function(onde) {
		    if (!onde) {
			onde = i3GEO.guias.CONFIGURA.mapas.idconteudo;
		    }
		    //$('.iconeGuiaMovel').tooltip('destroy');
		    var pegaMapas =
			function(retorno) {
			var ins, mapa, ig1lt, ig1, nome, lkd, link, temp, combo, urlinterface;
			ins = "<br><div id='banners' style='overflow:auto;text-align:center'>";

			ins += "<br>";
			mapa = retorno.data.mapas;
			ig1lt = mapa.length;
			ig1 = 0;
			urlinterface = window.location.origin + window.location.pathname;
			if (ig1lt > 0) {
			    do {
				temp = mapa[ig1];
				nome = temp.NOME;
				if (temp.PUBLICADO) {
				    if (temp.PUBLICADO.toLowerCase() === "nao") {
					nome = "<s>" + nome + "</s>";
				    }
				}
				lkd = temp.LINK;
				link = i3GEO.configura.locaplic + "/ms_criamapa.php?temasa=" + temp.TEMAS + "&layers=" + temp.LIGADOS;
				if (temp.EXTENSAO !== "") {
				    link += "&mapext=" + temp.EXTENSAO;
				}
				if (temp.OUTROS !== "") {
				    link += "&" + temp.OUTROS;
				}
				if (lkd !== "") {
				    link = lkd;
				}
				ins +=
				    "<div style='cursor:pointer; height: 120px;float: left;width:45%;background-color:white;padding:5px;margin:5px;border: 1px solid #F0F0F0;border-radius: 5px;box-shadow: 1px 1px 1px 1px #D3D3D3;' >";

				if (temp.IMAGEM && temp.IMAGEM != "") {
				    ins +=
					"<div style='float:left;margin:2px' ><a href='" + link
					+ "' style=text-align:center;text-decoration:none; >"
					+ "<img src='"
					+ temp.IMAGEM
					+ "'></a></div>";
				}
				// verifica se o mapfile esta salvo no banco
				// diretamente
				nome += " (" + temp.ID_MAPA + ")";
				if (temp.CONTEMMAPFILE == "nao") {
				    ins +=
					"<div class=paragrafo style='text-align:left;'>" + "<a href='"
					+ link
					+ "' style=text-align:left;text-decoration:none; >"
					+ nome
					+ "</a></div>";
				} else {
				    // combo de opcoes para abrir os mapas
				    // salvos
				    // como mapfiles
				    combo =
					"<select style='width:170px;' onchange='i3GEO.guias.CONFIGURA.mapas.mostraLink(" + ig1
					+ ",this.value)'>"
					+ "<option value=''>"
					+ $trad("x103")
					+ ":</option>"
					+ "<option value='"
					+ link
					+ "'>Como foi salvo</option>"
					+ "<option value='"
					+ link
					+ "&interface="
					+ urlinterface
					+ "'>Com a interface atual</option>"
					+ "<option value='"
					+ i3GEO.configura.locaplic
					+ "/mashups/openlayers.php?numzoomlevels=18&restauramapa="
					+ temp.ID_MAPA
					+ "&fundo=e_wsm'>Openlayers com todos os botoes</option>"
					+ "<option value='"
					+ i3GEO.configura.locaplic
					+ "/mashups/openlayers.php?numzoomlevels=18&restauramapa="
					+ temp.ID_MAPA
					+ "&fundo=est_wms'>Sem o fundo</option>"
					+ "<option value='"
					+ i3GEO.configura.locaplic
					+ "/mashups/openlayers.php?numzoomlevels=18&restauramapa="
					+ temp.ID_MAPA
					+ "&fundo=e_wsm&botoes=legenda pan zoombox zoomtot zoomin zoomout distancia area identifica'>Com botoes principais</option>"
					+ "<option value='"
					+ i3GEO.configura.locaplic
					+ "/mashups/osm.php?numzoomlevels=18&restauramapa="
					+ temp.ID_MAPA
					+ "&fundo=e_wsm&botoes=legenda pan zoombox zoomtot zoomin zoomout distancia area identifica'>Com botoes principais e OSM</option>"
					+ "<option value='"
					+ i3GEO.configura.locaplic
					+ "/mashups/openlayers.php?numzoomlevels=18&restauramapa="
					+ temp.ID_MAPA
					+ "&botoes=legenda pan zoombox zoomtot zoomin zoomout'>Botoes de navegacao</option>"
					+ "</select>";
				    ins +=
					"<div style='float:left;margin:2px'>" + "<img src='"
					+ i3GEO.configura.locaplic
					+ "/ferramentas/salvamapa/geraminiatura.php?w=100&h=67&restauramapa="
					+ temp.ID_MAPA
					+ "'></div><div class=paragrafo style='text-align:left;'><a href='"
					+ link
					+ "' style=text-align:center;text-decoration:none; >"
					+ nome
					+ "</a></div>"
					+ combo
					+ "<br><div style='cursor:pointer;' id='i3geoMapasLink_"
					+ ig1
					+ "' ></div>";

				}
				ins += "</div>";
				ig1++;
			    } while (ig1 < ig1lt);
			}
			$i(onde).innerHTML = ins + "</div>";
		    };
		    if ($i(i3GEO.guias.CONFIGURA.mapas.idconteudo)) {
			$i(i3GEO.guias.CONFIGURA.mapas.idconteudo).innerHTML = "Aguarde...";
		    }
		    //i3GEO.guias.mostra("mapas");
		    i3GEO.php.pegaMapas(pegaMapas);
		    i3GEO.navega.removeCookieExtensao();
		}
	    },
	    "dobraPagina" : {
		icone : "imagens/googlemaps.png",
		titulo : $trad("trocaInterface"),
		id : "guia6",
		idconteudo : "",
		inicializa : function(){
		    if (i3GEO.Interface.ATUAL === "googlemaps") {
			i3GEO.guias.CONFIGURA.dobraPagina.icone = "imagens/openlayers.png";
		    }
		    else{
			i3GEO.guias.CONFIGURA.dobraPagina.icone = "imagens/googlemaps.png";
		    }
		},
		click : function() {
		    if (typeof (console) !== 'undefined')
			console.info("i3GEO.guias dobraPagina.click");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    i3GEO.Interface.atual2gm.insereIcone = false;
		    i3GEO.Interface.atual2ol.insereIcone = false;
		    if (i3GEO.Interface.ATUAL === "googlemaps") {
			if (typeof i3GeoMap.getStreetView != "undefined"){
			    if(i3GeoMap.getStreetView().getVisible() === true) {
				i3GeoMap.getStreetView().setVisible(false);
			    }
			}
			i3GEO.Interface.atual2ol.inicia();
			i3GEO.guias.CONFIGURA.dobraPagina.icone = "imagens/googlemaps.png";
		    }
		    if (i3GEO.Interface.ATUAL === "openlayers") {
			i3GEO.Interface.atual2gm.inicia();
			i3GEO.guias.CONFIGURA.dobraPagina.icone = "imagens/openlayers.png";
		    }
		    $i("iconeTrocaInterface").src = i3GEO.configura.locaplic + "/" + i3GEO.guias.CONFIGURA.dobraPagina.icone;
		}
	    },
	    "buscaRapida" : {
		icone : "imagens/gisicons/search.png",
		titulo : "",
		id : "guia7",
		idconteudo : "guia7obj",
		idBuscaRapida : "buscaRapidaGuia",
		click : function(obj) {
		    if (typeof (console) !== 'undefined')
			console.info("click no botao que abre a guia de camadas");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    var f = i3GEO.guias.CONFIGURA.buscaRapida;
		    obj = $(obj);
		    if(obj.attr("data-idconteudo") != undefined){
			f.idconteudo = obj.attr("data-idconteudo");
		    }
		}
	    },
	    "legenda" : {
		icone : "imagens/legenda.png",
		titulo : $trad("g3"),
		id : "guia4",
		idconteudo : "guia4obj",
		idLegenda: "legendaHtml",
		click : function(obj) {
		    if (typeof (console) !== 'undefined')
			console.info("click no botao que abre a guia de camadas");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    var f = i3GEO.guias.CONFIGURA.legenda;
		    obj = $(obj);
		    if(obj.attr("data-idLegenda") != undefined){
			f.idLegenda = obj.attr("data-idLegenda");
		    }
		    //necessario para a legenda nao ser atualizada nos eventos desnecessariamente
		    if($i(f.idLegenda)){
			$i(f.idLegenda).style.display = "block";
			i3GEO.legenda.CAMADAS = "";
			i3GEO.legenda.inicia({
			    "idLegenda": f.idLegenda,
			    "templateLegenda": $("#" + f.idLegenda).attr("data-template"),
			    "janela": false
			});
		    }
		}
	    },
	    "temas" : {
		icone : "imagens/layer.png",
		titulo : $trad("g4a"),
		id : "guia1",
		idconteudo : "guia1obj",
		idListaDeCamadas : "listaTemas",
		idListaFundo : "listaFundo",
		idListaLayersGr : "listaLayersGr",
		verificaAbrangencia : "",
		click : function(obj){
		    if (typeof (console) !== 'undefined')
			console.info("click no botao que abre a guia de camadas");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    var f = i3GEO.guias.CONFIGURA.temas;
		    obj = $(obj);

		    if(obj.attr("data-verificaAbrangencia") != undefined){
			f.verificaAbrangencia = obj.attr("data-verificaAbrangencia");
		    }
		    if(obj.attr("data-idconteudo") != undefined){
			f.idconteudo = obj.attr("data-idconteudo");
		    }
		    if(obj.attr("data-idListaDeCamadas") != undefined){
			f.idListaDeCamadas = obj.attr("data-idListaDeCamadas");
		    }
		    if(obj.attr("data-idListaFundo") != undefined){
			f.idListaFundo = obj.attr("data-idListaFundo");
		    }
		    if(obj.attr("data-idListaLayersGr") != undefined){
			f.idListaLayersGr = obj.attr("data-idListaLayersGr");
		    }
		    if($("#" + obj.attr("data-idListaFundo")).attr("data-idTemplateCamada") != undefined){
			f.idTemplateCamadaFundo = $("#" + obj.attr("data-idListaFundo")).attr("data-idTemplateCamada");
		    }
		    if($i(f.idListaDeCamadas)){
			i3GEO.arvoreDeCamadas.inicia({
			    "idOnde" : f.idListaDeCamadas,
			    "templateCamada": $("#" + f.idListaDeCamadas).attr("data-template"),
			    "idListaFundo": f.idListaFundo,
			    "templateCamadaFundo": $("#" + f.idListaFundo).attr("data-template"),
			    "idListaLayersGr": f.idListaLayersGr,
			    "templateCamadaGr": $("#" + f.idListaLayersGr).attr("data-template"),
			    "verificaAbrangencia": f.verificaAbrangencia
			});
		    }
		}
	    },
	    "adiciona" : {
		icone : "imagens/catalogo.png",
		titulo : $trad("g1a"),
		id : "guia2",
		idconteudo : "guia2obj",
		idMenus: "catalogoMenus", //lista de menus
		idCatalogo: "catalogoPrincipal", //onde vai a lista inicial
		idNavegacao: "catalogoNavegacao",
		idMigalha: "catalogoMigalha",
		click : function(obj) {
		    if (typeof (console) !== 'undefined')
			console.info("click no botao que abre a guia de adicao de temas");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    var f = i3GEO.guias.CONFIGURA.adiciona;

		    if($(obj).attr("data-idconteudo") != undefined){
			f.idconteudo = $(obj).attr("data-idconteudo");
		    }
		    if($(obj).attr("data-idMenus") != undefined){
			f.idMenus = $(obj).attr("data-idMenus");
		    }
		    if($(obj).attr("data-idCatalogo") != undefined){
			f.idCatalogo = $(obj).attr("data-idCatalogo");
		    }
		    if($(obj).attr("data-idNavegacao") != undefined){
			f.idNavegacao = $(obj).attr("data-idNavegacao");
		    }
		    if($(obj).attr("data-idMigalha") != undefined){
			f.idMigalha = $(obj).attr("data-idMigalha");
		    }
		    if($(obj).attr("data-folderFirst") != undefined){
			f.folderFirst = $(obj).attr("data-folderFirst");
		    } else {
			f.folderFirst = "false";
		    }

		    var ondeMenus = $( "#" + f.idMenus );

		    i3GEO.catalogoMenus.listaMenus({
			"templateDir": ondeMenus.attr("data-templateDir"),
			"templateTema": ondeMenus.attr("data-templateTema"),
			"idOndeMenus": f.idMenus,
			"idCatalogoPrincipal": f.idCatalogo,
			"idCatalogoNavegacao": f.idNavegacao,
			"idOndeMigalha": f.idMigalha,
			"folderFirst": f.folderFirst
		    });
		}
	    },
	    "ferramentas" : {
		icone : "imagens/gisicons/tools.png",
		titulo : $trad("u15a"),
		id : "guia8",
		idconteudo : "guia8obj",
		idLista: "listaFerramentas",
		idMigalha: "migalhaFerramentas",
		idLinks: "listaFerramentasLinks",
		status: false,
		click : function(obj) {
		    if (typeof (console) !== 'undefined')
			console.info("click no botao que abre a guia das ferramentas");

		    //$('.iconeGuiaMovel').tooltip('destroy');
		    if($(obj).attr("data-idconteudo") != undefined){
			i3GEO.guias.CONFIGURA.ferramentas.idconteudo = $(obj).attr("data-idconteudo");
		    }
		    if($(obj).attr("data-idLista") != undefined){
			i3GEO.guias.CONFIGURA.ferramentas.idLista = $(obj).attr("data-idLista");
		    }
		    if($(obj).attr("data-idMigalha") != undefined){
			i3GEO.guias.CONFIGURA.ferramentas.idMigalha = $(obj).attr("data-idMigalha");
		    }
		    if($(obj).attr("data-idLinks") != undefined){
			i3GEO.guias.CONFIGURA.ferramentas.idLinks = $(obj).attr("data-idLinks");
		    }
		    if(i3GEO.util.checaHtmlVazio(i3GEO.guias.CONFIGURA.ferramentas.idLista) == false || i3GEO.util.checaHtmlVazio(i3GEO.guias.CONFIGURA.ferramentas.idLinks) == false){
			return;
		    }
		    var f = i3GEO.guias.CONFIGURA.ferramentas;

		    i3GEO.caixaDeFerramentas.inicia({
			"idOndeFolder": $( "#" + f.idLista ),
			"idOndeLinks": $( "#" + f.idLinks ),
			"idOndeMigalha" : f.idMigalha,
			"templateFolder" : $( "#" + f.idLista ).attr("data-template"),
			"templateMigalha" : $("#" + f.idMigalha).attr("data-template"),
			"templateLinks" : $( "#" + f.idLinks ).attr("data-template")
		    });
		}
	    }
	},
	/**
	 * Ajusta a altura das guias conforme a altura da imagem do mapa
	 */
	ajustaAltura : function() {
	    if (typeof (console) !== 'undefined')
		console.info("guias.ajustaAltura");

	    var guia, guias, nguias, temp, temps, n, i, g, altura = 0;
	    guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
	    nguias = guias.length;
	    for (g = 0; g < nguias; g++) {
		guia = $i(this.CONFIGURA[guias[g]].idconteudo);
		if (guia) {
		    guia.style.overflow = "auto";
		    if (!guia.style.height) {
			guia.style.height = i3GEO.parametros.h + "px";
		    }
		}
	    }
	},
	/**
	 * Esconde todas as guias
	 */
	escondeGuias : function() {
	    if (typeof (console) !== 'undefined')
		console.info("guias.escondeGuias");

	    var guias, nguias, g, temp, attributes, anim;
	    guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
	    nguias = guias.length;
	    for (g = 0; g < nguias; g++) {
		temp = $i(this.CONFIGURA[guias[g]].idconteudo);
		if (temp) {
		    temp.style.display = "none";
		}
	    }
	    $("#i3GEOguiaMovelConteudo").css("display","none");
	},
	/**
	 * Mostra no mapa uma determinada guia
	 *
	 * Parametro:
	 *
	 * {String} - nome da guia
	 */
	mostra : function(guia) {
	    if (typeof (console) !== 'undefined')
		console.info("guias.mostra");

	    // fecha o streetview
	    if (i3GEO.Interface.ATUAL === "googlemaps") {
		if(typeof i3GeoMap.getStreetView != "undefined"){
		    i3GeoMap.getStreetView().setVisible(false);
		}
	    }
	    var guias, nguias, g, temp, attributes, anim;
	    guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
	    nguias = guias.length;
	    if (!$i(i3GEO.guias.CONFIGURA[guia].idconteudo)) {
		return;
	    }
	    if (i3GEO.guias.CONFIGURA[guia]) {
		temp = $i(i3GEO.guias.CONFIGURA[guia].idconteudo);
		if (temp) {
		    temp.style.display = "block";
		    $("#i3GEOguiaMovelMolde,#i3GEOguiaMovelConteudo").css("display","block");
		}
	    }
	},
	/**
	 * Function: inicia
	 *
	 * Inicializa a guia m&oacute;vel
	 */
	inicia : function() {
	    if (typeof (console) !== 'undefined')
		console.info("guias.inicia");

	    if($i("i3GEOguiaMovel")){
		i3GEO.guias.LARGURAGUIAMOVEL = parseInt($("#i3GEOguiaMovel").css("width"),10);
	    }
	    if(!$i("i3GEOguiaMovelMolde").style.height || $i("i3GEOguiaMovelMolde").style.height == ""){
		$("#i3GEOguiaMovelMolde,#i3GEOguiaMovelConteudo").css("height",i3GEO.parametros.h + "px");
	    }
	    if(i3GEO.guias.LARGURAGUIAMOVEL > i3GEO.parametros.w){
		i3GEO.guias.LARGURAGUIAMOVEL = i3GEO.parametros.w;
	    }
	},
	/**
	 * Ativa o conte&uacute;do de determinada guia
	 *
	 * Parametro:
	 *
	 * chave {string} - c&oacute;digo da guia, definido em i3GEO.guias.CONFIGURA
	 */
	ativa : function(chave,obj) {
	    if (typeof (console) !== 'undefined')
		console.info("guias.ativa");

	    if(i3GEO.guias.LARGURAGUIAMOVEL > i3GEO.parametros.w){
		i3GEO.guias.LARGURAGUIAMOVEL = i3GEO.parametros.w;
	    }
	    // nao tem conteudo para mostrar
	    var f="" ;

	    if (!$i(i3GEO.guias.CONFIGURA[chave].idconteudo)) {
		f = i3GEO.guias.CONFIGURA[chave].click.apply(f,[obj]);
		return;
	    }
	    i3GEO.guias.escondeGuias();
	    i3GEO.guias.abreFecha("abre",chave);
	    if (i3GEO.guias.CONFIGURA[chave].click) {
		f = i3GEO.guias.CONFIGURA[chave].click.apply(f,[obj]);
	    }
	},
	/**
	 * Function: abreFecha
	 *
	 * Abre ou fecha a guia m&oacute;vel
	 */
	abreFecha : function(forca,chave) {
	    if (typeof (console) !== 'undefined')
		console.info("guias.abreFecha");

	    var molde = $("#i3GEOguiaMovelMolde");
	    if (!forca) {
		if (parseInt(molde.css("width"),10) <= 10) {
		    forca = "abre";
		} else {
		    forca = "fecha";
		}
	    }
	    if (forca === "fecha") {// esconde
		i3GEO.guias.escondeGuias();
		molde.animate(
			{ "width": "-10px" },
			400
		);
	    } else {
		//$("#i3GEOguiaMovelIcones").css("display","block");
		var temp = function(){
		    i3GEO.guias.mostra(chave);
		};
		molde.animate(
			{ "width": i3GEO.guias.LARGURAGUIAMOVEL + "px" },
			{duration: 400,always: temp}
		);
	    }
	},
	//usado nas ferramentas
	mostraGuiaFerramenta : function(guia, namespace) {
	    var g;
	    if (!namespace) {
		namespace = "guia";
	    }
	    for (g = 0; g < 12; g++) {
		$("#" + namespace + g + "obj").css("display", "none");
	    }
	    if(guia != ""){
		$("#" + guia + "obj").css("display","block");
	    }
	},
	escondeGuiasFerramenta : function(namespace){
	    i3GEO.guias.mostraGuiaFerramenta("",namespace);
	},
	ajustaGuiaFerramenta : function(){}
};