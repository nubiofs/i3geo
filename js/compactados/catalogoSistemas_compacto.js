i3GEO.catalogoSistemas={MIGALHA:[],DADOS:"",config:{'templateDir':'templates/dir.html','templateTema':'templates/tema.html','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'},nget:0,carregaTemplates:function(){if(i3GEO.catalogoSistemas.nget==0){i3GEO.catalogoSistemas.nget=3;if(!i3GEO.template.dir){$.get(i3GEO.catalogoSistemas.config.templateDir,function(template){i3GEO.template.dir=template;i3GEO.catalogoSistemas.nget=i3GEO.catalogoSistemas.nget-1;if(i3GEO.catalogoSistemas.nget==0){i3GEO.catalogoSistemas.inicia()}})}else{i3GEO.catalogoSistemas.nget=i3GEO.catalogoSistemas.nget-1}if(!i3GEO.template.tema){$.get(i3GEO.catalogoSistemas.config.templateTema,function(template){i3GEO.template.tema=template;i3GEO.catalogoSistemas.nget=i3GEO.catalogoSistemas.nget-1;if(i3GEO.catalogoSistemas.nget==0){i3GEO.catalogoSistemas.inicia()}})}else{i3GEO.catalogoSistemas.nget=i3GEO.catalogoSistemas.nget-1}if(!i3GEO.template.catalogoMigalha){$.get($("#"+i3GEO.catalogoSistemas.config.idOndeMigalha).attr("data-template"),function(template){i3GEO.template.catalogoMigalha=template;i3GEO.catalogoSistemas.nget=i3GEO.catalogoSistemas.nget-1;if(i3GEO.catalogoSistemas.nget==0){i3GEO.catalogoSistemas.inicia()}})}else{i3GEO.catalogoSistemas.nget=i3GEO.catalogoSistemas.nget-1}}},aguarde:function(){$("#"+i3GEO.catalogoSistemas.config.idCatalogoNavegacao).html($trad("o1"))},atualizaMigalha:function(){var migalha=i3GEO.catalogoSistemas.MIGALHA;var n=migalha.length;var nome=migalha[n-1].nome;var onclick=migalha[n-2].onclick;var t=Mustache.to_html(i3GEO.template.catalogoMigalha,{"nome":nome,"onclick":"i3GEO.catalogoSistemas.MIGALHA.pop();i3GEO.catalogoSistemas.MIGALHA.pop();"+onclick});$("#"+i3GEO.catalogoSistemas.config.idOndeMigalha).html(t);$("#i3GEOguiaMovelConteudo").scrollTop(0)},escondeCatalogoPrincipal:function(){$("#"+i3GEO.catalogoSistemas.config.idCatalogoPrincipal).hide()},mostraCatalogoPrincipal:function(){$("#"+i3GEO.catalogoSistemas.config.idCatalogoNavegacao).fadeOut("fast",function(){$("#"+i3GEO.catalogoSistemas.config.idOndeMigalha).hide();$("#"+i3GEO.catalogoSistemas.config.idCatalogoPrincipal).show()})},adicionaTema:function(tid){if(i3GEO.arvoreDeCamadas.pegaTema(tid)!==""){i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid,true)}else{i3GEO.arvoreDeTemas.adicionaTemas([tid])}},inicia:function(config){if(config){$.each(config,function(i,v){i3GEO.catalogoSistemas.config[i]=v})}i3GEO.catalogoSistemas.aguarde();if(!i3GEO.template.dir||!i3GEO.template.tema||!i3GEO.template.catalogoMigalha){i3GEO.catalogoSistemas.carregaTemplates();return}else{i3GEO.catalogoSistemas.MIGALHA=[{"nome":"","onclick":"i3GEO.catalogoSistemas.mostraCatalogoPrincipal()"},{"nome":$trad("a11"),"onclick":"i3GEO.catalogoSistemas.inicia()"}];i3GEO.catalogoSistemas.atualizaMigalha();config=i3GEO.catalogoSistemas.config;i3GEO.catalogoSistemas.escondeCatalogoPrincipal();var t=Mustache.to_html(i3GEO.template.catalogoMigalha,{"nome":$trad("x57"),"onclick":"i3GEO.catalogoSistemas.mostraCatalogoPrincipal()"});var lista=function(dados){var clone=[],t;i3GEO.catalogoSistemas.DADOS=dados;$.each(dados.data,function(i,v){v.onclick="i3GEO.catalogoSistemas.listaFuncoes("+i+",'"+v.NOME+"')";v.nome=v.NOME;if(v.PUBLICADO.toLowerCase()!="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}if(v.PUBLICADO.toLowerCase()!="nao"){clone.push(v)}});t=Mustache.to_html("{{#data}}"+i3GEO.template.dir+"{{/data}}",{"data":clone});$("#"+config.idCatalogoNavegacao).html(t);$("#"+i3GEO.catalogoSistemas.config.idCatalogoPrincipal).fadeOut("fast",function(){$("#"+i3GEO.catalogoSistemas.config.idOndeMigalha).show();$("#"+i3GEO.catalogoSistemas.config.idCatalogoNavegacao).show()})};i3GEO.php.pegaSistemas(lista)}},listaFuncoes:function(id,nome){i3GEO.catalogoSistemas.MIGALHA.push({"nome":nome,"onclick":"i3GEO.catalogoSistemas.listaFuncoes("+id+",'"+nome+"')"});i3GEO.catalogoSistemas.atualizaMigalha();var clone=[],g="",temas;$.each(i3GEO.catalogoSistemas.DADOS.data[id].FUNCOES,function(i,v){v.onclick="i3GEO.catalogoSistemas.adiciona('"+v.W+"px','"+v.H+"px','"+v.ABRIR+"')";v.nome=v.NOME;clone.push(v)});var t=Mustache.to_html("{{#data}}"+i3GEO.template.tema+"{{/data}}",{"data":clone});$("#"+i3GEO.catalogoSistemas.config.idCatalogoNavegacao).html(t)},adiciona:function(w,h,f){i3GEO.janela.cria(w,h,f,'','',$trad("a11"))}};