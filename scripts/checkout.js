import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// async reduce codigo de promise
async function loadPage() {
    try {
        // await espera a que se resuelva la promesa
        await loadProductsFetch()

        const value = await new Promise((resolve) => {
            loadProducts(() => {
                resolve('value3');
            });
        });
    } catch (error) {
        console.error('Unexpected error. Please try again later.');
    }
    

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage()

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    }),
]).then((values) => {
    console.log(values);
    
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    console.log(value);

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/