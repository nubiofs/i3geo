/*
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
parametrosURL()
var endereco = window.location.protocol+"//"+window.location.host
var lista = window.parent.i3GEO.arvoreDeCamadas.CAMADAS;
var tema = lista[0].name;
var endereco = g_locaplic+"/pacotes/kmlmapserver/kmlservice.php?map="+window.parent.i3GEO.parametros.mapfile+"&typename="+tema+"&request=kml"
$i("resultado").innerHTML = endereco
$i("men1").innerHTML += "<br><br><b>Voc&ecirc; pode tamb�m utilizar o link <span style=color:red >"+g_locaplic+"/kml.php </span><br>para mostrar a &aacute;rvore completa de temas no GoogleEarth"