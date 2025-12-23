export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCard(productId) {

  let matchingItem;

  cart.forEach((cardItem) => {
    if (productId === cardItem.productId) {
      matchingItem = cardItem;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: 1,
    });
  }
  saveToStorage();
}

export function removeFromCard(productId) {
  let newCard = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCard.push(cartItem);
    };
  });
  cart = newCard;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
   let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = Number(deliveryOptionId);
  saveToStorage();
}