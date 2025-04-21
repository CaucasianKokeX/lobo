let cart = [];
let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  showAffirmation();
  const res = await fetch("/api/products");
  products = await res.json();
  renderProducts(products);
});

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <strong>Ksh ${product.price}</strong><br>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) cart.push(product);
  alert(product.name + " added to cart!");
}

function showAffirmation() {
  const affirmations = [
    "You are enough, just as you are.",
    "Progress, not perfection.",
    "Your voice matters.",
    "You deserve joy and peace.",
    "Creativity flows through you."
  ];
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  console.log("Affirmation:", random);
}

async function checkout() {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  });
  const data = await res.json();
  alert(data.message);
}