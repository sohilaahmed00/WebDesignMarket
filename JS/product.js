
/*
magproducturl --> id="productimg"
fonts-->  id="productfont"
div buttons --> id="button"
Addbutton-->     id="Addbutton"
detailsbutton --> id="productetails"

*/  



// Products array
try {
   var  arrproduct = JSON.parse(localStorage.getItem("productsArr")) || defaultProducts;
} catch (error) {
    console.log('localStorage not available, using default products');
    arrproduct = defaultProducts;
}



//localStorage.setItem("productsArr", JSON.stringify(arrproduct));

// show product
function products(array = arrproduct) {
    let emp = '';

    for (let i = 0; i < array.length; i++) {
        emp += `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="img w-100" style="background-color:white; border: 3px #E9E9E9 solid; padding: 20px;">
                    <img src="${array[i].magproducturl}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px;">
                    <h6 class="text-center mt-3" style="color: #777777; text-transform: capitalize;">${array[i].categoryproduct}</h6>
                    <p class="text-center" style="font-weight: 600; color: #2c3e50; margin: 10px 0;">${array[i].nameproduct}</p>
                    <div class="text-center stars-container mb-2">
                        <i class="fa-regular fa-star" onclick="starclick(this)" style="color: #ffd700; cursor: pointer;"></i>
                        <i class="fa-regular fa-star" onclick="starclick(this)" style="color: #ffd700; cursor: pointer;"></i>
                        <i class="fa-regular fa-star" onclick="starclick(this)" style="color: #ffd700; cursor: pointer;"></i>
                        <i class="fa-regular fa-star" onclick="starclick(this)" style="color: #ffd700; cursor: pointer;"></i>
                    </div>
                    <p class="text-center" style="font-weight: bold; color: #6c757d; font-size: 14px;">${array[i].p}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <p style="color: #dc3545; font-weight: 700; font-size: 18px; margin: 0;">${array[i].salary}</p>
                        <div class="btn-group">
                            <button onclick="goToDetails('${i}')" class="btn btn-outline-danger btn-sm me-2">Details</button>
                            <button onclick="addToCart({id: '${array[i].id}', name: '${array[i].nameproduct}', price: '${array[i].salary}', image: '${array[i].magproducturl}'})" class="btn btn-danger btn-sm">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if (document.getElementById('product')) document.getElementById('product').innerHTML = emp;
    if (document.getElementById('product2')) document.getElementById('product2').innerHTML = emp;
    if (document.getElementById('product3')) document.getElementById('product3').innerHTML = emp;
}

products(arrproduct);





function goToDetails(index) {
    localStorage.setItem('selectedProduct', JSON.stringify(arrproduct[index]));
    window.location.href = './productdetails.html';
}

document.addEventListener('DOMContentLoaded', () => {
    let product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!product) return;

    let detailsContainer = document.getElementById('proddetails');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
        <div class="images "  style="background-color: #F7F7F8; height:350px" >
            <img   src="${product.magproducturl}" id="mainimage" style = "height:350px">            
        </div>
        <div style="width: 500px;"  >
            <h6 style="text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size: 22px;">${product.head}</h6>
            <p style="font-size: 14px;font-weight: 400;color: #7A7A7A;">${product.para}</p>
            <div class="d-flex col justify-content-start">
                <p style="font-weight:bolder;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;">Brand:</p>
                <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 400; color: #777777">&nbsp; ${product.Brand}</p>
            </div>
            <div class="d-flex col justify-content-start">
                <p style="font-weight:bolder;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;">Flavour:</p>
                <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 400; color: #777777">&nbsp; ${product.Flavour}</p>
            </div>
            <div class="d-flex col justify-content-start">
                <p style="font-weight:bolder;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;">Diet Type:</p>
                <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 400; color: #777777">&nbsp; ${product.DietType}</p>
            </div>
            <div class="d-flex col justify-content-start">
                <p style="font-weight: bolder;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;">Weight &nbsp; &nbsp; &nbsp;    :</p>
                <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 400; color: #777777">&nbsp;${product.Weight}</p></div>
                <div class="d-flex col justify-content-start">
                <p style="font-weight: bolder;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 600;">Info &nbsp; &nbsp; &nbsp;    :</p>
                <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 400; color: #777777">&nbsp; ${product.Info}</p></div>

                <p style="color: red; font-weight: 600; margin-top: 10px; font-size: 24px;">${product.salary}</p>
                
                <div class="d-flex col justify-content-start">
                <p style="font-weight: bolder;">item &nbsp; &nbsp; &nbsp;    : 1</p>
                </div>
                <button id="Addbutton" style="color:white ; background-color: red;width: 85px;height: 36px;border-radius: 4px;border: red ;" > Add</button>
        `;
    }

    let imgEl = document.getElementById('detailsImage');
    if (imgEl) imgEl.src = product.magproducturl;
});

// search product
var searchproduct = document.getElementById("searchproduct");

searchproduct.onkeyup = function () {
    var searchvalue = searchproduct.value.toLowerCase();
    var matchedvalue = [];

    for (let index = 0; index < arrproduct.length; index++) {
        // Search inside "p" or "categoryproduct" instead of name
       // var description = arrproduct[index].p.toLowerCase();
        var category = arrproduct[index].nameproduct.toLowerCase();

        if ( category.includes(searchvalue)) {
            matchedvalue.push(arrproduct[index]);
        }
    }

    products(matchedvalue); // render filtered products
}

 //filter

// Show all products initially
products(arrproduct);

// Add event listener to all checkboxes
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

  // If no checkbox is checked, show all products
  if (selectedCategories.length === 0) {
    products(arrproduct);
    return;
  }

  // Filter products
  const matchedProducts = arrproduct.filter(function (product) {
    return selectedCategories.includes(product.categoryproduct.toLowerCase());
  });

  products(matchedProducts);
}


function clickDescription() {

document.getElementById('showDescription').innerHTML = ' ';

    let showDescription = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Error in vero sapiente odio, error dolore vero temporibus consequatur, 
        nobis veniam odit dignissimos consectetur quae in perferendis doloribus 
        debitis corporis, eaque dicta, repellat amet, illum adipisci vel perferendis dolor! 
        Quis vel consequuntur repellat distinctio rem.</p>`;


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
    // Get all stars in the same container
    const starsContainer = clickedStar.closest(".stars-container");
    const stars = starsContainer.querySelectorAll(".fa-star");

    // Find the index of the clicked star
    let clickedIndex = -1;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i] === clickedStar) {
            clickedIndex = i;
            break;
        }
    }

    // Update all stars up to the clicked one
    for (let i = 0; i <= clickedIndex; i++) {
        stars[i].classList.remove("fa-regular");
        stars[i].classList.add("fa-solid");
        stars[i].style.color = "#FFD43B";
    }

    // Reset stars after the clicked one (if needed)
    for (let i = clickedIndex + 1; i < stars.length; i++) {
        stars[i].classList.remove("fa-solid");
        stars[i].classList.add("fa-regular");
        stars[i].style.color = "";
    }
}