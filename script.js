const q = (el) => document.querySelector(el);
const qa = (el) => document.querySelectorAll(el);

let cart = [];
let modalQt = 1;
let modalKey = 0;
let cartQt = 1;

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

            if (index == 2) {
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

let pizzaQt = document.querySelector('.pizzaInfo--qt');
let buttonLessModal = document.querySelector('.pizzaInfo--qtmenos');
buttonLessModal.addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
    }

    pizzaQt.innerHTML = modalQt
});

let buttonMoreModal = document.querySelector('.pizzaInfo--qtmais');
buttonMoreModal.addEventListener('click', () => {
    if (modalQt >= 0) {
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
    if (key > -1) {
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

q('.menu-openner').addEventListener('click', () => {
    q('aside').style.left = '0';
})

q('.menu-closer').addEventListener('click', () => {
    q('aside').style.left = '100vw';
})

function updateCart() {
    let menuMobile = document.querySelector('.menu-openner');
    menuMobile.querySelector('span').innerHTML = cart.length;

    if (cart.length > 0) {
        let pizzaItem = '';
        q('.cart').innerHTML = '';
        q('aside').classList.add('show');

        let subtotal = 0;
        let total = 0;

        for (let i in cart) {
            pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qtd;

            let pizzaCartItem = document.querySelector('.cart--item').cloneNode(true);
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
                default:
                    pizzaSize = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            pizzaCartItem.querySelector('img').src = pizzaItem.img;
            pizzaCartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            pizzaCartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;
            pizzaCartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qtd > 1) {
                    cart[i].qtd--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            })
            pizzaCartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qtd++;
                updateCart();

            })

            let pizzaCartArea = document.querySelector('.cart');
            pizzaCartArea.append(pizzaCartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        let cartArea = document.querySelector('.cart--details');
        cartArea.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        cartArea.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        cartArea.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        q('aside').classList.remove('show');
        q('aside').style.left = '100vh';
    }
};