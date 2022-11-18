let infoProducto = "";
let urlComments = "";
let comments = [];
let contenidoHTML2 = "";
let ID3 = localStorage.getItem("catID");
let urlproducts = "";
let arrayProducts = [];

function obtenerIDproducts() {
    urlproducts = `https://japceibal.github.io/emercado-api/cats_products/${ID3}.json`;
};

function obtenerIDcomments() {
    urlComments = `https://japceibal.github.io/emercado-api/products_comments/${IDproduct}.json`
}

function setID(id) {
    localStorage.idProducto = id;
    window.location = "product-info.html"
}
//creo la función para msotrar los productos relacionados
function showProductsRelated(array) {
    let contenidoHTML = "";
    for (let i = 0; i < array.length; i++) {
        let categoria = array[i];
        //realizo un if porque el carousel tenía en el primer div una clase diferente
        //agrego onclick para que al dar click a un producto llame la función setID y redirija a ese producto
        if (i == 0) {
            contenidoHTML += `<div onclick="setID(${categoria.id})" class="carousel-item active">
                <img src="${categoria.image}" class="d-block w-100" >
                <h2>${categoria.name}</h2>
              </div>`
        } else {
            contenidoHTML += `<div onclick="setID(${categoria.id})" class="carousel-item">
            <img src="${categoria.image}" class="d-block w-100" >
            <h2>${categoria.name}</h2>
          </div>`}

        document.getElementById("carousel").innerHTML = contenidoHTML;
    }
}
/*Función para mostrar la información de los productos con sus respectivas imágenes las cuales
al estar en un array las recorro con un for para poder mostrarlas*/
function showInfoProducts(object) {
    let imagenes = "";
    for (let i = 0; i < object.images.length; i++) {
        let imagen = object.images[i];
        imagenes += `<figure><img class="img-producto" hspace="10" align="left" src="${imagen}"></img></figure>`;
    }
    let htmlContentToAppend = "";

    htmlContentToAppend = `<h1>${object.name}</h1><p align="right"><button type="button" class="btn btn-success" onclick="redirigir()" >Comprar</button></p>
            <hr>
            <h2>Precio</h2><p>${object.currency} ${object.cost}</p><br>
            <h2>Descripción</h2><p>${object.description}</p><br>
            <h2>Categoría</h2><p>${object.category}</p><br>
            <h2>Cantidad de vendidos</h2><p>${object.soldCount}</p><br>
            <h2>Imágenes ilustrativas</h2><div>${imagenes}</div>
            <br><br><br><br><br><br><br><br><br>
            <h1>Comentarios</h1><hr>`

    document.getElementById("info-producto").innerHTML = htmlContentToAppend;
    
}
/*Función para mostrar cada comentario*/
function showComments(array) {
    let cantEstrellas = "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
//según el número que tenga en score, será la cantidad de estrellas que muestra en el comentario
        if (comment.score == 1) {
            cantEstrellas = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (comment.score == 2) {
            cantEstrellas = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (comment.score == 3) {
            cantEstrellas = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`
        } else if (comment.score == 4) {
            cantEstrellas = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`
        } else if (comment.score == 5) {
            cantEstrellas = `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`
        }

        contenidoHTML2 += `
        <h3>${comment.user}</h3>
        <p>${comment.dateTime}
        ${cantEstrellas}</p>
        <p>${comment.description}</p>
        `
        document.getElementById("info-comentarios").innerHTML = contenidoHTML2;
    }
};

document.addEventListener("DOMContentLoaded", function () {

    obtenerIDinfo();
    obtenerIDcomments()
    obtenerIDproducts()

    getJSONData(urlInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProducto = resultObj.data;
            showInfoProducts(infoProducto);
        }
    });

    getJSONData(urlComments).then(function (resultObj) {

        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments(comments);
        }
    });

    getJSONData(urlInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayProducts = resultObj.data.relatedProducts;
            showProductsRelated(arrayProducts)
        }
    });
});