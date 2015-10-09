/**
 * Created by mp.mancipe10 on 01/10/2015.
 */
var listas=[{id: 0, name: "lista 1", canciones: [{"title":"We're Going To Be Friends","artist":"The White Stripes","year":"2001","web_url":"http://www.songnotes.cc/songs/118-the-white-stripes-we-are-going-to-be-friends","img_url":"http://fireflygrove.com/songnotes/images/artists/TheWhiteStripes.jpg"},{"title":"What I Got","artist":"Sublime","year":"1996","web_url":"http://www.songnotes.cc/songs/20-sublime-what-i-got","img_url":"http://fireflygrove.com/songnotes/images/artists/Sublime.png"}]}];
var actual=listas[0];
var canciones=[];
var plantillaListas;
var plantillaCanciones;
var plantillaActual;

$(document).ready(function(){
        cargarCanciones();

        $("#btnAgregarCancion").click(function(){
            console.log("principio");
            var title =$("#title").val();
            var artist=$("#artist").val();
            var year=$("#year").val();
            var url=$("#url").val();
            agregarCancion(title,artist,year,url);
        });
        $("#btnAgregarLista").click(function(){
            var nom = $("#lista").val();
            agregarLista(nom);
        });
        $("#btnEliminarLista").click(function(){
            eliminarLista();
        });

        $("#btnAgregarCancionesListas").click(function(){
            var ids=[];
            $("#cuerpoTabla input:checked").each(function(){
                ids.push(this.id);
                console.log(this.id);
            });
            for(var i=0; i<ids.length; i++){
                agregarCancionLista(ids[i]);
            }
            mostrarListas(listas);
            mostrarCancionesLista(actual);
        });
        $("#btnEliminarCanciones").click(function(){
            var ids=[];
            $("#cuerpoTabla input:checked").each(function(){
                ids.push(this.id);
            });
            for(var i=0; i<ids.length; i++){
                removerCancion(ids[i]);
            }
            mostrarCanciones(canciones);
            mostrarCancionesLista(actual);
        });
        $("#btnRemoverCanciones").click(function(){
            var ids=[];
            $("#listaActual input:checked").each(function(){
                ids.push(this.id);
            });
            for(var i=0; i<ids.length; i++){
                removerCancionLista(ids[i]);
            }
            mostrarCancionesLista(actual);
        });

    }

);

function cargarCanciones(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://raw.githubusercontent.com/MariaMancipe/listaMusica/master/data.json", true);
    xmlhttp.onreadystatechange = function(){
        //carga la lista
        //onsole.log(xmlhttp.responseText);
        var x = JSON.parse(xmlhttp.responseText);
        canciones = x.songs;
        //console.log(canciones);
        mostrarCanciones(canciones);
        mostrarListas(listas);
        mostrarCancionesLista(actual);
    }
    xmlhttp.send();
}

function removerCancion(indice){
    if(indice>-1&&indice<canciones.length){
        canciones.splice(indice,1);
    }

}

function agregarCancion(tit,art,y,url){
    var cancion = {id: canciones.length, title:tit, artist:art, year:y,web_url:url,image_url:""};
    console.log("1");
    canciones.push(cancion);
    console.log("2");
    $("#title").val("");
    $("#artist").val("");
    $("#year").val("");
    $("#url").val("");
    mostrarCanciones(canciones);
    console.log("3");
}

function agregarCancionLista(indice){
    var x = canciones[indice];
    actual.canciones.push(x);
}

function removerCancionLista(indice){
    actual.canciones.splice(indice,1);

}

function agregarLista(nom){
    var lista = {name:nom,canciones:[]};
    actual = lista;
    listas.push(lista);
    mostrarListas(listas);
    mostrarCancionesLista(actual);
    $("#lts").val(actual.name);
}

function eliminarLista(indice){
    if(indice>-1 && indice<listas.length){
        listas.splice(indice,1);
        actual = listas[0];
        mostrarListas(listas);
        mostrarCancionesLista(actual);
        $("#lts").val(actual.name);

    }
}

function mostrarListas(listas){
    if(plantillaListas == null && plantillaListas == undefined){
        var fuentePlantilla = $("#lis").html();
        var plantilla = Handlebars.compile(fuentePlantilla);
        plantillaListas = plantilla;
    }
    var html = plantillaListas(listas);
    $("#lts").html(html);

}

function mostrarCanciones(canciones){
    console.log("holaholaholahola");
    if( plantillaCanciones == null && plantillaCanciones == undefined ){
        var fuentePlantilla = $("#canciones").html();
        var plantilla = Handlebars.compile( fuentePlantilla );
        plantillaCanciones = plantilla;
    }
    var html = plantillaCanciones(canciones);
    $("#cuerpoTabla").append(html);
}


function mostrarCancionesLista(actual){
    var cancionesLista = actual.canciones;
    if(plantillaActual == null && plantillaActual == undefined){
        var fuentePlantilla = $("#cancionesListaActual").html();
        var plantilla = Handlebars.compile( fuentePlantilla );
        plantillaActual=plantilla;
    }
    var html = plantillaActual(cancionesLista);
    $("#listaActual").html(html);
}