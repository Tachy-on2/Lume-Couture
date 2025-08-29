function toggleFavorite(element) {
        const highlighted = document.getElementById("highlighted-favorite");
        if (highlighted) {
          highlighted.removeAttribute("id");
          highlighted.src = "/assets/imgs/Icons/favorite.png";
        }
        element.firstElementChild.src =
          "/assets/imgs/Icons/highlighted favorite.png";
        element.firstElementChild.id = "highlighted-favorite";
      }

      function toggleMenMenu() {
        const menMenu = document.querySelector("aside");
        menMenu.classList.toggle("men-toggle");
        menMenu.style.display = menMenu.classList.contains("men-toggle") ? "block" : "none";
      }

      // Add event listeners to product images to store product data
      window.addEventListener('DOMContentLoaded', function() {
        const products = document.querySelectorAll('.product-gallery > div');
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