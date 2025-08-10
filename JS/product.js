
/*
magproducturl --> id="productimg"
fonts-->  id="productfont"
div buttons --> id="button"
Addbutton-->     id="Addbutton"
detailsbutton --> id="productetails"

*/




let arrproduct = [
    {magproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables', p:'Fresh organic villa farm lomon<br> 500gm pack', salary:'$120', old_salary:'$123.25', rating:4.5, nameproduct:'Fresh Organic Lemon'},
    {magproducturl:'./Images/2.jpg.png', categoryproduct:'snakes', p:'Best snakes with hazel nut pack <br>200gm', salary:'$145', old_salary:'$150', rating:5.0, nameproduct:'fresh apple'},
    {magproducturl:'./Images/3 .jpg.png', categoryproduct:'fruits', p:'Fresh organic apple 1kg simla<br>marming', salary:'$120', old_salary:'$123.26', rating:4.5, nameproduct:'sweet cake'},
    {magproducturl:'./Images/9.jpg.png', categoryproduct:'fruits', p:'Organic fresh venila farm<br>watermelon 5kg', salary:'$50.30', old_salary:'$72.60', rating:3.2, nameproduct:'chocalate'},
    {magproducturl:'./Images/10.jpg.png', categoryproduct:'snacks', p:'Sweet crunchy nut mix 250gm<br>pack,salary', salary:'$120.30', old_salary:'$123.25', rating:5.0, nameproduct:'crunchy nut'},
    {magproducturl:'./Images/17.jpg.png', categoryproduct:'Bakery', p:'Delicious white baked fresh bread<br>and toast', salary:'$20', old_salary:'$22.10', rating:5.0, nameproduct:'toast'},
    {magproducturl:'./Images/13.jpg.png', categoryproduct:'Bakery', p:'Delicious white baked fresh bread<br>and toast', salary:'$20', old_salary:'$22.10', rating:5.0, nameproduct:'premium nut'},
    {magproducturl:'./Images/11.jpg.png', categoryproduct:'Bakery', p:'Delicious white baked fresh bread<br>and toast', salary:'$20', old_salary:'$22.10', rating:5.0, nameproduct:'trail mix'},
    {magproducturl:'./Images/12.jpg.png', categoryproduct:'Bakery', p:'Delicious white baked fresh bread<br>and toast', salary:'$20', old_salary:'$22.10', rating:5.0, nameproduct:'whole'},
    {magproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables', p:'Fresh organic villa farm lomon<br> 500gm pack', salary:'$120', old_salary:'$123.25', rating:4.5, nameproduct:'Fresh Organic Lemon'},
    {magproducturl:'./Images/2.jpg.png', categoryproduct:'snakes', p:'Best snakes with hazel nut pack <br>200gm', salary:'$145', old_salary:'$150', rating:5.0, nameproduct:'fresh apple'},
    {magproducturl:'./Images/3 .jpg.png', categoryproduct:'fruits', p:'Fresh organic apple 1kg simla<br>marming', salary:'$120', old_salary:'$123.26', rating:4.5, nameproduct:'sweet cake'},
];

localStorage.setItem("productsArr", JSON.stringify(arrproduct));

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
    <div id="button" class="d-flex justify-content-between"><p style="color: red; font-weight: 700; font-weight: bold; margin-left:50px ;" class="text-center "> ${array[i].salary}</p>
   <a href="https://web.whatsapp.com/" target="_blank"><button id="productetails" style="color:white ; background-color: red;width: 85px;height: 36px;border-radius: 4px;border: red ;" > Details</button></a>  <button id="Addbutton" style="color:white ; background-color: red;width: 85px;height: 36px;border-radius: 4px;border: red ;" > Add</button></div>


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


