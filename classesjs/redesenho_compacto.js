function ajaxhttp(){ try{var objhttp1=new XMLHttpRequest();}
 catch(ee){ try{var objhttp1=new ActiveXObject("Msxml2.XMLHTTP");}
 catch(e){ try{var objhttp1=new ActiveXObject("Microsoft.XMLHTTP");}
 catch(E){var objhttp1=false;}}}
 return(objhttp1);}
function ajaxexecAS(programa,funcao){ var ohttp=ajaxhttp(); ohttp.open("POST",programa,true); var retorno=""; ohttp.onreadystatechange=function(){ if(ohttp.readyState==4){ retorno=ohttp.responseText; var reg=/Warning/gi; if(retorno.search(reg)!=-1){ alert("OOps! Ocorreu um erro\n"+retorno); return;}
 var reg=/erro/gi; if(retorno.search(reg)!=-1){ alert("OOps! Ocorreu um erro\n"+retorno); return;}
 if(funcao !="volta"){eval(funcao+'("'+retorno+'")');}}}
 ohttp.send(null);}
function ajaxexec(programa,funcao){ var objhttp=ajaxhttp(); objhttp.open('GET', programa, false); objhttp.send(null); if(objhttp.status==200){ if(funcao !="volta"){eval(funcao+'("'+objhttp.responseText+'")');}
 else{return objhttp.responseText;}}}
function ajaxexecASXml(programa,funcao){ if(programa.search("http")==0){ var h=window.location.host; if(programa.search(h)< 0){ alert("OOps! Nao e possivel chamar um XML de outro host.\nContacte o administrador do sistema.\nConfigure corretamente o ms_configura.php"); return;}}
 var ohttp=ajaxhttp(); ohttp.open("GET",programa,true); var retorno=""; ohttp.onreadystatechange=function(){ if(ohttp.readyState==4){ var retorno=ohttp.responseText; if(retorno !=undefined){ if(document.implementation.createDocument){ var parser=new DOMParser(); var dom=parser.parseFromString(retorno, "text/xml");}
 else{ var dom=new ActiveXObject("Microsoft.XMLDOM"); dom.async="false"; dom.load(programa);}}
 else{var dom="erro";}
 if(funcao !="volta"){eval(funcao+'(dom)');}
 else{return dom;}}}
 ohttp.send(null);}
function ajaxEscalaGrafica(retorno){ if((retorno.data !="erro")&&(retorno.data !=undefined)){ eval(retorno.data); if($i("imagemEscalaGrafica")){ var m=new Image(); m.src=scaimagem; $i("imagemEscalaGrafica").src=m.src; gravaQuadro("escala",scaimagem);}}}
function ajaxReferencia(retorno){ if((retorno.data !="erro")&&(retorno.data !=undefined)){ eval(retorno.data); if($i("imagemReferencia")){ var m=new Image(); m.src=refimagem; $i("imagemReferencia").src=m.src; if((objmapa.scale < 15000000)&&(objmapa.scale > 10000000)){ $i("refmensagem").innerHTML="Para navegar no mapa principal, voc&ecirc;pode clicar em um ponto no mapa de refer&ecirc;ncia."; $i("refmensagem").style.fontSize="10px";}
 else{ $i("refmensagem").innerHTML=""; $i("refmensagem").style.fontSize="0px";}}
 gravaQuadro("referencia",refimagem);}}
function ajaxLegendaHTML(retorno){ if((retorno.data !="erro")&&(retorno.data !=undefined)){ var s=g_locaplic+"/imagens/solta.gif"; $i("legenda").innerHTML="<img src="+s+" title='clique para liberar'/><div id=corpoLegi >"+retorno.data+"</div>"; g_legendaHTML=retorno.data; if($i("moveLegi")){$i("wlegenda").innerHTML=g_legendaHTML;}
 $i("legenda").onclick=function(){ if(!$i("moveLegi")){ var novoel=document.createElement("div"); novoel.id="moveLegi"; novoel.style.display="block"; var temp='<div class="hd"><div class="tl"></div>'; temp+='<div class="tr"></div></div><div id=wlegenda style=text-align:left >'; temp+=g_legendaHTML+"</div>"; novoel.innerHTML=temp; document.body.appendChild(novoel); YAHOO.namespace("moveLegi.xp"); YAHOO.moveLegi.xp.panel=new YAHOO.widget.Panel("moveLegi",{width:"300px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false}); var escondeLeg=function(){ YAHOO.util.Event.removeListener(YAHOO.moveLegi.xp.panel.close, "click"); YAHOO.moveLegi.xp.panel.destroy();}
 YAHOO.moveLegi.xp.panel.render(); YAHOO.moveLegi.xp.panel.show(); YAHOO.util.Event.addListener(YAHOO.moveLegi.xp.panel.close, "click", escondeLeg);}}}}
function ajaxLegendaImagem(retorno){ if((retorno.data !="erro")&&(retorno.data !=undefined)){ eval(retorno.data); if($i("lugarquadros")){gravaQuadro("legenda",legimagem);}}}
function ajaxCorpoMapa(retorno){ $i("mst").style.display="block"; if(!$i("img")){return;}
 objaguarde.abre("ajaxCorpoMapa1","Lendo imagem..."); if(retorno.data){retorno=retorno.data;}
 if((retorno !="erro")&&(retorno !=undefined)){ eval(retorno); $i("img").onload=function(){ avancaQuadro(); gravaQuadro("imagem",mapimagem); g_quadrooriginal=mapimagem; if($i("banners")){$i("banners").style.height=objmapa.h;}
 if($i("legenda")){$i("legenda").style.height=objmapa.h;}
 borra("nao"); $i("img").style.width=objmapa.w; $i("img").style.height=objmapa.h; calcposf(); objaguarde.fecha("ajaxCorpoMapa1"); if($i("imgtemp")){$i("imgtemp").style.display="none";}
 $i("img").onload="";}
 $i("img").src=mapimagem;}
 else{ borra("nao"); calcposf(); trataErro(); alert("Erro no mapa");}}
function ajaxredesenha(retorno){ var original=retorno; if(retorno.data){var retorno=retorno.data;}
 else{retorno="";}
 if((retorno !="erro")&&(retorno !=undefined)){ if(retorno.search("var mapimagem=")>-1){ajaxIniciaParametros(original);}
 else{ var legimagem=""; if($i("img")){ objaguarde.abre("ajaxiniciaParametros","Aguarde..."); var p=g_locaplic+"/classesphp/mapa_controle.php?funcao=corpo&tipoimagem="+g_tipoimagem+"&g_sid="+g_sid; var cp=new cpaint(); cp.set_response_type("JSON"); cp.call(p,"redesenhaCorpo",ajaxIniciaParametros);}
 objaguarde.fecha("ajaxredesenha"); if($i("img_d")){$i("img_d").style.display="none";}
 g_destaca=""; if($i("openlayers")){ $i("openlayers").innerHTML=""; var b=objmapa.OL.getExtent(); criaOL(Math.random()+Math.random()+Math.random()+Math.random()); objmapa.OL.zoomToExtent(b);}}}
 borra("nao");}
function ajaxIniciaParametros(retorno){ borra("nao"); try{ if($i("openlayers")){ $i("openlayers").innerHTML=""; var b=objmapa.OL.getExtent(); criaOL(Math.random()+Math.random()+Math.random()+Math.random()); objmapa.OL.zoomToExtent(b);}
 for(ot=0;ot<objmapa.objtips.length;ot++){ if(objmapa.objtips[ot]){ objmapa.objtips[ot].innerHTML=""; objmapa.objtips[ot].style.display="none";}}
 objmapa.objtips=new Array(); limpacontainerf(); if($i("imgh")){$i("imgh").style.display="block";}
 var retorno=retorno.data; if((retorno !="erro")&&(retorno !=undefined)){ if($i("imgL")){ var letras=["N","S","L","O"]; for(l=0;l<letras.length;l++){$i("img"+letras[l]).src="";}}
 temas=""; mapscale=""; mapexten=""; if(retorno !=""){eval(retorno);}
 if($i("img")){ if(!$i("imgtemp")){ var ndiv=document.createElement("div"); ndiv.id="imgtemp"; ndiv.style.position="absolute"; ndiv.style.border="1px solid blue"; document.getElementById("corpoMapa").appendChild(ndiv);}
 if(g_tipoacao=="pan"){ $i("imgtemp").style.left=parseInt($i("img").style.left); $i("imgtemp").style.top=parseInt($i("img").style.top); $i("imgtemp").style.width=objmapa.w; $i("imgtemp").style.height=objmapa.h; $i("imgtemp").style.display="block"; $i("imgtemp").style.backgroundImage='url("'+$i("img").src+'")';}
 $i("img").style.width=0; $i("img").style.height=0; $i("img").src=""; $i("img").style.left=0; $i("img").style.top=0; ajaxCorpoMapa(retorno);}
 objmapa.atualizaLegendaHTML(); objmapa.atualizaListaTemas(temas); objmapa.atualizaFarol(mapscale); objmapa.atualizaReferencia(mapexten); objmapa.scale=mapscale; g_operacao=""; objmapa.temas=temas; objmapa.cellsize=g_celula; objmapa.extent=mapexten; objmapa.temas=temas; if($i("escalanum")){$i("escalanum").value=parseInt(mapscale);}
 if($i("mensagemt")){$i("mensagemt").value=mapexten;}
 gravaQuadro("extensao",mapexten); objaguarde.fecha("ajaxiniciaParametros"); objaguarde.fecha("aguardedoc"); objaguarde.fecha("ajaxredesenha"); if(g_lenteaberta=="sim"){ objaguarde.abre("ajaxabrelente","Aguarde...abrindo lente"); var p=g_locaplic+"/classesphp/mapa_controle.php?funcao=crialente&resolucao=1.5&g_sid="+g_sid; var cp=new cpaint(); cp.set_response_type("JSON"); cp.call(p,"lente",ajaxabrelente);}
 atualizagoogle(); atualizascielo(); atualizawiki(); atualizaconfluence(); if(g_entorno=="sim"){ geraURLentorno(); ajustaEntorno();}}}
 catch(e){trataErro();}}
function ajaxabrelente(retorno){ try{ var retorno=retorno.data; if(retorno=="erro"){alert("A lente nao pode ser criada");return;}
 var volta=retorno.split(","); var nimg=volta[2]; var olente=$i('lente'); var oboxlente=$i('boxlente'); var olenteimg=$i('lenteimg'); olenteimg.src=nimg; olenteimg.style.width=volta[0]*1.5; olenteimg.style.height=volta[1]*1.5; olente.style.zIndex=1000; olenteimg.style.zIndex=1000; oboxlente.style.zIndex=1000; eval("olente.style."+g_tipoleft+"=imagemxi+g_postpx"); eval("olente.style."+g_tipotop+"=imagemyi+g_postpx"); eval("oboxlente.style."+g_tipoleft+"=imagemxi+g_postpx"); eval("oboxlente.style."+g_tipotop+"=imagemyi+g_postpx"); oboxlente.style.display='block'; oboxlente.style.visibility='visible'; olente.style.display='block'; olente.style.visibility='visible'; objaguarde.fecha("ajaxabrelente");}
 catch(e){trataErro();}}
function ajaxdestaca(retorno){ var retorno=retorno.data; var m=new Image(); m.src=retorno; if(!$i("img_d")){ var novoel=document.createElement("div"); novoel.id="div_d"; document.body.appendChild(novoel); $i("div_d").innerHTML="<input style='position:relative;top:0px;left:0px'' type=image src='' id='img_d'/>"; $i("div_d").style.left=parseInt($i("corpoMapa").style.left); $i("div_d").style.top=parseInt($i("corpoMapa").style.top); $i("img_d").style.left=0; $i("img_d").style.top=0; $i("img_d").style.width=objmapa.w; $i("img_d").style.height=objmapa.h; $i("div_d").style.clip='rect(0 75 75 0)'; $i("img_d").src=retorno; var novoeli=document.createElement("div"); novoeli.id="div_di"; novoel.appendChild(novoeli); $i("div_di").innerHTML="<p style='position:absolute;top:0px;left:0px'>+-</p>";}
 $i("div_d").innerHTML=""; var novoel=document.createElement("input"); novoel.id="img_d"; novoel.style.position="relative"; novoel.style.top="0px"; novoel.style.left="0px"; novoel.type="image"; novoel.src=m.src; novoel.style.display="block"; $i("div_d").appendChild(novoel); objaguarde.fecha("ajaxdestaca");}function testaajax(){}
