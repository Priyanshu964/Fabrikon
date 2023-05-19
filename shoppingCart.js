const cart = document.getElementById('cart');
let shoppingCart = document.querySelector('.shoppingCart')
cart.addEventListener('click', (e) => {
    e.preventDefault();
    shoppingCart.classList.toggle('active');
    document.querySelector('.aside-menu').classList.remove('active');
})
//------------------------------------- Open menu-------------------------------------------------------------------------
const menu = document.getElementById('menu');
menu.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.aside-menu').classList.toggle('active');
  shoppingCart.classList.remove('active');
})
// --------------------------------change color of nav bar------------------------------------------------------------------
document.addEventListener('scroll',()=>{
    const navbar= document.querySelector('.navbar');
    if(window.scrollY>0){
        navbar.classList.add('scrolled')
    }else{
        navbar.classList.remove('scrolled')
    }
})
// -----------------------------------Adding item in cart---------------------------------------------------------------------

let productCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productCart) {
    productCart = [];
}
const parentElement = document.querySelector(".buyItems");
const products = document.querySelectorAll('.card');
const total_price = document.getElementById('total-price');
//totalPrice
const total = function () {
    let sum = 0;
    productCart.forEach(item => {
        sum = sum + parseInt(item.price);
        console.log(sum);
    });
    return sum;
}
//2
// adding the item in cart
const updateShoppingCartHTML = function () {
    localStorage.setItem('shoppingCart', JSON.stringify(productCart));
    if (productCart.length > 0) {
        let result = productCart.map(product => {
            console.log(product);
            return `
            <li>
                <img src="${product.image}" width="60px" alt="">
                <div class="cart-item-text">
                    <div class="item-name">
                        <h5>${product.name}</h5>
                        <h5>&#8377 ${product.basePrice}</h5>
                        <div>
                            <button class="button-minus" data-id=${product.id}>-</button>
                            <small class="productCount">${product.count}</small>
                            <button class="button-plus" data-id=${product.id}>+</button>
                        </div>   
                    </div>
                </div>
            </li>
            `

        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden');
        total_price.innerHTML = total();
        document.querySelector('.checkout').addEventListener('click', () => {
            document.querySelector('.thankyou-message').classList.add('show')
            document.getElementById('backdrop').style.display='block';
            shoppingCart.classList.remove('active');
        });
        let close=document.getElementById('close');
        close.addEventListener('click',()=>{
            document.querySelector('.thankyou-message').classList.remove('show')
            document.getElementById('backdrop').style.display='none';
      })  

    } else {
        parentElement.innerHTML = `<h4>Your Cart is Empty</h4>`;
        document.querySelector('.checkout').classList.add('hidden');
        total_price.innerHTML = "0"
    }
}
//3
function updateProductsInCart(product) {
    // console.log(product);
    let flag = false;
    for (let i = 0; i < productCart.length; i++) {
        console.log(productCart[i].id, product.id);
        if (productCart[i].id == product.id) {
            flag = true;
            console.log('matched');
            productCart[i].count += 1;
            productCart[i].price = productCart[i].basePrice * productCart[i].count;
            // return;
        }

    }

    !flag && productCart.push(product);
}


// 1
products.forEach(product => {
    product.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {

            let popup = document.getElementById('icon');
            popup.classList.add('popup');
            setTimeout(() => {
                popup.classList.remove('popup')
            },400)


            const productID = e.target.dataset.productId;
            const productName = product.querySelector('.productName').innerHTML;
            const productPrice = product.querySelector('.productPrice').innerHTML;
            const productimg = product.querySelector('img').src;

            let productToCart = {
                name: productName,
                image: productimg,
                id: productID,
                count: 1,
                price: productPrice,
                basePrice: productPrice,
            }
            updateProductsInCart(productToCart);
            updateShoppingCartHTML();
        }
    })
});
//4
// increase and decrease the quantity
parentElement.addEventListener('click', e => {
    const pluse = e.target.classList.contains('button-plus');
    const minus = e.target.classList.contains('button-minus');
    if (pluse || minus) {
        for (let i = 0; i < productCart.length; i++) {
            if (productCart[i].id == e.target.dataset.id) {

                if (pluse) {
                    productCart[i].count += 1;
                }
                else if (minus) {
                    productCart[i].count -= 1;
                }
                productCart[i].price = productCart[i].basePrice * productCart[i].count;
            }
            if (productCart[i].count <= 0) {
                productCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
    }
})
updateShoppingCartHTML();




