// // import Promise from 'promise-polyfill';

// // To add to window
// if (!window.Promise) {
//   window.Promise = Promise;
// }

$(function () {
    /** Code! */
    var OL = require('./ol');
    let ancho = $(".container").width(),
        notis;


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
                    seccion = notis[i].seccion,
                    texto = notis[i].texto;

                    console.log(etiqueta);

                let aviso = '<div class="noti"><h2 class="titu">' + titulo + '</h2>';
                    aviso += '<h3 class="baja">' + bajada + '</h3>';
                    aviso += '<div class="foto ' + foto_tipo + '" style="background-image:url(img/'+ foto+')"></div>';
                    aviso += '<div class="info"><p class="fecha">'+ fecha +' | '+ autor+'</p><p class="etiqueta">'+etiqueta+'</p></div>';
                    aviso += '<div class="notiTex"><p class="tex">'+ texto +'</p></div>';
                    aviso += '</div>';
            
                $('#contenedor').append(aviso);
            }
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
