// ============================================
// GIFT PAGE
// Made with ❤️ for Mahi
// ============================================

// ------------------------------
// Elements
// ------------------------------

const gift = document.getElementById("gift");
const lid = document.getElementById("lid");
const bow = document.getElementById("bow");
const glow = document.getElementById("glow");
const particles = document.getElementById("particles");

const message = document.getElementById("giftMessage");
const title = document.getElementById("messageTitle");
const text = document.getElementById("messageText");

const continueBtn = document.getElementById("continueBtn");

// ------------------------------

let opened = false;
let typingFinished = false;

// ------------------------------
// Text
// ------------------------------

const heading = "Happy Birthday Mahi ❤️";

const body =

    `This little gift
contains every smile,
every memory,
and every wish
I have for you.

May this birthday
bring endless happiness,
love and beautiful moments.

Today is all about you.

Happy Birthday ❤️`;

// ============================================

bow.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    bow.style.pointerEvents = "none";

    openGift();

});

function openGift() {

    bow.animate([

        {

            transform: "translateX(-50%) scale(1)",

            opacity: 1

        },

        {

            transform: "translateX(-50%) scale(0)",

            opacity: 0

        }

    ], {

        duration: 500,

        fill: "forwards"

    });

    setTimeout(shakeGift, 500);

}

function shakeGift() {

    gift.animate([

        { transform: "rotate(0deg)" },

        { transform: "rotate(-4deg)" },

        { transform: "rotate(4deg)" },

        { transform: "rotate(-3deg)" },

        { transform: "rotate(3deg)" },

        { transform: "rotate(0deg)" }

    ], {

        duration: 800,

        easing: "ease-in-out"

    });

    setTimeout(openLid, 850);

}

function openLid() {

    lid.animate([

        {

            transform: "translateY(0) rotate(0deg)",

            opacity: 1

        },

        {

            transform: "translateY(-70px) rotate(-10deg)",

            opacity: 1

        },

        {

            transform: "translateY(-260px) rotate(-35deg)",

            opacity: 0

        }

    ], {

        duration: 1200,

        easing: "ease-out",

        fill: "forwards"

    });

    setTimeout(() => {

        lid.remove();

    }, 1200);

    setTimeout(startMagic, 500);

}

// ============================================
// START MAGIC
// ============================================

function startMagic() {

    // Show Glow

    glow.style.opacity = "1";

    glow.animate([

        {
            transform: "translateX(-50%) scale(.4)",
            opacity: 0
        },

        {
            transform: "translateX(-50%) scale(8)",
            opacity: 1
        }

    ], {

        duration: 1800,

        easing: "ease-out",

        fill: "forwards"

    });

    document.body.classList.add("screenGlow");

    setTimeout(() => {

        document.body.classList.remove("screenGlow");

    }, 900);

    createParticles();

    setTimeout(typeHeading, 1500);

}

// ============================================
// PARTICLES
// ============================================

function createParticles() {

    const symbols = [

        "✨",
        "💖",
        "🌸",
        "🦋",
        "⭐"

    ];

    for (let i = 0; i < 120; i++) {

        setTimeout(() => {

            const p = document.createElement("div");

            p.className = "particle";

            p.innerHTML =

                symbols[Math.floor(Math.random() * symbols.length)];

            p.style.left = Math.random() * 100 + "vw";

            p.style.bottom = "120px";

            p.style.fontSize =

                (16 + Math.random() * 18) + "px";

            p.style.setProperty(

                "--drift",

                Math.random() * 300 - 150

            );

            particles.appendChild(p);

            setTimeout(() => {

                p.remove();

            }, 4500);

        }, i * 40);

    }

    startMagicDust();

}

// ============================================

function startMagicDust() {

    setInterval(() => {

        if (!opened) return;

        const dust = document.createElement("div");

        dust.className = "particle";

        dust.innerHTML = "✨";

        dust.style.left =

            (48 + Math.random() * 4) + "%";

        dust.style.bottom = "160px";

        dust.style.fontSize =

            (8 + Math.random() * 10) + "px";

        dust.style.setProperty(

            "--drift",

            Math.random() * 70 - 35

        );

        particles.appendChild(dust);

        setTimeout(() => {

            dust.remove();

        }, 3500);

    }, 170);

}

// ============================================

function showMessage() {

    message.style.opacity = "1";

    message.style.animation = "letterRise 1.5s ease forwards";

}

// ============================================

function typeHeading() {

    showMessage();

    let i = 0;

    title.innerHTML = "";

    const timer = setInterval(() => {

        title.innerHTML += heading.charAt(i);

        i++;

        if (i >= heading.length) {

            clearInterval(timer);

            setTimeout(typeBody, 400);

        }

    }, 70);

}// ============================================

function typeHeading() {

    showMessage();

    let i = 0;

    title.innerHTML = "";

    const timer = setInterval(() => {

        title.innerHTML += heading.charAt(i);

        i++;

        if (i >= heading.length) {

            clearInterval(timer);

            setTimeout(typeBody, 400);

        }

    }, 70);

}

// ============================================

function typeBody() {

    let i = 0;

    text.innerHTML = "";

    const timer = setInterval(() => {

        if (body.charAt(i) == "\n") {

            text.innerHTML += "<br>";

        }

        else {

            text.innerHTML += body.charAt(i);

        }

        i++;

        if (i >= body.length) {

            clearInterval(timer);

            typingFinished = true;

            setTimeout(showContinueButton, 800);

        }

    })
}



// ============================================
// BUTTON SPARKLES
// ============================================

function createButtonSparkles() {

    const interval = setInterval(() => {

        if (continueBtn.style.display != "block") return;

        const sparkle = document.createElement("div");

        sparkle.className = "particle";

        sparkle.innerHTML = "✨";

        sparkle.style.left =

            (continueBtn.offsetLeft +
                continueBtn.offsetWidth / 2 +
                Math.random() * 80 - 40) + "px";

        sparkle.style.top =

            (continueBtn.offsetTop +
                Math.random() * 40) + "px";

        sparkle.style.fontSize =

            (10 + Math.random() * 8) + "px";

        sparkle.style.setProperty(

            "--drift",

            Math.random() * 80 - 40

        );

        particles.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 2500);

    }, 150);

}

// ============================================
// CONTINUE
// ============================================

continueBtn.addEventListener("click", goToFirework);

function goToFirework() {

    continueBtn.disabled = true;

    continueBtn.innerHTML = "Loading...";


    // Fade message

    message.style.transition = "1s";
    message.style.opacity = "0";

    // Fade glow

    glow.style.transition = "1s";
    glow.style.opacity = "0";

    // Fade gift

    gift.style.transition = "1s";
    gift.style.transform = "scale(.8)";
    gift.style.opacity = "0";

    // Fade particles

    document.querySelectorAll(".particle").forEach(item => {

        item.style.transition = "1s";
        item.style.opacity = "0";

    });

    // Fade screen

    document.body.style.transition = "1s";
    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "firework.html";

    }, 1200);

}

function showContinueButton() {

    continueBtn.style.display = "inline-block";

    setTimeout(() => {

        continueBtn.style.opacity = "1";

        continueBtn.style.animation = "buttonPop .8s ease forwards";

    }, 100);

}