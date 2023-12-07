// Toggle class active untuk shopping cart
const shooppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shooppingCart.classList.toggle("active");
  e.preventDefault();
};

// Mengambil data cart dari local storage
const storedKeranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
const cart = storedKeranjang;

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, itemPrice) {
  const item = { name: itemName, price: itemPrice };
  cart.push(item);

  // Memperbarui tampilan keranjang
  updateCartDisplay();

  // Menyimpan keranjang ke dalam localStorage
  saveCartToLocalStorage();
}

// Fungsi untuk menghapus item dari keranjang
function removeFromcart(itemName, itemPrice) {
  // Cari indeks item yang akan dihapus
  const index = cart.findIndex(
    (item) => item.name === itemName && item.price === itemPrice
  );

  // Hapus item jika ditemukan
  if (index !== -1) {
    cart.splice(index, 1);
  }

  // Memperbarui tampilan keranjang
  updateCartDisplay();

  // Menyimpan keranjang ke dalam localStorage
  saveCartToLocalStorage();
}

// Fungsi untuk memperbarui tampilan keranjang pada halaman
function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  // Mengosongkan elemen keranjang sebelum diperbarui
  cartItemsElement.innerHTML = "";

  // Menambahkan setiap item ke dalam elemen keranjang
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Rp ${item.price.toFixed(3)}`;
    cartItemsElement.appendChild(listItem);
  });

  // Menghitung total harga dari seluruh item dalam keranjang
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  cartTotalElement.textContent = total.toFixed(3);

  // Menyimpan total harga ke dalam localStorage
  saveTotalToLocalStorage(total.toFixed(3));

  // Menetapkan nilai total harga ke dalam input dengan ID 'form-total'
  //document.querySelector(".form-total input").value = total.toFixed(3);
}

// Fungsi untuk menyimpan keranjang ke dalam localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("keranjang", JSON.stringify(cart));
  console.log(localStorage);
}

// Fungsi untuk menyimpan total harga ke dalam localStorage
function saveTotalToLocalStorage(total) {
  localStorage.setItem("total", total);
}

// Fungsi untuk memuat keranjang dari localStorage
function loadCartFromLocalStorage() {
  const storedKeranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  cart.push(...storedKeranjang);
}

// Memanggil fungsi updateCartDisplay untuk pembaruan awal
updateCartDisplay();
