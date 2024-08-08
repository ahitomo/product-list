// 変数定義--------------------------------------------------
// body
let addToCart = document.querySelector('.add-to-cart');

let addToCartArray = document.querySelectorAll('.add-to-cart');
let productImgArray = document.querySelectorAll('main img');

let imgConfirmedArray = [];
let divElementArray = [];
let inputElementArray = [];
let spinnerDowns = [];
let spinnerUps = [];

let productNameArray = document.querySelectorAll('.product-name');
let prices = document.querySelectorAll('.price span');

// nav
let cartQuantity = document.querySelector('.cart-quantity');
let emptyCart = document.querySelector('nav div div');

let confirmOrder = document.createElement('button');
confirmOrder.innerHTML = 'Confirm Order'; 
confirmOrder.classList.add('confirm-order');

let carbonNeutral = document.createElement('p');
carbonNeutral.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>This is a <span>carbon-neutral</span> delivery'
carbonNeutral.classList.add('carbon-neutral');

let orderTotal = document.createElement('div');
orderTotal.innerHTML = '<p>Order Total</p><h2>$<span></span></h2>'
orderTotal.classList.add('order-total');

let itemArray = [];
let productCalcArray = [];
let removeItemArray = [];

// modal
let modalBackground = document.querySelector('.modal-background');
let modal = document.querySelector('.modal');
let itemConfirmedArray = [];
let cartProductArray = [];

let startNewOrder = document.querySelector('.start-new-order');

// ----------------------------------------------------------

// 画面サイズに応じてmainの画像を切り替える
if (window.matchMedia('(max-width:680px)').matches) {
    for (let j = 0; j < productImgArray.length; j++) {
        productImgArray[j].src = 'assets/images/image-' + productImgArray[j].getAttribute('alt') + '-mobile.jpg';
    }
} else if (window.matchMedia('(max-width:960px)').matches) {
    for (let i = 0; i < productImgArray.length; i++) {
        productImgArray[i].src = 'assets/images/image-' + productImgArray[i].getAttribute('alt') + '-tablet.jpg';
    }
};

// Add to Cartのボタンのクリックイベント
for (let k = 0; k < addToCartArray.length; k++) {
    addToCartArray[k].addEventListener('click', function(event) {

        // 兄弟要素imgにclassList .borderを追加する
        let productImg = event.target.previousElementSibling;
        productImg.classList.add('border');
        let imgConfirmed = document.createElement('img');
        imgConfirmed.src = 'assets/images/image-' + productImg.getAttribute('alt') + '-thumbnail.jpg';
        imgConfirmed.classList.add('img-confirmed');
        imgConfirmedArray.push(imgConfirmed);


        // divの中にinputとspanを入れてスピンボタンを作成
        let divElement = document.createElement('div');
        divElement.classList.add('div');
        let inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'number');
        inputElement.setAttribute('value', 1);
        inputElement.setAttribute('min', 1);
        inputElement.setAttribute('step', 1);
        inputElement.setAttribute('readonly','readonly');
        inputElement.classList.add('input');

        let spinnerDown = document.createElement('span');
        spinnerDown.classList.add('spinner-down');
        spinnerDown.innerHTML = '-';

        let spinnerUp = document.createElement('span');
        spinnerUp.classList.add('spinner-up');
        spinnerUp.innerHTML = '+';

        divElement.appendChild(spinnerDown);
        divElement.appendChild(inputElement);
        divElement.appendChild(spinnerUp);

        // Add to Cartボタンをスピンボタンに置き換える
        divElementArray[k] = divElement;
        event.target.replaceWith(divElementArray[k]);
        inputElementArray[k] = inputElement;

        // navを変更
        if (cartQuantity.innerHTML == 0) {
        emptyCart.replaceWith(confirmOrder);
        confirmOrder.before(carbonNeutral);
        carbonNeutral.before(orderTotal);
        }

        cartQuantity.innerHTML = Number(cartQuantity.innerHTML) + 1;

        // カートの中身の計算領域を追加
        let item = document.createElement('div');
        item.classList.add('item');
        itemArray[k] = item;
        orderTotal.before(itemArray[k]);

        let cartContent = document.createElement('div');
        cartContent.classList.add('cart-content');
        item.appendChild(cartContent);

        let removeItem = document.createElement('div');
        removeItem.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>';
        removeItem.classList.add('remove-item');
        item.appendChild(removeItem);

        let cartProduct = document.createElement('p');
        cartProduct.innerHTML = productNameArray[k].innerHTML;
        cartProduct.classList.add('cart-product');
        cartContent.appendChild(cartProduct);
        
        let priceCalc = document.createElement('p');
        priceCalc.classList.add('price-calc');
        cartContent.appendChild(priceCalc);

        let inputValue = document.createElement('span');
        inputValue.innerHTML = inputElementArray[k].value + 'x';
        inputValue.classList.add('input-value');
        priceCalc.appendChild(inputValue);

        let unitPrice = document.createElement('span');
        unitPrice.innerHTML = '@$' + prices[k].innerHTML;
        unitPrice.classList.add('unit-price');
        priceCalc.appendChild(unitPrice);

        let productCalc = document.createElement('span');
        productCalc.innerHTML = '$' + (inputElementArray[k].value * prices[k].innerHTML).toFixed(2);
        productCalc.classList.add('product-calc');
        productCalcArray[k] = productCalc;
        priceCalc.appendChild(productCalcArray[k]);

        // カート金額合計
        let totalPrice = document.querySelector('.order-total h2 span');
        totalPrice.innerHTML = (Number(totalPrice.innerHTML) + Number(inputElementArray[k].value * prices[k].innerHTML)).toFixed(2);


        // スピンボタンの増減イベント
        spinnerDowns[k] = spinnerDown;
        spinnerUps[k] = spinnerUp;

        spinnerDowns[k].addEventListener('click', function() {
            if (inputElementArray[k].value > 1) {
                inputElementArray[k].value = Number(inputElementArray[k].value) - 1;
                inputValue.innerHTML = inputElementArray[k].value + 'x';
                productCalc.innerHTML = '$' + (inputElementArray[k].value * prices[k].innerHTML).toFixed(2);
                totalPrice.innerHTML = (Number(totalPrice.innerHTML) - Number(prices[k].innerHTML)).toFixed(2);
                cartQuantity.innerHTML--;
            }
        });

        spinnerUps[k].addEventListener('click', function() {
            inputElementArray[k].value = Number(inputElementArray[k].value) + 1;
            inputValue.innerHTML = inputElementArray[k].value + 'x';
            productCalc.innerHTML = '$' + (inputElementArray[k].value * prices[k].innerHTML).toFixed(2);
            totalPrice.innerHTML = (Number(totalPrice.innerHTML) + Number(prices[k].innerHTML)).toFixed(2);
            cartQuantity.innerHTML++;
        });
        
        // removeItemボタンのクリックイベント
        removeItemArray[k] = removeItem;
        removeItemArray[k].addEventListener('click', function() {
            // bodyを変更
            divElementArray[k].replaceWith(addToCartArray[k]);
            productImg.classList.remove('border');
            itemArray[k].remove();

            // navを変更
            cartQuantity.innerHTML = Number(cartQuantity.innerHTML) - Number(inputElementArray[k].value);
            totalPrice.innerHTML = (Number(totalPrice.innerHTML) - Number(inputElementArray[k].value * prices[k].innerHTML)).toFixed(2);

            imgConfirmedArray.splice(imgConfirmedArray.indexOf(imgConfirmed),1);
            imgConfirmedArray.filter(Boolean);

            // カートが空になった時の処理
            if (cartQuantity.innerHTML == 0) {
                confirmOrder.replaceWith(emptyCart);
                carbonNeutral.remove();
                orderTotal.remove();
            }
        });
    });
}

// ConfirmOrderボタンのクリックイベント
confirmOrder.addEventListener('click', function() {
    let cartProductArray = document.querySelectorAll('.cart-product');
    let OrderTotalConfirmed = document.querySelector('.order-total-confirmed');
    let inputValueArray = document.querySelectorAll('.input-value');
    let unitPriceArray = document.querySelectorAll('.unit-price');
    productCalcArray = document.querySelectorAll('.product-calc');

    for (let l = 0; l < cartProductArray.length; l++) {
        let itemConfirmed = document.createElement('div');
        itemConfirmed.classList.add('item-confirmed');
        OrderTotalConfirmed.before(itemConfirmed);

        let cartContentConfirmed = document.createElement('div');
        cartContentConfirmed.classList.add('cart-content-confirmed');
        itemConfirmed.appendChild(cartContentConfirmed);

        let flexStart = document.createElement('div');
        flexStart.classList.add('flex-start');
        cartContentConfirmed.appendChild(flexStart);

        let imgFrameConfirmed = document.createElement('div');
        imgFrameConfirmed.classList.add('img-frame-confirmed');
        imgFrameConfirmed.classList.add('img-frame-confirmed');
        flexStart.appendChild(imgFrameConfirmed);

        imgFrameConfirmed.appendChild(imgConfirmedArray[l]);

        let flexRow = document.createElement('div');
        flexRow.classList.add('flex-row');
        flexStart.appendChild(flexRow);

        let cartProductConfirmed = document.createElement('p');
        cartProductConfirmed.innerHTML = cartProductArray[l].innerHTML;
        cartProductConfirmed.classList.add('cart-product-confirmed');
        flexRow.appendChild(cartProductConfirmed);

        let inputValueConfirmed = document.createElement('p');
        inputValueConfirmed.innerHTML = inputValueArray[l].innerHTML;
        inputValueConfirmed.classList.add('input-value-confirmed');
        flexRow.appendChild(inputValueConfirmed);

        let unitPriceConfirmed = document.createElement('span');
        unitPriceConfirmed.innerHTML = unitPriceArray[l].innerHTML;
        unitPriceConfirmed.classList.add('unit-price-confirmed');
        inputValueConfirmed.appendChild(unitPriceConfirmed);

        let productCalcConfirmed = document.createElement('p');
        productCalcConfirmed.innerHTML = productCalcArray[l].innerHTML;
        productCalcConfirmed.classList.add('.product-calc-confirmed');
        itemConfirmed.appendChild(productCalcConfirmed);

        let totalPriceConfirmed = document.querySelector('.total-price-confirmed');
        let totalPrice2 = document.querySelector('.order-total h2 span');
        totalPriceConfirmed.innerHTML = '$' + totalPrice2.innerHTML;
        OrderTotalConfirmed.appendChild(totalPriceConfirmed);
    }

    if (cartProductArray.length > 3) {
        modal.classList.add('modal-scroll');
    } else {
        modal.classList.remove('modal-scroll');
    }
    modalBackground.style.display = 'block';
    let body = document.querySelector('body');
    console.log(body);
    body.style.overflowY = 'hidden';

    // Start New Orderボタンのクリックイベント
    startNewOrder.addEventListener('click', function() {
        location.href = 'index.html';
    });
});