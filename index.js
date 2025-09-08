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
        console.log(item)
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
                        <button class="btn active w-full rounded-3xl">Add to cart</button>
                       
                    </div>`
        fruitContainer.appendChild(fruitCard)

    })

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
        const card = document.createElement('div')
        card.innerHTML = `<div class="bg-white p-4 space-y-2 rounded-md">
                        <figure class="">
                            <img class="h-[180px] w-full rounded-lg" src=${plant.image} alt="">
                        </figure>
                        <h1 class="font-bold">${plant.name}</h1>
                        <p class="text-xs text-justify">${plant.description}</p>
                        <div class="flex justify-between items-center">
                            <h1 class="bg-[#DCFCE7] text-[#15803D] py-1 px-2 rounded-3xl">${plant.category}</h1>
                            <p class="">$${plant.price}</p>
                        </div>
                        <button class="btn active w-full rounded-3xl">Add to cart</button>
                       
                    </div>`
        allPlantContainer.appendChild(card);
    })
}
allPlants()