if(typeof(i3GEO)==='undefined'){i3GEO=[]}i3GEO.maparef={fatorZoomDinamico:-3,SELETORTIPO:true,PERMITEFECHAR:true,PERMITEDESLOCAR:true,TRANSICAOSUAVE:false,OPACIDADE:35,TOP:4,RIGHT:0,inicia:function(){var r,pos,novoel,ins,temp,moveX,moveY,escondeRef;if(!$i("i3geo_winRef")){novoel=document.createElement("div");novoel.id="i3geo_winRef";novoel.style.display="none";novoel.style.borderColor="gray";ins="";if(i3GEO.maparef.PERMITEDESLOCAR){ins+='<div class="hd" style="text-align:left;z-index:20;padding-left: 0px;padding-bottom: 3px;padding-top: 1px;">';ins+='<span id=maparefmaismenosZoom > ';temp="javascript:if(i3GEO.maparef.fatorZoomDinamico == -1){i3GEO.maparef.fatorZoomDinamico = 1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico + 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";ins+="<img class=mais onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" />";temp="javascript:if(i3GEO.maparef.fatorZoomDinamico == 1){i3GEO.maparef.fatorZoomDinamico = -1};i3GEO.maparef.fatorZoomDinamico = i3GEO.maparef.fatorZoomDinamico - 1 ;$i(\"refDinamico\").checked = true;i3GEO.maparef.atualiza();";ins+="<img class=menos onclick='"+temp+"' src="+i3GEO.util.$im("branco.gif")+" /></span>&nbsp;";if(i3GEO.maparef.SELETORTIPO){ins+="<select style='font-size:9px;' id='refDinamico' onchange='javascript:i3GEO.maparef.atualiza()'>";ins+="<option value='fixo' select >fixo</option>";ins+="<option value='mapa' >mapa</option>";ins+="<option value='dinamico' >din�mico</option>";ins+="</select>"}ins+="</div>"}ins+='<div class="bd" style="text-align:left;padding:3px;height: 150px;" id="mapaReferencia" onmouseover="this.onmousemove=function(exy){i3GEO.eventos.posicaoMouseMapa(exy)}"  >';ins+='<img style="cursor:pointer;" id=imagemReferencia src="" onclick="javascript:i3GEO.maparef.click()">';ins+='</div>';novoel.innerHTML=ins;document.body.appendChild(novoel);if(i3GEO.maparef.TRANSICAOSUAVE){novoel=$i("imagemReferencia");if(navm){novoel.style.filter='alpha(opacity='+i3GEO.maparef.OPACIDADE+')'}else{novoel.style.opacity=i3GEO.maparef.OPACIDADE/100}novoel.onmouseover=function(){if(navm){novoel.style.filter='alpha(opacity=100)'}else{novoel.style.opacity=1}};novoel.onmouseout=function(){if(navm){novoel.style.filter='alpha(opacity='+i3GEO.maparef.OPACIDADE+')'}else{novoel.style.opacity=i3GEO.maparef.OPACIDADE/100}}}}if($i("i3geo_winRef").style.display!=="block"){$i("i3geo_winRef").style.display="block";YAHOO.namespace("janelaRef.xp");temp="none";if(i3GEO.maparef.PERMITEDESLOCAR){temp="shadow"}YAHOO.janelaRef.xp.panel=new YAHOO.widget.Panel("i3geo_winRef",{height:"177px",width:"156px",fixedcenter:false,constraintoviewport:true,underlay:temp,close:i3GEO.maparef.PERMITEFECHAR,visible:true,draggable:i3GEO.maparef.PERMITEDESLOCAR,modal:false,iframe:false});YAHOO.janelaRef.xp.panel.render();r=$i("i3geo_winRef_c");if(r){r.style.clip="rect(0px, 160px, 182px, 0px)";r.style.position="absolute"}pos=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));$i("mapaReferencia").style.height="150px";$i("i3geo_winRef").style.border="1px solid gray";moveX=pos[0]+i3GEO.parametros.w+153-i3GEO.maparef.RIGHT-300;moveY=pos[1]+i3GEO.maparef.TOP;YAHOO.janelaRef.xp.panel.moveTo(moveX,moveY);escondeRef=function(){YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close,"click");YAHOO.janelaRef.xp.panel.destroy();i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay","none")};YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close,"click",escondeRef);i3GEO.util.insereCookie("i3GEO.configura.mapaRefDisplay","block");if(typeof(atualizaLocalizarxy)==="function"){if(i3GEO.gadgets.PARAMETROS.mostraCoordenadasGEO.idhtml){YAHOO.util.Event.addListener($i("imagemReferencia"),"mousemove",atualizaLocalizarxy)}}}if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.maparef.atualiza()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.maparef.atualiza()")}this.atualiza();$i("i3geo_winRef_h").className="hd2";if(navm){$i("i3geo_winRef_h").style.width="156px"}},atualiza:function(){var dinamico,tiporef,temp,re;dinamico=false;if($i("refDinamico")){tiporef=$i("refDinamico").value}else{tiporef="fixo"}if($i("mapaReferencia")){temp=$i("maparefmaismenosZoom");if(tiporef==="dinamico"){i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico,tiporef);if(temp){temp.style.display="inline"}}if(tiporef==="fixo"){if(($i("imagemReferencia").src==="")||(i3GEO.parametros.cgi!=="sim")){i3GEO.php.referencia(i3GEO.maparef.processaImagem);if(temp){temp.style.display="none"}}else{re=new RegExp("&mode=map","g");$i("imagemReferencia").src=$i(i3GEO.Interface.IDMAPA).src.replace(re,'&mode=reference');i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src)}}if(tiporef==="mapa"){i3GEO.php.referenciadinamica(i3GEO.maparef.processaImagem,i3GEO.maparef.fatorZoomDinamico,tiporef);if(temp){temp.style.display="inline"}}}else{if($i("imagemReferencia")){i3GEO.gadgets.quadros.grava("referencia",$i("imagemReferencia").src)}i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.maparef.atualiza()")}},processaImagem:function(retorno){var w,tiporef,m,novoel,boxrefdd,box;i3GEO.janela.fechaAguarde("ajaxreferencia1");if((retorno.data!=="erro")&&(retorno.data!==undefined)){eval(retorno.data);i3GEO.parametros.celularef=g_celularef;i3GEO.parametros.extentref=extentref;if($i("imagemReferencia")){m=new Image();m.src=refimagem;$i("imagemReferencia").src=m.src}i3GEO.gadgets.quadros.grava("referencia",refimagem);tiporef="fixo";if($i("refDinamico")){tiporef=$i("refDinamico").value}box=$i("boxref");if(tiporef!=="fixo"){if(box){box.style.display="none"}return}if(!box){novoel=document.createElement("div");novoel.id="boxref";novoel.style.zIndex=10;novoel.style.position='absolute';novoel.style.cursor="move";novoel.style.backgroundColor="RGB(120,220,220)";if(navm){novoel.style.filter='alpha(opacity=40)'}else{novoel.style.opacity=0.4}$i("mapaReferencia").appendChild(novoel);boxrefdd=new YAHOO.util.DD("boxref");novoel.onmouseup=function(){var rect,telaminx,telaminxy,telamaxx,telaminy,m,x,ext;rect=$i("boxref");telaminx=parseInt(rect.style.left,10);telamaxy=parseInt(rect.style.top,10);telamaxx=telaminx+parseInt(rect.style.width,10);telaminy=telamaxy+parseInt(rect.style.height,10);m=i3GEO.calculo.tela2dd(telaminx,telaminy,i3GEO.parametros.celularef,i3GEO.parametros.extentref);x=i3GEO.calculo.tela2dd(telamaxx,telamaxy,i3GEO.parametros.celularef,i3GEO.parametros.extentref);ext=m[0]+" "+m[1]+" "+x[0]+" "+x[1];i3GEO.navega.zoomExt(i3GEO.configura.locaplic,i3GEO.configura.sid,"",ext)};box=$i("boxref")}i3GEO.calculo.ext2rect("boxref",extentref,i3GEO.parametros.mapexten,g_celularef,$i("mapaReferencia"));w=parseInt(box.style.width,10);if(w>120||w<10){box.style.display="none"}else{box.style.display="block";box.style.top=parseInt(box.style.top,10)+4;box.style.left=parseInt(box.style.left,10)+4}}},click:function(){try{i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.contadorAtualiza++;i3GEO.php.pan(i3GEO.atualiza,i3GEO.parametros.mapscale,"ref",objposicaocursor.refx,objposicaocursor.refy)}catch(e){i3GEO.janela.fechaAguarde("i3GEO.atualiza")}}};