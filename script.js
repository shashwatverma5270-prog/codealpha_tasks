let products = [
  {
    id:1,
    name:"Laptop",
    price:50000,
    category:"electronics",
  image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
  },
  {
    id:2,
    name:"Mobile",
    price:15000,
    category:"electronics",
    image:"https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg"
  },
  {
    id:3,
    name:"T-Shirt",
    price:500,
    category:"fashion",
    image:"https://m.media-amazon.com/images/I/71-3HjGNDUL._UL1500_.jpg"
  },
  {
    id:4,
    name:"Shoes",
    price:2000,
    category:"fashion",
    image:"https://m.media-amazon.com/images/I/81xXDjojYKS._UL1500_.jpg"
  }
];
function showProducts(data){
  let div = document.getElementById("products");
  div.innerHTML = "";

  data.forEach(p=>{
    div.innerHTML += `
    <div class="col-md-3 mb-4">
      <div class="card">

        <img src="${p.image}" alt="${p.name}">
        
        <h5>${p.name}</h5>

        <p>₹${p.price}</p>

        <button onclick="addToCart(${p.id})">
          Add to Cart 🛒
        </button>

      </div>
    </div>`;
  });
}

function filterCategory(cat){
  if(cat === "all") showProducts(products);
  else showProducts(products.filter(p => p.category === cat));
}

function searchProduct(){
  let val = document.getElementById("search").value.toLowerCase();
  showProducts(products.filter(p => p.name.toLowerCase().includes(val)));
}

function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let p = products.find(x => x.id === id);

  let exist = cart.find(x => x.name === p.name);
  if(exist) exist.qty++;
  else cart.push({...p, qty:1});

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 🛒");
}

showProducts(products);