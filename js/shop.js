 // Display selected product from localStorage
      window.addEventListener('DOMContentLoaded', function() {
        var product = localStorage.getItem('selectedProduct');
        if (product) {
          var data = JSON.parse(product);
          var container = document.getElementById('selected-product');
          container.innerHTML = `
          <div class="selected-product">
            <img src="${data.img}" alt="${data.name}" />
            <p style="font-weight:bold;">${data.name}</p>
            <p>${data.price}</p>
            <button id="add-to-cart">Add to Cart</button>
          </div>
          `;
          var btn = document.getElementById('add-to-cart');
          btn.addEventListener('click', function() {
            var cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push(data);
            localStorage.setItem('cart', JSON.stringify(cart));
            btn.textContent = 'Added!';
            setTimeout(function(){ btn.textContent = 'Add to Cart'; }, 1000);
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