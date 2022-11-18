let htmlContentToAppend1 = ""
let form = document.getElementById("form")
let formulario = document.querySelector('#form')
let datosDelUsuario = localStorage.getItem("datosUsuario")

/*Función para mostrar el formulario y que si hay datos en el local storage los muestr en los input, así, 
si ya antes ha iniciado sesion y ha guardado los datos le aparecerá los datos en el perfil*/
function FormPerfil() {
  let nombre = localStorage.getItem("nombre")
  let nombre2 = localStorage.getItem("nombre2")
  let apellido = localStorage.getItem("apellido")
  let apellido2 = localStorage.getItem("apellido2")
  let telefono = localStorage.getItem("telContacto")

  htmlContentToAppend1 = `
    <div class="col-md-6">
        <label for="name" class="form-label">Primer nombre*</label>
        <input type="text" class="form-control" id="name" value="" required>
        <div class="invalid-feedback">
        Debe ingresar su primer nombre
        </div>
    </div>
    <div class="col-md-6">
        <label for="name2" class="form-label">Segundo Nombre</label>
        <input type="text" class="form-control" id="name2" value="">
    </div>
    <div class="col-md-6">
        <label for="apellido" class="form-label">Primer apellido*</label>
        <input type="text" class="form-control" id="apellido" value="" required>
        <div class="invalid-feedback">
        Debe ingresar su primer apellido
        </div>
    </div>
    <div class="col-md-6">
        <label for="apellido2" class="form-label">Segundo apellido</label>
        <input type="text" class="form-control" id="apellido2" value="">
    </div>
    <div class="col-md-6">
        <label for="email" class="form-label">Email*</label>
        <input type="email" class="form-control" id="email" value="${nombreUsuario}" required>
        <div class="invalid-feedback">
        Debe ingresar un email
        </div>
    </div>
    <div class="col-md-6">
        <label for="tel-contacto" class="form-label">Teléfono de contacto</label>
        <input type="number" class="form-control" id="tel-contacto" value="">
    </div>
    <br><br><br><br><br><br><br><br>
    <hr>
    <div class="col-12">
        <button class="btn btn-primary" type="submit">Guardar cambios</button>
    </div>
  `
  form.innerHTML = htmlContentToAppend1
  if (nombre != null) {
    document.getElementById("name").value = nombre
  }
  if (nombre2 != null) {
    document.getElementById("name2").value = nombre2
  }
  if (apellido != null) {
    document.getElementById("apellido").value = apellido
  }
  if (apellido2 != null) {
    document.getElementById("apellido2").value = apellido2
  }
  if (telefono != null) {
    document.getElementById("tel-contacto").value = telefono
  }
}
/*Función para fuardar los datos del formulario en el localStorage */
function GuardarDatos() {
  let primerNombre = document.getElementById("name")
  let segundoNombre = document.getElementById("name2")
  let primerApellido = document.getElementById("apellido")
  let segundoApellido = document.getElementById("apellido2")
  let email = document.getElementById("email")
  let telContacto = document.getElementById("tel-contacto")

  localStorage.nombre = primerNombre.value
  localStorage.nombre2 = segundoNombre.value
  localStorage.apellido = primerApellido.value
  localStorage.apellido2 = segundoApellido.value
  localStorage.telContacto = telContacto.value

  localStorage.removeItem("dato")
  localStorage.dato = email.value

}
/*Función para validar el formulario y guardar los datos si todo está correcto */
function ValidacionForm() {
  formulario.addEventListener('submit', function (event) {
    if (!formulario.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else if (formulario.checkValidity()) {
      GuardarDatos()
    }

    formulario.classList.add('was-validated')

  })
}

document.addEventListener("DOMContentLoaded", function () {
  FormPerfil()
  ValidacionForm()
}

)