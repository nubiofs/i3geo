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
						i3GEO.util.mudaCursor(i3GEO.configura.cursores, "pointer", i3GEO.Interface.IDMAPA, i3GEO.configura.locaplic);
					}
					if (i3GEO.Interface.ATUAL === "openlayers") {
						//i3GEO.util.mudaCursor(i3GEO.configura.cursores, "pointer", i3GEO.Interface.IDMAPA, i3GEO.configura.locaplic);
						// i3GEO.Interface.openlayers.OLpanel.activateControl(i3GEO.Interface.openlayers.OLzoom);
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
					if (i3GEO.arvoreDeCamadas.filtraCamadas("etiquetas", "", "diferente", i3GEO.arvoreDeCamadas.CAMADAS) === "") {
						i3GEO.janela.tempoMsg($trad("d31"));
						return;
					}
					if ($i(i3GEO.Interface.IDMAPA)) {
						$i(i3GEO.Interface.IDMAPA).title = "";
						var temp = "identifica";
						i3GEO.util.mudaCursor(i3GEO.configura.cursores, temp, i3GEO.Interface.IDMAPA, i3GEO.configura.locaplic);
					}
					if (i3GEO.eventos.cliquePerm.ativo === false) {
						// na opcao de identificacao so e permitido um evento
						i3GEO.eventos.MOUSECLIQUE = [
						                             i3GEO.configura.funcaoTip
						                             ];
					} else {
						// desativa as outras operacoes de clique, mas apenas se nao for a mesma que ativa o identifica
						i3GEO.eventos.removeEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoIdentifica]);
						i3GEO.eventos.adicionaEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoTip]);
					}
					i3GEO.eventos.cliquePerm.ativa();
				}
			},
			"identifica" : {
				icone : "imagens/gisicons/pointer-info.png",
				titulo : $trad("d7"),
				id : "guiaIdentifica",
				idconteudo : "",
				click : function() {
					i3GEO.barraDeBotoes.BOTAOCLICADO = "identifica";
					if ($i(i3GEO.Interface.IDMAPA)) {
						$i(i3GEO.Interface.IDMAPA).title = "";
						temp = "identifica";
					}
					i3GEO.eventos.cliquePerm.desativa();
					if (i3GEO.eventos.cliquePerm.ativo === false) {
						// caso seja um clique para desativar
						if (i3GEO.eventos.MOUSECLIQUE.toString().search(i3GEO.configura.funcaoIdentifica) >= 0) {
							i3GEO.eventos.MOUSECLIQUE.remove(i3GEO.configura.funcaoIdentifica);
							return;
						}
						// na opcao de identificacao so e permitido um evento
						i3GEO.eventos.MOUSECLIQUE = [
						                             i3GEO.configura.funcaoIdentifica
						                             ];
					} else {
						// desativa as outras operacoes de clique, mas apenas se nao for a mesma que ativa o identifica
						i3GEO.eventos.removeEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoTip]);
						i3GEO.eventos.adicionaEventos("MOUSECLIQUEPERM",[i3GEO.configura.funcaoIdentifica]);
					}
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
					var pegaMapas =
						function(retorno) {
						var ins, mapa, ig1lt, ig1, nome, lkd, link, temp, combo, urlinterface;
						ins = "<br><div id='banners' style='overflow:auto;text-align:center'>";
						if (i3GEO.configura.verificaCookieLogin === true) {
							ins +=
								"<a class='linkMapasEditor' href='" + i3GEO.configura.locaplic
								+ "/admin/html/mapas.html' target=_blank >"
								+ $trad("x89")
								+ "</a><br>";
						}
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
									// esses links tambem sao colocados em
									// admin/php/xml.php geraRSSmapas
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
					$i("guia6").src = i3GEO.configura.locaplic + "/" + i3GEO.guias.CONFIGURA.dobraPagina.icone;
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

					var f = i3GEO.guias.CONFIGURA.legenda;
					obj = $(obj);
					if(obj.attr("data-idconteudo") != undefined){
						f.idconteudo = obj.attr("data-idconteudo");
					}
					if(obj.attr("data-idLegenda") != undefined){
						f.idLegenda = obj.attr("data-idLegenda");
					}
					i3GEO.legenda.inicia({
						"idOnde": f.idconteudo,
						"idLegenda": f.idLegenda
					});
				}
			},
			"temas" : {
				icone : "imagens/layer.png",
				titulo : $trad("g4a"),
				id : "guia1",
				idconteudo : "guia1obj",
				idListaDeCamadas : "listaTemas",
				idTemplateCamada : "guia1objTemplateCamadas",
				idListaFundo : "listaFundo",
				idTemplateCamadaFundo : "guia1objTemplateCamadasFundo",
				click : function(obj){
					if (typeof (console) !== 'undefined')
						console.info("click no botao que abre a guia de camadas");

					var f = i3GEO.guias.CONFIGURA.temas;
					obj = $(obj);

					if(obj.attr("data-idconteudo") != undefined){
						f.idconteudo = obj.attr("data-idconteudo");
					}
					if(obj.attr("data-idListaDeCamadas") != undefined){
						f.idListaDeCamadas = obj.attr("data-idListaDeCamadas");
					}
					if(obj.attr("data-idListaFundo") != undefined){
						f.idListaFundo = obj.attr("data-idListaFundo");
					}

					if($("#" + obj.attr("data-idListaDeCamadas")).attr("data-idTemplateCamada") != undefined){
						f.idTemplateCamada = $("#" + obj.attr("data-idListaDeCamadas")).attr("data-idTemplateCamada");
					}
					if($("#" + obj.attr("data-idListaFundo")).attr("data-idTemplateCamada") != undefined){
						f.idTemplateCamadaFundo = $("#" + obj.attr("data-idListaFundo")).attr("data-idTemplateCamada");
					}
					i3GEO.arvoreDeCamadas.inicia({
						"idOnde" : f.idListaDeCamadas,
						"idTemplateCamada": f.idTemplateCamada,
						"idListaFundo": f.idListaFundo,
						"idTemplateCamadaFundo": f.idTemplateCamadaFundo
					});
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

					var ondeMenus = $( "#" + f.idMenus );

					i3GEO.catalogoMenus.listaMenus({
						"seletorTemplateDir": ondeMenus.attr("data-templateDir"),
						"seletorTemplateTema": ondeMenus.attr("data-templateTema"),
						"idOndeMenus": f.idMenus,
						"idCatalogoPrincipal": f.idCatalogo,
						"idCatalogoNavegacao": f.idNavegacao,
						"idOndeMigalha": f.idMigalha
					});
					//antigo
					//i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid, i3GEO.configura.locaplic, "arvoreAdicionaTema");
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

					var f = i3GEO.guias.CONFIGURA.ferramentas,
						confm = i3GEO.listaDeFerramentas,
						subs = i3GEO.listaDeFerramentas.submenus,
						ondeFolder = $( "#" + f.idLista ),
						ondeLinks = $( "#" + f.idLinks ),
						template1 = $($(ondeFolder).attr("data-template")).html(),
						template2 = $($("#" + f.idMigalha).attr("data-template")).html(),
						template3 = $($(ondeLinks).attr("data-template")).html(),
						migalha;
					//mostra a janela
					//i3GEO.guias.mostra("ferramentas");

					//indica que a janela esta aberta
					f.status = true;
					//constroi o texto da migalha com evento click
					migalha = function (data){
						var t = Mustache.to_html(
							template2,
							{"nome":data.nome}
						);
						$("#" + f.idMigalha)
						.data(data)
						.html(t)
						.click(function(event){
							event.stopImmediatePropagation();
							$("#" + f.idMigalha).off("click");
							var data = $(this).data();
							if((data.nivel - 1) == 0){
								ondeFolder.fadeOut( "fast", function(){nivel0();ondeFolder.show();});
							}
							if((data.nivel - 1) == 1){
								ondeFolder.fadeOut( "fast", function(){nivel1(data);ondeFolder.show();});
							}
							if((data.nivel - 1) == 2){
								ondeFolder.fadeOut( "fast", function(){nivel2(data);ondeFolder.show();});
							}
						});
					};
					//monta o nivel 0
					var nivel0 = function(){
						var menu = confm.menu,
							n = menu.length,
							i,t,data;

						$("#" + f.idMigalha).html("&nbsp;");
						ondeFolder.html("");
						ondeLinks.html("");
						for (i = 0; i < n; i += 1) {
							if(subs[menu[i].id].length > 0){
								t = Mustache.to_html(
									template1,
									{"nome":menu[i].nome,"descricao":menu[i].descricao}
								);
								t = $(t);
								//quando clica, abre o nivel 1 e muda a migalha
								data = {"nivel":1,"nome":menu[i].nome,"id":i,"n0": i, "n1":"", "n2": "", "n3": ""};
								t.find("a")
									.data(data)
									.click(function(){
										$(this).find("a").off("click");
										var data = $(this).data();
										//texto da migalha e evento click
										ondeFolder.fadeOut( "fast", function(){
											nivel1(data);
											ondeFolder.show();
										});
									});
								ondeFolder
								.append(t);
							}
						}
					};
					//monta o nivel 1
					var nivel1 = function(data){
						var menu = confm.submenus[confm.menu[data.n0].id],
							n = menu.length,
							i,t,datan;

						ondeFolder.html("");
						ondeLinks.html("");
						for (i = 0; i < n; i += 1) {
							datan = {"nivel":2,"nome":menu[i].text,"id":menu[i].id,"n0": data.n0, "n1":i, "n2": "", "n3": ""};
							if(menu[i].url){
								t = Mustache.to_html(
									template3,
									{"nome":menu[i].text,"target": menu[i].target,"url": menu[i].url}
								);
								t = $(t);
								ondeLinks
								.append(t);
							} else {
								t = Mustache.to_html(
									template1,
									{"nome":menu[i].text}
								);
								t = $(t);
								t.find("a")
									.data(datan)
									.click(function(){
										$(this).find("a").off("click");
										var data = $(this).data();
										var t = Mustache.to_html(
												template2,
												data
											);
										//texto da migalha e evento click
										//nivel2(data);
										ondeFolder.fadeOut( "fast", function(){nivel2(data);ondeFolder.show();});
									});
								ondeFolder
								.append(t);
							}
						}
						data.nivel = 1;
						data.nome = confm.menu[data.id].nome;
						data.n0 = data.id;
						migalha(data);
					};
					var nivel2 = function(data){
						var menu = confm.submenus[confm.menu[data.n0].id][data.n1].submenu.itemdata[0],
							n = menu.length,
							i,t,datan;

						ondeFolder.html("");
						ondeLinks.html("");
						for (i = 0; i < n; i += 1) {
							datan = {"nivel":3,"nome":menu[i].text,"id":menu[i].id,"n0": data.n0, "n1":data.n1, "n2": i, "n3": ""};
							if(menu[i].url){
								t = Mustache.to_html(
									template3,
									{"nome":menu[i].text,"target": menu[i].target,"url": menu[i].url}
								);
								t = $(t);
								ondeLinks
								.append(t);
							} else {
								t = Mustache.to_html(
									template1,
									{"nome":menu[i].text}
								);
								t = $(t);
								t.find("a")
									.data(datan)
									.click(function(){
										$(this).find("a").off("click");
										var data = $(this).data();
										var t = Mustache.to_html(
												template2,
												data
											);
									});
								ondeFolder
								.append(t);
							}
						}
						data.nivel = 2;
						data.id = data.n0;
						migalha(data);
					};
					nivel0();
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
			if(!$i("i3GEOguiaMovelMolde").style.height){
				$("#i3GEOguiaMovelMolde,#i3GEOguiaMovelConteudo").css("height",i3GEO.parametros.h + "px");
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

			// nao tem conteudo para mostrar
			var f="" ;
			if (!$i(i3GEO.guias.CONFIGURA[chave].idconteudo)) {
				f = i3GEO.guias.CONFIGURA[chave].click.apply(f,[obj]);
				return;
			}
			i3GEO.guias.escondeGuias();
			i3GEO.guias.abreFecha("abre");
			if (i3GEO.guias.CONFIGURA[chave].click) {
				f = i3GEO.guias.CONFIGURA[chave].click.apply(f,[obj]);
			}
			i3GEO.guias.mostra(chave);
		},
		/**
		 * Function: abreFecha
		 *
		 * Abre ou fecha a guia m&oacute;vel
		 */
		abreFecha : function(forca) {
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
				molde.animate(
						{ "width": "-10px" },
						"slow"
				);
			} else {
				$("#i3GEOguiaMovelIcones,#i3GEOguiaMovelConteudo").css("display","block");
				molde.css("display","block").animate(
						{ "width": i3GEO.guias.LARGURAGUIAMOVEL + "px" },
						"slow"
				);
			}
		},
		mostraGuiaFerramenta : function(guia, namespace) {
			var g, Dom = YAHOO.util.Dom;
			if (!namespace) {
				namespace = "guia";
			}
			for (g = 0; g < 12; g++) {
				Dom.setStyle(namespace + g + "obj", "display", "none");
			}
			Dom.setStyle(guia + "obj", "display", "block");
		}
};