if(typeof(i3GEO)==='undefined'){i3GEO=[]}navm=false;navn=false;var app=navigator.appName.substring(0,1);if(app==='N'){navn=true}else{navm=true}g_operacao="";g_tipoacao="zoomli";g_postpx="px";g_tipotop="top";g_tipoleft="left";if(navm){g_postpx="";g_tipotop="pixelTop";g_tipoleft="pixelLeft"}$i=function(id){return document.getElementById(id)};Array.prototype.remove=function(s){try{var i=this.indexOf(s);if(i!==-1){this.splice(i,1)}}catch(e){}};i3GEO.util={PINS:[],BOXES:[],escapeURL:function(sUrl){var re;sUrl=escape(sUrl);re=new RegExp("%3F","g");sUrl=sUrl.replace(re,'?');re=new RegExp("%3D","g");sUrl=sUrl.replace(re,'=');re=new RegExp("%26","g");sUrl=sUrl.replace(re,'&');return sUrl},insereCookie:function(nome,valor){document.cookie=nome+"="+valor+";path=/"},pegaCookie:function(nome){var cookies,i,fim;cookies=document.cookie;i=cookies.indexOf(nome);if(i===-1){return null}fim=cookies.indexOf(";",i);if(fim===-1){fim=cookies.length}return(unescape(cookies.substring(i,fim))).split("=")[1]},listaChaves:function(obj){var keys,key;keys=[];for(key in obj){if(obj[key]){keys.push(key)}}return keys},criaBotaoAplicar:function(nomeFuncao,titulo,classe,obj){try{clearTimeout(tempoBotaoAplicar)}catch(e){}var novoel,xy;tempoBotaoAplicar=eval("setTimeout('"+nomeFuncao+"\(\)',(i3GEO.configura.tempoAplicar))");autoRedesenho("reinicia");if(arguments.length===1){titulo="Aplicar"}if(arguments.length===1||arguments.length===2){classe="i3geoBotaoAplicar"}if(!document.getElementById("i3geo_aplicar")){novoel=document.createElement("input");novoel.id='i3geo_aplicar';novoel.type='button';novoel.value=titulo;novoel.style.cursor="pointer";novoel.style.fontSize="10px";novoel.style.zIndex=15000;novoel.style.position="absolute";novoel.style.display="none";novoel.onmouseover=function(){this.style.display="block"};novoel.onmouseout=function(){this.style.display="none"};novoel.className=classe;document.body.appendChild(novoel)}else{novoel=document.getElementById("i3geo_aplicar")}novoel.onclick=function(){clearTimeout(i3GEO.parametros.tempo);i3GEO.parametros.tempo="";this.style.display='none';eval(nomeFuncao+"\(\)")};if(arguments.length===4){novoel.style.display="block";xy=YAHOO.util.Dom.getXY(obj);YAHOO.util.Dom.setXY(novoel,xy)}return(novoel)},arvore:function(titulo,onde,obj){var arvore,root,tempNode,currentIconMode,d,c,i,linha,conteudo;if(!$i(onde)){return}try{arvore=new YAHOO.widget.TreeView(onde);root=arvore.getRoot();tempNode=new YAHOO.widget.TextNode('',root,false);tempNode.isLeaf=false;tempNode.enableHighlight=false}catch(e){}titulo="<table><tr><td><b>"+titulo+"</b></td><td></td></tr></table>";d={html:titulo};tempNode=new YAHOO.widget.HTMLNode(d,root,true,true);tempNode.enableHighlight=false;c=obj.propriedades.length;for(i=0,j=c;i<j;i++){linha=obj.propriedades[i];conteudo="<a href='#' onclick='"+linha.url+"'>"+$trad(linha.text)+"</a>";d={html:conteudo};temaNode=new YAHOO.widget.HTMLNode(d,tempNode,false,true);temaNode.enableHighlight=false}arvore.collapseAll();arvore.draw()},removeAcentos:function(palavra){var re;re=/�|�|�|�/gi;palavra=palavra.replace(re,"a");re=/�/gi;palavra=palavra.replace(re,"e");re=/�/gi;palavra=palavra.replace(re,"i");re=/�|�/gi;palavra=palavra.replace(re,"o");re=/�/gi;palavra=palavra.replace(re,"c");re=/�/gi;palavra=palavra.replace(re,"u");return(palavra)},protocolo:function(){var u=window.location.href;u=u.split(":");return(u[0])},pegaPosicaoObjeto:function(obj){if(obj){if(!obj.style){return[0,0]}if(obj.style.position==="absolute"){return[(parseInt(obj.style.left,10)),(parseInt(obj.style.top,10))]}else{var curleft=0,curtop=0;if(obj){if(obj.offsetParent){do{curleft+=obj.offsetLeft-obj.scrollLeft;curtop+=obj.offsetTop-obj.scrollTop}while(obj=obj.offsetParent)}}return[curleft+document.body.scrollLeft,curtop+document.body.scrollTop]}}else{return[0,0]}},pegaElementoPai:function(e){var targ;if(!e){e=window.event}if(e.target){targ=e.target}else if(e.srcElement){targ=e.srcElement}if(targ.nodeType===3){targ=targ.parentNode}tparent=targ.parentNode;return(tparent)},mudaCursor:function(cursores,tipo,idobjeto,locaplic){var o,c;o=document.getElementById(idobjeto);c=eval("cursores."+tipo+".ie");if(c==="default"||c==="pointer"||c==="crosshair"||c==="help"||c==="move"||c==="text"){o.style.cursor=c}else{if(o){if(navm){o.style.cursor="URL(\""+locaplic+eval("cursores."+tipo+".ie")+"\"),auto"}else{o.style.cursor="URL(\""+locaplic+eval("cursores."+tipo+".ff")+"\"),auto"}}}},criaBox:function(id){if(arguments.length===0){id="boxg"}if(!$i(id)){var novoel=document.createElement("div");novoel.id=id;novoel.style.zIndex=1;novoel.innerHTML='<font face="Arial" size=0></font>';document.body.appendChild(novoel);novoel.onmouseover=function(){novoel.style.display='none'};novoel.onmouseout=function(){novoel.style.display='block'};i3GEO.util.BOXES.push(id)}else{$i(id).style.display="block"}},escondeBox:function(){var l,i;l=i3GEO.util.BOXES.length;for(i=0;i<l;i++){if($i(i3GEO.util.BOXES[i])){$i(i3GEO.util.BOXES[i]).style.display="none"}}},criaPin:function(id,imagem,w,h){if(arguments.length<1||id===""){id="boxpin"}if(arguments.length<2||imagem===""){imagem=i3GEO.configura.locaplic+'/imagens/marker.png'}if(arguments.length<3||w===""){w="21px"}if(arguments.length<4||h===""){h="25px"}if(!$i(id)){var novoel=document.createElement("img");novoel.id=id;novoel.style.zIndex=10000;novoel.style.position="absolute";novoel.style.width=w;novoel.style.height=h;novoel.src=imagem;if(id==="boxpin"){novoel.onmouseover=function(){$i("boxpin").style.display="none"}}document.body.appendChild(novoel);i3GEO.util.PINS.push(id)}},posicionaImagemNoMapa:function(id){var i,mx,my;i=$i(id);mx=parseInt(i.style.width,10)/2;my=parseInt(i.style.height,10)/2;i.style.position="absolute";i.style.top=objposicaocursor.telay-my;i.style.left=objposicaocursor.telax-mx},escondePin:function(){var l,i;l=i3GEO.util.PINS.length;for(i=0;i<l;i++){if($i(i3GEO.util.PINS[i])){$i(i3GEO.util.PINS[i]).style.display="none"}}},$im:function(g){return i3GEO.configura.locaplic+"/imagens/visual/"+i3GEO.configura.visual+"/"+g},$inputText:function(idPai,larguraIdPai,idInput,titulo,digitos,valor,nome){if(arguments.length===6){nome=""}if(idPai!==""){if(larguraIdPai!==""){$i(idPai).style.width=larguraIdPai+"px"}$i(idPai).style.padding="3";$i(idPai).style.textAlign="center";$i(idPai).onmouseover=function(){this.className="digitarMouseover"};$i(idPai).onmouseout=function(){this.className=""}}return"<input tabindex='0' onmouseover='javascript:this.className=\"digitarOver\";' onmouseout='javascript:this.className=\"digitar\";' onclick='javascript:this.select();this.className=\"digitarMouseclick\";' id='"+idInput+"' title='"+titulo+"' type='text' size='"+digitos+"' class='digitar' value='"+valor+"' name='"+nome+"' />"},$inputTextMudaCor:function(obj){var n=obj.value.split(" ");obj.style.color="rgb("+n[0]+","+n[1]+","+n[2]+")"},$top:function(id,valor){if(document.getElementById(id).style){if(document.getElementById(id).style.pixelTop){document.getElementById(id).style.pixelTop=valor}else{document.getElementById(id).style.top=valor+"px"}}},$left:function(id,valor){if(document.getElementById(id).style){if(document.getElementById(id).style.pixelLeft){document.getElementById(id).style.pixelLeft=valor}else{document.getElementById(id).style.left=valor+"px"}}},insereMarca:{CONTAINER:[],cria:function(xi,yi,funcaoOnclick,container){try{var novoel,i,novoimg,temp;if(i3GEO.util.insereMarca.CONTAINER.toString().search(container)<0){i3GEO.util.insereMarca.CONTAINER.push(container)}if(!$i(container)){novoel=document.createElement("div");novoel.id=container;i=novoel.style;i.position="absolute";i.top=parseInt($i(i3GEO.Interface.IDCORPO).style.top,10);i.left=parseInt($i(i3GEO.Interface.IDCORPO).style.left,10);document.body.appendChild(novoel)}container=$i(container);novoel=document.createElement("div");i=novoel.style;i.position="absolute";i.zIndex=2000;i.top=(yi-4)+"px";i.left=(xi-4)+"px";i.width="4px";i.height="4px";novoimg=document.createElement("img");if(funcaoOnclick!==""){novoimg.onclick=funcaoOnclick}else{novoimg.onclick=function(){i3GEO.util.insereMarca.limpa()}}novoimg.src=i3GEO.configura.locaplic+"/imagens/dot1.gif";temp=novoimg.style;temp.width="6px";temp.height="6px";temp.zIndex=2000;novoel.appendChild(novoimg);container.appendChild(novoel);if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.util.insereMarca.limpa()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.util.insereMarca.limpa()")}}catch(e){alert("Ocorreu um erro. inseremarca"+e)}},limpa:function(){try{var n,i;n=i3GEO.util.insereMarca.CONTAINER.length;for(i=0;i<n;i++){if($i(i3GEO.util.insereMarca.CONTAINER[i])){$i(i3GEO.util.insereMarca.CONTAINER[i]).innerHTML=""}}i3GEO.util.insereMarca.CONTAINER=[];i3GEO.eventos.NAVEGAMAPA.remove("i3GEO.util.insereMarca.limpa()")}catch(e){}}},adicionaSHP:function(path){i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));var temp=path.split(".");i3GEO.contadorAtualiza++;if((temp[1]==="SHP")||(temp[1]==="shp")){i3GEO.php.adicionaTemaSHP(i3GEO.atualiza,path)}else{i3GEO.php.adicionaTemaIMG(i3GEO.atualiza,path)}},abreCor:function(janela,elemento){var ins,temp,novoel,wdocaiframe,fix=false,wlargura="400",waltura="240",wsrc=i3GEO.configura.locaplic+"/ferramentas/colorpicker/index.htm?doc="+janela+"&elemento="+elemento,nx="",ny="",texto="Cor",id="i3geo_janelaCor",modal=true,classe="hd",wlargura_="400px";YAHOO.namespace("janelaCor.xp");if($i(id)){YAHOO.janelaCor.xp.panel.destroy()}ins='<div id="'+id+'_cabecalho" class="hd">';ins+="<span><img id='i3geo_janelaCor_imagemCabecalho' style='visibility:hidden;' src=\'"+i3GEO.configura.locaplic+"/imagens/aguarde.gif\' /></span>";ins+=texto;ins+='</div><div id="i3geo_janelaCor_corpo" class="bd" style="padding:5px">';if(wsrc!==""){ins+='<iframe name="'+id+'i" id="i3geo_janelaCori" valign="top" style="border:0px white solid"></iframe>'}ins+='</div>';novoel=document.createElement("div");novoel.id="i3geo_janelaCor";novoel.style.display="block";novoel.innerHTML=ins;if($i("i3geo")){$i("i3geo").appendChild(novoel)}else{document.body.appendChild(novoel)}wdocaiframe=$i("i3geo_janelaCori");if(wdocaiframe){temp=wdocaiframe.style;temp.width=parseInt(wlargura,10)-12;temp.height=waltura;wdocaiframe.style.display="block";wdocaiframe.src=wsrc}if(nx===""||nx==="center"){fix=true}YAHOO.janelaCor.xp.panel=new YAHOO.widget.ResizePanel(id,{zIndex:5000,modal:modal,width:wlargura_,fixedcenter:fix,constraintoviewport:false,visible:true,iframe:false});YAHOO.janelaCor.xp.panel.render();$i(id+'_cabecalho').className=classe},ajaxhttp:function(){var objhttp1;try{objhttp1=new XMLHttpRequest()}catch(ee){try{objhttp1=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{objhttp1=new ActiveXObject("Microsoft.XMLHTTP")}catch(E){objhttp1=false}}}return(objhttp1)},ajaxexecASXml:function(programa,funcao){var h,ohttp,retorno;if(programa.search("http")===0){h=window.location.host;if(programa.search(h)<0){alert("OOps! Nao e possivel chamar um XML de outro host.\nContacte o administrador do sistema.\nConfigure corretamente o ms_configura.php");return}}ohttp=i3GEO.util.ajaxhttp();ohttp.open("GET",programa,true);retorno="";ohttp.onreadystatechange=function(){var retorno,parser,dom;if(ohttp.readyState===4){retorno=ohttp.responseText;if(retorno!==undefined){if(document.implementation.createDocument){parser=new DOMParser();dom=parser.parseFromString(retorno,"text/xml")}else{dom=new ActiveXObject("Microsoft.XMLDOM");dom.async="false";dom.load(programa)}}else{dom="erro"}if(funcao!=="volta"){eval(funcao+'(dom)')}else{return dom}}};ohttp.send(null)},aparece:function(id,tempo,intervalo){var n,obj,opacidade,fadei,tempoFadei;n=parseInt(tempo/intervalo,10);obj=$i(id);if(n===1){obj.style.display="block";if(navm){obj.style.filter='alpha(opacity=100)'}else{obj.style.opacity=1}}tempo=n*intervalo;intervalo=(intervalo*100)/tempo;opacidade=0;if(navm){obj.style.filter='alpha(opacity=0)'}else{obj.style.opacity=0}obj.style.display="block";fadei=function(){opacidade+=intervalo;if(navm){obj.style.filter='alpha(opacity='+opacidade+')'}else{obj.style.opacity=opacidade/100}if(opacidade<100){tempoFadei=setTimeout(fadei,tempo)}else{clearTimeout(tempoFadei);if(navm){obj.style.filter='alpha(opacity=100)'}else{obj.style.opacity=1}}};tempoFadei=setTimeout(fadei,tempo)},desaparece:function(id,tempo,intervalo,removeobj){var n,obj,opacidade,fade,p,tempoFade;n=parseInt(tempo/intervalo,10);obj=$i(id);if(n===1){obj.style.display="none";if(removeobj){p=obj.parentNode;if(p){p.removeChild(obj)}}return}tempo=n*intervalo;intervalo=(intervalo*100)/tempo;opacidade=100;if(navm){obj.style.filter='alpha(opacity=100)'}else{obj.style.opacity=1}obj.style.display="block";fade=function(){opacidade-=intervalo;if(navm){obj.style.filter='alpha(opacity='+opacidade+')'}else{obj.style.opacity=opacidade/100}if(opacidade>0){tempoFade=setTimeout(fade,tempo)}else{clearTimeout(tempoFade);obj.style.display="none";if(navm){obj.style.filter='alpha(opacity=100)'}else{obj.style.opacity=1}if(removeobj){p=obj.parentNode;if(p){p.removeChild(obj)}}}};tempoFade=setTimeout(fade,tempo)},wkt2ext:function(wkt,tipo){var re,x,y,w,xMin,xMax,yMin,yMax,temp;tipo=tipo.toLowerCase();ext=false;if(tipo==="polygon"){try{re=new RegExp("POLYGON","g");wkt=wkt.replace(re,"");wkt=wkt.split("(")[2].split(")")[0];wkt=wkt.split(",");x=[];y=[];for(w=0;w<wkt.length;w++){temp=wkt[w].split(" ");x.push(temp[0]);y.push(temp[1])}x.sort(i3GEO.util.sortNumber);xMin=x[0];xMax=x[(x.length)-1];y.sort(i3GEO.util.sortNumber);yMin=y[0];yMax=y[(y.length)-1];return xMin+" "+yMin+" "+xMax+" "+yMax}catch(e){}}return ext},sortNumber:function(a,b){return a-b},getScrollerWidth:function(){var scr=null,inn=null,wNoScroll=0,wScroll=0;scr=document.createElement('div');scr.style.position='absolute';scr.style.top='-1000px';scr.style.left='-1000px';scr.style.width='100px';scr.style.height='50px';scr.style.overflow='hidden';inn=document.createElement('div');inn.style.width='100%';inn.style.height='200px';scr.appendChild(inn);document.body.appendChild(scr);wNoScroll=inn.offsetWidth;scr.style.overflow='auto';wScroll=inn.offsetWidth;document.body.removeChild(document.body.lastChild);return(wNoScroll-wScroll)},scriptTag:function(js,ini,id){var head,script;if(id===""){id="loadscriptI3GEO"}head=document.getElementsByTagName('head')[0];script=document.createElement('script');script.type='text/javascript';if(navm){script.onreadystatechange=function(){if(this.readyState==='loaded'||this.readyState==='complete'){eval(ini)}}}else{script.onload=function(){eval(ini)}}script.src=js;script.id=id;head.appendChild(script)},mensagemAjuda:function(onde,texto){var ins="<table style='width:100%;padding:2;vertical-align:top;background-color:#ffffff;' ><tr><th style='background-color: #cedff2; font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 8pt; border: 1px solid #B1CDEB; text-align: left; padding-left: 7px;padding-right: 11px;'>";ins+='<div style="float:right"><img src="'+i3GEO.configura.locaplic+'/imagens/question.gif" /></div>';ins+='<div style="text-align:left;">';if(texto===""){texto=$i(onde).innerHTML}ins+=texto;ins+='</div></th></tr></table>';if(onde!==""){$i(onde).innerHTML=ins}else{return(ins)}},randomRGB:function(){var v=Math.random(),r=parseInt(255*v,10),g;v=Math.random();g=parseInt(255*v,10);v=Math.random();b=parseInt(255*v,10);return(r+","+g+","+b)},comboTemas:function(id,funcao,onde,nome,multiplo,tipoCombo){if(arguments.length>2){$i(onde).innerHTML="<span style=color:red;font-size:10px; >buscando temas...</span>"}if(arguments.length===3){nome=""}if(arguments.length<5){multiplo=false}var monta,lista,temp;monta=function(retorno){var i,comboTemas,temp,n,nome;if(retorno!==undefined){if(retorno.data){retorno=retorno.data}n=retorno.length;if(n>0){if(multiplo){comboTemas="<select 'style=font-size:12px;' id='"+id+"' size='4' multiple='multiple' name='"+nome+"'>"}else{comboTemas="<select 'style=font-size:12px;' id='"+id+"' name='"+nome+"'>"}comboTemas+="<option value=''>----</option>";for(i=0;i<n;i++){if(retorno[i].nome){nome=retorno[i].nome;tema=retorno[i].tema}else{nome=retorno[i].tema;tema=retorno[i].name}comboTemas+="<option value="+tema+" >"+nome+"</option>"}comboTemas+="</select>";temp={dados:comboTemas,tipo:"dados"}}else{temp={dados:'<div class=alerta >Nenhum tema encontrado.</div>',tipo:"mensagem"}}}else{temp={dados:"<p style=color:red >Ocorreu um erro<br>",tipo:"erro"}}eval("funcao(temp);")};if(tipoCombo==="ligados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("status",2,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{i3GEO.php.listaTemas(monta,"ligados",i3GEO.configura.locaplic,i3GEO.configura.sid)}}if(tipoCombo==="editaveis"){i3GEO.php.listaTemasEditaveis(monta,i3GEO.configura.locaplic,i3GEO.configura.sid)}if(tipoCombo==="selecionados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("sel","sim","igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{i3GEO.php.listaTemasComSel(monta,i3GEO.configura.locaplic,i3GEO.configura.sid)}}if(tipoCombo==="raster"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("type",3,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{i3GEO.php.listatemasTipo(monta,"raster",i3GEO.configura.locaplic,i3GEO.configura.sid)}}if(tipoCombo==="pontosSelecionados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){temp=i3GEO.arvoreDeCamadas.filtraCamadas("type",0,"igual",i3GEO.arvoreDeCamadas.CAMADAS);monta(i3GEO.arvoreDeCamadas.filtraCamadas("sel","sim","igual",temp))}else{alert("Arvore de camadas n�o encontrada")}}if(tipoCombo==="pontos"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("type",0,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{alert("Arvore de camadas n�o encontrada")}}if(tipoCombo==="poligonos"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("type",2,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{alert("Arvore de camadas n�o encontrada")}}if(tipoCombo==="poligonosSelecionados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){temp=i3GEO.arvoreDeCamadas.filtraCamadas("type",2,"igual",i3GEO.arvoreDeCamadas.CAMADAS);monta(i3GEO.arvoreDeCamadas.filtraCamadas("sel","sim","igual",temp))}else{alert("Arvore de camadas n�o encontrada")}}},checkTemas:function(id,funcao,onde,nome,tipoLista,prefixo,size){if(arguments.length>2){$i(onde).innerHTML="<span style=color:red;font-size:10px; >buscando temas...</span>"}if(arguments.length===3){nome=""}var monta,lista,temp,temp1,n,i;monta=function(retorno){try{var i,comboTemas,temp,n,nome;if(retorno!==undefined){if(retorno.data){retorno=retorno.data}n=retorno.length;if(n>0){comboTemas="<table class=lista3 >";for(i=0;i<n;i++){if(retorno[i].nome){nome=retorno[i].nome;tema=retorno[i].tema}else{nome=retorno[i].tema;tema=retorno[i].name}comboTemas+="<tr><td><input size=2 style='cursor:pointer' type=checkbox name='"+tema+"' /></td>";comboTemas+="<td>&nbsp;<input style='text-align:left; cursor:text;' onclick='javascript:this.select();' id='"+prefixo+tema+"' type=text size='"+size+"' value='"+nome+"' /></td></tr>"}comboTemas+="</table>";temp={dados:comboTemas,tipo:"dados"}}else{temp={dados:'<div class=alerta >Nenhum tema encontrado.</div>',tipo:"mensagem"}}}else{temp={dados:"<p style=color:red >Ocorreu um erro<br>",tipo:"erro"}}eval("funcao(temp);")}catch(e){alert(e)}};if(tipoLista==="ligados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("status",2,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{i3GEO.php.listaTemas(monta,"ligados",i3GEO.configura.locaplic,i3GEO.configura.sid)}}if(tipoLista==="selecionados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("sel","sim","igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{i3GEO.php.listaTemasComSel(monta,i3GEO.configura.locaplic,i3GEO.configura.sid)}}if(tipoLista==="raster"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("type",3,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{i3GEO.php.listatemasTipo(monta,"raster",i3GEO.configura.locaplic,i3GEO.configura.sid)}}if(tipoLista==="polraster"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){temp=i3GEO.arvoreDeCamadas.filtraCamadas("type",3,"igual",i3GEO.arvoreDeCamadas.CAMADAS);temp1=i3GEO.arvoreDeCamadas.filtraCamadas("type",2,"igual",i3GEO.arvoreDeCamadas.CAMADAS);n=temp1.length;for(i=0;i<n;i++){temp.push(temp1[i])}monta(temp)}else{alert("Arvore de camadas n�o encontrada")}}if(tipoLista==="pontosSelecionados"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){temp=i3GEO.arvoreDeCamadas.filtraCamadas("type",0,"igual",i3GEO.arvoreDeCamadas.CAMADAS);monta(i3GEO.arvoreDeCamadas.filtraCamadas("sel","sim","igual",temp))}else{alert("Arvore de camadas n�o encontrada")}}if(tipoLista==="pontos"){if(i3GEO.arvoreDeCamadas.CAMADAS!==""){monta(i3GEO.arvoreDeCamadas.filtraCamadas("type",0,"igual",i3GEO.arvoreDeCamadas.CAMADAS))}else{alert("Arvore de camadas n�o encontrada")}}},comboItens:function(id,tema,funcao,onde,nome){if(arguments.length>3){$i(onde).innerHTML="<span style=color:red;font-size:10px; >buscando itens...</span>"}if(arguments.length!==5){nome=""}var monta=function(retorno){var ins,temp,i;if(retorno.data!==undefined){ins=[];ins.push("<select  id='"+id+"' name='"+nome+"'>");ins.push("<option value='' >---</option>");temp=retorno.data.valores.length;for(i=0;i<temp;i++){if(retorno.data.valores[i].tema===tema){ins.push("<option value='"+retorno.data.valores[i].item+"' >"+retorno.data.valores[i].item+"</option>")}}ins.push("</select>");ins=ins.join('');temp={dados:ins,tipo:"dados"}}else{temp={dados:'<div class=erro >Ocorreu um erro</div>',tipo:"erro"}}eval("funcao(temp)")};i3GEO.php.listaItensTema(monta,tema)},comboValoresItem:function(id,tema,itemTema,funcao,onde){if(arguments.length==5){$i(onde).innerHTML="<span style=color:red;font-size:10px; >buscando valores...</span>"}var monta=function(retorno){var ins=[],i,pares,j,temp;if(retorno.data!=undefined){ins.push("<select  id="+id+" >");ins.push("<option value='' >---</option>");for(i=0;i<retorno.data[1].registros.length;i++){pares=retorno.data[1].registros[i].valores;for(j=0;j<pares.length;j++){ins.push("<option value='"+pares[j].valor+"' >"+pares[j].valor+"</option>")}}ins.push("</select>");ins=ins.join('');temp={dados:ins,tipo:"dados"}}else{temp={dados:'<div class=erro >Ocorreu um erro</erro>',tipo:"erro"}}eval("funcao(temp)")};i3GEO.php.listaValoresItensTema(monta,tema,itemTema);cp=new cpaint();cp.set_response_type("JSON");cp.call(g_locaplic+"/classesphp/mapa_controle.php?g_sid="+g_sid+"&funcao=listaregistros&unico=sim&tema="+tema+"&itemtema="+itemTema,"listaRegistros",monta)},comboFontes:function(id,onde){$i(onde).innerHTML="<span style=color:red >buscando fontes...</span>";var monta=function(retorno){var ins="",temp,i,dados;if(retorno.data!==undefined){ins+="<select  id='"+id+"'>";ins+="<option value='bitmap' >bitmap</option>";dados=retorno.data.split(",");temp=dados.length;for(i=0;i<temp;i++){ins+="<option value='"+dados[i]+"' >"+dados[i]+"</option>"}ins+="</select>"}$i(onde).innerHTML=ins};i3GEO.php.listaFontesTexto(monta)},comboSimNao:function(id,selecionado){var combo="<select name="+id+" id="+id+" >";combo+="<option value='' >---</option>";if(selecionado==="sim"){combo+="<option value=TRUE selected >sim</option>"}else{combo+="<option value=TRUE >sim</option>"}if(selecionado==="nao"){combo+="<option value=FALSE selected >n�o</option>"}else{combo+="<option value=FALSE >n�o</option>"}combo+="</select>";return(combo)},checkItensEditaveis:function(tema,funcao,onde,size,prefixo){if(onde!==""){$i(onde).innerHTML="<span style=color:red;font-size:10px; >buscando itens...</span>"}var monta=function(retorno){var ins=[],i,temp,n;if(retorno.data!==undefined){ins.push("<table class=lista3 >");n=retorno.data.valores.length;for(i=0;i<n;i++){ins.push("<tr><td><input size=2 style='cursor:pointer' name='"+retorno.data.valores[i].tema+"' type=checkbox id='"+prefixo+retorno.data.valores[i].item+"' /></td>");ins.push("<td><input style='text-align:left; cursor:text;' onclick='javascript:this.select();' id='"+prefixo+retorno.data.valores[i].item+retorno.data.valores[i].tema+"' type=text size='"+size+"' value='"+retorno.data.valores[i].item+"' /></td></tr>")}ins.push("</table>");ins=ins.join('');temp={dados:ins,tipo:"dados"}}else{temp={dados:'<div class=erro >Ocorreu um erro</div>',tipo:"erro"}}eval("funcao(temp)")};i3GEO.php.listaItensTema(monta,tema)},radioEpsg:function(funcao,onde,prefixo){if(arguments.length===2){$i(onde).innerHTML="<span style=color:red;font-size:10px; >buscando...</span>"}var cp,monta=function(retorno){var ins=new Array(),i,n,temp;if(retorno.data!==undefined){ins.push("<table class=lista2 >");ins.push("<tr><td><input size=2 style='cursor:pointer' name='"+prefixo+"EPSG' type=radio checked value='' /></td>");ins.push("<td>"+retorno.data[0].nome+"</td></tr>");n=retorno.data.length;for(i=1;i<n;i++){ins.push("<tr><td><input size=2 style='cursor:pointer' name='"+prefixo+"EPSG' type=radio value='"+retorno.data[i].codigo+"' /></td>");ins.push("<td>"+retorno.data[i].nome+"</td></tr>")}ins.push("</table>");ins=ins.join('');temp={dados:ins,tipo:"dados"}}else{temp={dados:'<div class=erro >Ocorreu um erro</erro>',tipo:"erro"}}eval("funcao(temp)")};i3GEO.php.listaEpsg(monta)},proximoAnterior:function(anterior,proxima,texto,idatual,container){var temp=$i(idatual),ndiv=document.createElement("div"),nids,i,fundo;if(temp){$i(container).removeChild(temp)}if(!document.getElementById(idatual)){fundo=$i(container).style.backgroundColor;ndiv.id=idatual;texto+="<br><br><table style='width:100%;background-color:"+fundo+";' ><tr style='width:100%'>";if(anterior!==""){texto+="<td style='border:0px solid white;text-align:left;cursor:pointer;background-color:"+fundo+";'><input id='"+idatual+"anterior_' onclick='"+anterior+"' type='button' value='&nbsp;&nbsp;' /></td>"}if(proxima!==""){texto+="<td style='border:0px solid white;text-align:right;cursor:pointer;background-color:"+fundo+";'><input id='"+idatual+"proxima_' onclick='"+proxima+"' type='button' value='&nbsp;&nbsp;' /></td>"}ndiv.innerHTML=texto+"</tr></table>";$i(container).appendChild(ndiv);new YAHOO.widget.Button(idatual+"anterior_",{onclick:{fn:function(){eval(anterior+"()")},lazyloadmenu:true}});new YAHOO.widget.Button(idatual+"proxima_",{onclick:{fn:function(){eval(proxima+"()")},lazyloadmenu:true}});i=$i(idatual+"proxima_-button");if(i){i.style.backgroundImage="url('"+i3GEO.configura.locaplic+"/imagens/player_avanca.png')";i.style.backgroundRepeat="no-repeat";i.style.backgroundPosition="center center"}i=$i(idatual+"anterior_-button");if(i){i.style.backgroundImage="url('"+i3GEO.configura.locaplic+"/imagens/player_volta.png')";i.style.backgroundRepeat="no-repeat";i.style.backgroundPosition="center center"}}temp=$i(container).getElementsByTagName("div");nids=temp.length;for(i=0;i<nids;i++){temp[i].style.display="none"}$i(idatual).style.display="block"}};$im=function(g){return i3GEO.util.$im(g)};$inputText=function(idPai,larguraIdPai,idInput,titulo,digitos,valor,nome){if(arguments.length===6){nome=""}return i3GEO.util.$inputText(idPai,larguraIdPai,idInput,titulo,digitos,valor,nome)};$top=function(id,valor){i3GEO.util.$top(id,valor)};$left=function(id,valor){i3GEO.util.$left(id,valor)};