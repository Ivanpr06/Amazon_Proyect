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
      quantity: quantity
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