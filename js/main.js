//The user will enter a cocktail. 
//Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)

function getDrink () {
    let drink = document.getElementById('cocktailInput').value

    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`, { timeout: 10000 })
    .then(res => res.json()) //parse response as JSON
    .then(data => {
        console.log (data.drinks[0])
        document.querySelector('h2').innerText = data.drinks[0].strDrink
        document.querySelector('img').src = data.drinks[0].strDrinkThumb
        document.querySelector('#instructions').innerText = data.drinks[0].strInstructions

        //Display ingredients
        let ingredientsList = document.querySelector('#ingredientsList');
        ingredientsList.innerHTML = '';

        for(let i = 1; i <= 10; i++) {
            const ingredient = data.drinks[0][`strIngredient${i}`];
            const measure = data.drinks[0][`strMeasure${i}`];

            if (ingredient) {
                const listItem = document.createElement('li');
                listItem.innerText = `${measure ? measure + ' ' : ''}${ingredient}`;
                ingredientsList.appendChild(listItem);
            }

        }
    })
    .catch(err => {
        console.log(`error $ {err}`)
    });
}

