let carts = document.querySelectorAll('.add-cart');



let products = [
    {   name: 'Confetti',
        tag: 'images/confetti_orig.jpg',
        price: 6,
        inCart: 0,
    },
    {   name: 'Impending Storm',
        tag: 'images/impending-storm_2.jpg',
        price: 5,
        inCart: 0
    }
];


for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
        }else{
            product.inCart=1;
            cartItems = {
                [product.tag]: product
            }
        }   
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
        console.log("cart total is", product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
        console.log("cart total is", product.price);
    }    
}


function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
//JSON IN THE NEXT LINE SHOULD BE GREEN LIKE THE OBJECT IN LINE 90, NOT BLUE? 
//SO SHOULD CONSOLE IN LINE 90
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems) //NOT NEEDED
    if(cartItems && productContainer){
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            // MAX: changed to 'cart-product'
            productContainer.innerHTML += `
            <div class = "cart-product">
                <div class = "blankForCancel">
                    <ion-icon onclick="localStorage.removeItem(item)" name="close-circle"></ion-icon></div>
                <div class = "product-title">
                    <img src = ${item.tag} height = "25">
                    <span>&nbsp;&nbsp;${item.name}<span>
                </div>
                <div class = "price">${item.price}</div>
                <div class = "quantity">
                    <ion-icon class="decrease"
                    name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase"
                    name="arrow-dropright-circle"></ion-icon>
                </div>    
                <div class = "total">${item.inCart * item.price}</div>
            </div>
            `;
        });
        productContainer.innerHTML+= `
            <div class= "basketTotalContainer">
                <h4 class = "basketTotalTile">
                <span>Cart Total &nbsp;<span></h4>
                <h4 class = "basketTotal">
                &nbsp;$${cartCost}</h4>
            </div>
        `;
    }
}

function zeroClick(item){
    console.log("ZERO CLICKED")
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
        }else{
            product.inCart=0;
            cartItems = {
                [product.tag]: product
            }
        }   
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

    // let cartItems = localStorage.getItem("productsInCart");
    // cartItems = JSON.parse(cartItems);


onLoadCartNumbers();
displayCart();