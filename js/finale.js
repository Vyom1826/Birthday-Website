/*=========================================================
    FINALE.JS
=========================================================*/

const birthdayMessage = document.getElementById("birthdayMessage");
const continueBtn = document.getElementById("continueBtn");

// ======================================
// GRAND FINALE
// ======================================

function showFinale() {

    let rounds = 0;

    const finale = setInterval(() => {

        // Launch many rockets together
        for (let i = 0; i < 10; i++) {

            rockets.push(new Rocket());

        }

        rounds++;

        if (rounds >= 8) {

            clearInterval(finale);

            // Wait for fireworks to finish
            setTimeout(startGoldenRocket, 2500);

        }

    }, 300);

}

// ======================================
// GOLDEN ROCKET
// ======================================

function startGoldenRocket() {

    const rocket = {

        x: canvas.width / 2,

        y: canvas.height + 40,

        target: canvas.height * 0.20,

        speed: 5

    };

    function fly() {

        ctx.save();

        ctx.beginPath();

        ctx.fillStyle = "gold";

        ctx.shadowBlur = 30;

        ctx.shadowColor = "gold";

        ctx.arc(
            rocket.x,
            rocket.y,
            6,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        rocket.y -= rocket.speed;

        if (rocket.y > rocket.target) {

            requestAnimationFrame(fly);

        } else {

            giantExplosion();

        }

    }

    fly();

}

// ======================================
// GIANT EXPLOSION
// ======================================

function giantExplosion() {

    const x = canvas.width / 2;
    const y = canvas.height * 0.20;

    for (let i = 0; i < 900; i++) {

        const p = new Particle(x, y, "gold");

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12;

        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;

        p.life = 220;

        p.radius = 3;

        particles.push(p);

    }

    setTimeout(showBirthdayMessage, 2500);

}

// ======================================
// SHOW MESSAGE
// ======================================

function showBirthdayMessage() {

    birthdayMessage.innerHTML = `

        <div class="birthday-title">
            Happy Birthday
        </div>

        <div class="birthday-name">
            Mahi ❤️
        </div>

    `;

    birthdayMessage.style.opacity = "1";

    birthdayMessage.style.transform =
        "translate(-50%,-50%) scale(1)";

    startSparkles();

}

// ======================================
// SPARKLES
// ======================================

function startSparkles() {

    const sparkleInterval = setInterval(() => {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left =
            (45 + Math.random() * 10) + "%";

        sparkle.style.top =
            (30 + Math.random() * 20) + "%";

        document.body.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 1800);

    }, 120);

    continueBtn.style.opacity = "1";

    continueBtn.style.pointerEvents = "auto";

    continueBtn.addEventListener("click", () => {

        window.location.href = "cake.html";

    });

}