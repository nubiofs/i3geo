if(typeof(i3GEO)==='undefined'){i3GEO=[]}cpJSON=new cpaint();cpJSON.set_response_type("JSON");cpJSON.set_transfer_mode("POST");i3GEO.php={verifica:function(){if(i3GEO.configura.locaplic===undefined){alert("i3GEO.php diz: variavel i3GEO.configura.locaplic n�o esta definida")}if(i3GEO.configura.sid===undefined){alert("i3GEO.php diz: variavel i3GEO.configura.sid n�o esta definida")}},insereSHPgrafico:function(funcao,tema,x,y,itens,shadow_height,width,inclinacao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=insereSHPgrafico&tipo=pizza&tema="+tema+"&x="+x+"&y="+y+"&itens="+itens+"&shadow_height="+shadow_height+"&width="+width+"&inclinacao="+inclinacao+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("insereSHPgrafico");funcao.call(retorno)};i3GEO.janela.abreAguarde("insereSHPgrafico",$trad("o1"));cpJSON.call(p,"insereSHPgrafico",retorno,par)},insereSHP:function(funcao,tema,item,valoritem,xy,projecao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=insereSHP&item="+item+"&valor="+valoritem+"&tema="+tema+"&xy="+xy+"&projecao="+projecao+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("insereSHPgrafico");funcao.call(retorno)};cpJSON.call(p,"insereSHP",retorno,par)},pegaMensagens:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegaMensagens&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"pegaMensagem",funcao,par)},areaPixel:function(funcao,g_celula){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=areaPixel&celsize="+g_celula+"&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"areaPixel",funcao,par)},excluitema:function(funcao,temas){var layer,retorno,p,n,i,par;i3GEO.php.verifica();retorno=function(retorno){i3GEO.janela.fechaAguarde("excluitema");n=temas.length;for(i=0;i<n;i++){if(i3GEO.Interface.ATUAL==="openlayers"){layer=i3geoOL.getLayersByName(temas[i]);if(layer.length>0){i3geoOL.removeLayer(layer[0])}}if(i3GEO.Interface.ATUAL==="googlemaps"){indice=i3GEO.Interface.googlemaps.retornaIndiceLayer(temas[i]);if(indice!==false){i3GeoMap.overlayMapTypes.removeAt(indice)}}if(i3GEO.Interface.ATUAL==="googleearth"){indice=i3GEO.Interface.googleearth.retornaObjetoLayer(temas[i]);i3GeoMap.getFeatures().removeChild(indice)}}funcao.call(retorno)};i3GEO.janela.abreAguarde("excluitema",$trad("o1"));p=i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php";par="funcao=excluitema&temas="+temas+"&g_sid="+i3GEO.arvoreDeCamadas.SID;cpJSON.call(p,"excluitema",retorno,par)},reordenatemas:function(funcao,lista){i3GEO.php.verifica();var p=i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php",par="funcao=reordenatemas&lista="+lista+"&g_sid="+i3GEO.arvoreDeCamadas.SID,retorno=function(retorno){i3GEO.janela.fechaAguarde("reordenatemas");funcao.call(retorno)};i3GEO.janela.abreAguarde("reordenatemas",$trad("o1"));cpJSON.call(p,"reordenatemas",retorno,par)},criaLegendaHTML:function(funcao,tema,template){i3GEO.php.verifica();if(arguments.length===1){tema="";template="legenda2.htm"}if(arguments.length===2){template="legenda2.htm"}var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=criaLegendaHTML&tema="+tema+"&templateLegenda="+template+"&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"criaLegendaHTML",funcao,par)},inverteStatusClasse:function(funcao,tema,classe){i3GEO.php.verifica();var p=i3GEO.arvoreDeCamadas.LOCAPLIC+"/classesphp/mapa_controle.php",par="funcao=inverteStatusClasse&g_sid="+i3GEO.arvoreDeCamadas.SID+"&tema="+tema+"&classe="+classe,retorno=function(retorno){i3GEO.janela.fechaAguarde("inverteStatusClasse");funcao.call(retorno)};i3GEO.janela.abreAguarde("inverteStatusClasse",$trad("o1"));cpJSON.call(p,"inverteStatusClasse",retorno,par)},ligatemas:function(funcao,desligar,ligar,adicionar){i3GEO.php.verifica();if(arguments.length===3){adicionar="nao"}var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=ligatemas&desligar="+desligar+"&ligar="+ligar+"&adicionar="+adicionar+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){funcao.call(retorno)};cpJSON.call(p,"ligaDesligaTemas",retorno,par)},pegalistademenus:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegalistademenus&g_sid="+i3GEO.configura.sid+"&map_file=&idioma="+i3GEO.idioma.ATUAL;cpJSON.call(p,"pegalistademenus",funcao,par)},pegalistadegrupos:function(funcao,id_menu,listasgrupos){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegalistadegrupos&map_file=&g_sid="+i3GEO.configura.sid+"&idmenu="+id_menu+"&listasistemas=nao&listasgrupos="+listasgrupos+"&idioma="+i3GEO.idioma.ATUAL;cpJSON.call(p,"pegalistadegrupos",funcao,par)},pegalistadeSubgrupos:function(funcao,id_menu,id_grupo){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegalistadeSubgrupos&g_sid="+i3GEO.configura.sid+"&idmenu="+id_menu+"&grupo="+id_grupo+"&map_file=&idioma="+i3GEO.idioma.ATUAL;cpJSON.call(p,"pegalistadeSubgrupos",funcao,par)},pegalistadetemas:function(funcao,id_menu,id_grupo,id_subgrupo){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegalistadetemas&g_sid="+i3GEO.configura.sid+"&idmenu="+id_menu+"&grupo="+id_grupo+"&subgrupo="+id_subgrupo+"&map_file=&idioma="+i3GEO.idioma.ATUAL;cpJSON.call(p,"pegalistadetemas",funcao,par)},listaTemas:function(funcao,tipo,locaplic,sid){if(arguments.length===2){locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid}var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=listatemas&g_sid="+sid+"&tipo="+tipo;cpJSON.call(p,"listaTemas",funcao,par)},listaTemasEditaveis:function(funcao,locaplic,sid){if(arguments.length===1){locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid}var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=listatemaslocais&g_sid="+sid;cpJSON.call(p,"listatemaslocais",funcao,par)},listaTemasComSel:function(funcao,locaplic,sid){if(arguments.length===1){locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid}var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=listatemascomsel&g_sid="+sid;cpJSON.call(p,"listaTemasComSel",funcao,par)},listatemasTipo:function(funcao,tipo,locaplic,sid){if(arguments.length===2){locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid}var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=&funcao=listatemasTipo&tipo="+tipo+"&g_sid="+sid;cpJSON.call(p,"listatemasTipo",funcao,par)},pegaSistemas:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegaSistemas&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"pegaSistemas",funcao,par)},listadrives:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=listaDrives&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"listaDrives",funcao,par)},listaarquivos:function(funcao,caminho){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=listaArquivos&diretorio="+caminho;cpJSON.call(p,"listaArquivos",funcao,par)},geo2utm:function(funcao,x,y){i3GEO.php.verifica();if($i("aguardeGifAberto")||x<-180){return}var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=geo2utm&x="+x+"&y="+y+"&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"geo2utm",funcao,par)},desativacgi:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=desativacgi&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"desativacgi",funcao,par)},pegaMapas:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pegaMapas&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"pegaSistemas",funcao,par)},mudatamanho:function(funcao,altura,largura){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=mudatamanho&altura="+altura+"&largura="+largura+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("mudatamanho");funcao.call(retorno)};i3GEO.janela.abreAguarde("mudatamanho",$trad("o1"));cpJSON.call(p,"pegaSistemas",retorno,par)},ativalogo:function(funcao,altura,largura){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=ativalogo&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("ativalogo");funcao.call(retorno)};i3GEO.janela.abreAguarde("ativalogo",$trad("o1"));cpJSON.call(p,"ativalogo",retorno,par)},insereAnnotation:function(funcao,pin,xy,texto,position,partials,offsetx,offsety,minfeaturesize,mindistance,force,shadowcolor,shadowsizex,shadowsizey,outlinecolor,cor,sombray,sombrax,sombra,fundo,angulo,tamanho,fonte){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=inserefeature&pin="+pin+"&tipo=ANNOTATION&xy="+xy+"&texto="+texto+"&position="+position+"&partials="+partials+"&offsetx="+offsetx+"&offsety="+offsety+"&minfeaturesize="+minfeaturesize+"&mindistance="+mindistance+"&force="+force+"&shadowcolor="+shadowcolor+"&shadowsizex="+shadowsizex+"&shadowsizey="+shadowsizey+"&outlinecolor="+outlinecolor+"&cor="+cor+"&sombray="+sombray+"&sombrax="+sombrax+"&sombra="+sombra+"&fundo="+fundo+"&angulo="+angulo+"&tamanho="+tamanho+"&fonte="+fonte+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("insereAnnotation");funcao.call(retorno)};i3GEO.janela.abreAguarde("insereAnnotation",$trad("o1"));cpJSON.call(p,"inserefeature",retorno,par)},identificaunico:function(funcao,xy,tema,item){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=identificaunico&xy="+xy+"&resolucao=5&tema="+tema+"&item="+item+"&g_sid="+i3GEO.configura.sid+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"identificaunico",funcao,par)},recuperamapa:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=recuperamapa&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("recuperamapa");funcao.call(retorno)};i3GEO.janela.abreAguarde("recuperamapa",$trad("o1"));cpJSON.call(p,"recuperamapa",retorno,par)},criaLegendaImagem:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=criaLegendaImagem&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"criaLegendaImagem",funcao,par)},referenciadinamica:function(funcao,zoom,tipo){i3GEO.php.verifica();if(arguments.length===2){tipo="dinamico"}var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=referenciadinamica&g_sid="+i3GEO.configura.sid+"&zoom="+zoom+"&tipo="+tipo+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"retornaReferenciaDinamica",funcao,par)},referencia:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=referencia&g_sid="+i3GEO.configura.sid+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"retornaReferencia",funcao,par)},pan:function(funcao,escala,tipo,x,y){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=pan&escala="+escala+"&tipo="+tipo+"&x="+x+"&y="+y+"&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"pan",funcao,par)},aproxima:function(funcao,nivel){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=aproxima&nivel="+nivel+"&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"aproxima",funcao,par)},afasta:function(funcao,nivel){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=afasta&nivel="+nivel+"&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"afasta",funcao,par)},zoomponto:function(funcao,x,y,tamanho,simbolo,cor){i3GEO.php.verifica();if(!simbolo){simbolo="ponto"}if(!tamanho){tamanho=15}if(!cor){cor="255 0 0"}var retorno=function(retorno){i3GEO.janela.fechaAguarde("zoomponto");if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.pan2ponto(x,y)}if(i3GEO.Interface.ATUAL==="googlemaps"){i3GEO.Interface.googlemaps.pan2ponto(x,y)}funcao.call(retorno)},p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=zoomponto&pin=pin&xy="+x+" "+y+"&g_sid="+i3GEO.configura.sid+"&marca="+simbolo+"&tamanho="+tamanho+"&cor="+cor;i3GEO.janela.abreAguarde("zoomponto",$trad("o1"));cpJSON.call(p,"zoomponto",retorno,par)},localizaIP:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=localizaIP&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"localizaIP",funcao,par)},mudaext:function(funcao,tipoimagem,ext,locaplic,sid,atualiza,geo){var retorno,p;if(arguments.length===3){i3GEO.php.verifica();locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid;atualiza=true;geo=false}if(geo===undefined){geo=false}if(atualiza===undefined){atualiza=true}if(ext===undefined){alert("extensao nao definida");return}retorno=function(retorno){switch(i3GEO.Interface.ATUAL){case"googlemaps":if(atualiza===true){i3GEO.Interface.googlemaps.zoom2extent(ext)}break;case"googleearth":if(atualiza===true){i3GEO.Interface.googleearth.zoom2extent(ext)}break;case"openlayers":i3GEO.Interface.openlayers.zoom2ext(ext);break}try{funcao.call(retorno)}catch(e){}};var p=locaplic+"/classesphp/mapa_controle.php";var par="funcao=mudaext&tipoimagem="+tipoimagem+"&ext="+ext+"&g_sid="+sid+"&geo="+geo;cpJSON.call(p,"mudaext",retorno,par)},mudaescala:function(funcao,escala){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=mudaescala&escala="+escala+"&g_sid="+i3GEO.configura.sid+"&tipoimagem="+i3GEO.configura.tipoimagem,retorno=function(retorno){i3GEO.janela.fechaAguarde("mudaescala");funcao.call(retorno)};i3GEO.janela.abreAguarde("mudaescala",$trad("o1"));cpJSON.call(p,"mudaescala",retorno,par)},aplicaResolucao:function(funcao,resolucao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=crialente&resolucao="+resolucao+"&g_sid="+i3GEO.configura.sid+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"crialente",funcao,par)},geradestaque:function(funcao,tema,ext){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=geradestaque&tema="+tema+"&g_sid="+i3GEO.configura.sid+"&ext="+ext,retorno=function(retorno){i3GEO.janela.fechaAguarde("geradestaque");funcao.call(retorno)};i3GEO.janela.abreAguarde("geradestaque",$trad("o1"));cpJSON.call(p,"geradestaque",retorno,par)},selecaopt:function(funcao,tema,xy,tipo,tolerancia){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=selecaopt&tema="+tema+"&tipo="+tipo+"&xy="+xy+"&tolerancia="+tolerancia+"&g_sid="+i3GEO.configura.sid+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"selecaoPT",funcao,par)},selecaobox:function(funcao,tema,tipo,box){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=selecaobox&ext="+box+"&g_sid="+i3GEO.configura.sid+"&tipo="+tipo+"&tema="+tema+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"selecaobox",funcao,par)},selecaoext:function(funcao,tema,tipo){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=selecaoext&tema="+tema+"&tipo="+tipo+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"selecaoext",funcao,par)},selecaoatrib2:function(funcao,tema,filtro,tipo){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=selecaoatrib2&tema="+tema+"&filtro="+filtro+"&tipo="+tipo+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"selecaoatrib2",funcao,par)},selecaotema:function(funcao,temao,tema,tipo){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=selecaotema&temao="+temao+"&tema="+tema+"&tipo="+tipo+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"selecaotema",funcao,par)},sobetema:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=sobetema&tema="+tema+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("sobetema");funcao.call(retorno)};i3GEO.janela.abreAguarde("sobetema",$trad("o1"));cpJSON.call(p,"sobetema",retorno,par)},descetema:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=descetema&tema="+tema+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("descetema");funcao.call(retorno)};i3GEO.janela.abreAguarde("descetema",$trad("o1"));cpJSON.call(p,"descetema",retorno,par)},fontetema:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=fontetema&tema="+tema+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("fontetema");funcao.call(retorno)};i3GEO.janela.abreAguarde("fontetema",$trad("o1"));cpJSON.call(p,"fontetema",retorno,par)},zoomtema:function(funcao,tema){i3GEO.php.verifica();var retorno,p,par;retorno=function(retorno){switch(i3GEO.Interface.ATUAL){case"googlemaps":i3GEO.atualizaParametros(retorno.data.variaveis);i3GEO.Interface.googlemaps.zoom2extent(i3GEO.parametros.mapexten);i3GEO.janela.fechaAguarde("zoomtema");break;case"googleearth":i3GEO.atualizaParametros(retorno.data.variaveis);i3GEO.Interface.googleearth.zoom2extent(i3GEO.parametros.mapexten);i3GEO.janela.fechaAguarde("zoomtema");break;case"openlayers":i3GEO.atualizaParametros(retorno.data.variaveis);i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.mapexten);i3GEO.janela.fechaAguarde("zoomtema");break}};p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php";par="funcao=zoomtema&tema="+tema+"&g_sid="+i3GEO.configura.sid;i3GEO.janela.abreAguarde("zoomtema",$trad("o1"));cpJSON.call(p,"zoomtema",retorno,par)},zoomsel:function(funcao,tema){i3GEO.php.verifica();var retorno,p,par;retorno=function(retorno){switch(i3GEO.Interface.ATUAL){case"googlemaps":i3GEO.atualizaParametros(retorno.data.variaveis);i3GEO.Interface.googlemaps.zoom2extent(i3GEO.parametros.mapexten);i3GEO.janela.fechaAguarde("zoomsel");break;case"googleearth":i3GEO.atualizaParametros(retorno.data.variaveis);i3GEO.Interface.googleearth.zoom2extent(i3GEO.parametros.mapexten);i3GEO.janela.fechaAguarde("zoomsel");break;case"openlayers":i3GEO.atualizaParametros(retorno.data.variaveis);i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.mapexten);i3GEO.janela.fechaAguarde("zoomsel");break}};p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php";par="funcao=zoomsel&tema="+tema+"&g_sid="+i3GEO.configura.sid;i3GEO.janela.abreAguarde("zoomsel",$trad("o1"));cpJSON.call(p,"zoomsel",retorno,par)},limpasel:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=limpasel&tema="+tema+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("limpasel");funcao.call(retorno)};i3GEO.janela.abreAguarde("limpasel",$trad("o1"));cpJSON.call(p,"limpasel",retorno,par)},invertestatuslegenda:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=invertestatuslegenda&tema="+tema+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("invertestatuslegenda");funcao.call(retorno)};i3GEO.janela.abreAguarde("invertestatuslegenda",$trad("o1"));cpJSON.call(p,"invertestatuslegenda",retorno,par)},aplicaCorClasseTema:function(funcao,idtema,idclasse,rgb){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=alteraclasse&opcao=alteracor&tema="+idtema+"&idclasse="+idclasse+"&cor="+rgb+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("aplicaCorClasseTema");funcao.call(retorno)};i3GEO.janela.abreAguarde("aplicaCorClasseTema",$trad("o1"));cpJSON.call(p,"aplicaCorClasseTema",retorno,par)},mudatransp:function(funcao,tema,valor){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=mudatransp&tema="+tema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("mudatransp");funcao.call(retorno)};i3GEO.janela.abreAguarde("mudatransp",$trad("o1"));cpJSON.call(p,"mudatransp",retorno,par)},mudanome:function(funcao,tema,valor){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=mudanome&tema="+tema+"&valor="+valor+"&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("mudanome");funcao.call(retorno)};i3GEO.janela.abreAguarde("mudanome",$trad("o1"));cpJSON.call(p,"mudanome",retorno,par)},adicionaTemaWMS:function(funcao,servico,tema,nome,proj,formato,versao,nomecamada,tiporep,suportasld,formatosinfo,locaplic,sid){if(arguments.length===11){i3GEO.php.verifica();locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid}var p=locaplic+"/classesphp/mapa_controle.php",par="g_sid="+sid+"&funcao=adicionatemawms&servico="+servico+"&tema="+tema+"&nome="+nome+"&proj="+proj+"&formato="+formato+"&versao="+versao+"&nomecamada="+nomecamada+"&tiporep="+tiporep+"&suportasld="+suportasld+"&formatosinfo="+formatosinfo;cpJSON.call(p,"adicionatemawms",funcao,par)},adicionaTemaSHP:function(funcao,path){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=adicionaTemaSHP&arq="+path,retorno=function(retorno){i3GEO.janela.fechaAguarde("adicionaTemaSHP");funcao.call(retorno)};i3GEO.janela.abreAguarde("adicionaTemaSHP",$trad("o1"));cpJSON.call(p,"adicionaTemaSHP",retorno,par)},adicionaTemaIMG:function(funcao,path){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=adicionaTemaIMG&arq="+path,retorno=function(retorno){i3GEO.janela.fechaAguarde("adicionaTemaIMG");funcao.call(retorno)};i3GEO.janela.abreAguarde("adicionaTemaIMG",$trad("o1"));cpJSON.call(p,"adicionaTemaIMG",retorno,par)},identifica:function(funcao,x,y,resolucao,locaplic,sid){var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=identifica&opcao=tip&xy="+x+","+y+"&resolucao=5&g_sid="+sid;cpJSON.call(p,"identifica",funcao,par)},identifica2:function(funcao,x,y,resolucao,opcao,locaplic,sid,tema,ext,listaDeTemas){if(arguments.length===4){opcao="tip";locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid;ext="";listaDeTemas="";resolucao=5}if(arguments.length===5){locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid;ext="";listaDeTemas=""}if(listaDeTemas===undefined){listaDeTemas=""}var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=identifica2&opcao="+opcao+"&xy="+x+","+y+"&resolucao="+resolucao+"&g_sid="+sid+"&ext="+ext+"&listaDeTemas="+listaDeTemas;if(opcao!=="tip"){par+="&tema="+tema}cpJSON.call(p,"identifica",funcao,par)},reiniciaMapa:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=reiniciaMapa&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("reiniciaMapa");funcao.call(retorno)};i3GEO.janela.abreAguarde("reiniciaMapa",$trad("o1"));cpJSON.call(p,"reiniciaMapa",retorno,par)},procurartemas:function(funcao,procurar,locaplic){if(arguments.length===2){locaplic=i3GEO.configura.locaplic}try{var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=procurartemas&map_file=&procurar="+procurar+"&idioma="+i3GEO.idioma.ATUAL,retorno=function(retorno){i3GEO.janela.fechaAguarde("procurartemas");funcao.call(retorno)};i3GEO.janela.abreAguarde("procurartemas",$trad("o1"));cpJSON.call(p,"procurartemas",retorno,par)}catch(e){}},procurartemas2:function(funcao,procurar,locaplic){if(arguments.length===2){locaplic=i3GEO.configura.locaplic}try{var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=procurartemas2&map_file=&procurar="+procurar+"&idioma="+i3GEO.idioma.ATUAL,retorno=function(retorno){i3GEO.janela.fechaAguarde("procurartemas");funcao.call(retorno)};i3GEO.janela.abreAguarde("procurartemas",$trad("o1"));cpJSON.call(p,"procurartemas",retorno,par)}catch(e){}},procurartemasestrela:function(funcao,nivel,fatorestrela,locaplic){if(arguments.length===3){locaplic=i3GEO.configura.locaplic}try{var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=procurartemasestrela&map_file=&nivel="+nivel+"&fatorestrela="+fatorestrela+"&idioma="+i3GEO.idioma.ATUAL,retorno=function(retorno){i3GEO.janela.fechaAguarde("procurartemasestrela");funcao.call(retorno)};i3GEO.janela.abreAguarde("procurartemasestrela",$trad("o1"));cpJSON.call(p,"foo",retorno,par)}catch(e){}},adtema:function(funcao,temas,locaplic,sid){if(arguments.length===2){i3GEO.php.verifica();locaplic=i3GEO.configura.locaplic;sid=i3GEO.configura.sid}var p=locaplic+"/classesphp/mapa_controle.php",par="funcao=adtema&temas="+temas+"&g_sid="+sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("adtema");funcao.call(retorno)};i3GEO.janela.abreAguarde("adtema",$trad("o1"));cpJSON.call(p,"adtema",retorno,par)},escalagrafica:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=escalagrafica&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"escalagrafica",funcao,par)},googlemaps:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=googlemaps&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("googlemaps");funcao.call(retorno)};i3GEO.janela.abreAguarde("googlemaps",$trad("o1"));cpJSON.call(p,"googlemaps",retorno,par)},googleearth:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=googleearth&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("googleearth");funcao.call(retorno)};i3GEO.janela.abreAguarde("googleearth",$trad("o1"));cpJSON.call(p,"googleearth",retorno,par)},openlayers:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=openlayers&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("openlayers");funcao.call(retorno)};i3GEO.janela.abreAguarde("openlayers",$trad("o1"));cpJSON.call(p,"openlayers",retorno,par)},corpo:function(funcao,tipoimagem){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=corpo&tipoimagem="+tipoimagem+"&g_sid="+i3GEO.configura.sid+"&interface="+i3GEO.Interface.ATUAL;if(i3GEO.Interface.ATUAL==="googleearth"){i3GEO.Interface.googleearth.recalcPar();par+="&mapexten="+i3GEO.parametros.mapexten}cpJSON.call(p,"corpo",funcao,par)},converte2googlemaps:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=converte2googlemaps&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("converte2googlemaps");funcao.call(retorno)};i3GEO.janela.abreAguarde("converte2googlemaps",$trad("o1"));cpJSON.call(p,"converte2googlemaps",retorno,par)},converte2openlayers:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=converte2openlayers&g_sid="+i3GEO.configura.sid,retorno=function(retorno){i3GEO.janela.fechaAguarde("converte2openlayers");funcao.call(retorno)};i3GEO.janela.abreAguarde("converte2openlayers",$trad("o1"));cpJSON.call(p,"converte2openlayers",retorno,par)},criamapa:function(funcao,parametros){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=criaMapa&"+parametros,cp=new cpaint();cp.set_response_type("JSON");if(i3GEO.util.versaoNavegador()==="FF3"){cp.set_async(true)}else{cp.set_async(false)}cp.set_transfer_mode("POST");cp.call(p,"criaMapa",funcao,par)},inicia:function(funcao,embedLegenda,w,h){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=inicia&embedLegenda="+embedLegenda+"&w="+w+"&h="+h+"&g_sid="+i3GEO.configura.sid+"&interface="+i3GEO.Interface.ATUAL,cp=new cpaint();cp.set_response_type("JSON");if(i3GEO.util.versaoNavegador()==="FF3"){cp.set_async(true)}else{cp.set_async(false)}cp.set_transfer_mode("POST");cp.call(p,"iniciaMapa",funcao,par)},chaveGoogle:function(funcao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=chavegoogle&g_sid="+i3GEO.configura.sid;cpJSON.call(p,"chavegoogle",funcao,par)},listaRSSwsARRAY:function(funcao,tipo){var p=i3GEO.configura.locaplic+"/classesphp/wscliente.php",par="funcao=listaRSSwsARRAY&rss="+["|"]+"&tipo="+tipo;cpJSON.call(p,"listaRSSwsARRAY",funcao,par)},listaLayersWMS:function(funcao,servico,nivel,id_ws,nomelayer){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="funcao=listaLayersWMS&servico="+servico+"&nivel="+nivel+"&id_ws="+id_ws+"&nomelayer="+nomelayer;cpJSON.call(p,"listaLayersWMS",funcao,par)},buscaRapida:function(funcao,locaplic,servico,palavra){var p=locaplic+"/classesphp/mapa_controle.php",par="map_file=&funcao=buscaRapida&palavra="+palavra+"&servico="+servico;cpJSON.call(p,"buscaRapida",funcao,par)},listaItensTema:function(funcao,tema){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=listaitens&tema="+tema+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"listaItensTema",funcao,par)},listaValoresItensTema:function(funcao,tema,itemTema){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=listaregistros&unico=sim&tema="+tema+"&itemtema="+itemTema+"&ext="+i3GEO.parametros.mapexten;cpJSON.call(p,"listaRegistros",funcao,par)},extRegistros:function(funcao,tema,reg){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=extregistros&registro="+reg+"&tema="+tema;cpJSON.call(p,"listaItensTema",funcao,par)},listaFontesTexto:function(funcao){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=listatruetype";cpJSON.call(p,"listaTrueType",funcao,par)},listaEpsg:function(funcao){var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=listaEpsg&map_file=";cpJSON.call(p,"listaEpsg",funcao,par)},criatemaSel:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=criatemasel&tema="+tema+"&nome=Novo tema "+tema,retorno=function(retorno){i3GEO.janela.fechaAguarde("criatemaSel");funcao.call(retorno)};i3GEO.janela.abreAguarde("criatemaSel",$trad("o1"));cpJSON.call(p,"chavegoogle",retorno,par)},pegaData:function(funcao,tema){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=pegadata&tema="+tema;cpJSON.call(p,"pegadata",funcao,par)},alteraData:function(funcao,tema,data){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php",par="g_sid="+i3GEO.configura.sid+"&funcao=alteradata&tema="+tema+"&novodata="+data;cpJSON.call(p,"alteradata",funcao,par)},dadosPerfilRelevo:function(funcao,opcao,pontos,amostragem,item){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=dadosPerfilRelevo&opcao="+opcao,cp=new cpaint();cp.set_transfer_mode('POST');cp.set_response_type("JSON");cp.call(p,"foo",funcao,"&pontos="+pontos+"&amostragem="+amostragem+"&item="+item)},funcoesGeometriasWkt:function(funcao,listaWkt,operacao){i3GEO.php.verifica();var p=i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?g_sid="+i3GEO.configura.sid+"&funcao=funcoesGeometriasWkt&operacao="+operacao,cp=new cpaint();cp.set_transfer_mode('POST');cp.set_response_type("JSON");cp.call(p,"foo",funcao,"&geometrias="+listaWkt)}};