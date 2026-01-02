import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  beforeEach(() => {
    document.querySelector(".test-container").innerHTML = `
      <div class="return-to-home-link"></div>
      <div class="order-summary"></div>
      <div class="payment-summary"></div>
    `;
  });

  it("displays the cart", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: 1,
    }]));

    loadFromStorage();
    renderOrderSummary();

    expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);
    expect(
      document.querySelector(`.quantity-label-${productId1}`).innerText
    ).toContain("1");
  });

  it("removes a product", () => {
    spyOn(localStorage, "setItem");

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: 1,
    }]));

    loadFromStorage();
    renderOrderSummary();

    document
      .querySelector(`.delete-quantity-link[data-product-id="${productId1}"]`)
      .click();

    expect(cart.length).toEqual(0);
  });

});