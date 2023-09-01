const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()
    const categories = data.data
    displayCategory(categories);
}
const displayCategory = (categories) => {
    const tabContainer = document.getElementById("tab-container");
    categories.forEach(category => {
        const div = document.createElement("div")
        div.innerHTML = `
        <a onclick="handleClick('${category.category_id}')" class="tab"><button class=" btn focus:bg-[#FF1F3D] focus:text-white">${category.category}</button></a> 
        `
        tabContainer.appendChild(div)
    });
}

const handleClick = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json()
    const categoryId = data.data
    displayCard(categoryId);
}
const displayCard = (categoryId) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";
    categoryId.forEach(itemId => {
       const div = document.createElement("div")
        div.innerHTML = `
        <div class="h-96 bg-base-100  ">
        <div class="object-cover">
        <figure><img class="w-full h-48" src=${itemId?.thumbnail }  alt="images" /></figure>
        </div>
            <div class="flex gap-4 p-3 my-2">
            <div class="w-1/5">
            <img class="w-10 h-10 rounded-full" src= ${itemId.authors[0].profile_picture} >
            </div>
            <div class="space-y-2"> 
            <p class="text-xl font-bold">${itemId.title}</p>
            <div class="flex  items-center gap-2">
            <p>${itemId.authors[0].profile_name}</p>
            <p><img src="./image/badge.png"></p>
            </div>
            <p ><span>${itemId.others.views}</span> views</p>
            </div>
            
        </div>
        </div>
        `
         cardContainer.appendChild(div)
    });
}
 
loadCategory()