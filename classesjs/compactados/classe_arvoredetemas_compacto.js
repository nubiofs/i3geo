if(typeof(i3GEO)=='undefined'){i3GEO=[]}i3GEO.arvoreDeTemas={OPCOESADICIONAIS:{idonde:"",incluiArvore:true,uploaddbf:true,uploadlocal:true,downloadbase:true,conectarwms:true,conectarwmst:true,conectargeorss:true,nuvemTags:true,nuvemTagsFlash:false,navegacaoDir:false,incluibusca:true,kml:true,qrcode:true,mini:true,estrelas:true,refresh:true,carousel:true},FATORESTRELA:"50",INCLUISISTEMAS:true,INCLUIWMS:true,FILTRADOWNLOAD:false,FILTRAOGC:false,TIPOBOTAO:"checkbox",ATIVATEMA:"",IDSMENUS:[],RETORNAGUIA:"",IDHTML:null,LOCAPLIC:null,SID:null,ARVORE:null,DRIVES:null,SISTEMAS:null,MENUS:null,GRUPOS:null,SUBGRUPOS:null,TEMAS:null,listaWMS:function(){var monta=function(retorno){var node,raiz,nraiz,cor,i,html,tempNode;node=i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("idwms","raiz");raiz=retorno.data.canais;nraiz=raiz.length;cor="rgb(51, 102, 102)";for(i=0;i<nraiz;i++){html="<span style='color:"+cor+"' title='"+raiz[i].description+"'> "+raiz[i].title;if(raiz[i].nacessos>0){html+=" ("+((raiz[i].nacessosok*100)/(raiz[i].nacessos*1))+"%)</span>"}else{html+=" (% de acessos n�o definido)</span>"}html+="<hr>";tempNode=new YAHOO.widget.HTMLNode({html:html,id_ws:raiz[i].id_ws,url:raiz[i].link,nivel:0},node,false,true);tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.listaLayersWMS,1);tempNode.enableHighlight=false;if(cor=="rgb(51, 102, 102)"){cor="rgb(47, 70, 50)"}else{cor="rgb(51, 102, 102)"}}node.loadComplete()};i3GEO.php.listaRSSwsARRAY(monta,"WMS")},listaLayersWMS:function(node){var monta=function(retorno){var n,cor,i,cabeca,tempNode,ns,j,tempNodeS;n=0;try{n=retorno.data.length}catch(m){node.loadComplete();return}cor="rgb(51, 102, 102)";html="";for(i=0;i<n;i++){cabeca=retorno.data[i].nome+" - "+retorno.data[i].titulo;if(cabeca!="undefined - undefined"){tempNode=new YAHOO.widget.HTMLNode({html:"<span style='color:"+cor+"' >"+cabeca,url:node.data.url,nivel:(node.data.nivel*1+1),id_ws:"",layer:retorno.data[i].nome},node,false,true);tempNode.enableHighlight=false;if(!retorno.data[i].estilos){tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.listaLayersWMS,1)}if(retorno.data[i].estilos){ns=retorno.data[i].estilos.length;for(j=0;j<ns;j++){tempNodeS=new YAHOO.widget.HTMLNode({html:i3GEO.arvoreDeTemas.montaTextoTemaWMS(node.data.url,retorno.data[i].nome,retorno.data[i].estilos[j].nome,retorno.data[i].estilos[j].titulo,retorno.data[i].srs.toString(),retorno.data[i].formatsinfo.toString(),retorno.data[i].version.toString(),retorno.data[i].formats.toString(),cor)},tempNode,false,true);tempNode.isleaf=true;tempNodeS.enableHighlight=false}}if(cor=="rgb(51, 102, 102)"){cor="rgb(47, 70, 50)"}else{cor="rgb(51, 102, 102)"}}}node.loadComplete()};i3GEO.php.listaLayersWMS(monta,node.data.url,(node.data.nivel*1+1),node.data.id_ws,node.data.layer)},montaTextoTemaWMS:function(servico,layer,estilo,titulo,proj,formatoinfo,versao,formatoimg,cor){var html,temp,adiciona;html="<td style='vertical-align:top;padding-top:5px;'><span ><input style='cursor:pointer;border:solid 0 white;' ";temp=function(){i3GEO.janela.fechaAguarde("ajaxredesenha");i3GEO.atualiza()};adiciona="javascript:i3GEO.janela.abreAguarde(\"ajaxredesenha\",\""+$trad("o1")+"\");this.checked=false;i3GEO.php.adicionaTemaWMS("+temp+",";adiciona+="\""+servico+"\",";adiciona+="\""+layer+"\",";adiciona+="\""+estilo+"\",";adiciona+="\""+proj+"\",";adiciona+="\""+formatoimg+"\",";adiciona+="\""+versao+"\",";adiciona+="\""+titulo+"\",";adiciona+="\"\",";adiciona+="\"nao\",";adiciona+="\""+formatoinfo+"\")";html+="onclick='"+adiciona+"' ";html+=" type='radio'  /></td><td style='padding-top:4px;vertical-align:top;text-align:left;padding-left:3px;color:"+cor+";' >";html+=layer+" - "+titulo;html+="</td></span>";return(html)},listaMenus:function(g_sid,g_locaplic,funcao){var retorno=function(retorno){var c,m,i,k,jj,j;if(i3GEO.arvoreDeTemas.IDSMENUS.length===0){i3GEO.arvoreDeTemas.MENUS=retorno.data}else{i3GEO.arvoreDeTemas.MENUS=[];c=retorno.data.length;m=i3GEO.arvoreDeTemas.IDSMENUS.length;for(i=0,j=c;i<j;i++){for(k=0,jj=m;k<jj;k++){if(retorno.data[i].idmenu==i3GEO.arvoreDeTemas.IDSMENUS[k]){i3GEO.arvoreDeTemas.MENUS.push(retorno.data[i])}}}}if(funcao!==""){eval(funcao+"(retorno)")}};i3GEO.php.pegalistademenus(retorno)},listaGrupos:function(g_sid,g_locaplic,id_menu,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.GRUPOS=retorno.data;if(funcao!==""){funcao.call()}};if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD||i3GEO.arvoreDeTemas.FILTRAOGC){i3GEO.php.pegalistadegrupos(retorno,id_menu,"sim")}else{i3GEO.php.pegalistadegrupos(retorno,id_menu,"nao")}},listaSubGrupos:function(g_sid,g_locaplic,id_menu,id_grupo,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.SUBGRUPOS=retorno.data;if(funcao!==""){funcao.call()}};i3GEO.php.pegalistadeSubgrupos(retorno,id_menu,id_grupo)},listaTemas:function(g_sid,g_locaplic,id_menu,id_grupo,id_subgrupo,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.TEMAS=retorno.data;if(funcao!==""){funcao.call()}};i3GEO.php.pegalistadetemas(retorno,id_menu,id_grupo,id_subgrupo)},listaSistemas:function(g_sid,g_locaplic,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.SISTEMAS=retorno.data;if(funcao!==""){funcao.call()}};i3GEO.php.pegaSistemas(retorno)},listaDrives:function(g_sid,g_locaplic,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.DRIVES=retorno.data[0];if(funcao!==""){funcao.call()}};i3GEO.php.listadrives(retorno)},cria:function(g_sid,g_locaplic,idhtml,funcaoTema,objOpcoes,tipoBotao){if(this.ARVORE){return}if(!idhtml){var idhtml=""}if(idhtml!==""){i3GEO.arvoreDeTemas.IDHTML=idhtml}if(!funcaoTema){var funcaoTema=""}if(funcaoTema!==""){i3GEO.arvoreDeTemas.ATIVATEMA=funcaoTema}if(!objOpcoes){var objOpcoes=""}if(objOpcoes!==""){i3GEO.arvoreDeTemas.OPCOESADICIONAIS=objOpcoes}if(!tipoBotao){var tipoBotao=""}if(tipoBotao!==""){i3GEO.arvoreDeTemas.TIPOBOTAO=tipoBotao}i3GEO.arvoreDeTemas.LOCAPLIC=g_locaplic;i3GEO.arvoreDeTemas.SID=g_sid;if(i3GEO.arvoreDeTemas.IDHTML===""){return}this.listaMenus(g_sid,g_locaplic,"i3GEO.arvoreDeTemas.montaArvore")},atualiza:function(){this.ARVORE=null;this.cria(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,i3GEO.arvoreDeTemas.IDHTML)},montaArvore:function(){var newVal,currentIconMode,d,tempNode,retorno,nomeSis,root,insp,outrasOpcoes,dados,c,i,j,conteudo;YAHOO.example.treeExample=function(){function changeIconMode(){newVal=parseInt(this.value,10);if(newVal!=currentIconMode){currentIconMode=newVal}buildTree()}function buildTree(){i3GEO.arvoreDeTemas.ARVORE=new YAHOO.widget.TreeView(i3GEO.arvoreDeTemas.IDHTML);tempNode=new YAHOO.widget.TextNode('',root,false);tempNode.isLeaf=false;tempNode.enableHighlight=false}buildTree()}();root=i3GEO.arvoreDeTemas.ARVORE.getRoot();if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluibusca===true){insp="<br><br><table><tr>";insp+="<td><span style='font-size:12px'>&nbsp;"+$trad("a1")+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=31' >&nbsp;&nbsp;&nbsp;</a></span></td>";insp+="<td><input onclick='javascript:this.select();' class='digitar' type='text' id='i3geo_buscatema' size='15' value=''  /></td>";insp+="<td><img  class='tic' ";if(navm){insp+="style='top:0px;'"}else{insp+="style='top:4px;'"}insp+=" title='"+$trad("a1")+"' src='"+i3GEO.util.$im("branco.gif")+"' onclick='i3GEO.arvoreDeTemas.buscaTema(document.getElementById(\"i3geo_buscatema\").value)' style='cursor:pointer;top:2px;position:relative;' /></td>";insp+="</tr></table>&nbsp;";tempNode=new YAHOO.widget.HTMLNode({html:insp},root,false,false);tempNode.enableHighlight=false}outrasOpcoes=i3GEO.arvoreDeTemas.outrasOpcoesHTML();if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde!==""){document.getElementById(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.idonde).innerHTML=outrasOpcoes}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.incluiArvore===true){tempNode=new YAHOO.widget.HTMLNode({html:outrasOpcoes+"&nbsp;<br>"},root,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true;if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir===true){retorno=function(){var drives,iglt,ig,drive;tempNode=new YAHOO.widget.HTMLNode({html:"&nbsp;"+$trad("a6")+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=32' >&nbsp;&nbsp;&nbsp;</a>"},root,false,true);tempNode.enableHighlight=false;drives=i3GEO.arvoreDeTemas.DRIVES;iglt=drives.length;ig=0;do{drive=new YAHOO.widget.HTMLNode({html:drives[ig].nome,caminho:drives[ig].caminho},tempNode,false,true);drive.enableHighlight=false;drive.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir,1);ig++}while(ig<iglt)};i3GEO.arvoreDeTemas.listaDrives(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno)}}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir===true){tempNode=new YAHOO.widget.HTMLNode({html:"<a href='../admin' target=blank >Sistema de administra��o</a>",idmenu:""},root,false,true);tempNode.enableHighlight=false;tempNode=new YAHOO.widget.HTMLNode({html:"<a href='../admin/html/arvore.html' target=blank >Editor de menus</a>",idmenu:""},root,false,true);tempNode.enableHighlight=false}if(i3GEO.arvoreDeTemas.INCLUIWMS===true){tempNode=new YAHOO.widget.HTMLNode({html:"<b>&nbsp;OGC-WMS</b>"+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=33' >&nbsp;&nbsp;&nbsp;</a>",idwms:"raiz"},root,false,true);tempNode.enableHighlight=false;tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.listaWMS,1)}dados=i3GEO.arvoreDeTemas.MENUS;c=dados.length;for(i=0,j=c;i<j;i++){if(!dados[i].nomemenu){dados[i].nomemenu=dados[i].idmenu}if(!dados[i].publicado){dados[i].publicado="sim"}if(dados[i].publicado.toLowerCase()!="nao"){conteudo="<b>&nbsp;<span title='"+(dados[i].desc)+"'>"+dados[i].nomemenu+"</span>"}else{conteudo="<b>&nbsp;<span title='nao publicado' style=color:red; >"+dados[i].nomemenu+"</span>"}tempNode=new YAHOO.widget.HTMLNode({html:conteudo,idmenu:dados[i].idmenu},root,false,true);tempNode.enableHighlight=false;tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaGrupos,currentIconMode);if(dados[i].status=="aberto"){tempNode.expand()}}if(i3GEO.arvoreDeTemas.INCLUISISTEMAS){retorno=function(){var sis,iglt,tempNode,ig,nomeSis,sisNode,funcoes,tempf,ig2,abre,nomeFunc,funcNode;try{sis=i3GEO.arvoreDeTemas.SISTEMAS;iglt=sis.length;tempNode=new YAHOO.widget.HTMLNode({html:"<b>Sistemas</b>"+" <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=34' >&nbsp;&nbsp;&nbsp;</a>"},root,false,true);tempNode.enableHighlight=false}catch(e){i3GEO.arvoreDeTemas.ARVORE.draw();return}ig=0;do{nomeSis=sis[ig].NOME;if(sis[ig].PUBLICADO){if(sis[ig].PUBLICADO=="NAO"||sis[ig].PUBLICADO=="nao"){nomeSis="<s>"+sis[ig].NOME+"</s>"}}sisNode=new YAHOO.widget.HTMLNode({html:nomeSis},tempNode,false,true);sisNode.enableHighlight=false;funcoes=sis[ig].FUNCOES;tempf=funcoes.length;for(ig2=0;ig2<tempf;ig2++){abre="i3GEO.janela.cria('"+(funcoes[ig2].W)+"px','"+(funcoes[ig2].H)+"px','"+(funcoes[ig2].ABRIR)+"','','','Sistemas')";nomeFunc="<a href='#' onclick=\""+abre+"\">"+funcoes[ig2].NOME+"</a>";funcNode=new YAHOO.widget.HTMLNode({html:nomeFunc},sisNode,false,true);funcNode.enableHighlight=false;funcNode.isLeaf=true}ig++}while(ig<iglt);i3GEO.arvoreDeTemas.ARVORE.draw()};i3GEO.arvoreDeTemas.listaSistemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,retorno)}document.getElementById(i3GEO.arvoreDeTemas.IDHTML).style.textAlign="left";if(!i3GEO.arvoreDeTemas.INCLUISISTEMAS){i3GEO.arvoreDeTemas.ARVORE.draw()}},montaGrupos:function(node){var temp=function(){var grupos,c,raiz,nraiz,mostra,html,i,d;grupos=i3GEO.arvoreDeTemas.GRUPOS.grupos;c=grupos.length-3;raiz=grupos[c].temasraiz;nraiz=raiz.length;for(i=0;i<nraiz;i++){mostra=true;if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&raiz[i].download=="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&raiz[i].ogc=="nao"){mostra=false}if(mostra){tempNode=new YAHOO.widget.HTMLNode({html:i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i])},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}}for(i=0;i<c;i++){mostra=true;if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&grupos[i].download=="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&grupos[i].ogc=="nao"){mostra=false}if(mostra){if(grupos[i].publicado){if(grupos[i].publicado=="NAO"){grupos[i].nome="<span title='nao publicado' style=color:red; >"+grupos[i].nome+"</span>"}}d={html:grupos[i].nome,idmenu:node.data.idmenu,idgrupo:i};if(grupos[i].id_n1){d={html:grupos[i].nome,idmenu:node.data.idmenu,idgrupo:grupos[i].id_n1}}tempNode=new YAHOO.widget.HTMLNode(d,node,false,true);tempNode.enableHighlight=false;tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaSubGrupos,1);tempNode.isLeaf=false}}node.loadComplete()};i3GEO.arvoreDeTemas.listaGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,temp)},montaSubGrupos:function(node){var temp=function(){var i,c,mostra,d,html,tempNode,nraiz,subgrupos,raiz;subgrupos=i3GEO.arvoreDeTemas.SUBGRUPOS.subgrupo;c=subgrupos.length;raiz=i3GEO.arvoreDeTemas.SUBGRUPOS.temasgrupo;nraiz=raiz.length;for(i=0;i<nraiz;i++){mostra=true;if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&raiz[i].download=="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&raiz[i].ogc=="nao"){mostra=false}if(mostra){tempNode=new YAHOO.widget.HTMLNode({html:i3GEO.arvoreDeTemas.montaTextoTema("gray",raiz[i])},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}}for(i=0;i<c;i++){mostra=true;if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&subgrupos[i].download=="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&subgrupos[i].ogc=="nao"){mostra=false}if(mostra){if(subgrupos[i].publicado){if(subgrupos[i].publicado=="NAO"){subgrupos[i].nome="<span title='nao publicado' style=color:red; >"+subgrupos[i].nome+"</span>"}}d={html:subgrupos[i].nome,idmenu:node.data.idmenu,idgrupo:node.data.idgrupo,idsubgrupo:i};if(subgrupos[i].id_n2){d={html:subgrupos[i].nome,idmenu:node.data.idmenu,idgrupo:node.data.idgrupo,idsubgrupo:subgrupos[i].id_n2}}tempNode=new YAHOO.widget.HTMLNode(d,node,false,true);tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaTemas,1);tempNode.isLeaf=false;tempNode.enableHighlight=false}}node.loadComplete()};i3GEO.arvoreDeTemas.listaSubGrupos(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,temp)},montaTemas:function(node){var temp=function(){var i,cor,temas,c,mostra,tempNode;temas=i3GEO.arvoreDeTemas.TEMAS.temas;c=temas.length;cor="rgb(51, 102, 102)";for(i=0;i<c;i++){mostra=true;if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&temas[i].download=="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&temas[i].ogc=="nao"){mostra=false}if(mostra){if(temas[i].publicado){if(temas[i].publicado=="NAO"){temas[i].nome="<span title='nao publicado' style=color:red; >"+temas[i].nome+"</span>"}}tempNode=new YAHOO.widget.HTMLNode({nacessos:temas[i].nacessos,html:i3GEO.arvoreDeTemas.montaTextoTema(cor,temas[i]),idtema:temas[i].tid,fonte:temas[i].link,ogc:temas[i].ogc,kmz:temas[i].kmz},node,false,true);tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.propTemas,1);tempNode.isLeaf=false;tempNode.enableHighlight=false;if(cor=="rgb(51, 102, 102)"){cor="rgb(47, 70, 50)"}else{cor="rgb(51, 102, 102)"}}}node.loadComplete()};i3GEO.arvoreDeTemas.listaTemas(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,node.data.idmenu,node.data.idgrupo,node.data.idsubgrupo,temp)},montaDir:function(node){var montaLista=function(retorno){var ig,d,conteudo,dirs,tempNode,arquivos,nodeSHP;dirs=retorno.data.diretorios;for(ig=0;ig<dirs.length;ig++){tempNode=new YAHOO.widget.HTMLNode({html:dirs[ig],caminho:node.data.caminho+"/"+conteudo},node,false,true);tempNode.setDynamicLoad(i3GEO.arvoreDeTemas.montaDir,1);tempNode.enableHighlight=false}arquivos=retorno.data.arquivos;for(ig=0;ig<arquivos.length;ig++){conteudo=arquivos[ig];if(conteudo.search(".img")>1||conteudo.search(".tif")>1||conteudo.search(".TIF")>1||conteudo.search(".shp")>1||conteudo.search(".SHP")>1){conteudo="<a href='#' title='"+$trad("g2")+"' onclick='i3GEO.util.adicionaSHP(\""+node.data.caminho+"/"+conteudo+"\")' >"+conteudo+"</a>";nodeSHP=new YAHOO.widget.HTMLNode({html:conteudo,caminho:node.data.caminho+"/"+conteudo},node,false,true);nodeSHP.enableHighlight=false;nodeSHP.isLeaf=true}}node.loadComplete()};i3GEO.php.listaarquivos(montaLista,node.data.caminho)},montaTextoTema:function(cor,tema){var html="<td style='vertical-align:top;padding-top:5px;'><span ><input style='cursor:pointer;border:solid 0 white;' ";if(i3GEO.arvoreDeTemas.ATIVATEMA!==""){html+="onclick=\""+i3GEO.arvoreDeTemas.ATIVATEMA+"\""}else{html+="onclick='i3GEO.util.criaBotaoAplicar(\"i3GEO.arvoreDeTemas.adicionaTemas\",\""+$trad("p14")+"\",\"i3geoBotaoAplicar\",this)'"}html+=" type='"+i3GEO.arvoreDeTemas.TIPOBOTAO+"' value='"+tema.tid+"' /></td><td style='padding-top:4px;vertical-align:top;text-align:left;color:"+cor+";padding-left:3px;' >";html+=tema.nome;html+="</td></span>";return(html)},propTemas:function(node){var d,tempNode,html,lkmini,lkmini1,lkgrcode,lkgrcode1,n,ogc;if(node.data.fonte!==""&&node.data.fonte!=" "){tempNode=new YAHOO.widget.HTMLNode({html:"<a title='' href='"+node.data.fonte+"' target='_blank' >Fonte</a>"},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.mini===true){lkmini=i3GEO.arvoreDeTemas.LOCAPLIC+"/testamapfile.php?map="+node.data.idtema+".map&tipo=mini";lkmini1=i3GEO.arvoreDeTemas.LOCAPLIC+"/testamapfile.php?map="+node.data.idtema+".map&tipo=grande";tempNode=new YAHOO.widget.HTMLNode({html:"<a title='' onmouseover='i3GEO.ajuda.mostraJanela(\"<img src="+lkmini+" />\")' href='"+lkmini1+"' target='blank' >Miniatura</a>"},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}if(node.data.ogc!="nao"){if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.kml===true){html="<a href='#' title='' onclick='i3GEO.tema.dialogo.abreKml(\""+node.data.idtema+"\",\"kml\")' >Kml</a>";if(node.data.kmz=="sim"){html="<a href='#' title='' onclick='i3GEO.tema.dialogo.abreKml(\""+node.data.idtema+"\",\"kmz\")' >Kml</a>"}tempNode=new YAHOO.widget.HTMLNode({html:html},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}ogc=i3GEO.arvoreDeTemas.LOCAPLIC+"/ogc.php?tema="+node.data.idtema+"&service=wms&request=getcapabilities";tempNode=new YAHOO.widget.HTMLNode({html:"<a title='' href='"+ogc+"' target='blank' >WMS - OGC</a>"},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.qrcode===true){lkgrcode=i3GEO.arvoreDeTemas.LOCAPLIC+"/pacotes/qrcode/php/qr_html.php?d="+i3GEO.arvoreDeTemas.LOCAPLIC+"/mobile/index.php?temasa="+node.data.idtema;lkgrcode1=i3GEO.arvoreDeTemas.LOCAPLIC+"/pacotes/qrcode/php/qr_img.php?d="+i3GEO.arvoreDeTemas.LOCAPLIC+"/mobile/index.php?temasa="+node.data.idtema;tempNode=new YAHOO.widget.HTMLNode({html:"<a title='' onmouseover='i3GEO.ajuda.mostraJanela(\"<img src="+lkgrcode1+" />\")' href='"+lkgrcode+"' target='blank' >Qrcode</a>"},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.estrelas===true){n=parseInt(node.data.nacessos/(i3GEO.arvoreDeTemas.FATORESTRELA*1),10);if(n>=5){n=5}if(n>0){html="<img src='"+i3GEO.util.$im("e"+n+".png")+"'/>"}else{html="<img src='"+i3GEO.util.$im("e0.png")+"'/>"}tempNode=new YAHOO.widget.HTMLNode({html:html},node,false,true);tempNode.enableHighlight=false;tempNode.isLeaf=true}node.loadComplete()},outrasOpcoesHTML:function(){var ins="",t=0;if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.refresh===true){ins+="<td><img class='refresh' onclick='i3GEO.arvoreDeTemas.atualiza()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='Refresh'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploaddbf===true){ins+="<td><img class='uploaddbf' onclick='i3GEO.arvoreDeTemas.dialogo.uploaddbf()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2b")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.uploadlocal===true){ins+="<td><img class='upload' onclick='i3GEO.arvoreDeTemas.dialogo.upload()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left' title='"+$trad("a2")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.downloadbase===true){ins+="<td><img onclick='i3GEO.arvoreDeTemas.dialogo.downloadbase()' class='download' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a3")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwms===true){ins+="<td><img class='conectarwms' onclick='i3GEO.arvoreDeTemas.dialogo.conectarwms()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a4")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectarwmst===true){ins+="<td><img class='conectarwmst' onclick='i3GEO.arvoreDeTemas.dialogo.conectarwmst()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a4b")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.conectargeorss===true){ins+="<td><img class='conectargeorss' onclick='i3GEO.arvoreDeTemas.dialogo.conectargeorss()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTags===true){ins+="<td><img class='nuvemtags' onclick='i3GEO.arvoreDeTemas.dialogo.nuvemTags()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5a")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.nuvemTagsFlash===true){ins+="<td><img class='nuvemtags' onclick='i3GEO.arvoreDeTemas.dialogo.nuvemTagsFlash()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title='"+$trad("a5a")+"'/><td>";t+=20}if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.carousel===true){ins+="<td><img class='carouselTemas' onclick='i3GEO.arvoreDeTemas.dialogo.carouselTemas()' src='"+i3GEO.util.$im("branco.gif")+"' style='cursor:pointer;text-align:left'  title=''/><td>";t+=20}return("<table width='"+t+"px' ><tr>"+ins+"</tr></table>")},desativaCheckbox:function(){var o,inputs,n,i;o=document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);inputs=o.getElementsByTagName("input");n=inputs.length;i=0;do{inputs[i].checked=false;i++}while(i<n)},listaTemasAtivos:function(){var o,inputs,n,i,lista;o=document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);inputs=o.getElementsByTagName("input");n=inputs.length;i=0;lista=[];do{if(inputs[i].checked===true){lista.push(inputs[i].value)}i++}while(i<n);return(lista)},buscaTema:function(palavra){if(palavra===""){return}var busca,root,nodePalavra;resultadoProcurar=function(retorno){var mostra,tempNode,d,conta,ig,ngSgrupo,tempn,sg,ngTema,tempng,st,lk;if(!retorno.data){alert("Ocorreu um erro")}else{retorno=retorno.data;conta=0;if((retorno!="erro")&&(retorno!==undefined)){ig=retorno.length-1;if(ig>=0){do{ngSgrupo=retorno[ig].subgrupos;tempn=ngSgrupo.length;for(sg=0;sg<tempn;sg++){ngTema=ngSgrupo[sg].temas;tempng=ngTema.length;for(st=0;st<tempng;st++){mostra=true;if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&ngTema[st].download=="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&ngTema[st].ogc=="nao"){mostra=false}if(mostra){d=i3GEO.arvoreDeTemas.montaTextoTema("gray",ngTema[st]);if(ngTema[st].link!=" "){lk="<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>"}d+="<td style='text-allign:left'> ("+(ngSgrupo[sg].subgrupo)+") "+lk+"</td>";tempNode=new YAHOO.widget.HTMLNode(d,nodePalavra,false,true);tempNode.isLeaf=true;tempNode.enableHighlight=false}conta++}}}while(ig--)}else{d="<span style='color:red'>Nada encontrado<br><br></span>";tempNode=new YAHOO.widget.HTMLNode(d,nodePalavra,false,true);tempNode.isLeaf=true;tempNode.enableHighlight=false}}}nodePalavra.loadComplete()};busca=function(){i3GEO.php.procurartemas(resultadoProcurar,i3GEO.util.removeAcentos(palavra))};i3GEO.arvoreDeTemas.ARVORE.collapseAll();root=i3GEO.arvoreDeTemas.ARVORE.getRoot();if(!i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados")){tempNode=new YAHOO.widget.HTMLNode({html:"Temas encontrados",id:"temasEncontrados"},root,false,true);tempNode.enableHighlight=false}else{tempNode=i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("id","temasEncontrados")}nodePalavra=new YAHOO.widget.HTMLNode({html:palavra},tempNode,false,true);nodePalavra.enableHighlight=false;i3GEO.arvoreDeTemas.ARVORE.draw();tempNode.expand();nodePalavra.setDynamicLoad(busca,1);nodePalavra.expand()},adicionaTemas:function(){var tsl,temp;clearTimeout(tempoBotaoAplicar);tempoBotaoAplicar="";i3GEO.mapa.ativaTema("");tsl=i3GEO.arvoreDeTemas.listaTemasAtivos();i3GEO.arvoreDeTemas.desativaCheckbox();if(tsl.length>0){i3GEO.janela.abreAguarde("i3GEO.atualiza",$trad("o1"));temp=function(retorno){i3GEO.janela.fechaAguarde("i3GEO.atualiza");if(retorno.data.erro){alert(retorno.data.erro);return}i3GEO.atualiza();if(i3GEO.arvoreDeTemas.RETORNAGUIA!==""){if(i3GEO.arvoreDeTemas.RETORNAGUIA!=i3GEO.guias.ATUAL){i3GEO.guias.mostra(i3GEO.arvoreDeTemas.RETORNAGUIA)}}try{if($i("i3GEOidentificalistaTemas")){i3GEOF.identifica.listaTemas();g_tipoacao="identifica"}}catch(r){}};i3GEO.php.adtema(temp,tsl.toString())}},comboMenus:function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura){i3GEO.configura.locaplic=locaplic;var combo=function(retorno){var ob,ins,ig;ob=retorno.data;ins="<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um menu:</option>";for(ig=0;ig<ob.length;ig++){if(ob[ig].publicado!="nao"&&ob[ig].publicado!="NAO"){if(ob[ig].nomemenu){ins+="<option value="+ob[ig].idmenu+" >"+ob[ig].nomemenu+"</option>"}}}$i(idDestino).innerHTML=ins+"</select>"};i3GEO.php.pegalistademenus(combo)},comboGruposMenu:function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura,id_menu){i3GEO.configura.locaplic=locaplic;var combo=function(retorno){var obGrupos,ins,ig;obGrupos=retorno.data;ins="<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um grupo:</option>";for(ig=0;ig<obGrupos.grupos.length;ig++){if(obGrupos.grupos[ig].nome){ins+="<option value="+obGrupos.grupos[ig].id_n1+" >"+obGrupos.grupos[ig].nome+"</option>"}}$i(idDestino).innerHTML=ins+"</select>"};i3GEO.php.pegalistadegrupos(combo,id_menu,"nao")},comboSubGruposMenu:function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,largura,altura){if(idGrupo!==""){var combo=function(retorno){var ins,sg,ig;ins="<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+",this.value)' ><option value='' >Escolha um sub-grupo:</option>";if(retorno.data.subgrupo){sg=retorno.data.subgrupo;for(ig=0;ig<sg.length;ig++){ins+="<option value="+sg[ig].id_n2+" >"+sg[ig].nome+"</option>"}}$i(idDestino).innerHTML=ins+"</select>"};i3GEO.php.pegalistadeSubgrupos(combo,"",idGrupo)}},comboTemasMenu:function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,idSubGrupo,largura,altura,id_menu){var combo=function(retorno){var ins,sg,ig;ins="<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+","+idSubGrupo+",this.value)' ><option value='' >Escolha um tema:</option>";if(retorno.data.temas[i]){sg=retorno.data.temas;for(ig=0;ig<sg.length;ig++){ins+="<option value="+sg[ig].tid+" >"+sg[ig].nome+"</option>"}}$i(idDestino).innerHTML=ins+"</select>"};i3GEO.php.pegalistadetemas(combo,id_menu,idGrupo,idSubGrupo)},dialogo:{carouselTemas:function(){if(typeof(i3GEOF.upload)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/carouseltemas/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.carouseltemas.criaJanelaFlutuante()","i3GEOF.carouseltemas_script")}},nuvemTags:function(){if(typeof(i3GEOF.upload)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/nuvemtags/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.nuvemtags.criaJanelaFlutuante()","i3GEOF.nuvemtags_script")}},nuvemTagsFlash:function(){i3GEO.janela.cria("550px","350px",i3GEO.configura.locaplic+"/ferramentas/nuvemtagsflash/index.htm","","","Nuvem Flash")},navegacaoDir:function(){i3GEO.janela.cria("550px","350px",i3GEO.configura.locaplic+"/ferramentas/navegacaodir/index.htm","","","Diret&oacute;rios")},conectarwms:function(){i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwms/index.htm","","","Conex�o WMS <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=28' >&nbsp;&nbsp;&nbsp;</a>")},conectarwmst:function(){var l,a;if(i3GEO.parametros.w){l=i3GEO.parametros.w+150}else{l=400}if(i3GEO.parametros.h){a=i3GEO.parametros.h+200}else{a=350}i3GEO.janela.cria(l/2+"px",a/2+"px",i3GEO.configura.locaplic+"/ferramentas/wmstime/index.htm","","","Conex�o WMS-T <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=76' >&nbsp;&nbsp;&nbsp;</a>")},conectarwfs:function(){i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwfs/index.htm","","","WFS")},conectargeorss:function(){i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectargeorss/index.htm","","","Conex�o GeoRSS <a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=29' >&nbsp;&nbsp;&nbsp;</a>")},upload:function(){if(typeof(i3GEOF.upload)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/upload/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.upload.criaJanelaFlutuante()","i3GEOF.upload_script")}},uploaddbf:function(){if(typeof(i3GEOF.uploaddbf)==='undefined'){var js=i3GEO.configura.locaplic+"/ferramentas/uploaddbf/index.js.php";i3GEO.util.scriptTag(js,"i3GEOF.uploaddbf.criaJanelaFlutuante()","i3GEOF.uploaddbf_script")}},downloadbase:function(){window.open(i3GEO.configura.locaplic+"/datadownload.htm")}}};