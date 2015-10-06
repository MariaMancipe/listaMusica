/**
 * Created by mp.mancipe10 on 01/10/2015.
 */
var listas;
var actual;

$(document).ready(function(){
        cargarCanciones();
    }
);

function cargarCanciones(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://davidpots.com/jakeworry/017%20JSON%20Grouping,%20part%203/data.json", true);
    xmlhttp.onreadystatechange = function(){
        //carga la lista
        console.log(xmlhttp.responseText);
        canciones = JSON.parse(xmlhttp.responseText);
        console.log(canciones);
    }
    xmlhttp.send();
}

function removerCancion(indice){
    if(indice>-1 && indice<canciones.length){
        canciones.split(indice,1);
        mostrarCanciones();
    }
}

function agregarCancion(tit,art,y,url){
    var cancion = {title:tit, artist:art, year:y,web_url:url,image_url:""};
    canciones.push(cancion);
    mostrarCanciones();
}

function agregarCancionLista(indice){
    listas[actual].canciones.push(canciones[indice]);
    mostrarListas();
}

function removerCancionLista(indice){
    listas[actual].canciones.splice(indice,1);
    mostrarListas();

}

function agregarLista(nom){
    var lista = {nombre:nom,canciones:[]};
    listas.push(lista);
    mostrarListas();
}

function eliminarLista(indice){
    if(indice>-1 && indice<listas.length){
        listas.splice(indice,1);
        mostrarListas();
    }
}

function mostrarListas(){

}

function mostrarCanciones(){

}
