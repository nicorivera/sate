// // import Promise from 'promise-polyfill';

// // To add to window
// if (!window.Promise) {
//   window.Promise = Promise;
// }

$(function () {
    /** Code! */

    let ancho = $(".container").width(),
        dataDrive,
        notis;
//var SR = require('js/sr');
    // require(['sr'], function (sr) {
    //     //foo is now loaded.
    //     console.log("hola9999999");
    // });
    
    let dataDrive = "https://olcreativa.lanacion.com.ar/dev/get_url/?key2=1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44";
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
                    app.carga(notis);
                },
                error: function(error, status) {
                    console.log("error", status);
                }
            });
        },

        carga: function(notis){
                    console.log(data);


            var noti;

            // $("#contene").append(function(notis){
                //var i;
                //var notis;
                for(var i = 0; i < notis.length; i++){
                //for(var i in notis){

                    let titulo = notis.titulo,
                        bajada = notis.bajada,
                        foto_tipo = notis.foto_tipo,
                        foto = notis.foto,
                        fecha = notis.fecha,
                        autor = notis.autor,
                        texto = notis.texto;

                    //notis += '<div class="noti">';
                    noti = '<div><h2 class="titu">' + titulo + '</h2>';
                    noti += '<h3 class="baja">' + bajada + '</h3>';
                    noti += '<div class="foto ' + foto_tipo + '" style="background-image:url(img/'+ foto+')"></div>';
                    noti += '<div><p id="fecha">'+ fecha +'</p><p id="autor">'+ autor+'</p></div>';
                    noti += '<div class="notiTex"><p class="tex">'+ texto +'</p></div>';
                    noti += '</div>';
                }
                $('#contene .noti').append(noti);
                console.log(notis);
            //})
        },
    }

    app.init();
    app.carga();

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
