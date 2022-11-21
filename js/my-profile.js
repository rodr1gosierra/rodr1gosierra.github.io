const alerta = document.getElementById("alert-success");

document.addEventListener("DOMContentLoaded", function () {
    
    let myprofile = document.getElementById("myprofile");

    profileContent = 
    `
    <div class="row">
        <div class="row">
            <div class="col-9 mt-3 py-4">
                <h1>Perfil</h1>          
            </div>
            <div class="col-3 mt-3 mb-2">
                <img src="img/img_perfil.png" alt="Imagen de perfil" height="100"> 
            </div>
            </div>
            <hr>
        <div class="row">
            <div class="col-md-6 mb-2">
                <label for="primerNombre">Primer nombre *</label>
                <input type="text" class="form-control" id="primerNombre">
                <div class="invalid-feedback">
                    Debe ingresar el primer nombre
                </div>
            </div>
            <div class="col-md-6 mb-2">
                <label for="segundoNombre">Segundo nombre</label>
                <input type="text" class="form-control" id="segundoNombre">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-2">
                <label for="primerApellido">Primer apellido *</label>
                <input type="text" class="form-control" id="primerApellido">
                <div class="invalid-feedback">
                    Debe ingresar el primer apellido
                </div>
            </div>
            <div class="col-md-6 mb-2">
                <label for="segundoApellido">Segundo apellido</label>
                <input type="text" class="form-control" id="segundoApellido">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-2">
                <label for="imagen">Imagen de perfil</label>
                <input type="file" accept="image/*" class="form-control" id="imagen">
            </div>
            <div class="col-md-6 mb-2">
                <label for="e-mail">Email *</label>
                <input type="text" class="form-control" id="e-mail" value="${localStorage.getItem("username")}">
                <div class="invalid-feedback">
                    Debe ingresar el email
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-2">
                <label for="telefono">Teléfono de contacto *</label>
                <input type="text" class="form-control" id="telefono">
                <div class="invalid-feedback">
                    Debe ingresar el teléfono de contacto
                </div>
            </div>
        </div>
        <hr class="mt-2">
        <div class="col-md-4 mb-2">
            <p class="text-muted">*Campos obligatorios</p>
            <button type="button" class="btn btn-primary" id="btnGuardar">Guardar cambios</button>  
        </div>
    </div>
    `
    myprofile.innerHTML = profileContent;

    llenarDatosPerfil();

    document.getElementById("btnGuardar").addEventListener("click", function () {
        validarYguardar();
        alerta.classList.add("show");
        setTimeout(function () { alerta.classList.remove("show") }, 2000);
    });
});

function validarYguardar() {

    let nombre = document.getElementById("primerNombre");
    let segundoNombre = document.getElementById("segundoNombre");
    let apellido = document.getElementById("primerApellido");
    let segundoApellido = document.getElementById("segundoApellido");
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("e-mail");

    //Validaciones//
    if (nombre.value == "") {
        nombre.classList.add("is-invalid");
        nombre.classList.add("d-inline");
        nombre.addEventListener("input", function () {
            if (nombre.value == "") {
                nombre.classList.add("is-invalid");
                nombre.classList.add("d-inline"); 
            } else {
                nombre.classList.remove("is-invalid");
                nombre.classList.remove("d-inline");
            };
        });
    };

    if (apellido.value == "") {
        apellido.classList.add("is-invalid");
        apellido.classList.add("d-inline");
        apellido.addEventListener("input", function () {
            if (apellido.value == "") {
                apellido.classList.add("is-invalid");
                apellido.classList.add("d-inline"); 
            } else {
                apellido.classList.remove("is-invalid");
                apellido.classList.remove("d-inline");
            };
        });
    };

    if (telefono.value == "") {
        telefono.classList.add("is-invalid");
        telefono.classList.add("d-inline");
        telefono.addEventListener("input", function () {
            if (telefono.value == "") {
                telefono.classList.add("is-invalid");
                telefono.classList.add("d-inline"); 
            } else {
                telefono.classList.remove("is-invalid");
                telefono.classList.remove("d-inline");
            };
        });
    };

    if (email.value == "") {
        email.classList.add("is-invalid");
        email.classList.add("d-inline");
        email.addEventListener("input", function () {
            if (email.value == "") {
                email.classList.add("is-invalid");
                email.classList.add("d-inline");
            } else {
                email.classList.remove("is-invalid");
                email.classList.remove("d-inline");
            };
        });
    };

    //Crear y modificar perfiles//
    if (nombre.value != "" && apellido.value != "" && telefono.value != "" && email.value != "") {
    //Todo sucede al darle click a Guardar cambios//

        let usuario = localStorage.getItem("username");
        localStorage.setItem("username", email.value);
    
        let perfiles = JSON.parse(localStorage.getItem("perfiles")) || [];

        let perfil_nuevo = {
            nombre: nombre.value,
            segundoNombre: segundoNombre.value,
            apellido: apellido.value,
            segundoApellido: segundoApellido.value,
            email: email.value,
            telefono: telefono.value
        };

        let encontro_perfil = perfiles.find((perfil, i) => {
            if ((perfil.email === usuario) || (perfil.email === email.value)) {
                perfiles[i] = perfil_nuevo;
                return true;
            };
        });

        if (!encontro_perfil) {

            perfiles.push(perfil_nuevo);
        };

        localStorage.setItem("perfiles", JSON.stringify(perfiles));
    };
};

//Función que carga los datos del perfil si ya está creado//
function llenarDatosPerfil() {
    if (localStorage.getItem("perfiles")) {
        perfiles_json = localStorage.getItem("perfiles");
        perfiles = JSON.parse(perfiles_json);
        
        let usuario = localStorage.getItem("username");

        //Busco username actual en perfiles//
        let perfil_actual = perfiles.find(perfil => perfil.email === usuario);

        if (perfil_actual) {
            document.getElementById("primerNombre").value = perfil_actual.nombre;
            document.getElementById("segundoNombre").value = perfil_actual.segundoNombre;
            document.getElementById("primerApellido").value = perfil_actual.apellido;
            document.getElementById("segundoApellido").value = perfil_actual.segundoApellido;
            document.getElementById("telefono").value = perfil_actual.telefono;
        };
    };
};




