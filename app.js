// load Category data 

const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()
    const categories = data.data
    displayCategory(categories,);
}

// display category data 

const displayCategory = (categories) => {
    const tabContainer = document.getElementById("tab-container");
    categories.forEach(category => {
        const div = document.createElement("div")
        div.innerHTML = `
        <a onclick="handleClick('${category.category_id}')" class="tab"><button class="bg-gray-200 text-black font-medium rounded-md px-3 py-2 border-none  mt-5  focus:bg-[#FF1F3D] focus:text-white">${category.category}</button></a> 
        `
        tabContainer.appendChild(div)
    });
}

// load data through id 

const handleClick = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json()
    const categoryId = data.data
    displayCard(categoryId);
}

// display every id data 

const displayCard = (categoryId) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";

    categoryId.sort((a, b) => b.views - a.views)

    // use conditional to verify 

    if (categoryId.length === 0) {
        const noData = document.createElement("div")
         noData.classList.add("flex", "justify-center", "items-center","col-span-4", "h-full")
        noData.innerHTML = `
        <div class="mx-auto mt-2">
        <img class="mx-auto" src=./image/Icon.png >
        <p class="text-center text-xl font-bold">Oops!! Sorry, There is no <br> content here</p>
        </div>
        `
        cardContainer.appendChild(noData)
    }
    else {
   categoryId.forEach(itemId => {
    const div = document.createElement("div")
    div.className="card  mt-4 h-96 bg-base-100"
    div.setAttribute("views", itemId.others.views);
        div.innerHTML = `
        <div class="object-cover relative  ">
        <figure><img  class="w-full h-48 rounded-md " src=${itemId?.thumbnail }  alt="images" /></figure>
        <span class="absolute overflow-hidden bottom-[5%] left-[45%] bg-black text-white p-1 rounded-lg" >${itemId.others.posted_date ? convertSeconds(itemId.others.posted_date) : "" }</span>
        </div>
            <div class="flex gap-4 p-3 my-2">
            <div class="w-1/5">
            <img class="w-10 h-10 rounded-full" src= ${itemId?.authors[0]?.profile_picture} >
            </div>
            <div class="space-y-2"> 
            <p class="text-xl font-bold">${itemId?.title}</p>
            <div class="flex  items-center gap-2">
            <p>${itemId?.authors[0]?.profile_name}</p>
            <p>${itemId?.authors[0]?.verified ? '<img src="./image/badge.png">' : ''}</p>
            </div>
            <p ><span>${itemId?.others?.views}</span> views</p>
            </div>  
        </div>
        `
        cardContainer.appendChild(div)
    });
    }
}

// adding addEventListener to work with sorting data based on views 

document.addEventListener("DOMContentLoaded", () => {
    loadCategory();
    document.getElementById("view-button").addEventListener("click", sortByViews); 
});

// use sort by views function 

const sortByViews = () => {
    const cardContainer = document.getElementById("card-container");
    const categoryCards = Array.from(cardContainer.querySelectorAll(".card"));

    categoryCards.sort((a,b) => {
        const A = parseFloat(a.getAttribute("views"))
        const B = parseFloat(b.getAttribute("views"))
        return B - A;
    })
    cardContainer.innerHTML = "";
    categoryCards.forEach(card => {
    cardContainer.appendChild(card);
    });
}

// use function to convert seconds into hours and minutes

function  convertSeconds (seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours} hrs  ${minutes} min ago`
}

// call handleClick function to show card by default in the page 

handleClick("1000")
 
// <==================== The End ===================>