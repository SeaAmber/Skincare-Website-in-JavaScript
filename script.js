console.log("SCRIPT LOADED");

let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
let savedForLater = JSON.parse(localStorage.getItem("savingCart")) || [];
badgeUpdate(cartArray);

console.log("Parsed cartArray:", cartArray);
console.log("Parsed savedForLater:", savedForLater);




// --- Register Form Logic for register.html ---
if (window.location.pathname.includes('register.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('.register-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = form.elements['name'].value.trim();
                const email = form.elements['email'].value.trim();
                const password = form.elements['password'].value;
                if (!name || !email || !password) {
                    alert('Please fill in all fields.');
                    return;
                }
                // Simulate registration (replace with backend/API call if needed)
                alert('Account created for ' + name + '!');
                window.location.href = 'index.html';
            });
        }
    });
}
// --- Display Ordered Items for order-submitted.html ---
// if (window.location.pathname.includes('order-submitted.html')) {
//     document.addEventListener('DOMContentLoaded', function() {
//         const orderItemsDiv = document.getElementById('order-items');
//         const orderProducts = JSON.parse(sessionStorage.getItem('orderProducts') || '[]');
//         if(orderProducts.length > 0) {
//             orderItemsDiv.innerHTML = '<h3>Your Ordered Items:</h3>' + orderProducts.map(prod =>
//                 `<div style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
//                         <img src="${prod.img}" alt="${prod.name}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;">
//                         <div><strong>${prod.name}</strong><br><span style='font-size:0.95em;'>${prod.desc}</span></div>
//                 </div>`
//             ).join('');
//         } else {
//             orderItemsDiv.innerHTML = '<p>Thank you for your order! Your items are being processed.</p>';
//         }
//     });
// }
// --- Sign In Form Logic for signin.html ---
if (window.location.pathname.includes('signin.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        var form = document.querySelector('.signin-form');
        if(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Simulate successful sign in (add your logic here)
                window.location.href = 'index.html';
            });
        }
    });
}
// // --- Load Orders for orders.html ---
// if (window.location.pathname.includes('orders.html')) {
//     document.addEventListener('DOMContentLoaded', function() {
//         const ordersDiv = document.getElementById('orders-list');
//         const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
//         if (!orders.length) {
//             ordersDiv.innerHTML = '<p>You have no orders yet.</p>';
//             return;
//         }
//         ordersDiv.innerHTML = orders.map(order => `
//             <div class="order-card" style="border:1px solid #eee;padding:1em;margin-bottom:1em;border-radius:8px;">
//                <div><strong>Order Date:</strong> ${order.date}</div>
//                <div style="margin:0.5em 0 0 1em;">
//                   ${order.items.map(item => `<div>${item.qty} × ${item.name}</div>`).join('')}
//               </div>
//           </div>
//            `).join('');
//         });
//     }

// --- Display Ordered Items for order-submitted.html ---
// if (window.location.pathname.includes('order-submitted.html')) {
//     document.addEventListener('DOMContentLoaded', function() {
//         const orderItemsDiv = document.getElementById('order-items');
//         const orderProducts = JSON.parse(sessionStorage.getItem('orderProducts') || '[]');
//         if(orderProducts.length > 0) {
//             orderItemsDiv.innerHTML = '<h3>Your Ordered Items:</h3>' + orderProducts.map(prod =>
//                 `<div style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
//                         <img src="${prod.img}" alt="${prod.name}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;">
//                   <div><strong>${prod.name}</strong><br><span style='font-size:0.95em;'>${prod.desc}</span></div>
//                 </div>`
//             ).join('');
//         } else {
//             orderItemsDiv.innerHTML = '';
//         }
//         sessionStorage.removeItem('orderProducts');
//     });
// }



// --- Sign In Form Logic for signin.html ---
if (window.location.pathname.includes('signin.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        let form = document.querySelector('.signin-form');
        if(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Simulate successful sign in (add your logic here)
                window.location.href = 'index.html';
            });
        }
    });
}











// STEP 7 — UPDATE CART BADGE
// PLAIN ENGLISH: Count all quantities and update the badge number.
// CONCEPTS TO SEARCH: "reduce", "DOM textContent", "querySelector vs getElementById"
// function badgeUpdate(cartArray) {

//   const cart = cartArray || loadedCart();
//       let count = 0;
//  cart.forEach(item => {
//     count += item.quantity;
//   });

//     const badgeElement = document.getElementById("cart-badge");
//      if (!badgeElement) return;

// //    const cartArray = loadedCart();
// //   const totalItems = cartArray.reduce((sum, item) => sum + item.quantity, 0);

//   badgeElement.textContent = count;
// }

//  document.addEventListener("DOMContentLoaded", () => {
//   const cartArray = loadedCart();
//   badgeUpdate(cartArray);
// });


//Save both arrays: Cart Array and Saved for Later Array
function saveCart() {
  localStorage.setItem("cartProducts", JSON.stringify(cartArray));
}

function saveSavedForLater() {
  localStorage.setItem("savingCart", JSON.stringify(savedForLater));
}



function addToCart(product,quantity) {
    let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const existing = cartArray.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartArray.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cartProducts", JSON.stringify(cartArray));
  //  saveCart();
  badgeUpdate(cartArray);
  renderCartModal();   // modal version
}



function removeCart(id) {
  cartArray = cartArray.filter(item => item.id !== Number(id));
  saveCart();
  badgeUpdate(cartArray);
  renderCart();
  renderCartModal();
}



function updateQuantityCart(id, change) {
  const item = cartArray.find(p => p.id === Number(id));
  if (!item) return;

  item.quantity += change;

  if (item.quantity < 1) {
    removeCart(id);
    return;
  }

  saveCart();
  badgeUpdate(cartArray);
  renderCart();
  renderCartModal();
}



function saveForLater(id) {
      console.log("saveForLater CALLED with id:", id);
  const item = cartArray.find(p => p.id === id);
  if (!item) return;


// const exists = savedForLater.some(p => p.id === item.id);

//   if (!exists) {
//     savedForLater.push(item);
//   }

if (!savedForLater.some(p => p.id === item.id)) {
    savedForLater.push(item);
}

  cartArray = cartArray.filter(p => p.id !== id);

  saveCart();
  saveSavedForLater();
 renderCart();
  badgeUpdate(cartArray);
  renderCartModal();
  renderSavedForLater();
}



function moveBackToCart(id) {

  const item = savedForLater.find(p => p.id === id);
  if (!item) return;
  const existing = cartArray.find(p => p.id === id);
    
  if (existing) {
    existing.quantity += 1;
  } else {
     // If NOT in cart → add with quantity = 1
    cartArray.push({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: 1
    });
  }

  savedForLater = savedForLater.filter(p => p.id !== id);

  saveCart();
  saveSavedForLater();

  badgeUpdate(cartArray);
  renderCart();
  renderCartModal();
  renderSavedForLater();
}




function removeSaved(id) {
  savedForLater = savedForLater.filter(p => p.id !== id);
  saveSavedForLater();
  renderSavedForLater();
}


function renderSavedForLater() {
  const container = document.querySelector(".savedLaterContainer");
  if (!container) return;

  if (savedForLater.length === 0) {
    container.innerHTML = "<p>No saved items.</p>";
    return;
  }

  container.innerHTML = savedForLater.map(item => `
    <div class="saved-item">
        <img src="${item.img}" alt="${item.name}" class="saved-img">
      <p>${item.name}</p>
      <p>$${item.price}</p>
      <button onclick="moveBackToCart(${item.id})">Move to Cart</button>
      <button onclick="removeSaved(${item.id})">Remove</button>
    </div>
  `).join("");
}





function renderCartModal() {
  const container = document.getElementById("cart-modal-content");
  if (!container) return;

  if (cartArray.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  container.innerHTML = cartArray.map(item => `
    <div class="cart-item">
      <img src="${item.image}" class="cart-item-img">
      <p>${item.name}</p>
      <p>$${item.price}</p>

      <div class="qty-controls">
        <button class="minus" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="plus" data-id="${item.id}">+</button>
      </div>

      <button class="remove-btn" data-id="${item.id}">Remove</button>
      <button class="save-for-later" data-id="${item.id}">Save for Later</button>
    </div>
  `).join("");
}


function badgeUpdate(cartArray) {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;

  const total = cartArray.reduce((sum, item) => sum + item.quantity, 0);
  // badge.textContent = total > 0 ? total : "";
  badge.textContent = total
}


document.querySelectorAll(".order-btn-rect").forEach(button => {
  button.addEventListener("click", (e) => {
    const productId = Number(e.target.dataset.id);
  const card =  e.currentTarget.closest(".product-card");
    const quantity = Number(card.querySelector(".product-qty").value);
    const product = productData.find(p => p.id === productId); // ← THIS returns undefined
     console.log("CLICK HANDLER FIRED");
    addToCart(product,quantity);
    badgeUpdate();
  });
});
// });//this is to update badge and show on cart page on checkout.
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("order-btn-rect")) {
//     const id = Number(e.target.dataset.id);
//     const product = productData.find(p => p.id === id);
//     if (!product) return;

//     addToCart(product);
//   }
// });



document.addEventListener("click", (e) => {
  if (e.target.classList.contains("plus")) {
    updateQuantityCart(e.target.dataset.id, +1);
  }

  if (e.target.classList.contains("minus")) {
    updateQuantityCart(e.target.dataset.id, -1);
  }

  if (e.target.classList.contains("remove-btn")) {
    removeCart(e.target.dataset.id);
  }

  if (e.target.classList.contains("save-for-later")) {
    console.log("SCRIPT.JS loaded with id:")
    saveForLater(Number(e.target.dataset.id));
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart-modal");
  const modalContent = document.getElementById("cart-modal-content");

  // OPEN MODAL
  if (cartIcon && cartModal) {
    cartIcon.addEventListener("click", () => {
      cartModal.style.display = "flex";
      renderCartModal(); // refresh items inside modal
    });
  }

  // CLOSE MODAL (X button)
  if (closeCart && cartModal) {
    closeCart.addEventListener("click", () => {
      cartModal.style.display = "none";
    });
  }

  // CLOSE MODAL (click outside)
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Prevent closing when clicking inside modal
  if (modalContent) {
    modalContent.addEventListener("click", (e) => e.stopPropagation());
  }
});

    const goToCheckoutBtn = document.getElementById("go-to-checkout");

 // ⭐ GO TO CHECKOUT BUTTON
  if (goToCheckoutBtn) {
    goToCheckoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
}



// document.addEventListener("DOMContentLoaded", () => {
//   badgeUpdate();
//   renderSavedForLater();
//   renderCartModal();
// });













 











// document.addEventListener("DOMContentLoaded", () => {
//   const cartIcon = document.querySelector('.cart-icon');
//   const cartModal = document.getElementById('cart-modal');
//   const closeCartModal = document.getElementById('close-cart-modal');
//  const cartModalContent = document.getElementById('cart-modal-content');
//  const goToCheckoutBtn = document.getElementById('go-to-checkout');


//   // OPEN MODAL
//   if (cartIcon && cartModal) {
//     cartIcon.addEventListener('click', () => {
//       cartModal.style.display = 'flex';
//     });
//   }

//   // CLOSE MODAL
//   if (closeCartModal && cartModal) {
//     closeCartModal.addEventListener('click', () => {
//       cartModal.style.display = 'none';
//     });
//   }

//   // 3. STOP clicks inside modal from closing it
//   if (cartModalContent) {
//     cartModalContent.addEventListener("click", (e) => {
//       e.stopPropagation();
//     });
//   }

//   // 4. Clicking outside modal closes it
//   window.addEventListener("click", (e) => {
//     if (e.target === cartModal) {
//       cartModal.style.display = "none";
//     }
//   });


//  // 5. Checkout button
//   if (goToCheckoutBtn) {
//     goToCheckoutBtn.addEventListener("click", () => {
//       window.location.href = "checkout.html";
//     });
//   }
// });





  






  






//Refactoring the RenderCart function 
// ⭐ STEP 0 — WAIT FOR DOM TO EXIST
// document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------------------------------------
    // ⭐ GLOBAL CART MODAL LOGIC (runs on EVERY page)
    // ---------------------------------------------------------

    // ⭐ STEP 1 — GLOBAL DOM SELECTION (modal + icon)
//  const cartIcon = document.querySelector('.cart-icon');
//   const cartModal = document.getElementById('cart-modal');
//       const closeCartModal = document.getElementById('close-cart-modal');
    //   const cartItemsDiv = document.getElementById('cart-badge'); // This dom is null

        //  const cartContainer = document.getElementById("cart-items");

    // ⭐ STEP 2 — GLOBAL EVENT LISTENERS (modal open/close)
    // if (closeCartModal && cartIcon) {

    //     cartIcon.addEventListener("click", () => {
    //         cartModal.style.display = "flex";   // ⭐ SIDE EFFECT
    //     });
    // }

    // if (closeCartModal && cartIcon) {
    //     closeCartModal.addEventListener("click", () => {
    //         cartModal.style.display = "none";   // ⭐ SIDE EFFECT
    //     });
    // }
 
//     const goToCheckoutBtn = document.getElementById('go-to-checkout');// this dom is null

//     if (goToCheckoutBtn) {
//         goToCheckoutBtn.addEventListener("click", () => {
//             window.location.href = "checkout.html";  // ⭐ SIDE EFFECT
//         });
//     }
//       if (window.location.pathname.includes("checkout.html")) {
//         renderCart();
//     }
// });



    // ---------------------------------------------------------
    // ⭐ PAGE‑SPECIFIC LOGIC (runs ONLY on checkout.html)
    // -----------------------------------------------------
// ⭐ THIS FUNCTION ONLY RUNS ON checkout.html
// function renderCart() {
    // ---------------------------------------------------------
    // ⭐ STEP 1 — SELECT DOM ELEMENTS (checkout page ONLY)
    // ---------------------------------------------------------
    // const cartContainer = document.getElementById("cartContainer");   // local DOM
    // console.log("cartContainer reached:", cartContainer)
    // const totalContainer = document.getElementById("cartSubtotal");  // local DOM


    // ⭐ STEP 2 — NULL CHECK (prevents crashes on other pages)
    // if (!cartContainer|| !totalContainer) {
    //     console.warn("Cart DOM not found-exiting renderCart");
    //     return;
    // }


    // ---------------------------------------------------------
    // ⭐ STEP 3 — LOAD STATE
    // ---------------------------------------------------------
    // let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    // ---------------------------------------------------------
    // ⭐ STEP 4 — EMPTY STATE
    // ---------------------------------------------------------
    // if (cart.length === 0) {
    //     cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    //     totalContainer.innerHTML = "";
    //     return;
    // }

    // ---------------------------------------------------------
    // ⭐ STEP 5 — RENDER ITEMS
    // ---------------------------------------------------------
    // cartContainer.innerHTML = cart.map(item => `
    //      <div class="cart-item">
    //          <img src="${item.image}" />
    //         <h3>${item.name}</h3>
    //         <p>${item.price}</p>
    //      </div>
    // `).join("");

     // ---------------------------------------------------------
    // ⭐ STEP 6 — RENDER TOTALS
    // ---------------------------------------------------------
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    // cartSubtotal.innerHTML = `Total: $${total}`;

    // ---------------------------------------------------------
    // ⭐ STEP 7 — ATTACH EVENT LISTENERS (optional)
    // ---------------------------------------------------------
    // Example:
    // document.querySelectorAll(".remove").forEach(btn => {
    //     btn.addEventListener("click", removeItem);
    // });

// }


// --- Update Cart Badge Function ---
// function refreshCartBadge() {
//     const items = JSON.parse(localStorage.getItem('cartProducts')) || [];
//     const count = items.reduce((total, item) => total + (item.qty || 1), 0);
//     // Remove all but the first cart-badge if duplicates exist
//     const badges = document.querySelectorAll('#cart-badge');
//     if (badges.length > 1) {
//         for (let i = 1; i < badges.length; i++) {
//             badges[i].parentNode.removeChild(badges[i]);
//         }
//     }
//     const badge = document.getElementById('cart-badge');
//     if (badge) {
//         badge.textContent = count;
//         badge.style.display = 'inline-block';
//         badge.style.visibility = 'visible';
//     } else {
    //     const path = window.location.pathname;
    //     if (["/index.html", "/products.html", "/orders.html", "/checkout.html", "/"].includes(path)) {
    //         console.warn('No cart-badge element found on', path);
    //     }
    // }
//  }
// Cart modal interactivity for all pages (global)
// document.addEventListener('DOMContentLoaded', function() {
//     const cartIcon = document.querySelector('.cart-icon');
//     const cartModal = document.getElementById('cart-modal');
//     const closeCartModal = document.getElementById('close-cart-modal');
//     const cartItemsDiv = document.getElementById('cartContainer');
//     const goToCheckoutBtn = document.getElementById('checkout-btn');

//     function renderCart() {
//         let cart = JSON.parse(localStorage.getItem('cartProducts') || '[]');
//         if (!cart.length) {
//             cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
//             refreshCartBadge();
//             return;
//         }
//         cartItemsDiv.innerHTML = cart.map((prod, idx) =>
//             `<div style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
        //         <img src="${prod.img}" alt="${prod.name}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;">
        //         <div style="flex:1;">
        //             <strong>${prod.name}</strong><br>
        //             <span style='font-size:0.95em;'>${prod.desc}</span>
        //         </div>
        //         <input type="number" min="1" value="${prod.qty || 1}" data-idx="${idx}" class="cart-qty" style="width:45px;" />
        //         <button data-idx="${idx}" class="remove-cart-item" style="background:#e06d6d;color:#fff;border:none;border-radius:6px;padding:0.3em 0.7em;cursor:pointer;">Remove</button>
        //     </div>`
        // ).join('');
    //     refreshCartBadge();
    // }
    // if (closeCartModal && cartModal) {
    //     closeCartModal.addEventListener('click', function() {
    //         cartModal.style.display = 'none';
    //     });
    // }
    // window.addEventListener('click', function(e) {
    //     if (e.target === cartModal) {
    //         cartModal.style.display = 'none';
    //     }
    // });
    // if (cartItemsDiv) {
    //     cartItemsDiv.addEventListener('input', function(e) {
    //         if (e.target.classList.contains('cart-qty')) {
    //             let cart = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    //             const idx = parseInt(e.target.getAttribute('data-idx'));
    //             let newQty = Math.max(1, parseInt(e.target.value));
    //             cart[idx].qty = newQty;
    //             localStorage.setItem('cartProducts', JSON.stringify(cart));
    //             renderCart();
    //         }
    //     });
    //     cartItemsDiv.addEventListener('click', function(e) {
    //         if (e.target.classList.contains('remove-cart-item')) {
    //             let cart = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    //             const idx = parseInt(e.target.getAttribute('data-idx'));
    //             cart.splice(idx, 1);
    //             localStorage.setItem('cartProducts', JSON.stringify(cart));
    //             renderCart();
    //         }
    //     });
    // }
    // if (goToCheckoutBtn) {
    //     goToCheckoutBtn.addEventListener('click', function() {
  //Right here needs  fixing because it is not printing in the console.
        //     cartModal.style.display = 'none'; // This needs fixing because it is not printint in the console
        //     console.log("cartModal:",cartModal);
        //     window.location.href = 'checkout.html';
        // });
    // }

// // Make rectangle Order buttons on products page go to checkout
// // Unified Add to Cart handler for all .order-btn-rect buttons on any page
// document.addEventListener('DOMContentLoaded', function() {
//     document.body.addEventListener('click', function(e) {
//         if (e.target.classList.contains('order-btn-rect')) {
//             const btn = e.target;
//             const card = btn.closest('.product-card');
//             if (card) {
//                 const name = card.querySelector('h3')?.textContent || '';
//                 const img = card.querySelector('img')?.getAttribute('src') || '';
//                 const desc = card.querySelector('p')?.textContent || '';
//                 const qtyInput = card.querySelector('.product-qty');
//                 let qty = 1;
//                 if (qtyInput && !isNaN(parseInt(qtyInput.value))) {
//                     qty = Math.max(1, parseInt(qtyInput.value));
//                 }
//                 let cart = JSON.parse(localStorage.getItem('cartProducts') || '[]');
//                 let existing = cart.find(p => p.name === name);
//                 if (existing) {
//                     existing.qty += qty;
//                 } else {
//                    cart.push({name, img, desc, qty});
//                 }
//                 localStorage.setItem('cartProducts', JSON.stringify(cart));
//                 refreshCartBadge();
//             }
//         }
//     });
// });

          
// // Interactive Add to Cart buttons for Best Sellers (homepage)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
    // Handler removed; unified handler below handles all .order-btn-rect buttons
}
// Create Account Modal Interactivity
const createAccountLink = document.getElementById('create-account-link');
const registerModal = document.getElementById('register-modal');
const closeRegisterModal = document.getElementById('close-register-modal');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');

if (createAccountLink && registerModal) {
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
    });
}
if (closeRegisterModal && registerModal) {
    closeRegisterModal.addEventListener('click', function() {
        registerModal.style.display = 'none';
        if (registerMessage) registerMessage.textContent = '';
    });
}
// Optional: close modal when clicking outside content
window.addEventListener('click', function(e) {
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
        if (registerMessage) registerMessage.textContent = '';
    }
});
if (registerForm && registerMessage) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate registration success
        registerMessage.textContent = 'Account created! You can now sign in.';
        registerMessage.style.color = '#2ecc71';
        registerForm.reset();
    });
}

// // Radiant Glow Skincare JS

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

//     // Navigation active state
    const navItems = document.querySelectorAll('.nav-links li a');
    // Set active nav item based on current page
    function setActiveNav() {
        const path = window.location.pathname.split('/').pop();
        navItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (
                (path === '' || path === 'index.html') && href.includes('index.html') ||
                (path === 'about.html' && href.includes('about.html')) ||
                (path === 'products.html' && href.includes('products.html')) ||
                (path === 'orders.html' && href.includes('orders.html')) ||
                (path === 'contact.html' && href.includes('contact.html'))
            ) {
                link.classList.add('active');
            }
        });
    }
    setActiveNav();
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            navItems.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Contact form validation and feedback
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (form && formMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.style.color = '#e06d6d';
                return;
            }
            // Simulate successful submission
            formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
            formMessage.style.color = '#2ecc71';
            form.reset();
        });
    }
    // Make sign-in button interactive (works for both <a> and <button> with .signin-btn)
    const signinBtn = document.querySelector('.signin-btn');
    if (signinBtn) {
        signinBtn.addEventListener('click', function(e) {
            // If the button is not already a link, navigate to signin.html
            if (!signinBtn.href || signinBtn.getAttribute('href') === '#') {
                window.location.href = 'signin.html';
            }
        });
    }

    // Always refresh homepage when clicking the logo
    const logo = document.querySelector('.logo');
    if (logo) {
                logo.addEventListener('click', function(e) {
                    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                        e.preventDefault();
                        window.location.href = window.location.href.split('#')[0];
                        window.location.reload(true); // Force full reload (bypass cache)
                    }
                });
            }
});

  
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("order-btn-rect")) {
//     const id = Number(e.target.dataset.id);
//     const product = productData.find(p => p.id === id);
//     if (!product) return;

//     addToCart(product);
//   }
// });


