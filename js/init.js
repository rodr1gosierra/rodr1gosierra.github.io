const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//------------------------------------------------------------------------------------------------------------//

//Menu desplegable de usuario//
document.addEventListener("DOMContentLoaded", function () {

  let menu = document.getElementById("menuDesplegable")

  menu.innerHTML = `
  <button class="btn btn-secondary dropdown-toggle" type="button" id="usuario" data-bs-toggle="dropdown" aria-expanded="false">              
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenu2">
    <li><button class="dropdown-item" type="button" id="myCart">Mi carrito</button></li>
    <li><button class="dropdown-item" type="button" id="profile">Mi perfil</button></li>
    <li><button class="dropdown-item" type="button" id="logout">Cerrar sesión</button></li>
  </ul>`

  let usuario = document.getElementById("usuario");
  usuario.innerHTML = localStorage.getItem("username");

  document.getElementById("myCart").addEventListener("click", function () {
    window.location.href = "cart.html";    
  });

  document.getElementById("profile").addEventListener("click", function () {
    if (localStorage.getItem("username") !== null) {
      window.location.href = "my-profile.html"; 
    } else {
      window.location.href = "index.html"
    };     
  });

  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("username");
    window.location.href = "index.html";
  });
});


