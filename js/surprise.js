// ===========================================
// SPECIAL SURPRISE PAGE
// ===========================================

// Elements

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const hearts = document.getElementById("hearts");
const sparkles = document.getElementById("sparkles");

// Funny Messages

const texts = [

    "😂 Nice Try!",

    "😜 Nope!",

    "❤️ Click YES!",

    "🤭 Catch Me!",

    "🤣 Too Slow!",

    "😏 Wrong Choice!",

    "🥺 Please Click YES!",

    "😂 I Won't Let You!"

];

let tries = 0;
let escaped = false;





// ===========================================
// FLOATING HEARTS
// ===========================================

setInterval(() => {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.bottom = "-50px";

    heart.style.fontSize = (16 + Math.random() * 18) + "px";

    heart.animate([

        {

            transform: "translateY(0)",
            opacity: 1

        },

        {

            transform: `translateY(-110vh)
            translateX(${Math.random() * 200 - 100}px)`,

            opacity: 0

        }

    ], {

        duration: 6000 + Math.random() * 3000,

        easing: "linear"

    });

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}, 500);



// ===========================================
// SPARKLES
// ===========================================

setInterval(() => {

    const s = document.createElement("div");

    s.className = "sparkle";

    s.innerHTML = "✨";

    s.style.left = Math.random() * 100 + "vw";

    s.style.bottom = "-20px";

    s.style.fontSize = (10 + Math.random() * 8) + "px";

    s.animate([

        {

            transform: "translateY(0)",
            opacity: 1

        },

        {

            transform: "translateY(-100vh)",

            opacity: 0

        }

    ], {

        duration: 4000,

        easing: "linear"

    });

    sparkles.appendChild(s);

    setTimeout(() => {

        s.remove();

    }, 4000);

}, 250);



// ===========================================
// NO BUTTON ESCAPE
// ===========================================

noBtn.addEventListener("mousedown", escapeButton);

function escapeButton(e) {

    e.preventDefault();

    tries++;

    message.innerHTML =
        texts[tries % texts.length];

    if (!escaped) {

        escaped = true;

        const rect = noBtn.getBoundingClientRect();

        noBtn.style.position = "fixed";
        noBtn.style.left = rect.left + "px";
        noBtn.style.top = rect.top + "px";

    }

    // Shake first

    noBtn.style.animation = "shake .22s";

    setTimeout(() => {

        noBtn.style.animation = "";

        moveButton();

    }, 220);

}


// ===========================================
// MOVE BUTTON
// ===========================================

function moveButton() {

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const padding = 25;

    const maxX =
        document.documentElement.clientWidth
        - btnWidth
        - padding;

    const maxY =
        document.documentElement.clientHeight
        - btnHeight
        - padding;

    const minX = padding;
    const minY = padding;

    const yes = yesBtn.getBoundingClientRect();

    let x;
    let y;

    do {

        x = Math.floor(
            Math.random() * (maxX - minX)
        ) + minX;

        y = Math.floor(
            Math.random() * (maxY - minY)
        ) + minY;

    } while (

        x < yes.right + 40 &&
        x + btnWidth > yes.left - 40 &&
        y < yes.bottom + 40 &&
        y + btnHeight > yes.top - 40

    );

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

}


// ===========================================
// YES BUTTON
// ===========================================

yesBtn.addEventListener("click", () => {

    document.body.style.transition = "1s";

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "music.html";

    }, 1000);

});