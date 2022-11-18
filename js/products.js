
const PRECIO_ASC = "↑$";
const PRECIO_DESC = "↓$"
const VENDIDOS_DESC = "↓vendidos";

let listaActualProductos = [];
let criterioOrdenActual = undefined;
let minPrecio = undefined;
let maxPrecio = undefined;
let contenidoParrafo = "Verás aquí todos los productos de la categoría"
let url = "";

/*Función para obtener el ID de cada categoría de productos y así mostrar el producto seleccionado */
function obtenerID() {
  let ID = localStorage.getItem("catID");
  url = `https://japceibal.github.io/emercado-api/cats_products/${ID}.json`;

};
/*función para filtrar los productos según el costo y ordenarlos según la cantidad de vendidos*/
function ordenarProductos(criterio, array) {
  let result = [];
  if (criterio === PRECIO_ASC) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });

  } else if (criterio === PRECIO_DESC) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });

  } else if (criterio === VENDIDOS_DESC) {
    result = array.sort(function (a, b) {
      let aSCount = parseInt(a.soldCount);
      let bSCount = parseInt(b.soldCount);

      if (aSCount > bSCount) { return -1; }
      if (aSCount < bSCount) { return 1; }
      return 0;
    });
  }
  return result;
}
/*Función que recorre la lista de predocutos que tiene cada categoría*/
function mostrarListaProductos(lista) {
  let contenidoHTML = "";
  for (let i = 0; i < lista.length; i++) {
    let producto = lista[i];

    if (!(parseInt(producto.cost) < minPrecio) && !(parseInt(producto.cost) > maxPrecio)) {
      //agrego onclick para que al dar click a un producto llame la función setID
      contenidoHTML += `
          <div onclick="setID(${producto.id})" class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col-3">
                      <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <div class="mb-1">
                          <h4>`+ producto.name + " " + "-" + " " + producto.currency + " " + producto.cost + `</h4> 
                          <p> `+ producto.description + `</p> 
                          </div>
                          <small class="text-muted">` + producto.soldCount + ` vendidos</small> 
                      </div>
  
                  </div>
              </div>
          </div>
          `
    }
    document.getElementById("cat-list-container").innerHTML = contenidoHTML;
  }
}
/*función para ordenar la lista de productos según el criterio de orden que se le pase por parámetro
y mostrar la lista de productos que se acople a ese criterio*/
function ordenarYmostrarProductos(criteriodeOrden, listaProductos) {
  ordenarProductos(criteriodeOrden, listaProductos);
  mostrarListaProductos(listaProductos);
}

//función para guardar el id de cada producto y redirigir a la información del producto
function setID(id) {
  localStorage.idProducto = id;
  window.location = "product-info.html"

}

document.addEventListener("DOMContentLoaded", function (e) {

  obtenerID();
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {

      listaActualProductos = resultObj.data.products;
      mostrarListaProductos(listaActualProductos)

      document.getElementById("name-cat").innerHTML = contenidoParrafo + " " + resultObj.data.catName;
    }

  });
  document.getElementById("precioAsc").addEventListener("click", function () {
    ordenarYmostrarProductos(PRECIO_ASC, listaActualProductos);
  });

  document.getElementById("precioDesc").addEventListener("click", function () {
    ordenarYmostrarProductos(PRECIO_DESC, listaActualProductos);
  });

  document.getElementById("vendidosDesc").addEventListener("click", function () {
    ordenarYmostrarProductos(VENDIDOS_DESC, listaActualProductos);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterPrecioMin").value = "";
    document.getElementById("rangeFilterPrecioMax").value = "";

    minPrecio = undefined;
    maxPrecio = undefined;

    mostrarListaProductos(listaActualProductos);
  });
  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    
    minPrecio = document.getElementById("rangeFilterPrecioMin").value;
    maxPrecio = document.getElementById("rangeFilterPrecioMax").value;

    if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0) {
      minPrecio = parseInt(minPrecio);
    }
    else {
      minPrecio = undefined;
    }

    if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0) {
      maxPrecio = parseInt(maxPrecio);
    }
    else {
      maxPrecio = undefined;
    }

    mostrarListaProductos(listaActualProductos);
  });


})
