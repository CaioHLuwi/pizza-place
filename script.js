const q = (el) => document.querySelector(el);
const qa = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);
    let pizzaArea = q('.pizza-area');

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;


    pizzaArea.append(pizzaItem)
});