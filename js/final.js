// ==============================
// ELEMENTS
// ==============================

const petals = document.getElementById("petals");

const introText = document.getElementById("introText");

const birthdayText = document.getElementById("birthdayText");

const wishText = document.getElementById("wishText");

const heart = document.getElementById("heartContainer");

const finalMessage = document.getElementById("finalMessage");

// ==============================
// CREATE PETALS
// ==============================

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.animationDuration =
        (6 + Math.random() * 5) + "s";

    petal.style.animationDelay =
        Math.random() * 2 + "s";

    petal.style.opacity =
        0.5 + Math.random() * 0.5;

    petal.style.transform =
        `scale(${0.6 + Math.random() * 0.8})`;

    petals.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 12000);

}

setInterval(createPetal, 250);

// ==============================
// INTRO
// ==============================

setTimeout(() => {

    introText.classList.remove("hidden");

    introText.classList.add("show");

}, 1500);

// ==============================
// SHOW BIRTHDAY
// ==============================

setTimeout(() => {

    introText.style.opacity = "0";

}, 6500);

setTimeout(() => {

    introText.style.display = "none";

    birthdayText.classList.remove("hidden");

    birthdayText.classList.add("show");

}, 7600);

// ==============================
// WISHES
// ==============================

setTimeout(() => {

    wishText.classList.remove("hidden");

    wishText.classList.add("show");

}, 9800);

// ==============================
// HEART
// ==============================

setTimeout(() => {

    heart.classList.remove("hidden");

    heart.classList.add("show");

}, 12800);

// ==============================
// FINAL MESSAGE
// ==============================

setTimeout(() => {

    finalMessage.classList.remove("hidden");

    finalMessage.classList.add("show");

}, 15500);

// ==============================
// OPTIONAL:
// Soft page fade-in
// ==============================

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "2s";

    document.body.style.opacity = "1";

});