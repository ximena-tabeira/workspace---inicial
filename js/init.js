
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const URL_INFO = "https://japceibal.github.io/emercado-api/products/50743.json";
let nombreUsuario = localStorage.getItem("dato");
let HTML = "";
let products = "";
let carritoProductos = {};
let urlInfo = ""
let IDproduct = localStorage.getItem("idProducto")
let carritoLocal = localStorage.getItem("carrito")
let contentsArticle = document.getElementById("items-buy");

/*esta función la coloqué aquí porque estaba probando hacer el desafío de agregar el producto
 al presionar el botón de comprar */
function obtenerIDinfo() {
  urlInfo = `https://japceibal.github.io/emercado-api/products/${IDproduct}.json`
};

function redirigir() {
  window.location = "cart.html"
}

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

/*le coloqué a todos los html en donde debe estar el desplegable 
un id, y en el correspondiente muestro el nombre del usuario*/
function mostrarDato() {
  
  document.getElementById("usuario").innerHTML = nombreUsuario;
}
//creo la función para eliminar todos los datos del usuario del local storage
function borrarDato() {
  localStorage.removeItem("dato");
  localStorage.removeItem("nombre");
  localStorage.removeItem("nombre2");
  localStorage.removeItem("apellido");
  localStorage.removeItem("apellido2");
  localStorage.removeItem("telContacto");
}
//creo la función de cerrar sesión, que al presionar el botón de cerrar sesión elimine el usuario de local storage y redirija a index.html
function cerrarSesion() {
  HTML += `<a onclick="borrarDato()" class="dropdown-item" href="index.html">Cerrar sesión</a>`
  document.getElementById("cerrar-sesion").innerHTML = HTML;
}
//función para que le aparezca la opción de ver el perfil solo al usuario que esté logueado
function RedirigirAlUsuarioLogueado() {
  let miperfil = document.getElementById("mi-perfil");
  if (nombreUsuario == undefined) {
    miperfil.classList.remove("d-block")
    miperfil.classList.add("d-none")
  } else {
    miperfil.classList.remove("d-none")
    miperfil.classList.add("d-block")
  }
}



document.addEventListener("DOMContentLoaded", function(){ 
 
  mostrarDato();
  cerrarSesion();
  RedirigirAlUsuarioLogueado()

})


