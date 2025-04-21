const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

let products = require("./products.json");

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/checkout", (req, res) => {
  const cartItems = req.body.cart;
  console.log("Checkout received:", cartItems);
  res.json({ message: "Order received. Thank you!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});