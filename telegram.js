let tg = window.Telegram.WebApp;
console.log();
let personal_info = tg.initDataUnsafe.user;
let username = '';
if (tg.initDataUnsafe.user) username = tg.initDataUnsafe.user.username;
let profile_name = document.querySelector("#profile_avatar > p");
function setName(){
    if (username) {
        profile_name.innerText = `${username}`;
    }
    else {
        profile_name.innerText = "Владимир"
    }
}

setName();