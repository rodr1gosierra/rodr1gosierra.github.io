//https://japceibal.github.io/emercado-api/cats_products/101.json

let currentProductsArray = [];
let category = localStorage.getItem("catID");
const PRODUCT = PRODUCTS_URL + category + EXT_TYPE;
let minPrice = undefined;
let maxPrice = undefined;
let search = "";


function showProductsList(array) {

    document.getElementById("products-list-container").innerHTML = "";

    let htmlContentToAppend = "";

    for (let i = 0; i < array.products.length; i++) {
        let prod = array.products[i];

        //console.log(typeof prod.description);


        if ((prod.cost >= minPrice || minPrice == undefined) && (prod.cost <= maxPrice || maxPrice == undefined)) {

            if (prod.name.toLowerCase().includes(search.toLowerCase()) || prod.description.toLowerCase().includes(search.toLowerCase()) || search == "") {

                htmlContentToAppend += `
                <div onclick="setProdID(${prod.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${prod.image}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${prod.name} - ` + prod.currency + ' ' + prod.cost + `</h4>
                                <small class="text-muted">${prod.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${prod.description}</p>
                        </div>
                    </div>
                </div>
                `


            }




        }

    }

    document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    // 
}

//Función para guardar el id del producto y redirigir hacia product-info//
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data
            showProductsList(currentProductsArray);

        }
    })

    //Botón de ordenar en forma descendente - Precio//
    document.getElementById("sortDesc").addEventListener("click", function () {

        currentProductsArray.products.sort(function (a, b) {
            return b.cost - a.cost;

        });
        showProductsList(currentProductsArray);
    })


    //Botón de ordenar en forma ascendente - Precio//
    document.getElementById("sortAsc").addEventListener("click", function () {

        currentProductsArray.products.sort(function (a, b) {
            return a.cost - b.cost;

        });
        showProductsList(currentProductsArray);
    })


    //Botón de ordenar por relevancia en forma descendente//
    document.getElementById("sortByCount").addEventListener("click", function () {

        currentProductsArray.products.sort(function (a, b) {
            return b.soldCount - a.soldCount;

        });
        showProductsList(currentProductsArray);
    })

    //Botón de filtrar//
    document.getElementById("rangeFilterPrice").addEventListener("click", function () {

        if (document.getElementById("rangeFilterPriceMin").value != "") {
            minPrice = parseInt(document.getElementById("rangeFilterPriceMin").value);

        } else {
            minPrice = undefined;
        }

        if (document.getElementById("rangeFilterPriceMax").value != "") {
            maxPrice = parseInt(document.getElementById("rangeFilterPriceMax").value);

        } else {
            maxPrice = undefined;
        }

        showProductsList(currentProductsArray);

    })

    //Botón de limpiar//
    document.getElementById("clearRangePrice").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList(currentProductsArray);
    });

    document.getElementById("search").addEventListener("input", function () {
        search = document.getElementById("search").value;

        showProductsList(currentProductsArray);
    })
})

