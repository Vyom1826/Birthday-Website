// ============================
// ELEMENTS
// ============================

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

const hero = document.querySelector(".hero");
const subtitle = document.querySelector(".subtitle");
const title = document.querySelector(".title");
const teddy = document.querySelector(".teddy");
const message = document.querySelector(".message");
const button = document.querySelector(".start-btn");

// ============================
// INITIAL STATE
// ============================

subtitle.style.opacity = "0";
title.style.opacity = "0";
teddy.style.opacity = "0";
message.style.opacity = "0";
button.style.opacity = "0";

subtitle.style.transform = "translateY(20px)";
title.style.transform = "translateY(20px)";
teddy.style.transform = "translateY(20px)";
message.style.transform = "translateY(20px)";
button.style.transform = "translateY(20px)";

// ============================
// REVEAL ANIMATION
// ============================

window.onload = () => {

    setTimeout(() => {
        reveal(subtitle);
    }, 500);

    setTimeout(() => {
        reveal(title);
    }, 1200);

    setTimeout(() => {
        reveal(teddy);
    }, 1900);

    setTimeout(() => {
        reveal(message);
    }, 2700);

    setTimeout(() => {
        reveal(button);
    }, 3500);

};

// ============================
// REVEAL FUNCTION
// ============================

function reveal(element) {

    element.style.transition = ".8s ease";

    element.style.opacity = "1";

    element.style.transform = "translateY(0)";

}

// ============================
// MUSIC CONTROL
// ============================

let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {

        bgMusic.play();

        musicBtn.innerHTML = "🔊";

        playing = true;

    }

    else {

        bgMusic.pause();

        musicBtn.innerHTML = "🔇";

        playing = false;

    }

});

// ============================
// BUTTON CLICK
// ============================

button.addEventListener("click", (e) => {

    e.preventDefault();

    document.body.style.transition = ".8s";

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "memory.html";

    }, 800);

});