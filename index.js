const loadCategoris = () => {
    const url = `https://openapi.programming-hero.com/api/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}

// active dea. classlist
const removeClass = () => {
    const btns = document.querySelectorAll('.category-btn')
    btns.forEach(btn => btn.classList.remove('active'))

}

const loadCategoryFruit = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(fruits => displayCategoryFruit(fruits.plants))
        removeClass()
        const categoryBtn=document.getElementById(`category-btns-${id}`)
        categoryBtn.classList.add('active')
    document.getElementById('all-trees').classList.remove('active')

}

const displayCategoryFruit = (items) => {
    const fruitContainer = document.getElementById("all-plant-container")
    fruitContainer.innerHTML = "";
    items.forEach(item => {
        
        const fruitCard = document.createElement("div")
        fruitCard.innerHTML = `<div class="bg-white p-4 space-y-2 rounded-md">
                        <figure class="">
                            <img class="h-[180px] w-full rounded-lg" src=${item.image} alt="">
                        </figure>
                        <h1 class="font-bold">${item.name}</h1>
                        <p class="text-sm">A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green</p>
                        <div class="flex justify-between items-center">
                            <h1 class="bg-[#DCFCE7] text-[#15803D] p-2 rounded-3xl">${item.category}</h1>
                            <p class="">$${item.price}</p>
                        </div>
                        <button onclick="cartBtnCategories(${item.id})" class="btn active w-full rounded-3xl">Add to cart</button>
                       
                    </div>`
        fruitContainer.appendChild(fruitCard)

    })

}
// bill calculation
const totalBill=()=>{
    const totalPrice=document.getElementById('total-price').innerText;
  const convertedPrice=parseInt(totalPrice)
  const productPrice=document.getElementById('product-price').innerText
  const convertedProductPrice =parseInt(productPrice)
  const totalBill=convertedPrice + convertedProductPrice
  document.getElementById('total-price').innerText=totalBill;
}

const displayCategory = (category) => {
    const categoryContainer = document.getElementById('category-container')
    // categoryContainer.innerHTML=''
    category.forEach(cate => {
        // console.log(cate.category_name)
        const categoryElement = document.createElement("div")
        categoryElement.innerHTML = `<button id="category-btns-${cate.id}" onclick="loadCategoryFruit(${cate.id})" class='cursor-pointer hover:bg-[#15803D] hover:text-white w-full text-left p-2 rounded-md category-btn'>${cate.category_name}</button>`
        categoryContainer.appendChild(categoryElement)
    })
}

loadCategoris()
// add to cart
const cartBtn=(id)=>{
     const url=`https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(item=>displayCart(item.plants))
}

const displayCart=(items)=>{
    alert('this item added to the cart')
  const allValues=Object.values(items)
  const cartContainer=document.getElementById('cart-container');
  const div=document.createElement('div')
  div.innerHTML=`<div class="flex justify-between items-center bg-[#F0FDF4] p-2 rounded-md space-y-2">
                        <div>
                            <h1 class="font-bold">${allValues[2]}</h1>
                            <p><span id="product-price">${allValues[5]}</span> x 1</p>
                        </div>
                        <button class="btn bg-[#F0FDF4] border-none"><i class="fa-solid fa-xmark"></i></button>

                    </div>`
  cartContainer.appendChild(div)
  document.getElementById('calculator').classList.remove('hidden')
  totalBill()
  
}


// word detals
const showWordDetail=(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayWordDetail(data.plants))
}
const displayWordDetail=(plants)=>{
   
    
    const keys=Object.keys(plants)
    const values=Object.values(plants)
    // console.log(values[4])
    const modalContainer=document.getElementById('modal-container')
//  values.forEach(value=>{
    // console.log(value.name)
    modalContainer.innerHTML=`
    <div class="bg-white p-8 w-[450px] space-y-2">
        <h1 class="text-2xl font-bold">${values[2]}</h1>
        <img class="h-[300px] w-[400px] bg-cover rounded-lg" src=${values[1]} alt="">
        <p><span class="font-bold">Categories:</span>${values[4]}</p>
        <p><span class="font-bold">Price:</span>৳${values[5]}</p>
        <p><span class="font-bold">Description:</span>${values[3]}</p>
<div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    </div>
    `
    
    document.getElementById('detail_modal').showModal()
// })

}
    


// all plant btn
const allPlants = () => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then(res => res.json())
        .then(plant => displayAllPlant(plant.plants))
        removeClass()
    document.getElementById('all-trees').classList.add('active')
}



const displayAllPlant = (plants) => {
    const allPlantContainer = document.getElementById('all-plant-container')
    allPlantContainer.innerHTML = '';
    plants.forEach(plant => {
        // console.log(plant)
        const card = document.createElement('div')
        card.innerHTML = `<div class="bg-white p-4 space-y-2 rounded-md">
                        <figure class="">
                            <img class="h-[180px] w-full rounded-lg" src=${plant.image} alt="">
                        </figure>
                        <h1 onclick="showWordDetail(${plant.id})" class="font-bold cursor-pointer">${plant.name}</h1>
                        <p class="text-xs text-justify">${plant.description}</p>
                        <div class="flex justify-between items-center">
                            <h1 class="bg-[#DCFCE7] text-[#15803D] py-1 px-2 rounded-3xl">${plant.category}</h1>
                            <p class="">৳${plant.price}</p>
                        </div>
                        <button onclick="cartBtn(${plant.id})" class="btn active w-full rounded-3xl ">Add to cart</button>
                       
                    </div>`
        allPlantContainer.appendChild(card);
    })
}
allPlants()


const cartBtnCategories=(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCartCategories(data.plants))
}

const displayCartCategories=(plants)=>{
alert('this item added to the cart')
  const allCartValues=Object.values(plants)
  const cartContainer=document.getElementById('cart-container');
  const div=document.createElement('div')
  div.innerHTML=`<div class="flex justify-between items-center bg-[#F0FDF4] p-2 rounded-md space-y-2">
                        <div>
                            <h1 class="font-bold">${allCartValues[2]}</h1>
                            <p><span id="product-price">${allCartValues[5]}</span> x 1</p>
                        </div>
                        <button class="btn bg-[#F0FDF4] border-none"><i class="fa-solid fa-xmark"></i></button>

                    </div>`
  cartContainer.appendChild(div)
  document.getElementById('calculator').classList.remove('hidden')
  totalBill()
}


// category by modal
