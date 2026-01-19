import { orders } from '../data/orders.js';
import { getProducts, loadProductsFetch, products } from '../data/products.js';
import { moneyCentsToDollars } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateCartQuantity, addToCard } from '../data/cart.js';

async function loadPage() {
  await loadProductsFetch();

  let orderHTML = '';

  const url = new URL(window.location.href);
  let search = url.searchParams.get('search');

  if (search) {
    search = search.toLowerCase();
  }

  orders.forEach(order => {
    const productsHTML = productsListHTML(order);

    if (search && productsHTML === '') {
      return '';
    }

    orderHTML += `
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D, YYYY')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${moneyCentsToDollars(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsListHTML(order)}
          </div>
        </div>
        `;
  });
  document.querySelector('.orders-grid').innerHTML = orderHTML;

  function productsListHTML(order) {
    let productsOrderHTML = '';

    if (!order.products) {
      return '';
    }

    order.products.forEach((productDetails) => {
      const product = getProducts(productDetails.productId);

      if (search && !product.name.toLowerCase().includes(search)) {
        return '';
      }
      
      productsOrderHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D, YYYY')}
        </div>
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary" data-product-id="${product.id}">>
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
    });

    return productsOrderHTML;
  }


  document.querySelector('.orders-grid').innerHTML = orderHTML;

  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    document.querySelector(".cart-quantity").innerHTML = `${cartQuantity}`;
  }
  updateCartQuantity();

  function buyAgain() {
    document.querySelectorAll(".buy-again-button").forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        addToCard(productId);
        updateCartQuantity();
      });
    });
  }
  buyAgain();

  function searchProduct() {
    search = document.querySelector('.search-bar').value;

    if (search.trim() !== "") {
      window.location.href = `orders.html?search=${search}`;
    }
  }

  document.querySelector('.search-bar').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchProduct();
    }
  });

  document.querySelector('.search-button').addEventListener('click', (e) => {
    searchProduct();
  });
}
loadPage();