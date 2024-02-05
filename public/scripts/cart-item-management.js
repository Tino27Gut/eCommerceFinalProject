const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management");
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadges = document.querySelectorAll(".nav-items .badge");

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  // Updating the Cart

  // Updating the price of the item

  const responseData = await response.json();

  if(responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
  const cartItemTotalPrice =
    form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPrice.textContent =
      responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  // Updating the price of the total cart

  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  // Updating the badge next to the cart nav element

  for (const badge of cartBadges) {
    badge.textContent =
      responseData.updatedCartData.newTotalQuantity.toFixed(0);
  }
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
