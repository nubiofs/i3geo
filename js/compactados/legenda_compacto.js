if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.legenda={IDS:[],CAMADAS:"",objImg:"",config:{"idLegenda":"legendaHtml","templateLegenda1class":"templates/legenda1class.html","janela":false},carregaTemplates:function(){$.get(i3GEO.legenda.config.templateLegenda,function(template){i3GEO.template.legenda=template;i3GEO.legenda.inicia()})},inicia:function(config){if(config){$.each(config,function(i,v){i3GEO.legenda.config[i]=v})}if(!i3GEO.template.legenda){i3GEO.legenda.carregaTemplates();return}else{config=i3GEO.legenda.config;if(!$i(config.idLegenda)){return}i3GEO.eventos.adicionaEventos("NAVEGAMAPA",["i3GEO.legenda.atualiza()"]);if(config.janela==true){i3GEO.legenda.janela()}else{i3GEO.legenda.registra(config.idLegenda)}i3GEO.legenda.atualiza()}},registra:function(idleg){if($i(idleg)&&i3GEO.legenda.IDS.indexOf(idleg)==-1){i3GEO.legenda.IDS.push(idleg)}},off:function(idleg){i3GEO.legenda.IDS.remove(idleg)},atualiza:function(){if(i3GEO.template.legenda==undefined){return}var temp,i,tamanho,atualiza=false;if(i3GEO.arvoreDeCamadas.comparaTemas(i3GEO.legenda.CAMADAS,i3GEO.arvoreDeCamadas.CAMADAS)){return}temp=function(retorno){$.each(i3GEO.legenda.IDS,function(index,value){i3GEO.legenda.montaLegenda(retorno,value)})};tamanho=[35,25];$.each(i3GEO.legenda.IDS,function(index,value){i=$i(value);if(i&&i.style.display!=="none"){atualiza=true;try{tamanho=$("#"+value).attr("data-size").split(",")}catch(e){};i.innerHTML=$trad("o1")}else{i.innerHTML=""}});if(atualiza==true){i3GEO.legenda.CAMADAS=i3GEO.util.cloneObj(i3GEO.arvoreDeCamadas.CAMADAS);i3GEO.php.criaLegendaJSON(temp,"",tamanho[0],tamanho[1])}},montaLegenda:function(retorno,idOndeLegenda){var legenda="",t,idleg;if(!idOndeLegenda){idleg=$i(i3GEO.legenda.config.idLegenda)}else{idleg=$i(idOndeLegenda)}if(retorno.data.legenda!=""){$.each(retorno.data.legenda,function(index,value){if(value.tipo=="imagem"){value.classes[0].checkbox="hidden"}if(!value.classes[1]){value.hiddenTitle="hidden";value.classes[0].nome=value.nome;if(i3geoOL.getLayersByName(value.layer)[0].getVisible()==true){value.classes[0].checked="checked"}else{value.classes[0].checked=""}}});$(".legendaTemaSolto").remove();t=Mustache.to_html("{{#data}}"+i3GEO.template.legenda+"{{/data}}",{"data":retorno.data.legenda,"altera":$trad("p9")});idleg.innerHTML=t;$("#"+i3GEO.legenda.config.idLegenda).find(".draggable").draggable({helper:"clone",appendTo:"body",start:function(event,ui){$(this).hide()},stop:function(event,ui){$(this).css({"position":"absolute","top":(event.clientY-event.offsetY),"left":(event.clientX-event.offsetX)});$(this).addClass("legendaTemaSolto");$("body").append($(this));$(this).show()}});$("#"+i3GEO.legenda.config.idLegenda+" img").bind('click',function(e){e.stopPropagation()},false)}else{idleg.innerHTML=""}},png:function(){var obj=$i("i3GEOconteudoLegenda");if($i("wlegenda")){obj.style.width=$i("wlegenda").style.width}else{obj.style.width="400px"}if($i("wlegenda_corpo")){obj.style.height=$i("wlegenda_corpo").style.height}else{obj.style.height="400px"}i3GEO.mapa.dialogo.html2canvas(obj)},ativaDesativaTema:function(inputbox){var temp=function(){i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);i3GEO.arvoreDeCamadas.atualiza("");i3GEO.janela.fechaAguarde("redesenha")};if(!inputbox.checked){i3GEO.php.ligatemas(temp,inputbox.value,"")}else{i3GEO.php.ligatemas(temp,"",inputbox.value)}},inverteStatusClasse:function(leg){var temp=function(retorno){i3GEO.Interface.atualizaTema(retorno,leg.name)};if(i3GEO.arvoreDeCamadas.CAMADASINDEXADAS[leg.name].numclasses==1){var chkb=i3GEO.arvoreDeCamadas.capturaCheckBox(leg.name);if(chkb){i3geoOL.getLayersByName(leg.name)[0].setVisibility(leg.checked)}else{i3GEO.php.inverteStatusClasse(temp,leg.name,leg.value)}}else{i3GEO.php.inverteStatusClasse(temp,leg.name,leg.value)}},mudaCorClasse:function(tema,idclasse,objImg){var obj,novoel;i3GEO.legenda.objImg=objImg;if(!$i("tempinputcorclasse")){novoel=document.createElement("input");novoel.id="tempinputcorclasse";novoel.type="hidden";novoel.onchange=function(){var obj=$("#tempinputcorclasse");i3GEO.tema.alteracorclasse(obj.attr("tema"),obj.attr("idclasse"),obj.val(),i3GEO.legenda.objImg)};document.body.appendChild(novoel)}$("#tempinputcorclasse").attr({"tema":tema,"idclasse":idclasse});i3GEO.util.abreCor("","tempinputcorclasse")},janela:function(largura,altura,topo,esquerda,atualiza){if(!largura){largura=360}if(!altura){altura=300}var cabecalho,minimiza,janela,titulo,temp;janela=YAHOO.i3GEO.janela.manager.find("wlegenda");if(janela){i3GEO.janela.destroi("wlegenda")}cabecalho=function(){};minimiza=function(){var t=i3GEO.janela.minimiza("wlegenda","200px");if(t==="min"){$i("legendaTituloI").style.display="none"}else{$i("legendaTituloI").style.display="block"}};titulo="<span class='i3GeoTituloJanelaBsNolink' >"+$trad("p3")+"</span></div>";janela=i3GEO.janela.cria(largura+"px",altura+"px","","","",titulo,"wlegenda",false,"hd",cabecalho,minimiza,"","","","","nao","");temp=function(){i3GEO.legenda.IDS.remove("wlegenda_corpo")};YAHOO.util.Event.addListener(janela[0].close,"click",temp);i3GEO.legenda.registra("wlegenda_corpo");if(topo&&esquerda){janela=YAHOO.i3GEO.janela.manager.find("wlegenda");janela.moveTo(esquerda,topo)}i3GEO.legenda.CAMADAS="";if(atualiza==true){i3GEO.legenda.atualiza()}}};