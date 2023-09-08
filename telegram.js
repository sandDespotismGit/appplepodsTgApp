let tg = window.Telegram.WebApp;
console.log();
let personal_info = tg.initDataUnsafe.user;
let username = "";
let first_name = "";
let last_name = "";
if (tg.initDataUnsafe.user) {
  username = tg.initDataUnsafe.user.username;
  first_name = tg.initDataUnsafe.user.first_name;
  last_name = tg.initDataUnsafe.user.last_name;
}
let profile_name = document.querySelector("#profile_avatar > p");
function setName() {
  if (username) {
    profile_name.innerText = `${first_name} ${last_name}`;
  } else {
    profile_name.innerText = "Иван Иванов";
  }
}
setName();
fetch("https://pop.applepodsblack.ru/api/reviews")
  .then((response) => response.json())
  .then(function (commits) {
    console.log(commits);
    let data = commits.data;

    for (let elem of data) {
      console.log(elem.attributes.name);
      $(".slide_comments")
        .owlCarousel(
          "add",
          `<div>
        <div class="review">
          <p class="review_name">${elem.attributes.name}</p>
          <p class="review_comment">
            ${elem.attributes.text}
          </p>
        </div>
      </div>`
        )
        .owlCarousel("update");
    }
  });
fetch("https://pop.applepodsblack.ru/api/notifications")
  .then((response) => response.json())
  .then(function (commits) {
    console.log(commits);
    let data = commits.data;
    console.log("Это оно")
    console.log(data);
    for (let elem of data) {
      console.log(elem.attributes.name);
      $(".slide_header")
        .owlCarousel(
          "add",
          `<div class="header_message">
          <div id="header_message_left">
            <p id="manager_name">Артем</p>
            <p id="manager_position">Менеджер</p>
          </div>
          <div id="header_message_right"><p>${elem.attributes.text}</p></div>
        </div>`
        )
        .owlCarousel("update");
    }
  });
  fetch("https://pop.applepodsblack.ru/api/products")
  .then((response) => response.json())
  .then(function (commits) {
    console.log(commits);
    let data = commits.data;
    let headphones_cards = document.getElementsByClassName('headphones_cards'); 
    let watches_cards = document.getElementsByClassName('watches_cards');
    console.log(headphones_cards);
    console.log(watches_cards)
    console.log(data);
    for (let i = 0; i < data.length; i += 2) {
      headphones_cards[0].insertAdjacentHTML('beforeend', `<div class="products_row">
      <div class="card">
        <div class="card_image">
          <img src="card_image.png" />
        </div>
        <div class="card_info">
          <div class="card_price_info">
            <p class="card_price">${data[i].attributes.price} ₽</p>
            <p class="card_description">${data[i].attributes.name}</p>
          </div>
          <button class="gold_button">Купить</button>
        </div>
      </div>
      <div class="card">
        <div class="card_image">
          <img src="card_image.png" />
        </div>
        <div class="card_info">
          <div class="card_price_info">
            <p class="card_price">${data[i + 1].attributes.price} ₽</p>
            <p class="card_description">${data[i + 1].attributes.name}</p>
          </div>
          <button class="gold_button">Купить</button>
        </div>
      </div>
    </div>`)
      
    }
  });
  //разделение по категориям потом зах*ячу
