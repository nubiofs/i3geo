var i3GEOF=[];var i3GEOadmin=[];if(typeof YAHOO!="undefined"){YAHOO.namespace("i3GEO")}var i3GEO={tamanhodoc:[],parametros:{mapexten:"",mapscale:"",mapres:"",pixelsize:"",mapfile:"",cgi:"",extentTotal:"",mapimagem:"",geoip:"",utilizacgi:"",versaoms:"",versaomscompleta:"",mensagens:"",w:"",h:"",locsistemas:"",locidentifica:"",r:"",locmapas:"",celularef:"",kmlurl:"",mensageminicia:"",interfacePadrao:"openlayers.htm",autenticadoopenid:"nao",cordefundo:"",copyright:"",editor:"nao"},scrollerWidth:"",finaliza:"",finalizaAPI:"",temaAtivo:"",contadorAtualiza:0,init:function(parametrosMapa,configMapa){if($.material){$.material.init()}if(configMapa&&configMapa!=""){i3GEO.configMapa(configMapa)}if(parametrosMapa&&parametrosMapa!=""){i3GEO.configura.mashuppar=i3GEO.parametrosMapa2mashuppar(parametrosMapa)}else{i3GEO.configura.mashuppar=""}i3GEO.cria();i3GEO.inicia()},configMapa:function(c){i3GEO.configura.guardaExtensao=(c.hasOwnProperty("saveExtension")&&c.saveExtension==true)?true:false;i3GEO.configura.tipoimagem=(c.hasOwnProperty("posRenderType")&&c.posRenderType!="")?c.posRenderType:"nenhum";i3GEO.configura.locaplic=(c.hasOwnProperty("i3GeoServer")&&c.i3GeoServer!="")?c.i3GeoServer:i3GEO.util.protocolo()+"://"+window.location.host+"/i3geo";if(c.hasOwnProperty("tools")){i3GEO.configura.ferramentas=c.tools}if(c.hasOwnProperty("layerOpacity")&&c.hasOwnProperty("layerOpacity")!=""){i3GEO.Interface.LAYEROPACITY=c.layerOpacity}i3GEO.Interface.IDCORPO=(c.hasOwnProperty("mapBody")&&c.mapBody!="")?c.mapBody:"mapai3Geo";i3GEO.finalizaAPI=(c.hasOwnProperty("afterStart")&&c.afterStart!="")?c.afterStart:"";if(c.hasOwnProperty("components")){i3GEO.arvoreDeTemas.IDSMENUS=(c.components.hasOwnProperty("idsMenus"))?c.components.idsMenus:[];i3GEO.catalogoMenus.IDSMENUS=(c.components.hasOwnProperty("idsMenus"))?c.components.idsMenus:[];i3GEO.busca.SERVICO=(c.components.hasOwnProperty("searchService"))?c.components.searchService:"";i3GEO.busca.SERVICOWMS=(c.components.hasOwnProperty("searchWms"))?c.components.searchWms:"";i3GEO.mapa.BALAOATIVO=(c.components.hasOwnProperty("info"))?c.components.info:true;if(c.components.referenceMapPosition){i3GEO.maparef.TOP=c.components.referenceMapPosition[0];i3GEO.maparef.RIGHT=c.components.referenceMapPosition[1]}if(c.components.scrollBar){i3GEO.janela.scrollBar=c.components.scrollBar}if(c.components.tooltip){var p=i3GEO.Interface[i3GEO.Interface.ATUAL].BALAOPROP;p.removeAoAdicionar=(c.components.tooltip.hasOwnProperty("removeAoAdicionar"))?c.components.tooltip.removeAoAdicionar:true;p.autoPan=(c.components.tooltip.hasOwnProperty("autoPan"))?c.components.tooltip.autoPan:true;p.modal=(c.components.tooltip.hasOwnProperty("modal"))?c.components.tooltip.modal:false;p.url=(c.components.tooltip.hasOwnProperty("url"))?c.components.tooltip.url:"";p.templateModal=(c.components.tooltip.hasOwnProperty("templateModal"))?c.components.tooltip.templateModal:"";p.simple=(c.components.tooltip.hasOwnProperty("simple"))?c.components.tooltip.simple:true;p.minWidth=(c.components.tooltip.hasOwnProperty("minWidth"))?c.components.tooltip.minWidth:'';p.url=(c.components.tooltip.hasOwnProperty("url"))?c.components.tooltip.url:'200px';p.autoPanAnimation=(c.components.tooltip.hasOwnProperty("autoPanAnimation"))?c.components.tooltip.autoPanAnimation:p.autoPanAnimation;if(c.components.tooltip.hasOwnProperty("toolTipSize")){i3GEO.configura.alturatip=c.components.tooltip.toolTipSize[0];i3GEO.configura.larguratip=c.components.tooltip.toolTipSize[1]}}}if(c.hasOwnProperty("openLayers")&&c.mapType!=="GM"){var d=c.openLayers;i3GEO.Interface.ATUAL="openlayers";i3GEO.Interface.openlayers.googleLike=(c.mapType=="OSM")?true:false;i3GEO.Interface.openlayers.TILES=(d.hasOwnProperty("singleTile")&&d.singleTile!="")?!d.singleTile:true;i3GEO.Interface.openlayers.parametrosMap=d.MapOptions;i3GEO.Interface.openlayers.parametrosView=d.ViewOptions;if(d.hasOwnProperty("editorButtons")&&d.editorButtons!=""){i3GEO.editor.botoes=d.editorButtons}}if(c.hasOwnProperty("googleMaps")&&c.mapType=="GM"){i3GEO.Interface.ATUAL="googlemaps";i3GEO.Interface.googlemaps.ESTILOPADRAO=c.googleMaps.MapOptions.mapTypeId;i3GEO.Interface.googlemaps.MAPOPTIONS=c.googleMaps.MapOptions}},parametrosMapa2mashuppar:function(p){var par=[],temp;if(p.hasOwnProperty("mapfilebase")&&p.mapfilebase!=""){par.push("&base="+p.mapfilebase)}if(p.hasOwnProperty("mapext")&&p.mapext!=""&&p.mapext.length==4){par.push("&mapext="+p.mapext.join(","));i3GEO.configura.guardaExtensao=false}if(p.hasOwnProperty("perfil")&&p.perfil!=""){par.push("&perfil="+p.perfil)}if(p.hasOwnProperty("layers")){if(p.layers.add&&p.layers.add.length>0){par.push("&temasa="+p.layers.add.join(","))}if(p.layers.on&&p.layers.on.length>0){par.push("&layers="+p.layers.on.join(","))}if(p.layers.off&&p.layers.off.length>0){par.push("&desligar="+p.layers.off.join(","))}if(p.layers.metaestat&&p.layers.metaestat.length>0){par.push("&metaestatids="+p.layers.metaestat.join(","))}}if(p.hasOwnProperty("points")&&p.points.coord.length>0){par.push("&nometemapontos="+p.points.title);par.push("&pontos="+p.points.coord.join(","))}if(p.hasOwnProperty("cacheOff")&&p.cacheOff=="sim"){par.push("&DESLIGACACHE=sim")}if(p.hasOwnProperty("lines")){var n=[];jQuery.each(p.lines.coord,function(index,value){if(value.length>0){n.push(value.join(" "))}});if(n.length>0){par.push("&nometemalinhas="+p.lines.title);par.push("&linhas="+n.join(","))}}if(p.hasOwnProperty("polygons")){var n=[];jQuery.each(p.polygons.coord,function(index,value){if(value.length>0){n.push(value.join(" "))}});if(n.length>0){par.push("&nometemapoligonos="+p.polygons.title);par.push("&poligonos="+n.join(","))}}if(p.hasOwnProperty("wkt")&&p.wkt.coord!=""){par.push("&nometemawkt="+p.wkt.title);par.push("&wkt="+p.wkt.coord)}if(p.hasOwnProperty("symbol")){if(p.symbol.name!=""){par.push("&simbolo="+p.symbol.name)}if(p.symbol.color!=""){par.push("&corsimbolo="+p.symbol.color)}if(p.symbol.size!=""){par.push("&tamanhosimbolo="+p.symbol.size)}}if(p.kml&&p.kml.url!=""){par.push("&kmlurl="+p.kml.url)}if(p.hasOwnProperty("wms")&&p.wms.url!=""){if(p.wms.url!=""){par.push("&url_wms="+p.wms.url)}if(p.wms.layer!=""){par.push("&layer_wms="+p.wms.layer)}if(p.wms.style!=""){par.push("&style_wms="+p.wms.style)}if(p.wms.title!=""){par.push("&nome_wms="+p.wms.title)}if(p.wms.srs!=""){par.push("&srs_wms="+p.wms.srs)}if(p.wms.imagetype!=""){par.push("&image_wms="+p.wms.imagetype)}if(p.wms.version!=""){par.push("&versao_wms="+p.wms.version)}}if(p.hasOwnProperty("filters")){var n=[];jQuery.each(p.filters,function(index,value){if(value.layer!=""){n.push("&map_layer_"+value.layer+"_filter="+value.expression)}});if(n.length>0){par.push(n.join(""))}}if(p.hasOwnProperty("restoreMapId")&&p.restoreMapId!=""){par.push("&restauramapa="+p.restoreMapId)}temp=$i(i3GEO.Interface.IDCORPO);if(temp&&temp.style&&temp.style.width){par.push("&largura="+parseInt(temp.style.width,10))}if(temp&&temp.style&&temp.style.height){par.push("&altura="+parseInt(temp.style.height,10))}return par.join("")},cria:function(){i3GEO.scrollerWidth=i3GEO.util.getScrollerWidth();$('[data-traduzir="true"]').each(function(){this.innerHTML=Mustache.to_html(this.innerHTML,i3GEO.idioma.OBJETOIDIOMA)});var tamanho,temp;temp=window.location.href.split("?&");if(temp[1]){temp=temp[1].split("&");if(temp[0]&&temp[0]!=""&&temp.length==1){i3GEO.configura.sid=temp[0];if(i3GEO.configura.sid.split("#")[0]){i3GEO.configura.sid=i3GEO.configura.sid.split("#")[0]}}}else{i3GEO.configura.sid=""}if(i3GEO.configura.sid==='undefined'){i3GEO.configura.sid=""}i3GEO.mapa.aplicaPreferencias();if(!i3GEO.configura.locaplic||i3GEO.configura.locaplic===""){i3GEO.util.localizai3GEO()}temp=$i(i3GEO.Interface.IDCORPO);if(temp&&temp.style&&temp.style.width&&temp.style.height){i3GEO.Interface.cria(parseInt(temp.style.width,10),parseInt(temp.style.height,10))}else{tamanho=i3GEO.calculaTamanho();i3GEO.Interface.cria(tamanho[0],tamanho[1])}},inicia:function(retorno){i3GEO.eventos.cliquePerm.ativoinicial=i3GEO.eventos.cliquePerm.ativo;var montaMapa,mashup,tamanho,temp;i3GEO.mapa.aplicaPreferencias();montaMapa=function(retorno){try{delete i3GEO.parametrosMapa2mashuppar;delete i3GEO.configMapa;delete i3GEO.init;var temp,nomecookie="i3geoOLUltimaExtensao",preferencias="";if(retorno.bloqueado){alert(retorno.bloqueado);return}if(retorno===""){alert("Ocorreu um erro no mapa - i3GEO.inicia.montaMapa");retorno={data:{erro:"erro"}}}if(retorno.data.erro){document.body.style.backgroundColor="white";document.body.innerHTML="<br>Para abrir o i3Geo utilize o link:<br><a href="+i3GEO.configura.locaplic+"/ms_criamapa.php >"+i3GEO.configura.locaplic+"/ms_criamapa.php</a>";return("linkquebrado")}else{if(retorno.data.variaveis){i3GEO.parametros=retorno.data.variaveis;i3GEO.parametros.mapscale=i3GEO.parametros.mapscale*1;i3GEO.parametros.mapres=i3GEO.parametros.mapres*1;i3GEO.parametros.pixelsize=i3GEO.parametros.pixelsize*1;i3GEO.parametros.w=i3GEO.parametros.w*1;i3GEO.parametros.h=i3GEO.parametros.h*1;if(retorno.data.customizacoesinit){preferencias=JSON.parse(retorno.data.customizacoesinit);temp=i3GEO.util.base64decode(preferencias.preferenciasbase64);i3GEO.mapa.aplicaPreferencias(temp)}if(i3GEO.configura.guardaExtensao===true){if(i3GEO.Interface.openlayers.googleLike===true){nomecookie="i3geoUltima_ExtensaoOSM"}temp=i3GEO.util.pegaCookie(nomecookie);if(temp&&temp!=""){temp=temp.replace(/[\+]/g," ");i3GEO.parametros.mapexten=temp}i3GEO.eventos.NAVEGAMAPA.push(function(){i3GEO.util.insereCookie(nomecookie,i3GEO.parametros.mapexten)})}if(i3GEO.parametros.logado==="nao"){i3GEO.login.anulaCookie()}i3GEO.arvoreDeCamadas.registaCamadas(retorno.data.temas);if(i3GEO.parametros.editor==="sim"){i3GEO.listaDeFerramentas=i3GEO.login.adicionaMenuSuspenso(i3GEO.listaDeFerramentas)}i3GEO.Interface.inicia();if(retorno.data.customizacoesinit){if(preferencias.geometriasbase64&&preferencias.geometriasbase64!=""){temp=i3GEO.util.base64decode(preferencias.geometriasbase64);i3GEO.mapa.desCompactaLayerGrafico(temp)}if(preferencias.graficosbase64&&preferencias.graficosbase64!=""){i3GEO.mapa.restauraGraficos(preferencias.graficosbase64)}if(preferencias.tabelasbase64&&preferencias.tabelasbase64!=""){i3GEO.mapa.restauraTabelas(preferencias.tabelasbase64)}}}else{alert("Erro. Impossivel criar o mapa "+retorno.data);return}}i3GEO.aposIniciar()}catch(e){}};if(!$i("i3geo")){document.body.id="i3geo"}temp=$i("i3geo");temp.className="yui-skin-sam";if(document.body.id==="i3geo"&&temp.style&&!temp.style.overflow&&i3GEO.Interface.ATUAL==="openlayers"){temp.style.overflow="hidden"}if(i3GEO.configura.sid===""){mashup=function(retorno){if(retorno.bloqueado){alert(retorno.bloqueado);return}i3GEO.configura.sid=retorno.data;i3GEO.inicia(retorno)};i3GEO.configura.mashuppar+="&interface="+i3GEO.Interface.ATUAL;if(i3GEO.mapa.TEMASINICIAIS.length>0){i3GEO.configura.mashuppar+="&temasa="+i3GEO.mapa.TEMASINICIAIS}if(i3GEO.mapa.TEMASINICIAISLIGADOS.length>0){i3GEO.configura.mashuppar+="&layers="+i3GEO.mapa.TEMASINICIAISLIGADOS}i3GEO.php.criamapa(mashup,i3GEO.configura.mashuppar)}else{if(i3GEO.parametros.w===""||i3GEO.parametros.h===""){tamanho=i3GEO.calculaTamanho();i3GEO.parametros.w=tamanho[0];i3GEO.parametros.h=tamanho[1]}i3GEO.php.inicia(montaMapa,i3GEO.parametros.w,i3GEO.parametros.h)}},aposIniciar:function(){if(jQuery.isFunction(i3GEO.finaliza)){i3GEO.finaliza.call()}else{if(i3GEO.finaliza!=""){eval(i3GEO.finaliza)}}i3GEO.guias.inicia();i3GEO.mapa.ativaAutoResize()},atualiza:function(retorno){var corpoMapa,erro,mapscale,temp;if(i3GEO.contadorAtualiza>1){i3GEO.contadorAtualiza--;return}if(i3GEO.contadorAtualiza>0){i3GEO.contadorAtualiza--}i3GEO.contadorAtualiza++;corpoMapa=function(){if($i("ajaxCorpoMapa")){return}i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem)};if(arguments.length===0){i3GEO.janela.fechaAguarde("ajaxCorpoMapa");corpoMapa.call();return}if(!retorno.data){alert("Ocorreu um erro ao carregar o mapa"+retorno);i3GEO.mapa.recupera.inicia();return}try{if(retorno.data==="erro"){alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");i3GEO.mapa.recupera.inicia();return}else if(retorno.data==="ok"||retorno.data===""){corpoMapa.call();return}}catch(e){}erro=function(){var c=confirm("Ocorreu um erro, quer tentar novamente?");if(c){corpoMapa.call()}else{i3GEO.janela.fechaAguarde()}return};if(arguments.length===0||retorno===""||retorno.data.variaveis===undefined){erro.call();return}else{if(arguments.length===0){return}i3GEO.mapa.verifica(retorno);mapscale=i3GEO.parametros.mapscale;i3GEO.atualizaParametros(retorno.data.variaveis);if(retorno.data.variaveis.erro!==""){alert(retorno.data.variaveis.erro)}temp=i3GEO.arvoreDeCamadas.converteChaveValor2normal(retorno.data.temas);try{i3GEO.arvoreDeCamadas.atualiza(temp);if(i3GEO.parametros.mapscale!==mapscale){i3GEO.arvoreDeCamadas.atualizaFarol(i3GEO.parametros.mapscale)}}catch(e){}i3GEO.arvoreDeCamadas.registaCamadas(temp);i3GEO.Interface.redesenha();if($i("mensagemt")){$i("mensagemt").value=i3GEO.parametros.mapexten}i3GEO.eventos.navegaMapa();temp=i3GEO.arvoreDeCamadas.verificaAplicaExtensao();if(temp!==""){i3GEO.tema.zoom(temp)}}},calculaTamanho:function(){var diminuix,diminuiy,menos,novow,novoh,w,h,temp,antigoh=i3GEO.parametros.h;temp=$i(i3GEO.Interface.IDCORPO);if(temp&&temp.style&&temp.style.width&&temp.style.height){i3GEO.parametros.w=parseInt(temp.style.width,10);i3GEO.parametros.h=parseInt(temp.style.height,10);return[i3GEO.parametros.w,i3GEO.parametros.h]}menos=0;document.body.style.width="100%";temp=i3GEO.util.tamanhoBrowser();novow=temp[0];novoh=temp[1];temp=(antigoh-novoh);document.body.style.height=novoh+"px";w=novow-menos+i3GEO.scrollerWidth;h=novoh;i3GEO.parametros.w=w;i3GEO.parametros.h=h;return[w,h]},reCalculaTamanho:function(){var diminuix,diminuiy,menos,novow,novoh,w,h,temp,antigoh=i3GEO.parametros.h;temp=$i(i3GEO.Interface.IDCORPO);if(temp&&temp.style&&temp.style.width&&temp.style.height){i3GEO.parametros.w=parseInt(temp.style.width,10);i3GEO.parametros.h=parseInt(temp.style.height,10);i3GEO.eventos.resizeMapa();return[i3GEO.parametros.w,i3GEO.parametros.h]}menos=0;document.body.style.width="100%";temp=i3GEO.util.tamanhoBrowser();novow=temp[0];novoh=temp[1];temp=antigoh-novoh;document.body.style.height=novoh+"px";w=novow-menos+i3GEO.scrollerWidth;h=novoh;temp=$i(i3GEO.Interface.IDMAPA);if(temp){temp.style.height=h+"px";temp.style.width=w+"px"}i3GEO.parametros.w=w;i3GEO.parametros.h=h;temp=function(){switch(i3GEO.Interface.ATUAL){case"googlemaps":i3GEO.Interface.googlemaps.zoom2extent(i3GEO.parametros.mapexten);break;case"openlayers":i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.mapexten);i3geoOL.updateSize();if(i3GEO.Interface.openlayers.OLpanzoombar){i3GEO.Interface.openlayers.OLpanzoombar.div.style.top=i3GEO.Interface.BARRADEZOOMTOP+"px";i3GEO.Interface.openlayers.OLpanzoombar.div.style.left=i3GEO.Interface.BARRADEZOOMLEFT+"px";i3GEO.Interface.openlayers.OLpanzoombar.div.style.right=i3GEO.Interface.BARRADEZOOMRIGHT+"px";if(i3GEO.Interface.BARRADEZOOMLEFT===0){i3GEO.Interface.openlayers.OLpanzoombar.div.style.left=null}if(i3GEO.Interface.BARRADEZOOMRIGHT===0){i3GEO.Interface.openlayers.OLpanzoombar.div.style.right=null}}break};i3GEO.guias.ALTURACORPOGUIAS=h;i3GEO.eventos.resizeMapa();return[w,h]};i3GEO.php.mudatamanho(temp,h,w)},atualizaParametros:function(variaveis){i3GEO.parametros.mapscale=variaveis.mapscale*1;i3GEO.parametros.mapres=variaveis.mapres*1;i3GEO.parametros.pixelsize=variaveis.pixelsize*1;i3GEO.parametros.mapexten=variaveis.mapexten;i3GEO.parametros.mapimagem=variaveis.mapimagem;i3GEO.parametros.w=variaveis.w*1;i3GEO.parametros.h=variaveis.h*1;i3GEO.parametros.mappath=variaveis.mappath;i3GEO.parametros.mapurl=variaveis.mapurl;if(i3GEO.login.verificaCookieLogin()){i3GEO.parametros.editor="sim"}else{i3GEO.parametros.editor="nao"}}};