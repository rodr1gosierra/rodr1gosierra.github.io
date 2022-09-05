const email = document.getElementById("email")
const password = document.getElementById("password")

document.getElementById("ingresar").addEventListener("click", function () {
    irAPortada();
    guardarUsuario();

})


function irAPortada(){
    if (email.value.length > 0 && password.value.length > 0){
        window.location.href = "portada.html";
    } else {
        alert("Debes ingresar los datos")
    }
}

function guardarUsuario(){
    if (email.value.length > 0){
        localStorage.setItem("username", email.value)
    }
}