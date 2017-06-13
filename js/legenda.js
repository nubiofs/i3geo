if (typeof (i3GEO) === 'undefined') {
	var i3GEO = {};
}
i3GEO.legenda =
{
	/**
	 * Armazena o id definido na criacao da legenda
	 */
	ID : "",
	/**
	 * Armazena a lista de camadas que devem ficar escondidas na legenda
	 */
	CAMADASSEMLEGENDA : [],
	/**
	 * posicao apos mover
	 */
	POSICAO: "",
	CONFIG: {
		"idOnde":"",
		"idLegenda": ""
	},
	inicia : function(config) {
		if (typeof (console) !== 'undefined')
			console.info("i3GEO.legenda.inicia()");

		if(config){
			$.each( config, function( i,v ) {
				i3GEO.legenda.CONFIG[i] = v;
			});
		}
		config = i3GEO.legenda.CONFIG;
		if (!$i(config.idOnde)) {
			return;
		}
		i3GEO.eventos.adicionaEventos("NAVEGAMAPA", [
		   "i3GEO.legenda.atualiza()"
		]);
		i3GEO.legenda.atualiza();
	},
	/**
	 * Function: atualiza
	 *
	 * Atualiza o elemento HTML do mapa utilizado para mostrar a legenda
	 */
	atualiza : function() {
		var idleg = $i(i3GEO.legenda.CONFIG.idLegenda);
		var tamanho = $($("#" + i3GEO.legenda.CONFIG.idLegenda).attr("data-template")).attr("data-size").split(",");

		if (idleg && idleg.style.display === "block") {
			i3GEO.php.criaLegendaJSON(i3GEO.legenda.montaLegenda, "", tamanho[0], tamanho[1]);
		}
	},
	montaLegenda : function(retorno){
		var legenda = "",
			t,idleg;

		idleg = $i(i3GEO.legenda.CONFIG.idLegenda);
		idleg.innerHTML = $trad("o1");

		if (retorno.data.legenda != "") {
			$(".legendaTemaSolto").remove();
			t = Mustache.to_html(
					"{{#data}}" + $($("#" + i3GEO.legenda.CONFIG.idLegenda).attr("data-template")).html() + "{{/data}}",
					{
						"data":retorno.data.legenda,
						"altera": $trad("p9")
					}
				);
			idleg.innerHTML = t;

			$("#" + i3GEO.legenda.CONFIG.idLegenda).find(".draggable").draggable({
				helper: "clone",
				appendTo: "body",
				start: function(event, ui) {
					$(this).hide();
		        },
				stop: function(event, ui) {
					$(this).css({"position":"absolute","top":(event.clientY - event.offsetY),"left": (event.clientX - event.offsetX)});
					$(this).addClass("legendaTemaSolto");
					$("body").append($(this));
					$(this).show();
		        }
			});
			$("#" + i3GEO.legenda.CONFIG.idLegenda + " img").bind('click',function (e) {
	            e.stopPropagation();
	        },false);
		} else {
			idleg.innerHTML = "";
		}
	},
	png: function() {
		var obj = $i("i3GEOconteudoLegenda");
		if($i("wlegenda")){
			obj.style.width = $i("wlegenda").style.width;
		}
		else{
			obj.style.width ="400px";
		}
		if($i("wlegenda_corpo")){
			obj.style.height = $i("wlegenda_corpo").style.height;
		}
		else{
			obj.style.height ="400px";
		}
		i3GEO.mapa.dialogo.html2canvas(obj);
	},
	/**
	 * Liga ou desliga um unico tema. Utilizado pela legenda HTML, permitindo que um tema seja processado diretamente na legenda.
	 *
	 * Parametro:
	 *
	 * inputbox {object) - objeto do tipo input checkbox com a propriedade value indicando o codigo do tema que sera processado
	 */
	ativaDesativaTema : function(inputbox) {
		var temp = function() {
			// i3GEO.contadorAtualiza++;
			i3GEO.php.corpo(i3GEO.atualiza, i3GEO.configura.tipoimagem);
			i3GEO.arvoreDeCamadas.atualiza("");
			i3GEO.janela.fechaAguarde("redesenha");
		};
		if (!inputbox.checked) {
			i3GEO.php.ligatemas(temp, inputbox.value, "");
		} else {
			i3GEO.php.ligatemas(temp, "", inputbox.value);
		}
	},
	/**
	 * Liga ou desliga uma classe da legenda.
	 *
	 * A chamada dessa fun&ccedil;&atilde;o &eacute; definida em aplicmap/legenda2.htm
	 *
	 * Parametro:
	 *
	 * {Object input} - objeto do tipo INPUT com o id da classe e o id do tema
	 */
	inverteStatusClasse : function(leg) {
		var temp = function(retorno) {
			//i3GEO.atualiza();
			i3GEO.Interface.atualizaTema(retorno, leg.name);
		};
		i3GEO.php.inverteStatusClasse(temp, leg.name, leg.value);
	},
	mudaCorClasse : function(tema,idclasse) {
		var obj, novoel;
		if (!$i("tempinputcorclasse")) {
			novoel = document.createElement("input");
			novoel.id = "tempinputcorclasse";
			novoel.style.display = "none";
			novoel.type = "hidden";
			novoel.onchange = function() {
				var obj = $("#tempinputcorclasse");
				i3GEO.tema.alteracorclasse(obj.attr("tema"), obj.attr("idclasse"), obj.val());
			};
			document.body.appendChild(novoel);
		}
		$("#tempinputcorclasse").attr({"tema":tema,"idclasse":idclasse});
		i3GEO.util.abreCor("", "tempinputcorclasse");
	}
};