class Cart {
    cartItems;
    // # = private
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [];
        }
    };

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCard(productId) {
        let matchingItem;

        this.cartItems.forEach((cardItem) => {
            if (productId === cardItem.productId) {
                matchingItem = cardItem;
            }
        });

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = quantitySelector ? Number(quantitySelector.value) : 1;

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: 1,
            });
        }
        this.saveToStorage();
    };

    removeFromCard(productId) {
        let newCard = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCard.push(cartItem);
            };
        });
        this.cartItems = newCard;
        this.saveToStorage();
    };

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    };

    updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.quantity = newQuantity;

        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = Number(deliveryOptionId);
        this.saveToStorage();
    };
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart-oop');

//console.log(cart);
//console.log(businessCart);