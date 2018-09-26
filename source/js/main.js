// // import Promise from 'promise-polyfill';

// // To add to window
// if (!window.Promise) {
//   window.Promise = Promise;
// }

$(function () {
    /** Code! */
    var OL = require('./ol');
    let ancho = $(".container").width(),
        notis,
        capac,
        array_Secc = [];
    // var sticky = new Sticky('.sticky');


    let dataDrive = OL.getGdocUrlCdn("https://docs.google.com/spreadsheets/d/1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44/edit#gid=0");
    let dataCapac = OL.getGdocUrlCdn("https://docs.google.com/spreadsheets/d/1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44/edit#gid=719992898");
    //let dataDrive = "https://docs.google.com/spreadsheets/d/1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44/edit#gid=0";
    //let dataDrive = "https://docs.google.com/spreadsheets/d/1KqGmwFI_-3GfdNdpT-iKHiKHU2GUqQL-eYC63hMs_M0/edit#gid=0";

    var app = {

        init: function(){

            $.ajax({

                type: "GET",
                url: dataDrive,
                dataType: "json",

                success: function(data){
                    //console.log("haaaaaaaaaaaaaa");
                    notis = data;
                    app.armaData(notis);
                    app.armaSticky();
                    app.cambiaBotones();
                },
                error: function(error, status) {
                    console.log("error", status);
                }
            })

            $.ajax({

                type: "GET",
                url: dataCapac,
                dataType: "json",

                success: function(data){
                    console.log("haaaaaaaaaaaaaa");
                    capac = data;
                    app.armaCapac(capac);
                },
                error: function(error, status) {
                    console.log("error", status);
                }
            })
        },

        armaData: function(notis){

            for (var i = 0; i < notis.length; i++) {


                let titulo = notis[i].titulo,
                    bajada = notis[i].bajada,
                    foto_tipo = notis[i].foto_tipo,
                    foto = notis[i].foto,
                    fecha = notis[i].fecha,
                    destacado = notis[i].destacado,
                    autor = notis[i].autor,
                    etiqueta = notis[i].etiqueta,
                    etiq_corto = etiqueta.replace(/[áéíóú\s\(\)\(.)\(+)\(,)/]/g, "").toLowerCase(),
                    seccion = notis[i].seccion,
                    texto = notis[i].texto;


                if(destacado == "si"){
                    // if(foto_tipo == "gra"){
                        let aviso = '<div class="noti '+ etiq_corto +' destacado"><h2 class="titu">' + titulo + '</h2>';
                            aviso += '<h3 class="baja">' + bajada + '</h3>';
                            aviso += '<div class="foto ' + foto_tipo + '" style="background-image:url(img/'+ foto+')"></div>';
                            aviso += '<div class="info"><p class="fecha">'+ fecha +' | '+ autor+'</p><p class="etiqueta">'+etiqueta+'</p></div>';
                            aviso += '<div class="notiTex"><p class="tex">'+ texto +'</p></div>';
                            aviso += '</div>';
                $('#conteNoti #destacados').append(aviso);
                //         }else if(foto_tipo == "chi"){
                //             let aviso = '<div class="noti '+ etiq_corto +' destacaChico"><h2 class="titu">' + titulo + '</h2>';
                //                 aviso += '<h3 class="baja">' + bajada + '</h3>';
                //                 aviso += '<div class="foto ' + foto_tipo + '" style="background-image:url(img/'+ foto+')"></div>';
                //                 aviso += '<div class="info"><p class="fecha">'+ fecha +' | '+ autor+'</p><p class="etiqueta">'+etiqueta+'</p></div>';
                //                 aviso += '<div class="notiTex"><p class="tex">'+ texto +'</p></div>';
                //                 aviso += '</div>';
                // $('#contenedor').append(aviso);
                //         }
                }else{
                    let aviso = '<div class="noti '+ etiq_corto +'"><h2 class="titu">' + titulo + '</h2>';
                        aviso += '<h3 class="baja">' + bajada + '</h3>';
                        aviso += '<div class="foto ' + foto_tipo + '" style="background-image:url(img/'+ foto+')"></div>';
                        aviso += '<div class="info"><p class="fecha">'+ fecha +' | '+ autor+'</p><p class="etiqueta">'+etiqueta+'</p></div>';
                        aviso += '<div class="notiTex"><p class="tex">'+ texto +'</p></div>';
                        aviso += '</div>';
                $('#conteNoti #contenedor').append(aviso);
                }

            }

            app.selectSeccion(notis);
        },

        armaCapac: function(capac){
                $('#notiCapac').append("<h2>CAPACITACIONES PASADAS</h2>");
            for (var i = 0; i < capac.length; i++) {

                let titulo = capac[i].titulo,
                    lugar = capac[i].lugar,
                    fecha = capac[i].fecha,
                    foto = capac[i].foto,
                    texto = capac[i].texto,
                    etiqCapac = capac[i].etiqueta,
                    destacado = capac[i].destacado;


                if(destacado == "si"){
                    let capacita = '<div class="capac destacado"><div class="etiqCapac">'+ etiqCapac +'</div>';
                        capacita += '<h2 class="titu">' + titulo + '</h2>';
                        capacita += '<div class="infoCapac"><p class="lugar">' + lugar + '</p><p class="fechaCapac">' + fecha + '</p></div>';
                        capacita += '<div class="foto" style="background-image:url(img/capac/'+ foto+')"></div>';
                        capacita += '<div class="capacTex"><p class="tex">'+ texto +'</p></div>';
                        capacita += '</div>';
                    $('#destaCapac').append(capacita);
                }else{
                    let capacita = '<div class="capac"><div class="etiqCapac">'+ etiqCapac +'</div>';
                        capacita += '<h2 class="titu">' + titulo + '</h2>';
                        capacita += '<div class="infoCapac"><p class="lugar">' + lugar + '</p><p class="fechaCapac">' + fecha + '</p></div>';
                        capacita += '<div class="foto" style="background-image:url(img/capac/pasadas/'+ foto+')"></div>';
                        capacita += '<div class="capacTex"><p class="tex">'+ texto +'</p></div>';
                        capacita += '</div>';
                    $('#notiCapac').append(capacita);
                }

            }
        },

        armaSticky: function(){

            $(document).ready(function() {
                // grab the initial top offset of the navigation 
                var stickyNavTop = $('#stickyNav').offset().top;
                
                // our function that decides weather the navigation bar should have "fixed" css position or not.
                var stickyNav = function(){
                    var scrollTop = $(window).scrollTop(); // our current vertical position from the top
                         
                    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
                    // otherwise change it back to relative
                    if (scrollTop > stickyNavTop) { 
                        $('#stickyNav').addClass('sticky');
                        $('.logo img').attr("src", "img/logo_sticky.jpg").css("width", 100+"%");
                    } else {
                        $('#stickyNav').removeClass('sticky'); 
                        $('.logo img').attr("src", "img/logo_sate.png").css("width", 70+"%");
                    }
                };

                stickyNav();
                // and run it again every time you scroll
                $(window).scroll(function() {
                    stickyNav();
                });
            });
        },

        selectSeccion: function(notis) {

            $("#selectSeccion").select2({
                minimumResultsForSearch: Infinity,
                placeholder: "Seleccioná"
            });

            //$("#selectSeccion").append('<option></option>');

            var check = false;
            for (let i = 0; i < notis.length; i++) {

                check = false;

                let selEtiqueta = notis[i].etiqueta;
                let etiq_corto = selEtiqueta.replace(/[áéíóú\s\(\)\(.)\(+)\(,)/]/g, "").toLowerCase();

                if(etiq_corto == ""){
                    etiq_corto = "sinDatos";
                }

                for (let e = 0; e < array_Secc.length; e++) { // check si ya existe la referencia en el array

                    if (array_Secc[e] == etiq_corto) {
                        check = true;
                    }

                }

                if (check == false) {
                    array_Secc.push(etiq_corto);
                    if(etiq_corto != "sinDatos"){
                        $("#selectSeccion").append('<option value="' +etiq_corto+ '">' + selEtiqueta + '</option>');
                    }
                }

                let valor = "";

                $("#selectSeccion").on("change", function(){
                    valor = this.value;
                    filtraSelect();
                });

                function filtraSelect(){

                    // let selEtiqueta = notis[i].etiqueta;
                    // let etiq_corto = selEtiqueta.replace(/[áéíóú\s\(\)\(.)\(+)\(,)/]/g, "").toLowerCase();
                        //$(".noti").css("display", "none");

                    if(valor == "secciones"){
                        //console.log("valor secciones", valor, etiq_corto);
                        $(".noti").css("display", "inline-block");
                        $("#tree").html("<span>HOME </span> > <span>NOTICIAS </span>");
                    }else if(valor == etiq_corto){
                        //console.log("valor etiq_corto", valor, etiq_corto);
                        //console.log(valor == etiq_corto);
                        $("#conteNoti #destacados .noti").css("display", "none");
                        $("#conteNoti #contenedor .noti").css("display", "none");
                        $("#conteNoti #destacados .noti."+etiq_corto).css("display", "inline-block");
                        $("#conteNoti #contenedor .noti."+etiq_corto).css("display", "inline-block");
                        $("#tree").html("<span>HOME </span> > <span>NOTICIAS </span> > <span>"+ selEtiqueta.toUpperCase() +"</span>");
                    }
                }
            } // termina for spreadhseeht

            //$("#selectSeccion").append('<option value="sinDatos">Sin Datos</option>');

            //console.log(array_Secc);


        },

        cambiaBotones: function(){
            let botManual = $("#stickyNav .cont .menu #botones #manual"),
                botManuFijo = $("#stickyNav .cont .menu #manuFijo"),
                botCapaci = $("#stickyNav .cont .menu #botones #capacitacion"),
                botCapacFijo = $("#stickyNav .cont .menu #capacFijo"),
                botNoti = $("#stickyNav .cont .menu #botones #noticias"),
                botNotiFijo = $("#stickyNav .cont .menu #notiFijo"),
                botInsti = $("#stickyNav .cont .menu #botones #institucional"),
                botInstiFijo = $("#stickyNav .cont .menu #instiFijo"),
                menuBotones = $("#stickyNav .cont .menu #botones"),
                menuInstitucion = $("#stickyNav .cont .menu #botones #institucional #menuInsti #botonesMenuInsti"),
                botCruz = $("#stickyNav .cont #cruz"),
                botHambur = $("#stickyNav .cont #hambur");
                botManuFijo.hide();
                botCapacFijo.hide();
                botNotiFijo.hide();
                botInstiFijo.hide();
                menuInstitucion.hide();

            if(ancho > 641){
                menuBotones.show();
            }else{
                botCruz.hide();
                menuBotones.hide();
                botManuFijo.hide();
                botCapacFijo.hide();
                botNotiFijo.hide();
                botInstiFijo.hide();
            }

            botManual.on("click", function(){
                $("#conteManual").css("transition", "all .5s ease-in").css("display", "block");
                $("#conteNoti, #conteCapaci").css("transition", "all .5s ease-in").css("display", "none");
                $("#selSecc").css("transition", "all .5s ease-in").css("opacity", 0);
                botManual.addClass("active");
                botCapaci.removeClass("active");
                botNoti.removeClass("active");
                botInsti.removeClass("active");
                menuInstitucion.hide();
                $("#tree").html("<span>HOME </span> > <span>"+botManual.text()+"</span>");

                if(ancho < 640){
                    botManuFijo.show();
                    botCapacFijo.hide();
                    botNotiFijo.hide();
                    botInstiFijo.hide();
                    menuBotones.slideToggle("fast");
                    botCruz.hide();
                    botHambur.show();
                }
            });
            botCapaci.on("click", function(){
                $("#conteCapaci").css("transition", "all .5s ease-in").css("display", "block");
                $("#conteNoti, #conteManual").css("transition", "all .5s ease-in").css("display", "none");
                $("#selSecc").css("transition", "all .5s ease-in").css("opacity", 0);
                botManual.removeClass("active");
                botCapaci.addClass("active");
                botNoti.removeClass("active");
                botInsti.removeClass("active");
                menuInstitucion.hide();
                $("#tree").html("<span>HOME </span> > <span>"+botCapaci.text()+"</span>");

                if(ancho < 640){
                    botManuFijo.hide();
                    botCapacFijo.show();
                    botNotiFijo.hide();
                    botInstiFijo.hide();
                    menuBotones.slideToggle("fast");
                    botCruz.hide();
                    botHambur.show();
                }
            });
            botNoti.on("click", function(){
                $("#conteNoti").css("transition", "all .5s ease-in").css("display", "block");
                $("#conteCapaci, #conteManual").css("transition", "all .5s ease-in").css("display", "none");
                $("#selSecc").css("transition", "all .5s ease-in").css("opacity", 1);
                botManual.removeClass("active");
                botCapaci.removeClass("active");
                botNoti.addClass("active");
                botInsti.removeClass("active");
                menuInstitucion.hide();
                $("#tree").html("<span>HOME </span> > <span>"+botNoti.text()+"</span>");

                if(ancho < 640){
                    botNotiFijo.show();
                    botCapacFijo.hide();
                    botManuFijo.hide();
                    botInstiFijo.hide();
                    menuBotones.slideToggle("fast");
                    botCruz.hide();
                    botHambur.show();
                }
            });
            botInsti.on("click", function(){
                //$("#conteInsti").css("transition", "all .5s ease-in").css("display", "block");
                //$("#conteCapaci, #conteManual, #conteNoti").css("transition", "all .5s ease-in").css("display", "none");
                $("#selSecc").css("transition", "all .5s ease-in").css("opacity", 0);
                botManual.removeClass("active");
                botCapaci.removeClass("active");
                botNoti.removeClass("active");
                botInsti.addClass("active");
                //menuInstitucion.show();
                menuInstitucion.slideToggle("fast");
                let botInsti2 = $("#stickyNav .cont .menu #botones #institucional a");
                $("#tree").html("<span>HOME </span> > <span>"+botInsti2.text()+"</span>"+"</span>");

                if(ancho < 640){
                    botInstiFijo.show();
                    botCapacFijo.hide();
                    botManuFijo.hide();
                    botNotiFijo.hide();
                    menuBotones.slideToggle("fast");
                    botCruz.hide();
                    botHambur.show();
                }
            });

            botHambur.on("click", function(){
                
                menuBotones.slideToggle("fast", function(){
                    botHambur.hide();
                    botCruz.show();
                });
                // $(".menu #botones").css("transition", "all .5s ease-in").css("opacity", 1).toggle("opacityUno opacityCero");
            })

            botCruz.on("click", function(){
                menuBotones.slideToggle("fast", function(){
                    botCruz.hide();
                    botHambur.show();
                })
            })
        }
    }

    app.init();


});


Number.prototype.format = function(c, d, t){
    var n = this;
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;
    var s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    var nn = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return nn;
};
