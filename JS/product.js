
arrproduct=[
    {magproducturl:'./Images/1.jpg.png', h6:'vegetables',p:'Fresh organic villa farm lomon<br> 500gm pack' , salary:'$120'},
   {magproducturl:'./Images/2.jpg.png', h6:'snakes',p:'Best snakes with hazel nut pack <br>200gm',salary:'$145'},
   {magproducturl:'./Images/3.jpg.png', h6:'fruits',p:'Fresh organic apple 1kg simla<br>marming',salary:'$120'},
   {magproducturl:'./Images/9.jpg.png', h6:'fruits',p:'Organic fresh venila farm<br>watermelon 5kg',salary:'$50.30'},
   {magproducturl:'./Images/10.jpg.png', h6:'snacks',p:'Sweet crunchy nut mix 250gm<br>pack,salary',salary:'$120.30'},
   {magproducturl:'./Images/17.jpg.png', h6:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20'},
   {magproducturl:'./Images/13.jpg.png', h6:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20'},
   {magproducturl:'./Images/11.jpg.png', h6:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20'},
   {magproducturl:'./Images/12.jpg.png', h6:'Bakery',p:'Delicious white baked fresh bread<br>and toast',salary:'$20'},
   {magproducturl:'./Images/1.jpg.png', h6:'vegetables',p:'Fresh organic villa farm lomon<br> 500gm pack' , salary:'$120'},
   {magproducturl:'./Images/2.jpg.png', h6:'snakes',p:'Best snakes with hazel nut pack <br>200gm',salary:'$145'},
   {magproducturl:'./Images/3.jpg.png', h6:'fruits',p:'Fresh organic apple 1kg simla<br>marming',salary:'$120'},
   
]

// show product
function products(array = arrproduct){
    var emp = '';

for (let i = 0; i < array.length; i++) {
    
    
    emp += `
        <div class="img w-auto"  style="background-color:white ; margin:5px; border: 3px #E9E9E9 solid;">
         <img src="${array[i].magproducturl}" style="padding:13px ; width: 280px; height: 280px;" id="productimg"><h6 class="text-center" style="color: #777777;">${array[i].h6}</h6>
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
        // Search inside "p" or "h6" instead of name
        var description = arrproduct[index].p.toLowerCase();
        var category = arrproduct[index].h6.toLowerCase();

        if (description.includes(searchvalue) || category.includes(searchvalue)) {
            matchedvalue.push(arrproduct[index]);
        }
    }

    products(matchedvalue); // render filtered products
}

//filter
var filterCategory = document.getElementById("vegetablefilter");
filterCategory.onclick = function(){
    var matchcategory = [];
    for (let index = 0; index < arrproduct.length; index++) {
        
        
    }
}

 

