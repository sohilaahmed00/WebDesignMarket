
/*
magproducturl --> id="productimg"
fonts-->  id="productfont"
div buttons --> id="button"
Addbutton-->     id="Addbutton"
detailsbutton --> id="productetails"

*/  





let arrproduct=[
    {id:'lemon',imagproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables',paragraph:'Fresh organic villa farm lomon<br> 500gm pack' , salary:'$120',nameproduct: 'Fresh Organic Lemon',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {id:'apple',imagproducturl:'./Images/2.jpg.png', categoryproduct:'snakes',paragraph:'Best snakes with hazel nut pack <br>200gm',salary:'$145',nameproduct: 'fresh apple',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'fg',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {id:'cake',imagproducturl:'./Images/3.jpg.png', categoryproduct:'fruits',paragraph:'Fresh organic apple 1kg simla<br>marming',salary:'$120',nameproduct:'sweet cake',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'ewr',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {id:'chocolate',imagproducturl:'./Images/9.jpg.png', categoryproduct:'fruits',paragraph:'Organic fresh venila farm<br>watermelon 5kg',salary:'$50.30',nameproduct:'chocalate',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'erewrf',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/10.jpg.png', categoryproduct:'snacks',paragraph:'Sweet crunchy nut mix 250gm<br>pack,salary',salary:'$120.30',nameproduct:'crunchy nut',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'hytgf',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/17.jpg.png', categoryproduct:'Bakery',paragraph:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'toast',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/13.jpg.png', categoryproduct:'Bakery',paragraph:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'premium nut',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/11.jpg.png', categoryproduct:'Bakery',paragraph:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'trail mix',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/12.jpg.png', categoryproduct:'Bakery',paragraph:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'whole',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables',paragraph:'Fresh organic villa farm lomon<br> 500gm pack' , salary:'$120',nameproduct: 'Fresh Organic Lemon',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/2.jpg.png', categoryproduct:'snakes',paragraph:'Best snakes with hazel nut pack <br>200gm',salary:'$145',nameproduct: 'fresh apple',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
   {imagproducturl:'./Images/3.jpg.png', categoryproduct:'fruits',paragraph:'Fresh organic apple 1kg simla<br>marming',salary:'$120',nameproduct:'sweet cake',head:'Seeds Of Change Oraganic Quinoa, Brown',para:'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iureminus error doloribus saepe natus?',Brand:'ESTA BETTERU CO',Flavour:'Super Saver Pack',DietType:'Vegetarian',Weight:'100g',Info:'Egg Free, Allergen-Free'},
]

//localStorage.setItem("productsArr", JSON.stringify(arrproduct));

// show product
function products(array = arrproduct) {
    let emp = '';

    for (let i = 0; i < array.length; i++) {
        emp += `
            <div class="img w-auto" style="background-color:white; margin:5px; border: 3px #E9E9E9 solid;">
                <img src="${array[i].imagproducturl}" style="padding:13px; width: 280px; height: 280px;">
                <h6 class="text-center" style="color: #777777;">${array[i].categoryproduct}</h6>
                <p style="text-align: center;">${array[i].nameproduct}</p>
                <div class="text-center stars-container">
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                    <i class="fa-regular fa-star" onclick="starclick(this)"></i>
                </div>
                <p class="text-center" style="font-weight: bold;">${array[i].paragraph}</p>
                <div id="button" class="d-flex justify-content-between">
                    <p style="color: red; font-weight: 700; margin-left:50px;">${array[i].salary}</p>
                    <button onclick="goToDetails('${i}')" style="color:white; background-color: red; width: 85px; height: 36px; border-radius: 4px; border: red;">Details</button>
                    <button style="color:white; background-color: red; width: 85px; height: 36px; border-radius: 4px; border: red;">Add</button>
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
            <img   src="${product.imagproducturl}" id="mainimage" style = "height:350px">            
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