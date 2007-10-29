/*
Title: Fun��es gerais

Fun��es de uso geral para processamento de dados

File: funcoes.js

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
/*
Function: $im

Retorna o caminho correto de uma imagem.

Exemplo: $im("imagem.png")

Par�metros:

g - nome da imagem

Retorno:

string - caminho para a imagem
*/
$im = function(g)
{return g_locaplic+"/imagens/visual/"+g_visual+"/"+g;};
/*
Function: $top

Muda a posi��o (superior) de um objeto tanto no IE como no Firefox.

Exemplo: $top("imagem",100)

Par�metros:

id - identificador do objeto

valor - posi��o em rela��o ao topo.
*/
$top = function(id,valor)
{
	if (navm)
	{document.getElementById(id).style.pixelTop=valor;}
	if(navn)
	{document.getElementById(id).style.top=valor+"px";}
};
/*
Function: $left

Muda a posi��o (esquerda) de um objeto tanto no IE como no Firefox.

Exemplo: $left("imagem",100)

Par�metros:

id - identificador do objeto

valor - posi��o em rela��o a esquerda.
*/
$left = function(id,valor)
{
	if (navm)
	{document.getElementById(id).style.pixelLeft=valor;}
	if(navn)
	{document.getElementById(id).style.left=valor+"px";}
};
/*
Function: htmlAcentos

Troca os acentos de uma frase por entidades html.

Par�metros:

palavra - palavra que ser� processada
*/
function htmlAcentos(palavra)
{
	return(palavra);
}
/*
Function: trataErro

Trata o erro de um try cacth.
*/
function trataErro()
{
	objaguarde.fecha("ajaxdestaca");
	objaguarde.fecha("ajaxabrelente");
	objaguarde.fecha("ajaxiniciaParametros");
	objaguarde.fecha("ajaxredesenha");
	objaguarde.fecha("ajaxCorpoMapaEntorno");
	objaguarde.fecha("ajaxCorpoMapa");
	objaguarde.fecha("ajaxLegenda");
	objaguarde.fecha("ajaxReferencia");
	objaguarde.fecha("ajaxEscalaGrafica");
	objaguarde.fecha("montaMapa");
	objaguarde.fecha("aguardedoc");
}
/*
Function: iCookie

Insere um cookie.
*/
function iCookie(nome,valor)
{
	document.cookie = nome+"="+valor;
}
/*
Function: pCookie

Pega um cookie.
*/
function pCookie(nome)
{
	var cookies = document.cookie;
	var i = cookies.indexOf(nome);
	if(i == -1)
	{return null;}
	var fim = cookies.indexOf(";",i);
	if (fim == -1)
	{var fim = cookies.length;}
	return (unescape(cookies.substring(i,fim))).split("=")[1];
}
/*
Section: interface
*/
/*
Function: mudaVisual

Muda o visual do mapa atual

Parameters:

visual - nome do novo visual. Obtido na inicializa��o do I3Geo e armazenado na vari�vel objmapa.listavisual
*/
function mudaVisual(visual)
{
	var monta = function(retorno)
	{
		objaguarde.fecha("ajaxredesenha");
		var imgstemp = retorno.data.arquivos;
		var imgs = new Array();
		for (i=0;i < imgstemp.length; i++)
		{
			var temp = imgstemp[i].split(".");
			if ((temp[1] == "png") || (temp[1] == "gif") || (temp[1] == "jpg"))
			{
				imgs.push(imgstemp[i]);
			}
		}
		var elementos = document.getElementsByTagName("img");
		var caminho = g_locaplic+"/imagens/visual/"+visual+"/";
		//faz a troca em imagens
		for (j=0;j<imgs.length; j++)
		{
			for (i=0;i < elementos.length; i++)
			{
				if (elementos[i].src.search(imgs[j]) > -1)
				{elementos[i].src = caminho+imgs[j];}
			}
		}
		//faz a troca em ids
		for (j=0;j < imgs.length; j++)
		{
			var busca = imgs[j].split(".");
			if ($i(busca[0]))
			{$i(busca[0]).src = caminho+imgs[j];}
		}
		//faz a troca em bg
		var elementos = new Array("vertMaisZoom","vertMenosZoom","vertBGDiv");
		for (i=0;i < elementos.length; i++)
		{
			if ($i(elementos[i]))
			{
				for (j=0;j < imgs.length; j++)
				{
					var busca = imgs[j].split(".");
					if (busca[0] == elementos[i])
					{$i(elementos[i]).style.backgroundImage = "url('"+caminho+imgs[j]+"')";}
				}				
			}
		}
		g_visual = visual;
	};
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=listaArquivos&g_sid="+g_sid+"&diretorio=imagens/visual/"+visual;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"mudaQS",monta);
}
/*
Function: initJanelaMen

Abre a janela com as mensagens de ajuda ao usu�rio

*/
function initJanelaMen()
{
	if (!$i("janelaMen"))
	{
		var novoel = document.createElement("div");
		novoel.id = "janelaMen";
		novoel.style.display="block";
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" ><div id="janelaMenTexto" style="color:rgb(170,170,170)">'+g_mensagempadrao+'</div></div>';
		novoel.innerHTML = temp;
		novoel.style.border="1px solid rgb(170,170,170)";
		document.body.appendChild(novoel);
		$i("janelaMenTexto").style.textAlign="left";
		$i("janelaMenTexto").style.fontSize="10px";
		document.body.appendChild(novoel);
		YAHOO.namespace("janelaMen.xp");
		YAHOO.janelaMen.xp.panel = new YAHOO.widget.Panel("janelaMen", { width:"266px", height:"auto", fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaMen.xp.panel.render();
		var escondeMen = function()
		{
			YAHOO.util.Event.removeListener(YAHOO.janelaMen.xp.panel.close, "click");
			YAHOO.janelaMen.xp.panel.destroy();	
			iCookie("g_janelaMen","nao");	
		};
		YAHOO.util.Event.addListener(YAHOO.janelaMen.xp.panel.close, "click", escondeMen);
		iCookie("g_janelaMen","sim");
	}
	YAHOO.janelaMen.xp.panel.show();
	YAHOO.janelaMen.xp.panel.moveTo(imagemxi - 267 ,objmapa.h - 70);
}
/*
Function: docaguias

Coloca as guias de navega��o em uma janela interna do mapa e altera o tamanho do mapa para ajustar o novo tamanho.
*/
function docaguias()
{
	if (!$i("conteudojanelaguias"))
	{
		if (!$i("contemFerramentas")){return;}
		var novono = $i("contemFerramentas").innerHTML;
		$i("contemFerramentas").innerHTML = "";
		var wef = 0;
		if ($i("encolheFerramentas"))
		{wef = parseInt($i("encolheFerramentas").style.width);}
		var w = parseInt($i("contemFerramentas").style.width) - wef;
		$i("contemFerramentas").style.width="0px";
		if ($i("visual"))
		{$i("visual").style.width="0px";$i("visual").innerHTML="";}
		var pos = "px";
		var a = objmapa.h;
		var l = objmapa.w + w;
		objmapa.h = a;
		objmapa.w = l;
		if (navm){pos = "";}
		$i("img").style.width= l+pos;
		$i("img").style.height= a+pos;
		$i("corpoMapa").style.width= l+pos;
		$i("corpoMapa").style.height= a+pos;
		$i("corpoMapa").style.clip = 'rect('+0+" "+(l*1+2)+" "+(a*1+2)+" "+0+')';
		$i("mst").style.width = l + 1 + wef + pos;
		$i("contemImg").style.height= a+pos;
		$i("contemImg").style.width= l+pos;
		// entorno
		if (g_entorno == "sim")
		{
			var letras=["L","O"];
			for (l=0;l<letras.length; l++)
			{
				if ($i("img"+letras[l]))
				{
					$i("img"+letras[l]).style.width = objmapa.w+pos;
					$i("img"+letras[l]).style.height = objmapa.h+pos;
					$i("corpoMapa"+letras[l]).style.width=objmapa.w+pos;
					$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos+pos;
					$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
				}
			}
			var letras=["N","S"];
			for (l=0;l<letras.length; l++)
			{
				if ($i("img"+letras[l]))
				{
					$i("img"+letras[l]).style.width = objmapa.w * 2+pos;
					$i("img"+letras[l]).style.height = objmapa.h * 2+pos;
					$i("corpoMapa"+letras[l]).style.width=objmapa.w * 3+pos;
					$i("corpoMapa"+letras[l]).style.height=objmapa.h+pos;
					$i("corpoMapa"+letras[l]).style.clip = 'rect(0 0 0 0)';
				}
			}
		}
		calcposf();
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudatamanho&altura="+a+"&largura="+l+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"mudaQS",ajaxredesenha);
		//carrega janela
		var novoel = document.createElement("div");
		novoel.id = "janelaguias";
		novoel.style.display="block";
		var temp = '<div class="hd">Guias</div>';
		temp += '<div class="bd" id="conteudojanelaguias"></div>';
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		$i("conteudojanelaguias").innerHTML = novono;
		YAHOO.namespace("janelaguias.xp");
		YAHOO.janelaguias.xp.panel = new YAHOO.widget.Panel("janelaguias", {width:"268px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaguias.xp.panel.render();
		if($i(objmapa.guiaMenu+"obj"))
		{
			$i(objmapa.guiaMenu+"obj").innerHTML = "";
		}
		ativaGuias();
	}
	else
	{
		YAHOO.janelaguias.xp.panel.render();
		YAHOO.janelaguias.xp.panel.show();
	}
}
/*
Function: ativaGuias

Ativa as guias principais do mapa, definindo as fun��es que ser�o executadas quando a guia � escolhida.

As guias principais s�o definidas nos objetos

objmapa.guiaTemas

objmapa.guiaMenu

objmapa.guiaLegenda

objmapa.guiaListaMapas

*/
function ativaGuias()
{
	//ajusta as guias da vers�o antiga do YUI
	//pega o elemento onde est�o os tabs
	for(g=0;g<12;g++)
	{
		if ($i("guia"+g))
		var gpai = $i("guia"+g).parentNode;
	}
	gpai.id = "guiasYUI";
	gpai.className = "yui-navset";
	var ins = '<ul class="yui-nav" style="border-width:0pt 0pt 2px;border-color:rgb(240,240,240)">';
	for(g=0;g<12;g++)
	{
		if ($i("guia"+g))
		{ins += '<li><a href="#"><em><div id="guia'+g+'" >'+$i("guia"+g).innerHTML+'</div></em></a></li>';}
	}
	ins += "</ul>";
	gpai.innerHTML = ins;
	//guias
	if ($i(objmapa.guiaTemas))
	{
		$i(objmapa.guiaTemas).onclick = function()
		{g_guiaativa = objmapa.guiaTemas;mostraguiaf(1);};
	}
	if ($i(objmapa.guiaMenu))
	{
		$i(objmapa.guiaMenu).onclick = function()
		{
			g_guiaativa = objmapa.guiaMenu;
			mostraguiaf(2);
			if (!$i("buscatema"))
			{
				var pegalistademenus = function(retorno)
				{
					if (retorno.data == "")
					{pegaListaDeGrupos("","sim");}
					else
					{
						for (j=0;j<retorno.data.length;j++)
						{
							if(j == retorno.data.length-1)
							{pegaListaDeGrupos(retorno.data[j].idmenu,"sim");}
							else
							{pegaListaDeGrupos(retorno.data[j].idmenu,"nao");}
						}
					}
				};
				//pega a lista de �rvores que devem ser montadas
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistademenus&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"pegalistademenus",pegalistademenus);
			}
		};
	}
	if ($i(objmapa.guiaLegenda))
	{
		$i(objmapa.guiaLegenda).onclick = function()
		{g_guiaativa = objmapa.guiaLegenda;mostraguiaf(4);objmapa.atualizaLegendaHTML();};
	}
	if ($i(objmapa.guiaListaMapas))
	{
		$i(objmapa.guiaListaMapas).onclick = function()
		{
			g_guiaativa = objmapa.guiaListaMapas;
			mostraguiaf(5);
			if ($i("banners"))
			{
				$i("banners").innerHTML == "Aguarde...";
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegaMapas&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"pegaMapas",pegaMapas);
			}
			else
			{alert("id banners nao encontrado");}
		};
	}
}
/*
Function: mensagemf

Abre uma mensagem na tela em um DIV.

Parameters:

m - mensagem que ser� mostrada.
*/
function mensagemf(m)
{
	//insere o div para mensagens
	if (!$i("mensagem"))
	{
		var novoel = document.createElement("div");
		novoel.id = 'mensagem';
		novoel.innerHTML = '<table width="50" style="border: 1px solid #000000;"> <tr> <td onclick="mensagemf()" style="text-align:left;cursor:pointer" class="tdclara"> <img src='+$im("excluir.png")+' /> </td> <td style="text-align:left" class="tdclara"> <input style="text-align:left" class="textocb" type="text" id="mensagemt" size="50" value="" /> </td></tr> </table>';
		document.body.appendChild(novoel);
	}
	if (m == null)
	{$i("mensagem").style.visibility = "hidden";}
	else
	{
		$i("mensagemt").value = m;
		$i("mensagem").style.visibility = "visible";
	}
	eval ('document.getElementById("mensagem").style.' + g_tipoleft + ' = imagemxi + g_postpx');
	eval ('document.getElementById("mensagem").style.' + g_tipotop + ' = imagemyi + g_postpx');
}
/*
Function: wdocaf

Abre a janela doc�vel para executar algum programa.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

wsrc - endere�o do conte�do que ser� aberto

nx - posi��o da janela em x

ny - posi��o da janela em y

texto - texto que ser� mostrado no t�tulo da janela
*/
function wdocaf(wlargura,waltura,wsrc,nx,ny,texto)
{
	if($i("boxg"))
	{$i("boxg").style.display = "none";}
	var wlargura_ = parseInt(wlargura)+0+"px";
	YAHOO.namespace("janelaDoca.xp");
	if (!$i("wdoca"))
	{
		var novoel = document.createElement("div");
		novoel.id = "wdoca";
		novoel.style.display="block";
		var ins = '<div class="hd">'+texto+"</div>";
		ins += '<div class="bd">';
		ins += '<iframe name="wdocai" id="wdocai" valign="top" style="border:0px white solid"></iframe>';
		ins += "</div>";
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
	}
	if ($i("wdocai"))
	{
		with ($i("wdocai").style){width = "100%";height=waltura;};
		$i("wdoca").style.display = "block";
		$i("wdocai").src = wsrc;
	}
    YAHOO.janelaDoca.xp.panel = new YAHOO.widget.ResizePanel("wdoca", { width: wlargura_, fixedcenter: false, constraintoviewport: false, visible: true, iframe:false} );
    YAHOO.janelaDoca.xp.panel.moveTo(imagemxi,imagemyi+50);
    YAHOO.janelaDoca.xp.panel.render();
	var escondeWdoca = function()
	{
		$i("wdoca").style.display = "none";
		$i("wdocai").src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca.xp.panel.close, "click");
		YAHOO.janelaDoca.xp.panel.destroy();
		if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
		{mudaiconf("pan");}
		//esconde o box do google
		if ($i("boxg"))
		{$i("boxg").style.display = "none";}
	};
	YAHOO.util.Event.addListener(YAHOO.janelaDoca.xp.panel.close, "click", escondeWdoca);
}
/*
Function: redimwdocaf

Redimensiona a janela doc�vel.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

*/
function redimwdocaf(wlargura,waltura)
{
	if ($i("wdoca"))
	{
		$i("wdoca").style.width = wlargura;
		$i("wdoca").style.height = waltura;
	}
		
}
/*
Function: wdocaf2

Abre uma segunda janela doc�vel para executar algum programa relativo a outra janela.

Parameters:

wlargura - largura da nova janela

waltura - altura da nova janela

wsrc - endere�o do conte�do que ser� aberto

nx - posi��o da janela em x

ny - posi��o da janela em y

texto - texto que ser� mostrado no t�tulo da janela
*/
function wdocaf2(wlargura,waltura,wsrc,nx,ny,texto)
{
	if (!$i("wdoca2"))
	{
		var novoel = document.createElement("div");
		novoel.id = "wdoca2";
		novoel.style.display="none";
		var ins = '<div class="hd">&nbsp;</div><div class="bd">';
		ins += '<iframe name="wdocai2" id="wdocai2"  valign="top" ></iframe></div></div>';
		novoel.innerHTML = ins;
		document.body.appendChild(novoel);
	}
	YAHOO.namespace("janelaDoca2.xp");
	YAHOO.janelaDoca2.xp.panel = new YAHOO.widget.Panel("wdoca2", {width:wlargura, fixedcenter: false, constraintoviewport: true, underlay:"none", close:true, visible:true, draggable:true, modal:true } );
	YAHOO.janelaDoca2.xp.panel.moveTo(imagemxi,imagemyi);
	YAHOO.janelaDoca2.xp.panel.render();
	YAHOO.janelaDoca2.xp.panel.show();
	with ($i("wdocai2").style){width = "100%";height = waltura;}
	$i("wdoca2").style.display = "block";
	$i("wdocai2").src = wsrc;
	var escondeWdoca2 = function()
	{
		$i("wdoca2").style.display = "none";
		$i("wdocai2").src = "";
		YAHOO.util.Event.removeListener(YAHOO.janelaDoca2.xp.panel.close, "click");
		//YAHOO.janelaDoca2.xp.panel.destroy();
	};
	YAHOO.util.Event.addListener(YAHOO.janelaDoca2.xp.panel.close, "click", escondeWdoca2);
}
/*
Function: wdocafechaf

Fecha uma janela doc�vel.

Depreciado

Parameters:

odoca - objeto janela
*/
function wdocafechaf(odoca)
{
	$i(odoca).style.display="none";
	if ((odoca != "wdocaref") && (odoca != "wdocac"))
	{
		if($i("wdocain")){$i("wdocain").value = "";}
		if($i("wdocadiv")){$i("wdocadiv").innerHTML = "";$i("wdocadiv").display="none";}
		if ($i("temp")){$i("temp").value == "";}
		$i("wdocai").src = "";
		$i("imgh").style.visibility="visible";
	}
	if ((g_tipoacao == "selecaobox") || (g_tipoacao == "inseregrafico") || (g_tipoacao == "selecao") || (g_tipoacao == "inserexy") || (g_tipoacao == "textofid"))
	{mudaiconf("pan");}
}
/*
Function: ajudaf

Depreciada - Mostra a ajuda sobre uma op��o do mapa quando � pressionada a tecla "a".

Parameters:

evt - evento onkeypress sobre o elemento BODY.
*/
function ajudaf(evt)
{
	if (navn)
	{
		var tecla = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
	}
	if (navm)
	{var tecla = evt.keyCode;}
	//a variavel g_hlpt guarda o endereco do help que deve ser aberto
	if (evt == "abre") // nesse caso a ajuda sera aberta (nao e um evento)
	{
		s = g_locaplic+"/ajuda/"+g_hlpt+".htm";
		wdocaf("400px","300px",s,"","","Ajuda");
		return;
	}
	if ($i("ajuda").innerHTML!="-")
	{
		if (tecla == 97)
		{
			s = g_locaplic+"/ajuda/"+g_hlpt+".htm";
			wdocaf("300px","300px",s,"","","Ajuda");
		}
	}
	if (tecla == 43)
	{destacaTamanho += 10;} //aumenta o tamanho do destaque
	if (tecla == 45)
	{destacaTamanho -= 10;} //diminui o tamanho do destaque
}
/*
Function: mostradicasf

Mostra dicas sobre uma fun��o quando o mouse passa sobre um bot�o ou outra op��o qualquer.

Parameters:

objeto - objeto sobre o qual o mouse est� sobreposto.

dica - dica que aparece no mapa.

hlpt - arquivo de help que dever� ser aberto se a tecla "a" for pressionada. O arquivo � passado para
a vari�vel global g_hlpt.
*/
function mostradicasf(objeto,dica,hlpt)
{
	if ($i("ajuda"))
	{
		if (dica == ""){$i("ajuda").innerHTML="-";}
		else
		{
			g_hlpt = hlpt;
			$i("ajuda").innerHTML= "<b>"+dica+" </b>";
		}
	}
	if ($i("janelaMenTexto"))
	{
		if (dica == ""){dica = g_mensagempadrao;}
		$i("janelaMenTexto").innerHTML= "<b>"+dica+" </b>";
	}
}
/*
Function: mudaiconf

Muda as bordas dos �cones de ferramentas, passando todos para normal.
Aplica uma borda sobre um �cone espec�fico

Parameters:

i - id do �cone que receber� a borda.
*/
function mudaiconf(i)
{
	//limpa o container com os tips fixos na tela
	for(ot=0;ot<objmapa.objtips.length;ot++)
	{
		if (objmapa.objtips[ot])
		{
			objmapa.objtips[ot].innerHTML = "";
			objmapa.objtips[ot].style.display="none";
		}
	}
	objmapa.objtips = new Array();
	limpacontainerf();
	var objetos=["inseregrafico","textofid","zoomli","zoomlo","zoomiauto","zoomoauto","pan","identifica","mede","inserexy","selecao"];
	for (ko=0;ko<objetos.length; ko++)
	{
		if ($i(objetos[ko]))
		with ($i(objetos[ko]).style){borderWidth=0;borderBottomWidth=1;borderLeftWidth=1;borderColor='rgb(50,50,50)';}
	}
	g_tipoacao = i;
	if($i(i))
	{
		with ($i(i).style){borderLeftWidth='0px';borderBottomWidth='0px';borderColor='black';}
	}
	$i("imgh").style.display="block";
	switch(i)
	{
		case "zoomli":
		$i("imgh").src= g_localimg + "/" + "ic_zoom.png";
		if($i("img")){$i("img").title = "";}
		break;
		case "pan":
		$i("imgh").src= g_localimg + "/" + "icon_pan.gif";
		if($i("img")){$i("img").title = "";}
		break;
		case "mede":
		$i("imgh").src= g_localimg + "/" + "mede.gif";
		break;
		case "inserexy":
		$i("imgh").src= g_localimg + "/" + "ic_xy.png";
		if($i("img")){$i("img").title = "clique para inserir um ponto";}
		break;
		case "textofid":
		$i("imgh").src= g_localimg + "/" + "ic_xy.png";
		if($i("img")){$i("img").title = "clique para inserir o texto";}
		break;
		case "selecao":
		$i("imgh").src= g_localimg + "/" + "ic_seleciona.png";
		if($i("img")){$i("img").title = "clique para selecionar";}
		break;
		case "inseregrafico":
		$i("imgh").src= g_localimg + "/" + "ic_seleciona.png";
		if($i("img")){$i("img").title = "clique para incluir o gr�fico";}
		break;
		case "identifica":
		$i("imgh").src= g_localimg + "/" + "ic_identifica.png";
		if($i("img")){$i("img").title = "";}
		break;
	}
}
/*
Function: ferramentasf

Ativa o DIV com as ferramentas dos blocos de �cones quando uma guia de ferramentas � clicada.

Parameters:

f - c�digo da ferramenta.
*/
function ferramentasf(f)
{
	if ($i("ferramentas"+f))
	{
		var fs=["1","2","3","4","5"];
		for (i=0;i<fs.length; i++)
		{
			if ($i("ferramentas"+fs[i]))
			{
				$i("ferramentas"+fs[i]).style.display="none";
				$i("ferr"+fs[i]).style.backgroundColor="rgb(230,230,230)";
			}
		}
		$i("ferramentas"+f).style.display="block";
		$i("ferr"+f).style.backgroundColor="rgb(255,255,255)";
	}
}
/*
Function: mostraguiaf

Ativa a visualiza��o de uma determinada guia.

Par�metros:

guia - n�mero da guia que ser� ativada.
*/
function mostraguiaf(guia)
{
	if ($i("guia"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10];
		for (j=0;j<fs.length; j++)
		{
			if ($i("guia"+fs[j]))
			{
				jj = fs[j];
				if ($i("guia"+jj+"obj"))
				{$i("guia"+jj+"obj").style.display="none";}
			}
		}
		if ($i("guia"+guia+"obj"))
		{$i("guia"+guia+"obj").style.display="block";}
		else
		{alert("O objeto guia"+guia+"obj nao existe.");}
	}
}
/*
Function: mostraferramenta

Ativa a visualiza��o de uma guia de ferramentas.

Par�metros:

guia - n�mero da guia que ser� ativada.
*/
function mostraferramenta(guia)
{
	if ($i("ferr"+guia))
	{
		var fs=[1,2,3,4,5,6,7,8,9,10];
		for (j=0;j<fs.length; j++)
		{
			if ($i("ferr"+fs[j]))
			{
				jj = fs[j];
				$i("ferr"+jj).style.backgroundColor="rgb(230,230,230)";
				if ($i("ferr"+jj+"obj"))
				{$i("ferr"+jj+"obj").style.display="none";}
			}
		}
		$i("ferr"+guia).style.backgroundColor="rgb(255,255,255)";
		if ($i("ferr"+guia+"obj"))
		{$i("ferr"+guia+"obj").style.display="block";}
		else
		{alert("O objeto ferr"+guia+"obj nao existe.");}
	}
}
/*
Function: borra

Borra o mapa evitando que o usu�rio clique em alguma op��o

*/
function borra(tipo)
{}
/*
Function: aguarde

Cria um objeto aguarde.
O objeto � um banner mostrado na tela quando uma fun��o ajax � executada.

Method:

abre - abre o banner

Par�metros:

aguardeId - identificador do banner

texto - texto do banner

Method:

fecha - fecha o banner

Par�metros:

aguardeId - identificador do banner

*/
function aguarde()
{
	this.abre = function(aguardeId,texto)
	{
		YAHOO.namespace("aguarde."+aguardeId);
		eval ('YAHOO.aguarde.'+aguardeId+' = new YAHOO.widget.Panel("wait",{width:"240px",fixedcenter:false,underlay:"none",close:true,draggable:false,modal:true})');
		eval ('YAHOO.aguarde.'+aguardeId+'.setBody("<span style=font-size:12px; >"+texto+"</span>")');
		eval ('YAHOO.aguarde.'+aguardeId+'.body.style.height="20px"');
		eval ('YAHOO.aguarde.'+aguardeId+'.setHeader("<span><img src=\'"+g_locaplic+"/imagens/aguarde.gif\' /></span>")');
		eval ('YAHOO.aguarde.'+aguardeId+'.render(document.body)');
		eval ('YAHOO.aguarde.'+aguardeId+'.moveTo('+imagemxi+','+imagemyi+')');
		eval('YAHOO.aguarde.'+aguardeId+'.show()');
	};
	this.fecha = function(aguardeId)
	{
		if ($i("wait"))
		{
			if (eval('YAHOO.aguarde.'+aguardeId))
			{
				if ($i(eval('YAHOO.aguarde.'+aguardeId+".id")))
				{eval('YAHOO.aguarde.'+aguardeId+'.destroy()');}
			}
		}
	};
}
/*
Function: ativaClicks

Ativa as opera��es de clique sobre o mapa

Define o que ser� executado quando o mouse � clicado ou movido sobre o mapa
*/
function ativaClicks(docMapa)
{
	docMapa.onmouseover = function()
	{
		if ($i("imgh")){$i("imgh").style.display="block";}
		if ($i("janelaMenu"))
		{$i("janelaMenu").style.display="none";}
		this.src=g_quadrooriginal;
		//verifica se o mouse esta parado
		if (objmapa.parado!="cancela")
		{
			objmapa.parado="nao";
			verificaTip();
		}
		if ($i("tip"))
		{$i("tip").style.display="none";}
		this.onmousemove=function(exy)
		{
			if ($i("tip"))
			{$i("tip").style.display="none";}
			capturaposicao(exy);
			if (g_destaca != "")
			{$i("imgh").style.display="none";$i("div_d").style.clip = 'rect('+(objposicaocursor.imgy - destacaTamanho)+" "+(objposicaocursor.imgx - 10)+" "+(objposicaocursor.imgy - 10)+" "+(objposicaocursor.imgx - destacaTamanho)+')';}
			if (g_realca == "sim")
			{
				$i("areaRealce").style.left = objposicaocursor.telax - destacaTamanho + 10;
				$i("areaRealce").style.top = objposicaocursor.telay - destacaTamanho + 10;
			}
			if ($i("img") && (g_panM == "sim"))
			{
				var nx = objposicaocursor.telax - leftinicial - clicinicialx;
				var ny = objposicaocursor.telay - topinicial - clicinicialy;
				if (g_entorno == "nao")
				{
					var l = 0;
					if (parseInt($i("i3geo").style.left))
					{var l = parseInt($i("i3geo").style.left);}
					$i("img").style.left = nx - l;
					var t = 0;
					if (parseInt($i("i3geo").style.top))
					{var t = parseInt($i("i3geo").style.top);}
					$i("img").style.top = ny - t;
				}
				else
				{
					$left("img",objmapa.w*-1 + nx);
					$left("imgS",objmapa.w*-1 + nx);
					$left("imgL",objmapa.w + nx);
					$left("imgO",objmapa.w*-3 + nx);
					$left("imgN",objmapa.w*-1 + nx);
					$top("img",objmapa.h*-1 + ny);
					$top("imgS",objmapa.h*-1 + ny);
					$top("imgL",objmapa.h*-1 + ny);
					$top("imgN",objmapa.h*-1 + ny);
					$top("imgO",objmapa.h*-1 + ny);
				}
			}
			movecursor();
			if ($i("longlat"))
			{$i("longlat").innerHTML = objposicaocursor.dmsx + "   " +  objposicaocursor.dmsy;}
			if (g_tipoacao == "mede")
			{
				$i("mostradistancia").style.display="block";
				var n = pontosdistobj.xpt.length;
				if (n > 0)
				{
					var d = calculadistancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy);
					if (objmapa.scale > 500000)
					{
						var d = parseInt(d);
					}
					else
					{
						d= d + "";
						d = d.split(".");
						var decimal = d[1].substr(0,3);
						d = d[0]+"."+decimal;
						d = d * 1;
					}
					var da = d + pontosdistobj.dist[n-1];
					if ($i("mostradistancia"))
					{$i("mostradistancia").innerHTML = " Dist acum.= "+da+" atual= "+d+" km";}
				}
			}
			movelentef();
			//desloca cursor de zoom box
			if (((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox")) && ($i("box1").style.visibility == "visible"))
			{zoomboxf("desloca");}
		};
	};
	docMapa.onmouseout = function()
	{
		objmapa.parado="parar";
		mostradicasf(this,'');
		if ($i("imgh")){$i("imgh").style.display="none";}
	};
	docMapa.onmousedown = function()
	{
		$i("imgh").style.display="none";
		//verifica se esta na opï¿½o de zoom box
		if ((g_tipoacao == "zoomli") || (g_tipoacao == "selecaobox"))
		{
			// inicia retï¿½gulo de zoom
			$i("imgh").style.display="none";
			with($i("box1").style)
			{width=0;height=0;visibility="visible";}
			boxxini = objposicaocursor.telax;
			boxyini = objposicaocursor.telay;
			tamanhox = 0;
			tamanhoy = 0;
		}
		if ($i("img") && (g_tipoacao == "pan"))
		{
			g_panM = "sim";
			leftinicial = parseInt($i("corpoMapa").style.left);
			topinicial = parseInt($i("corpoMapa").style.top);
			clicinicialx = objposicaocursor.imgx;
			clicinicialy = objposicaocursor.imgy;
			ddinicialx = objposicaocursor.ddx;
			ddinicialy = objposicaocursor.ddy;
		}
	};
	docMapa.onclick = function()
	{
		//verifica se esta na opcao de identificacao
		if (g_tipoacao == "identifica")
		{
			wdocaf("450px","250px",g_locaplic+'/ferramentas/identifica/index.htm?&x='+objposicaocursor.ddx+'&y='+objposicaocursor.ddy+'&escala='+objmapa.scale,"","","Identifica");
		}
		if (g_tipoacao == "mede")
		{
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			pontosdistobj.dist[n] = 0;
			if (n > 0)
			{
				var d = parseInt(calculadistancia(pontosdistobj.xpt[n-1],pontosdistobj.ypt[n-1],objposicaocursor.ddx,objposicaocursor.ddy));
				pontosdistobj.dist[n] = d + pontosdistobj.dist[n-1];
			}
			inseremarcaf(objposicaocursor.telax,objposicaocursor.telay);
		}
		//insere pontos
		if (g_tipoacao == "inserexy")
		{
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			if ($i("wdoca").style.display == "none")
			{wdocaf("270px","200px",g_locaplic+'/ferramentas/inserexy2/index.htm',"");}
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var ins = doc.getElementById("resultado").innerHTML;
			ins = ins + "<div style='font-size:12px' >" + objposicaocursor.ddx +" " + objposicaocursor.ddy + "</div><br>";
			doc.getElementById("resultado").innerHTML = ins;
			if (g_nomepin == ""){alert("Nenhum tema definido para editar");}
			else
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=insereSHP&tema="+g_nomepin+"&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2);
				cp.set_response_type("JSON");
				cp.call(p,"insereSHP",ajaxredesenha);
			}
		}
		//insere graficos
		if (g_tipoacao == "inseregrafico")
		{
			if ($i("wdoca").style.display == "none")
			{wdocaf("270px","200px",g_locaplic+'/ferramentas/inseregrafico/index.htm',"");}
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var tema = doc.getElementById("temasLigados").value;
			var width = doc.getElementById("w").value;
			var inclinacao = doc.getElementById("inclinacao").value;
			var shadow_height = doc.getElementById("sombra").value;
			if (tema == ""){alert("Nenhum tema definido para pegar os dados");}
			else
			{
				var itens = doc.getElementById("listadeitens").value;;
				if (itens == "")
				{alert("Nenhum item foi escolhido");}
				else
				{
					objaguarde.abre("ajaxredesenha","Aguarde...");
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=insereSHPgrafico&tipo=pizza&tema="+tema+"&x="+objposicaocursor.ddx+"&y="+objposicaocursor.ddy+"&itens="+itens+"&shadow_height="+shadow_height+"&width="+width+"&inclinacao="+inclinacao+"&g_sid="+g_sid;
					var cp = new cpaint();
					//cp.set_debug(2);
					cp.set_response_type("JSON");
					cp.call(p,"insereSHPgrafico",ajaxredesenha);
				}
			}
		}
		//insere toponimo
		if (g_tipoacao == "textofid")
		{
			var n = pontosdistobj.xpt.length;
			pontosdistobj.xpt[n] = objposicaocursor.ddx;
			pontosdistobj.ypt[n] = objposicaocursor.ddy;
			if ($i("wdoca").style.display == "none")
			{textofid();}
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var texto = doc.getElementById("texto").value;
			texto = htmlAcentos(texto);
			var f = doc.getElementById("fonte").value;
			var t = doc.getElementById("tamanho").value;
			var a = doc.getElementById("angulo").value;
			var cf = doc.getElementById("fundoc").value;
			if (cf == ""){cf = "off";}
			var cs = doc.getElementById("sombra").value;
			if (cs == ""){cs = "off";}
			var xs = doc.getElementById("sombrax").value;
			var ys = doc.getElementById("sombray").value;
			var c = doc.getElementById("frente").value;
			var m = doc.getElementById("mascara").value;
			if (m == ""){m = "off";}
			var fcs = doc.getElementById("frentes").value;
			if (fcs == ""){fcs = "off";}
			var fxs = doc.getElementById("frentex").value;
			var fys = doc.getElementById("frentey").value;
			var forca = doc.getElementById("force").value;
			var md = doc.getElementById("mindistance").value;
			var mf = doc.getElementById("minfeaturesize").value;
			var ox = doc.getElementById("offsetx").value;
			var oy = doc.getElementById("offsety").value;
			var pl = doc.getElementById("partials").value;
			var pos = doc.getElementById("position").value;
			objaguarde.abre("ajaxredesenha","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inserefeature&pin="+g_nomepin+"topo&tipo=ANNOTATION&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&texto="+texto+"&position="+pos+"&partials="+pl+"&offsetx="+ox+"&offsety="+oy+"&minfeaturesize="+mf+"&mindistance="+md+"&force="+forca+"&shadowcolor="+fcs+"&shadowsizex="+fxs+"&shadowsizey="+fys+"&outlinecolor="+m+"&cor="+c+"&sombray="+ys+"&sombrax="+xs+"&sombra="+cs+"&fundo="+cf+"&angulo="+a+"&tamanho="+t+"&fonte="+f+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2);
			cp.set_response_type("JSON");
			cp.call(p,"insereFeature",ajaxredesenha);
		}
		//seleciona
		if (g_tipoacao == "selecao")
		{
			var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			var tipo = "adiciona";
			//pega o tipo de operacao da janela de selecao
			if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
			if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
			//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
			if ((tipo != "limpa") && (tipo != "inverte"))
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=selecaopt&tema="+objmapa.temaAtivo+"&tipo="+tipo+"&xy="+objposicaocursor.ddx+" "+objposicaocursor.ddy+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"selecaoPT",ajaxredesenha);
			}
		}
		objmapa.verificaClickMapa();
	};
	docMapa.onmouseup = function()
	{
		if (g_tipoacao == "zoomli"){zoomboxf("termina");}
		if (g_tipoacao == "selecaobox"){zoomboxf("termina");}
		if ($i("img") && (g_tipoacao == "pan"))
		{
			g_panM = "nao";
			var disty = (ddinicialy * -1) + objposicaocursor.ddy; //teladd[1]
			var distx = (ddinicialx * -1) + objposicaocursor.ddx; //teladd[0]
			var ex = objmapa.extent;
			var ex = ex.split(" ");
			var novoxi = (ex[0] * 1) - distx;
			var novoxf = (ex[2] * 1) - distx;
			var novoyi = (ex[1] * 1) - disty;
			var novoyf = (ex[3] * 1) - disty;
			if ((distx == 0)||(disty == 0))
			{
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&x="+objposicaocursor.imgx+"&y="+objposicaocursor.imgy+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"pan",ajaxredesenha);
				return;
			}
			var nex = novoxi+" "+novoyi+" "+novoxf+" "+novoyf;
			objaguarde.abre("ajaxredesenha","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+nex+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"mudaExtensao",ajaxredesenha);
		}
	};
}
/*
Section: navega��o
*/
/*
Function: initJanelaZoom

Abre a janela com as ferramentas de zoom

Parametros:

qual - Qual janela (1 ou 2)
*/
function initJanelaZoom(qual)
{
	//janela de botoes 1
	if(navn){var wj = "36px";}
	else{var wj = "36px";}
	if(navn){var recuo = "0px";}
	else{var recuo = "0px";}	
	if ((qual == 1) && (!$i("maisBotoes1")))
	{
		var novoel = document.createElement("div");
		novoel.id = "janelaBotoes1";
		novoel.style.display="block";
		if (navm)
		{novoel.style.filter='alpha(opacity=90)';}
		else
		{novoel.style.opacity= .85;}
		novoel.style.border="1px solid gray";
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" style="background-color:rgb(250,250,250);width='+wj+'px"  >';
		//barra de zoom
		if ($i("zoomli"))
		{
			if (navn){temp += '<div style="text-align:center;position:relative;left:9px" >';}
			temp += '<div id="vertMaisZoom" onmouseover="mostradicasf(this,\'Amplia o mapa mantendo o centro atual.\',\'\')" onclick="zoomiauto()" ></div><div id="vertBGDiv" name="vertBGDiv" tabindex="0" x2:role="role:slider" state:valuenow="0" state:valuemin="0" state:valuemax="200" title="Zoom" >';
			temp += '<div id="vertHandleDiv" ><img alt="" src="'+$im("slider.png")+'" /></div></div>';
			temp += '<div id=vertMenosZoom onmouseover="mostradicasf(this,\'Reduz o mapa mantendo o centro atual.\',\'\')" onclick="zoomoauto()"  ></div>';
			if (navn){temp += '</div>';}
		}
		temp += '<div id="maisBotoes1" style="left:'+recuo+'" ></div></div>';
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		//copia os botoes do HTML para a janela
		if ($i("barraDeBotoes1"))
		{
			$i("maisBotoes1").innerHTML = $i("barraDeBotoes1").innerHTML+"<table><tr><td>&nbsp;</td></tr></table>";
			$i("barraDeBotoes1").innerHTML = "";
		}
		YAHOO.namespace("janelaBotoes1.xp");
		YAHOO.janelaBotoes1.xp.panel = new YAHOO.widget.Panel("janelaBotoes1", {width:wj, fixedcenter: false, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaBotoes1.xp.panel.render();
		verticalSlider = YAHOO.widget.Slider.getVertSlider("vertBGDiv","vertHandleDiv", 0, 70);
		verticalSlider.onChange = function(offsetFromStart)
		{g_fatordezoom = (offsetFromStart - 35) / 5;};
		verticalSlider.setValue(35,true);
		if ($i("vertBGDiv"))
		{
			$i("vertBGDiv").onmouseup = function()
			{
				aplicaescala();
				g_fatordezoom = 0;
				verticalSlider.setValue(35,true);
			};
		}
		//altera o tamanho da imagem do mapa
		if($i("vertHandleDiv"))
		{
			$i("vertHandleDiv").onmousemove = function()
			{
				var nw = objmapa.w;
				var nh = objmapa.h;
				var nt = 0;
				var nl = 0;
				var ns = parseInt(objmapa.scale);
				if ((g_fatordezoom > 0) && (g_fatordezoom < 7))
				{
					g_fatordezoom = g_fatordezoom + 1;
					var velhoh = parseInt($i("img").style.height);
					var velhow = parseInt($i("img").style.width);
					nh = objmapa.h / g_fatordezoom;
					nw = objmapa.w / g_fatordezoom;
					var t = parseInt($i("img").style.top);
					var l = parseInt($i("img").style.left);
					nt=t + ((velhoh - nh)*.5);
					if (navm){nl=0;}
					else
					{nl=l + ((velhow - nw)*.5);}
					var fatorEscala = nh/objmapa.h;
					ns=parseInt(objmapa.scale / fatorEscala);
				}
				if ((g_fatordezoom < 0) && (g_fatordezoom > -7))
				{
					g_fatordezoom = g_fatordezoom - 1;
					var velhoh = parseInt($i("img").style.height);
					var velhow = parseInt($i("img").style.width);
					nh = objmapa.h * g_fatordezoom * -1;
					nw = objmapa.w * g_fatordezoom * -1;
					var t = parseInt($i("img").style.top);
					var l = parseInt($i("img").style.left);
					nt = t - ((nh - velhoh)*.5);
					nl = l - ((nw - velhow)*.5);
					var fatorEscala = nh/objmapa.h;
					ns=parseInt(objmapa.scale / fatorEscala);
				}
				$i("img").style.width = nw;
				$i("img").style.height = nh;
				$top("img",nt);
				$left("img",nl);
				if ($i("escalanum"))
				{$i("escalanum").value=ns;}
			};
		}		
		return;
	}
	if ((qual == 1) && ($i("maisBotoes1")))
	{YAHOO.janelaBotoes1.xp.panel.show();}
	//janela de botoes 2
	if ((qual == 2) && (!$i("maisBotoes2")))
	{
		var novoel = document.createElement("div");
		novoel.id = "janelaBotoes2";
		novoel.style.display="block";
		if (navm)
		{novoel.style.filter='alpha(opacity=90)';}
		else
		{novoel.style.opacity= .85;}
		novoel.style.border="1px solid gray";
		var temp = '<div class="hd">&nbsp;</div>';
		temp += '<div class="bd" style="background-color:rgb(250,250,250);width='+wj+'px"  >';		
		temp += '<div id="maisBotoes2" style="left:'+recuo+';top:-6px;"  ></div></div>';
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		//copia os botoes do HTML para a janela
		if ($i("barraDeBotoes2"))
		{
			$i("maisBotoes2").innerHTML = $i("barraDeBotoes2").innerHTML;
			$i("barraDeBotoes2").innerHTML = "";
		}
		YAHOO.namespace("janelaBotoes2.xp");
		YAHOO.janelaBotoes2.xp.panel = new YAHOO.widget.Panel("janelaBotoes2", {width:wj, fixedcenter: false, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
		YAHOO.janelaBotoes2.xp.panel.render();
		return;
	}
	if ((qual == 2) && ($i("maisBotoes2")))
	{YAHOO.janelaBotoes2.xp.panel.show();}
}
/*
Function: initJanelaRef

Abre a janela com o mapa de referencia

*/
function initJanelaRef()
{
	if (!$i("winRef"))
	{
		var novoel = document.createElement("div");
		novoel.id = "winRef";
		novoel.style.display="none";
		var ins = '<div class="hd">Refer&ecirc;ncia</div>';
		ins += '<div class="bd" style="text-align:left;padding:3px;" id="mapaReferencia" onmouseover="javascript:movimentoRef(this)" onclick="javascript:clicouRef()">';
		ins += '<img style="cursor:pointer;" id=imagemReferencia src="" />';
		ins += '<div style="text-align:left;font-size:0px" id="refmensagem" ></div></div>';
		novoel.innerHTML = ins;
		novoel.style.borderColor="gray";
		document.body.appendChild(novoel);
		$i("imagemReferencia").style.height = objmapa.refheight+"px";
	}
	$i("winRef").style.display = "block";
	YAHOO.namespace("janelaRef.xp");
	YAHOO.janelaRef.xp.panel = new YAHOO.widget.Panel("winRef", { width:"156px", fixedcenter: false, constraintoviewport: true, underlay:"shadow", close:true, visible:true, draggable:true, modal:false } );
	YAHOO.janelaRef.xp.panel.render();
	if (navm){YAHOO.janelaRef.xp.panel.moveTo((imagemxi+objmapa.w-160),imagemyi+4);}
	else
	{YAHOO.janelaRef.xp.panel.moveTo((imagemxi+objmapa.w-160),imagemyi+4);}
	var escondeRef = function()
	{
		YAHOO.util.Event.removeListener(YAHOO.janelaRef.xp.panel.close, "click");
		YAHOO.janelaRef.xp.panel.destroy();	
		iCookie("g_mapaRefDisplay","none");	
	};
	YAHOO.util.Event.addListener(YAHOO.janelaRef.xp.panel.close, "click", escondeRef);	
	iCookie("g_mapaRefDisplay","block");
	objmapa.atualizaReferencia();
}
/*
Function: mudaboxnf

Posiciona o botao aplicar quando o check box que liga/desliga um tema � pressionado.

Par�metros:

tipo - de onde veio a requisicao ligadesliga|adicionatema
*/
function mudaboxnf(tipo)
{
	g_operacao = tipo;
	clearTimeout(objmapa.tempo);
	objmapa.tempo = setTimeout('remapaf()',(4000));
	autoRedesenho("reinicia");
	if ($i("aplicari"))
	{
		$i("aplicari").style.display="block";
		if (navm)
		{
			mx = objposicaomouse.x - 10;
			my = objposicaomouse.y - 15;
			with ($i("aplicari").style)
			{
				pixelLeft = mx+document.body.scrollLeft;
				pixelTop = my+document.body.scrollTop;
			}
		}
		if (navn)
		{
			var l = objposicaomouse.x;
			var t = objposicaomouse.y+document.body.scrollTop;
			with ($i("aplicari").style)
			{
				left = l;
				top = t;
			}
		}
	}
}
/*
Function: movelentef

Move a imagem na lente de aumento conforme o moveimento do mouse sobre o mapa.
*/
function movelentef()
{
	if ($i("lente"))
	{
		if ($i("lente").style.visibility=="visible")
		{
			var esq = (objposicaocursor.telax - imagemxi) * 2.25;
			var topo = (objposicaocursor.telay - imagemyi) * 2.25;
			var clipt = "rect("+ (topo - 40) + " " + (esq + 40) + " " + (topo + 40) + " " + (esq - 40) +")";
			with ($i("lente").style)
			{
				clip = clipt;
				eval (g_tipotop + "= (imagemyi - (topo - 40)) + g_postpx");
				eval (g_tipoleft +  "= (imagemxi - (esq - 40)) + g_postpx");
			}
		}
	}
}
/*
Function: zoomiauto

Aproxima o mapa tendo o centro como refer�ncia.
*/
function zoomiauto()
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	g_fatordezoom = 0;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=aproxima&nivel=2&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"aproxima",ajaxredesenha);
}
/*
Function: zoomoauto

Afasta o mapa tendo o centro como refer�ncia.
*/
function zoomoauto()
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	g_fatordezoom = 0;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=afasta&nivel=2&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"afasta",ajaxredesenha);
}
/*
Function: zoomboxf

Faz o zoom no mapa utilizando a op��o de desenhar um ret�ngulo.

As coordenadas de tela devem estar no objeto "objposicaocursor".
A op��o "desloca" altera a posi��o do box (box1) na tela. A op��o "termina", pega as coordenadas
de tela do box1 e chama a fun��o ajax que redesenha o mapa.

Parameters:

tipo - desloca|termina
*/
function zoomboxf (tipo)
{
	var bx = $i("box1");
	switch(tipo)
	{
		case "desloca":
		// muda o ret�gulo de zoom conforme deslocamento do mouse
		ppx = objposicaocursor.telax;
		py = objposicaocursor.telay;
		if (navn)
		{
			if (ppx > boxxini)
			{with(bx.style){width = ppx - boxxini - 15 + "px";}}
			if (py > boxyini)
			{with(bx.style){height = py - boxyini - 15 + "px";}}
			if (ppx < boxxini)
			{with(bx.style){left = ppx + "px";width = boxxini - ppx + 15 + "px";}}
			if (py < boxyini)
			{with(bx.style){top = py + "px";height = boxyini - py + 15 + "px";}}
		}
		if (navm)
		{
			if (ppx > boxxini)
			{with(bx.style){width = ppx - boxxini - 2;}}
			if (py > boxyini)
			{with(bx.style){height = py - boxyini - 2;}}
			if (ppx < boxxini)
			{with(bx.style){left = ppx;width = boxxini - ppx + 2;}}
			if (py < boxyini)
			{with(bx.style){top = py;height = boxyini - py + 2;}}
		}
		break;
		case "termina":
		// finaliza o ret�gulo de zoom
		md = 1;
		eval ('pix = parseInt(document.getElementById("box1").style.' + g_tipoleft + ")");
		eval ('piy = parseInt(document.getElementById("box1").style.' + g_tipotop + ")");
		xfig0 = parseInt(bx.style.width) - imagemxi;
		yfig0 = parseInt(bx.style.height) - imagemyi;
		xfig = pix + (parseInt(bx.style.width)) - imagemxi;
		yfig = piy + (parseInt(bx.style.height)) - imagemyi;
		amext = objmapa.extent.split(" ");
		dx = ((amext[0] * -1) - (amext[2] * -1)) / (tamanhox - 1);
		dy = ((amext[1] * 1) - (amext[3] * 1)) / (tamanhoy - 1);
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x1 = (amext[0] * 1) + nx;
		y1 = (amext[3] * 1) - ny;
		xfig = pix - imagemxi;
		yfig = piy - imagemyi;
		if (dy < 0) dy=dy * -1;
		nx = g_celula * xfig;
		ny = g_celula * yfig;
		x2 = (amext[0] * 1) + nx;
		y2 = (amext[3] * 1) - ny;
		v = x2+" "+y2+" "+x1+" "+y1;
		// se o retangulo for negativo pula essa parte para n� gerar erro
		if (g_tipoacao != "selecaobox")
		{
			if (x1 != x2)
			{
				objmapa.extent=v;
				objaguarde.abre("ajaxredesenha","Aguarde...");
				var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+v+"&g_sid="+g_sid;
				var cp = new cpaint();
				//cp.set_debug(2)
				cp.set_response_type("JSON");
				cp.call(p,"mudaExtensao",ajaxredesenha);
			}
		}
		else
		{
			if (x1 != x2)
			{
				var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
				var tipo = "adiciona";
				//pega o tipo de operacao da janela de selecao
				if (doc.getElementById("tipoOperacao")){tipo = doc.getElementById("tipoOperacao").value;}
				if (objmapa.temaAtivo == ""){alert("Nenhum tema ativo");return;}
				//se tipo for limpa ou inverte, a operacao nao e executada no clique no mapa
				if ((tipo != "limpa") && (tipo != "inverte"))
				{
					objaguarde.abre("ajaxredesenha","Aguarde...");
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=selecaobox&ext="+v+"&g_sid="+g_sid+"&tipo="+tipo+"&tema="+objmapa.temaAtivo;
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_response_type("JSON");
					cp.call(p,"selecaobox",ajaxredesenha);
				}
			}
		}		
		with(bx.style){visibility="hidden";width = 0; height = 0;}
		document.getElementById("imgh").style.display="block";
		break;
	}
}
/*
Function: zoomIP

Localiza no mapa o usu�rio baseado em seu n�mero IP.
*/
function zoomIP()
{
	var xxx = convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
	var yyy = convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
	var mostraIP = function(retorno)
	{
		if (retorno.data.latitude != null)
		{
			objaguarde.abre("ajaxredesenha","Aguarde...");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&tamanho=14&xy="+retorno.data.longitude+" "+retorno.data.latitude+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"zoomPonto",ajaxredesenha);
		}
		else
		{alert("Nao foi possivel identificar a localizacao.");}
	};
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=localizaIP&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"localizaIP",mostraIP);	
}
/*
Function: zoomPonto

Localiza uma coordenada no mapa.
*/
function zoomPonto()
{
	if ($i("xg"))
	{
		var xxx = convdmsddf($i("xg").value,$i("xm").value,$i("xs").value);
		var yyy = convdmsddf($i("yg").value,$i("ym").value,$i("ys").value);
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=zoomponto&pin=pin&xy="+xxx+" "+yyy+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"zoomPonto",ajaxredesenha);
	}
}
/*
Function: clicouRef

Altera a abrang�ncia do mapa quando o mapa de refer�ncia � clicado

*/
function clicouRef()
{
	objposicaocursor.refx = objposicaocursor.refx - parseInt(YAHOO.janelaRef.xp.panel.element.style.left) - 5;
	objposicaocursor.refy = objposicaocursor.refy - parseInt(YAHOO.janelaRef.xp.panel.element.style.top) - 25;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&tipo=ref&x="+objposicaocursor.refx+"&y="+objposicaocursor.refy+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"pan",ajaxredesenha);
}
/*
Function: movimentoRef

Pega a coordenada do cursor sobre o mapa de refer�ncia

*/
function movimentoRef(obj)
{
	obj.onmousemove =function(exy)
	{
		if (navm){capturaposicao(obj);}
		else{capturaposicao(exy);}
	};
}
/*
Function: aplicaescala

Aplica a escala numerica definida no formul�rio existente no mapa.
*/
function aplicaescala()
{
	if ($i("escalanum"))
	{var nova = $i("escalanum").value;}
	else
	{ var nova = objmapa.scale;}
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaescala&escala="+nova+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "outras";
	cp.call(p,"mudaEscala",ajaxredesenha);
}
/*
Function: zoomtot

Zoom para a extens�o default.
*/
function zoomtot()
{
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+objmapa.extentTotal+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"mudaExtensao",ajaxredesenha);
}
/*
Function: panFixo

Desloca o mapa em uma dire��o determinada.
*/
function panFixo(direcao)
{
	if (direcao == "norte")
	{
		var y = objmapa.h / 6;
		var x = objmapa.w / 2;
	}
	if (direcao == "sul")
	{
		var y = objmapa.h - (objmapa.h / 6);
		var x = objmapa.w / 2;
	}
	if (direcao == "leste")
	{
		var x = objmapa.w - (objmapa.w / 6);
		var y = objmapa.h / 2;
	}
	if (direcao == "oeste")
	{
		var x = objmapa.w / 6;
		var y = objmapa.h / 2;
	}
	objaguarde.abre("ajaxredesenha","Aguarde...");
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pan&escala="+objmapa.scale+"&x="+x+"&y="+y+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	g_operacao = "navega";
	cp.call(p,"pan",ajaxredesenha);
}
/*
Function: ativaEntorno

Ativa ou desativa a carga do entorno.

Com o entorno ativo, s�o produzidas imagens no entorno do mapa, no estilo Google.
*/
function ativaEntorno()
{
	//if (navn)
	//{alert("op��o em desenvolvimento");return;}
	if (g_entorno == "sim")
	{
		var letras=["L","O","N","S"];
		for (l=0;l<letras.length; l++)
		{
			if ($i("img"+letras[l]))
			{
				$i("img"+letras[l]).style.display = "none";
				$i("img"+letras[l]).src = "";
			}
		}
		$left("img",0);
		$top("img",0);
		g_entorno = "nao";
		alert("Entorno desativado");
		$i("img").style.visibility = "visible";
		$i("img").style.display = "block";
	}
	else
	{
		geraURLentorno();
		var letras=["L","O","N","S"];
		for (l=0;l<letras.length; l++)
		{
			if ($i("img"+letras[l]))
			{
				$i("img"+letras[l]).style.width = objmapa.w;
				$i("img"+letras[l]).style.height = objmapa.h;
				$i("img"+letras[l]).style.display = "block";
			}
		}
		g_entorno = "sim";
		ajustaEntorno();
		alert("Entorno ativado. o desenho do mapa pode demorar mais.");
	}
}
/*
Function: geraURLentorno

Gera as urls que far�o parte dos divs de desenho do entorno do mapa
*/
function geraURLentorno()
{
	var nny = (objmapa.h / 2) * -1;
	var nnx = objmapa.w / 2;
	var sy = objmapa.h + (objmapa.h / 2);
	var sx = objmapa.w / 2;
	var lx = objmapa.w + (objmapa.w / 2);
	var ly = objmapa.h / 2;
	var ox = (parseInt(objmapa.w/2)) * -1;
	var oy = objmapa.h / 2;
	var u = window.location.protocol+"\/\/"+window.location.host+objmapa.cgi+"?map="+objmapa.mapfile;
	u += "&mode=map&imgext="+objmapa.extent+"&mapsize="+nnx+" "+oy+"&map_scalebar_status=off";
	var sul = u+"&imgxy="+sx/2+" "+sy/2;
	var norte = u+"&imgxy="+nnx/2+" "+nny/2;
	var leste = u+"&imgxy="+lx/2+" "+ly/2;
	var oeste = u+"&imgxy="+ox/2+" "+oy/2;
	$i("imgS").src=sul;
	$i("imgN").src=norte;
	$i("imgL").src=leste;
	$i("imgO").src=oeste;
}
/*
Function: ajustaEntorno

Ajusta o tamanho do mapa e das imagens do entorno
*/
function ajustaEntorno()
{
	$left("img",objmapa.w*-1);
	$left("imgS",objmapa.w*-1);
	$left("imgL",objmapa.w);
	$left("imgO",objmapa.w*-3);
	$left("imgN",objmapa.w*-1);
	$top("img",objmapa.h*-1);
	$top("imgS",objmapa.h*-1);
	$top("imgL",objmapa.h*-1);
	$top("imgN",objmapa.h*-1);
	$top("imgO",objmapa.h*-1);
}
/*
Section: atributos
*/
/*
Function: buscaRapida

Realiza a busca por palavra no servi�o geonames do MMA

Chama o web service e mostra os resultados na tela
*/
function buscaRapida()
{
	if (!$i("boxg"))
	{
		var novoel = document.createElement("div");
		novoel.id = "boxg";
		novoel.style.zIndex=5000;
		novoel.innerHTML = '<font face="Arial" size="0"></font>';
		document.body.appendChild(novoel);
	}
	if ($i("buscaRapida"))
	{
		if ($i("valorBuscaRapida").value == "")
		{alert ("Digite uma palavra para busca!");return;}
		wdocaf("300px","280px",g_locaplic+"/ferramentas/buscarapida/index.htm","","","Busca rapida");
	}
}
/*
Function: verificaTip

Verifica se a op��o de identifica��o est� ativa e se o mouse est� parado.
Se o mouse estiver parado, chama a fun��o de mostrar tip.
*/
function verificaTip()
{
	//insere div para tips
	if (!$i("tip"))
	{
		var novoel = document.createElement("div");
		novoel.id = "tip";
		novoel.style.position="absolute";
		if (navm)
		{novoel.style.filter = "alpha(opacity=90)";}
		document.body.appendChild(novoel);
	}
	if ((objmapa.parado == "parar") || (objmapa.parado=="cancela")){return;}
	if ((objmapa.parado == "sim") && (g_operacao == "identifica") && ($i("tip").style.display!="block"))
	{
		$i("tip").style.top = objposicaocursor.telay +20;
		$i("tip").style.left = objposicaocursor.telax;
		$i("tip").innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>Pesquisando...</td></tr></table>";
		$i("tip").style.display="block";
		eval(g_funcaoTip);
	}
	//mostra op��o sobre o mouse quando est� na fun��o pan
	if (($i("box1")) && (objmapa.parado == "sim") && (document.getElementById("imgh").style.display=="block") && ($i("box1").style.visibility != "visible"))
	{
		if ((g_tipoacao == "zoomli") || (g_tipoacao == "zoomlo") || (g_tipoacao == "pan"))
		{
			if(g_mostraRosa == "sim")
			{
				if (navm)
				{$i("tip").style.filter = "alpha(opacity=0)";}
				else
				{$i("tip").style.opacity="5";}
				var setas = "<table id='rosaV' ><tr>";
				if (navm){var s = " style=\"filter:'alpha(opacity=0)'\" ";}
				if (navn){var s = " style='opacity:0' ";}
				setas += "<td "+s+" ></td>";
				setas += "<td><img title='norte' src='"+$im("rosanorte.png")+"' onclick=\"panFixo('norte')\" /></td>";
				setas += "<td "+s+" ></td></tr>";
				setas += "<tr><td><img title='oeste' src='"+$im("rosaoeste.png")+"' onclick=\"panFixo('oeste')\" /></td>";
				setas += "<td><table><tr>";
				setas += "<td><img title='aproxima' onclick='zoomiauto()' src='"+$im("rosacentrol.png")+"' </td>";
				setas += "<td><img title='afasta' onclick='zoomoauto()' src='"+$im("rosacentroo.png")+"' </td>";
				setas += "</tr></table></td>";
				setas += "<td><img title='leste' src='"+$im("rosaleste.png")+"' onclick=\"panFixo('leste')\" /></td></tr>";
				setas += "<tr><td "+s+" ></td><td><img title='sul' src='"+$im("rosasul.png")+"' onclick=\"panFixo('sul')\" /></td><td "+s+" ></td></tr></table>";
				$i("tip").innerHTML = setas;
				$i("tip").style.top = objposicaocursor.telay - 27;
				$i("tip").style.left = objposicaocursor.telax - 27;
				$i("tip").style.display="block";
				//anim.animate();
				mostradicasf('','Clique nas pontas da rosa para navegar no mapa. Clique em x para parar de mostrar essa op��o.','');
				return;
			}
		}
	}
	if ((objmapa.parado!="cancela") && ($i("tip").style.display!="block"))
	{objmapa.parado = "sim";}
	setTimeout('verificaTip()',g_tempotip);
}
/*
Function: verificaTipDefault

Executa a opera��o de identifica��o para mostrar um TIP.

Esta � a fun��o default, definida na vari�vel g_funcaoTip
*/
function verificaTipDefault()
{
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=identifica&opcao=tip&xy="+objposicaocursor.ddx+","+objposicaocursor.ddy+"&resolucao=5&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_persistent_connection(true);
	cp.set_response_type("JSON");
	cp.call(p,"identifica",mostraTip);
}
/*
Function: mostraTip

Mostra a descri��o de um elemento do mapa como um tip na posi��o do mouse.

Para que um tema tenha um tip, � necess�rio configurar o metadata TIP no map file.

Parameters:

retorno - retorno da fun��o ajax.
*/
function mostraTip(retorno)
{
	var retorno = retorno.data;
	if ((retorno != "erro") && (retorno != undefined))
	{
		if ($i("img"))
		{$i("img").title = "";}
		if (retorno != "")
		{
			var res = "<div id='cabecatip' style='text-align:left;background-color:rgb(240,240,240)'><span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapa.parado=\"cancela\"'>parar&nbsp;&nbsp;</span>";
			res += "<span style='color:navy;cursor:pointer;text-align:left' onclick='javascript:objmapa.objtips.push($i(\"tip\"));$i(\"tip\").id=\"\";$i(\"cabecatip\").innerHTML =\"\";$i(\"cabecatip\").id =\"\"' >fixar</span></div>";
			var temas = retorno.split("!");
			for (tema=0;tema<temas.length; tema++)
			{
				var titulo = temas[tema].split("@");
				if (g_tipotip == "completo")
				{
					res += "<span style='text-align:left;font-size:9pt'><b>"+titulo[0]+"</b></span><br>";
				}
				var ocorrencias = titulo[1].split("*");
				for (ocorrencia=0;ocorrencia<ocorrencias.length; ocorrencia++)
				{
					if (ocorrencias[ocorrencia] != "")
					{
						var pares = ocorrencias[ocorrencia].split("##");
						for (par=0;par<pares.length; par++)
						{
							var valores = pares[par].split("#");
							if (g_tipotip == "completo")
							{
								res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'>" + valores[0] + " <i>" + valores[1] + "</i></span><br>";
							}
							else
							{
								res = res + "<span class='tiptexto' style='text-align:left;font-size:9pt'><i>" + valores[1] + "</i></span><br>";
							}
						}
					}
				}
			}
			if ($i("janelaMen"))
			{
				$i("janelaMenTexto").innerHTML = res;
			}
			else
			{
				$i("tip").innerHTML = "<table style='text-align:left'><tr><td style='text-align:left'>"+res+"</td></tr></table>";
				with($i("tip").style){top = objposicaocursor.telay - 10;left = objposicaocursor.telax - 20;display="block";}
			}
		}
	}
}
/*
Section: legenda
*/
/*
Function: legendaGrafico

Mostra a legenda dos gr�ficos adicionados no mapa.

Chamado pela ferramenta de inclus�o de gr�ficos

Par�metros:

par - string com os par�metros item*r,g,b*item....
*/
function legendaGrafico(par)
{
	var temp = par.split("*");
	var par = "<table>";
	for (i=0;i<temp.length; i++)
	{
		var t = temp[i];
		var t = t.split(",");
		par += "<tr style='text-align:left'><td style='background-color:rgb("+t[1]+","+t[2]+","+t[3]+")'>&nbsp;&nbsp;</td><td style='text-align:left'>"+t[0]+"</td></tr>";
	}
	par += "</table>";
	if (!$i("legendagr"))
	{
		var novoel = document.createElement("div");
		var temp = '<div class="hd">Legenda</div>';
		temp += '<div class="bd">';
		temp += '<div id="contemleggr" ></div></div>';
		novoel.id = "legendagr";
		novoel.style.display="block";
		novoel.style.textAlign="left";
		novoel.innerHTML = temp;
		document.body.appendChild(novoel);
		YAHOO.namespace("legendagr.xp");
		YAHOO.legendagr.xp.panel = new YAHOO.widget.Panel("legendagr", {width:"250px", fixedcenter: true, constraintoviewport: false, underlay:"none", close:true, visible:true, draggable:true, modal:false } );
	}
	$i("contemleggr").innerHTML = par;
	YAHOO.legendagr.xp.panel.render();
	YAHOO.legendagr.xp.panel.show();
}
/*
Function: inverteStatusClasse

Ativa ou desativa a visualiza��o de uma classe de um tema.

Parameters:

leg - objeto input clicado no mapa
*/
function inverteStatusClasse(leg)
{
	var classe = leg.value;
	var layer = leg.name;
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=inverteStatusClasse&g_sid="+g_sid+"&tema="+layer+"&classe="+classe;
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("json");
	cp.call(p,"inverteStatusClasse",ajaxredesenha);
}
/*
Section: sistemas de busca e navega��o
*/
/*
Function: atualizagoogle

Atualiza o box do google se a fun��o google estiver ativa
*/
function atualizagoogle()
{
	if (parent.frames["wdocai"])
	{
		if (navn)
		{
			if ($i("wdocai"))
			{var doc = $i("wdocai").contentDocument;}
		}
		else
		{
			if(document.frames("wdocai"))
			{var doc = document.frames("wdocai").document;}
		}
		if(doc)
		{
			if (doc.getElementById("map"))
			{parent.frames["wdocai"].panTogoogle();}
		}
	}
}
/*
Function: atualizascielo

Atualiza a lista de dados na op��o de busca Scielo
*/
function atualizascielo()
{
	if ($i("wdocai"))
	{
		if (parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoscielo"))
			{parent.frames["wdocai"].buscascielo();}
		}
	}
}
/*
Function: atualizaconfluence

Atualiza a lista de dados na op��o de busca confluence
*/
function atualizaconfluence()
{
	if($i("wdocai"))
	{
		if (parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadoconfluence"))
			{parent.frames["wdocai"].buscaconfluence();}
		}
	}
}
/*
Function: atualizawiki

Atualiza a lista de dados na op��o de busca wiki
*/
function atualizawiki()
{
	if ($i("wdocai"))
	{
		if (parent.frames["wdocai"])
		{
			var docel = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
			if (docel.getElementById("resultadowiki"))
			{parent.frames["wdocai"].buscawiki();}
		}
	}
}
/*
Section: menu de temas e outras listagens
*/
/*
Function: procurartemas

Localiza um tema no menu de temas.
*/
function procurartemas()
{
	var procurar = document.getElementById("buscatema").value;
	var resultadoProcurar = function(retorno)
	{
		var retorno = retorno.data;
		if ((retorno != "erro") && (retorno != undefined))
		{
			//var grupos = retorno.grupo;
			var ins = "";
			for (ig=0;ig<retorno.length;ig++)
			{
					var ngSgrupo = retorno[ig].subgrupos;
					for (sg=0;sg<ngSgrupo.length;sg++)
					{
						var nomeSgrupo = ngSgrupo[sg].subgrupo;
						var ngTema = ngSgrupo[sg].temas;
						for (st=0;st<ngTema.length;st++)
						{
								if ( ngTema[st].link != " ")
								{var lk = "<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>";}
								var tid = ngTema[st].tid;
								var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type='checkbox' value='"+tid+"' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" /> ("+nomeSgrupo+")";
								var nomeTema = inp+(ngTema[st].nome)+lk+"<br>";
								ins += nomeTema;
						}
					}
			}
			if (ins != "")
			{
				$i("achados").innerHTML = ins+"<br>";
			}
			else
			{$i("achados").innerHTML = "<span style='color:red'>Nada encontrado<br><br></span>";}
		}
	};
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=procurartemas&procurar="+procurar+"&g_sid="+g_sid;
	var cp = new cpaint();
	//cp.set_debug(2);
	cp.set_response_type("json");
	cp.call(p,"procurartemas",resultadoProcurar);
}
/*
Function: expandeTema

Busca dados sobre um tema quando o bot�o de expandir tema (guia1) � clicado.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeTema(itemID)
{
	var lista = (objmapa.temas).split(";");
	if (!document.getElementById("idx"+itemID))
	{
		for (l=0;l<lista.length; l++)
		{
			var ltema = lista[l].split("*");
			//codigo,status,nome,transparencia,tipo,selecao,escala,download,tem features,conexao,tem wfs
			if (ltema[0] == itemID)
			{
				var farol = "maisamarelo.png";
				if (ltema[8] == undefined){ltema[8] = "nao";}
				if (ltema[6]*1 < objmapa.scale*1)
				{
				 	var farol = "maisverde.png";
				 	var mfarol = "A escala do tema &eacute; compat&iacute;vel com a escala do mapa";
				}
				if (ltema[6]*1 > objmapa.scale*1)
				{
				 	var farol = "maisvermelho.png";
					var mfarol = "A escala do tema &eacute incompat&iacute;vel com a escala do mapa";
				}
				if (ltema[6] == 0)
				{
				 	var farol = "maisamarelo.png";
					var mfarol = "A escala do tema n&atilde;o &eacute conhecida";
				}
				tnome = "&nbsp;<img id='farol"+ltema[0]+"' src='"+$im(farol)+"' title='"+mfarol+"' \>";
				tnome += "&nbsp;<img  id='idx"+ltema[0]+"' src='"+$im("x.gif")+"' title='excluir' onclick='excluitemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para excluir esse tema do mapa.','exclui')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("sobe.gif") +"' title='sobe' onclick='sobetemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para subir esse tema na ordem de desenho','sobe')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("desce.gif") +"' title='desce' onclick='descetemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou descer esse tema na ordem de desenho','desce')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				tnome += "&nbsp;<img src='"+$im("extent.gif") +"' title='zoom para o tema' onclick='zoomtemaf(\""+ltema[0]+"\")' onmouseover=\"javascript:mostradicasf(this,'Clique para ajustar o mapa de forma a mostrar todo o tema','')\" onmouseout=\"javascript:mostradicasf(this,'')\" \>";
				mytreeview1.createItem("temap0"+ltema[0], tnome, imgBranco, false, true, true, ltema[0]);
				if (g_opcoesTemas == "sim")
				{mytreeview1.createItem("opc"+ltema[0], "Op&ccedil;&otilde;es", imgBranco, true, true, true, ltema[0]);}
				mytreeview1.createItem("legenda"+ltema[0], "Legenda", imgBranco, true, true, true, ltema[0]);
				if (g_opcoesTemas == "sim")
				{
					var im = "";
					if (navn)
					{var im = "<img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='13' />";}
					//transparencia
					if ((ltema[4] != 0) || (ltema[8] == "sim"))
					{
						tnome = "<span onclick='mudatranspf(\""+ltema[0]+"\")'>"+im+"<img  src='"+$im("tic.png")+"' onmouseover=\"javascript:mostradicasf(this,'Altera a transpar�ncia do tema, possibilitando que as camadas inferiores possam ser vistas.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;opacidade: </span><input  onchange='mudatranspf(\""+ltema[0]+"\")' class=digitar type=text size=3 value='"+ltema[3]+"' id='tr"+ltema[0]+"' />";
						mytreeview1.createItem("temap1"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					//muda nome
					tnome = "<span onclick='mudanomef(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png")+"' onmouseover=\"javascript:mostradicasf(this,'Muda o nome atual do tema, utilize para melhorar a leganda do mapa.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;novo nome: </span><input onchange='mudanomef(\""+ltema[0]+"\")' class=digitar type=text size=10 value='' id='nn"+ltema[0]+"' />";
					mytreeview1.createItem("temap2"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					if ((ltema[4] < 3) && (ltema[9] != 7))
					{
						tnome = "<span onclick='procuraratribf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png")+" onmouseover=\"javascript:mostradicasf(this,'Localize elementos no tema com base em seus atributos descritivos.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;procurar... </span>";
						mytreeview1.createItem("temap3"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='toponimiaf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Crie uma nova camada no mapa para apresentar textos descritivos sobre esse tema, tendo como base a tabela de atributos.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;texto... </span>";
						mytreeview1.createItem("temap4"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='etiquetas(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Defina as etiquetas que ser�o mostradas quando o mouse � estacionado sobre um elemento desse tema.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;etiquetas... </span>";
						mytreeview1.createItem("temap7"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='filtrof(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Insira um filtro nesse tema para mostrar apenas determinadas informa��es, com base na tabela de atributos.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;filtro... </span>";
						mytreeview1.createItem("temap5"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
						tnome = "<span onclick='tabelaf(\""+ltema[0]+"\")'>"+im+"<img src="+$im("tic.png") + " onmouseover=\"javascript:mostradicasf(this,'Veja a tabela de atributos relacionada a esse tema.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;tabela... </span>";
						mytreeview1.createItem("temap6"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					if (ltema[4] < 4)
					{
						tnome = "<span onclick='editaLegenda(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png") + "' onmouseover=\"javascript:mostradicasf(this,'Abre o editor de legenda, permitindo a altera��o da forma de representa��o desse tema.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;editar legenda... </span>";
						mytreeview1.createItem("temap7"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
					}
					tnome = "<span onclick='destacaTema(\""+ltema[0]+"\")'>"+im+"<img src='"+$im("tic.png") + "' onmouseover=\"javascript:mostradicasf(this,'Mostra os dados desse tema em uma janela que acompanha o mouse.','')\" onmouseout=\"javascript:mostradicasf(this,'')\" />&nbsp;mostra em janela... </span>";
					mytreeview1.createItem("temap8"+ltema[0], tnome, imgBranco, false, true, false, "opc"+ltema[0]);
				}
				mytreeview1.createItem("","", imgBranco, false, true, true, ltema[0]);
				break;
			}
		}
	}
	//verifica se clicou para expandir a legenda
	var tema = itemID.split("legenda");
	if (tema.length == 2)
	{
		var expandeLegendaVer = function (retorno)
		{
			if (retorno.data != undefined)
			{
				var retorno = retorno.data;
				if (retorno[0])
				{
					if ((navn) && (!retorno[0].imagem))
					{tabela = retorno;}
					else
					{
						var i = retorno[0].imagem;
						var re = new RegExp("tiff", "g");
						var i = i.replace(re,'png');
						var tabela = "<img src='"+i+"' />";
					}					
					retorno = "";
				}
				else
				{
					var linhas = retorno.split("#");
					if (linhas.length > 1)
					{
						var linhas = retorno.split("|");
						var tabela = "<table >";
						for (linha=0;linha<linhas.length;linha++)
						{
							var colunas = linhas[linha].split("#");
							var id = colunas[0]+"-"+colunas[1];
							var re = new RegExp("'", "g");
							var exp = colunas[3].replace(re,'"');
							tabela += "<tr style='border-top:1px solid rgb(240,240,240);'><td><img src='"+colunas[4]+"' </td><td style='text-align:left'>"+colunas[2]+"</td></tr>";
						}
						tabela += "</table><br>";
					}
					else
					{tabela = retorno;}
				}
				if (!$i(g_arvoreClick+"verdiv"))
				{
					incluir = "<div style='text-align:left' id='"+g_arvoreClick+"verdiv"+"'>"+tabela+"</div>";
					mytreeview1.createItem(g_arvoreClick+"ver", incluir, imgBranco, false, true, true, g_arvoreClick);
				}
				else
				{
					$i(g_arvoreClick+"verdiv").innerHTML = tabela;
				}
			}
		};
		g_arvoreClick = itemID;
		tema = tema[1];
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=criaLegendaHTML&template=legenda2.htm&tema="+tema+"&g_sid="+g_sid;
		var cp = new cpaint();
		//cp.set_debug(2);
		cp.set_response_type("JSON");
		cp.call(p,"criaLegenda",expandeLegendaVer);
	}
}
/*
Function: expandeGrupo

Chama a fun��o ajax que pega a lista de temas de um subgrupo no menu de temas.

Parameters:

itemID - string Id do n� que foi expandido na �rvore de grupos e subgrupos.
*/
function expandeGrupo(itemID)
{
	g_arvoreClick = itemID;
	if ((itemID.search("sgrupo") > -1) && (g_arvoreClicks.search(itemID) == -1 ))
	{
		var codigos = itemID.split("_");
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadetemas&grupo="+codigos[1]+"&subgrupo="+codigos[2]+"&g_sid="+g_sid+"&idmenu="+codigos[3];
		var cp = new cpaint();
		//cp.set_debug(2);
		cp.set_response_type("json");
		cp.call(p,"pegaListaDeTemas",processaTemas);
	}
}
/*
Function: pegaListaDeGrupos

Pega a lista de grupos de uma �rvore de tremas.

Parameters:

idmenu - id que identifica a �rvore. Esse id � definido no ms_configura, vari�vel $menutemas. Se idmenu for vazio, ser� considerado o arquivo de menus default do I3Geo, existente no diret�rio menutemas.

listasistemas - sim|nao pega a lista de sistemas para montar a �rvore de sistemas
*/
function pegaListaDeGrupos(idmenu,listasistemas)
{			
	var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=pegalistadegrupos&g_sid="+g_sid+"&idmenu="+idmenu+"&listasistemas="+listasistemas;
	var cp = new cpaint();
	//cp.set_debug(2)
	cp.set_response_type("JSON");
	cp.call(p,"pegaListaDeGrupos",processaGrupos);
}
/*
Function: processaGrupos

Recebe os dados da fun��o Ajax com a lista de grupos e subgrupos.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaGrupos(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var idarvore = retorno.data.grupos[retorno.data.grupos.length - 2].idmenu;
		if ($i("buscatema"))
		{var busca = $i("buscatema").value;}
		//$i(objmapa.guiaMenu+"obj").innerHTML = "";
		if (!document.getElementById("buscatema"))
		{
			var insp = "<div style='text-align:left;'><table  cellspacing='0' cellpadding='0' ><tr><td style='text-align:left;font-size:10px;'>";
			insp = insp + "<img src='"+g_locaplic+"/imagens/branco.gif'  height=0 />";
			insp = insp + "<p>&nbsp;procurar:<input class='digitar' type='text' id='buscatema' size='15' value=''  /><img  title='procurar' src='"+$im("tic.png")+"' onclick='procurartemas()' style='cursor:pointer'/></td></tr></table><br>";
			$i(objmapa.guiaMenu+"obj").innerHTML = insp+"<div style='text-align:left;font-size:10px;' id='achados' ></div></div>";
		}
		if (!$i("uplocal"))
		{
			var upload = "";
			if (g_uploadlocal == "sim")
			{upload += "<div id='uplocal' style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='upload()'><img src='"+$im("upload.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;Upload de arquivo local</div>";}
			if (g_downloadbase == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='downloadbase()'><img src='"+$im("connected-s.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;Download de dados</div>";}
			if (g_conectarwms == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='conectarwms()'><img src='"+$im("cmdLink.gif")+"' style='cursor:pointer;text-align:left'  />&nbsp;Conectar com servidor WMS</div>";}
			if (g_conectargeorss == "sim")
			{upload += "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='conectargeorss()'><img src='"+g_locaplic+"/imagens/georss-1.png' style='cursor:pointer;text-align:left'  />&nbsp;Conectar com GeoRss</div>";}
			$i(objmapa.guiaMenu+"obj").innerHTML += upload;
			if (objmapa.navegacaoDir == "sim")
			{
				var temp = "<div style='width:98%;left:5px;cursor:pointer;text-align:left;font-size:11px;' onclick='navegacaoDir()'><img src='"+g_locaplic+"/imagens/desktop.png' style='cursor:pointer;text-align:left'  />&nbsp;Acesso aos arquivos do servidor</div>";
				$i(objmapa.guiaMenu+"obj").innerHTML += temp;
			}
		}
		//arvore de menus
		mytreeview2 = new Object();
		mytreeview2 = treeviewNew("mytreeview2"+idarvore, "default", objmapa.guiaMenu+"obj", null);
		var nometemas = "Temas";
		if (idarvore != ""){nometemas += " - "+idarvore;}
		mytreeview2.createItem("item1"+idarvore, "<b>"+nometemas+"</b>", g_locaplic+"/imagens/visual/"+g_visual+"/temas.png", true, true, true, null);
		mytreeview2.itemExpand = expandeGrupo;
		for (i=0;i<retorno.data.grupos.length; i++)
		{
			if (retorno.data.grupos[i].nome)
			{
				mytreeview2.createItem("grupo"+i+"a"+idarvore, retorno.data.grupos[i].nome, g_locaplic+"/imagens/visual/"+g_visual+"/folder-s.gif", true, true, true, "item1"+idarvore);
				var ngSgrupo = retorno.data.grupos[i].subgrupos;
				var cor = "rgb(230,230,230)";
				for (sg=0;sg<ngSgrupo.length;sg++)
				{
					if (navm)
					var nomeSgrupo = "<span style='background-color:"+cor+"' >"+ngSgrupo[sg].nome+"</span>";
					else
					var nomeSgrupo = "<span style='background-color:"+cor+"' ><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+ngSgrupo[sg].nome+"</span>";
					mytreeview2.createItem("sgrupo_"+i+"_"+sg+"a"+"grupo"+i+"_"+idarvore, nomeSgrupo, imgBranco, true, true, false, "grupo"+i+"a"+idarvore);
					if (cor == "rgb(230,230,230)"){var cor = "rgb(255,255,255)";}
					else
					{var cor = "rgb(230,230,230)";}
				}
				var ngtSgrupo = retorno.data.grupos[i].temasgrupo;
				for (sgt=0;sgt<ngtSgrupo.length;sgt++)
				{
					var no = ngtSgrupo[sgt];
					var nome = no.nome;
					var lk = no.link;
					if ( lk != " ")
					{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
					var tid = no.tid;
					var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type=\"checkbox\" value="+tid+" onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
					if(navm)
					nomeTema = "&nbsp;"+inp+nome+lk;
					else
					nomeTema = "<span><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
					mytreeview2.createItem("sgrupo_"+i+"_"+sg+"_"+sgt+"_"+idarvore, nomeTema, imgBranco, false, true, false, "grupo"+i+"a"+idarvore);
				}				
			}
			if (retorno.data.grupos[i].temasraiz)
			{
				for (st=0;st<retorno.data.grupos[i].temasraiz.length; st++)
				{
					var no = retorno.data.grupos[i].temasraiz[st];
					var nome = no.nome;
					var lk = no.link;
					if ( lk != " ")
					{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
					var tid = no.tid;
					var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type='checkbox' value="+tid+" onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
					if(navm)
					nomeTema = "&nbsp;"+inp+nome+lk;
					else
					nomeTema = "<span><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
					mytreeview2.createItem("tema"+i+""+st+"a"+idarvore, nomeTema, imgBranco, false, true, true, "item1"+idarvore);
				}
				mytreeview2.createItem("", "", imgBranco, false, true, true, "item1"+idarvore);
			}
		}
		if (g_locsistemas != "")
		{pegavalSistemas(retorno.data.grupos[retorno.data.grupos.length - 1].sistemas);}		
	}
}
/*
Function: processaTemas

Recebe os dados da fun��o Ajax com a lista de temas de um subgrupo.

Monta a �rvore para adi��o de um novo tema no mapa.

Parameters:

retorno - string formatada com os dados para montagem da �rvore.
*/
function processaTemas(retorno)
{
	if ((retorno.data != "erro") && (retorno.data != undefined))
	{
		var cor = "rgb(251,246,184)";
		for (st=0;st<retorno.data.temas.length; st++)
		{
			var nome = retorno.data.temas[st].nome;
			var lk = retorno.data.temas[st].link;
			if ( lk != " ")
			{var lk = "<a href="+lk+" target='blank'>&nbsp;fonte</a>";}
			var tid = retorno.data.temas[st].tid;
			var inp = "<input style='text-align:left;cursor:pointer;' onclick='mudaboxnf(\"adiciona\")' class='inputsb' style='cursor:pointer' type=\"checkbox\" value="+tid+" onmouseover=\"javascript:mostradicasf(this,'Clique para ligar ou desligar esse tema, mostrando-o ou n�o no mapa. Ap�s alterar o estado do tema, aguarde alguns instantes para o mapa ser redesenhado, ou clique no bot�o aplicar que ser� mostrado.','ligadesliga')\" onmouseout=\"javascript:mostradicasf(this,'')\" />";
			if(navm)
			nomeTema = "<span style='background-color:"+cor+"' title='c&oacute;digo: "+tid+"'>"+inp+nome+lk+"</span>";
			else
			nomeTema = "<span style='background-color:"+cor+"' title='c&oacute;digo: "+tid+"'><img src='"+g_locaplic+"/imagens/branco.gif' width='0' height='15' />"+inp+nome+lk+"</span>";
			mytreeview2.createItem("tema"+sg+""+st, nomeTema, imgBranco, false, true, true, g_arvoreClick);
			if (cor == "rgb(251,246,184)"){var cor = "rgb(255,255,255)";}
			else
			{var cor = "rgb(251,246,184)";}
		}
		//inclui um item em branco
		mytreeview2.createItem("vazio", "", imgBranco, false, true, true, g_arvoreClick);
		g_arvoreClicks += ","+g_arvoreClick;
	}
}
/*
Function: pegavalSistemas

Adiciona uma �rvore no menu de adi��o de temas, contendo os sistemas que podem ser executados.

Parameters:

sis - objeto com a lista de sistemas.
*/
function pegavalSistemas(sis)
{
	if(sis.length > 0)
	{
		mytreeviewS = new Object();
		mytreeviewS = treeviewNew("mytreeviewS", "default", objmapa.guiaMenu+"obj", null);
		mytreeviewS.createItem("Sitem1", "<b>Sistemas</b>", g_locaplic+"/imagens/temas.png", true, true, true, null);
		for (ig=0;ig<sis.length;ig++)
		{
			var nomeSis = sis[ig].NOME;
			mytreeviewS.createItem("sis"+ig, nomeSis, g_locaplic+"/imagens/folder-s.gif", true, true, true, "Sitem1");
			var funcoes = sis[ig].FUNCOES;
			for (ig2=0;ig2<funcoes.length;ig2++)
			{
				var nomeFunc = funcoes[ig2].NOME;
				var executar = funcoes[ig2].ABRIR;
				var w = funcoes[ig2].W;
				var h = funcoes[ig2].H;
				var inp = "<img title='Abrir sistema' src='"+$im("open.gif")+"' style='cursor:pointer;text-align:left' onclick='abreSistema(\""+executar+"\",\""+w+"\",\""+h+"\")' />&nbsp;";
				mytreeviewS.createItem("sis"+ig+"func"+ig2, inp+nomeFunc, imgBranco, false, true, false, "sis"+ig);
			}
		}
	}
}
/*
Function: pegaMapas

Recebe a lista de mapas (banners) e monta a apresenta��o.

Adiciona na guia mapas os banners que d�o acesso direto a mapas especiais.

A indica��o do arquivo xml � feita em ms_configura.php

*/
function pegaMapas(retorno)
{
	var ins = "<br>";
	var mapa = retorno.data.mapas;
	for (ig1=0;ig1<mapa.length;ig1++)
	{
		var nome = mapa[ig1].NOME;
		var descricao = mapa[ig1].DESCRICAO;
		var imagem = mapa[ig1].IMAGEM;
		var temas = mapa[ig1].TEMAS;
		var ligados = mapa[ig1].LIGADOS;
		var extensao = mapa[ig1].EXTENSAO;
		var outros = mapa[ig1].OUTROS;
		var lkd = mapa[ig1].LINK;
		var link = g_locaplic+"/ms_criamapa.php?temasa="+temas+"&layers="+ligados;
		if (extensao != "")
		{link += "&mapext="+extensao;}
		if (outros != "")
		{link += "&"+outros;}
		if (lkd != "")
		{var link = lkd;}
		ins += "<div><a href='"+link+"'><img src='"+imagem+"'></a></div><br>";
		ins += "<div><p>"+nome+"</p></div><br>";
	}
	$i("banners").innerHTML = ins;
}
/*
Function: arvoreclick

Adiciona um tema no mapa quando o usu�rio clica em um novo tema no menu de adi��o de temas.

Parameters:

itemID - ID que identifica qual tema foi clicado. O ID � definido no arquivo .map e no arquivo menutemas/menutemas.xml
*/
function arvoreclick(itemID)
{
	if (itemID.search("tema") == 0)
	{
		if ($i(itemID).checked == true)
		{$i(itemID).checked = false;}
		else
		{$i(itemID).checked = true;}
	}
}
/*
Function: pegaTema

Pega o tema de um no na guia de temas.

Utilizado nas op��es que operam sobre um tema espec�fico.

Parameters:

celula - objeto que foi clicado

Returns:

Id do tema.
*/
function pegaTema(celula)
{
	var nos = celula.parentNode.childNodes;
	for (no=0;no<nos.length; no++){if (nos[no].type == "checkbox"){return nos[no].value;}}
}
/*
Section: redesenho do mapa
*/
/*
Function: autoRedesenho

Controla a op��o de redesenho autom�tico temporizado

Para funcionar, a vari�vel de inicializa��o g_autoRedesenho deve ser > 0

Parameters:

opcao: ativa|desativa|redesenha
*/
function autoRedesenho(opcao)
{
	if (opcao == "desativa")
	{
		g_autoRedesenho = 0;
		clearTimeout(objmapa.tempoRedesenho);
		clearTimeout(objmapa.contaTempoRedesenho);
		objmapa.tempoRedesenho = "";
		objmapa.contaTempoRedesenho = "";
		objmapa.tempoRedesenho = "";
		if ($i("tempoRedesenho"))
		{$i("tempoRedesenho").style.display = "none";}
	}
	if (opcao == "ativa")
	{
		if (($i("tempoRedesenho")) && (g_autoRedesenho > 0))
		{$i("tempoRedesenho").style.display = "block";}
		if (g_autoRedesenho > 0)
		{objmapa.tempoRedesenho = setTimeout('autoRedesenho("redesenha")',g_autoRedesenho);}
		if (($i("tempoRedesenho")) && (g_autoRedesenho > 0))
		{
			$i("tempoRedesenho").innerHTML = g_autoRedesenho/1000;
			objmapa.contaTempoRedesenho = setTimeout('autoRedesenho("contagem")',1000);
		}
	}
	if (opcao == "redesenha")
	{
		clearTimeout(objmapa.tempoRedesenho);
		clearTimeout(objmapa.contaTempoRedesenho);
		remapaf();
		autoRedesenho("ativa");
	}
	if (opcao == "contagem")
	{
		if ($i("tempoRedesenho"))
		{
			$i("tempoRedesenho").innerHTML = parseInt($i("tempoRedesenho").innerHTML) - 1;
			objmapa.contaTempoRedesenho = setTimeout('autoRedesenho("contagem")',1000);
		}
	}
}
/*
Function: remapaf

Prepara o redesenho do mapa de acordo com o que esta visivel ou nao.

Chamado por algumas fun��es que necessitam refazer o desenho do mapa.

Verifica na lista de temas j� adicionados, os temas que est�o ligados e desligados,
Chama a fun��o que verifica na lista de temas adicionais.
*/
function remapaf()
{
	clearTimeout(objmapa.tempo);
	objmapa.tempo = "";
	objmapa.temaAtivo = "";
	if ($i(objmapa.guiaTemas+"obj"))
	{
		var iguias = $i(objmapa.guiaTemas+"obj").getElementsByTagName("input");
		var tsl = new Array();
		var tsd = new Array();
		for (i=0;i<iguias.length; i++)
		{
			if (iguias[i].type == "checkbox")
			{
				if (iguias[i].checked == false)
				{tsd.push(iguias[i].value);}
				if (iguias[i].checked == true)
				{tsl.push(iguias[i].value);}
			}
		}
		var remapaAdicNovos = function remapaAdicNovos(retorno)
		{
			if ($i("buscatema"))
			{
				var g = $i(objmapa.guiaMenu+"obj");
				var iguias = g.getElementsByTagName("input");
				var ta = new Array();
				for (i=0;i<iguias.length; i++)
				{
					if (iguias[i].type == "checkbox")
					{
						if (iguias[i].checked == true)
						{
							ta.push(iguias[i].value);
							iguias[i].checked = false;
						}
					}
				}
				if (ta.length > 0)
				{
					objaguarde.fecha("remapa");
					objaguarde.abre("ajaxredesenha","Aguarde...");
					var temp = function()
					{objaguarde.fecha("ajaxredesenha");ajaxredesenha("");};
					var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=adtema&temas="+(ta.toString())+"&g_sid="+g_sid;
					var cp = new cpaint();
					//cp.set_debug(2)
					cp.set_response_type("JSON");
					cp.call(p,"adicionaTema",temp);
				}
				else
				{
					objaguarde.fecha("remapa");
					objaguarde.abre("ajaxredesenha","Aguarde...");
					ajaxredesenha("");
				}
			}
			else
			{
				objaguarde.fecha("remapa");
				objaguarde.abre("ajaxredesenha","Aguarde...");
				ajaxredesenha("");
			}
		};
		if ((tsd.length > 0) || (tsl.length > 0))
		{
			objaguarde.abre("remapa","Aguarde...refazendo o mapa");
			var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=ligatemas&desligar="+(tsd.toString())+"&ligar="+(tsl.toString())+"&g_sid="+g_sid;
			var cp = new cpaint();
			//cp.set_debug(2)
			cp.set_response_type("JSON");
			cp.call(p,"ligaDesligaTemas",remapaAdicNovos);
		}
		else{remapaAdicNovos();}
		objaguarde.fecha("remapa");
	}
	else
	{remapaAdicNovos();}
}
/*
Section: eventos
*/
/*
Function: processevent1 (depreciado)

Captura a posi��o do mouse tendo como refer�ncia o navegador.

Atualiza o objeto objposicaomouse e movimenta as janelas doc�veis.

Recalcula a posi��o correta da imagem do mapa.

Parameters:

exy1 - objeto evento.
*/
function processevent1(exy1)
{}
/*
Function: calcposf

Calcula a posi��o correta do corpo do mapa e posiciona-o.

Atualiza as vari�veis imagemxi,imagemyi,imagemxref e imagemyref
*/
function calcposf()
{
	imagemxi = 0;
	imagemyi = 0;
	imagemxref = 0;
	imagemyref = 0;
	if(!$i("i3geo")){return;}
	if ($i("i3geo").style.left){imagemxi += parseInt($i("i3geo").style.left);}
	if ($i("i3geo").style.top){imagemyi += parseInt($i("i3geo").style.top);}	
	var dc = $i("i3geo");
	if ($i("img"))
	{var dc = $i("contemImg");}
	if ($i("openlayers_OpenLayers_Container"))
	{var dc = $i("openlayers_OpenLayers_Container");}
	while ((dc.offsetParent) && (dc.offsetParent.id != "i3geo"))
	{
		dc = dc.offsetParent;
		imagemxi = imagemxi + dc.offsetLeft;
		imagemyi = imagemyi + dc.offsetTop;
	}

	if ($i("img"))
	{
		$left("corpoMapa",imagemxi);
		$top("corpoMapa",imagemyi);
		if ($i("i3geo").style.left){$left("corpoMapa",imagemxi - parseInt($i("i3geo").style.left));}
		if ($i("i3geo").style.top){$top("corpoMapa",imagemyi - parseInt($i("i3geo").style.top));}
	}
	if ($i("mostradistancia"))
	{
		$left("mostradistancia",imagemxi);
		$top("mostradistancia",imagemyi);
	}
	
	if ($i("ref"))
	{
		var dc = $i("ref");
		while (dc.offsetParent.id != "i3geo")
		{
			dc = dc.offsetParent;
			imagemxref = imagemxref + dc.offsetLeft;
			imagemyref = imagemyref + dc.offsetTop;
		}
	}
	if ($i("aguarde"))
	{
		$top("aguarde",imagemyi);
		$left("aguarde",imagemxi);
	}
}
/*
Function: movecursor

Move o �cone que segue o mouse quando da movimenta��o sobre o mapa
*/
function movecursor()
{
	var obje = $i("obj").style;
	if ($i("img"))
	{
		eval ("obje." + g_tipotop + "= objposicaocursor.telay + 5 + g_postpx");
		eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 5 + g_postpx");
	}
	else
	{
		eval ("obje." + g_tipotop + "= objposicaocursor.telay - 15 + g_postpx");
		eval ("obje." + g_tipoleft + "= objposicaocursor.telax + 15 + g_postpx");
	}	
	if($i("box1"))
	{
		var bx = $i("box1");
		if (bx.style.visibility != "visible")
		{
			//move o box para a posi��o correta
			with(bx.style)
			{
				left = objposicaocursor.telax + g_postpx;
				top = objposicaocursor.telay + g_postpx;
			}
		}
	}
}
/*
Function: capturaposicao

Captura a posi��o do mouse em fun��o do evento onmousemove sobre o corpo do mapa.

Atualiza o objeto objposicaocursor.
A fun��o de mostrar TIP � definida como "" quando o mouse � movimentado.

Parameters:

exy - objeto evento.
*/
function capturaposicao(exy)
{
	var e = (navn) ? exy : window.event;
	if (navn)
	{
		var storage = e.clientY+window.pageYOffset;
		var storage1 = e.clientX+window.pageXOffset;
		calcposf(); 
		var xfig = e.clientX - imagemxi + pageXOffset;
		var yfig = e.clientY - imagemyi + pageYOffset;
		var xreffig = e.clientX - imagemxref + pageXOffset;
		var yreffig = e.clientY - imagemyref + pageYOffset;
	}
	if (navm)
	{
		var storage = e.clientY+document.body.scrollTop;
		var storage1 = e.clientX+document.body.scrollLeft;
		calcposf(); 
		var xfig = e.clientX - imagemxi + document.body.scrollLeft;
		var yfig = e.clientY - imagemyi + document.body.scrollTop;
		var xreffig = e.clientX - imagemxref + document.body.scrollLeft;
		var yreffig = e.clientY - imagemyref + document.body.scrollTop;
	}
	var teladd = calcddf(xfig,yfig,g_celula,objmapa.extent);
	var teladms = convdmsf(teladd[0],teladd[1]);
	with(objposicaocursor)
	{
		ddx = teladd[0];
		ddy = teladd[1];
		dmsx = teladms[0];
		dmsy = teladms[1];
		telax = storage1;
		telay = storage;
		imgx = xfig;
		imgy = yfig;
		refx = xreffig;
		refy = yreffig;
	}
	if (objmapa.parado!="cancela")
	{objmapa.parado = "nao";}
	ajaxTip = "";
}

/*
Section: quadro de anima��o
*/
/*
Function: gerafilmef

Cria os quadros que ser�o utilizados na fun��o de anima��o e mostrados no mapa.

Cada novo quadro � criado como um objeto quadrofilme. Os quadros criados s�o armazenados no
array global quadrosfilme.

Parameters:

qs - n�mero de quadros
*/
function gerafilmef(qs)
{
	if ($i("lugarquadros"))
	{
		var q = "<table class=tablefilme ><tr><td><img src=\""+g_localimg+"/icon_menuarrow.gif\" title='op&ccedil;&otilde;es' onclick='opcoesQuadros()' style='cursor:pointer'/></td>";
		for (i = 0; i < qs; i++)
		{
			q = q + "<td><img src=\""+g_localimg+"/quadro.png\" id=f"+i+"  onmouseover='filmef(this);mostradicasf(this,\"Quadro - clique para restaurar\",\"quadro\")' onmouseout=\"javascript:mostradicasf(this,'')\" onclick='filmezf(this)' /></td>";
			var qu = new quadrofilme();
			quadrosfilme[i] = qu;
		}
		var finalq = "</tr></table>";
		document.getElementById("lugarquadros").innerHTML = q+finalq;
	}
}
/*
Function: gravaQuadro

Armazena um determinado valor em uma determinada caracter�stica de um objeto quadro.

Parameters:

variavel - par�metro do objeto quadro.

valor - valor que ser� aplicado.
*/
function gravaQuadro(variavel,valor)
{
	var muda = -1;
	if ($i("lugarquadros"))
	{
		var nquadros = quadrosfilme.length;
		if (quadrosfilme[nquadros - 1].imagem != " ")
		{rebobinaf();}
		for (i = 0; i < nquadros; i++)
		{
			if ((eval("quadrosfilme["+i+"]."+variavel+" == ' '")) && (muda < 0))
			{muda = i;}
		}
		eval("quadrosfilme["+(muda)+"]."+variavel+"='"+ valor+"'");
	}
}
/*
Function: avancaQuadro

Avan�a um quadro na lista de quadros, mudando a imagem utilizada na sua representa��o.
*/
function avancaQuadro()
{
	var muda = -1;
	if ($i("lugarquadros"))
	{
		var nquadros = quadrosfilme.length;
		if (quadrosfilme[nquadros - 1].imagem != " ")
		{rebobinaf();}
		for (i = 0; i < nquadros; i++)
		{
			if ((quadrosfilme[i].imagem == " ") && (muda < 0))
			{muda = i;}
		}
		$i("f"+muda).src = g_localimg+"/quadro1.png";
	}
}
/*
Function: filmef

Mostra a imagem armazenada em um quadro no lugar do corpo do mapa.

Parameters:

o - quadro
*/
function filmef(o)
{
	if ($i("lugarquadros"))
	{
		var v = (o.id).replace("f","");
		if (quadrosfilme[v].imagem != " ")
		{$i("img").src = quadrosfilme[v].imagem;}
	}
}
/*
Function: rebobinaf

Rebobina as imagens dos quadros, limpando os par�metros armazenados.
*/
function rebobinaf()
{
	janima = 0;
	var nquadros = quadrosfilme.length;
	for (i = 0; i < nquadros; i++)
	{
		$i("f"+i).src = g_localimg+"/quadro.png";
		with (quadrosfilme[i]){imagem = " ";escala = " ";legenda = " ";extensao = " ";referencia = " ";}
	}
}
/*
Function: filmezf

Muda a extens�o geogr�fica do mapa conforme o valor armazenado em um quado de anima��o.

Parameters:

o - quadro
*/
function filmezf(o)
{
	var quadro = (o.id).replace("f","");
	if (quadrosfilme[quadro].extensao != " ")
	{
		ext = quadrosfilme[quadro].extensao;
		var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=mudaext&ext="+ext+"&g_sid="+g_sid;
		objaguarde.abre("ajaxredesenha","Aguarde...");
		var cp = new cpaint();
		//cp.set_debug(2)
		cp.set_response_type("JSON");
		cp.call(p,"mudaExtensao",ajaxredesenha);
	}
}
/*
Function: filmeanimaf

Carrega as imagens armazenadas nos quadros de anima��o quadros.
*/
function filmeanimaf()
{
	preLoad = new Array();
	for (i = 0; i < quadrosfilme.length; i++)
	{
		$i("f"+i).src = g_localimg+"/quadro.png";
		if (quadrosfilme[i].imagem != " ")
		{
			preLoad[i] = new Image();
			preLoad[i].src = quadrosfilme[i].imagem;
		}
	}
	filmeanimarodaf(0);
}
/*
Function: filmeanimarodaf

Roda a animacao usando as imagens armazenadas nos quadros de anima��o quadros.
*/
function filmeanimarodaf(janima)
{
	if (janima < quadrosfilme.length)
	{
		$i("img").src = preLoad[janima].src;
		$i("f"+janima).src = g_localimg+"/quadro1.png";
		janima = janima + 1;
		var doc = (navm) ? document.frames("wdocai").document : $i("wdocai").contentDocument;
		var ti = doc.getElementById("tempoanima").value;
		t = setTimeout('filmeanimarodaf('+janima+')',ti);
	}
}
/*
Function: quadrofilme

Cria um objeto quadro de anima��o. Cada quadro � utilizado para armazenar par�metros de um mapa que foi visto na tela.
� utilizado pela fun��o que lista as imagens j� vistas no mapa e pela fun��o que retorna a um determinado zoom do mapa.

Methods:

imagem - URL da imagem

escala - escala do mapa

legenda - URL da legenda do mapa

extensao - extens�o geogr�fica do mapa com valores separados por espa�o

referencia - URL do mapa de refer�ncia
*/
function quadrofilme()
{
	this.imagem = " ";
	this.escala = " ";
	this.legenda = " ";
	this.extensao = " ";
	this.referencia = " ";
}
/*
Section: calculos
*/
/*
Function: calculadistancia

Calcula a dist�ncia entre dois pontos.

Parameters:

lga - x inicial.

lta - y inicial

lgb - x final

ltb - y final
*/
function calculadistancia(lga,lta,lgb,ltb) //0ms
{
	//calculo baseado no site http://www.wcrl.ars.usda.gov/cec/java/lat-long.htm
	var er = 6366.707;
	var radlat1 = Math.PI * lta/180;
	var radlat2 = Math.PI * ltb/180;
	var radlong1 = Math.PI * lga/180;
	var radlong2 = Math.PI * lgb/180;
	if (lta > 0) {radlat1=Math.PI/2-radlat1;}
	if (lta < 0) {radlat1=Math.PI/2+radlat1;}
	if (lga < 0) {radlong1=Math.PI*2-radlong1;}
	if (ltb > 0) {radlat2=Math.PI/2-radlat2;}
	if (ltb < 0) {radlat2=Math.PI/2+radlat2;}
	if (lgb < 0) {radlong2=Math.PI*2-radlong2;}
	var x1 = er * Math.cos(radlong1)*Math.sin(radlat1);
	var y1 = er * Math.sin(radlong1)*Math.sin(radlat1);
	var z1 = er * Math.cos(radlat1);
	var x2 = er * Math.cos(radlong2)*Math.sin(radlat2);
	var y2 = er * Math.sin(radlong2)*Math.sin(radlat2);
	var z2 = er * Math.cos(radlat2);
	var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));
	//side, side, side, law of cosines and arccos
	var theta = Math.acos((er*er+er*er-d*d)/(2*er*er));
	return theta*er;
}
/*
Function: convdmsddf

Converte dms em dd.

Parameters:

cd - grau.

cm - minuto.

cs - segundo

Returns:

Coordenada em dd.
*/
function convdmsddf(cd,cm,cs)
{
	//converte dms em dd
	var sinal = 'positivo';
	if (cd < 0)
	{
		cd = cd * -1;
		sinal = 'negativo';
	}
	spm = cs / 3600;
	mpg = cm / 60;
	var dd = (cd * 1) + (mpg * 1) + (spm * 1);
	if (sinal == 'negativo')
	{dd = dd * -1;}
	return (dd);
}
/*
Function: calcddf

Converte o x,y de unidades de tela para d�cimo de grau.

Parameters:

xfign - x em valores de imagem.

yfign - y em coordenadas de imagem.

g_celula - tamanho no terreno do pixel da imagem.

imgext - extens�o geogr�fica do mapa.

Returns:

Coordena em dd.
*/
function calcddf(xfign,yfign,g_celula,imgext)
{
	if (navm)
	{
	 xfign = xfign - 2.2;
	 yfign = yfign - 2.7;
	}
	if (navn)
	{
	 xfign = xfign - 0.12;
	 yfign = yfign - 1.05;
	}
	var nx = g_celula * xfign;
	var ny = g_celula * yfign;
	var amext = imgext.split(" ");
	var longdd = (amext[0] * 1) + nx;
	var latdd = (amext[3] * 1) - ny;
	var res = new Array();
	res[0] = longdd;
	res[1] = latdd;
	return (res);
}
/*
Function: convdmsf

Converte dd em dms.

Parameters:

x - coordenada x.

y - coordenada y.

Returns:

Array com o valor de x [0] e y [1] no formato dd mm ss
*/
function convdmsf(x,y)
{
	var m = 0;
	var s = 0;
	var dx = parseInt(x);
	if (dx > 0)
	{var restod = x - dx;}
	if (dx < 0)
	{restod = (x * -1) - (dx * -1);}
	dx = dx;
	if (restod != 0)
	{
		var mm = restod * 60;
		var m = parseInt(restod * 60);
		var restos = mm - m;
		var mx = m;
		if (restos != 0)
		{
			var s = restos * 60;
			var s = (s+"_").substring(0,5);
			var sx = s;
		}
		else  { s = "00.00" }
	}
	else
	{
		var mx = "00";
		var sx = "00.00";
	}
	if (m.length == 2){m = "0"+m+"";}
	if (s*1 < 10){s = "0"+s;}
	var xv = dx+" "+mx+" "+sx;
	var m = 0;
	var s = 0;
	var dy = parseInt(y);
	if (dy > 0)
	{var restod = y - dy;}
	if (dy < 0)
	{var restod = (y * -1) - (dy * -1);}
	dy = dy;
	if (restod != 0)
	{
		var mm = restod * 60;
		var m = parseInt(restod * 60);
		var restos = mm - m;
		var my = m;
		if (restos != 0)
		{
			var s = restos * 60;
			s = (s+"_").substring(0,5);
			var sy = s;
		}
		else  { var s = "00.00";}
	}
	else
	{
		var my = "00";
		var sy = "00.00";
	}
	if (m.length == 2){m = "0"+m;}
	if (s*1 < 10){s = "0"+s;}
	var yv = dy+" "+my+" "+sy;
	var res = new Array();
	res[0] = xv;
	res[1] = yv;
	if ($i("localizarxy"))
	{
		$i("xg").value = dx;
		$i("xm").value = mx;
		$i("xs").value = sx;
		$i("yg").value = dy;
		$i("ym").value = my;
		$i("ys").value = sy;

	}
	return res;
}
/*
Function: convddtela

Converte coordenadas dd em coordenadas de tela.

Parameters:

vx - coordenada x.

vy - coordenada y.

docmapa - objeto que cont�m o objeto imagem.

Returns:

Array com o valor de x [0] e y [1]
*/
function convddtela(vx,vy,docmapa)
{
	if(!docmapa)
	{var docmapa = window.document;}
	var dc = docmapa.getElementById("img");
	imgext = objmapa.extent;
	varimgext = imgext.split(" ");
	vx = (varimgext[0] * -1) - (vx * -1);
	vy = (vy * -1) + (varimgext[3] * 1);
	c = objmapa.cellsize * 1;
	xy = new Array();
	xy[0] = (vx  / c) + imagemxi;
	xy[1]  = (vy / c) + imagemyi;
	return (xy);
}
/*
Function: posicaomouse

Cria um objeto que guarda a posi��o do mouse na tela. A posi��o � medida em rela��o a janela do navegador.

Methods:

x - coordenada x em valores de tela

y - coordenada y em valores de tela
*/
function posicaomouse()
{
	this.x = 0;
	this.y = 0;
}
/*
Function: posicaocursor

Cria um objeto que guarda a posi��o do mouse no corpo do mapa. A posi��o � medida em rela��o � posi��o do mapa no navegador.

Methods:

ddx - coordenada x em d�cimo de grau

ddy - coordenada y em d�cimo de grau

dmsx - coordenada x em grau, minuto e segundo

dmsy - coordenada y em grau, minuto e segundo

telax - coordenada x em valores de tela

telay - coordenada y em valores de tela

imgx - coordenada x em rela��o ao mapa

imgy - coordenada y em rela��o ao mapa

refx - coordenada x em rela��o ao mapa de refer�ncia

refy - coordenada y em rela��o ao mapa de refer�ncia
*/
function posicaocursor()
{
	this.ddx = 0;
	this.ddy = 0;
	this.dmsx = '';
	this.dmsy = '';
	this.telax = 0;
	this.telay = 0;
	this.imgx = 0;
	this.imgy = 0;
	this.refx = 0;
	this.refy = 0;
}
/*
Function: pontosdist

Armazena coordenadas no objeto pontosdist para calculo de distancia
*/
function pontosdist()
{
	this.xpt = new Array();
	this.ypt = new Array();
	this.dist = new Array();
}
/*
Section: outros
*/
/*
Function: inseremarcaf

Insere um ponto no mapa.

Os pontos s�o inseridos em um contaier de pontos e mostrados tempor�riamente como uma imagem.
Utilizado pela fun��o de medi��o de dist�ncias.

Parameters:

xi - coordenada x.

yi - coordenada y.
*/
function inseremarcaf(xi,yi)
{
	//verifica se existe o container para os pontos
	if (!$i("pontosins") )
	{
		var novoel = document.createElement("div");
		novoel.id = "pontosins";
		with(novoel.style){position = "absolute";top = parseInt($i("img").style.top);left = parseInt($i("img").style.left);}
		document.body.appendChild(novoel);
	}
	var container = $i("pontosins");
	var novoel = document.createElement("div");
	with (novoel.style){position = "absolute";zIndex=2000;top=(yi - 2)+"px";left=(xi - 2)+"px";width="4px";height="4px";}
	var novoimg = document.createElement("img");
	novoimg.src=g_locaplic+"/imagens/dot1.gif";
	with (novoimg.style){width="4px";height="4px";zIndex=2000;}
	novoel.appendChild(novoimg);
	container.appendChild(novoel);
}
/*
Function: limpacontainerf

Limpa o container de pontos.
*/
function limpacontainerf()
{
	if ($i("pontosins") )
	{$i("pontosins").innerHTML = "";}
	if ($i("mostradistancia"))
	{$i("mostradistancia").style.display="none";}
}

//controle dois pain�is que podem ser redimensionados
YAHOO.widget.ResizePanel = function(el, userConfig)
{
    if (arguments.length > 0) 
    {YAHOO.widget.ResizePanel.superclass.constructor.call(this, el, userConfig);}
};
YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE = "yui-resizepanel";
YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE = "resizehandle";
YAHOO.extend
(
	YAHOO.widget.ResizePanel, YAHOO.widget.Panel,
	{
   		init: function(el, userConfig) 
   		{
    		YAHOO.widget.ResizePanel.superclass.init.call(this, el);
       		this.beforeInitEvent.fire(YAHOO.widget.ResizePanel);
       		var Dom = YAHOO.util.Dom,
           		Event = YAHOO.util.Event,
           		oInnerElement = this.innerElement,
           		oResizeHandle = document.createElement("DIV"),
           		sResizeHandleId = this.id + "_resizehandle";
       		oResizeHandle.id = sResizeHandleId;
       		oResizeHandle.className = YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE;
       		Dom.addClass(oInnerElement, YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE);
       		this.resizeHandle = oResizeHandle;
       		function initResizeFunctionality()
       		{
           		var me = this,
               		oHeader = this.header,
               		oBody = this.body,
               		oFooter = this.footer,
               		nStartWidth,
               		nStartHeight,
               		aStartPos,
               		nBodyBorderTopWidth,
               		nBodyBorderBottomWidth,
               		nBodyTopPadding,
               		nBodyBottomPadding,
               		nBodyOffset;
           		oInnerElement.appendChild(oResizeHandle);
           		this.ddResize = new YAHOO.util.DragDrop(sResizeHandleId, this.id);
           		this.ddResize.setHandleElId(sResizeHandleId);
           		this.ddResize.onMouseDown = function(e)
           		{
               		nStartWidth = oInnerElement.offsetWidth;
               		nStartHeight = oInnerElement.offsetHeight;
               		if (YAHOO.env.ua.ie && document.compatMode == "BackCompat")
               		{nBodyOffset = 0;}
               		else
               		{
                   		nBodyBorderTopWidth = parseInt(Dom.getStyle(oBody, "borderTopWidth"), 10),
                   		nBodyBorderBottomWidth = parseInt(Dom.getStyle(oBody, "borderBottomWidth"), 10),
                   		nBodyTopPadding = parseInt(Dom.getStyle(oBody, "paddingTop"), 10),
                   		nBodyBottomPadding = parseInt(Dom.getStyle(oBody, "paddingBottom"), 10),
                   		nBodyOffset = nBodyBorderTopWidth + nBodyBorderBottomWidth + nBodyTopPadding + nBodyBottomPadding;
               		}
               		me.cfg.setProperty("width", nStartWidth + "px");
               		aStartPos = [Event.getPageX(e), Event.getPageY(e)];
           		};
           		this.ddResize.onDrag = function(e)
           		{
               		var aNewPos = [Event.getPageX(e), Event.getPageY(e)],
                   		nOffsetX = aNewPos[0] - aStartPos[0],
                   		nOffsetY = aNewPos[1] - aStartPos[1],
                   		nNewWidth = Math.max(nStartWidth + nOffsetX, 10),
                   		nNewHeight = Math.max(nStartHeight + nOffsetY, 10),
                   		nBodyHeight = (nNewHeight - (oFooter.offsetHeight + oHeader.offsetHeight + nBodyOffset));
               		me.cfg.setProperty("width", nNewWidth + "px");
               		if (nBodyHeight < 0)
               		{nBodyHeight = 0;}
               		oBody.style.height =  nBodyHeight + "px";
               		if ($i("wdocai"))
               		{$i("wdocai").style.height = nBodyHeight;}
           		};
       		};
       		function onBeforeShow()
       		{
       			initResizeFunctionality.call(this);
       			this.unsubscribe("beforeShow", onBeforeShow);
       		};
       		function onBeforeRender()
       		{
           		if (!this.footer)
           		{this.setFooter("");}
           		if (this.cfg.getProperty("visible"))
           		{initResizeFunctionality.call(this);}
           		else
           		{this.subscribe("beforeShow", onBeforeShow);}
       			this.unsubscribe("beforeRender", onBeforeRender);
       		};
       		this.subscribe("beforeRender", onBeforeRender);
       		if (userConfig)
       		{this.cfg.applyConfig(userConfig, true);}
       		this.initEvent.fire(YAHOO.widget.ResizePanel);
   		},
   		toString: function()
   		{return "ResizePanel " + this.id;}
	}
);
//controle do dragdrop

function ativaDragDrop()
{
	var Dom = YAHOO.util.Dom;
	var Event = YAHOO.util.Event;
	var DDM = YAHOO.util.DragDropMgr;
	YAHOO.example.DDList = "";
	YAHOO.example.DDApp = 
	{
    	init: function() 
    	{
        	if($i("lixeira"))
        	{new YAHOO.util.DDTarget("lixeira");}
        	var lista = objmapa.temas.split(";");
	        for (i=0;i<lista.length;i=i+1)
	        {
               	var ltema = lista[i].split("*");
               	if($i(ltema[0]))
               	{new YAHOO.example.DDList(ltema[0]);}
        	}
    	}
	};
	YAHOO.example.DDList = function(id, sGroup, config) 
	{
	    YAHOO.example.DDList.superclass.constructor.call(this, id, sGroup, config);
	    this.logger = this.logger || YAHOO;
    	var el = this.getDragEl();
    	Dom.setStyle(el, "opacity", 0.67); // The proxy is slightly transparent
	    this.goingUp = false;
   		this.lastY = 0;
	};
	YAHOO.extend
	(
		YAHOO.example.DDList, YAHOO.util.DDProxy, 
		{
	    	startDrag: function(x, y) 
	    	{
        		this.logger.log(this.id + " startDrag");
	        	// make the proxy look like the source element
    	    	var dragEl = this.getDragEl();
        		var clickEl = this.getEl();
        		Dom.setStyle(clickEl, "visibility", "hidden");
	        	dragEl.innerHTML = clickEl.innerHTML;
	        	Dom.setStyle(dragEl, "color", Dom.getStyle(clickEl, "color"));
   		    	Dom.setStyle(dragEl, "backgroundColor", Dom.getStyle(clickEl, "backgroundColor"));
    	    	Dom.setStyle(dragEl, "border", "2px solid gray");
    	    	Dom.setStyle(dragEl, "z-index", "5000");
    		},
	    	endDrag: function(e) 
	    	{
	        	var srcEl = this.getEl();
    	    	var proxy = this.getDragEl();
	        	// Show the proxy element and animate it to the src element's location
    	    	Dom.setStyle(proxy, "visibility", "");
        		var a = new YAHOO.util.Motion
        		( 
           			proxy,
            		{ 
                		points:
                		{to: Dom.getXY(srcEl)}
    	        	}, 
        	   	 	0.2, 
            		YAHOO.util.Easing.easeOut
        		);
        		var proxyid = proxy.id;
        		var thisid = this.id;
	        	// Hide the proxy and show the source element when finished with the animation
	        	a.onComplete.subscribe
	        	(
	        		function() 
	        		{
                		Dom.setStyle(proxyid, "visibility", "hidden");
                		Dom.setStyle(thisid, "visibility", "");
            		}
            	);
	        	a.animate();
	        	if ($i("lixeira"))
	        	{$i("lixeira").style.border = "0px solid blue";} 	
    		},
	    	onDragDrop: function(e, id)
	    	{
	        	// If there is one drop interaction, the li was dropped either on the list,
	        	// or it was dropped on the current location of the source element.
	        	if (DDM.interactionInfo.drop.length === 1)
	        	{
	            	// The position of the cursor at the time of the drop (YAHOO.util.Point)
	            	var pt = DDM.interactionInfo.point; 
	            	// The region occupied by the source element at the time of the drop
	            	var region = DDM.interactionInfo.sourceRegion; 
	            	// Check to see if we are over the source element's location.  We will
	            	// append to the bottom of the list once we are sure it was a drop in
	            	// the negative space (the area of the list without any list items)
	            	if (!region.intersect(pt))
	            	{
                		//var destEl = Dom.get(id);
                		//var destDD = DDM.getDDById(id);
                		//destEl.appendChild(this.getEl());
                		//destDD.isEmpty = false;
                		DDM.refreshCache();
                		//exclui tema
                		if(DDM.getDDById(id).id == "lixeira")
                		{
                			var tema = (this.getEl()).id;
                			//objaguarde.abre("ajaxredesenha","Aguarde...");
							var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=excluitema&temas="+tema+"&g_sid="+g_sid;
							var cp = new cpaint();
							//cp.set_debug(2)
							cp.set_response_type("JSON");
							cp.call(p,"excluiTemas",ajaxredesenha);
							objmapa.temaAtivo = "";
						}
						//muda ordem de desenho do tema
						else
						{
							if ($i(DDM.getDDById(id).id).parentNode.parentNode.id == "mytreeview1")
							{
               					objmapa.temas = "";
               					var temaDe = (this.getEl()).id;
               					var temaPara = DDM.getDDById(id).id;
               					var destEl = Dom.get(id);
               					destEl.appendChild(this.getEl());
 							}
 							var els = $i("mytreeview1").getElementsByTagName("input");
 							var lista = new Array();
 							for (i=0;i<els.length;i=i+1)
 							{
 								var itema = els[i].parentNode.parentNode.id;
 								lista.push(itema);								
 							}
 							var lista = lista.join(',');
 							$i("listaTemas").removeChild($i("listaTemas").firstChild);
              				//objaguarde.abre("ajaxredesenha","Aguarde...");
							var p = g_locaplic+"/classesphp/mapa_controle.php?funcao=reordenatemas&lista="+lista+"&g_sid="+g_sid;
							var cp = new cpaint();
							//cp.set_debug(2)
							cp.set_response_type("JSON");
							cp.call(p,"reordenatemas",ajaxredesenha);
						}
            		}
	        	}
	    	},
	    	onDrag: function(e) 
	    	{
	        	// Keep track of the direction of the drag for use during onDragOver
	        	var y = Event.getPageY(e);
	        	if (y < this.lastY) 
	        	{this.goingUp = true;}
        		else
        		if (y > this.lastY)
        		{this.goingUp = false;}
	        	this.lastY = y;
	    	},
	    	onDragOver: function(e, id) 
	    	{
	        	var srcEl = this.getEl();
	        	var destEl = Dom.get(id);
	        	// We are only concerned with list items, we ignore the dragover
	        	// notifications for the list.
	        	if ($i("lixeira") && id == "lixeira")
	        	{$i("lixeira").style.border = "1px solid blue";}
	    	}
		}
	);
	Event.onDOMReady(YAHOO.example.DDApp.init, YAHOO.example.DDApp, true);
}



//testa se esse script foi carregado
function testafuncoes()
{}
