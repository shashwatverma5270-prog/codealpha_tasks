const express = require("express");
const app = express();

app.use(express.json());

// Dummy data
let products = [
  {id:1, name:"Laptop", price:50000},
  {id:2, name:"Mobile", price:15000}
];

let users = [];
let orders = [];

// Home route
app.get("/", (req, res) => {
  res.send("MyShop Backend is Running ✅");
});

// Get products
app.get("/products", (req, res) => {
  res.json(products);
});

// Register user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.json({ message: "User Registered" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let user = users.find(u => u.email === email && u.password === password);

  if(user){
    res.json({ message: "Login Successful" });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// Place order
app.post("/order", (req, res) => {
  const order = req.body;
  orders.push(order);
  res.json({ message: "Order Placed Successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});