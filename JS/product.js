
arrproduct=[
    {magproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables',p:'Fresh organic villa farm lomon<br> 500gm pack' , salary:'$120',nameproduct: 'Fresh Organic Lemon'},
   {magproducturl:'./Images/2.jpg.png', categoryproduct:'snakes',p:'Best snakes with hazel nut pack <br>200gm',salary:'$145',nameproduct: 'fresh apple'},
   {magproducturl:'./Images/3.jpg.png', categoryproduct:'fruits',p:'Fresh organic apple 1kg simla<br>marming',salary:'$120',nameproduct:'sweet cake'},
   {magproducturl:'./Images/9.jpg.png', categoryproduct:'fruits',p:'Organic fresh venila farm<br>watermelon 5kg',salary:'$50.30',nameproduct:'chocalate'},
   {magproducturl:'./Images/10.jpg.png', categoryproduct:'snacks',p:'Sweet crunchy nut mix 250gm<br>pack,salary',salary:'$120.30',nameproduct:'crunchy nut'},
   {magproducturl:'./Images/17.jpg.png', categoryproduct:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'toast'},
   {magproducturl:'./Images/13.jpg.png', categoryproduct:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'premium nut'},
   {magproducturl:'./Images/11.jpg.png', categoryproduct:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'trail mix'},
   {magproducturl:'./Images/12.jpg.png', categoryproduct:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20',nameproduct:'whole'},
   {magproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables',p:'Fresh organic villa farm lomon<br> 500gm pack' , salary:'$120',nameproduct: 'Fresh Organic Lemon'},
   {magproducturl:'./Images/2.jpg.png', categoryproduct:'snakes',p:'Best snakes with hazel nut pack <br>200gm',salary:'$145',nameproduct: 'fresh apple'},
   {magproducturl:'./Images/3.jpg.png', categoryproduct:'fruits',p:'Fresh organic apple 1kg simla<br>marming',salary:'$120',nameproduct:'sweet cake'},
   
]

// show product
function products(array = arrproduct){
    var emp = '';

for (let i = 0; i < array.length; i++) {
    
    
    emp += `
        <div class="img w-auto"  style="background-color:white ; margin:5px; border: 3px #E9E9E9 solid;">
         <img src="${array[i].magproducturl}" style="padding:13px ; width: 280px; height: 280px;" id="productimg"><h6 class="text-center" style="color: #777777;">${array[i].categoryproduct}</h6><p style="text-align: center;">${array[i].nameproduct}</p>
   <div class="text-center" id="productfont"> <i class="fa-regular fa-star  " style=""></i>
         <i class="fa-regular fa-star  " style=""></i>
         <i class="fa-regular fa-star  " style=""></i>
         <i class="fa-regular fa-star  " style=""></i></div> 
    <p class="text-center" style=" font-weight: bold;">  ${array[i].p}</p>
    <div id="Addbutton" class="d-flex justify-content-between"><p style="color: red; font-weight: 700; font-weight: bold; margin-left:50px ;" class="text-center "> ${array[i].salary}</p> <button id="button" style="color:white ; background-color: red;width: 85px;height: 36px;border-radius: 4px;border: red ;" > Add</button></div>


</div> 
    `;
}

document.getElementById('product').innerHTML = emp;
document.getElementById('product2').innerHTML = emp;
document.getElementById('product3').innerHTML = emp;
}

products(arrproduct)



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


