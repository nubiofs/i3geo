if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.analise={pontos:{xpt:[],ypt:[]},dialogo:{markercluster:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.markercluster()","markercluster","markercluster","dependencias.php","i3GEOF.markercluster.iniciaJanelaFlutuante()")},heatmap:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.heatmap()","heatmap","heatmap","dependencias.php","i3GEOF.heatmap.iniciaJanelaFlutuante()")},saiku:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.saiku()","saiku","saiku")},saikuMapa:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.saiku()","saiku","saiku","index.js","i3GEOF.saiku.iniciaJanelaFlutuante2()")},graficoInterativo:function(){alert("depreciado. Use graficointerativo1")},graficoInterativo1:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.graficointerativo1()","graficointerativo1","graficointerativo1","dependencias.php","i3GEOF.graficointerativo1.iniciaJanelaFlutuante()")},linhaDoTempo:function(){i3GEO.janela.cria("450px","350px",i3GEO.configura.locaplic+"/ferramentas/linhadotempo/index.php","","","Linha do tempo <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=3&idajuda=88' >&nbsp;&nbsp;&nbsp;</a>","i3GEOF.linhaDoTempo",false,"hd","","","",true,i3GEO.configura.locaplic+"/imagens/oxygen/16x16/clock.png");i3GEO.analise.atualizaLinhaDoTempo=function(){var doc="",ifr="";try{ifr=$i("i3GEOF.linhaDoTempoi");if(navn){if(ifr){doc=ifr.contentDocument}}else{if(document.frames("i3GEOF.linhaDoTempoi")){doc=document.frames("i3GEOF.linhaDoTempoi").document}}doc.getElementById("tl")?window.parent["i3GEOF.linhaDoTempoi"].carregaDados():i3GEO.eventos.removeEventos("NAVEGAMAPA",["i3GEO.analise.atualizaLinhaDoTempo()"])}catch(e){i3GEO.eventos.removeEventos("NAVEGAMAPA",["i3GEO.analise.atualizaLinhaDoTempo()"])}};i3GEO.eventos.adicionaEventos("NAVEGAMAPA",["i3GEO.analise.atualizaLinhaDoTempo()"]);var ifr=$i("i3GEOF.linhaDoTempoi");if(ifr){ifr.style.width="100%"}},perfil:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.perfil()","perfil","perfil")},melhorcaminho:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.melhorcaminho()","melhorcaminho","melhorcaminho")},gradePontos:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.gradePontos()","gradepontos","gradeDePontos")},gradePol:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.gradePol()","gradepol","gradeDePoligonos")},gradeHex:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.gradeHex()","gradehex","gradeDeHex")},analisaGeometrias:function(){i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tabela()","analisageometrias","analisaGeometrias","dependencias.php","i3GEOF.analisaGeometrias.iniciaJanelaFlutuante()")},pontosdistri:function(){i3GEO.parametros.r==="nao"?i3GEO.janela.tempoMsg($trad("x22")):i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.pontosdistri()","pontosdistri","pontosDistri","dependencias.php","i3GEOF.pontosDistri.iniciaJanelaFlutuante()")},pontoempoligono:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.pontoempoligono()","pontoempoligono","pontoEmPoligono","dependencias.php","i3GEOF.pontoEmPoligono.iniciaJanelaFlutuante()")},centromassa:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.centromassa()","centromassa","centromassa","dependencias.php","i3GEOF.centromassa.iniciaJanelaFlutuante()")},nptPol:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.nptpol()","nptpol","nptpol","dependencias.php","i3GEOF.nptpol.iniciaJanelaFlutuante()")},buffer:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.buffer()","buffer","buffer","dependencias.php","i3GEOF.buffer.iniciaJanelaFlutuante()")},distanciaptpt:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.distanciaptpt()","distanciaptpt","distanciaptpt","dependencias.php","i3GEOF.distanciaptpt.iniciaJanelaFlutuante()")},centroide:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.centroide()","centroide","centroide","dependencias.php","i3GEOF.centroide.iniciaJanelaFlutuante()")},dissolve:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.dissolve()","dissolve","dissolve","dependencias.php","i3GEOF.dissolve.iniciaJanelaFlutuante()")},agrupaElementos:function(){i3GEO.util.dialogoFerramenta("i3GEO.analise.dialogo.agrupaElementos()","agrupaelementos","agrupaElementos","dependencias.php","i3GEOF.agrupaElementos.iniciaJanelaFlutuante()")}},medeDistancia:{pontos:{},ultimoWkt:"",ultimaMedida:"",inicia:function(){i3GEO.eventos.cliquePerm.desativa();i3GEO.analise.medeDistancia.criaJanela();i3GEO.analise.medeDistancia[i3GEO.Interface["ATUAL"]].inicia()},criaJanela:function(){var novoel,ins,imagemxy,janela;i3GEO.analise.pontos={xpt:[],ypt:[]};if(!$i("mostradistancia")){novoel=document.createElement("div");novoel.id="mostradistancia";ins='<div class="hd" style="font-size:11px">&nbsp;Dist&acirc;ncia aproximada <a class=ajuda_usuario target=_blank href="'+i3GEO.configura.locaplic+'/ajuda_usuario.php?idcategoria=6&idajuda=50" >&nbsp;&nbsp;&nbsp;</a></div>'+'<div class="bd" style="text-align:left;padding:3px;" >'+'<div style="text-align:left;padding:3px;" id="mostradistancia_calculo" ></div>'+'<div style="text-align:left;padding:3px;" id="mostradistancia_calculo_movel" ></div>'+'<div style="text-align:left;font-size:10px" >'+'<span style="color:navy;cursor:pointer;text-align:left;" >'+'<table class="lista7" style="width:250px">'+'<tr>'+'<td><input style="cursor:pointer" type="checkbox" id="pararraios" checked /></td>'+'<td>Raios</td>'+'<td>&nbsp;</td>'+'<td><input style="cursor:pointer" type="checkbox" id="parartextos" checked /></td>'+'<td>Textos<td>'+'<td>&nbsp;Estilo:</td>'+'<td><div class=styled-select style="width:85px;">'+i3GEO.desenho.caixaEstilos()+'</div></td></tr>'+'<tr><td></td><td></td>'+'<td></td><td></td><td></td><td></td><td>&nbsp;<input id=i3GEObotaoPerfil size="22" type="button" value="perfil"></td><td>&nbsp;<input id=i3GEObotaoDistWkt size="22" type="button" value="incorporar"></td></tr></table></span>'+'</div>'+'</div>';novoel.innerHTML=ins;novoel.style.borderColor="gray";document.body.appendChild(novoel);janela=new YAHOO.widget.Panel("mostradistancia",{iframe:true,width:"255px",fixedcenter:false,constraintoviewport:true,underlay:"none",close:true,visible:true,draggable:true,modal:false});YAHOO.i3GEO.janela.manager.register(janela);janela.render();YAHOO.util.Event.addListener(janela.close,"click",i3GEO.analise.medeDistancia.fechaJanela)}else{i3GEO.util.defineValor("mostradistancia_calculo","innerHTML","");janela=YAHOO.i3GEO.janela.manager.find("mostradistancia")}janela.show();imagemxy=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));janela.moveTo(imagemxy[0]+150,imagemxy[1]);new YAHOO.widget.Button("i3GEObotaoPerfil",{onclick:{fn:function(){var js=i3GEO.configura.locaplic+"/ferramentas/perfil/dependencias.php",temp=function(){i3GEOF.perfil.iniciaJanelaFlutuante(i3GEO.analise.pontos)};i3GEO.util.scriptTag(js,temp,"i3GEOF.perfil_script")}}});new YAHOO.widget.Button("i3GEObotaoDistWkt",{onclick:{fn:function(){i3GEO.mapa.dialogo.wkt2layer(i3GEO.analise.medeDistancia.ultimoWkt,i3GEO.analise.medeDistancia.ultimaMedida)}}})},fechaJanela:function(){var janela;i3GEO.eventos.cliquePerm.ativa();janela=YAHOO.i3GEO.janela.manager.find("mostradistancia");if(janela){YAHOO.i3GEO.janela.manager.remove(janela);janela.destroy()}i3GEO.barraDeBotoes.ativaIcone("pointer");i3GEO.analise.medeDistancia[i3GEO.Interface["ATUAL"]].fechaJanela();i3GEO.analise.pontos={}},pontos2wkt:function(){var pontos=[],x=i3GEO.analise.medeDistancia.pontos.xpt,y=i3GEO.analise.medeDistancia.pontos.ypt,n=x.length,i;for(i=0;i<n;i++){pontos.push(x[i]+" "+y[i])}return"LINESTRING("+pontos.join(",")+")"},openlayers:{inicia:function(){var linha,estilo=i3GEO.desenho.estilos[i3GEO.desenho.estiloPadrao],controle=i3geoOL.getControlsBy("id","i3GeoMedeDistancia");i3GEO.desenho[i3GEO.Interface["ATUAL"]].inicia();i3GEO.analise.medeDistancia.pontos={xpt:[],ypt:[],dist:[]};if(controle.length===0){linha=new OpenLayers.Control.DrawFeature(i3GEO.desenho.layergrafico,OpenLayers.Handler.Path,{autoActivate:true,id:"i3GeoMedeDistancia",type:OpenLayers.Control.TYPE_TOOL,callbacks:{done:function(feature){var t,f=new OpenLayers.Feature.Vector(feature,{origem:"medeDistancia"},{graphicName:"square",pointRadius:10,graphicOpacity:1,strokeWidth:estilo.linewidth,strokeColor:estilo.linecolor});i3GEO.desenho.layergrafico.addFeatures([f]);if(i3GEO.Interface){i3GEO.Interface.openlayers.sobeLayersGraficos()}i3GEO.analise.medeDistancia.openlayers.mostraParcial(0,0,0);i3GEO.analise.medeDistancia.ultimoWkt=i3GEO.analise.medeDistancia.pontos2wkt();t=i3GEO.analise.medeDistancia.openlayers.somaDist();t=t.toFixed(3)+" km";i3GEO.analise.medeDistancia.ultimaMedida=t;i3GEO.analise.medeDistancia.openlayers.inicia()},modify:function(point){var n,x1,y1,x2,y2,trecho,parcial,direcao;n=i3GEO.analise.medeDistancia.pontos.ypt.length;if(n>0){x1=i3GEO.analise.medeDistancia.pontos.xpt[n-1];y1=i3GEO.analise.medeDistancia.pontos.ypt[n-1];x2=point.x;y2=point.y;if(i3GEO.Interface.openlayers.googleLike){temp=i3GEO.util.extOSM2Geo(x1+" "+y1+" "+x2+" "+y2);temp=temp.split(" ");x1=temp[0];y1=temp[1];x2=temp[2];y2=temp[3]}trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);parcial=i3GEO.analise.medeDistancia.openlayers.somaDist();direcao=i3GEO.calculo.direcao(x1,y1,x2,y2);direcao=i3GEO.calculo.dd2dms(direcao,direcao);direcao=direcao[0];i3GEO.analise.medeDistancia.openlayers.mostraParcial(trecho,parcial,direcao)}},point:function(point){var n,x1,y1,x2,y2,trecho,temp,circ,label,raio,pontoRaio,total=0;i3GEO.analise.medeDistancia.pontos.xpt.push(point.x);i3GEO.analise.medeDistancia.pontos.ypt.push(point.y);i3GEO.analise.pontos.xpt.push(point.x);i3GEO.analise.pontos.ypt.push(point.y);n=i3GEO.analise.medeDistancia.pontos.ypt.length;if(n>1){x1=i3GEO.analise.medeDistancia.pontos.xpt[n-2];y1=i3GEO.analise.medeDistancia.pontos.ypt[n-2];x2=point.x;y2=point.y;raio=point.distanceTo(new OpenLayers.Geometry.Point(x1,y1));pontoRaio=new OpenLayers.Geometry.Point(x1,y1);if(i3GEO.Interface.openlayers.googleLike){temp=i3GEO.util.extOSM2Geo(x1+" "+y1+" "+x2+" "+y2);temp=temp.split(" ");x1=temp[0];y1=temp[1];x2=temp[2];y2=temp[3]}trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);i3GEO.analise.medeDistancia.pontos.dist.push(trecho);total=i3GEO.analise.medeDistancia.openlayers.somaDist();i3GEO.analise.medeDistancia.openlayers.mostraTotal(trecho,total);if($i("pararraios")&&$i("pararraios").checked===true){circ=new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(pontoRaio,raio,30),{origem:"medeDistanciaExcluir"},{fill:false,strokeColor:estilo.circcolor,strokeWidth:1});i3GEO.desenho.layergrafico.addFeatures([circ])}if($i("parartextos")&&$i("parartextos").checked===true){label=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(point.x,point.y),{origem:"medeDistanciaExcluir"},{graphicName:"square",pointRadius:3,strokeColor:"black",graphicOpacity:1,strokeWidth:1,fillColor:"white",label:trecho.toFixed(3),labelAlign:"rb",fontColor:estilo.textcolor,fontSize:12,fontWeight:"bold"});i3GEO.desenho.layergrafico.addFeatures([label])}}}}});i3geoOL.addControl(linha)}},somaDist:function(){var n,i,total=0;n=i3GEO.analise.medeDistancia.pontos.dist.length;for(i=0;i<n;i++){total+=i3GEO.analise.medeDistancia.pontos.dist[i]}return total},fechaJanela:function(){var temp,controle=i3geoOL.getControlsBy("id","i3GeoMedeDistancia"),f=i3GEO.desenho.layergrafico.getFeaturesByAttribute("origem","medeDistancia");if(controle.length>0){controle[0].deactivate();i3geoOL.removeControl(controle[0])}if(f&&f.length>0){temp=window.confirm($trad("x94"));if(temp){i3GEO.desenho.layergrafico.destroyFeatures(f)}}f=i3GEO.desenho.layergrafico.getFeaturesByAttribute("origem","medeDistanciaExcluir");if(f&&f.length>0){i3GEO.desenho.layergrafico.destroyFeatures(f)}},mostraTotal:function(trecho,total){var mostra=$i("mostradistancia_calculo"),texto;if(mostra){texto="<b>"+$trad("x96")+":</b> "+total.toFixed(3)+" km"+"<br><b>"+$trad("x96")+":</b> "+(total*1000).toFixed(2)+" m"+"<br>"+$trad("x25")+": "+i3GEO.calculo.metododistancia;mostra.innerHTML=texto}},mostraParcial:function(trecho,parcial,direcao){var mostra=$i("mostradistancia_calculo_movel"),texto;if(mostra){texto="<b>"+$trad("x95")+":</b> "+trecho.toFixed(3)+" km"+"<br><b>"+$trad("x97")+":</b> "+(parcial+trecho).toFixed(3)+" km"+"<br><b>"+$trad("x23")+" (DMS):</b> "+direcao;mostra.innerHTML=texto}}},googlemaps:{inicia:function(){i3GEO.analise.medeDistancia.pontos={xpt:[],ypt:[],dist:[]};i3GEO.desenho[i3GEO.Interface["ATUAL"]].inicia();i3GeoMap.setOptions({disableDoubleClickZoom:true});i3GeoMap.setOptions({draggableCursor:'crosshair'});var t,evtdblclick=null,evtclick=null,evtmousemove=null,pontos={xpt:[],ypt:[],dist:[],mvcLine:new google.maps.MVCArray(),mvcMarkers:new google.maps.MVCArray(),line:null,polygon:null},termina=function(){google.maps.event.removeListener(evtdblclick);google.maps.event.removeListener(evtclick);google.maps.event.removeListener(evtmousemove);pontos.line.setOptions({clickable:true});google.maps.event.addListener(pontos.line,'click',function(shape){if(shape.setEditable){shape.setEditable(!shape.editable)}});i3GEO.analise.medeDistancia.ultimoWkt=i3GEO.analise.medeDistancia.pontos2wkt();t=i3GEO.analise.medeDistancia.googlemaps.somaDist(pontos);i3GEO.analise.medeDistancia.ultimaMedida=t.toFixed(3)+" km";if(pontos){i3GEO.desenho.googlemaps.shapes.push(pontos.mvcLine);i3GEO.desenho.googlemaps.shapes.push(pontos.line);pontos=null}};evtclick=google.maps.event.addListener(i3GeoMap,"click",function(evt){var x1,x2,y1,y2,trecho=0,total,n;pontos.mvcLine.push(evt.latLng);pontos.xpt.push(evt.latLng.lng());pontos.ypt.push(evt.latLng.lat());i3GEO.analise.medeDistancia.pontos.xpt.push(evt.latLng.lng());i3GEO.analise.medeDistancia.pontos.ypt.push(evt.latLng.lat());n=pontos.xpt.length;if(pontos.mvcLine.getLength()>1){x1=pontos.xpt[n-2];y1=pontos.ypt[n-2];x2=evt.latLng.lng();y2=evt.latLng.lat();trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);pontos.dist.push(trecho);total=i3GEO.analise.medeDistancia.googlemaps.somaDist(pontos);i3GEO.analise.medeDistancia.googlemaps.mostraTotal(trecho,total);if($i("pararraios")&&$i("pararraios").checked===true){i3GEO.desenho.googlemaps.shapes.push(new google.maps.Circle({map:i3GeoMap,fillOpacity:0,clickable:false,strokeColor:"black",strokeOpacity:1,strokeWeight:2,center:new google.maps.LatLng(y1,x1),radius:trecho*1000,origem:"medeDistanciaExcluir"}))}}if($i("parartextos")&&$i("parartextos").checked===true){i3GEO.desenho.googlemaps.shapes.push(new google.maps.Marker({map:i3GeoMap,fillOpacity:0,clickable:false,position:evt.latLng,icon:{path:google.maps.SymbolPath.CIRCLE,scale:2.5,strokeColor:"#ffffff",title:trecho.toFixed(0)+" km"},origem:"medeDistanciaExcluir"}))}pontos.mvcLine.push(evt.latLng)});evtmousemove=google.maps.event.addListener(i3GeoMap,"mousemove",function(evt){if(!$i("mostradistancia_calculo")){termina.call();return}var x1,y1,x2,y2,direcao,parcial,estilo=i3GEO.desenho.estilos[i3GEO.desenho.estiloPadrao],n=pontos.xpt.length;if(pontos.mvcLine.getLength()>0){if(!pontos.line){pontos.line=new google.maps.Polyline({map:i3GeoMap,clickable:false,strokeColor:estilo.linecolor,strokeOpacity:1,strokeWeight:estilo.linewidth,path:pontos.mvcLine,origem:"medeDistancia"})}pontos.mvcLine.pop();pontos.mvcLine.push(evt.latLng);parcial=i3GEO.analise.medeDistancia.googlemaps.somaDist(pontos);x1=pontos.xpt[n-1];y1=pontos.ypt[n-1];x2=evt.latLng.lng();y2=evt.latLng.lat();trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);direcao=i3GEO.calculo.direcao(x1,y1,x2,y2);direcao=i3GEO.calculo.dd2dms(direcao,direcao);direcao=direcao[0];i3GEO.analise.medeDistancia.googlemaps.mostraParcial(trecho,parcial,direcao)}});evtdblclick=google.maps.event.addListener(i3GeoMap,"dblclick",function(evt){termina.call()})},somaDist:function(pontos){var n,i,total=0;n=pontos.dist.length;for(i=0;i<n;i++){total+=pontos.dist[i]}return total},fechaJanela:function(){i3GeoMap.setOptions({disableDoubleClickZoom:false});i3GeoMap.setOptions({draggableCursor:undefined});var f=i3GEO.desenho.googlemaps.getFeaturesByAttribute("origem","medeDistancia");if(f&&f.length>0){temp=window.confirm($trad("x94"));if(temp){i3GEO.desenho.googlemaps.destroyFeatures(f)}}f=i3GEO.desenho.googlemaps.getFeaturesByAttribute("origem","medeDistanciaExcluir");if(f&&f.length>0){i3GEO.desenho.googlemaps.destroyFeatures(f)}},mostraTotal:function(trecho,total){var mostra=$i("mostradistancia_calculo"),texto;if(mostra){texto="<b>"+$trad("x96")+":</b> "+total.toFixed(3)+" km"+"<br><b>"+$trad("x96")+":</b> "+(total*1000).toFixed(2)+" m"+"<br>"+$trad("x25")+": "+i3GEO.calculo.metododistancia;mostra.innerHTML=texto}},mostraParcial:function(trecho,parcial,direcao){var mostra=$i("mostradistancia_calculo_movel"),texto;if(mostra){texto="<b>"+$trad("x95")+":</b> "+trecho.toFixed(3)+" km"+"<br><b>"+$trad("x97")+":</b> "+(parcial+trecho).toFixed(3)+" km"+"<br><b>"+$trad("x23")+" (DMS):</b> "+direcao;mostra.innerHTML=texto}}},googleearth:{pontosdistobj:{xpt:[],ypt:[],dist:[],distV:[],xtela:[],ytela:[],ximg:[],yimg:[],linhas:[],linhastemp:[]},inicia:function(){i3GEO.eventos.adicionaEventos("MOUSECLIQUE",["i3GEO.analise.medeDistancia.googleearth.clique()"]);i3GEO.eventos.adicionaEventos("MOUSEMOVE",["i3GEO.analise.medeDistancia.googleearth.movimento()"]);i3GEO.eventos.adicionaEventos("NAVEGAMAPA",["i3GEO.analise.medeDistancia.fechaJanela()"])},clique:function(){var pontosdistobj=i3GEO.analise.medeDistancia.googleearth.pontosdistobj,n,d,dd;n=pontosdistobj.xpt.length;pontosdistobj.xpt[n]=objposicaocursor.ddx;pontosdistobj.ypt[n]=objposicaocursor.ddy;pontosdistobj.xtela[n]=objposicaocursor.telax;pontosdistobj.ytela[n]=objposicaocursor.telay;pontosdistobj.ximg[n]=objposicaocursor.imgx;pontosdistobj.yimg[n]=objposicaocursor.imgy;pontosdistobj.dist[n]=0;if(n>0){d=i3GEO.calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);pontosdistobj.dist[n]=d+pontosdistobj.dist[n-1];if($i("pararraios")&&$i("pararraios").checked===true){dd=Math.sqrt(((Math.pow((pontosdistobj.xpt[n]-pontosdistobj.xpt[n-1]),2))+(Math.pow((pontosdistobj.ypt[n]-pontosdistobj.ypt[n-1]),2))));i3GEO.desenho.googleearth.insereCirculo(pontosdistobj.xpt[n],pontosdistobj.ypt[n],dd,"","divGeometriasTemp")}if($i("parartextos")&&$i("parartextos").checked===true){i3GEO.desenho.googleearth.insereMarca(d+" km",objposicaocursor.ddx,objposicaocursor.ddy,"","divGeometriasTemp")}i3GEO.desenho.googleearth.insereLinha(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],pontosdistobj.xpt[n],pontosdistobj.ypt[n],"","divGeometriasTemp")}},movimento:function(){var n,d,r,da,pontosdistobj=i3GEO.analise.medeDistancia.googleearth.pontosdistobj,calculo=i3GEO.calculo;n=pontosdistobj.xpt.length;if(n>0){d=calculo.distancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);r=calculo.direcao(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);r=calculo.dd2dms(r,r);r=r[0];d=d*1;da=d+pontosdistobj.dist[n-1];i3GEO.analise.medeDistancia.googleearth.mostraParcial(d,da,r)}},fechaJanela:function(){temp=window.confirm($trad("x94"));if(temp){i3GEO.desenho.googleearth.removePlacemark("divGeometriasTemp")}i3GEO.eventos.removeEventos("MOUSECLIQUE",["i3GEO.analise.medeDistancia.googleearth.clique()"]);i3GEO.eventos.removeEventos("MOUSEMOVE",["i3GEO.analise.medeDistancia.movimento.googleearth()"]);i3GEO.eventos.removeEventos("NAVEGAMAPA",["i3GEO.analise.medeDistancia.fechaJanela()"])},mostraTotal:function(trecho,total){var mostra=$i("mostradistancia_calculo"),texto;if(mostra){texto="<b>"+$trad("x96")+":</b> "+total.toFixed(3)+" km"+"<br><b>"+$trad("x96")+":</b> "+(total*1000).toFixed(2)+" m"+"<br>"+$trad("x25")+": "+i3GEO.calculo.metododistancia;mostra.innerHTML=texto}},mostraParcial:function(trecho,parcial,direcao){var mostra=$i("mostradistancia_calculo_movel"),texto;if(mostra){texto="<b>"+$trad("x95")+":</b> "+trecho.toFixed(3)+" km"+"<br><b>"+$trad("x97")+":</b> "+(parcial+trecho).toFixed(3)+" km"+"<br><b>"+$trad("x23")+" (DMS):</b> "+direcao;mostra.innerHTML=texto}}}},medeArea:{pontos:{},ultimoWkt:"",ultimaMedida:"",inicia:function(){i3GEO.eventos.cliquePerm.desativa();i3GEO.analise.medeArea.criaJanela();i3GEO.analise.medeArea[i3GEO.Interface["ATUAL"]].inicia()},criaJanela:function(){var novoel,ins,imagemxy,janela;if(!$i("mostraarea")){novoel=document.createElement("div");novoel.id="mostraarea";ins='<div class="hd" >&Aacute;rea aproximada <a class=ajuda_usuario target=_blank href="'+i3GEO.configura.locaplic+'"/ajuda_usuario.php?idcategoria=6&idajuda=51" >&nbsp;&nbsp;&nbsp;</a></div>'+'<div class="bd" style="text-align:left;padding:3px;font-size:10px" >'+'<div style="text-align:left;padding:3px;font-size:10px" id="mostraarea_calculo" ></div>'+'<div style="text-align:left;padding:3px;font-size:10px" id="mostraarea_calculo_parcial" ></div>'+'<br><input id=i3GEObotaoAreaWkt size="22" type="button" value="incorporar">'+'</div>';novoel.innerHTML=ins;novoel.style.borderColor="gray";document.body.appendChild(novoel);janela=new YAHOO.widget.Panel("mostraarea",{width:"220px",fixedcenter:false,constraintoviewport:true,underlay:"none",close:true,visible:true,draggable:true,modal:false});YAHOO.i3GEO.janela.manager.register(janela);janela.render();YAHOO.util.Event.addListener(janela.close,"click",i3GEO.analise.medeArea.fechaJanela)}else{janela=YAHOO.i3GEO.janela.manager.find("mostraarea")}janela.show();imagemxy=i3GEO.util.pegaPosicaoObjeto($i(i3GEO.Interface.IDCORPO));janela.moveTo(imagemxy[0]+150,imagemxy[1]);new YAHOO.widget.Button("i3GEObotaoAreaWkt",{onclick:{fn:function(){i3GEO.mapa.dialogo.wkt2layer(i3GEO.analise.medeArea.ultimoWkt,i3GEO.analise.medeArea.ultimaMedida)}}})},fechaJanela:function(){var janela;i3GEO.eventos.cliquePerm.ativa();janela=YAHOO.i3GEO.janela.manager.find("mostraarea");if(janela){YAHOO.i3GEO.janela.manager.remove(janela);janela.destroy()}i3GEO.barraDeBotoes.ativaIcone("pointer");i3GEO.analise.medeArea[i3GEO.Interface["ATUAL"]].fechaJanela()},pontos2wkt:function(){var pontos=[],x=i3GEO.analise.medeArea.pontos.xpt,y=i3GEO.analise.medeArea.pontos.ypt,n=x.length,i;for(i=0;i<n;i++){pontos.push(x[i]+" "+y[i])}pontos.push(x[0]+" "+y[0]);return"POLYGON(("+pontos.join(",")+"))"},openlayers:{inicia:function(){var poligono,estilo=i3GEO.desenho.estilos[i3GEO.desenho.estiloPadrao],controle=i3geoOL.getControlsBy("id","i3GeoMedeArea");i3GEO.desenho[i3GEO.Interface["ATUAL"]].inicia();i3GEO.analise.medeArea.pontos={xpt:[],ypt:[],dist:[]};if(controle.length===0){poligono=new OpenLayers.Control.DrawFeature(i3GEO.desenho.layergrafico,OpenLayers.Handler.Polygon,{autoActivate:true,id:"i3GeoMedeArea",type:OpenLayers.Control.TYPE_TOOL,callbacks:{done:function(feature){var f=new OpenLayers.Feature.Vector(feature,{origem:"medeArea"},{graphicName:"square",pointRadius:10,graphicOpacity:1,fillColor:"white",fillOpacity:0.4,strokeColor:"black",strokeOpacity:1,strokeWidth:2});i3GEO.desenho.layergrafico.addFeatures([f]);if(i3GEO.Interface){i3GEO.Interface.openlayers.sobeLayersGraficos()}i3GEO.analise.medeArea.openlayers.mostraParcial(0,0,0,0);i3GEO.analise.medeArea.ultimoWkt=i3GEO.analise.medeArea.pontos2wkt();i3GEO.analise.medeArea.openlayers.inicia()},modify:function(point,poligono){var n,x1,y1,x2,y2,trecho=0,per=0,direcao=0,area=0,proj=new OpenLayers.Projection("EPSG:4326");n=i3GEO.analise.medeArea.pontos.ypt.length;if(n>1){x1=i3GEO.analise.medeArea.pontos.xpt[n-1];y1=i3GEO.analise.medeArea.pontos.ypt[n-1];x2=point.x;y2=point.y;if(i3GEO.Interface.openlayers.googleLike){temp=i3GEO.util.extOSM2Geo(x1+" "+y1+" "+x2+" "+y2);temp=temp.split(" ");x1=temp[0];y1=temp[1];x2=temp[2];y2=temp[3];proj=new OpenLayers.Projection("EPSG:900913")}trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);direcao=i3GEO.calculo.direcao(x1,y1,x2,y2);direcao=i3GEO.calculo.dd2dms(direcao,direcao);direcao=direcao[0];per=i3GEO.analise.medeArea.openlayers.somaDist();x1=i3GEO.analise.medeArea.pontos.xpt[0];y1=i3GEO.analise.medeArea.pontos.ypt[0];if(i3GEO.Interface.openlayers.googleLike){temp=i3GEO.util.extOSM2Geo(x1+" "+y1);temp=temp.split(" ");x1=temp[0];y1=temp[1]}per+=i3GEO.calculo.distancia(x1,y1,x2,y2);area=poligono.geometry.getGeodesicArea(proj);i3GEO.analise.medeArea.openlayers.mostraParcial(trecho,per,area,direcao)}},point:function(point,poligono){var n,x1,y1,x2,y2,temp,label,per=0,trecho=0,area=0,proj=new OpenLayers.Projection("EPSG:4326");i3GEO.analise.medeArea.pontos.xpt.push(point.x);i3GEO.analise.medeArea.pontos.ypt.push(point.y);n=i3GEO.analise.medeArea.pontos.ypt.length;if(n>1){x1=i3GEO.analise.medeArea.pontos.xpt[n-2];y1=i3GEO.analise.medeArea.pontos.ypt[n-2];x2=point.x;y2=point.y;if(i3GEO.Interface.openlayers.googleLike){temp=i3GEO.util.extOSM2Geo(x1+" "+y1+" "+x2+" "+y2);temp=temp.split(" ");x1=temp[0];y1=temp[1];x2=temp[2];y2=temp[3];proj=new OpenLayers.Projection("EPSG:900913")}trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);i3GEO.analise.medeArea.pontos.dist.push(trecho);per=i3GEO.analise.medeArea.openlayers.somaDist();x1=i3GEO.analise.medeArea.pontos.xpt[0];y1=i3GEO.analise.medeArea.pontos.ypt[0];if(i3GEO.Interface.openlayers.googleLike){temp=i3GEO.util.extOSM2Geo(x1+" "+y1);temp=temp.split(" ");x1=temp[0];y1=temp[1]}per+=i3GEO.calculo.distancia(x1,y1,x2,y2);label=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(point.x,point.y),{origem:"medeAreaExcluir"},{graphicName:"square",pointRadius:3,strokeColor:"black",graphicOpacity:1,strokeWidth:1,fillColor:"white",label:trecho.toFixed(3),labelAlign:"rb",fontColor:estilo.textcolor,fontSize:12,fontWeight:"bold"});i3GEO.desenho.layergrafico.addFeatures([label]);if(n>2){area=poligono.getGeodesicArea(proj)}}i3GEO.analise.medeArea.openlayers.mostraTotal(per,area)}}});i3geoOL.addControl(poligono)}},somaDist:function(){var n,i,total=0;n=i3GEO.analise.medeArea.pontos.dist.length;for(i=0;i<n;i++){total+=i3GEO.analise.medeArea.pontos.dist[i]}return total},fechaJanela:function(){var temp,controle=i3geoOL.getControlsBy("id","i3GeoMedeArea"),f=i3GEO.desenho.layergrafico.getFeaturesByAttribute("origem","medeArea");if(controle.length>0){controle[0].deactivate();i3geoOL.removeControl(controle[0])}if(f&&f.length>0){temp=window.confirm($trad("x94"));if(temp){i3GEO.desenho.layergrafico.destroyFeatures(f)}}f=i3GEO.desenho.layergrafico.getFeaturesByAttribute("origem","medeAreaExcluir");if(f&&f.length>0){i3GEO.desenho.layergrafico.destroyFeatures(f)}},mostraTotal:function(per,area){var mostra=$i("mostraarea_calculo"),texto;if(mostra){texto="<b>"+$trad("d21at")+":</b> "+(area/1000000).toFixed(3)+" km2"+"<br><b>"+$trad("d21at")+":</b> "+(area/10000).toFixed(2)+" ha"+"<br><b>"+$trad("x98")+":</b> "+(per).toFixed(2)+" km"+"<br>"+$trad("x25")+": "+i3GEO.calculo.metododistancia;mostra.innerHTML=texto;i3GEO.analise.medeArea.ultimaMedida=(area/1000000).toFixed(3)+" km2"}},mostraParcial:function(trecho,per,area,direcao){var mostra=$i("mostraarea_calculo_parcial"),texto;if(mostra){texto="<b>"+$trad("d21at")+":</b> "+(area/1000000).toFixed(3)+" km2"+"<br><b>"+$trad("d21at")+":</b> "+(area/10000).toFixed(2)+" ha"+"<br><b>"+$trad("x95")+":</b> "+trecho.toFixed(3)+" km"+"<br><b>"+$trad("x98")+":</b> "+(per).toFixed(3)+" km"+"<br><b>"+$trad("x23")+" (DMS):</b> "+direcao;mostra.innerHTML=texto}}},googlemaps:{inicia:function(){i3GEO.analise.medeArea.pontos={xpt:[],ypt:[],dist:[]};if(!google.maps.geometry){alert($trad("x99"));return}i3GEO.desenho[i3GEO.Interface["ATUAL"]].inicia();i3GeoMap.setOptions({disableDoubleClickZoom:true});i3GeoMap.setOptions({draggableCursor:'crosshair'});var evtdblclick=null,evtclick=null,evtmousemove=null,pontos={xpt:[],ypt:[],dist:[],mvcLine:new google.maps.MVCArray(),mvcMarkers:new google.maps.MVCArray(),line:null,polygon:null},termina=function(){google.maps.event.removeListener(evtdblclick);google.maps.event.removeListener(evtclick);google.maps.event.removeListener(evtmousemove);pontos.line.setOptions({clickable:true});google.maps.event.addListener(pontos.line,'click',function(shape){if(shape.setEditable){shape.setEditable(!shape.editable)}});if(pontos){i3GEO.desenho.googlemaps.shapes.push(pontos.mvcLine);i3GEO.desenho.googlemaps.shapes.push(pontos.line);pontos=null}i3GEO.analise.medeArea.ultimoWkt=i3GEO.analise.medeArea.pontos2wkt()};evtclick=google.maps.event.addListener(i3GeoMap,"click",function(evt){var area=0,per;pontos.mvcLine.push(evt.latLng);pontos.xpt.push(evt.latLng.lng());pontos.ypt.push(evt.latLng.lat());i3GEO.analise.medeArea.pontos.xpt.push(evt.latLng.lng());i3GEO.analise.medeArea.pontos.ypt.push(evt.latLng.lat());if(pontos.mvcLine.getLength()>0){per=google.maps.geometry.spherical.computeLength(pontos.mvcLine);area=google.maps.geometry.spherical.computeArea(pontos.mvcLine);i3GEO.analise.medeArea.googlemaps.mostraTotal(per,area)}i3GEO.desenho.googlemaps.shapes.push(new google.maps.Marker({map:i3GeoMap,fillOpacity:0,clickable:false,position:evt.latLng,icon:{path:google.maps.SymbolPath.CIRCLE,scale:2.5,strokeColor:"#ffffff"},origem:"medeAreaExcluir"}));pontos.mvcLine.push(evt.latLng)});evtmousemove=google.maps.event.addListener(i3GeoMap,"mousemove",function(evt){if(!$i("mostraarea_calculo")){termina.call();return}var x1,y1,x2,y2,direcao,per,area,estilo=i3GEO.desenho.estilos[i3GEO.desenho.estiloPadrao],n=pontos.xpt.length;if(pontos.mvcLine.getLength()>0){if(!pontos.line){pontos.line=new google.maps.Polygon({map:i3GeoMap,clickable:false,strokeColor:estilo.linecolor,strokeOpacity:1,strokeWeight:estilo.linewidth,path:pontos.mvcLine,origem:"medeArea"})}pontos.mvcLine.pop();pontos.mvcLine.push(evt.latLng);per=google.maps.geometry.spherical.computeLength(pontos.mvcLine);x1=pontos.xpt[n-1];y1=pontos.ypt[n-1];x2=evt.latLng.lng();y2=evt.latLng.lat();trecho=i3GEO.calculo.distancia(x1,y1,x2,y2);direcao=i3GEO.calculo.direcao(x1,y1,x2,y2);direcao=i3GEO.calculo.dd2dms(direcao,direcao);direcao=direcao[0];area=google.maps.geometry.spherical.computeArea(pontos.mvcLine);i3GEO.analise.medeArea.googlemaps.mostraParcial(trecho,per,area,direcao)}});evtdblclick=google.maps.event.addListener(i3GeoMap,"dblclick",function(evt){pontos.mvcLine.push(new google.maps.LatLng(pontos.ypt[0],pontos.xpt[0]));var per=google.maps.geometry.spherical.computeLength(pontos.mvcLine),area=google.maps.geometry.spherical.computeArea(pontos.mvcLine);i3GEO.analise.medeArea.googlemaps.mostraTotal(per,area);termina.call()})},somaDist:function(pontos){var n,i,total=0;n=pontos.dist.length;for(i=0;i<n;i++){total+=pontos.dist[i]}return total},fechaJanela:function(){i3GeoMap.setOptions({disableDoubleClickZoom:false});i3GeoMap.setOptions({draggableCursor:undefined});var f=i3GEO.desenho.googlemaps.getFeaturesByAttribute("origem","medeArea");if(f&&f.length>0){temp=window.confirm($trad("x94"));if(temp){i3GEO.desenho.googlemaps.destroyFeatures(f)}}f=i3GEO.desenho.googlemaps.getFeaturesByAttribute("origem","medeAreaExcluir");if(f&&f.length>0){i3GEO.desenho.googlemaps.destroyFeatures(f)}},mostraTotal:function(per,area){var mostra=$i("mostraarea_calculo"),texto;if(mostra){texto="<b>"+$trad("d21at")+":</b> "+(area/1000000).toFixed(3)+" km2"+"<br><b>"+$trad("d21at")+":</b> "+(area/10000).toFixed(2)+" ha"+"<br><b>"+$trad("x98")+":</b> "+(per).toFixed(2)+" km"+"<br>"+$trad("x25")+": "+i3GEO.calculo.metododistancia;mostra.innerHTML=texto;i3GEO.analise.medeArea.ultimaMedida=(area/1000000).toFixed(3)+" km2"}},mostraParcial:function(trecho,per,area,direcao){var mostra=$i("mostraarea_calculo_parcial"),texto;if(mostra){texto="<b>"+$trad("d21at")+":</b> "+(area/1000000).toFixed(3)+" km2"+"<br><b>"+$trad("d21at")+":</b> "+(area/10000).toFixed(2)+" ha"+"<br><b>"+$trad("x95")+":</b> "+trecho.toFixed(3)+" km"+"<br><b>"+$trad("x98")+":</b> "+(per).toFixed(3)+" km"+"<br><b>"+$trad("x23")+" (DMS):</b> "+direcao;mostra.innerHTML=texto}}},googleearth:{}}};