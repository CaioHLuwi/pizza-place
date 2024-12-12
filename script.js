import { pizzaJson } from "./pizzas.js";

function showPizza(){
    const pizzaArea = document.querySelector('.pizza-area');

    let pizzaItemElement = document.createElement('div');
    pizzaItemElement.classList.add('pizza-item')

    let aElement = document.createElement('a');
    let pizzaImgElement = document.createElement('div');


    

    console.log(pizzaJson)

    pizzaJson.forEach((pizza, index) => {
        pizzaArea.appendChild(createDiv('pizza-item'));
    })
    
}

function createPizza(classeDiv, classeDivImg, classeDivAdd){
    const div = document.createElement('div');
    div.classList.add(classeDiv);


    return div;
}

showPizza();