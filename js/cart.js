let contentsForm = document.getElementById("form-sending");
let costos = document.getElementById("costos");
let htmlContentToAppend1 = "";
let htmlContentToAppend2 = "";
let arrayArticles = [];
let urlCartInfo = "";
let IdUser = "";
let total = "";
let total1 = "";
let sub = document.getElementById("subtotal")
let costoSub = document.getElementById("costoSub")
let resultado = ""
let resultado2 = ""
let resultado3 = ""
let valorSub = ""
let valorCostoEnvio = ""
let FormaDePagohtml = document.getElementById("forma-pago")
let form = document.querySelector('.needs-validation')

function setIDuser(dato) {
  localStorage.IDuser = dato;
}
function getIDuser() {
  IdUser = localStorage.getItem("IDuser")
  urlCartInfo = `https://japceibal.github.io/emercado-api/user_cart/${IdUser}.json`
}
/*Le hice algunos cambios a la función de multiplicar para que me haga algunos cambios en tiempo real*/
function multiplicar(precio) {

  total = document.getElementById("cantidad").value
  document.getElementById("subtotal").innerHTML = total * precio
  document.getElementById("costoSub").innerHTML = "USD" + " " + total * precio
  resultado = total * precio
  SumaTotal()
  SeleccionTipoEnvio()
}

function showArticles(array) {

  htmlContentToAppend1 = `
  <tr>
  <th></th>
  <th>Nombre</th>
  <th>Costo</th>
  <th>Cantidad</th>
  <th>Subtotal</th>
</tr>`
  for (let i = 0; i < array.length; i++) {

    let article = array[i];
    //en el oinput agrego la función de ValidacionCantidad() para que cada vez que cambie la cantidad, esta se valide en tiempo real
    htmlContentToAppend2 = `
    <tr>
    <td><img src="${article.image}" width="60" height="40"></td>
    <td>${article.name}</td>
    <td>${article.currency} ${article.unitCost}</td>
    <td>
      
    <input  id="cantidad" type="number"  style="width : 50px; height : 35px;" oninput="multiplicar(${article.unitCost}), ValidacionCantidad()" value="" required>
    <spam id="validCantidad" class="invalid-feedback">
      Debe ingresar un número mayor a 0
    </spam>
    
    </td>
    <td class="font-weight-bold"><strong>${article.currency} <span id="subtotal"></span></strong></td>
  </tr>`


    contentsArticle.innerHTML += htmlContentToAppend1;
    contentsArticle.innerHTML += htmlContentToAppend2;

  }
}

function showControlsSending() {
  let htmlContentToAppend = "";
  htmlContentToAppend += ` 
<hr>
<h3>Tipo de envío</h3>

<div class="btn-group-vertical">
  <div>
    <input  id="premium" name="tipo-envio" type="radio" required />
    <label for="premium">Premium de 2 a 5 días (15%)</label>
   
  </div>
  <div>
    <input  id="express" name="tipo-envio" type="radio" required />
    <label for="express">Express de 5 a 8 días (7%)</label>
   
  </div>
  <div>
    <input id="standard" name="tipo-envio" type="radio" required />
    <label for="standard">Standard de 12 a 15 días (5%)</label>
    <div class="invalid-feedback">
    Debe seleccionar un tipo de envío
    </div>
  </div>
  <br>
</div>
<h3>Dirección de envío</h3>
<br>
  <div class="row ">
    <div class="col-md-2 col-xs-6">
      <label  for="calle">Calle:</label>
      <input class="form-control" style="width : 400px; height : 35px; " id="calle" type="text" required>
      <div class="invalid-feedback">
      Ingresa una calle
      </div>
    </div>
    
    <div class="col-md-2 col-xs-6" style="margin-left: 5.5cm; ">
      <label  for="numero">Número:</label>
      <input class="form-control" id="numero" type="number" required>
      <div class="invalid-feedback">
      Ingresa un número
      </div>
    </div>
  </div>
  <br>
  <div class="col-md-2 col-xs-6">
    <label for="esquina">Esquina:</label>
    <input class="form-control" style="width : 400px; height : 35px" id="esquina" type="text" required>
    <div class="invalid-feedback">
      Ingresa una esquina
    </div>
  </div>

<br><hr><br>`

  contentsForm.innerHTML = htmlContentToAppend;
};

//Función para mostrar la tabla de todos los costos
function Costos() {
  let htmlContentToAppend = "";


  htmlContentToAppend = `<h3>Costos</h3>
  <table class="table table-bordered">
    <tbody>
      <tr>
        <td>
          <p id="costoSub" class="text-muted float-end"></p>
          <h6>Subtotal</h6>
         <small class="text-muted">Costo unitario del producto por cantidad</small>
        </td>
      </tr>
      <tr>
        <td>
          <p id="costo-envío" class="text-muted float-end"></p> 
          <h6>Costo de envío</h6>
          <small class="text-muted">Según el tipo de envío</small>
        </td>
      </tr>
      <tr>
        <td>
          <strong><small id="total-final" class="float-end"></small></strong>
          <h6>Total ($)</h6>
        </td>
      </tr>
    </tbody>
  </table><br><hr><br>`

  costos.innerHTML += htmlContentToAppend
}

/*función para calcular el costo de envío, el número que recibe como parámetro lo multiplica por el resultado (variable creada para guardar el subtotal cada vez que camnbie) y 
lo divie entre 100 y lo guarda en una variable para utilizarla después
*/
function MultiplicacionEnvio(number) {

  document.getElementById("costo-envío").innerHTML = "USD" + " " + resultado * number / 100
  resultado2 = resultado * number / 100
}

/*Función para tomar cada botón de radio y que cuando cada uno se presione haga el cálculo del costo del envío y cambie la suma total en tiempo real
y también que cada vez que la cantidad de productos cambien, todos los resultados cambien en tiempo real, la cual toma dos funciones
SumaTotal()
 MultiplicacionEnvio(number) */
function SeleccionTipoEnvio() {
  let radio1 = document.querySelector('input[type=radio][id="premium"]');
  let radio2 = document.querySelector('input[type=radio][id="express"]')
  let radio3 = document.querySelector('input[type=radio][id="standard"]')
  let cantidad = document.querySelector('input[id="cantidad"]')
  radio1.addEventListener('change', function () {
    MultiplicacionEnvio(15)
    SumaTotal()
  }
  );
  radio2.addEventListener('change', function () {
    MultiplicacionEnvio(7)
    SumaTotal()
  })
  radio3.addEventListener('change', function () {
    MultiplicacionEnvio(5)
    SumaTotal()
  })
  cantidad.addEventListener('change', function () {
    if (radio1.checked) {
      MultiplicacionEnvio(15)
      SumaTotal()
    } else if(radio2.checked){
      MultiplicacionEnvio(7)
      SumaTotal()
    }else if (radio3.checked) {
      MultiplicacionEnvio(5)
      SumaTotal()
    }
  }
  
  
  );

}

/*Función para que sume el costo de envío más el costo del producto y aparezca en el total de la compra*/
function SumaTotal() {

  document.getElementById("total-final").innerHTML = "USD" + " " + (resultado + resultado2)
  resultado3 = resultado + resultado2

}

/*Función para agregar al html la forma de pago y el modal*/
function FormaDePago() {
  let htmlContentToAppend = "";
  htmlContentToAppend = `<h3>Forma de pago</h3><br>
 
<div class="d-flex flex-row bd-highlight mb-3">

<p id="seleccion" class="text-muted p-2 bd-highlight">No ha seleccionado</p><p class="p-2 bd-highlight">
    <a id="btnSeleccionar" class="link" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Seleccionar
    </a> 
  </p>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Forma de pago</h1>
            <button id="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div class="modal-body">
             
                <div class="form-check">
                <input type="radio" class="form-check-input" id="Tcredito" name="radio-stacked" form="formulario" onclick="AdvertenciaFormaDePago()" required/>
                <label id="TcreditoLabel" class="form-check-label" for="Tcredito">Tarjeta de crédito</label><hr>
                </div>
                <div class="col-md-4">
                  <label for="nTarjeta" class="form-label">Número de tarjeta</label>
                  <input type="number" class="form-control" id="nTarjeta" required>
                  <div class="invalid-feedback">
                    Debe ingresar un número
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="cvv" class="form-label">Código de seg.</label>
                  <input type="number" class="form-control" id="cvv" required>
                  <div class="invalid-feedback">
                    Debe ingresar un número
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="vencimiento" class="form-label">Vencimiento (MM/AA)</label>
                  <input type="number" class="form-control" id="vencimiento" required>
                  <div class="invalid-feedback">
                    Debe ingresar la fecha de vencimiento
                  </div>
                </div>
                <br>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="Tbancaria" name="radio-stacked" form="formulario" onclick="AdvertenciaFormaDePago()" required/>
                  <label id="TbancariaLabel" class="form-check-label" for="Tbancaria">Transferencia bancaria</label>
                </div>
                <hr>
                <div class="col-md-6">
                  <label for="nCuenta" class="form-label">Número de cuenta</label>
                  <input type="number" class="form-control" id="nCuenta" required>
                  <div class="invalid-feedback">
                    Debe ingresar un número
                  </div>
                </div>
                <hr>
              
             
            </div>
              <div class="modal-footer">
                <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-primary" onclick="guardarSeleccionDePago()">Cerrar</button>
              </div>
        </div>
      </div>
    </div>
    
</div>

<span class="invalid-feedback" id="formaPago">
Debe seleccionar una forma de pago.
</span>
 
<br>
<br>

<div class="d-grid gap-2">
  <button  class="btn btn-primary" type="submit" id="btnFinalizar">Finalizar compra</button>
</div>
`
  FormaDePagohtml.innerHTML = htmlContentToAppend
}

/*Función para que al seleccionar Tarjeta de crédito o transferencia bancaria se bloqueen los otros campos*/
function SeleccionFdePago() {
  let tarjetaCredito = document.getElementById("Tcredito");
  let numeroTarjeta = document.getElementById("nTarjeta");
  let codigoSeguridad = document.getElementById("cvv");
  let vencimiento = document.getElementById("vencimiento");
  let transferencia = document.getElementById("Tbancaria");
  let numeroCuenta = document.getElementById("nCuenta");


  tarjetaCredito.addEventListener("click", function () {
    numeroCuenta.disabled = true
    numeroTarjeta.disabled = false
    codigoSeguridad.disabled = false
    vencimiento.disabled = false

  })

  transferencia.addEventListener("click", function name() {
    numeroCuenta.disabled = false
    numeroTarjeta.disabled = true
    codigoSeguridad.disabled = true
    vencimiento.disabled = true

  })

}
/*Función para que cada vez que seleccione un método de pago y le dé al botón de cerrar aparezcaen pantalla, fuera del modal cual fue la opción seleccionada*/
function guardarSeleccionDePago() {

 if ( document.getElementById("Tcredito").checked) {
  document.getElementById("seleccion").innerHTML = "Tarjeta de crédito"
 } else if (document.getElementById("Tbancaria").checked) {
  document.getElementById("seleccion").innerHTML = "Transferencia bancaria"
 } else {
  document.getElementById("seleccion").innerHTML = "No ha seleccionado"
 }

}

/*Función que al escuchar el botón de finalizar compra se alerte que la compra fue exitosa en caso de que todo esté bien validado
y en caso de que no, aparezca lo que hay que completar*/
function FinalizarCompra() {
 
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          ValidacionCantidad()
          AdvertenciaFormaDePago()
          event.preventDefault()
          event.stopPropagation()
      
        } else if(form.checkValidity()){
          alert("¡Ha comprado con éxito!")
        }
          
        form.classList.add('was-validated')
       
      })
     
};

/*Funcion para que la validación de las formas de pago aparezcan por fuera del modal*/
function AdvertenciaFormaDePago() {
  let inputTcredito = document.getElementById("Tcredito")
  let inputTbancaria = document.getElementById("Tbancaria")
  let labelTcredito = document.getElementById("TcreditoLabel")
  let labelTbancaria = document.getElementById("TbancariaLabel")
  let formaPago = document.getElementById("formaPago")
 
  
  if (!inputTcredito.checked && !inputTbancaria.checked) {
    inputTcredito.classList.add("is-invalid")
    inputTbancaria.classList.add("is-invalid")
    labelTcredito.classList.add("is-invalid")
    labelTbancaria.classList.add("is-invalid")
  } else if (inputTcredito.checked || inputTbancaria.checked){
    inputTcredito.classList.remove("is-invalid")
    inputTbancaria.classList.remove("is-invalid")
    labelTcredito.classList.remove("is-invalid")
    labelTbancaria.classList.remove("is-invalid")
    inputTcredito.classList.add("is-valid");
    inputTbancaria.classList.add("is-valid");
    labelTcredito.classList.add("is-valid");
    labelTbancaria.classList.add("is-valid");
  }

  if (!inputTcredito.validity.valid && !inputTbancaria.validity.valid) {
    formaPago.classList.add("d-block")
   
  } else if(inputTcredito.validity.valid || inputTbancaria.validity.valid){
    formaPago.classList.remove("d-block")
    
  }

}

/*Función para que valide el input de la cantidad de los productos cuando sea mayor a 0*/
function ValidacionCantidad() {
  let inputCant = document.getElementById("cantidad")
  let spam = document.getElementById("validCantidad")

  if (!inputCant.validity.valid || inputCant.value <= 0) {
    inputCant.classList.remove("is-valid")
    inputCant.classList.add("is-invalid")
    spam.classList.remove("is-valid")
    spam.classList.add("is-invalid")
    spam.classList.remove("d-none")
    spam.classList.add("d-block")
  } else if(inputCant.validity.valid && inputCant.value > 0){
    inputCant.classList.remove("is-invalid")
    spam.classList.remove("is-invalid")
    spam.classList.remove("d-block")
    spam.classList.add("d-none")
  } 
 
}

document.addEventListener("DOMContentLoaded", function () {
  obtenerIDinfo()
  showControlsSending();
  setIDuser(25801)
  getIDuser()
  getJSONData(urlCartInfo).then(function (resultObj) {
    if (resultObj.status === "ok") {

      arrayArticles = resultObj.data.articles;
      showArticles(arrayArticles);
      Costos()
      FormaDePago()

    }
    SeleccionFdePago()
    FinalizarCompra()
  });


});