if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.marcador={IDONDE:"",TEMPLATE:"",config:{"template":"templates/ferramentasLink.html"},carregaTemplates:function(){$.get(i3GEO.marcador.config.template,function(template){i3GEO.template.marcador=template;i3GEO.marcador.inicia()})},inicia:function(obj){if(obj&&$(obj).attr("data-template")!=undefined){i3GEO.marcador.config.template=$(obj).attr("data-template")}if(!i3GEO.template.marcador){i3GEO.marcador.carregaTemplates();return}else{var janela=i3GEO.janela.cria("380px","400px","","","","<div class='i3GeoTituloJanela'>"+$trad("x79")+"</div>","i3GEOmarcador",false,"hd","","","",true,i3GEO.configura.locaplic+"/imagens/oxygen/16x16/games-config-custom.png");i3GEO.marcador.IDONDE=janela[2].id;i3GEO.marcador.redesenha()}},prompt:function(){i3GEO.janela.prompt($trad("x77"),i3GEO.marcador.armazena,"")},armazena:function(){var cookies=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),ext=i3GEO.parametros.mapexten,nome="Marcador",valor;if($i("i3GEOjanelaprompt")){nome=$i("i3GEOjanelaprompt").value}valor=nome+"|"+ext;if(cookies){cookies+=":"}else{cookies=""}valor=cookies+valor;i3GEO.util.insereCookie("marcadoresDoI3Geo",valor,365);i3GEO.marcador.redesenha()},redesenha:function(){var t=Mustache.to_html("{{#data}}"+i3GEO.template.marcador+"{{/data}}",{"data":i3GEO.marcador.itensMenu()});$("#"+i3GEO.marcador.IDONDE).html(t)},exporta:function(){var c=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),texto;if(!c){c=""}texto="<p class=paragrafo >"+$trad("x78")+"</p><div class='i3geoForm i3geoFormIconeEdita' ><input type=text value='"+c+"' onclick='javascript:this.select()'/></div>";i3GEO.janela.mensagemSimples(texto,$trad("x79"))},exportaShp:function(){var c=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),temp=function(retorno){i3GEO.temaAtivo=retorno.data;i3GEO.atualiza()};if(c){i3GEO.php.marcadores2shp(temp)}},importa:function(){var temp=function(){var cookies=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),novos="";if($i("i3GEOjanelaprompt")){novos=$i("i3GEOjanelaprompt").value}if(cookies){cookies+=":"}else{cookies=""}novos=cookies+novos;i3GEO.util.insereCookie("marcadoresDoI3Geo",novos,365);i3GEO.marcador.redesenha()};i3GEO.janela.prompt($trad("x83"),temp,"")},remove:function(nomeMarcador){var cookie=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),valores=cookie.split(":"),n=valores.length,i,temp,novos=[];for(i=0;i<n;i++){temp=valores[i].split("|");if(temp[0]&&temp[0]!==nomeMarcador){novos.push(valores[i])}}i3GEO.util.insereCookie("marcadoresDoI3Geo",novos.join(":"),365);i3GEO.marcador.redesenha()},recuperaZoom:function(nomeMarcador){var cookie=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),valores=cookie.split(":"),n=valores.length,i,temp;for(i=0;i<n;i++){temp=valores[i].split("|");if(temp[0]&&temp[0]===nomeMarcador){i3GEO.navega.zoomExt("","","",temp[1]);return}}},adicionaMenuSuspenso:function(obj){obj.menu.push({nome:$trad("x79"),id:"i3GeoMenuMarcador"});obj.submenus.i3GeoMenuMarcador=i3GEO.marcador.itensMenu();return obj},itensMenu:function(){var itens=[],cookie=i3GEO.util.pegaCookie("marcadoresDoI3Geo"),valores,n,i,temp;itens.push({nome:$trad("x82"),url:"javascript:i3GEO.marcador.prompt()"},{nome:$trad("x80"),url:"javascript:i3GEO.marcador.exporta()"},{nome:$trad("x81"),url:"javascript:i3GEO.marcador.importa()"},{nome:$trad("x84"),url:"javascript:i3GEO.marcador.exportaShp()"});if(cookie){valores=cookie.split(":");n=valores.length;for(i=0;i<n;i++){temp=valores[i].split("|");if(temp.length===2){itens.push({nome:temp[0],url:"javascript:i3GEO.marcador.recuperaZoom('"+temp[0]+"')",opcional:"<a href='javascript:void(0)' onclick='i3GEO.marcador.remove(\""+temp[0]+"\")' class='btn btn-danger btn-fab btn-fab-mini' role='button'><span class='material-icons md-18'>delete_forever</span></a>"})}}}return itens}};