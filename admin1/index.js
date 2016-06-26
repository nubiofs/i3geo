/*
 * Constroi o menu principal que e repetido em todas as paginas
 */
i3GEOadmin = {};
function iniciaMenuPrincipal(){
var l = [],
menuPrincipal = [
	{
		html: $trad("configGeral",i3GEOadmin.menup.dicionario),
		children:[
			{
				html: $trad("outrasOpc",i3GEOadmin.menup.dicionario),
				children:[
					{
					html: "<a href='php/estatisticas.php' >"+$trad("estat",i3GEOadmin.menup.dicionario)+"</a>"
					},{
					html: "<a href='php/sqlite.php' >"+$trad("descricaoBd",i3GEOadmin.menup.dicionario)+"</a>"
					},{
					html: "<a href='php/criabanco.php' >"+$trad("criaBd",i3GEOadmin.menup.dicionario)+"</a>"
					},{
					html: "<a href='../geraminiatura.php' >"+$trad("geraMiniatura",i3GEOadmin.menup.dicionario)+"</a>"
					}
				]
			},
			{
			html: "<a href='../ms_criamapa.php' >"+$trad("abre",i3GEOadmin.menup.dicionario)+"</a>"
			},{
			html: "<a href='../testainstal.php' >"+$trad("testaInstal",i3GEOadmin.menup.dicionario)+"</a>"
			},{
			html: "<a href='../classesjs/compactajs.php' >"+$trad("compacta",i3GEOadmin.menup.dicionario)+"</a>"
			}
		]
	},{
	html: $trad("contAcesso",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/operacoes.html' >"+$trad("controleOperac",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/usuarios.html' >"+$trad("cadastroUsuario",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/gruposusuarios.html' >"+$trad("cadastroGrupos",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("metadadosEstatisticos",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='http://i3geo.com.br/i3geosaude/docs/index.php?conteudo=fluxograma.html' >"+$trad("documentacao",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_variavel.html' >"+$trad("cadastroVariav",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_mapa.html' >"+$trad("cadastroMapas",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_unidade_medida.html' >"+$trad("cadastroMedidas",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_tipo_periodo.html' >"+$trad("cadastroPeriodos",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_conexao.html' >"+$trad("cadastroConexoes",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_tipo_regiao.html' >"+$trad("cadastroTabelas",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_fonteinfo.html' >"+$trad("cadastroFonte",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_editor.html' >"+$trad("gerenciaBd",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlmetaestatogc.php' >"+$trad("xmlWmsMetaestat",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='rssmapas.php' >"+$trad("verRss",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("enviarArquivo",i3GEOadmin.menup.dicionario),
	type: "html",
	children:[
		{
		html: "<a href='html/subirshapefile.html' >"+$trad("enviarShp",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/estat_editor.html' >"+$trad("gerenciaBd",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/subirsimbolo.html' >"+$trad("uploadSimbolo",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("editaMapfile",i3GEOadmin.menup.dicionario),
	type: "html",
	children:[
		{
		html: "<a href='html/editormapfile.html' >"+$trad("editorMapfile",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/menus.html' >"+$trad("editorMenus",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/arvore.html' >"+$trad("arvoreTemas",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/subirsimbolo.html' >"+$trad("uploadSimbolo",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='rssgrupos.php?output=xml' >"+$trad("rssArvore",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='rssgrupos.php?output=json' >"+$trad("rssArvoreJson",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='rsscomentariostemas.php' >"+$trad("rssComentarios",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("linkMapas",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/mapas.html' >"+$trad("editaLinks",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlmapas.php' >"+$trad("xmlMapas",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='rssmapas.php' >"+$trad("rssMapas",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='rssmapas.php?output=json' >"+$trad("rssMapasJson",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("editaMenus",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/arvore.html' >"+$trad("editaArvore",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/menus.html' >"+$trad("editaListaMenus",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("editaTabelasAux",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/perfis.html' >"+$trad("editaPerfil",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='html/tags.html' >"+$trad("editaTags",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("atlas",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/atlas.html' >"+$trad("editaAtlas",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("webServ",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/webservices.html' >"+$trad("editaWebServ",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlservicosws.php' >"+$trad("xmlWebServ",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlservicosws.php?output=json' >"+$trad("xmlWebServJson",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlservicoswms.php' >"+$trad("xmlWms",i3GEOadmin.menup.dicionario)+"</a>"
		},{
			html: "<a href='xmlservicoswms.php?output=json' >"+$trad("xmlWmsJson",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlgeorss.php' >"+$trad("xmlGeoRss",i3GEOadmin.menup.dicionario)+"</a>"
		},{
			html: "<a href='xmlgeorss.php?output=json' >"+$trad("xmlGeoRssJson",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("sistIdentifica",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/identifica.html' >"+$trad("editaIdentifica",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]},{
	html: $trad("sistAdiciona",i3GEOadmin.menup.dicionario),
	children:[
		{
		html: "<a href='html/sistemas.html' >"+$trad("editaSist",i3GEOadmin.menup.dicionario)+"</a>"
		},{
		html: "<a href='xmlsistemas.php' >"+$trad("xmlSistAdiciona",i3GEOadmin.menup.dicionario)+"</a>"
		}
	]}
];
	//menu
	$(menuPrincipal).each(
		function(i,el){
			l.push('<li class="dropdown" ><a href="#" class="dropdown-toggle" data-toggle="dropdown" >' + el.html + '<span class="caret"></span></a>');
			if(el.children){
				l.push('<ul class="dropdown-menu">');
				$(el.children).each(
					function(i,el){

						if(el.children){
							l.push('<li class="dropdown dropdown-submenu" ><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + el.html + '</a>');

							l.push('<ul class="dropdown-menu">');
							$(el.children).each(
								function(i,el){
									l.push('<li>' + el.html + '</li>');
								}
							);
							l.push('</ul>');
						}
						else{
							l.push('<li>' + el.html);
						}
						l.push('</li>');
					}
				);
				l.push('</ul>');
			}
			l.push('</li>');
		}
	);
	$("#menuPrincipalTpl").html(l.join(""));
}
