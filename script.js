const q = (el) => document.querySelector(el);
const qa = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);
    let pizzaArea = q('.pizza-area');

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

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

        let pizzaSize = pizzaInfo.querySelectorAll('.pizzaInfo--size');
        pizzaSize.forEach((size, index) => {
            size.addEventListener('click', (e) => {
                pizzaSize.forEach(item => item.classList.remove('selected'));

                if(e.target.classList.contains('selected')) {
                    e.target.classList.remove('selected');
                } else {
                    e.target.classList.add('selected');
                }
            })
        })
    })


    pizzaArea.append(pizzaItem)
});