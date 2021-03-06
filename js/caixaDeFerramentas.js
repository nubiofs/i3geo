if (typeof (i3GEO) === 'undefined') {
    var i3GEO = {};
}
i3GEO.caixaDeFerramentas = {
        MIGALHA: [],
        config: {
            "idOndeFolder": "listaFerramentas",
            "idOndeLinks": "listaFerramentasLinks",
            "idOndeMigalha": "migalhaFerramentas",
            "idOndeSearchInput": "searchInputFerramentas",
            "templateFolder" : "templates/ferramentasFolder.html",
            "templateMigalha" : "templates/ferramentasMigalha.html",
            "templateLinks" : "templates/ferramentasLink.html",
            "templateSearchInput" : "templates/searchInput.html"
        },
        carregaTemplates: function(){
            var t1 = i3GEO.caixaDeFerramentas.config.templateFolder,
            t2 = i3GEO.caixaDeFerramentas.config.templateLinks,
            t3 = i3GEO.caixaDeFerramentas.config.templateMigalha;
            $.when( $.get(t1),$.get(t2),$.get(t3) ).done(function(r1,r2,r3) {
                i3GEO.template.ferramentasFolder = r1[0];
                i3GEO.template.ferramentasLinks = r2[0];
                i3GEO.template.ferramentasMigalha = r3[0];
                i3GEO.caixaDeFerramentas.inicia();
            }).fail(function() {
                i3GEO.janela.closeMsg($trad("erroTpl"));
                return;
            });
        },
        aguarde: function(){
            //$("#" + i3GEO.caixaDeFerramentas.config.idFolder).html($trad("o1"));
        },
        inicia : function(config){
            if(config){
                $.each( config, function( i,v ) {
                    i3GEO.caixaDeFerramentas.config[i] = v;
                });
            }
            i3GEO.caixaDeFerramentas.aguarde();
            if(!i3GEO.template.ferramentasFolder || !i3GEO.template.ferramentasLinks || !i3GEO.template.ferramentasMigalha){
                i3GEO.caixaDeFerramentas.carregaTemplates();
                return;
            } else {
                i3GEO.caixaDeFerramentas.searchInput();
                i3GEO.caixaDeFerramentas.nivel0();
            }
        },
        //get eh feito aqui pois o template pode nao existir na instalacao do i3Geo
        searchInput: function(){
            if(!i3GEO.template.searchInput){
                var t4 = i3GEO.caixaDeFerramentas.config.templateSearchInput;
                $.get(t4).done(function(r4){
                    i3GEO.template.searchInput = r4;
                    $("#" + i3GEO.caixaDeFerramentas.config.idOndeSearchInput).html(
                            Mustache.render(
                                    i3GEO.template.searchInput,
                                    {
                                        id: "searchInputListaFerramentas",
                                        placeholder: $trad("t23")
                                    }
                            )
                    );
                    i3GEO.caixaDeFerramentas.searchInputStart("searchInputListaFerramentas");
                });
            } else {
                $("#" + i3GEO.caixaDeFerramentas.config.idOndeSearchInput).html(i3GEO.template.searchInput);
            }
        },
        searchInputStart: function(id){
            $.typeahead({
                input: '#' + id,
                minLength: 1,
                accent: true,
                cancelButton: false,
                maxItem: 10,
                order: "asc",
                hint: true,
                dynamic: false,
                maxItemPerGroup: null,
                cache: false,
                ttl: 86400000, // 1day
                compression: true,
                template: "<a href='{{url}}' >{{nome}}</a>",
                display: ["nome"],
                source: {
                    data: i3GEO.caixaDeFerramentas.allTools()
                },
                debug: false,
                callback: {
                    onClickAfter: function(node, a, item, event){

                        $(node).val("");
                    }
                }
            });
        },
        allTools: function(){
            var confm = i3GEO.listaDeFerramentas,
            subs = i3GEO.listaDeFerramentas.submenus,
            menu = confm.menu,
            n = menu.length,
            f = i3GEO.caixaDeFerramentas.config,
            i,data = [];
            for (i = 0; i < n; i += 1) {
                if(menu[i].Interface && menu[i].Interface != i3GEO.Interface.ATUAL){
                    continue;
                }
                $.each(subs[menu[i].id], function( index, value ) {
                    var no = value.submenu;
                    if(no && no.itemdata){
                        $.each(no.itemdata, function( index1, value1 ) {
                            $.each(value1, function( index2, value2 ) {
                                data.push({
                                    nome: $('<div/>').html(value2.text).text(),
                                    url: value2.url
                                });
                            });
                        });
                    } else {
                        if(value.url && !value.target){
                            data.push({
                                nome: $('<div/>').html(value.text).text(),
                                url: value.url
                            });
                        }
                    }

                });
            }
            return data;
        },
        migalha: function (data){
            var f = i3GEO.caixaDeFerramentas.config;
            var t = Mustache.to_html(
                    i3GEO.template.ferramentasMigalha,
                    {"nome":data.nome}
            );
            $("#" + f.idOndeMigalha)
            .data(data)
            .html(t)
            .click(function(event){
                var f = i3GEO.caixaDeFerramentas.config;
                event.stopImmediatePropagation();
                $("#" + f.idOndeMigalha).off("click");
                var data = $(this).data();
                if((data.nivel - 1) == 0){
                    f.idOndeFolder.fadeOut( "fast", function(){
                        i3GEO.caixaDeFerramentas.nivel0();
                        i3GEO.caixaDeFerramentas.config.idOndeFolder.show();
                    });
                }
                if((data.nivel - 1) == 1){
                    f.idOndeFolder.fadeOut( "fast", function(){
                        i3GEO.caixaDeFerramentas.nivel1(data);
                        i3GEO.caixaDeFerramentas.config.idOndeFolder.show();
                    });
                }
                if((data.nivel - 1) == 2){
                    f.idOndeFolder.fadeOut( "fast", function(){
                        i3GEO.caixaDeFerramentas.nivel2(data);
                        i3GEO.caixaDeFerramentas.config.idOndeFolder.show();
                    });
                }
            });
        },
        nivel0 : function(){
            var confm = i3GEO.listaDeFerramentas,
            subs = i3GEO.listaDeFerramentas.submenus,
            menu = confm.menu,
            n = menu.length,
            f = i3GEO.caixaDeFerramentas.config,
            i,t,data;

            $("#" + f.idOndeMigalha).html("");
            f.idOndeFolder.html("");
            f.idOndeLinks.html("");
            for (i = 0; i < n; i += 1) {
                if(menu[i].Interface && menu[i].Interface != i3GEO.Interface.ATUAL){
                    continue;
                }
                if(subs[menu[i].id].length > 0){
                    t = Mustache.to_html(
                            i3GEO.template.ferramentasFolder,
                            {"nome":menu[i].nome,"descricao":menu[i].descricao}
                    );
                    t = $(t);
                    //quando clica, abre o nivel 1 e muda a migalha
                    data = {"nivel":1,"nome":menu[i].nome,"id":i,"n0": i, "n1":"", "n2": "", "n3": ""};
                    t.find("a")
                    .data(data)
                    .click(function(){
                        $(this).find("a").off("click");
                        var data = $(this).data();
                        //texto da migalha e evento click
                        i3GEO.caixaDeFerramentas.config.idOndeFolder.fadeOut( "fast", function(){
                            i3GEO.caixaDeFerramentas.nivel1(data);
                            i3GEO.caixaDeFerramentas.config.idOndeFolder.show();
                        });
                    });
                    i3GEO.caixaDeFerramentas.config.idOndeFolder
                    .append(t);
                }
            }
        },
        nivel1 : function(data){
            var confm = i3GEO.listaDeFerramentas,
            menu = confm.submenus[confm.menu[data.n0].id],
            n = menu.length,
            f = i3GEO.caixaDeFerramentas.config,
            i,t,datan;

            f.idOndeFolder.html("");
            f.idOndeLinks.html("");
            for (i = 0; i < n; i += 1) {
                if(menu[i].Interface && menu[i].Interface != i3GEO.Interface.ATUAL){
                    continue;
                }
                datan = {"nivel":2,"nome":menu[i].text,"id":menu[i].id,"n0": data.n0, "n1":i, "n2": "", "n3": ""};
                if(menu[i].url){
                    t = Mustache.to_html(
                            i3GEO.template.ferramentasLinks,
                            {"show": menu[i].show,"nome":menu[i].text,"target": menu[i].target,"url": menu[i].url,"opcional": menu[i].opcional}
                    );
                    t = $(t);
                    f.idOndeLinks
                    .append(t);
                } else {
                    t = Mustache.to_html(
                            i3GEO.template.ferramentasFolder,
                            {"nome":menu[i].text}
                    );
                    t = $(t);
                    t.find("a")
                    .data(datan)
                    .click(function(){
                        $(this).find("a").off("click");
                        var data = $(this).data();
                        var f = i3GEO.caixaDeFerramentas.config;
                        var t = Mustache.to_html(
                                i3GEO.template.ferramentasMigalha,
                                data
                        );
                        //texto da migalha e evento click
                        //nivel2(data);
                        f.idOndeFolder.fadeOut( "fast", function(){i3GEO.caixaDeFerramentas.nivel2(data);f.idOndeFolder.show();});
                    });
                    f.idOndeFolder
                    .append(t);
                }
            }
            data.nivel = 1;
            data.nome = confm.menu[data.id].nome;
            data.n0 = data.id;
            i3GEO.caixaDeFerramentas.migalha(data);
        },
        nivel2 : function(data){
            var confm = i3GEO.listaDeFerramentas,
            menu = confm.submenus[confm.menu[data.n0].id][data.n1].submenu.itemdata[0],
            n = menu.length,
            f = i3GEO.caixaDeFerramentas.config,
            i,t,datan;

            f.idOndeFolder.html("");
            f.idOndeLinks.html("");
            for (i = 0; i < n; i += 1) {
                if(menu[i].Interface && menu[i].Interface != i3GEO.Interface.ATUAL){
                    continue;
                }
                datan = {"nivel":3,"nome":menu[i].text,"id":menu[i].id,"n0": data.n0, "n1":data.n1, "n2": i, "n3": ""};
                if(menu[i].url){
                    t = Mustache.to_html(
                            i3GEO.template.ferramentasLinks,
                            {"show":menu[i].show,"nome":menu[i].text,"target": menu[i].target,"url": menu[i].url,"opcional": menu[i].opcional}
                    );
                    t = $(t);
                    f.idOndeLinks
                    .append(t);
                } else {
                    t = Mustache.to_html(
                            i3GEO.template.ferramentasFolder,
                            {"nome":menu[i].text}
                    );
                    t = $(t);
                    t.find("a")
                    .data(datan)
                    .click(function(){
                        $(this).find("a").off("click");
                        var data = $(this).data();
                        var t = Mustache.to_html(
                                i3GEO.caixaDeFerramentas.config.templateMigalha,
                                data
                        );
                    });
                    f.idOndeFolder
                    .append(t);
                }
            }
            data.nivel = 2;
            data.id = data.n0;
            i3GEO.caixaDeFerramentas.migalha(data);
        }
};