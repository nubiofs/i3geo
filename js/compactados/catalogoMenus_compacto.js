i3GEO.catalogoMenus={IDSMENUS:[],MENU:"",GRUPO:"",SUBGRUPO:"",config:{"templateDir":"templates/dir.html","templateTema":"templates/tema.html","idOndeMenus":"catalogoMenus","idCatalogoPrincipal":"catalogoPrincipal","idCatalogoNavegacao":"catalogoNavegacao","idOndeMigalha":"catalogoMigalha"},carregaTemplates:function(){var t1=i3GEO.catalogoMenus.config.templateDir,t2=i3GEO.catalogoMenus.config.templateTema,t3=$("#"+i3GEO.catalogoMenus.config.idOndeMigalha).attr("data-template");$.when($.get(t1),$.get(t2),$.get(t3)).done(function(r1,r2,r3){i3GEO.template.dir=r1[0];i3GEO.template.tema=r2[0];i3GEO.template.catalogoMigalha=r3[0];i3GEO.catalogoMenus.listaMenus()}).fail(function(){i3GEO.janela.closeMsg($trad("erroTpl"));return})},aguarde:function(){$("#"+i3GEO.catalogoMenus.config.idOndeMenus).html($trad("o1"))},atualizaMigalha:function(nome,onclick){var t=Mustache.to_html(i3GEO.template.catalogoMigalha,{"nome":nome,"onclick":onclick});$("#"+i3GEO.catalogoMenus.config.idOndeMigalha).html(t)},escondeCatalogoPrincipal:function(){$("#"+i3GEO.catalogoMenus.config.idCatalogoPrincipal).hide()},mostraCatalogoPrincipal:function(){$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).fadeOut("fast",function(){$("#"+i3GEO.catalogoMenus.config.idOndeMigalha).hide();$("#"+i3GEO.catalogoMenus.config.idCatalogoPrincipal).show()})},adicionaTema:function(tid){if(i3GEO.arvoreDeCamadas.pegaTema(tid)!==""){i3GEO.janela.tempoMsg($trad("x76"))}else{i3GEO.php.adtema(i3GEO.atualiza,tid)}},listaMenus:function(config){if(config){$.each(config,function(i,v){i3GEO.catalogoMenus.config[i]=v})}i3GEO.catalogoMenus.aguarde();if(!i3GEO.template.dir||!i3GEO.template.tema||!i3GEO.template.catalogoMigalha){i3GEO.catalogoMenus.carregaTemplates();return}else{config=i3GEO.catalogoMenus.config;if(i3GEO.arvoreDeTemas&&i3GEO.arvoreDeTemas.IDSMENUS&&i3GEO.arvoreDeTemas.IDSMENUS.length>0){i3GEO.catalogoMenus.IDSMENUS=i3GEO.arvoreDeTemas.IDSMENUS}var montaMenus=function(dados){var menus=dados.data,clone=[],n=i3GEO.catalogoMenus.IDSMENUS.length,t;$.each(menus,function(i,v){if(n===0||i3GEO.catalogoMenus.IDSMENUS.indexOf(v.idmenu)>=0||i3GEO.catalogoMenus.IDSMENUS.indexOf(v.idmenu*1)>=0){v.nome=v.nomemenu;v.descricao=v.desc;v.onclick="i3GEO.catalogoMenus.listaGrupos("+v.idmenu+",'"+v.nome+"')";if(v.publicado.toLowerCase()=="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}clone.push(v)}});t=Mustache.to_html("{{#data}}"+i3GEO.template.dir+"{{/data}}",{"data":clone});$("#"+config.idOndeMenus).html(t)};i3GEO.php.pegalistademenus(montaMenus)}},listaGrupos:function(idmenu,nomeMigalha){$("#i3GEOguiaMovelConteudo").scrollTop(0);i3GEO.catalogoMenus.MENU=nomeMigalha;i3GEO.catalogoMenus.atualizaMigalha(nomeMigalha,"i3GEO.catalogoMenus.mostraCatalogoPrincipal()");var montaGrupos=function(dados){var grupos=dados.data.grupos,clone=[],config=i3GEO.catalogoMenus.config,g="",t="",temas=[];$.each(grupos,function(i,v){if(v.id_n1){v.onclick="i3GEO.catalogoMenus.listaSubGrupos("+idmenu+","+v.id_n1+",'"+v.nome+"','"+nomeMigalha+"')";if(v.publicado.toLowerCase()=="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}clone.push(v)}if(v.temasraiz){temas=v.temasraiz}});g=Mustache.to_html("{{#data}}"+i3GEO.template.dir+"{{/data}}",{"data":clone});clone=[];$.each(temas,function(i,v){v.onclick="i3GEO.catalogoMenus.adicionaTema('"+v.codigo_tema+"')";if(v.publicado.toLowerCase()=="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}if(v.link&&v.link.trim()!=""){v.link="<a href='"+v.link+"' target='_blank' >Link</a>"}clone.push(v)});t=Mustache.to_html("{{#data}}"+i3GEO.template.tema+"{{/data}}",{"data":clone});$("#"+config.idCatalogoNavegacao).html(t+g);$("#"+config.idCatalogoPrincipal).fadeOut("fast",function(){$("#"+i3GEO.catalogoMenus.config.idOndeMigalha).show();$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).show()})};i3GEO.php.pegalistadegrupos(montaGrupos,idmenu,"nao")},listaSubGrupos:function(idmenu,id_n1,nomeMigalha){$("#i3GEOguiaMovelConteudo").scrollTop(0);i3GEO.catalogoMenus.GRUPO=nomeMigalha;i3GEO.catalogoMenus.escondeCatalogoPrincipal();i3GEO.catalogoMenus.atualizaMigalha(nomeMigalha,"i3GEO.catalogoMenus.listaGrupos('"+idmenu+"','"+i3GEO.catalogoMenus.MENU+"')");var montaSubGrupos=function(dados){var subgrupos=dados.data.subgrupo,clone=[],g="",t="",temas;$.each(subgrupos,function(i,v){if(v.id_n2){v.onclick="i3GEO.catalogoMenus.listaTemasSubgrupo("+idmenu+","+id_n1+","+v.id_n2+",'"+v.nome+"')";if(v.publicado.toLowerCase()=="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}clone.push(v)}});g=Mustache.to_html("{{#data}}"+i3GEO.template.dir+"{{/data}}",{"data":clone});clone=[];temas=dados.data.temasgrupo;$.each(temas,function(i,v){v.onclick="i3GEO.catalogoMenus.adicionaTema('"+v.codigo_tema+"')";if(v.publicado.toLowerCase()=="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}if(v.link&&v.link.trim()!=""){v.link="<a href='"+v.link+"' target='_blank' >Link</a>"}clone.push(v)});t=Mustache.to_html("{{#data}}"+i3GEO.template.tema+"{{/data}}",{"data":clone});$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).fadeOut("fast",function(){$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).html(t+g);$("#"+i3GEO.catalogoMenus.config.idOndeMigalha).show();$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).show()})};i3GEO.php.pegalistadeSubgrupos(montaSubGrupos,idmenu,id_n1)},listaTemasSubgrupo:function(idmenu,id_n1,id_n2,nomeMigalha){$("#i3GEOguiaMovelConteudo").scrollTop(0);i3GEO.catalogoMenus.SUBGRUPO=nomeMigalha;i3GEO.catalogoMenus.escondeCatalogoPrincipal();i3GEO.catalogoMenus.atualizaMigalha(nomeMigalha,"i3GEO.catalogoMenus.listaSubGrupos("+idmenu+","+id_n1+",'"+i3GEO.catalogoMenus.GRUPO+"')");var montaTemas=function(dados){var temas=dados.data.temas,clone=[],t="";clone=[];$.each(temas,function(i,v){v.onclick="i3GEO.catalogoMenus.adicionaTema('"+v.codigo_tema+"')";if(v.publicado.toLowerCase()=="nao"){v.nome=v.nome+" <small>("+$trad("naoPublicado")+")<small>"}if(v.link&&v.link.trim()!=""){v.link="<a href='"+v.link+"' target='_blank' >Link</a>"}clone.push(v)});t=Mustache.to_html("{{#data}}"+i3GEO.template.tema+"{{/data}}",{"data":clone});$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).fadeOut("fast",function(){$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).html(t);$("#"+i3GEO.catalogoMenus.config.idOndeMigalha).show();$("#"+i3GEO.catalogoMenus.config.idCatalogoNavegacao).show()})};i3GEO.php.pegalistadetemas(montaTemas,idmenu,id_n1,id_n2)}};