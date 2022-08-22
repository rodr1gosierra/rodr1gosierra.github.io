//https://japceibal.github.io/emercado-api/cats_products/101.json

const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let currentProductsArray = []

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(AUTOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data
            showProductsList(currentProductsArray);

        }
    })
})

function showProductsList(array) {

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <div class="text-center p-4">"
    <h2>Productos</h2>
    <p>Verás aquí todos los productos de la categoría <b>Autos</b></p>
    </div>
    <hr>
`

    for (let i = 0; i < array.products.length; i++) {
        let auto = array.products[i];

        htmlContentToAppend += `
            
                <div class="row">
                    <div class="col-3">
                        <img src="${auto.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${auto.name} - ` + auto.currency +' '+ auto.cost + `</h4>
                            <small class="text-muted">${auto.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${auto.description}</p>
                    </div>
                </div>
            </div>
            `
    }

    document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}

