// console.log("product.js loaded")


// // let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];



// function addToCart(product,quantity) {
//     // console.log("addToCart received:", product);
// console.log("THIS IS MY ADDTOCART");

//    let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
// console.log("Saving to localStorage:", cartArray);
     
// const existing = cartArray.find(item => item.id === product.id);

//   if (existing) {
//     existing.quantity += 1;
//   } else {

//   cartArray.push({
//     id: product.id,
//     name: product.name,
//     price: product.price,
//     img: product.image,
//     quantity: 1
//   });

//   localStorage.setItem("cartProducts", JSON.stringify(cartArray));
//     badgeUpdate(cartArray);
//       renderCartModal();   // modal version

// }




// if(window.location.pathname.includes("products.html")) {
    
// document.addEventListener("DOMContentLoaded", () => {

//  const productsContainer = document.getElementById("product-container");

// if (!productsContainer) {
//   console.log("❌ No .products-container found — skipping product rendering");
//   return;
// }

// console.log("✔ Found products container:", container);



// productData.forEach(product => {
//   const card = document.createElement("div");
//   card.classList.add("product-card");

//   card.innerHTML = `
//     <img  src="${product.image}" alt="${product.name}">
//     <h3>${product.name}</h3>
//     <p>$${product.price}</p>

//     <div class="product-rating">
//     ${"★".repeat(product.stars)}${"☆".repeat(5 - product.stars)}
//   </div>


//   <a href="product?id=${product.id}" class="viewProduct">View Details</a>
//    <input  type="number"  class="product-qty"  value="1"  min="1"
//     />
//   <button class="order-btn-rect" data-id="${product.id}">Add to Cart</button>
//   `;

//   card.querySelector(".order-btn-rect")
//       .addEventListener("click", () => addToCart(product,quantity));

//   productsContainer.appendChild(card);
// });
// function attachAddToCartHandlers() {
//   document.querySelectorAll(".order-btn-rect").forEach(button => {
//     button.addEventListener("click", (e) => {
//       const card = e.currentTarget.closest(".product-card");
//       const quantity = Number(card.querySelector(".product-qty").value);
//       const productId = Number(e.currentTarget.dataset.id);
//       const product = productsList.find(p => p.id === productId);

//       addToCart(product, quantity);
//       updateCartBadge(); // ⭐ REQUIRED
//     });
//   });
// }

//   // 3. Update badge on page load
//   badgeUpdate();

// }


// }






console.log("product.js loaded");

// GLOBAL addToCart stays OUTSIDE the if
function addToCart(product, quantity) {
  console.log("THIS IS MY ADDTOCART");

  let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const existing = cartArray.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cartArray.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image,
      quantity: quantity
    });
  }

  localStorage.setItem("cartProducts", JSON.stringify(cartArray));
  badgeUpdate(cartArray);
  renderCartModal();
}

// PRODUCTS PAGE ONLY
if (window.location.pathname.includes("products.html")) {

  document.addEventListener("DOMContentLoaded", () => {

    const productsContainer = document.getElementById("product-container");

    if (!productsContainer) {
      console.log("❌ No #product-container found");
      return;
    }

    console.log("✔ Found products container:", productsContainer);

    // 1. Render products
    productData.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>

        <div class="product-rating">
          ${"★".repeat(product.stars)}${"☆".repeat(5 - product.stars)}
        </div>

        <a href="product?id=${product.id}" class="viewProduct">View Details</a>

        <input type="number" class="product-qty" value="1" min="1">

        <button class="order-btn-rect" data-id="${product.id}">
          Add to Cart
        </button>
      `;

      productsContainer.appendChild(card);
    });

    // 2. Attach handlers AFTER rendering
    document.querySelectorAll(".order-btn-rect").forEach(button => {
      button.addEventListener("click", (e) => {
        const card = e.currentTarget.closest(".product-card");
        const quantity = Number(card.querySelector(".product-qty").value);
        const productId = Number(e.currentTarget.dataset.id);
        const product = productData.find(p => p.id === productId);

        addToCart(product, quantity);
        badgeUpdate();
      });
    });

    // 3. Update badge on load
    badgeUpdate();
  });
}



