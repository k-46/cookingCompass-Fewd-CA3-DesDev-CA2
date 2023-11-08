const randomName = document.getElementsByClassName("randomStrMeal")[0];
const randomCategory = document.getElementsByClassName("randomCategory")[0];
const randomImage = document.getElementById("randomImage");
const ingredientsList = document.getElementsByClassName("ingredient-list")[0];
const randomMeal = document.getElementsByClassName("randomMeal")[0];
const modal = document.getElementsByClassName("modal")[0];

const searchSection = document.getElementsByClassName("searchSection")[0];
const searchedText = document.getElementsByClassName("searchedText")[0];
const searchInput = document.getElementById("input");
const searchBtn = document.getElementsByClassName("searchBtn")[0];
const searchedList = document.getElementsByClassName("searched")[0];

// To get random meal
fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((e) => {
        console.log(e.meals[0])
        getrandomMeal(e.meals[0])
    })

// To append the random meal and the ingredients of it
function getrandomMeal(data) {
    randomName.textContent = data.strMeal;
    randomCategory.textContent = data.strCategory;
    randomImage.src = data.strMealThumb;
    let i = 1;
    let temp = ''
    while (data[`strIngredient${i}`]) {
        temp += `<li>${data[`strIngredient${i}`]}</li>`;
        i++;
    }
    ingredientsList.innerHTML = temp;
}

// To display the ingredients
function displayIngredients(option) {
    modal.style.display = `${option}`;
}

// EventListener for the Searched Item
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getSearched()
    }
})

function getSearched() {
    if (searchInput.value) {
        let api = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + searchInput.value;
        axios.get(`${api}`)
            .then((e) => {
                let temp = e.data.meals;
                let items = ''
                for (let i = 0; i < temp.length; i++) {
                    items += `<div class="searchItems flex">
                <img src="${temp[i].strMealThumb}" alt="">
                <h4>
                    ${temp[i].strMeal}
                </h4>
            </div>`
                }
                searchedText.textContent = searchInput.value;
                searchedList.innerHTML = items;
                searchSection.style.display = 'block'
            })
            .catch((e) => {
                searchSection.style.display = 'none'
            })
    }
}