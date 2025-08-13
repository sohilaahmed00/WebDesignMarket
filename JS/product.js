/*
magproducturl --> id="productimg"
fonts-->  id="productfont"
div buttons --> id="button"
Addbutton-->     id="Addbutton"
detailsbutton --> id="productetails"
*/  

var arrproduct;
try {
    // Check if productManager is loaded and get products from it
    if (typeof productManager !== 'undefined' && typeof cartManager !== 'undefined') {
        arrproduct = productManager.getProducts();
    } else {
        // Fallback in case productManager fails to load, though this shouldn't happen
        console.error("Product Manager or Cart Manager is not loaded. Using empty array.");
        arrproduct = [];
    }
} catch (error) {
    console.error('Error getting products:', error);
    arrproduct = []; // Default to an empty array on error
}


// show product
function products(array = arrproduct) {
    let emp = '';

    for (let i = 0; i < array.length; i++) {
        emp += `
            <div class="product-card">
                <img src="${array[i].magproducturl}" id="productimg">
                <h6 class="text-center" id="productfont">${array[i].categoryproduct}</h6>
                <p class="product-name">${array[i].nameproduct}</p>
                <div class="text-center stars-container">
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                </div>
                <p class="product-desc">${array[i].p}</p>
                <div id="button" class="d-flex justify-content-between p-2">
                    <p class="product-price">${array[i].salary}</p>
                    <div>
                        <button id="productetails" onclick="goToDetails(${array[i].id})" class="btn btn-details">Details</button>
                        <button id="Addbutton" onclick="addToCartFromProductPage(${array[i].id})" class="btn btn-add">Add</button>
                    </div>
                </div>
            </div>
        `;
    }

    if (document.getElementById('product')) document.getElementById('product').innerHTML = emp;
    if (document.getElementById('product2')) document.getElementById('product2').innerHTML = emp;
    if (document.getElementById('product3')) document.getElementById('product3').innerHTML = emp;
}


// Initial call to display products when the script loads
products(arrproduct);

function goToDetails(productId) {
    // Using ID is more reliable than index
    localStorage.setItem('selectedProductId', productId);
    window.location.href = './productdetails.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // This part is for the productdetails.html page, it won't run on product.html
    const productId = localStorage.getItem('selectedProductId');
    if (!productId) return;

    // Use productManager to get the correct product by ID
    const product = productManager.getProductById(parseInt(productId));
    if (!product) return;

    let detailsContainer = document.getElementById('proddetails');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
        <div class="images "  style="background-color: #F7F7F8; height:350px" >
            <img   src="${product.magproducturl}" id="mainimage" style = "height:350px">            
        </div>
        <div style="width: 500px;"  >
            <h6 style="text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 22px;">${product.head || product.nameproduct}</h6>
            <p style="font-size: 14px;font-weight: 400;color: #7A7A7A;">${product.para || product.p}</p>
            <div class="d-flex col justify-content-start">
                <p style="font-weight:bolder;">Brand:</p>
                <p style="color: #777777">&nbsp; ${product.Brand || 'N/A'}</p>
            </div>
            <div class="d-flex col justify-content-start">
                <p style="font-weight:bolder;">Flavour:</p>
                <p style="color: #777777">&nbsp; ${product.Flavour || 'N/A'}</p>
            </div>
            <div class="d-flex col justify-content-start">
                <p style="font-weight:bolder;">Diet Type:</p>
                <p style="color: #777777">&nbsp; ${product.DietType || 'N/A'}</p>
            </div>
            <div class="d-flex col justify-content-start">
                <p style="font-weight: bolder;">Weight:</p>
                <p style="color: #777777">&nbsp;${product.Weight || 'N/A'}</p></div>
                <div class="d-flex col justify-content-start">
                <p style="font-weight: bolder;">Info:</p>
                <p style="color: #777777">&nbsp; ${product.Info || 'N/A'}</p></div>

                <p style="color: red; font-weight: 600; margin-top: 10px; font-size: 24px;">${product.salary}</p>
                
                <div class="d-flex col justify-content-start">
                <p style="font-weight: bolder;">item: 1</p>
                </div>
                <button id="Addbutton" onclick="addToCartFromProductDetails()" style="color:white ; background-color: red;width: 85px;height: 36px;border-radius: 4px;border: red ;" > Add</button>
        `;
    }
});

// search product
var searchproduct = document.getElementById("searchproduct");
if(searchproduct) {
    searchproduct.onkeyup = function () {
        var searchvalue = searchproduct.value.toLowerCase();
        var matchedvalue = [];

        for (let index = 0; index < arrproduct.length; index++) {
            var category = arrproduct[index].nameproduct.toLowerCase();
            if ( category.includes(searchvalue)) {
                matchedvalue.push(arrproduct[index]);
            }
        }
        products(matchedvalue); // render filtered products
    }
}


// filter
const checkboxes = document.querySelectorAll('.category-filter');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    filterByCategories();
  });
});

function filterByCategories() {
  const selectedCategories = [];

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value.toLowerCase());
    }
  });

  if (selectedCategories.length === 0) {
    products(arrproduct);
    return;
  }

  const matchedProducts = arrproduct.filter(function (product) {
    // Handle both 'snacks' and 'snakes' if needed
    const category = product.categoryproduct.toLowerCase();
    return selectedCategories.some(sc => category.includes(sc));
  });

  products(matchedProducts);
}


function clickDescription() {
    document.getElementById('showDescription').innerHTML = ' ';
    let showDescription = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente odio, error dolore vero temporibus consequatur, nobis veniam odit dignissimos consectetur quae in perferendis doloribus debitis corporis, eaque dicta, repellat amet, illum adipisci vel perferendis dolor! Quis vel consequuntur repellat distinctio rem.</p>`;
    document.getElementById('showDescription').innerHTML = showDescription;
    document.getElementById("Information").style.color = "#2B2B2D";
    document.getElementById("Review").style.color = "#2B2B2D";
    document.getElementById("Description").style.color = "red";
}

function clickInformation() {
    let info = `<p>This is some information content.</p>`;
    document.getElementById('showDescription').innerHTML = info;
    document.getElementById("Review").style.color = "#2B2B2D";
    document.getElementById("Description").style.color = "#2B2B2D";
    document.getElementById("Information").style.color = "red";
}

function clickReview() {
    let review = `<p>This is some review content.</p>`;
    document.getElementById('showDescription').innerHTML = review;
    document.getElementById("Description").style.color = "#2B2B2D";
    document.getElementById("Information").style.color = "#2B2B2D";
    document.getElementById("Review").style.color = "red";
}

function starclick(clickedStar) {
    const starsContainer = clickedStar.closest(".stars-container");
    const stars = starsContainer.querySelectorAll(".fa-star");
    let clickedIndex = -1;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i] === clickedStar) {
            clickedIndex = i;
            break;
        }
    }
    for (let i = 0; i <= clickedIndex; i++) {
        stars[i].classList.remove("fa-regular");
        stars[i].classList.add("fa-solid");
        stars[i].style.color = "#FFD43B";
    }
    for (let i = clickedIndex + 1; i < stars.length; i++) {
        stars[i].classList.remove("fa-solid");
        stars[i].classList.add("fa-regular");
        stars[i].style.color = "";
    }
}


function addToCartFromProductPage(productId) {
    const product = arrproduct.find(p => p.id === productId);
    if (product) {
        cartManager.addToCart({
            id: product.id,
            name: product.nameproduct,
            price: product.salary,
            image: product.magproducturl
        });
    }
}



function addToCartFromProductDetails() {
    const productId = localStorage.getItem("selectedProductId");
    if (!productId) return;

    const product = productManager.getProductById(parseInt(productId));
    if (product) {
        cartManager.addToCart({
            id: product.id,
            name: product.nameproduct,
            price: product.salary,
            image: product.magproducturl
        });
    }
}

