import {cart, removeFromCard, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyCentsToDollars } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

function renderOrderSummary() {

  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

  const deliveryOption = deliveryOptions.find(option => {
    return option.id === cartItem.deliveryOptionId;
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${moneyCentsToDollars(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input quantity-input-${matchingProduct.id}" type="number" min="0">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let optionsHTML = "";

    deliveryOptions.forEach((deliveryOption) => {
      let today = dayjs();
      let deliveryDate = today.add(deliveryOption.deliveryDays, "days");

      let dateString = deliveryDate.format("dddd, MMMM D");

      let priceString = deliveryOption.priceCents === 0 ? "FREE" : `${moneyCentsToDollars(deliveryOption.priceCents)} -`;

      let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      optionsHTML +=
        `<div class="delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`;
    });

    return optionsHTML;
  }

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".update-quantity-link").forEach((linkUpdate) => {
    linkUpdate.addEventListener("click", () => {
      const quantityContainer = linkUpdate.closest(".product-quantity");
      quantityContainer.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((linkSave) => {
    linkSave.addEventListener("click", () => {
      const productSaveId = linkSave.dataset.productId;

      const quantityInput = document.querySelector(
        `.quantity-input-${productSaveId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 1 || newQuantity >= 1000) {
        alert("Quantity must be at least 1 and less than 1000");
        return;
      }

      updateQuantity(productSaveId, newQuantity);

      document.querySelector(`.quantity-label-${productSaveId}`).innerHTML =newQuantity;

      const quantityContainer = linkSave.closest(".product-quantity");
      quantityContainer.classList.remove("is-editing-quantity");

      updateCartQuantity();
    });
  });

  document.querySelectorAll(".delete-quantity-link").forEach((linkDelete) => {
    linkDelete.addEventListener("click", () => {
      let productDeleteId = linkDelete.dataset.productId;
      console.log(productDeleteId);

      removeFromCard(productDeleteId);

      let container = document.querySelector(`.cart-item-container-${productDeleteId}`);
      container.remove();
      updateCartQuantity();
    });
  });

  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    document.querySelector(".return-to-home-link").innerHTML = `${cartQuantity} items`;
  }
  updateCartQuantity();

  document.querySelectorAll(".delivery-option").forEach((optionElement) => {
    optionElement.addEventListener("click", () => {
      let {productId, deliveryOptionId} = optionElement.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });

  updateCartQuantity();
}


renderOrderSummary();