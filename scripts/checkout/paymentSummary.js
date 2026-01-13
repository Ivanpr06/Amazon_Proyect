import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import { moneyCentsToDollars } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

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

    document.querySelector('.place-order-button').addEventListener('click', async () => {
        try {
            if (cart.length === 0) {
                alert("Introduzca productos en el carrito")
            } else {
                const cartForBackend = cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    deliveryOptionId: String(item.deliveryOptionId)
                }));

                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cartForBackend
                    })
                });

                const order = await response.json();
                addOrder(order);

                window.location.href = 'orders.html';
                localStorage.removeItem('cart');
            }
            } catch (error) {
                console.log('Unexpected error. Try again later.');
            }
        });
}