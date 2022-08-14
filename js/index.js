const email = document.getElementById("email")
const password = document.getElementById("password")

document.getElementById("ingresar").addEventListener("click", irAPortada)


function irAPortada(){
    if (email.value.length > 0 && password.value.length > 0){
        window.location.href = "portada.html";
    } else {
        alert("Debes ingresar los datos")
    }
}