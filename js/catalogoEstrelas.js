i3GEO.catalogoEstrelas = {
	MIGALHA: [],
	config: {
		'templateDir': 'templates/dir.html',
		'templateTema': 'templates/tema.html',
		'idCatalogoPrincipal': 'catalogoPrincipal',
		'idCatalogoNavegacao': 'catalogoNavegacao',
		'idOndeMigalha': 'catalogoMigalha',
		'valorEstrela': 5,
		'numEstrelas' : 3
	},
	nget: 0,
	carregaTemplates: function(){
		if(i3GEO.catalogoEstrelas.nget == 0){
			i3GEO.catalogoEstrelas.nget = 3;
			if(!i3GEO.template.dir){
				$.get(i3GEO.catalogoEstrelas.config.templateDir, function(template) {
					i3GEO.template.dir = template;
					i3GEO.catalogoEstrelas.nget = i3GEO.catalogoEstrelas.nget - 1;
					if(i3GEO.catalogoEstrelas.nget == 0){
						i3GEO.catalogoEstrelas.inicia();
					}
				});
			} else {
				i3GEO.catalogoEstrelas.nget = i3GEO.catalogoEstrelas.nget - 1;
			}
			if(!i3GEO.template.tema){
				$.get(i3GEO.catalogoEstrelas.config.templateTema, function(template) {
					i3GEO.template.tema = template;
					i3GEO.catalogoEstrelas.nget = i3GEO.catalogoEstrelas.nget - 1;
					if(i3GEO.catalogoEstrelas.nget == 0){
						i3GEO.catalogoEstrelas.inicia();
					}
				});
			} else {
				i3GEO.catalogoEstrelas.nget = i3GEO.catalogoEstrelas.nget - 1;
			}
			if(!i3GEO.template.catalogoMigalha){
				$.get($("#" + i3GEO.catalogoEstrelas.config.idOndeMigalha).attr("data-template"), function(template) {
					i3GEO.template.catalogoMigalha = template;
					i3GEO.catalogoEstrelas.nget = i3GEO.catalogoEstrelas.nget - 1;
					if(i3GEO.catalogoEstrelas.nget == 0){
						i3GEO.catalogoEstrelas.inicia();
					}
				});
			} else {
				i3GEO.catalogoEstrelas.nget = i3GEO.catalogoEstrelas.nget - 1;
			}
		}
	},
	aguarde: function(){
		$("#" + i3GEO.catalogoEstrelas.config.idCatalogoNavegacao).html($trad("o1"));
	},
	atualizaMigalha: function(){
		var migalha = i3GEO.catalogoEstrelas.MIGALHA;
		var n = migalha.length;

		var nome = migalha[n - 1].nome;
		var onclick = migalha[n - 2].onclick;

		var t = Mustache.to_html(
				i3GEO.template.catalogoMigalha,
				{"nome":nome,"onclick":"i3GEO.catalogoEstrelas.MIGALHA.pop();i3GEO.catalogoEstrelas.MIGALHA.pop();" + onclick}
			);

		$("#" + i3GEO.catalogoEstrelas.config.idOndeMigalha).html(t);
		$("#i3GEOguiaMovelConteudo").scrollTop(0);
	},
	escondeCatalogoPrincipal: function(){
		$("#" + i3GEO.catalogoEstrelas.config.idCatalogoPrincipal).hide();
	},
	mostraCatalogoPrincipal: function(){
		$("#" + i3GEO.catalogoEstrelas.config.idCatalogoNavegacao).fadeOut( "fast", function(){
			$("#" + i3GEO.catalogoEstrelas.config.idOndeMigalha).hide();
			$("#" + i3GEO.catalogoEstrelas.config.idCatalogoPrincipal).show();
		});
	},
	adicionaTema : function(tid) {
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoEstrelas.adicionaTema");

		// confirma se o tema existe no mapa
		if (i3GEO.arvoreDeCamadas.pegaTema(tid) !== "") {
			i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid, true);
		} else {
			i3GEO.arvoreDeTemas.adicionaTemas([ tid ]);
		}
	},
	inicia: function(config){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoEstrelas.inicia");

		if(config){
			$.each( config, function( i,v ) {
				i3GEO.catalogoEstrelas.config[i] = v;
			});
		}
		i3GEO.catalogoEstrelas.aguarde();
		if(!i3GEO.template.dir || !i3GEO.template.tema || !i3GEO.template.catalogoMigalha){
			i3GEO.catalogoEstrelas.carregaTemplates();
		} else {
			i3GEO.catalogoEstrelas.MIGALHA = [
			{"nome":"","onclick":"i3GEO.catalogoEstrelas.mostraCatalogoPrincipal()"},
			{"nome":$trad("t46"),"onclick":"i3GEO.catalogoEstrelas.inicia()"}
			];
			i3GEO.catalogoEstrelas.atualizaMigalha();

			config = i3GEO.catalogoEstrelas.config;

			i3GEO.catalogoEstrelas.escondeCatalogoPrincipal();

			var t = Mustache.to_html(
					i3GEO.template.catalogoMigalha,
					{"nome":$trad("x57"),"onclick":"i3GEO.catalogoEstrelas.mostraCatalogoPrincipal()"}
				);

			var dados= [],
				estrela = '<span class="material-icons">star</span>',
				estrelas = [],
				t,i;

			for(i=config.numEstrelas;i<6;i++){
				estrelas = [];
				for (var n = 0; n < i; n++){
					estrelas.push(estrela);
				}
				dados.push({
					"nome": estrelas.join(""),
					"onclick": "i3GEO.catalogoEstrelas.listaCamadas(" + i + ")"
				});
			}
			t = Mustache.to_html(
				"{{#data}}" + i3GEO.template.dir + "{{/data}}",
				{"data":dados}
			);
			$("#" + config.idCatalogoNavegacao).html(t);

			$("#" + i3GEO.catalogoEstrelas.config.idCatalogoPrincipal).fadeOut( "fast", function(){
				$("#" + i3GEO.catalogoEstrelas.config.idOndeMigalha).show();
				$("#" + i3GEO.catalogoEstrelas.config.idCatalogoNavegacao).show();
			});
		}
	},
	listaCamadas: function(numEstrelas){
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.catalogoEstrelas.listaCamadas");

		i3GEO.catalogoEstrelas.MIGALHA.push({"nome": numEstrelas,"onclick":"i3GEO.catalogoEstrelas.listaCamadas(" + numEstrelas + ")"});
		i3GEO.catalogoEstrelas.atualizaMigalha();

		i3GEO.catalogoEstrelas.aguarde();

		var lista = function(dados){
			//pega os registros
			data = dados.data;
			var clone = [];
			$.each( data, function( i,v ) {
				var temas,subgrupos;
				temas = v.temas;
				$.each( temas, function( i,v ) {
					clone.push({
						"nome":v.nome,
						"descricao":"",
						"link":"",
						"onclick":"i3GEO.catalogoEstrelas.adiciona('" + v.codigo_tema + "');"
					});
				});
				subgrupos = v.subgrupos;
				$.each( subgrupos, function( i,v ) {
					var temas = v.temas;
					$.each( temas, function( i,v ) {
						clone.push({
							"nome":v.nome,
							"descricao":"",
							"link":"",
							"onclick":"i3GEO.catalogoEstrelas.adiciona('" + v.codigo_tema + "');"
						});
					});
				});
			});
			var t = Mustache.to_html(
					"{{#data}}" + i3GEO.template.tema + "{{/data}}",
					{"data":clone}
				);
			$("#" + i3GEO.catalogoEstrelas.config.idCatalogoNavegacao).html(t);
		};
		i3GEO.php.procurartemasestrela(lista,numEstrelas * 1,i3GEO.catalogoEstrelas.config.valorEstrela * 1);
	},
	adiciona : function(tid){
		// confirma se o tema existe no mapa
		if (i3GEO.arvoreDeCamadas.pegaTema(tid) !== "") {
			i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid, true);
		} else {
			i3GEO.php.adtema(i3GEO.atualiza, tid);
		}
	}
};