if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.tema={TEMPORIZADORESID:{},ativaFerramentas:function(camada){if(camada.ferramentas&&camada.ferramentas!=""){var f=camada.ferramentas;if(f.tme&&f.tme.auto&&f.tme.auto.toLowerCase()==="sim"){i3GEO.tema.dialogo.tme(camada.name)}if(f.storymap&&f.storymap.auto&&f.storymap.auto.toLowerCase()==="sim"){i3GEO.tema.dialogo.storymap(camada.name)}if(f.animagif&&f.animagif.auto&&f.animagif.auto.toLowerCase()==="sim"){i3GEO.tema.dialogo.animagif(camada.name)}}},exclui:function(tema,confirma){if(confirma&&confirma===true){i3GEO.janela.confirma($trad("removerDoMapa"),300,$trad("x14"),"",function(){i3GEO.tema.exclui(tema)});return}try{i3GEO.pluginI3geo.removeCamada(tema)}catch(r){}var excluir=[tema];var camada=i3GEO.arvoreDeCamadas.CAMADASINDEXADAS[tema];$.each(i3GEO.arvoreDeCamadas.CAMADAS,function(index,v){if((camada.group!=""&&camada.group==v.group)||camada.name==v.group){excluir.push(v.name)}});i3GEO.php.excluitema(function(){i3GEO.atualiza()},excluir);i3GEO.mapa.ativaTema();i3GEO.temaAtivo=""},fonte:function(tema,popup,link){i3GEO.mapa.ativaTema(tema);if(!link){link=i3GEO.configura.locaplic+"/ferramentas/abrefontemapfile.php?tema="+tema}if(!popup){window.open(link)}else{i3GEO.janela.cria((i3GEO.parametros.w/2)+25+"px",(i3GEO.parametros.h/2)+18+"px",link,"","","<div class='i3GeoTituloJanela'>Metadata</div>","metadata"+tema)}},sobe:function(tema){i3GEO.php.sobetema(function(retorno){i3GEO.atualiza(retorno);if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.ordenaLayers()}},tema)},desce:function(tema){i3GEO.php.descetema(function(retorno){i3GEO.atualiza(retorno);if(i3GEO.Interface.ATUAL==="openlayers"){i3GEO.Interface.openlayers.ordenaLayers()}},tema)},zoom:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.zoomtema(i3GEO.atualiza,tema)},zoomsel:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.zoomsel(i3GEO.atualiza,tema)},limpasel:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.php.limpasel(function(retorno){i3GEO.atualiza(retorno);i3GEO.Interface.atualizaTema(retorno,tema)},tema)},mudatransp:function(idtema,valor){i3GEO.mapa.ativaTema(idtema);if(!valor){if($i("tr"+idtema)){valor=$i("tr"+idtema).value}}if(valor!==""){i3GEO.php.mudatransp(function(retorno){i3GEO.atualiza(retorno);i3GEO.Interface.atualizaTema(retorno,idtema)},idtema,valor)}else{i3GEO.janela.tempoMsg($trad("x16"))}},invertestatuslegenda:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.php.invertestatuslegenda(function(retorno){i3GEO.atualiza(retorno);i3GEO.arvoreDeCamadas.atualiza()},idtema)},alteracorclasse:function(idtema,idclasse,rgb,objImg){var w=25,h=25,temp;if(objImg&&objImg.style&&objImg.style.width){w=parseInt(objImg.style.width,10);h=parseInt(objImg.style.height,10)}i3GEO.mapa.ativaTema(idtema);temp=function(retorno){if(objImg){objImg.src=retorno.data}else{i3GEO.legenda.CAMADAS="";i3GEO.atualiza()}i3GEO.Interface.atualizaTema("",idtema)};i3GEO.php.aplicaCorClasseTema(temp,idtema,idclasse,rgb,w,h)},mudanome:function(idtema,valor){i3GEO.mapa.ativaTema(idtema);if(!valor){return}if(valor!==""){i3GEO.php.mudanome(i3GEO.atualiza,idtema,valor)}else{i3GEO.janela.tempoMsg($trad("x18"))}},copia:function(idtema){i3GEO.php.copiatema(i3GEO.atualiza,idtema)},contorno:function(idtema){var temp=function(){i3GEO.atualiza();i3GEO.Interface.atualizaTema("",idtema);i3GEO.arvoreDeCamadas.atualizaLegenda(idtema)};i3GEO.php.contorno(temp,idtema)},temporizador:function(idtema,tempo){var t;if(!tempo){if($i("temporizador"+idtema)){tempo=$i("temporizador"+idtema).value}else{tempo=0}}if(tempo!=""&&parseInt(tempo,10)>0){t=function(){if(!$i("arrastar_"+idtema)){delete(i3GEO.tema.TEMPORIZADORESID[idtema]);return}i3GEO.Interface.atualizaTema("",idtema)};i3GEO.tema.TEMPORIZADORESID[idtema]={tempo:tempo,idtemporizador:setInterval(t,parseInt(tempo,10)*1000)}}else{try{window.clearInterval(i3GEO.tema.TEMPORIZADORESID[idtema].idtemporizador);delete(i3GEO.tema.TEMPORIZADORESID[idtema])}catch(e){}}},dialogo:{animagif:function(tema){if(!tema){tema=""}var temp=function(){i3GEOF.animagif.iniciaJanelaFlutuante(tema)};i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.animagif()","animagif","animagif","dependencias.php",temp)},storymap:function(tema){if(!tema){tema=""}var temp=function(){i3GEOF.storymap.iniciaJanelaFlutuante(tema)};i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.storymap()","storymap","storymap","dependencias.php",temp)},tme:function(tema){if(!tema){tema=""}var temp=function(){i3GEOF.tme.iniciaJanelaFlutuante(tema)};i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tme()","tme","tme","dependencias.php",temp)},mostraWms:function(tema){i3GEO.janela.mensagemSimples(i3GEO.configura.locaplic+"/ogc.php?tema="+tema,"WMS url")},comentario:function(tema){i3GEO.janela.cria("530px","330px",i3GEO.configura.locaplic+"/ferramentas/comentarios/index.php?tema="+tema+"&g_sid="+i3GEO.configura.sid+"&locaplic="+i3GEO.configura.locaplic,"","","<img src='"+i3GEO.configura.locaplic+"/imagens/player_volta.png' style=cursor:pointer onclick='javascript:history.go(-1)'><span style=position:relative;top:-2px; > "+$trad("x19")+" "+tema+"</span><a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=7&idajuda=68' ><b> </b></a>","comentario"+Math.random())},cortina:function(idtema){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}i3GEO.mapa.ativaTema(idtema)}i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.cortina()","cortina","cortina","dependencias.php","i3GEOF.cortina.iniciaJanelaFlutuante()")},mmscale:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.mmscale()","mmscale","mmscale","dependencias.php","i3GEOF.mmscale.iniciaJanelaFlutuante()")},atalhoscamada:function(tema){i3GEO.mapa.ativaTema(tema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.atalhoscamada()","atalhoscamada","atalhoscamada","dependencias.php","i3GEOF.atalhoscamada.iniciaJanelaFlutuante()")},abreKml:function(tema,tipo){if(arguments.lenght===1){tipo="kml"}if(typeof(i3GEOF.converteKml)==='undefined'){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/convertekml/index.js","i3GEOF.converteKml.criaJanelaFlutuante('"+tema+"','"+tipo+"')","i3GEOF.converteKml_script")}else{i3GEOF.converteKml.criaJanelaFlutuante(tema,tipo)}},salvaMapfile:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.salvaMapfile()","salvamapfile","salvamapfile")},graficotema:function(idtema,propriedades){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}}i3GEO.mapa.ativaTema(idtema);var temp=function(){i3GEOF.graficoTema.iniciaJanelaFlutuante(propriedades)};i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.graficotema()","graficotema","graficoTema","dependencias.php",temp)},toponimia:function(idtema){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}}i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.toponimia()","toponimia","toponimia","dependencias.php","i3GEOF.toponimia.iniciaJanelaFlutuante()")},filtro:function(idtema,modoCalculadora,idRetorno){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}}i3GEO.mapa.ativaTema(idtema);var temp=function(){i3GEOF.filtro.iniciaJanelaFlutuante(modoCalculadora,idRetorno)};i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.filtro()","filtro","filtro","dependencias.php",temp)},procuraratrib:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.procuraratrib()","busca","busca","dependencias.php","i3GEOF.busca.iniciaJanelaFlutuante()")},tabela:function(idtema){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}}i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.tabela()","tabela","tabela","dependencias.php","i3GEOF.tabela.iniciaJanelaFlutuante()")},etiquetas:function(idtema){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}}i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.etiquetas()","etiqueta","etiqueta","dependencias.php","i3GEOF.etiqueta.iniciaJanelaFlutuante()")},funcaojstip:function(){i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.funcaojstip()","funcaojstip","funcaojstip","dependencias.php","i3GEOF.funcaojstip.iniciaJanelaFlutuante()")},editaLegenda:function(idtema){if(idtema&&idtema!=""){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}}i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editaLegenda()","legenda","legenda","dependencias.php","i3GEOF.legenda.iniciaJanelaFlutuante()")},editaClasseLegenda:function(idtema,idclasse){var t=i3GEO.arvoreDeCamadas.pegaTema(idtema);if(t.status<2){i3GEO.janela.tempoMsg($trad("deveLigada"));return}i3GEO.mapa.ativaTema(idtema);var temp=function(){i3GEOF.legenda.aposIniciar=function(){i3GEOF.legenda.classe=0;i3GEOF.legenda.estilo=0;i3GEOF.legenda.editaSimbolo('i3GEOlegendaid_'+idtema+"-"+idclasse);i3GEOF.legenda.aposIniciar=function(){}};i3GEOF.legenda.iniciaJanelaFlutuante(idtema)};i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editaLegenda()","legenda","legenda","dependencias.php",temp)},download:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.download()","download","download")},ogcwindow:function(idtema){i3GEO.mapa.ativaTema(idtema);window.open(i3GEO.configura.locaplic+"/ogc.htm?temaOgc="+idtema)},sld:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.janela.cria("500px","350px",i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=tema2sld&tema="+idtema+"&g_sid="+i3GEO.configura.sid,"","","<div class='i3GeoTituloJanela'>SLD<a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=5&idajuda=41' ><b> </b></a></div>")},aplicarsld:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.aplicarsld()","aplicarsld","aplicarsld","dependencias.php","i3GEOF.aplicarsld.iniciaJanelaFlutuante()")},editorsql:function(idtema){i3GEO.mapa.ativaTema(idtema);i3GEO.util.dialogoFerramenta("i3GEO.tema.dialogo.editorsql()","editorsql","editorsql","dependencias.php","i3GEOF.editorsql.iniciaJanelaFlutuante()")},mudanome:function(idtema){i3GEO.mapa.ativaTema(idtema);var temp=function(){var valor=$i("i3GEOjanelaprompt").value;i3GEO.tema.mudanome(idtema,valor)};i3GEO.janela.prompt($trad("novonome"),temp)}}};