if(typeof(i3GEO)==='undefined'){var i3GEO={}}i3GEO.arvoreDeTemas={IDHTML:"arvoreAdicionaTema",ARVORE:null,FATORESTRELA:10,OPCOESADICIONAIS:{uploadarquivo:true,downloadbase:true,nuvemTags:true,nuvemTagsFlash:false,navegacaoDir:true,incluibusca:true,kml:true,qrcode:true,mini:true,estrelas:true,refresh:true,carousel:true,inde:true,comentarios:true,bookmark:true,importarwmc:true,googleearth:true,metaestat:true,idonde:"arvoreCatOpcoes"},INCLUISISTEMAS:true,INCLUIWMS:true,INCLUIREGIOES:true,INCLUIINDIBR:true,INCLUIWMSMETAESTAT:true,INCLUIMAPASCADASTRADOS:true,INCLUIESTRELAS:true,FILTRADOWNLOAD:false,FILTRAOGC:false,TIPOBOTAO:"checkbox",ATIVATEMA:"",IDSMENUS:[],RETORNAGUIA:"",DRIVES:null,SISTEMAS:null,MENUS:[],GRUPOS:null,SUBGRUPOS:null,TEMAS:null,LOCAPLIC:null,SID:null,CONTATEMAWMS:0,listaRegioes:function(){},listaVariaveisMetaestat:function(){},listaMedidasVariavel:function(node){},listaGrupos:function(g_sid,g_locaplic,id_menu,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.GRUPOS=retorno.data;if(funcao!==""){funcao.call()}};if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD||i3GEO.arvoreDeTemas.FILTRAOGC){i3GEO.php.pegalistadegrupos(retorno,id_menu,"sim")}else{i3GEO.php.pegalistadegrupos(retorno,id_menu,"nao")}},listaSubGrupos:function(g_sid,g_locaplic,id_menu,id_grupo,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.SUBGRUPOS=retorno.data;if(funcao!==""){funcao.call()}};i3GEO.php.pegalistadeSubgrupos(retorno,id_menu,id_grupo)},listaTemas:function(g_sid,g_locaplic,id_menu,id_grupo,id_subgrupo,funcao){var retorno=function(retorno){i3GEO.arvoreDeTemas.TEMAS=retorno.data;if(funcao!==""){funcao.call()}};i3GEO.php.pegalistadetemas(retorno,id_menu,id_grupo,id_subgrupo)},cria:function(g_sid,g_locaplic,idhtml,funcaoTema,objOpcoes,tipoBotao){if(i3GEO.arvoreDeTemas.ARVORE){return}if(!idhtml){idhtml=""}if(idhtml!==""){i3GEO.arvoreDeTemas.IDHTML=idhtml}if(!funcaoTema){funcaoTema=""}if(funcaoTema!==""){i3GEO.arvoreDeTemas.ATIVATEMA=funcaoTema}if(!objOpcoes){objOpcoes=""}if(objOpcoes!==""){i3GEO.arvoreDeTemas.OPCOESADICIONAIS=objOpcoes}if(!tipoBotao){tipoBotao=""}if(tipoBotao!==""){i3GEO.arvoreDeTemas.TIPOBOTAO=tipoBotao}i3GEO.arvoreDeTemas.LOCAPLIC=g_locaplic;i3GEO.arvoreDeTemas.SID=g_sid;if(i3GEO.arvoreDeTemas.IDHTML===""){return}$i(i3GEO.arvoreDeTemas.IDHTML).className="i3GEOarvCat";i3GEO.arvoreDeTemas.listaMenus(g_sid,g_locaplic,i3GEO.arvoreDeTemas.montaArvore)},listaMenus:function(){i3GEO.arvoreDeTemas.montaArvore()},atualiza:function(){if($i(i3GEO.arvoreDeTemas.IDHTML)){i3GEO.arvoreDeTemas.ARVORE=null;i3GEO.arvoreDeTemas.cria(i3GEO.arvoreDeTemas.SID,i3GEO.arvoreDeTemas.LOCAPLIC,i3GEO.arvoreDeTemas.IDHTML)}},montaArvore:function(){var ig,mais="",tempNode,tempNode1,retorno,root,insp="",outrasOpcoes,dados,c,i,j,conteudo,editor;if(!i3GEO.arvoreDeTemas.INCLUISISTEMAS){if(i3GEO.arvoreDeTemas.OPCOESADICIONAIS.navegacaoDir===false){i3GEO.arvoreDeTemas.ARVORE.draw()}else if(mais!=""){i3GEO.arvoreDeTemas.adicionaNoNavegacaoDir()}}},adicionaNoNavegacaoDir:function(drives,arvore){},montaGrupos:function(node){},montaSubGrupos:function(node){},montaTemas:function(node){},montaDir:function(node){},montaTextoTema:function(cor,tema){var html,clique;html="<td class='ygtvcontent' style='text-align:left;'>";html+="<input id='"+tema.tid+"ckboxc' title='"+tema.tid+"' style='position:relative;top:3px;width:12px;height:12px;cursor:pointer;border:solid 0 white;' ";if(i3GEO.arvoreDeTemas.ATIVATEMA!==""){clique="onclick=\""+i3GEO.arvoreDeTemas.ATIVATEMA+"\""}else{clique="onclick='i3GEO.arvoreDeTemas.verificaStatusTema(this,\""+tema.tid+"\")'"}html+=clique;if(tema.nameInput){html+=" name='"+tema.nameInput+"' "}html+=" type='"+i3GEO.arvoreDeTemas.TIPOBOTAO+"' value='"+tema.tid+"' />";html+="<label for='"+tema.tid+"ckboxc' title='"+tema.tid+"' onmouseout='javascript:this.style.color=\""+cor+"\";' onmouseover='javascript:this.style.color=\"blue\";' style='cursor:pointer;text-align:left;color:"+cor+";padding-left:0px;position:relative;top:1px;' "+clique+">";html+=tema.nome;html+="</label></td>";return(html)},verificaStatusTema:function(obj,tid){if(obj.tagName!="INPUT"){return}if(i3GEO.arvoreDeCamadas.pegaTema(tid)!==""){if(i3GEO.arvoreDeCamadas.ARVORE){i3GEO.arvoreDeCamadas.ligaDesligaTemas(tid,obj.checked)}else{var temp=function(){i3GEO.php.corpo(i3GEO.atualiza,i3GEO.configura.tipoimagem);i3GEO.janela.fechaAguarde("redesenha")};if(!obj.checked){i3GEO.php.ligatemas(temp,tid,"")}else{i3GEO.php.ligatemas(temp,"",tid)}}}else{i3GEO.arvoreDeTemas.adicionaTemas([tid])}},propTemas:function(node){},desativaCheckbox:function(valor){var o,inputs,n,i;o=document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);inputs=o.getElementsByTagName("input");n=inputs.length;i=0;do{inputs[i].checked=false;i+=1}while(i<n)},buscaCheckbox:function(valor){var o,inputs,n,i;if(i3GEO.arvoreDeTemas.ARVORE){o=document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);if(o){inputs=o.getElementsByTagName("input");n=inputs.length;i=0;do{if(inputs[i].value===valor){return inputs[i]}i+=1}while(i<n)}}return false},listaTemasAtivos:function(){var o,inputs,n,i,lista;o=document.getElementById(i3GEO.arvoreDeTemas.ARVORE.id);inputs=o.getElementsByTagName("input");n=inputs.length;i=0;lista=[];do{if(inputs[i].checked===true){lista.push(inputs[i].value)}i+=1}while(i<n);return(lista)},buscaTema2:function(palavra){if(palavra===""){return}var busca,root,nodePalavra="";resultadoProcurar=function(retorno){var ig,montaTexto=function(ngSgrupo){var tempn,ngTema,tempng,mostra,d,lk="",st,sg;tempn=ngSgrupo.length;for(sg=0;sg<tempn;sg+=1){ngTema=ngSgrupo[sg].temas;tempng=ngTema.length;for(st=0;st<tempng;st+=1){mostra=true;try{if(i3GEO.arvoreDeTemas.FILTRADOWNLOAD&&ngTema[st].download==="nao"){mostra=false}if(i3GEO.arvoreDeTemas.FILTRAOGC&&ngTema[st].ogc==="nao"){mostra=false}}catch(e){}if(mostra){d=i3GEO.arvoreDeTemas.montaTextoTema("gray",ngTema[st]);if(ngTema[st].link!==" "){lk="<a href='"+ngTema[st].link+"' target='blank'>&nbsp;fonte</a>"}if(ngSgrupo[sg].subgrupo){d+="<td style='text-allign:left'> ("+(ngSgrupo[sg].subgrupo)+") "+lk+"</td>"}else{d+="<td style='text-allign:left'> ("+(ngSgrupo[sg].grupo)+")"+lk+"</td>"}}conta+=1}}}};busca=function(){i3GEO.php.procurartemas2(resultadoProcurar,i3GEO.util.removeAcentos(palavra))}},adicionaTemas:function(tsl){var exec,tempAdiciona=function(retorno){i3GEO.atualiza();if(i3GEO.arvoreDeTemas.RETORNAGUIA!==""){if(i3GEO.arvoreDeTemas.RETORNAGUIA!==i3GEO.guias.ATUAL){i3GEO.guias.escondeGuias();i3GEO.guias.mostra(i3GEO.arvoreDeTemas.RETORNAGUIA)}}try{if($i("i3GEOidentificalistaTemas")){i3GEOF.identifica.listaTemas()}}catch(r){}};i3GEO.mapa.ativaTema();if(arguments.length!==1){tsl=i3GEO.arvoreDeTemas.listaTemasAtivos()}if(tsl.length>0){exec=function(tsl){var no,p,funcao;if(i3GEO.arvoreDeTemas.ARVORE){no=i3GEO.arvoreDeTemas.ARVORE.getNodeByProperty("idtema",tsl[0]);if(no&&no.data.tipoa_tema==="META"){if(no.data.id_medida_variavel!=undefined&&no.data.id_medida_variavel!=""){}else{p=i3GEO.configura.locaplic+"/ferramentas/metaestat/analise.php?funcao=pegaMetadadosMapfile"+"&idtema="+no.data.idtema+"&g_sid="+i3GEO.configura.sid;funcao=function(retorno){i3GEO.util.dialogoFerramenta("i3GEO.mapa.dialogo.metaestat()","metaestat","metaestat","index.js","i3GEOF.metaestat.inicia('flutuanteSimples','',"+retorno.data.id_medida_variavel+")")};cpJSON.call(p,"foo",funcao)}}else if(no&&no.data.tipoa_tema==="METAREGIAO"){}else{i3GEO.php.adtema(tempAdiciona,tsl.toString())}}else{i3GEO.php.adtema(tempAdiciona,tsl.toString())}};if(i3GEO.arvoreDeCamadas.pegaTema(tsl[0])!==""){i3GEO.janela.confirma($trad("x76"),300,$trad("x14"),$trad("x15"),function(){exec(tsl)})}else{exec.call(this,tsl)}}},comboMenus:function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura){i3GEO.configura.locaplic=locaplic;var combo=function(retorno){var ob,ins,ig;ob=retorno.data;ins="<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um menu:</option>";for(ig=0;ig<ob.length;ig+=1){if(ob[ig].publicado!=="nao"&&ob[ig].publicado!=="NAO"){if(ob[ig].nomemenu){ins+="<option value="+ob[ig].idmenu+" >"+ob[ig].nomemenu+"</option>"}}}$i(idDestino).innerHTML=ins+"</select>";return retorno.data};i3GEO.php.pegalistademenus(combo)},comboGruposMenu:function(locaplic,funcaoOnchange,idDestino,idCombo,largura,altura,id_menu){i3GEO.configura.locaplic=locaplic;i3GEO.arvoreDeTemas.temasRaizGrupos=[];var combo=function(retorno){var ins,ig,obGrupos=retorno.data;ins="<select id='"+idCombo+"' SIZE="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(this.value)' ><option value='' >Escolha um grupo:</option>";for(ig=0;ig<obGrupos.grupos.length;ig+=1){if(obGrupos.grupos[ig].nome){ins+="<option value="+obGrupos.grupos[ig].id_n1+" >"+obGrupos.grupos[ig].nome+"</option>"}i3GEO.arvoreDeTemas.temasRaizGrupos[obGrupos.grupos[ig].id_n1]=obGrupos.grupos[ig].temasgrupo}$i(idDestino).innerHTML=ins+"</select>"};i3GEO.php.pegalistadegrupos(combo,id_menu,"nao")},comboSubGruposMenu:function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,largura,altura){if(idGrupo!==""){var combo=function(retorno){var ins,sg,ig;ins="<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"(\""+idGrupo+"\",this.value)' ><option value='' >Escolha um sub-grupo:</option>";if(retorno.data.subgrupo){sg=retorno.data.subgrupo;for(ig=0;ig<sg.length;ig+=1){ins+="<option value="+sg[ig].id_n2+" >"+sg[ig].nome+"</option>"}}$i(idDestino).innerHTML=ins+"</select>"};i3GEO.php.pegalistadeSubgrupos(combo,"",idGrupo)}},comboTemasMenu:function(locaplic,funcaoOnchange,idDestino,idCombo,idGrupo,idSubGrupo,largura,altura,id_menu,temas){var combo=function(retorno){var ins,sg,ig;if(idSubGrupo!=""){ins="<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+","+idSubGrupo+",this.value)' ><option value='' >Escolha um tema:</option>"}else{ins="<select id='"+idCombo+"' size="+altura+" style=width:"+largura+"px onchange='"+funcaoOnchange+"("+idGrupo+",\"\",this.value)' ><option value='' >Escolha um tema:</option>"}if(typeof(retorno.data)!=='undefined'){retorno=retorno.data.temas}sg=retorno.length;for(ig=0;ig<sg;ig++){ins+="<option value="+retorno[ig].tid+" >"+retorno[ig].nome+"</option>"}$i(idDestino).innerHTML=ins+"</select>"};if(typeof(temas)==='undefined'||temas===""){i3GEO.php.pegalistadetemas(combo,id_menu,idGrupo,idSubGrupo)}else{combo(temas)}},dialogo:{uploadarquivo:function(){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/uploadarquivos/dependencias.php","i3GEOF.uploadarquivos.iniciaJanelaFlutuante()","i3GEOF.uploadarquivos_script")},conectaservico:function(){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/conectarservicos/dependencias.php","i3GEOF.conectarservicos.iniciaJanelaFlutuante()","i3GEOF.conectarservicos_script")},carouselTemas:function(){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/carouseltemas/index.js","i3GEOF.carouseltemas.criaJanelaFlutuante()","i3GEOF.carouseltemas_script")},buscaInde:function(){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/buscainde/dependencias.php","i3GEOF.buscainde.iniciaJanelaFlutuante()","i3GEOF.buscainde_script")},nuvemTags:function(){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/nuvemtags/dependencias.php","i3GEOF.nuvemtags.iniciaJanelaFlutuante()","i3GEOF.nuvemtags_script")},nuvemTagsFlash:function(){i3GEO.janela.cria("550px","350px",i3GEO.configura.locaplic+"/ferramentas/nuvemtagsflash/index.htm","","",$trad("x44"))},navegacaoDir:function(){i3GEO.janela.cria("550px","350px",i3GEO.configura.locaplic+"/ferramentas/navegacaodir/index.htm","","","<div class='i3GeoTituloJanela'>"+$trad("x45")+"</div>")},importarwmc:function(){i3GEO.util.scriptTag(i3GEO.configura.locaplic+"/ferramentas/importarwmc/dependencias.php","i3GEOF.importarwmc.iniciaJanelaFlutuante()","i3GEOF.importarwmc_script")},conectarwfs:function(){i3GEO.janela.cria("400px","300px",i3GEO.configura.locaplic+"/ferramentas/conectarwfs/index.htm","","","<div class='i3GeoTituloJanela'>WFS</div>")},downloadbase:function(){window.open(i3GEO.configura.locaplic+"/datadownload.htm")}}};