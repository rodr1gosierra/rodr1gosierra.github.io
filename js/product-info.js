let category = localStorage.getItem("prodID");
const PRODUCT_INFO = PRODUCT_INFO_URL + category + EXT_TYPE;
let currentProductInfo = [];
let currentProductComments = [];
const PRODCOMMENTS = PRODUCT_INFO_COMMENTS_URL + category + EXT_TYPE;
let starChecked = '<span class="fa fa-star checked"></span>';
let star = '<span class="fa fa-star"></span>';

//-----------------------------------------------------------------------------------------------------------//

//*************************************getJSONData***********************************************************//
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO).then(function (result) {
        if (result.status === "ok") {
            currentProductInfo = result.data
            showProductInfo(currentProductInfo);

        }
        getJSONData(PRODCOMMENTS).then(function (resultObj) {
            if (resultObj.status === "ok") {
                currentProductComments = resultObj.data
                showProductComments(currentProductComments);

            }
        })
    })

    //Botón que simula enviar nuevo comentario//
    document.getElementById("enviar").addEventListener("click", function () {
        if (document.getElementById("opinion").value != "" && document.getElementById("quantity").value != "") {
            alert("Comentario enviado");
            document.getElementById("opinion").value = "";
            document.getElementById("quantity").value = "";
        } else {
            alert("Falta agregar datos al nuevo comentario")
        }
    })
})

//-----------------------------------------------------------------------------------------------------------//

//Función que muestra los productos y los datos//
function showProductInfo(data) {

    document.getElementById("product-info-container").innerHTML = "";

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <div class="text-center p-3">
        <h1 style="font-size:30px;">${data.name}</h2>
        <hr>
    </div>
    <div class="col-12">
    <div class="row">
        <div class="col-lg-6">
            <div>
                <h4 class="mb-1">Precio</h4>
                <p>${data.currency} ${data.cost}</p>
            </div>
            <div>
                <h4 class="mb-1">Descripción</h4>
                <p>${data.description}</p>
            </div>
            <div>
                <h4 class="mb-1">Categoría</h4>
                <p>${data.category}</p>
            </div>
            <div>
                <h4 class="mb-1">Cantidad de vendidos</h4>
                <p>${data.soldCount}</p>
            </div>
        </div>
        <div class="col-lg-6">
            <div>
                <h4 class="mb-1">Imágenes ilustrativas</h4>
            </div>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="${data.images[0]}" alt="" class="img-thumbnail d-block w-100">
                    </div>
    `

    for (let i=1; i < data.images.length; i++) {
        let img = data.images[i];

        htmlContentToAppend +=`
                    <div class="carousel-item">
                    <img src="${img}" alt="" class="img-thumbnail d-block w-100">
                    </div>
                `
    }

    htmlContentToAppend += `
                </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
            </div>
        </div>
    </div>
    </div>
    `    
//------------------------------------------------------------------------------------------------------------//
    
//Mostrar productos relacionados//

    let relatedProductsContainer = 
    `<br>
    </div>
    <div>
    <h4  class="mb-1">Productos relacionados</h4>
    </div>`;
    
    for (let i = 0; i < data.relatedProducts.length; i++) {
        let relProd = data.relatedProducts[i];
                
        relatedProductsContainer +=  
        `
        <div onclick="setProdID(${relProd.id})" class="col-md-6">
        <div class="card mb-6 shadow-sm custom-card cursor-active">
        <img src="${relProd.image}" class="bd-placeholder-img card-img-top img-fluid">
        <div class="card-body">
            <p class="card-text">${relProd.name}</p>
        </div>
        </div>
        </div>       
        `           
    }

    document.getElementById("product-info-container").innerHTML += htmlContentToAppend;
    document.getElementById("relatedProducts").innerHTML += relatedProductsContainer;
}

//------------------------------------------------------------------------------------------------------------//

//Función que muestra los comentarios y los input para agregar uno nuevo//
function showProductComments(array) {
  
    let htmlContentToAppend = `
    <br>
    <div>
        <h4>Comentarios - ${array.length}</h4>
    </div>
    `
    
    for (let i = 0; i < array.length; i++) {
        let comm = array[i];

        htmlContentToAppend += `
            <hr>
            <div>
                <p id="stars"><b>${comm.user}</b> - ${comm.dateTime} - ${estrellas(comm.score)}</p> 
                <p>${comm.description}</p>                   
            </div>
            `
    }

    htmlContentToAppend += `
    <div class="mb-5">
        <div>
            <hr>
            <h4 class="mb-2">Comentar</h4>
        </div>
        <div class="col-4 mb-2">
            <label for="opinion" class="form-label">Tu opinión</label>
            <input type="text" id="opinion" style="WIDTH: 252px; HEIGHT: 90px" size=32>
        </div>
        <div class="col-4 mb-2">
            <label for="score" class="form-label">Tu puntuación</label>
            <input type="number" id="score" min="1" max="5">
        </div>
        <input type="submit" id="enviar" style="background-color: #3f78b9 ;">
    </div>
    `
    
    document.getElementById("product-info-container").innerHTML += htmlContentToAppend;

}

//------------------------------------------------------------------------------------------------------------//

//Función para las estrellas de los comentarios//
function estrellas(numero) {
    return starChecked.repeat(numero) + (star.repeat(5 - numero))    
}

//------------------------------------------------------------------------------------------------------------//

//Función para guardar el id del producto y redirigir//
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}