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
        array_Secc = [];
    // var sticky = new Sticky('.sticky');


    let dataDrive = OL.getGdocUrlCdn("https://docs.google.com/spreadsheets/d/1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44/edit#gid=0");
    //let dataDrive = "https://docs.google.com/spreadsheets/d/1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44/edit#gid=0";
    //let dataDrive = "https://docs.google.com/spreadsheets/d/1KqGmwFI_-3GfdNdpT-iKHiKHU2GUqQL-eYC63hMs_M0/edit#gid=0";

    var app = {

        init: function(){

            $.ajax({

                type: "GET",
                url: dataDrive,
                dataType: "json",

                success: function(data){
                    console.log("haaaaaaaaaaaaaa");
                    notis = data;
                    app.armaData(notis);
                    app.armaSticky();
                },
                error: function(error, status) {
                    console.log("error", status);
                }
            });
        },

        armaData: function(notis){

            for (var i = 0; i < notis.length; i++) {


                let titulo = notis[i].titulo,
                    bajada = notis[i].bajada,
                    foto_tipo = notis[i].foto_tipo,
                    foto = notis[i].foto,
                    fecha = notis[i].fecha,
                    autor = notis[i].autor,
                    etiqueta = notis[i].etiqueta,
                    etiq_corto = etiqueta.replace(/[áéíóú\s\(\)\(.)\(+)\(,)/]/g, "").toLowerCase(),
                    seccion = notis[i].seccion,
                    texto = notis[i].texto;

                    console.log(etiqueta);

                let aviso = '<div class="noti '+ etiq_corto +'"><h2 class="titu">' + titulo + '</h2>';
                    aviso += '<h3 class="baja">' + bajada + '</h3>';
                    aviso += '<div class="foto ' + foto_tipo + '" style="background-image:url(img/'+ foto+')"></div>';
                    aviso += '<div class="info"><p class="fecha">'+ fecha +' | '+ autor+'</p><p class="etiqueta">'+etiqueta+'</p></div>';
                    aviso += '<div class="notiTex"><p class="tex">'+ texto +'</p></div>';
                    aviso += '</div>';
            
                $('#contenedor').append(aviso);
            }

            app.selectSeccion(notis);
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
                    console.log(valor);
                    filtraSelect();
                });

                function filtraSelect(){

                    // let selEtiqueta = notis[i].etiqueta;
                    // let etiq_corto = selEtiqueta.replace(/[áéíóú\s\(\)\(.)\(+)\(,)/]/g, "").toLowerCase();

                    if(valor == "secciones"){
                        $(".noti").css("display", "inline-block");
                        console.log("1", valor, etiq_corto);
                    }else if(valor == etiq_corto){
                        console.log("2", valor, etiq_corto);
                        //$(".noti").css("display", "none");
                        $(".noti ."+etiq_corto).css("display", "inline-block");
                    }else{
                        console.log("3", valor, etiq_corto);
                        //$(".noti ."+etiq_corto).css("display", "none");
                    }
                }
            } // termina for spreadhseeht

            //$("#selectSeccion").append('<option value="sinDatos">Sin Datos</option>');

            //console.log(array_Secc);


        },
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
