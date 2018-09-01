if (typeof (i3GEOF) === 'undefined') {
    var i3GEOF = {};
}
i3GEOF.legenda =
{
	parDefault : {position: "MS_UR", partials: 1, offsetx: 0, offsety: 0, minfeaturesize: "auto", mindistance: "auto", force: 0, shadowsizex: 1, shadowsizey: 1, cor: "0 0 0", sombray: 1, sombrax: 1, angulo: 0, tamanho: 8, fonte: "bitmap", fundo: "off", sombra: "off", outlinecolor: "off", shadowcolor: "off", wrap: "" },
	aguarde : "",
	templateDir : "../ferramentas/legenda",
	aposIniciar : function(){

	},
	renderFunction: i3GEO.janela.formModal,
	_parameters: {
	    "tema": "",
	    "mustache": "",
	    "mustachelista": "",
	    "mustacheestilo": "",
	    "idContainer": "i3GEOlegendaContainer",
	    "namespace": "legenda",
	    "objdicionario": {},
	    "aviso": false,
	    "dadosGrafico": "",
	    "estilos": "",
	    "estilo": 0,
	    "classe": ""
	},
	start : function(tema){
	    var p = this._parameters,
	    i3f = this,
	    t1 = i3GEO.configura.locaplic + "/ferramentas/"+p.namespace+"/template_mst.html",
	    t2 = i3GEO.configura.locaplic + "/ferramentas/"+p.namespace+"/templateLista_mst.html",
	    t3 = i3GEO.configura.locaplic + "/ferramentas/"+p.namespace+"/templateFormEstilo_mst.html";
	    p.tema = tema;
	    if(p.mustache === ""){
		i3GEO.janela.abreAguarde();
		$.when( $.get(t1),$.get(t2),$.get(t3)).done(function(r1,r2,r3) {
		    p.mustache = r1[0];
		    p.mustachelista = r2[0];
		    p.mustacheestilo = r3[0];
		    i3f.html();
		    i3GEO.janela.fechaAguarde();
		}).fail(function() {
		    i3GEO.janela.snackBar({content: $trad("erroTpl"),style: "red"});
		    return;
		});
	    } else {
		i3f.html();
	    }
	},
	destroy: function(){
	    //nao use this aqui
	    //i3GEOF.legenda._parameters.mustache = "";

	},
	html:function() {
	    var p = this._parameters,
	    i3f = this,
	    hash = {},
	    objTema = i3GEO.arvoreDeCamadas.CAMADASINDEXADAS[p.tema],
	    values = {
		    mostra: "checked",
		    img: objTema.legendaimg ? objTema.legendaimg : "",
			    offsite: objTema.offsite ? objTema.offsite : "-1,-1,-1"
	    };
	    p.objdicionario = i3GEO.idioma.objetoIdioma(i3GEOF.legenda.dicionario);
	    if (objTema.classe && objTema.classe.toLowerCase() == "nao") {
		values.mostra = "";
	    }
	    hash = {
		    locaplic: i3GEO.configura.locaplic,
		    namespace: p.namespace,
		    idContainer: p.idContainer,
		    aplicar: $trad("p14"),
		    opcoes: $trad("opcoes"),
		    values: values,
		    ...p.objdicionario
	    };
	    i3f.renderFunction.call(
		    this,
		    {
			texto: Mustache.render(p.mustache, hash),
			onclose: i3f.destroy,
			resizable: {
			    disabled: false,
			    ghost: true,
			    handles: "se,n"
			},
			css: {'cursor': 'pointer', 'width': '100%', 'height': '50%','position': 'fixed','top': '', 'left': 0, 'right': 0, 'margin': 'auto', 'bottom': 0}
		    });
	    i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia1", "i3GEOlegendaguia");
	    // eventos das guias
	    $i("i3GEOlegendaguia1").onclick = function() {
		i3GEOF.legenda.mostralegenda();
		i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia1", "i3GEOlegendaguia");
	    };
	    $i("i3GEOlegendaguia7").onclick = function() {
		i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia7", "i3GEOlegendaguia");
	    };
	    $i("i3GEOlegendaguia8").onclick = function() {
		i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia8", "i3GEOlegendaguia");
		i3GEOF.legenda.getParametrosAuto();
	    };

	    $i("i3GEOlegendaguia6").onclick = function() {
		i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia6", "i3GEOlegendaguia");
	    };

	    $i("i3GEOlegendaguia2").onclick = function() {
		i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia2", "i3GEOlegendaguia");
	    };
	    $i("i3GEOlegendaguia3").onclick = function() {
		i3GEO.janela.snackBar({content: $trad("ajuda",i3GEOF.legenda.dicionario),style: "red"});
	    };
	    $i("i3GEOlegendaguia4").onclick = function() {
		i3GEOF.legenda.mostraGrafico();
	    };
	    $i("i3GEOlegendaguia5").onclick = function() {
		i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia5", "i3GEOlegendaguia");
	    };
	    i3GEOF.legenda.mostralegenda();
	    i3GEOF.legenda.montaCombosItens();

	    i3GEO.util.aplicaAquarela(p.idContainer);
	    i3GEOF.legenda.aposIniciar.call();
	},
	sldi: function() {
	    i3GEO.tema.dialogo.aplicarsld(i3GEOF.legenda._parameters.tema);
	},
	slde: function() {
	    window.open(i3GEO.configura.locaplic + "/ferramentas/legenda/exec.php?funcao=tema2sld&tema="
		    + i3GEOF.legenda._parameters.tema
		    + "&g_sid="
		    + i3GEO.configura.sid);
	},

	janelaCorRamp: function(){
	    i3GEO.util.abreColourRamp("", "listaColourRamp", i3GEO.arvoreDeCamadas.CAMADASINDEXADAS[i3GEOF.legenda._parameters.tema].numclasses, i3GEOF.legenda._parameters.tema);
	},
	/*
	 * Function: aposAlterarLegenda
	 *
	 * Fun&ccedil;&atilde;o executada ap&oacute;s ocorrer alguma altera&ccedil;&atilde;o efetiva da legenda do mapa
	 */
	aposAlterarLegenda : function() {
	    i3GEO.arvoreDeCamadas.CAMADAS = [];
	    i3GEO.atualiza();
	    i3GEO.Interface.atualizaTema("", i3GEOF.legenda._parameters.tema);
	},
	mostralegenda : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    g_sid: i3GEO.configura.sid,
		    funcao: "editalegenda",
		    opcao: "edita",
		    tema: p.tema
	    };
	    i3GEO.janela.abreAguarde();
	    i3GEO.janela._formModal.block();
	    $.post(
		    i3GEO.configura.locaplic+"/ferramentas/" + i3f._parameters.namespace + "/exec.php",
		    par
	    )
	    .done(
		    function(data, status){
			i3GEO.janela._formModal.unblock();
			i3GEO.janela.fechaAguarde();
			i3GEOF.legenda.montaLegenda(data);
		    }
	    )
	    .fail(
		    function(data){
			i3GEO.janela._formModal.unblock();
			i3GEO.janela.fechaAguarde();
			i3GEO.janela.snackBar({content: data.statusText, style:'red'});
		    }
	    );
	},
	montaLegenda : function(data) {
	    var p = this._parameters,
	    i3f = this;
	    i3f._parameters.aviso = false;
	    $i("i3GEOlegendaguia1objLegenda").innerHTML = "";
	    if (data != undefined) {
		//hidden e utilizado para esconder ou mostrar determinados trechos do template
		var mustache = [], b, ins, i, ajuda, re, n, filtro;
		// se nao for do tipo raster
		if (data[0].proc === "") {
		    n = data.length;
		    re = new RegExp("'", "g");
		    for (i = 0; i < n; i++) {
			mustache.push({
			    cliqueExclui: $trad('cliqueExclui', i3f.dicionario),
			    cliqueAltera: $trad('cliqueAltera', i3f.dicionario),
			    imagem: data[i].imagem,
			    id: data[i].idclasse,
			    idclasse: data[i].idclasse,
			    novoNome: $trad('digitaNovoNome', i3f.dicionario),
			    nome: data[i].nomeclasse,
			    editorExp: $trad("editorExp", i3f.dicionario),
			    exp: (data[i].expressao).replace(re, '"'),
			    txtMinscale: $trad('minScale', i3f.dicionario),
			    minScale: data[i].minScale,
			    txtMaxScale: $trad('maxScale', i3f.dicionario),
			    maxScale: data[i].maxScale,
			    sobe: $trad('sobe', i3f.dicionario),
			    desce: $trad('desce', i3f.dicionario)
			});
		    }
		    ins = Mustache.render(
			    p.mustachelista,
			    $.extend(
				    {},
				    {
					"linhas" :  mustache,
					"hidden2":"",
					"hidden1": "hidden"
				    },
				    p.objdicionario
			    )
		    );
		    $i("i3GEOlegendaguia1objLegenda").innerHTML = ins;
		} else {
		    ajuda = p.objdicionario['ajudaEscalaCores']
		    + "<p>"
		    + p.objdicionario['msgEscalaCoresAuto']
		    + "<p>"
		    + p.objdicionario['msgEscalaCoresIndividual']
		    + "<p>"
		    + p.objdicionario['msgBandas']
		    + "<p>"
		    + p.objdicionario['msgReamostragem'];

		    mustache = [];
		    for (i = 0; i < data[0].proc.length; i++) {
			mustache.push({
			    "value": data[0].proc[i]
			});
		    }

		    ins = Mustache.render(
			    p.mustachelista,
			    $.extend(
				    {},
				    {
					"hidden2":"hidden",
					"hidden1": "",
					"ajuda1": ajuda,
					"processos": mustache
				    },
				    p.objdicionario
			    )
		    );
		    $i("i3GEOlegendaguia1objLegenda").innerHTML = ins;
		}
	    } else {
		i3GEO.janela.snackBar({content: "erro", style:'red'});
	    }
	},
	post: function({btn = false, par = {}, refresh = false, prog = "exec", fn = false} = {}){
	    var p = this._parameters,
	    i3f = this;
	    i3GEO.janela.abreAguarde();
	    if(btn){
		btn = $(btn);
		btn.prop("disabled",true).find("span .glyphicon").removeClass("hidden");
	    }
	    i3GEO.janela._formModal.block();
	    $.post(
		    i3GEO.configura.locaplic+"/ferramentas/" + i3f._parameters.namespace + "/" + prog + ".php",
		    par
	    )
	    .done(
		    function(data, status){
			i3GEO.janela._formModal.unblock();
			i3GEO.janela.fechaAguarde();
			if(btn){
			    btn.prop("disabled",false).find("span .glyphicon").addClass("hidden");
			}
			i3GEO.janela.snackBar({content: $trad('feito')});
			if(refresh){
			    i3GEOF.legenda.aposAlterarLegenda();
			    i3GEOF.legenda.mostralegenda();
			}
			if(fn){
			    fn(data);
			}
		    }
	    )
	    .fail(
		    function(data){
			i3GEO.janela._formModal.unblock();
			i3GEO.janela.fechaAguarde();
			if(btn){
			    btn.prop("disabled",false).find("span .glyphicon").addClass("hidden");
			}
			i3GEO.janela.snackBar({content: data.statusText, style:'red'});
		    }
	    );
	},
	adicionaConta : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "contagemclasse",
		    g_sid: i3GEO.configura.sid,
		    tema: p.tema
	    };
	    i3f.post({btn: btn, par: par, refresh: false, prog: "exec"});
	},
	adicionaOpacidade : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "adicionaOpacidade",
		    g_sid: i3GEO.configura.sid,
		    tema: p.tema,
		    ext: i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten)
	    };
	    i3f.post({btn: btn, par: par, refresh: true, prog: "execclasses"});
	},
	aplicaLegendaImg : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "aplicaLegendaImg",
		    g_sid: i3GEO.configura.sid,
		    tema: p.tema,
		    imagem: $i("i3GEOlegendaImg").value
	    };
	    i3f.post({btn: btn, par: par, refresh: true, prog: "exec"});
	},
	aplicarOffsite : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "aplicaOffsite",
		    g_sid: i3GEO.configura.sid,
		    tema: p.tema,
		    offsite: $i("i3GEOoffsite").value
	    };
	    i3f.post({btn: btn, par: par, refresh: true, prog: "exec"});
	},
	paleta : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "alteraCoresClasses",
		    g_sid: i3GEO.configura.sid,
		    tema: p.tema,
		    cori: $i("i3GEOlegendaacori").value,
		    corf: $i("i3GEOlegendaacorf").value
	    };
	    i3f.post({btn: btn, par: par, refresh: true, prog: "execclasses"});
	},
	getLegendParameters: function(){
	    var par = {},tabela = $i("i3GEOlegendalegenda"),
	    trs = tabela.getElementsByTagName("tr"),
	    minScales = [],
	    maxScales = [],
	    nomes = [],
	    exps = [],
	    ids = [],
	    t, nn, n, p, cp, temp;
	    for (t = 1; t < trs.length; t++) {
		if (trs[t].childNodes) {
		    nn = trs[t].childNodes;
		    for (n = 0; n < nn.length; n++) {
			if (nn && nn[n] && nn[n].childNodes && nn[n].getElementsByTagName) {
			    var isn = nn[n].getElementsByTagName("input");
			    if (isn && isn[0] != undefined) {
				if (isn[0].name == "nome") {
				    nomes.push(isn[0].value);
				    temp = (isn[0].id).split("i3GEOlegendaid_");
				    ids.push(temp[1]);
				}
				if (isn[0].name == "expressao") {
				    exps.push(isn[0].value);
				}
				if (isn[0].name == "minScale") {
				    minScales.push(parseInt(isn[0].value, 10));
				}
				if (isn[0].name == "maxScale") {
				    maxScales.push(parseInt(isn[0].value, 10));
				}
			    }
			}
		    }
		}
	    }
	    par = {
		    ids: ids.join("|"),
		    nomes: nomes.join("|"),
		    exps: exps.join("|"),
		    minScales: minScales.join(";"),
		    maxScales: maxScales.join("|"),
		    g_sid: i3GEO.configura.sid,
		    ext: i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten),
		    separador: "|"
	    };
	    return par;
	},
	mudaLegenda : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = i3f.getLegendParameters();
	    par.funcao = "alteraclasses";
	    par.tema = p.tema;
	    i3f.post({btn: btn, par: par, refresh: true, prog: "execclasses"});
	},
	adicionaClasse : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "adicionaclasse",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    i3f.post({btn: btn, par: par, refresh: true, prog: "execclasses"});
	},
	inverteCores : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "inverteCoresClasses",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	calculaTamanho : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "calculaTamanhoClasses",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    size: $i("i3GEOlegendaAutoSize").value
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	ordenaClasses : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "ordenaClasses",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	excluilinhaf : function(id) {
	    var p = $i(id);
	    do {
		p.removeChild(p.childNodes[0]);
	    } while (p.childNodes.length > 0);
	    p.parentNode.removeChild(p);
	    i3GEOF.legenda.mudaLegenda();
	},
	modificaCor : function(id) {
	    var obj = $i("tempCorLegenda");
	    if (!obj) {
		var obj = document.createElement("input");
		obj.id = "tempCorLegenda";
		obj.style.display = "none";
		obj.type = "text";
		obj.value = "";
		document.body.appendChild(obj);
		obj.onchange = function() {
		    i3GEOF.legenda.aplicaNovaCor($i("tempCorLegenda").name);
		};
	    }
	    obj.name = id;
	    i3GEO.util.abreCor("", "tempCorLegenda");
	},
	aplicaNovaCor : function(id) {
	    i3GEO.janela.abreAguarde();
	    i3GEO.janela._formModal.block();
	    var retorna = function() {
		i3GEO.janela.snackBar({content: $trad('feito')});
		i3GEO.janela.fechaAguarde();
		i3GEO.janela._formModal.unblock();
		i3GEOF.legenda.aposAlterarLegenda();
		i3GEOF.legenda.mostralegenda();
	    };
	    i3GEO.php.aplicaCorClasseTema(retorna, i3GEOF.legenda._parameters.tema, id, $i("tempCorLegenda").value);
	},
	filtro : function(idRetorno) {
	    i3GEO.tema.dialogo.filtro(i3GEOF.legenda._parameters.tema, true, idRetorno);
	},
	sobelinhaf : function(idclasse) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "sobeclasse",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    idclasse: idclasse
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	descelinhaf : function(idclasse) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "desceclasse",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    idclasse: idclasse
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	aplicaProcessos : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "aplicaProcessos",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    idclasse: idclasse
	    },
	    lista = [], ipt, i;
	    if ($i("i3GEOlegendaprocessos").innerHTML != "") {
		ipt = $i("i3GEOlegendaprocessos").getElementsByTagName("input");
		for (i = 0; i < ipt.length; i++) {
		    if (ipt[i].value != "") {
			lista.push(ipt[i].value);
		    }
		}
	    }
	    par.lista = lista.join("|");
	    i3f.post({btn: btn, par: par, refresh: true, prog: "exec"});
	},
	corj : function(obj) {
	    i3GEO.util.abreCor("", obj);
	},
	aplicaColourRamp : function() {
	    if ($i("listaColourRamp").value != "") {
		var p = this._parameters,
		i3f = this,
		par = {
			funcao: "aplicacoresrgb",
			tema: p.tema,
			g_sid: i3GEO.configura.sid,
			cores: $i("listaColourRamp").value,
			ext: i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten)
		};
		i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	aviso : function() {
	    if (i3GEOF.legenda._parameters.aviso == true) {
		i3GEO.janela.snackBar({content: $trad("msgAplicaAlteracao",i3GEOF.legenda.dicionario),style: "red"});
		i3GEOF.legenda._parameters.aviso == false;
	    }
	},
	/*
	 * Function: simbolounico
	 *
	 * Altera a leganda do tema para o tipo s&iacute;mbolo &uacute;nico
	 *
	 */
	simbolounico : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "simbolounico",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	/*
	 * Function: valorunico
	 *
	 * Altera a leganda do tema para o tipo valor &uacute;nico
	 *
	 */
	valorunico : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "valorunico",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensValorUnico").getElementsByTagName("select")[0].value,
		    itemNome: $i("i3GEOlegendaClassesValorUnico").getElementsByTagName("select")[0].value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	},
	/*
	 * Function: nclasses
	 *
	 * Altera a legenda do tema com um n&uacute;mero espec&iacute;fico de classes
	 *
	 */
	nclasses : function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "nclasses",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensValorClass").getElementsByTagName("select")[0].value,
		    nclasses: $i("i3GEOlegendanclasses").value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: true, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	/*
	 * Function: quebrasnaturais
	 *
	 * Altera a legenda do tema por meio do calculo de quebras naturais
	 *
	 */
	quebrasnaturais : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "quebrasnaturais",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensValorClass").getElementsByTagName("select")[0].value,
		    nclasses: $i("i3GEOlegendanclasses").value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: true, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	/*
	 * Function: quantis
	 *
	 * Altera a leganda do tema por meio do calculo de quantis
	 *
	 */
	quantil : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "quantil",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensValorClass").getElementsByTagName("select")[0].value,
		    nclasses: $i("i3GEOlegendanclasses").value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: true, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	/*
	 * Function: metade
	 *
	 * Duas classes concentrando a soma das metades
	 */
	metade : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "metade",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensMetade").getElementsByTagName("select")[0].value,
		    itemid: $i("i3GEOlegendaitensMetadeId").getElementsByTagName("select")[0].value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    if(par.item == "" || par.itemid == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	/*
	 * Function: media
	 *
	 * Duas classes considerando a media
	 */
	media : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "media",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensMedia").getElementsByTagName("select")[0].value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	/*
	 * Function: quartil
	 *
	 * Altera a leganda do tema claculando as classes pelo m&eacute;todo quartil
	 */
	quartil : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "quartil",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    tipoLegenda: $i("estiloClassesQuartis").value,
		    ignorar: $i("i3GEOlegendaignorar").value,
		    item: $i("i3GEOlegendaitensValorQuartil").getElementsByTagName("select")[0].value,
		    ext: $i("i3GEOFlegendaaplicaextent").checked ? i3GEO.util.extOSM2Geo(i3GEO.parametros.mapexten) : i3GEO.util.extOSM2Geo(i3GEO.parametros.extentTotal)
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	alteraGeometria : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "alteraGeometria",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    tipo: $i("i3GEOlegentaTipoGeo").value
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: false, par: par, refresh: true, prog: "execclasses"});
	    }
	},
	/*
	 * Function: representacao
	 *
	 * Altera o tipo de representa&ccedil;&atilde;o do tema (linear ou poligonoal)
	 *
	 */
	representacao : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "alterarepresentacao",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    if(par.item == ""){
		i3GEO.janela.snackBar({content: $trad("selecionaUmItem",i3GEOF.legenda.dicionario),style: "red"});
	    } else {
		i3f.post({btn: false, par: par, refresh: true, prog: "exec"});
	    }
	},
	aplicaTodasClasses : function(parametro, id) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "aplicaTodasClasses",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    parametro: parametro,
		    valor: $i(id).value

	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execsymbol"});
	},
	aplicaEstilo : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "aplicaParametro",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    outlinecolor: $i("i3GEOlegendaoutlinecolor").value,
		    backgroundcolor: $i("i3GEOlegendabackgroundcolor").value,
		    color: $i("i3GEOlegendacolor").value,
		    symbolname:	$i("i3GEOlegendasymbolname").value,
		    //simbolos: $i("i3GEOlegendasimbolos").getElementsByTagName("img"),
		    size: $i("i3GEOlegendasizes").value,
		    width: $i("i3GEOlegendawidth").value,
		    pattern: $i("i3GEOlegendapattern").value,
		    opacidade: $i("i3GEOlegendaopacidade").value,
		    angle: $i("i3GEOlegendaangulo").value,
		    symbolscale: $i("i3GEOlegendasymbolscale").value != "" ? parseInt($i("i3GEOlegendasymbolscale").value, 10) : -1,
			    minsize: $i("i3GEOlegendaminsize").value,
			    maxsize: $i("i3GEOlegendamaxsize").value,
			    offsetx: $i("i3GEOlegendaoffsetx").value,
			    offsety: $i("i3GEOlegendaoffsety").value,
			    classe: p.classe,
			    estilo: p.estilo

	    };
	    i3f.post({btn: false, par: par, refresh: true, prog: "execsymbol"});
	},
	editaSimbolo : function(id) {
	    i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia3", "i3GEOlegendaguia");
	    i3GEOF.legenda._parameters.classe = id;
	    i3GEOF.legenda.formEditorSimbolo(id);
	},
	formEditorSimbolo : function(id) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "parametros",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classe: id
	    };
	    i3f.post({fn: i3GEOF.legenda.montaEditor, btn: false, par: par, refresh: false, prog: "execsymbol"});
	},
	montaEditor : function(data) {
	    i3GEO.util.comboItens(
		    "i3GEOlegendaSelItemLabel",
		    i3GEOF.legenda._parameters.tema,
		    function(retorno) {
			if ($i("i3GEOlegendaitensLabel")) {
			    $i("i3GEOlegendaitensLabel").innerHTML = retorno.dados ;
			}
		    },
		    "i3GEOlegendaitensLabel",
		    "",
		    "",
		    "",
		    "form-control"
	    );
	    var b, l, i, sct, combo, n;
	    i3GEOF.legenda._parameters.estilos = data.split("|");
	    combo =
		"<select id='i3GEOlegendaestilos' class='form-control' onchange=i3GEOF.legenda._parameters.estilo=this.value;i3GEOF.legenda.mostraEstilo(this.value)>";
	    n = i3GEOF.legenda._parameters.estilos.length;
	    for (i = 0; i < n; i++) {
		l = i3GEOF.legenda._parameters.estilos[i].split("#");
		sct = "<option value=" + l[1] + "  />" + l[1] + "</option>";
		combo += sct;
	    }
	    combo += "</select></div>";
	    $i("i3GEOlegendacomboestilos").innerHTML = combo;
	    $i("i3GEOlegendaestilos").value = i3GEOF.legenda._parameters.estilo;
	    i3GEOF.legenda.mostraEstilo(0);
	},
	desceEstilo: function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "desceestilo",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classe: p.classe,
		    estilo: p.estilo

	    };
	    i3f.post({fn: i3f.reMontaEditor, btn: true, par: par, refresh: false, prog: "execsymbol"});
	},
	sobeEstilo: function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "sobeestilo",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classe: p.classe,
		    estilo: p.estilo

	    };
	    i3f.post({fn: i3f.reMontaEditor, btn: true, par: par, refresh: false, prog: "execsymbol"});
	},
	adicionaEstilo: function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "adicionaestilo",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classe: p.classe,
		    estilo: p.estilo
	    };
	    p.estilo = p.estilo + 1;
	    i3f.post({fn: i3f.reMontaEditor, btn: true, par: par, refresh: false, prog: "execsymbol"});
	},
	excluiEstilo: function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "excluiestilo",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classe: p.classe,
		    estilo: p.estilo
	    };
	    p.estilo = 0;
	    i3f.post({fn: i3f.reMontaEditor, btn: true, par: par, refresh: false, prog: "execsymbol"});
	},
	propriedadesLabels: function() {
	    i3GEO.util.scriptTag(
		    i3GEO.configura.locaplic + "/ferramentas/opcoes_label/dependencias.php",
		    "i3GEOF.proplabel.iniciaJanelaFlutuante(false)",
		    "i3GEOFproplabel",
		    false);
	},
	incluirLabels: function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = i3f.parDefault;

	    if(i3GEOF.proplabel){
		par = i3GEOF.proplabel.getParameters();
		i3f.parDefault = par;
	    }
	    par.funcao = "adicionaLabelClasse";
	    par.tema = p.tema;
	    par.g_sid = i3GEO.configura.sid;
	    par.classe = p.classe;
	    par.item = $i("i3GEOlegendaSelItemLabel").value;
	    i3f.post({btn: btn, par: par, refresh: true, prog: "exec"});
	},
	excluiLabels: function(btn) {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "removeLabelClasse",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classe: p.classe
	    };
	    i3f.post({btn: true, par: par, refresh: true, prog: "exec"});
	},
	mostraEstilo : function() {
	    var linha, tipoLayer, d, p, cp, mustache = {};
	    //i3GEOF.legenda._parameters.estilo = e; // esta e uma variavel global
	    linha = i3GEOF.legenda._parameters.estilos[i3GEOF.legenda._parameters.estilo];
	    linha = linha.split("#");
	    tipoLayer = linha[0];
	    mustache = {
		    "voutlinecolor": linha[2],
		    "vcolor": linha[4],
		    "vbackgroundcolor": linha[3],
		    "vsize": linha[6],
		    "vwidth": linha[8],
		    "vpattern": linha[9],
		    "vopacity": linha[7],
		    "vangle": linha[10],
		    "vsymbolscale": linha[11],
		    "vminsize": linha[12],
		    "vmaxsize": linha[13],
		    "voffsetx": linha[14],
		    "voffsety": linha[15],
		    "vsymbolname": linha[5],
	    };
	    ins = Mustache.render(
		    i3GEOF.legenda._parameters.mustacheestilo,
		    $.extend(
			    {},
			    mustache,
			    i3GEOF.legenda._parameters.objdicionario
		    )
	    );
	    $i("i3GEOlegendaParametrosEstilos").innerHTML = ins;
	    //preenche as listas de itens
	    i3GEO.util.comboItens(
		    "",
		    i3GEOF.legenda._parameters.tema, function(retorno) {
			if ($i("i3GEOlegendaComboSize")) {
			    $i("i3GEOlegendaComboSize").innerHTML = retorno.dados.replace("id=''"," onchange='$i(\"i3GEOlegendasizes\").value = this.value'");
			}
		    },
		    "",
		    "",
		    "",
		    "",
		    "form-control"
	    );
	    i3GEO.util.aplicaAquarela("i3GEOlegendaParametrosEstilos");
	    i3GEOF.legenda.post({btn: false, par: {
		funcao: "listaSimbolos",
		g_sid: i3GEO.configura.sid,
		onclick: 'i3GEOF.legenda.aplicaSimbolo(this)',
		tipo: tipoLayer
	    }, refresh: false, prog: "execsymbol", fn: i3GEOF.legenda.listaSimbolos});
	},
	listaSimbolos : function(data) {
	    $i("i3GEOlegendasimbolos").innerHTML = data;
	},
	aplicaSimbolo : function(s) {
	    $i("i3GEOlegendasymbolname").value = s.title;
	},
	reMontaEditor : function() {
	    i3GEOF.legenda.editaSimbolo(i3GEOF.legenda._parameters.classe);
	    i3GEOF.legenda.aposAlterarLegenda();
	},
	mostraGrafico : function() {
	    var monta =
		function(data) {
		if (data && data[0].proc == "") {
		    var b, ins = [], i, re, t;
		    ins.push("<h4>" + $trad('numeroOcorrenciasClasses', i3GEOF.legenda.dicionario) + "</h4>");
		    ins.push("<table width=100% >");
		    i3GEOF.legenda._parameters.dadosGrafico = [
			"n;x"
			];
		    if (data.length < 2) {
			i3GEO.janela.snackBar({content: $trad("msgNumeroClasses",i3GEOF.legenda.dicionario),style: "red"});
			i3GEOF.legenda.aguarde.visibility = "hidden";
			return;
		    } else {
			i3GEO.guias.mostraGuiaFerramenta("i3GEOlegendaguia4", "i3GEOlegendaguia");
		    }
		    for (i = 0; i < data.length; i++) {
			id = data[i].tema + "-" + data[i].idclasse; // layer+indice da classe
			re = new RegExp("'", "g");
			exp = (data[i].expressao).replace(re, '"');
			ins.push("<tr><td style='text-align:left;border-bottom:0 none white' >" + data[i].nomeclasse
				+ "</td></tr>");
			t = (data[i].nreg * 100) / data[i].totalreg;
			ins.push("<tr><td style=text-align:left ><img height=15px width=" + t
				+ "% src='"
				+ data[i].imagem
				+ "' /></td></tr>");
			i3GEOF.legenda._parameters.dadosGrafico.push(data[i].nomeclasse + ";" + data[i].nreg);
		    }
		    ins.push("</table><br>");
		    $i("i3GEOlegendaguia4obj").innerHTML = ins.join("");
		}
	    };
	    i3GEOF.legenda.post({
		btn: false,
		par: {
		    funcao: "contagemclasse",
		    g_sid: i3GEO.configura.sid,
		    tema: i3GEOF.legenda._parameters.tema,
		},
		refresh: false,
		prog: "exec",
		fn: monta
	    });
	},
	/*
	 * Function: adicionaProcesso
	 *
	 * Adiciona um novo processo na lista de processos
	 */
	adicionaProcesso : function(s) {
	    $i("i3GEOlegendaprocessos").innerHTML += "<div class='form-group label-fixed condensed'><input value='" + s.value + "' class='form-control input-lg' type='text' /></div>";
	},
	aplicarCluster : function(btn){
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "aplicarCluster",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    maxdistance: $i("i3GEOlegendaClusterMaxdistance").value,
		    buffer: $i("i3GEOlegendaClusterBuffer").value,
		    filter: $i("i3GEOlegendaClusterFilter").value,
		    region: $i("i3GEOlegendaClusterRegion").value,
		    group: $i("i3GEOlegendaitensCluster").getElementsByTagName("select")[0].value,

	    };
	    i3f.post({
		fn: function() {
		    i3GEOF.legenda.aposAlterarLegenda();
		    i3GEOF.legenda.montaCombosItens();
		},btn: true, par: par, refresh: false, prog: "exec"
	    });
	},
	removerCluster : function(btn){
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "removerCluster",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    i3f.post({
		fn: function() {
		    i3GEOF.legenda.aposAlterarLegenda();
		    i3GEOF.legenda.montaCombosItens();
		},btn: true, par: par, refresh: false, prog: "exec"
	    });
	},
	montaCombosItens : function(){
	    i3GEO.util.comboItens(
		    "",
		    i3GEOF.legenda._parameters.tema,
		    function(retorno) {
			if ($i("i3GEOlegendaitensValorUnico")) {
			    $i("i3GEOlegendaitensValorUnico").innerHTML = retorno.dados ;
			}
			if ($i("i3GEOlegendaClassesValorUnico")) {
			    $i("i3GEOlegendaClassesValorUnico").innerHTML = retorno.dados;
			}
			if ($i("i3GEOlegendaitensMetade")) {
			    $i("i3GEOlegendaitensMetade").innerHTML = retorno.dados;
			}
			if ($i("i3GEOlegendaitensMetadeId")) {
			    $i("i3GEOlegendaitensMetadeId").innerHTML = retorno.dados;
			}
			if ($i("i3GEOlegendaitensMedia")) {
			    $i("i3GEOlegendaitensMedia").innerHTML = retorno.dados;
			}
			if ($i("i3GEOlegendaitensValorClass")) {
			    $i("i3GEOlegendaitensValorClass").innerHTML = retorno.dados;
			}
			if ($i("i3GEOlegendaitensCluster")) {
			    $i("i3GEOlegendaitensCluster").innerHTML = retorno.dados;
			}
			if ($i("i3GEOlegendaitensValorQuartil")) {
			    $i("i3GEOlegendaitensValorQuartil").innerHTML = retorno.dados;
			}
		    },
		    "",
		    "",
		    "",
		    "",
		    "form-control"
	    );
	},
	getParametrosAuto : function() {
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "parametrosauto",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid
	    };
	    i3f.post({
		fn: function(data) {
		    $i("i3GEOlegendaAutocolunas").innerHTML = data.colunas.replace(/,/gi,', ');
		    $i("i3GEOlegendaAutoclassesitem").value = data.classesitem;
		    $i("i3GEOlegendaAutoclassesnome").value = data.classesnome;
		    $i("i3GEOlegendaAutoclassescor").value = data.classescor;
		    $i("i3GEOlegendaAutoclassessimbolo").value = data.classessimbolo;
		    $i("i3GEOlegendaAutoclassestamanho").value = data.classestamanho;
		    $i("i3GEOlegendaAutopalletefile").value = data.palletefile;
		    $i("i3GEOlegendaAutopalletestep").value = data.palletestep;
		},btn: false, par: par, refresh: false, prog: "exec"
	    });
	},
	salvaParametrosAuto: function(btn){
	    var p = this._parameters,
	    i3f = this,
	    par = {
		    funcao: "salvaparametrosauto",
		    tema: p.tema,
		    g_sid: i3GEO.configura.sid,
		    classesitem: $i("i3GEOlegendaAutoclassesitem").value,
		    classesnome: $i("i3GEOlegendaAutoclassesnome").value,
		    classescor: $i("i3GEOlegendaAutoclassescor").value,
		    classessimbolo: $i("i3GEOlegendaAutoclassessimbolo").value,
		    classestamanho: $i("i3GEOlegendaAutoclassestamanho").value,
		    palletefile: $i("i3GEOlegendaAutopalletefile").value,
		    palletestep: $i("i3GEOlegendaAutopalletestep").value
	    };
	    i3f.post({btn: true, par: par, refresh: true, prog: "exec"});
	}
};
//aplica ao codigo i3GEOF definicoes feitas na interface do mapa
//isso permite a substituicao de funcoes e parametros
if(i3GEO.configura.ferramentas.hasOwnProperty("legenda")){
    jQuery.each( i3GEO.configura.ferramentas.legenda, function(index, value) {
	i3GEOF.legenda[index] = i3GEO.configura.ferramentas.legenda[index];
    });
}