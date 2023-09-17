let tg = window.Telegram.WebApp;
console.log();
let personal_info = tg.initDataUnsafe.user;
let username = "";
let first_name = "";
let last_name = "";
let product_id = "";

if (tg.initDataUnsafe.user) {
  username = tg.initDataUnsafe.user.username;
  first_name = tg.initDataUnsafe.user.first_name;
  last_name = tg.initDataUnsafe.user.last_name;
  profile_img_url = tg.initDataUnsafe.user.photo_url;
}
let profile_name = document.querySelector("#profile_avatar > p");
let profile_img = document.querySelector("#profile_image");
function setName() {
  if (username) {
    profile_name.innerText = `${first_name} ${last_name}`;
    profile_img.src = profile_img_url;
  } else {
    profile_name.innerText = "Иван Иванов";
    profile_img.src = 'profile_test.jpg';
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
    let data = commits.data;
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
    let data = commits.data;
    let headphones_cards = document.getElementsByClassName("headphones_cards");
    let watches_cards = document.getElementsByClassName("watches_cards");
    if (data.length % 2 == 0 && data.length != 0) {
      for (let i = 0; i < data.length; i += 2) {
        headphones_cards[0].insertAdjacentHTML(
          "beforeend",
          `<div class="products_row">
      <div class="card">
        <div class="card_image">
          <img src="card_image.png" />
        </div>
        <div class="card_info">
          <div class="card_price_info">
            <p class="card_price">${data[i].attributes.price} ₽</p>
            <p class="card_description">${data[i].attributes.name}</p>
          </div>
          <button class="gold_button" onclick="goToProduct(${
            data[i].id
          })">Купить</button>
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
          <button class="gold_button" onclick="goToProduct(${
            data[i + 1].id
          })">Купить</button>
        </div>
      </div>
    </div>`
        );
      }
    } else if (data.length == 1) {
      headphones_cards[0].insertAdjacentHTML(
        "beforeend",
        `<div class="products_row">
    <div class="card">
      <div class="card_image">
        <img src="card_image.png" />
      </div>
      <div class="card_info">
        <div class="card_price_info">
          <p class="card_price">${data[0].attributes.price} ₽</p>
          <p class="card_description">${data[0].attributes.name}</p>
        </div>
        <button class="gold_button" onclick="goToProduct(${data[0].id})">Купить</button>
      </div>
    </div>
  </div>`
      );
    } else if (data.length % 2 != 0) {
      for (let i = 0; i < data.length - 1; i += 2) {
        headphones_cards[0].insertAdjacentHTML(
          "beforeend",
          `<div class="products_row">
      <div class="card">
        <div class="card_image">
          <img src="card_image.png" />
        </div>
        <div class="card_info">
          <div class="card_price_info">
            <p class="card_price">${data[i].attributes.price} ₽</p>
            <p class="card_description">${data[i].attributes.name}</p>
          </div>
          <button class="gold_button" onclick="goToProduct(${
            data[i].id
          })">Купить</button>
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
          <button class="gold_button" onclick="goToProduct(${
            data[i + 1].id
          })">Купить</button>
        </div>
      </div>
    </div>`
        );
      }
      headphones_cards[0].insertAdjacentHTML(
        "beforeend",
        `<div class="products_row">
      <div class="card">
        <div class="card_image">
          <img src="card_image.png" />
        </div>
        <div class="card_info">
          <div class="card_price_info">
            <p class="card_price">${
              data[data.length - 1].attributes.price
            } ₽</p>
            <p class="card_description">${
              data[data.length - 1].attributes.name
            }</p>
          </div>
          <button class="gold_button" onclick="goToProduct(${
            data[data.length - 1].id
          })">Купить</button>
        </div>
      </div> 
      </div>`
      );
    }
  });
//разделение по категориям потом зах*ячу
async function getTrack(trackNum, eventObj) {
  eventObj.preventDefault();
  const response = await fetch(
    `https://api.track24.ru/tracking.json.php?apiKey=d7bd08383f431cf8913f1eb29585c01a&domain=localhost&pretty=true&code=${trackNum}`
  );
  const track = await response.json();
  console.log(track);
  let dostavka_content = document.querySelector(".dostavka_content");
  if (track.status == "ok" && document.getElementsByClassName('track_info').length <= 3) {
    dostavka_content.insertAdjacentHTML(
      "beforeend",
      `
    <div class="track_info">
                        <p class="track_info_header">Заказ номер ${trackNum}</p>
                        <p class="track_info_addrstate">Адрес доставки:</p>
                        <p class="track_info_state">${
                          track.data.destinationPostalAddress
                        }</p>
                        <p class="track_info_addrstate">Текущий статус:</p>
                        <p class="track_info_state">${
                          track.data.events[track.data.events.length - 1]
                            .operationAttributeTranslated
                        }</p>
                      </div>`
    );
  } else {
    dostavka_content.innerText('ОШИБКА');
  }
}
// getTrack('LV668867798CN');
//методы для отображения нужного товара на странице продукта
function testMessage(id) {
  product_id = id;
}
function goToProduct(num) {
  if (tg.initDataUnsafe.user) {
    product_id = num;
    tg.openInvoice("https://applepodsblack.ru/product.html");
  }
}
//функция для смены цвета при нажатии на вариант
function changeVarColor(id) {
  let variants = document.getElementsByClassName("variant");
  for (let elem of variants) {
    elem.style.border = "none";
    elem.style.opacity = "50%";
  }
  variants[id].style.border = "2px solid var(--Yellow-gradient, #f5ea99)";
  variants[id].style.opacity = "100%";
  let styles = window.getComputedStyle(variants[id]);

  $(".product_page_header")
    .trigger("remove.owl.carousel", [0])
    .trigger("refresh.owl.carousel");
  $(".product_page_header")
    .owlCarousel(
      "add",
      `<image style="width:376px; height:260px" src="${variants[id].src}"></image>`
    )
    .owlCarousel("update");
}
//функция для кастомного dropdawn
function dropdawn(button_div, content_div) {
  let content = document.querySelector(`#${content_div}`);
  let button = document.querySelector(`#${button_div}`);
  let styles = getComputedStyle(content);
  if (styles.display == "flex") {
    content.style.display = "none";
    button.src = "arrow_down.svg";
  } else {
    content.style.display = "flex";
    button.src = "arrow_up.svg";
  }
}
//функция смены валюты
function changeCurrency(event) {
  let currency_div = document.querySelector("#main_info_currencylogo");
  if (event.target.value == "rub") {
    currency_div.innerText = "₽ RUB";
  } else if (event.target.value == "eur") {
    currency_div.innerText = "€ EUR";
  } else if (event.target.value == "byn") {
    currency_div.innerText = "Br BYN";
  }
}
//функция для загрущки и отображения данных товара на отдельной странице
async function productPage() {
  let response = await fetch(
    "https://pop.applepodsblack.ru/api/products?populate=deep"
  );
  let data = await response.json();
}
