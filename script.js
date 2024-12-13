const q = (el) => document.querySelector(el);
const qa = (el) => document.querySelectorAll(el);

let cart = [];
let modalQt = 1;
let modalKey = 0;

let pizzaQt = document.querySelector('.pizzaInfo--qt');
let buttonLess = document.querySelector('.pizzaInfo--qtmenos');
let buttonMore = document.querySelector('.pizzaInfo--qtmais');
let buttonAddCart = q('.pizzaInfo--addButton');

pizzaJson.map((item, index) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);
    let pizzaArea = q('.pizza-area');

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        modalKey = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;


        let modalItem = q('.pizzaWindowArea')
        modalItem.style.opacity = 0;
        modalItem.style.display = 'flex';
        setTimeout(() => {
            modalItem.style.opacity = 1;
        })

        modalItem.querySelector('.pizzaBig img').src = item.img;
        let pizzaInfo = modalItem.querySelector('.pizzaInfo');

        pizzaInfo.querySelector('h1').innerHTML = item.name;
        pizzaInfo.querySelector('.pizzaInfo--desc').innerHTML = item.description;
        pizzaInfo.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
        pizzaInfo.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        let pizzaSize = pizzaInfo.querySelectorAll('.pizzaInfo--size');
        pizzaSize.forEach((size, index) => {

            if(index == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = item.sizes[index];

            size.addEventListener('click', (e) => {
                q('.pizzaInfo--size.selected').classList.remove('selected');
                size.classList.add('selected');
            })
        })

        pizzaQt.innerHTML = modalQt;
    })


    pizzaArea.append(pizzaItem)
});

function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 300)
}

buttonLess.addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
    }
    
    pizzaQt.innerHTML = modalQt
});

buttonMore.addEventListener('click', () => {
    if(modalQt >= 0) {
        modalQt++;
    }

    pizzaQt.innerHTML = modalQt
});

qa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

buttonAddCart.addEventListener('click', () => {
    let size = parseInt(q('.pizzaInfo--size.selected').getAttribute('data-key'));
    let qtd = modalQt;
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item) => item.identifier == identifier);
    if(key > -1) {
        cart[key].qtd += qtd;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qtd,
        });
    }

    updateCart();
    closeModal();
});

function updateCart() {
    if(cart.length > 0) {
        q('aside').classList.add('show');
    } else {
        q('aside').classList.remove('show');
    }
};