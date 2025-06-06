// script.js

// Додаємо товари до кошика
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.btn_basket');

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.card01, .card02');
      const name = card.querySelector('h2')?.textContent || 'Unknown Game';
      const price = card.querySelector('.price').textContent;
      const img = card.querySelector('img').getAttribute('src');

      const game = { name, price, img };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(game);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} додано до кошика!`);
    });
  });

  // Відображення у кошику
  const basketContainer = document.getElementById('basket-container');
  if (basketContainer) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      basketContainer.innerHTML = '<p>Кошик порожній.</p>';
    } else {
      basketContainer.innerHTML = cart.map((item, index) => `
        <div class="besk-card">
          <img class="imgincard" src="${item.img}">
          <h2>${item.name}</h2>
          <h1 class="price1">${item.price}</h1>
          <button class="delet" onclick="removeItem(${index})">Видалити</button>
        </div>
      `).join('');
      basketContainer.innerHTML += `
        <p>
        <button id="order-btn" class="btn_basket1" onclick="showOrderForm()">Оформити замовлення</button></p>`
    }
  }
})
function completeorder() {
  // Форма замовлення
  const form = document.getElementById('order-form');
  form.style.display = 'none';
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Замовлення прийнято! Дякуємо!");
      localStorage.removeItem('cart');
      location.reload();
      closeOrderForm();
    });
  }}
function closeOrderForm() {
  // Закрити модальне вікно
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('order-form-modal').style.display = 'none';
    });
  }
}

// Видалення з кошика
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
function showOrderForm() {
  // Показати форму замовлення
  const formModal = document.getElementById('order-form-modal');
  if (formModal) {
    formModal.style.display = 'block';
  }
}

