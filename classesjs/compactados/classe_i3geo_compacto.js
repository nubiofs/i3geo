i3GEOF=[];YAHOO.namespace("i3GEO");i3GEO={parametros:{mapexten:"",mapscale:"",mapres:"",pixelsize:"",mapfile:"",cgi:"",extentTotal:"",mapimagem:"",geoip:"",listavisual:"",utilizacgi:"",versaoms:"",versaomscompleta:"",mensagens:"",w:"",h:"",locsistemas:"",locidentifica:"",r:"",locmapas:"",celularef:"",kmlurl:"",mensageminicia:"",interfacePadrao:"openlayers.htm",embedLegenda:"nao",autenticadoopenid:"nao",cordefundo:"",copyright:""},scrollerWidth:"",finaliza:"",finalizaAPI:"",tamanhodoc:[],temaAtivo:"",contadorAtualiza:0,cria:function(){if(i3GEO.configura.ajustaDocType===true){i3GEO.util.ajustaDocType()}var temp,tamanho;temp=window.location.href.split("?");if(temp[1]){i3GEO.configura.sid=temp[1];if(i3GEO.configura.sid.split("#")[0]){i3GEO.configura.sid=i3GEO.configura.sid.split("#")[0]}}else{i3GEO.configura.sid=""}if(i3GEO.configura.sid==='undefined'){i3GEO.configura.sid=""}if(i3GEO.Interface.ALTTABLET!=""){if(i3GEO.util.detectaTablet()){return}}if(!i3GEO.configura.locaplic||i3GEO.configura.locaplic===""){i3GEO.util.localizai3GEO()}tamanho=i3GEO.calculaTamanho();i3GEO.Interface.cria(tamanho[0],tamanho[1])},inicia:function(retorno){var montaMapa,mashup,tamanho;if(typeof("i3GEOmantemCompatibilidade")==='function'){i3GEOmantemCompatibilidade()}montaMapa=function(retorno){try{var temp,abreJM;if(retorno===""){alert("Ocorreu um erro no mapa - montaMapa");retorno={data:{erro:"erro"}}}if(retorno.data.erro){document.body.style.backgroundColor="white";document.body.innerHTML="<br>Para abrir o i3Geo utilize o link:<br><a href="+i3GEO.configura.locaplic+"/ms_criamapa.php >"+i3GEO.configura.locaplic+"/ms_criamapa.php</a>";return("linkquebrado")}else{if(retorno.data.variaveis){i3GEO.parametros=retorno.data.variaveis;i3GEO.parametros.mapscale=i3GEO.parametros.mapscale*1;i3GEO.parametros.mapres=i3GEO.parametros.mapres*1;i3GEO.parametros.pixelsize=i3GEO.parametros.pixelsize*1;i3GEO.parametros.w=i3GEO.parametros.w*1;i3GEO.parametros.h=i3GEO.parametros.h*1;i3GEO.arvoreDeCamadas.CAMADAS=retorno.data.temas;if(retorno.data.variaveis.navegacaoDir.toLowerCase()==="sim"){i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir=true}temp=0;if($i("contemFerramentas")){temp=temp+parseInt($i("contemFerramentas").style.width,10)}if($i("ferramentas")){temp=temp+parseInt($i("ferramentas").style.width,10)}if($i("mst")){$i("mst").style.width=i3GEO.parametros.w+temp+"px"}i3GEO.Interface.inicia()}else{alert("Erro. Impossivel criar o mapa "+retorno.data);return}if($i("ajuda")){i3GEO.ajuda.DIVAJUDA="ajuda"}abreJM="sim";if(i3GEO.util.pegaCookie("botoesAjuda")){abreJM=i3GEO.util.pegaCookie("botoesAjuda");i3GEO.barraDeBotoes.AJUDA=(abreJM==="sim")?true:false}if(i3GEO.configura.iniciaJanelaMensagens===true){i3GEO.ajuda.abreJanela()}if(i3GEO.configura.liberaGuias.toLowerCase()==="sim"){i3GEO.guias.libera()}}i3GEO.aposIniciar()}catch(e){}};if(!$i("i3geo")){document.body.id="i3geo"}$i("i3geo").className="yui-skin-sam";if(i3GEO.configura.sid===""){mashup=function(retorno){i3GEO.configura.sid=retorno.data;i3GEO.inicia(retorno)};i3GEO.configura.mashuppar+="&interface="+i3GEO.Interface.ATUAL;i3GEO.php.criamapa(mashup,i3GEO.configura.mashuppar)}else{if(i3GEO.parametros.w===""||i3GEO.parametros.h===""){tamanho=i3GEO.calculaTamanho();i3GEO.parametros.w=tamanho[0];i3GEO.parametros.h=tamanho[1]}i3GEO.php.inicia(montaMapa,i3GEO.configura.embedLegenda,i3GEO.parametros.w,i3GEO.parametros.h)}if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.janela.fechaAguarde()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.janela.fechaAguarde()")}if(i3GEO.mapa.AUTORESIZE===true){i3GEO.mapa.ativaAutoResize()}},aposIniciar:function(){if($i("mst")){$i("mst").style.visibility="visible"}if(YAHOO.lang.isFunction(i3GEO.finaliza)){i3GEO.finaliza.call()}else{if(i3GEO.finaliza!=""){eval(i3GEO.finaliza)}}if(i3GEO.guias.TIPO==="movel"){i3GEO.guias.guiaMovel.inicia()}},atualiza:function(retorno){var corpoMapa,erro,mapscale,temp;if(i3GEO.contadorAtualiza>1){i3GEO.contadorAtualiza--;return}if(i3GEO.contadorAtualiza>0){i3GEO.contadorAtualiza--}i3GEO.contadorAtualiza++;corpoMapa=function(){if($i("ajaxCorpoMapa")){return}i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem)};if(arguments.length===0){i3GEO.janela.fechaAguarde("ajaxCorpoMapa");corpoMapa.call();return}if(retorno===""){corpoMapa.call();return}if(!retorno.data){alert(retorno);i3GEO.mapa.recupera.inicia();return}try{if(retorno.data==="erro"){alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");i3GEO.mapa.recupera.inicia();return}else if(retorno.data==="ok"||retorno.data===""){corpoMapa.call();return}}catch(e){}erro=function(){var c=confirm("Ocorreu um erro, quer tentar novamente?");if(c){corpoMapa.call()}else{i3GEO.janela.fechaAguarde()}return};if(arguments.length===0||retorno===""||retorno.data.variaveis===undefined){erro.call();return}else{if(arguments.length===0){return}i3GEO.mapa.verifica(retorno);tempo="";if(i3GEO.desenho.richdraw){i3GEO.desenho.richdraw.clearWorkspace()}mapscale=i3GEO.parametros.mapscale;i3GEO.atualizaParametros(retorno.data.variaveis);if(retorno.data.variaveis.erro!==""){alert(retorno.data.variaveis.erro)}try{i3GEO.arvoreDeCamadas.atualiza(retorno.data.temas);if(i3GEO.parametros.mapscale!==mapscale){i3GEO.arvoreDeCamadas.atualizaFarol(i3GEO.parametros.mapscale)}}catch(e){}i3GEO.arvoreDeCamadas.CAMADAS=retorno.data.temas;i3GEO.Interface.redesenha();if($i("i3GEOidentificalistaTemas")){g_tipoacao="identifica";g_operacao='identifica'}else{g_operacao=""}if($i("mensagemt")){$i("mensagemt").value=i3GEO.parametros.mapexten}i3GEO.eventos.navegaMapa();i3GEO.ajuda.mostraJanela("Tempo de redesenho em segundos: "+retorno.data.variaveis.tempo,"");temp=i3GEO.arvoreDeCamadas.verificaAplicaExtensao();if(temp!==""){i3GEO.tema.zoom(temp)}}},calculaTamanho:function(){var diminuix,diminuiy,menos,novow,novoh,w,h,temp,Dw,Dh;diminuix=(navm)?i3GEO.configura.diminuixM:i3GEO.configura.diminuixN;diminuiy=(navm)?i3GEO.configura.diminuiyM:i3GEO.configura.diminuiyN;menos=0;temp=$i("contemFerramentas");if(temp&&temp.style&&temp.style.width){menos+=parseInt($i("contemFerramentas").style.width,10)}temp=$i("ferramentas");if(temp&&temp.style&&temp.style.width){menos+=parseInt($i("ferramentas").style.width,10)}if(i3GEO.configura.autotamanho===true){if(window.top===window.self){window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0)}}if(i3GEO.scrollerWidth===""){i3GEO.scrollerWidth=i3GEO.util.getScrollerWidth()}i3GEO.tamanhodoc=[YAHOO.util.Dom.getViewportWidth(),YAHOO.util.Dom.getViewportHeight()];Dw=YAHOO.util.Dom.getDocumentWidth();Dh=YAHOO.util.Dom.getDocumentHeight();novow=Dw-i3GEO.scrollerWidth;novoh=Dh;document.body.style.width=novow+"px";document.body.style.height=novoh+"px";w=novow-menos-diminuix;h=novoh-diminuiy;temp=$i("corpoMapa");if(temp){if(temp.style){if(temp.style.width){w=parseInt(temp.style.width,10);h=parseInt(temp.style.width,10);i3GEO.parametros.w=w}if(temp.style.height){h=parseInt(temp.style.height,10);i3GEO.parametros.h=h}}}temp=$i("contemImg");if(temp){temp.style.height=h+"px";temp.style.width=w+"px"}return[w,h]},reCalculaTamanho:function(){var diminuix,diminuiy,menos,novow,novoh,w,h,temp,antigoh=i3GEO.parametros.h;diminuix=(navm)?i3GEO.configura.diminuixM:i3GEO.configura.diminuixN;diminuiy=(navm)?i3GEO.configura.diminuiyM:i3GEO.configura.diminuiyN;menos=0;temp=$i("contemFerramentas");if(temp&&temp.style&&temp.style.width){menos+=parseInt($i("contemFerramentas").style.width,10)}temp=$i("ferramentas");if(temp&&temp.style&&temp.style.width){menos+=parseInt($i("ferramentas").style.width,10)}document.body.style.width="100%";temp=i3GEO.util.tamanhoBrowser();novow=temp[0];novoh=temp[1];temp=(antigoh-(novoh-diminuiy));document.body.style.height=novoh+"px";w=novow-menos-diminuix;h=novoh-diminuiy;temp=$i(i3GEO.Interface.IDMAPA);if(temp){temp.style.height=h+"px";temp.style.width=w+"px";YAHOO.util.Event.addListener(temp,"click",YAHOO.util.Event.stopEvent);YAHOO.util.Event.addFocusListener(temp,YAHOO.util.Event.preventDefault)}temp=$i(i3GEO.Interface.IDCORPO);if(temp){temp.style.height=h+"px";temp.style.width=w+"px";YAHOO.util.Event.addListener(temp,"click",YAHOO.util.Event.stopEvent);YAHOO.util.Event.addFocusListener(temp,YAHOO.util.Event.preventDefault)}temp=$i("mst");if(temp){temp.style.width="100%"}i3GEO.parametros.w=w;i3GEO.parametros.h=h;i3GEO.php.mudatamanho(i3GEO.atualiza,h,w);switch(i3GEO.Interface.ATUAL){case"googlemaps":i3GEO.Interface.googlemaps.zoom2extent(i3GEO.parametros.mapexten);break;case"googleearth":i3GEO.Interface.googleearth.zoom2extent(i3GEO.parametros.mapexten);break;case"openlayers":i3GEO.Interface.openlayers.zoom2ext(i3GEO.parametros.mapexten);i3geoOL.updateSize();break}if(i3GEO.guias.TIPO==="sanfona"){i3GEO.guias.ALTURACORPOGUIAS=h-(antigoh-i3GEO.guias.ALTURACORPOGUIAS)}else{i3GEO.guias.ALTURACORPOGUIAS=h}return[w,h]},atualizaParametros:function(variaveis){i3GEO.parametros.mapscale=variaveis.mapscale*1;i3GEO.parametros.mapres=variaveis.mapres*1;i3GEO.parametros.pixelsize=variaveis.pixelsize*1;i3GEO.parametros.mapexten=variaveis.mapexten;i3GEO.parametros.mapimagem=variaveis.mapimagem;i3GEO.parametros.w=variaveis.w*1;i3GEO.parametros.h=variaveis.h*1;i3GEO.parametros.mappath=variaveis.mappath;i3GEO.parametros.mapurl=variaveis.mapurl}};