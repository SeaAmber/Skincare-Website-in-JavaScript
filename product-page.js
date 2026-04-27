
document.addEventListener("DOMContentLoaded", () => {
//  Load cart from localStorage and update badge
  const cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
  badgeUpdate(cartArray); // <-- use YOUR badge function name



      // 1. Get ID from URL
      const params = new URLSearchParams(window.location.search);
      const id = Number(params.get("id"));


    
  
 if (!Array.isArray(productData)) {
    console.error("Products array not loaded");
    return;
  }


// // 2. Find product
  const product = productData.find(p => p.id === id);



  if (!product) {
    document.getElementById("product-details").innerHTML =
      "<p>Product not found.</p>";
    return;
  }

// // 3. Render product
  const container = document.getElementById("product-details")
  .innerHTML = `
  <div classname="imageContainer">
     <img class="product-img" src="${product.image}"alt="${product.name}" >
     </div>
    <h1 class="priceName">${product.name}</h1>
    <p class="price">$${product.price}</p>
     <div class="product-stars">
      ${"★".repeat(5)}

    <button class="order-btn-rect">Add to Cart</button>
   `;

const addButton = document.querySelector(".order-btn-rect");
  addButton.dataset.id = product.id;

//   // 4. Add to Cart
  document.querySelector(".order-btn-rect").addEventListener("click", () => {
    addToCart(product, 1);
  });

// //   // 5. Save for Later
//   document.getElementById("save-for-later-btn").addEventListener("click", () => {
//     saveForLater(product.id);
//   });
});





