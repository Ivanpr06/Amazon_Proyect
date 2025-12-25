import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { moneyCentsToDollars } from "../utils/money.js";

export function renderPaymentSummary() {
    let PaymentHTML = '';
    let productsPriceCents = 0;
    // Con gastos de envio
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        let product = getProducts(cartItem.productId);
        productsPriceCents += product.priceCents * cartItem.quantity;

        let deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    let totalBeforeTaxes = productsPriceCents + shippingPriceCents;
    let taxesCents = Math.round(totalBeforeTaxes * 0.10);
    let totalCents = totalBeforeTaxes + taxesCents;

    PaymentHTML += `
    <div class="payment-summary-title">
        Order Summary 
    </div>

    <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">${moneyCentsToDollars(productsPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${moneyCentsToDollars(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${moneyCentsToDollars(totalBeforeTaxes)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${moneyCentsToDollars(taxesCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${moneyCentsToDollars(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `;

    document.querySelector('.payment-summary').innerHTML = PaymentHTML;
}