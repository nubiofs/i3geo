if(typeof(i3GEO)==='undefined'){i3GEO=[]}i3GEO.mapa={GEOXML:[],ajustaPosicao:function(elemento){if(arguments.length===0){return}var imagemxi,imagemyi,imagemxref,imagemyref,dc,c;try{imagemxi=0;imagemyi=0;imagemxref=0;imagemyref=0;dc=$i(elemento);while((dc.offsetParent)&&(dc.offsetParent.id!=="i3geo")){dc=dc.offsetParent;imagemxi=imagemxi+dc.offsetLeft;imagemyi=imagemyi+dc.offsetTop}c=$i(i3GEO.Interface.IDCORPO);if(c){c.style.position="absolute";$left(i3GEO.Interface.IDCORPO,imagemxi);$top(i3GEO.Interface.IDCORPO,imagemyi)}}catch(e){alert("Ocorreu um erro. i3GEO.mapa.ajustaPosicao"+e)}},ativaTema:function(codigo){var noArvoreCamadas=$i("arrastar_"+codigo),noAtualArvoreCamadas=$i("arrastar_"+i3GEO.temaAtivo);i3GEO.temaAtivo=codigo;if(noAtualArvoreCamadas){noAtualArvoreCamadas.style.textDecoration=""}if(noArvoreCamadas){noArvoreCamadas.style.textDecoration="underline"}},ativaLogo:function(){i3GEO.contadorAtualiza++;i3GEO.php.ativalogo(i3GEO.atualiza)},verifica:function(retorno){try{i3GEO.janela.abreAguarde("ajaxCorpoMapa",$trad("o3"));if(retorno.data){retorno=retorno.data}if(retorno.variaveis){retorno=retorno.variaveis}if((retorno==="erro")||(retorno===undefined)){i3GEO.mapa.ajustaPosicao();i3GEO.janela.fechaAguarde();i3GEO.mapa.recupera.inicia()}i3GEO.mapa.recupera.TENTATIVA=0}catch(e){if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.janela.fechaAguarde();return}if(i3GEO.mapa.recupera.TENTATIVA===0){alert("Erro no mapa. Sera feita uma tentativa de recuperacao.");i3GEO.mapa.recupera.inicia()}else{alert("Recuperacao impossivel. Sera feita uma tentativa de reiniciar o mapa.");if(i3GEO.mapa.recupera.TENTATIVA===1){i3GEO.mapa.recupera.TENTATIVA=2;i3GEO.contadorAtualiza++;i3GEO.php.reiniciaMapa(i3GEO.atualiza)}}}},inserePonto:function(){if(g_tipoacao==="inserexy"){var doc,ins,item,valoritem;doc=(navm)?document.frames("wdocai").document:$i("wdocai").contentDocument;if(doc.getElementById("resultado")){ins=doc.getElementById("resultado").innerHTML;ins=ins+"<div style='font-size:12px' >"+objposicaocursor.ddx+" "+objposicaocursor.ddy+"</div><br>";doc.getElementById("resultado").innerHTML=ins}item="";valoritem="";if((doc.getElementById("valorItem"))&&(doc.getElementById("itemtema"))){item=doc.getElementById("itemtema").value;valoritem=doc.getElementById("valorItem").value}if(g_nomepin===""){alert("Nenhum tema definido para editar")}else{i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));i3GEO.contadorAtualiza++;i3GEO.php.insereSHP(i3GEO.atualiza,g_nomepin,item,valoritem,objposicaocursor.ddx+" "+objposicaocursor.ddy)}}},recupera:{TENTATIVA:0,inicia:function(){i3GEO.mapa.ajustaPosicao();i3GEO.janela.fechaAguarde();if(i3GEO.mapa.recupera.TENTATIVA===0){i3GEO.mapa.recupera.TENTATIVA++;i3GEO.mapa.recupera.restaura()}},restaura:function(){i3GEO.php.recuperamapa(i3GEO.atualiza)}},legendaHTML:{incluiBotaoLibera:true,ID:"",cria:function(id){if(arguments.length===0){id=""}i3GEO.mapa.legendaHTML.ID=id;if(i3GEO.eventos.NAVEGAMAPA.toString().search("i3GEO.mapa.legendaHTML.atualiza()")<0){i3GEO.eventos.NAVEGAMAPA.push("i3GEO.mapa.legendaHTML.atualiza()")}i3GEO.mapa.legendaHTML.atualiza()},atualiza:function(){var temp=function(retorno){var s,ins,elementos,i;if(i3GEO.mapa.legendaHTML.ID!==""&&$i(i3GEO.mapa.legendaHTML.ID)){if((retorno.data!=="erro")&&(retorno.data!==undefined)){s=i3GEO.configura.locaplic+"/imagens/solta.gif";ins="";if(i3GEO.mapa.legendaHTML.incluiBotaoLibera===true){ins+="<img onclick='i3GEO.mapa.legendaHTML.libera()' id=soltaLeg src="+s+" title='clique para liberar'/><br>"}ins+="<div id='corpoLegi' >"+retorno.data.legenda+"</div>";$i(i3GEO.mapa.legendaHTML.ID).innerHTML=ins}}if($i("wlegenda")){$i("wlegenda").innerHTML=retorno.data.legenda;elementos=$i("wlegenda").getElementsByTagName("input");for(i=0;i<elementos.length;i++){elementos[i].style.display="none"}}};i3GEO.mapa.legendaHTML.obtem(temp)},obtem:function(funcao){i3GEO.php.criaLegendaHTML(funcao,"",i3GEO.configura.templateLegenda)},ativaDesativaTema:function(inputbox){var temp=function(){i3GEO.contadorAtualiza++;i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);i3GEO.arvoreDeCamadas.atualiza("");i3GEO.janela.fechaAguarde("redesenha")};i3GEO.janela.abreAguarde("redesenha",$trad("o1"));if(!inputbox.checked){i3GEO.php.ligatemas(temp,inputbox.value,"")}else{i3GEO.php.ligatemas(temp,"",inputbox.value)}},libera:function(){var temp=function(retorno){var novoel,temp,n,i;if(!$i("moveLegi")){novoel=document.createElement("div");novoel.id="moveLegi";novoel.style.display="block";temp='<div class="hd">Legenda</div>';temp+='<div id="wlegenda" style="text-align:left;background-color:white" ></div>';novoel.innerHTML=temp;document.body.appendChild(novoel);YAHOO.namespace("moveLegi.xp");YAHOO.moveLegi.xp.panel=new YAHOO.widget.Panel("moveLegi",{width:"300px",fixedcenter:true,constraintoviewport:false,underlay:"none",close:true,visible:true,draggable:true,modal:false,iframe:false});YAHOO.moveLegi.xp.panel.render()}$i("wlegenda").innerHTML=retorno.data.legenda;temp=$i("wlegenda").getElementsByTagName("input");n=temp.length;for(i=0;i<n;i++){temp[i].style.display="none"}YAHOO.moveLegi.xp.panel.show()};i3GEO.mapa.legendaHTML.obtem(temp)}},legendaIMAGEM:{obtem:function(funcao){i3GEO.php.criaLegendaImagem(funcao)}},dialogo:{autoredesenha:function(){if(typeof(i3GEOF.opcoesTempo)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/opcoes_autoredesenha/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesTempo.criaJanelaFlutuante()","i3GEOF.opcoesTempo_script")}},salvaMapa:function(){if(i3GEO.parametros===""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}if(typeof(i3GEOF.salvaMapa)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/salvamapa/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.salvaMapa.criaJanelaFlutuante()","i3GEOF.salvaMapa_script")}},carregaMapa:function(){if(typeof(i3GEOF.carregaMapa)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/carregamapa/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.carregaMapa.criaJanelaFlutuante()","i3GEOF.carregaMapa_script")}},convertews:function(){if(i3GEO.parametros.mapfile===""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}if(typeof(i3GEOF.converteKml)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/convertews/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.converteMapaWS.criaJanelaFlutuante()","i3GEOF.converteMapaWS_script")}},convertekml:function(){if(i3GEO.parametros.mapfile===""){alert("Essa opcao nao pode ser ativada. Consulte o administrador do sistema. Mapfile nao esta exposto.");return}if(typeof(i3GEOF.converteKml)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/convertemapakml/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.converteMapaKml.criaJanelaFlutuante()","i3GEOF.converteMapaKml_script")}},queryMap:function(){if(typeof(i3GEOF.opcoesQuery)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/opcoes_querymap/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesQuery.criaJanelaFlutuante()","i3GEOF.opcoesQuery_script")}},template:function(){i3GEO.janela.cria("300px","400px",i3GEO.configura.locaplic+"/ferramentas/template/index.htm","","","Template <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=1&idajuda=8' >&nbsp;&nbsp;&nbsp;</a>")},tamanho:function(){if(typeof(i3GEOF.opcoesTamanho)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/opcoes_tamanho/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesTamanho.criaJanelaFlutuante()","i3GEOF.opcoesTamanho_script")}},tipoimagem:function(){if(typeof(i3GEOF.tipoimagem)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/tipoimagem/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.tipoimagem.criaJanelaFlutuante()","i3GEOF.tipoimagem_script")}},corFundo:function(){if(typeof(i3GEOF.gradeCoord)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/opcoes_fundo/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesFundo.criaJanelaFlutuante()","i3GEOF.opcoesFundo_script")}},opcoesEscala:function(){if(typeof(i3GEOF.opcoesEscala)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/opcoes_escala/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesEscala.criaJanelaFlutuante()","i3GEOF.opcoesEscala_script")}},opcoesLegenda:function(){if(typeof(i3GEOF.opcoesLegenda)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/opcoes_legenda/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.opcoesLegenda.criaJanelaFlutuante()","i3GEOF.opcoesLegenda_script")}},gradeCoord:function(){if(typeof(i3GEOF.gradeCoord)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/gradecoord/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.gradeCoord.criaJanelaFlutuante()","i3GEOF.gradeCoord_script")}},cliqueTexto:function(){if(typeof(i3GEOF.inseretxt)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/inseretxt/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.inseretxt.criaJanelaFlutuante()","i3GEOF.inseretxt_script")}},cliquePonto:function(){if(g_tipoacao!=="inserexy"){g_tipoacao="inserexy";var temp,janela;temp=Math.random()+"a";temp=temp.split(".");g_nomepin="pin"+temp[1];janela=i3GEO.janela.cria("500px","300px",i3GEO.configura.locaplic+'/ferramentas/inserexy2/index.htm',"","","Insere");if(i3GEO.eventos.MOUSECLIQUE.toString().search("i3GEO.mapa.inserePonto()")<0){i3GEO.eventos.MOUSECLIQUE.push("i3GEO.mapa.inserePonto()")}temp=function(){i3GEO.eventos.MOUSECLIQUE.remove("i3GEO.mapa.inserePonto()");i3GEO.barraDeBotoes.ativaBotoes()};YAHOO.util.Event.addListener(janela[0].close,"click",temp)}},cliqueGrafico:function(){if(typeof(i3GEOF.insereGrafico)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/inseregrafico/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.insereGrafico.criaJanelaFlutuante()","i3GEOF.insereGrafico_script")}},cliqueIdentificaDefault:function(){if(g_tipoacao==="identifica"){i3GEO.eventos.MOUSEPARADO.remove("verificaTip()");if(typeof(i3GEOF.identifica)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/identifica/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.identifica.criaJanelaFlutuante()","i3GEOF.identifica_script")}else{i3GEOF.identifica.x=objposicaocursor.ddx;i3GEOF.identifica.y=objposicaocursor.ddy;i3GEOF.identifica.buscaDadosTema(i3GEO.temaAtivo);return}}},verificaTipDefault:function(){var ntemas,etiquetas,j,retorna;ntemas=i3GEO.arvoreDeCamadas.CAMADAS.length;etiquetas=false;for(j=0;j<ntemas;j++){if(i3GEO.arvoreDeCamadas.CAMADAS[j].etiquetas!==""){etiquetas=true}}if(etiquetas===false){return}if(i3GEO.Interface.ATUAL==="padrao"){$i("img").style.cursor="wait"}retorna=function(retorno){var temp,rfes,n,balloon,i,mostra,res,temas,ntemas,titulo,tips,j,ntips,ins,r,ds,nds,s;i=$i("i3geo_rosa");if(i){i.style.display="none"}mostra=false;try{retorno=retorno.data;if(retorno!==""){res="";temas=retorno;ntemas=temas.length;for(j=0;j<ntemas;j++){titulo=temas[j].nome;if(i3GEO.configura.tipotip==="completo"||i3GEO.configura.tipotip==="balao"){titulo="<span style='text-decoration:underline;text-align:left;font-size:9pt'><b>"+titulo+"</b></span><br>"}else{titulo=""}tips=(temas[j].resultado.tips).split(",");ntips=tips.length;ins="";for(r=0;r<ntips;r++){ds=temas[j].resultado.dados;if(ds!==" "){nds=ds.length;for(s=0;s<nds;s++){eval("var alias = ds[s]."+tips[r]+".alias");eval("var valor = ds[s]."+tips[r]+".valor");eval("var link = ds[s]."+tips[r]+".link");eval("var img = ds[s]."+tips[r]+".img");if(i3GEO.configura.tipotip==="completo"||i3GEO.configura.tipotip==="balao"){if(valor!==""&&link===""){ins+="<span class='tiptexto' style='text-align:left;font-size:8pt'>"+alias+" :"+valor+"</span><br>"}if(valor!==""&&link!==""){ins+="<span class='tiptexto' style='text-align:left;font-size:8pt'>"+alias+" : <a style='color:blue;cursor:pointer' target=_blanck href='"+link+"' >"+valor+"</a></span><br>"}if(img!==""){ins+=img+"<br>"}mostra=true}else{ins+="<span class='tiptexto' style='text-align:left;font-size:8pt'>"+valor+"</span><br>";mostra=true}}}}if(ins!==""){res=res+titulo+ins}}if(!mostra){if($i("tip")){$i("tip").style.display="none"}return}else{if(i3GEO.configura.tipotip!=="balao"){n=i3GEO.janela.tip();$i(n).style.textAlign="left";$i(n).innerHTML+=res}else{i3GEO.util.criaPin('marcaIdentifica',i3GEO.configura.locaplic+"/imagens/grabber.gif","12px","12px");i3GEO.util.posicionaImagemNoMapa("marcaIdentifica");balloon=new Balloon();balloon.delayTime=0;res="<div style=text-align:left >"+res+"</div>";balloon.showTooltip($i("marcaIdentifica"),res);$i('marcaIdentifica').onclick=$i("closeButton").onclick}}}if(i3GEO.Interface.ATUAL==="padrao"){temp="zoom";if(i3GEO.Interface.ATIVAMENUCONTEXTO){temp="identifica_contexto"}i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,"img",i3GEO.configura.locaplic)}}catch(e){if(i3GEO.Interface.ATUAL==="padrao"){temp="identifica";if(i3GEO.Interface.ATIVAMENUCONTEXTO){temp="identifica_contexto"}i3GEO.util.mudaCursor(i3GEO.configura.cursores,temp,"img",i3GEO.configura.locaplic)}}};i3GEO.php.identifica2(retorna,objposicaocursor.ddx,objposicaocursor.ddy,"5")}}};