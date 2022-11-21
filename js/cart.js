let USER_ID = "25801";
let usuario = localStorage.getItem("username");
let currentCartUser = [];
const CART_USER = CART_INFO_URL + USER_ID + EXT_TYPE;
let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD ";
let quantity = 1;
let valorunidad = 0;
let comissionPercentage;
let PERCENTAGE_SYMBOL = '%';
let validar = false;
const alerta = document.getElementById("alert-success");
//-----------------------------------------------------------------------------------------------------------//

//Función que envía el formulario
function enviarFormulario() {
  
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      validacionModal();
      if ((!validar) || (quantity < 1) || !form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        alerta.classList.add("show");
        setTimeout(function () { alerta.classList.remove("show") }, 2000);
      }
      
      form.classList.add('was-validated');
    }, false);
  });
})();

};

//-----------------------------------------------------------------------------------------------------------//

//Función que actualiza los costos//
function updateCostos() {

  let premium = document.getElementById("premiumRadio");
  let express = document.getElementById("expressRadio");
  let standard = document.getElementById("standardRadio");

  let subtotal = document.getElementById("subt");
  let productCostText = document.getElementById("productCostText");
  let comissionCostHTML = document.getElementById("comissionText");
  let totalCostText = document.getElementById("totalCostText");

  let subtotalToShow = MONEY_SYMBOL + " " + (valorunidad * quantity)
  let productCostToShow = DOLLAR_SYMBOL + " " + (valorunidad * quantity)
  let comissionToShow;
  let totalCostToShow;

  if (premium.checked || express.checked || standard.checked) {
    comissionToShow = DOLLAR_SYMBOL + Math.round(((valorunidad * quantity) * comissionPercentage));
  } else {
    comissionToShow = "-"
  }

  if (comissionToShow != "-") {
    totalCostToShow = DOLLAR_SYMBOL + ((valorunidad * quantity) + Math.round(((valorunidad * quantity) * comissionPercentage)));
  } else {
    totalCostToShow = DOLLAR_SYMBOL + (valorunidad * quantity);
  }
  
  subtotal.innerHTML = subtotalToShow;
  productCostText.innerHTML = productCostToShow;
  comissionCostHTML.innerHTML = comissionToShow;
  totalCostText.innerHTML = totalCostToShow;
}

//------------------------------------------------------------------------------------------------------------//

//Función para los radios del modal//
function radiosModal() {

  let tarjetaCredito = document.getElementById("tarjetaCredito");
  let tarjetaNumero = document.getElementById("tarjetaNumero");
  let tarjetaCodigo = document.getElementById("tarjetaCodigo");
  let tarjetaVencimiento = document.getElementById("tarjetaVencimiento");
  let transferencia = document.getElementById("transferencia");
  let transferenciaNumero = document.getElementById("transferenciaNumero");
  let noHaSeleccionado = document.getElementById("noHaSeleccionado");
  let feedbackNoHaSeleccionado = document.getElementById("noHaSeleccionadoFeedback");
  let feedbackDatosPago = document.getElementById("datosPagoFeedback");

  if (tarjetaCredito.checked) {
    transferenciaNumero.disabled = true;
    tarjetaNumero.disabled = false;
    tarjetaCodigo.disabled = false;
    tarjetaVencimiento.disabled = false;
    noHaSeleccionado.innerHTML = "Tarjeta de crédito"
    noHaSeleccionado.classList.remove("is-invalid");
    feedbackNoHaSeleccionado.classList.remove("d-inline");
    transferenciaNumero.classList.remove("is-invalid");
    transferenciaNumero.value = "";
    feedbackDatosPago.classList.remove("is-invalid");
    feedbackDatosPago.classList.remove("d-inline");
    
  } else if (transferencia.checked){
    tarjetaNumero.disabled = true;
    tarjetaCodigo.disabled = true;
    tarjetaVencimiento.disabled = true;
    transferenciaNumero.disabled = false;
    noHaSeleccionado.innerHTML = "Transferencia bancaria"
    noHaSeleccionado.classList.remove("is-invalid");
    feedbackNoHaSeleccionado.classList.remove("d-inline");
    tarjetaNumero.classList.remove("is-invalid");
    tarjetaCodigo.classList.remove("is-invalid");
    tarjetaVencimiento.classList.remove("is-invalid");
    tarjetaNumero.value = "";
    tarjetaCodigo.value = "";
    tarjetaVencimiento.value = "";
    feedbackDatosPago.classList.remove("is-invalid");
    feedbackDatosPago.classList.remove("d-inline");
  };
};

//-------------------------------------------------------------------------------------------------------------//

//Función que valida los inputs del modal//
function validacionModal() {
  let tarjetaCredito = document.getElementById("tarjetaCredito");
  let tarjetaNumero = document.getElementById("tarjetaNumero");
  let tarjetaCodigo = document.getElementById("tarjetaCodigo");
  let tarjetaVencimiento = document.getElementById("tarjetaVencimiento");
  let transferencia = document.getElementById("transferencia");
  let transferenciaNumero = document.getElementById("transferenciaNumero");
  let noHaSeleccionado = document.getElementById("noHaSeleccionado");
  let feedbackNoHaSeleccionado = document.getElementById("noHaSeleccionadoFeedback");
  let feedbackDatosPago = document.getElementById("datosPagoFeedback");

  if (!transferencia.checked && !tarjetaCredito.checked) {
    noHaSeleccionado.classList.add("is-invalid");
    feedbackNoHaSeleccionado.classList.add("d-inline");
  };

  if (transferencia.checked) {
    if (transferenciaNumero.value == "") {
      transferenciaNumero.classList.add("is-invalid");
      feedbackDatosPago.classList.add("is-invalid");
      feedbackDatosPago.classList.add("d-inline");
      validar = false;
      transferenciaNumero.addEventListener("input", function () {
        if (transferenciaNumero.value == "") {
          transferenciaNumero.classList.add("is-invalid");
          validar = false;
          feedbackDatosPago.classList.add("is-invalid");
          feedbackDatosPago.classList.add("d-inline");
        } else {
          transferenciaNumero.classList.remove("is-invalid");
          validar = true;
          feedbackDatosPago.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("d-inline");
        };
      });
    } else {
      validar = true;
    };
  };

  if (tarjetaCredito.checked) {
    if (tarjetaNumero.value == "") {
      tarjetaNumero.classList.add("is-invalid");
      feedbackDatosPago.classList.add("is-invalid");
      feedbackDatosPago.classList.add("d-inline");
      validar = false;
      tarjetaNumero.addEventListener("input", function () {
        if (tarjetaNumero.value == "") {
          tarjetaNumero.classList.add("is-invalid");
          validar = false;
          feedbackDatosPago.classList.add("is-invalid");
          feedbackDatosPago.classList.add("d-inline");
        } else {
          tarjetaNumero.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("d-inline");
        };
      });
    };
    if (tarjetaCodigo.value == "") {
      tarjetaCodigo.classList.add("is-invalid");
      feedbackDatosPago.classList.add("is-invalid");
      feedbackDatosPago.classList.add("d-inline");
      validar = false;
      tarjetaCodigo.addEventListener("input", function () {
        if (tarjetaCodigo.value == "") {
          tarjetaCodigo.classList.add("is-invalid");
          validar = false;
          feedbackDatosPago.classList.add("is-invalid");
          feedbackDatosPago.classList.add("d-inline");
        } else {
          tarjetaCodigo.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("d-inline");
        };
      });
    };
    if (tarjetaVencimiento.value == "") {
      tarjetaVencimiento.classList.add("is-invalid");
      feedbackDatosPago.classList.add("is-invalid");
      feedbackDatosPago.classList.add("d-inline");
      validar = false;
      tarjetaVencimiento.addEventListener("input", function () {
        if (tarjetaVencimiento.value == "") {
          tarjetaVencimiento.classList.add("is-invalid");
          validar = false;
          feedbackDatosPago.classList.add("is-invalid");
          feedbackDatosPago.classList.add("d-inline");
        } else {
          tarjetaVencimiento.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("is-invalid");
          feedbackDatosPago.classList.remove("d-inline");
        };       
      });
    };
    if (tarjetaNumero.value != "" && tarjetaCodigo.value != "" && tarjetaVencimiento.value != "") {
      validar = true;
    };
  };
};


//-------------------------------------------------------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("username") !== null) {
    getJSONData(CART_USER).then(function (result) {
      if (result.status === "ok") {
        currentCartUser = result.data
        showCartUser(currentCartUser);
        enviarFormulario();
        updateCostos();

        //evento change para el input de la cantidad de productos//        
        document.getElementById("amount").addEventListener("change", function () {
          quantity = this.value;
          if (this.value < 1) {
            document.getElementById("amount").classList.add("is-invalid");
            document.getElementById("amount").classList.add(" d-inline");
          } else {
            document.getElementById("amount").classList.remove("is-invalid");
            document.getElementById("amount").classList.remove("d-inline");
          }
          updateCostos();

        });  
        
        document.getElementById("premiumRadio").addEventListener("change", function () {
          comissionPercentage = 0.15
          updateCostos();
        });

        document.getElementById("expressRadio").addEventListener("change", function () {
          comissionPercentage = 0.07
          updateCostos();
        });

        document.getElementById("standardRadio").addEventListener("change", function () {
          comissionPercentage = 0.05
          updateCostos();
        });
      };           
    });       
  };   
});

//-------------------------------------------------------------------------------------------------------------//

//Contenido de la página//
function showCartUser(cartUser) {

  let userCartContent =
    `
  <div class="container">
  <div class="text-center p-3">
    <h2>Carrito de compras de ${usuario}</h2>
    <hr>
  </div>
  <div>
  <h4  class="mb-1">Artículos a comprar</h4>
  </div>    
  <table class="table">
  <thead>
  <tr>
    <th scope="col"></th>
    <th scope="col">Nombre</th>
    <th scope="col">Costo</th>
    <th scope="col">Cantidad</th>
    <th scope="col">Subtotal</th>
  </tr>
  </thead>
  <tbody>
  `;

  for (let i = 0; i < cartUser.articles.length; i++) {
    let cartProd = cartUser.articles[i];

    valorunidad = cartProd.unitCost;
    MONEY_SYMBOL = cartProd.currency;
            
    userCartContent +=  
    `
    <tr>
    <th scope="row"><img src="${cartProd.image}" height="40"</th>
    <td>${cartProd.name}</td>
    <td>${cartProd.currency} ${cartProd.unitCost}</td>
    <td><input type="number" id="amount" value="1" min="1">
          <div class="invalid-feedback">
            Debe ingresar una cantidad válida
          </div></td>
    <td><b id="subt">${cartProd.currency} ${cartProd.unitCost}</b></td>
    </tr>       
    `           
  }
 
  userCartContent +=
  `
  </tbody>
  </table>
  <hr>
  <div class="container">
    <form action="#" method="get" class="row mt-4 needs-validation" novalidate>
    <div class="col">
      <h4 class="mb-2">Tipo de envío</h4>
      <div class="row g-3">
        <div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="tipoDeEnvio" id="premiumRadio" required>
            <label class="form-check-label" for="premiumRadio">
              Premium 2 a 5 días (15%)
            </label>
          </div>
          <div class="form-check">
          <input class="form-check-input" type="radio" name="tipoDeEnvio" id="expressRadio" required>
          <label class="form-check-label" for="expressRadio">
            Express 5 a 8 días (7%)
          </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="tipoDeEnvio" id="standardRadio" required>
            <label class="form-check-label" for="standardRadio">
              Standard 12 a 15 días (5%)
            </label>
            <div class="invalid-feedback">Debe seleccionar un tipo de envío</div>
          </div>
        </div>

        <h4 class="mb-2">Dirección de envío</h4>

        <div class="col-sm-6">
          <label for="calle" class="form-label">Calle</label>
          <input type="text" class="form-control" id="calle" required>
          <div class="invalid-feedback">
            Debe ingresar una calle
          </div>
        </div>

        <div class="col-sm-3">
          <label for="numero" class="form-label">Número</label>
          <input type="text" class="form-control" id="numero" required>
          <div class="invalid-feedback">
            Debe ingresar un número de dirección
          </div>
        </div>

        <div class="col-lg-6">
          <label for="esquina" class="form-label">Esquina</label>
          <input type="text" class="form-control" id="esquina" required>
          <div class="invalid-feedback">
            Debe ingresar una esquina
          </div>
        </div>
  
        <h4 class="mb-2">Costos</h4>

        <div>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Subtotal</h6>
                <small class="text-muted">Costo unitario del producto por cantidad</small>
              </div>
              <span class="text-muted" id="productCostText">${MONEY_SYMBOL} ${valorunidad}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Costo de envío</h6>
                <small class="text-muted">Según el tipo de envío</small>
              </div>
              <span class="text-muted" id="comissionText">-</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total ($)</span>
              <strong id="totalCostText">-</strong>
            </li>
          </ul>
        </div>

        <h4 class="mb-2">Forma de pago</h4>

        <div class="container">
          <div class="row">
            <div class="col">
              <span id="noHaSeleccionado">No ha seleccionado</span>
              <div id="noHaSeleccionadoFeedback" class="invalid-feedback">
                Debe ingresar una forma de pago
              </div>
              <button type="button" class="btn btn-link" data-bs-toggle="modal"
                data-bs-target="#contidionsModal" id="modal">Seleccionar</button>
              <div id="datosPagoFeedback" class="invalid-feedback">
                Faltan ingresar datos de pago
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-primary" type="submit" id="btnSubmit">Finalizar compra</button>
      </div>
    </div>
    </form>
  </div>
  
  <div class="modal fade" tabindex="-1" role="dialog" id="contidionsModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Forma de pago</h5>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" id="tarjetaCredito" name="formaDePago" onclick="radiosModal()">
                <label class="form-check-label" for="tarjetaCredito">
                  Tarjeta de crédito
                </label>
              </div>
              <hr>
              <div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <label for="calle" class="form-label">Número de tarjeta</label>
                      <input type="text" class="form-control" id="tarjetaNumero">
                      <div class="invalid-feedback">
                        Debe ingresar un número de tarjeta
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <label for="numero" class="form-label">Código de seg.</label>
                      <input type="text" class="form-control" id="tarjetaCodigo">
                      <div class="invalid-feedback">
                        Debe ingresar el código de seguridad
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">                  
                  <div class="col-lg-6">
                    <label for="esquina" class="form-label">Vencimiento (MM/AA)</label>
                    <input type="text" class="form-control" id="tarjetaVencimiento">
                    <div class="invalid-feedback">
                      Debe ingresar el vencimiento de su tarjeta
                    </div>
                  </div>                  
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-check mt-3">
                <input class="form-check-input" type="radio" id="transferencia" name="formaDePago" onclick="radiosModal()">
                <label class="form-check-label" for="transferencia">
                  Transferencia bancaria
                </label>
              </div>
            </div>
            <hr>
            <div>
              <div class="col-12">                  
                <div class="col-lg-6">
                  <label for="transferenciaNumero" class="form-label">Número de cuenta</label>
                  <input type="text" class="form-control" id="transferenciaNumero">                  
                  <div class="invalid-feedback">
                    Debe ingresar su número de cuenta
                  </div>
                </div>                  
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  `
  document.getElementById("userContainer").innerHTML += userCartContent;
};