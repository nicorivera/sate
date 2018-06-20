//var xmlhttp;
$(function () {

	var SR = require('js/sr');
	// require(['sr'], function (sr) {
	//     //foo is now loaded.
	//     console.log("hola9999999");
	// });
	
	//let dataDrive = "https://olcreativa.lanacion.com.ar/dev/get_url/?key=1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44";
	//let dataDrive = "https://docs.google.com/spreadsheets/d/1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44/edit#gid=0";
	let dataDrive = "https://docs.google.com/spreadsheets/d/1KqGmwFI_-3GfdNdpT-iKHiKHU2GUqQL-eYC63hMs_M0/edit#gid=0";

	var app = {

		init: function(){

			$.ajax({

			    type: "GET",
			    url: dataDrive,
			    dataType: "json",

			    success: function(data){
			        console.log("haaaaaaaaaaaaaa");
			        var notis = data;
			        app.carga(notis);
					console.log(notis);
			    },
			    error: function(error, status) {
			        console.log("error", status);
			    }
			});
		},

		carga: function(notis){

	        var noti='';

			// $("#contene").append(function(notis){
				//var i;
				var notis;
				//for(var i = 0; i < notis.length; i++){
				for(var i in notis){

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
		    	$('.noti').html(noti);
				console.log(notis);
			//})
	    },
	};

	app.init();
	app.carga();
	// xmlhttp=new XMLHttpRequest();
	// xmlhttp.onreadystatechange = function() {
	// 	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	// 	  var jsonResponse = xmlhttp.responseText;
	// 	  var objson = JSON.parse(jsonResponse);
	// 	  var noved = objson.novedades;
	// 	  var sindi = objson.sindicato;
	// 	  var notSind = '';
	// 	  var notNov = '';

	// 	  $.get( "https://olcreativa.lanacion.com.ar/dev/get_url/?key=1auWKBVxPLjPVg71G9mugJqt4fDjWpuEFqk7r9lPcm44", function( datos ) {
	// 	  	carga(datos);
	// 	  	console.log(datos);
	// 	  });

		
	  ///////////// PRIMER CARGA ////////////////
	    // $("#sind").css("display", "block");
	    // $("#noveda").css("display", "none");
	    // $("#botSind").addClass("activo");
	    // $("#botHome").removeClass("activo");
	    // $("#botNov").removeClass("activo");
	    // $("#botCont").removeClass("activo");
	    //cuartosIm = '';

		 //    for (var s=0; s < sindi.length; s++) {
		 //      var titu = sindi[s].titu;
		 //      var baja = sindi[s].baja;
		 //      var imag = sindi[s].imag;
		 //      var fech = sindi[s].fech;
		 //      var etiq = sindi[s].etiq;
		 //      var auto = sindi[s].auto;
		 //      var text = sindi[s].texto;

			// }
	// 	}
	// }

	// function carga(datos){
	// 	var notis='';

	// 	$("#contene").html(function(){
	// 		var i;
	// 		for(var i=0; i < datos.length; i++){

	// 		    //notis += '<div class="noti">';
	// 		    notis += '<div><h2 class="titu">' + datos[i].titulo + '</h2>';
	// 		    notis += '<h3 class="baja">' + datos[i].bajada + '</h3>';
	// 		    notis += '<div class="foto ' + datos[i].foto_tipo + '" style="background-image:url(img/'+ datos[i].foto+')"></div>';
	// 		    notis += '<div><p id="fecha">'+ datos[i].fecha +'</p><p id="autor">'+ datos[i].autor+'</p></div>';
	// 		    notis += '<div class="notiTex"><p class="tex">'+ datos[i].texto +'</p></div>';
	// 		    notis += '</div>';
	// 		}
	//     	$('.noti').html(notis);
	// 		console.log(data);
	// 	})
	// };
})

