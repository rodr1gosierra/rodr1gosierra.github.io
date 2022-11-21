const email = document.getElementById("email");
const password = document.getElementById("password");
const alerta = document.getElementById("alert-error");

document.getElementById("ingresar").addEventListener("click", function () {
    irAPortada();
});

//Validar datos y guarda el usuario//
function irAPortada(){
    if (email.value != "" && password.value != ""){
        window.location.href = "portada.html";
        localStorage.setItem("username", email.value);
    } else {
        alerta.classList.add("show");
        setTimeout(function () { alerta.classList.remove("show") }, 2000);
    };
};

