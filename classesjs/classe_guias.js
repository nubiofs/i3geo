/*
Class:: i3GEO.guias

Cria e controla as guias de op��es

Para configurar as guias utilize i3GEO.guias.configura = ...

File: i3geo/classesjs/classe_guias.js

About: Licen�a

I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
if(typeof(i3GEO) == 'undefined'){
	i3GEO = new Array();
}
i3GEO.guias = {
	/*
	Variable: CONFIGURA
	
	Define os par�metros de cada guia
	
	Type:
	{JSON}
	*/
	CONFIGURA: {
		"temas":{
			titulo:$trad("g1"),
			id:"guia1",
			idconteudo:"guia1obj",
			click:""
		},
		"adiciona":{
			titulo:$trad("g2"),
			id:"guia2",
			idconteudo:"guia2obj",
			click: function(){
				i3GEO.guias.mostra("adiciona");
				if(!$i("arvoreAdicionaTema"))
				{
					if (objmapa.guiaMenu != undefined)
					var ondeArvore = objmapa.guiaMenu+"obj";
					else
					var ondeArvore = "guia2obj";
				}
				else
				{var ondeArvore = "arvoreAdicionaTema";}
				//para efeitos de compatibilidade
				if(document.getElementById("outrasOpcoesAdiciona")){
					i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde = "outrasOpcoesAdiciona";
					i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore = false;
				}
				i3GEO.arvoreDeTemas.cria(i3GEO.configura.sid,i3GEO.configura.locaplic,ondeArvore);
			}
		},
		"legenda":{
			titulo:$trad("g3"),
			id:"guia4",
			idconteudo:"guia4obj",
			click: function(){
				i3GEO.guias.mostra("legenda");
				i3GEO.mapa.legendaHTML.cria("guia4obj");
			}
		},
		"mapas":{
			titulo:$trad("g4"),
			id:"guia5",
			idconteudo:"guia5obj",
			click: function(){
				var pegaMapas = function(retorno){
					var ins = "<br><div id='banners' style='overflow:auto;text-align:left'>";
					var mapa = retorno.data.mapas;
					var ig1lt = mapa.length;
					var ig1=0;
					if(ig1lt > 0){
						do{
							var nome = mapa[ig1].NOME;
							if(mapa[ig1].PUBLICADO){
								if(mapa[ig1].PUBLICADO == "NAO" || mapa[ig1].PUBLICADO == "nao")
								{var nome = "<s>"+nome+"</s>";}
							}
							var lkd = mapa[ig1].LINK;
							var link = i3GEO.configura.locaplic+"/ms_criamapa.php?temasa="+mapa[ig1].TEMAS+"&layers="+mapa[ig1].LIGADOS;
							if (mapa[ig1].EXTENSAO != "")
							{link += "&mapext="+mapa[ig1].EXTENSAO;}
							if (mapa[ig1].OUTROS != "")
							{link += "&"+mapa[ig1].OUTROS;}
							if (lkd != "")
							{var link = lkd;}
							ins += "<div><a href='"+link+"'><img src='"+mapa[ig1].IMAGEM+"'></a></div><br>";
							ins += "<div><p style=text-align:center >"+nome+"</p></div><br>";
							ig1++;
						}
						while(ig1<ig1lt)
					}
					$i(i3GEO.guias.CONFIGURA.mapas.idconteudo).innerHTML = ins+"</div>";
				};
				$i(i3GEO.guias.CONFIGURA.mapas.idconteudo).innerHTML = "Aguarde...";
				i3GEO.guias.mostra("mapas");
				var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+i3GEO.configura.sid;
				var cp = new cpaint();
				cp.set_response_type("JSON");
				cp.call(p,"pegaMapas",pegaMapas);
			}
		},
	},
	/*
	Variable: atual
	
	Guia que est� ativa
	*/
	ATUAL: "temas",
	/*
	Variavel: idguias
	
	ID do elemento criado pelo YUI onde ficar�o as guias
	
	Type:
	{String}
	*/
	IDGUIAS: "guiasYUI",
	/*
	Function: cria
	
	Cria as guias com base na vari�vel configura.
	
	As guias podem ser definidas no HTML do mapa sem necessariamente estarem na vari�vel configura.<b> 
	As guias, nesse caso, devem ter como ID "guia'n'", por exemplo id="guia6". Para cada uma dessas guias
	deve haver um DIV com o conte�do. Esse DIV deve ter como ID "guia'n'obj", por exemplo id="guia6obj"
	
	Parameters:
	
	onde {String} - id do elemento que conter� as guias
	*/
	cria: function(onde){
		//
		//obt�m outras guias que podem existir no mapa
		//
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		for(var g=0;g<12;g++){
			var tituloguia = "";
			if ($i("guia"+g)){
				var tituloguia = $i("guia"+g).innerHTML;
				var re = new RegExp("&nbsp;", "g");
				var tituloguia = tituloguia.replace(re,'');
				for(ng=0;ng<nguias;ng++){
					if(i3GEO.guias.CONFIGURA[guias[ng]].id == "guia"+g){
						var tituloguia = "";
					}
				}
				if (tituloguia != ""){
					eval("i3GEO.guias.CONFIGURA.guia"+g+"=new Array()");
					eval("i3GEO.guias.CONFIGURA.guia"+g+".titulo = '"+tituloguia+"'");
					eval("i3GEO.guias.CONFIGURA.guia"+g+".id = 'guia"+g+"'");
					eval("i3GEO.guias.CONFIGURA.guia"+g+".idconteudo = 'guia"+g+"obj'");
				}
			}
		}
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		//
		//verifica o div que cont�m as guias caso n�o tenha sido passado como par�metro
		//
		if(arguments.length == 0){
			for(ng=0;ng<nguias;ng++){
				var i = $i(i3GEO.guias.CONFIGURA[guias[ng]].id);
				if(i){
					var onde = i.parentNode;
				}
			}			
		}
		else
		{var onde = $i(onde);}
		onde.id = i3GEO.guias.IDGUIAS;
		onde.className = "yui-navset";
		//
		//constroi as TAGs para as guias
		//
		var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 0px;border-color:rgb(240,240,240);border-bottom-color:white;">';
		for(ng=0;ng<nguias;ng++){
			if($i(i3GEO.guias.CONFIGURA[guias[ng]].idconteudo))
			ins += '<li><a href="#"><em><div id="'+i3GEO.guias.CONFIGURA[guias[ng]].id+'" >'+i3GEO.guias.CONFIGURA[guias[ng]].titulo+'</div></em></a></li>';
		}
		ins += "</ul>";
		onde.innerHTML = ins;
		for(g=0;g<nguias;g++)
		{
			var guia = i3GEO.guias.CONFIGURA[guias[g]];
			var id = guia.id;
			if($i(id)){
				if(guia.click == "")
					eval('$i("'+id+'").onclick = function(){i3GEO.guias.mostra("'+guias[g]+'");}');
				else
					$i(id).onclick = guia.click;
				$i(id).onmouseover = function(){
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "#bfdaff";
				};
				$i(id).onmouseout = function(){
					var bcg = this.parentNode.parentNode.style;
					var cor = bcg.background.split(" ")[0];
					if(cor != "white")
					bcg.background = "transparent";
				};
				if($i(guia.idconteudo)){
					$i(guia.idconteudo).style.overflow="auto";
					$i(guia.idconteudo).style.height = objmapa.h;
				}
			}
		}
		i3GEO.guias.mostra(i3GEO.guias.ATUAL);
		i3GEO.guias.ativa(i3GEO.guias.ATUAL);
	},
	/*
	Mostra no mapa uma determinada guia
	
	Parameters:
	
	guia {String} - nome da guia
	*/
	mostra: function(guia){
		var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
		var nguias = guias.length;
		for(g=0;g<nguias;g++){
			if($i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo))
			$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.display="none";
			if($i(i3GEO.guias.CONFIGURA[guias[g]].id))
			$i(i3GEO.guias.CONFIGURA[guias[g]].id).parentNode.parentNode.style.background="transparent";
		}
		//
		//verifica se o nome da guia passado como parametro est� correto ou � o id da guia
		//
		if(i3GEO.guias.CONFIGURA.toString().search(guia) < 0){
			for(g=0;g<nguias;g++){
				if(i3GEO.guias.CONFIGURA[guias[g]].id == guia)
				{var guia = guias[g];}
			}
		}
		if($i(i3GEO.guias.CONFIGURA[guia].idconteudo)){
			$i(i3GEO.guias.CONFIGURA[guia].idconteudo).style.display="block";
			$i(i3GEO.guias.CONFIGURA[guia].id).parentNode.parentNode.style.background="white";
			i3GEO.guias.ATUAL = guia;
		}
	},
	ativa: function(guia){
		try{
			if(i3GEO.guias.CONFIGURA[i3GEO.guias.ATUAL].click != "")
			{i3GEO.guias.CONFIGURA[i3GEO.guias.ATUAL].click.call();}
		}
		catch(e){};
	},
	/*
	Function: libera
	
	Libera as guias do local atual, colocando-as em uma janela m�vel sobre o mapa.
	*/
	libera: function(){
		if (!$i("conteudojanelaguias")){
			if($i(i3GEO.guias.IDGUIAS)){$i(i3GEO.guias.IDGUIAS).style.display="none";}
			var i = $i("contemFerramentas");
			if(i)
			i.style.display = "none";
			var w = parseInt($i("contemFerramentas").style.width);
			var i = $i("visual");
			if (i)
			{i.style.width="0px";i.innerHTML="";}
			var pos = "px";
			var a = objmapa.h;
			var l = objmapa.w + w;
			objmapa.h = a;
			objmapa.w = l;
			if (navm){pos = "";}
			var i = $i("img");
			if(i){
				i.style.width= l+pos;
				i.style.height= a+pos;
			}
			var i = $i("corpoMapa");
			if(i){
				i.style.width= l+pos;
				i.style.height= a+pos;
				i.style.clip = 'rect('+0+" "+(l*1+2)+" "+(a*1+2)+" "+0+')';
			}
			var i = $i("mst");
			if(i){i.style.width = l + 1 + pos;}
			var i = $i("contemImg");
			if(i){
				i.style.height= a+pos;
				i.style.width= l+pos;
			}
			if (i3GEO.configura.entorno == "sim"){
				var letras=["L","O"];
				for (var l=0;l<2; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.width = objmapa.w+pos;
						$i("img"+letras[l]).style.height = objmapa.h+pos;
						$i("corpoMapa"+letras[l]).style.width=objmapa.w+pos;
						$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos+pos;
						$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
					}
				}
				var letras=["N","S"];
				for (var l=0;l<2; l++){
					if ($i("img"+letras[l])){
						$i("img"+letras[l]).style.width = objmapa.w * 2+pos;
						$i("img"+letras[l]).style.height = objmapa.h * 2+pos;
						$i("corpoMapa"+letras[l]).style.width=objmapa.w * 3+pos;
						$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos;
						$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
					}
				}
			}
			i3GEO.mapa.ajustaPosicao();
			var temp = function(retorno){
				//carrega janela
				var novoel = document.createElement("div");
				novoel.id = "janelaguias";
				novoel.style.display="block";
				var temp = '<div class="hd">Guias</div>';
				temp += '<div class="bd" id="conteudojanelaguias"></div>';
				novoel.innerHTML = temp;
				if($i("i3geo"))
				{$i("i3geo").appendChild(novoel);}
				else
				{document.body.appendChild(novoel);}
				YAHOO.namespace("janelaguias.xp");
				YAHOO.janelaguias.xp.panel = new YAHOO.widget.Panel("janelaguias", {width:"270px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
				YAHOO.janelaguias.xp.panel.render();
				var i = $i(i3GEO.guias.IDGUIAS);
				$i("janelaguias").appendChild(i);
				i.style.borderLeft="1px solid black";
				i.style.borderRight="1px solid black";
				var guias = i3GEO.util.listaChaves(i3GEO.guias.CONFIGURA);
				var nguias = guias.length;
				for(g=0;g<nguias;g++){
					if($i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo)){
						$i("janelaguias").appendChild($i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo));
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.background="white";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.border="1px solid black";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.borderTop="0px solid black";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.width="270px";
						$i(i3GEO.guias.CONFIGURA[guias[g]].idconteudo).style.left="-1px";
					}
				}
				ajaxredesenha("")
				i.style.display="block";
				i.style.left = "-1px";
				i.style.width = "270px";
			};	
			i3GEO.janela.abreAguarde("ajaxredesenha",$trad("o1"));
			var p = i3GEO.configura.locaplic+"/classesphp/mapa_controle.php?funcao=mudatamanho&altura="+a+"&largura="+l+"&g_sid="+i3GEO.configura.sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"mudaQS",temp);
		}
		else{
			YAHOO.janelaguias.xp.panel.render();
			YAHOO.janelaguias.xp.panel.show();
		}
	
	}
};