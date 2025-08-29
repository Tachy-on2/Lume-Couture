window.addEventListener('DOMContentLoaded', function () {
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Ensure each item has a quantity
    cart = cart.map(function (item) {
        if (!item.quantity) item.quantity = 1;
        return item;
    });
    var container = document.getElementById('cart-items');
    function renderCart() {
        if (cart.length === 0) {
            container.innerHTML = `
                <div class="default-message">
                    <img src="/assets/imgs/Icons/cart.png" alt="">
                    <p>YOUR SHOPPING BAG IS EMPTY</p>
                    <a href="shop.html">Continue Shopping</a>
                </div>`;
                document.getElementById('total-amount').textContent = '0.00';
            return;
        }
        var total = 0;
        container.innerHTML = cart.map(function (item, idx) {
            var priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            var itemTotal = priceNum * item.quantity;
            total += itemTotal;
            return `
        <div class="cart-grid">
         <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" />
            <div class="item-details">
             <p class="name">${item.name}</p>
             <p class="item-total">Price: $${itemTotal.toFixed(2)}</p>
            </div>
          <div class="quantity-controls">
            <button class="decrease" data-idx="${idx}">-</button>
            <p class="quantity">${item.quantity}</p>
            <button class="increase" data-idx="${idx}">+</button>
          </div>
          </div>
        </div>
      `;
        }).join('');
        // Add event listeners for +, -, remove
        container.querySelectorAll('.increase').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'));
                cart[idx].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });


        const totalAmountElement = document.getElementById('total-amount');
        totalAmountElement.textContent = total.toFixed(2);
        if (cart.length === 0) {
            totalAmountElement.textContent = '0.00';
        }

        container.querySelectorAll('.clear-cart').forEach(function (btn) {
            btn.addEventListener('click', function () {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        container.querySelectorAll('.decrease').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'));
                cart[idx].quantity--;
                if (cart[idx].quantity <= 0) {
                    cart.splice(idx, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
        container.querySelectorAll('.remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'));
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }
    renderCart();

    // Custom modal logic for checkout
    var checkoutBtn = document.getElementById('checkout-button');
    var modal = document.getElementById('checkout-modal');
    var closeModal = document.getElementById('close-modal');
    var modalOk = document.getElementById('modal-ok');
    if (checkoutBtn && modal && closeModal && modalOk) {
        checkoutBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        modalOk.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', function() {
        const products = document.querySelectorAll('.other-product-container > div');
        products.forEach(function(product) {
          const img = product.querySelector('a[href="shop.html"] img');
          const name = product.querySelector('[data-product-name]')?.textContent || '';
          const price = product.querySelector('[data-product-price]')?.textContent || '';
          if (img) {
            img.parentElement.addEventListener('click', function(e) {
              // Save product data to localStorage
              localStorage.setItem('selectedProduct', JSON.stringify({
                img: img.getAttribute('src'),
                name: name,
                price: price
              }));
            });
          }
        });
      });

      window.addEventListener('DOMContentLoaded', function() {
        const product = localStorage.getItem('selectedProduct');
        if (product) {
          const data = JSON.parse(product);
          const container = document.getElementById('selected-product');
          container.innerHTML = `
          <div class="selected-product">
            <img src="${data.img}" alt="${data.name}" />
            <div class="product-info">
              <div class="info-container">
                <p style="margin:0;">${data.name}</p>
                <p style="font-size:1em;">${data.price}</p>
              </div>
              <div class="add-to-cart">
                <img src="/assets/imgs/Icons/cart.png" alt="Add to Cart" />
              </div>
            </div>
          </div>
        `;
        }
      });

