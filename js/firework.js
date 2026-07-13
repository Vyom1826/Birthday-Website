/*=========================================================
  FIREWORK.JS
  Theatre Scene
=========================================================*/

// =========================
// ELEMENTS
// =========================

const leftCurtain = document.getElementById("leftCurtain");
const rightCurtain = document.getElementById("rightCurtain");

const ropeContainer = document.getElementById("ropeContainer");
const rope = document.getElementById("rope");
const ring = document.getElementById("ring");
const pulley = document.getElementById("pulley");

const stars = document.getElementById("stars");
const pullText = document.getElementById("pullText");

// Global functions from fireworks.js
// startFireworks()

let dragging = false;
let pulled = false;

let startY = 0;
let currentPull = 0;

const MAX_PULL = 180;

// =========================
// CREATE STARS
// =========================

createStars();

function createStars() {

    for (let i = 0; i < 220; i++) {

        const star = document.createElement("span");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.opacity = Math.random();

        star.style.animationDelay =
            Math.random() * 5 + "s";

        star.style.animationDuration =
            2 + Math.random() * 4 + "s";

        stars.appendChild(star);

    }

}

// =========================
// MOUSE EVENTS
// =========================

ring.addEventListener("mousedown", startDrag);

window.addEventListener("mousemove", drag);

window.addEventListener("mouseup", stopDrag);

// =========================
// TOUCH EVENTS
// =========================

ring.addEventListener("touchstart", startTouch);

window.addEventListener("touchmove", touchMove);

window.addEventListener("touchend", stopDrag);

// =========================

function startDrag(e) {

    if (pulled) return;

    dragging = true;

    startY = e.clientY;

}

function startTouch(e) {

    if (pulled) return;

    dragging = true;

    startY = e.touches[0].clientY;

}

function drag(e) {

    if (!dragging) return;

    updatePull(e.clientY);

}

function touchMove(e) {

    if (!dragging) return;

    updatePull(e.touches[0].clientY);

}

// =========================
// UPDATE ROPE
// =========================

function updatePull(y) {

    currentPull = y - startY;

    if (currentPull < 0)
        currentPull = 0;

    if (currentPull > MAX_PULL)
        currentPull = MAX_PULL;

    rope.style.transform =
        `translateY(${currentPull}px)`;

    pulley.style.transform =
        `rotate(${currentPull * 2}deg)`;

    if (currentPull >= MAX_PULL) {

        pulled = true;

        dragging = false;

        openCurtains();

    }

}

// =========================

function stopDrag() {

    if (pulled) return;

    dragging = false;

    rope.style.transition = ".4s";

    pulley.style.transition = ".4s";

    rope.style.transform = "translateY(0px)";

    pulley.style.transform = "rotate(0deg)";

    setTimeout(() => {

        rope.style.transition = "";

        pulley.style.transition = "";

    }, 400);

}

// =========================
// OPEN CURTAINS
// =========================

function openCurtains() {

    pullText.style.opacity = "0";

    leftCurtain.classList.add("open");

    rightCurtain.classList.add("open");

    // Rope goes upward

    ropeContainer.style.transition = "1.2s";

    ropeContainer.style.transform = "translateY(-300px)";

    ropeContainer.style.opacity = "0";

    setTimeout(() => {

        ropeContainer.style.display = "none";

    }, 1200);

    setTimeout(() => {

        startFireworks();

    }, 2200);

}