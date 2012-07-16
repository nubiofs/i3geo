/*
Title: i3geo - carregador de javascripts

Para uso nas interfaces HTML.

L&ecirc; o conjunto de javascripts para o funcionamento do i3geo.

Carrega o arquivo compactado i3geo_tudo_compacto.js.php

Veja exemplo em <geral.htm>

Arquivo:

i3geo/classesjs/i3geo.js

Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUA�&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
*/
/*
Pega um objeto do documento.

Exemplo: $i("box1")

Par�metros:

id - id do objeto

Retorno:

object - objeto javaScript
*/
$i = function(id)
{return document.getElementById(id);};

(function(){
	var scriptLocation = "";
	var scripts = document.getElementsByTagName('script');
	var i = 0;
	for (i = 0; i < scripts.length; i++) {
		var src = scripts[i].getAttribute('src');
		if (src) {
			var index = src.lastIndexOf("i3geo.js");
			// is it found, at the end of the URL?
			if ((index > -1) && (index + "i3geo.js".length == src.length)) {
				scriptLocation = src.slice(0, -"i3geo.js".length);
				break;
			}
		}
	}
	document.write("<link rel='stylesheet' type='text/css' href='" + scriptLocation + "../css/i3geo47.css.php'></link>");
	document.write("<link rel='stylesheet' type='text/css' href='" + scriptLocation + "../pacotes/yui290/build/button/assets/skins/sam/button.css'></link>");
	document.write("<script type='text/javascript' src='" + scriptLocation + "i3geo_tudo_compacto47.js.php'></script>");
})();