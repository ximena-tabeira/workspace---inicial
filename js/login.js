//función para gurdar el usuario en el local storage
function guardarDato() {
   let campo1 = document.getElementById("c1").value
   localStorage.dato = campo1;
   }

/*función para validar bien los campos de contraseña y usuario, si algo no está 
correctamente escrito o si los campos están vacíos mostrará un alert, sino va a 
redirigir y guardar el usuario en el localStorage */
function Validacion() {
   let form = document.querySelector("#formulario")
   
   form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        alert("Debes completar todos los campos")
      } else {
         guardarDato() 
      }
         
      form.classList.add('was-validated')
      
    })
}

document.addEventListener("DOMContentLoaded", function(){

   Validacion()

})