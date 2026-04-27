
    
    function renderCart() {

  // ⭐ STEP 1 — SELECT DOM ELEMENTS (checkout page ONLY)
  const cartContainer = document.getElementById("cartContainer");
  const totalContainer = document.getElementById("cartSubtotal");


  // ⭐ STEP 2 — NULL CHECK (prevents crashes on other pages)
  if (!cartContainer || !totalContainer) {
    console.warn("Checkout DOM not found — renderCart() exiting.");
    return;
  }

  // ⭐ STEP 3 — LOAD CART STATE
  const cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];

  // ⭐ STEP 4 — EMPTY STATE (if cart is empty, show message)
  if (cartArray.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.innerHTML = "";
    return;
  }

  // ⭐ STEP 5 — RENDER EACH CART ITEM INTO HTML
  cartContainer.innerHTML = cartArray.map(item => {    
   return`
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">

      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="price">$${item.price}</p>
      </div>

      <div class="cart-item-qty">
        <button class="qty-btn decrease" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn increase" data-id="${item.id}">+</button>
      </div>

      <button class="remove-btn" data-id="${item.id}">Remove</button>
      <button class="save-for-later" data-id="${item.id}">Save for Later</button>
    </div>
  `}).join("");
  
  // ⭐ STEP 6 — CALCULATE TOTAL PRICE
  const total = cartArray.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // ⭐ STEP 7 — DISPLAY TOTAL PRICE
  totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;

  // ⭐ STEP 8 — ATTACH EVENT LISTENERS FOR +, −, REMOVE
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      updateQuantityCart(btn.dataset.id, +1);
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      updateQuantityCart(btn.dataset.id, -1);
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeCart(btn.dataset.id);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

document.querySelectorAll(".remove-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    removeCart(btn.dataset.id);
  });
});


// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("save-for-later")) {
//     const id = Number(e.target.dataset.id);
//     saveForLater(id);
//   }
// });



document.addEventListener("DOMContentLoaded", () => {
  renderSavedForLater();
});

document.addEventListener("DOMContentLoaded", () => {
  badgeUpdate(cartArray);
  updateQuantityCart();
});

