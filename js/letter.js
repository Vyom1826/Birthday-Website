// ===============================
// ELEMENTS
// ===============================

const wax = document.getElementById("wax");
const flap = document.getElementById("flap");
const preview = document.getElementById("letterPreview");
const envelope = document.getElementById("envelope");
const hint = document.getElementById("hint");

const diary = document.getElementById("diary");
const typing = document.getElementById("typing");
const signature = document.getElementById("signature");
const continueBtn = document.getElementById("continueBtn");

let unlocked = false;

// ===============================
// WAX CLICK
// ===============================

wax.addEventListener("click", () => {

    if (unlocked) return;

    unlocked = true;

    wax.style.transform =
        "translateX(-50%) scale(0) rotate(360deg)";

    wax.style.opacity = "0";

    flap.style.transform = "rotateX(180deg)";
    setTimeout(() => {

        flap.style.transition = "transform .8s ease, opacity .8s ease";

        flap.style.transform = "translateY(-120px) rotateX(180deg)";

        flap.style.opacity = "0";

        flap.style.pointerEvents = "none";

    }, 700);

    preview.style.bottom = "110px";

    hint.innerHTML = "📜 Pull the letter upward";

});

// ===============================
// DRAG LETTER (Desktop + Mobile)
// ===============================

let dragging = false;
let startY = 0;
let distance = 0;

preview.addEventListener("pointerdown", (e) => {

    if (!unlocked) return;

    dragging = true;

    startY = e.clientY;

    preview.setPointerCapture(e.pointerId);

});

preview.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    distance = startY - e.clientY;

    if (distance < 0) distance = 0;

    if (distance > 320) distance = 320;

    preview.style.transform = `translateY(${-distance}px)`;

});

preview.addEventListener("pointerup", () => {

    if (!dragging) return;

    dragging = false;

    if (distance > 220) {

        openDiary();

    } else {

        preview.style.transform = "translateY(0)";

    }

});

// ===============================
// OPEN DIARY
// ===============================

function openDiary() {

    envelope.style.transition = "1s";

    envelope.style.opacity = "0";

    hint.style.opacity = "0";

    setTimeout(() => {

        envelope.style.display = "none";

        hint.style.display = "none";

        diary.style.display = "block";

        typeLetter();

    }, 900);

}

// ===============================
// LETTER
// ===============================

const message = `Happy Birthday Mahi ❤️

Today is your special day.

I hope your smile never fades,
your dreams become reality,
and every moment of your life
is filled with happiness.

Thank you for being such
a wonderful person.

May this birthday bring
countless beautiful memories
and endless joy.

Happy Birthday once again! 🎂❤️`;

let i = 0;

function typeLetter() {

    if (i < message.length) {

        typing.innerHTML += message.charAt(i);

        i++;

        setTimeout(typeLetter, 35);

    }

    else {

        signature.style.display = "block";

        continueBtn.style.display = "block";

    }

}

// ===============================
// CONTINUE
// ===============================

continueBtn.addEventListener("click", () => {

    localStorage.setItem("letterDone", "true");

    window.location.href = "memory.html";

});