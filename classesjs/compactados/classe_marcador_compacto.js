if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.marcador={prompt:function(){i3GEO.janela.prompt($trad("x77"),i3GEO.marcador.armazena,"")},armazena:function(){var cookies=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),ext=i3GEO.parametros.mapexten,nome="Marcador",valor;if($i("i3GEOjanelaprompt")){nome=$i("i3GEOjanelaprompt").value}valor=nome+"|"+ext;if(cookies){cookies+=":"}else{cookies=""}valor=cookies+valor;i3GEO.util.insereCookie("marcadoresDoI3Geo",valor,365);i3GEO.marcador.redesenha()},redesenha:function(){var m=i3GEOoMenuBar.getMenu("i3GeoMenuMarcador");m.clearContent();m.addItems(i3GEO.marcador.itensMenu());m.render()},exporta:function(){var c=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),texto;if(!c){c=""}texto="<p class=paragrafo >"+$trad("x78")+"<br><br><input type=text value='"+c+"' size=37 />";i3GEO.janela.mensagemSimples(texto,$trad("x79"))},exportaShp:function(){var c=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),temp=function(retorno){i3GEO.temaAtivo=retorno.data;i3GEO.atualiza()};if(c){i3GEO.php.marcadores2shp(temp)}},importa:function(){var temp=function(){var cookies=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),novos;if($i("i3GEOjanelaprompt")){novos=$i("i3GEOjanelaprompt").value}if(cookies){cookies+=":"}else{cookies=""}novos=cookies+novos;i3GEO.util.insereCookie("marcadoresDoI3Geo",novos,365);i3GEO.marcador.redesenha()};i3GEO.janela.prompt($trad("x83"),temp,"")},remove:function(nomeMarcador){var cookie=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),valores=cookie.split(":"),n=valores.length,i,temp,m,novos=[];for(i=0;i<n;i++){temp=valores[i].split("|");if(temp[0]&&temp[0]!==nomeMarcador){novos.push(valores[i])}}i3GEO.util.insereCookie("marcadoresDoI3Geo",novos.join(":"),365);i3GEO.marcador.redesenha()},recuperaZoom:function(nomeMarcador){var cookie=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),valores=cookie.split(":"),n=valores.length,i,temp;for(i=0;i<n;i++){temp=valores[i].split("|");if(temp[0]&&temp[0]===nomeMarcador){i3GEO.navega.zoomExt("","","",temp[1]);return}}},adicionaMenuSuspenso:function(obj){obj.menu.push({nome:$trad("x79"),id:"i3GeoMenuMarcador"});obj.submenus.i3GeoMenuMarcador=i3GEO.marcador.itensMenu();return obj},itensMenu:function(){var itens=[],cookie=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),valores,n,i,temp;itens.push({id:"omenudataMarcadorSalva",text:$trad("x82"),url:"javascript:i3GEO.marcador.prompt()"},{id:"omenudataMarcadorExporta",text:$trad("x80"),url:"javascript:i3GEO.marcador.exporta()"},{id:"omenudataMarcadorImporta",text:$trad("x81"),url:"javascript:i3GEO.marcador.importa()"},{id:"omenudataMarcadorExportaShp",text:$trad("x84"),url:"javascript:i3GEO.marcador.exportaShp()"});if(cookie){valores=cookie.split(":");n=valores.length;for(i=0;i<n;i++){temp=valores[i].split("|");if(temp.length===2){itens.push({id:"omenudataMarcador"+i,text:"<img src='"+i3GEO.configura.locaplic+"/imagens/visual/default/branco.gif' class=x onclick='i3GEO.marcador.remove(\""+temp[0]+"\")' />&nbsp;<span style=color:blue>"+temp[0]+"</span>",url:"javascript:i3GEO.marcador.recuperaZoom('"+temp[0]+"')"})}}}return itens}};