if(typeof(i3GEO)==='undefined'){i3GEO=[]}i3GEO.ajuda={ATIVAJANELA:true,DIVAJUDA:"i3geo_ajuda",DIVLETREIRO:"i3geo_letreiro",MENSAGEMPADRAO:$trad("p1"),TRANSICAOSUAVE:true,OPACIDADE:20,abreDoc:function(){window.open(i3GEO.configura.locaplic+"/documentacao/index.html")},abreJanela:function(){try{var nx,ny,pos,corpo,texto,janela,temp,largura=262,YU=YAHOO.util;if(this.ATIVAJANELA===false){return}temp=$i("contemFerramentas");if(temp){largura=parseInt(temp.style.width,10)-3}if(!$i("janelaMenTexto")){corpo=$i(i3GEO.Interface.IDCORPO);if(corpo){pos=YU.Dom.getXY(corpo);nx=pos[0]-largura-3;ny=i3GEO.parametros.h-78}texto='<div id="janelaMenTexto" style="text-align:left;font-size:10px;color:rgb(80,80,80)">'+i3GEO.ajuda.MENSAGEMPADRAO+'</div>';janela=i3GEO.janela.cria(largura,"auto","",nx,ny,"&nbsp;","i3geo_janelaMensagens",false,"hd","","",true);janela[2].innerHTML=texto;YU.Event.addListener(janela[0].close,"click",i3GEO.ajuda.fechaJanela);this.ativaCookie()}}catch(e){}},ativaCookie:function(){var i=i3GEO.util.insereCookie;i("g_janelaMen","sim");i("botoesAjuda","sim")},ativaLetreiro:function(mensagem){var l;if($i(i3GEO.ajuda.DIVLETREIRO)){if(arguments.length===0){mensagem=i3GEO.parametros.mensagens}if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.ajuda.ativaLetreiro()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.ajuda.ativaLetreiro()")}try{clearTimeout(i3GEO.ajuda.tempoLetreiro)}catch(e){i3GEO.ajuda.tempoLetreiro=""}l=$i(i3GEO.ajuda.DIVLETREIRO);if(l.style.display==="none"){return}l.style.cursor="pointer";if(mensagem===""){l.value="";return}if(l.size===1){l.size=i3GEO.parametros.w/8}BMessage=mensagem+" ---Clique para parar--- ";l.onclick=function(){l.style.display="none"};if(BMessage!==" ---Clique para parar--- "){BQuantas=0;BSize=l.size;BPos=BSize;BSpeed=1;BSpaces="";i3GEO.ajuda.mostraLetreiro()}i3GEO.ajuda.mostraLetreiro(mensagem)}},desativaCookie:function(){i3GEO.util.insereCookie("g_janelaMen","nao")},fechaJanela:function(){i3GEO.ajuda.desativaCookie();i3GEO.util.removeChild("i3geo_janelaMensagens_c",document.body)},mostraJanela:function(texto){var j=$i(this.DIVAJUDA),k=$i("janelaMenTexto"),jm=$i("i3geo_janelaMensagens"),Dom=YAHOO.util.Dom,h=parseInt(Dom.getStyle(jm,"height"),10),temp;if(j){j.innerHTML=texto===""?"-":texto}else{if(h){Dom.setY("i3geo_janelaMensagens",Dom.getY(jm)+h)}if(k){k.innerHTML=texto}if(this.TRANSICAOSUAVE){temp=texto!==""?Dom.setStyle(jm,"opacity","1"):Dom.setStyle(jm,"opacity",(this.OPACIDADE/100))}h=parseInt(Dom.getStyle(jm,"height"),10);if(h){Dom.setY(jm,Dom.getY(jm)-h)}}},mostraLetreiro:function(){for(count=0;count<BPos;count+=1){BSpaces+=" "}if(BPos<1){$i(i3GEO.ajuda.DIVLETREIRO).value=BMessage.substring(Math.abs(BPos),BMessage.length);if(BPos+BMessage.length<1){BPos=BSize;BQuantas=BQuantas+1}}else{$i(i3GEO.ajuda.DIVLETREIRO).value=BSpaces+BMessage}BPos-=BSpeed;if(BQuantas<2){i3GEO.ajuda.tempoLetreiro=setTimeout(function(){i3GEO.ajuda.mostraLetreiro()},140)}},redesSociais:function(){i3GEO.janela.cria("400px","400px",i3GEO.configura.locaplic+"/ferramentas/redessociais/index.php","","",$trad("u5c"),YAHOO.util.Dom.generateId(null,"redes"))}};