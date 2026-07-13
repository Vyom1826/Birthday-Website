/*=========================================================
    FIREWORKS.JS
=========================================================*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

const rockets = [];
const particles = [];
const smokeParticles = [];

const colors = [
    "#ff4d6d",
    "#ff006e",
    "#ffd60a",
    "#00f5d4",
    "#00bbf9",
    "#9b5de5",
    "#ffffff",
    "#ff9f1c",
    "#7bff00",
    "#00e5ff"
];

class Rocket {

    constructor() {

        this.x =
            canvas.width * 0.15 +
            Math.random() * canvas.width * 0.7;

        this.y = canvas.height + 30;

        this.target =
            canvas.height * 0.15 +
            Math.random() * canvas.height * 0.35;

        this.speed = 6 + Math.random() * 2;

        this.radius = 3;

        this.color =
            colors[
            Math.floor(Math.random() * colors.length)
            ];

        this.dead = false;

    }

    update() {

        this.y -= this.speed;

        if (this.y <= this.target) {

            explode(this.x, this.y, this.color);

            this.dead = true;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle = this.color;

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        for (let i = 1; i <= 18; i++) {

            ctx.beginPath();

            ctx.globalAlpha = .08 - (i * .003);

            ctx.fillStyle = this.color;

            ctx.arc(
                this.x,
                this.y + i * 7,
                this.radius - (i * .05),
                0,
                Math.PI * 2
            );

            ctx.fill();

        }

        ctx.globalAlpha = 1;

    }

}

class Particle {

    constructor(x, y, color) {

        this.x = x;

        this.y = y;

        this.color = color;

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 8;

        this.vx = Math.cos(angle) * speed;

        this.vy = Math.sin(angle) * speed;

        this.life = 120;

        this.radius = Math.random() * 2 + 1;

    }

    update() {

        this.x += this.vx;

        this.y += this.vy;

        this.vx *= 0.985;

        this.vy *= 0.985;

        this.vy += 0.03;

        this.life--;

    }

    draw() {

        ctx.beginPath();

        ctx.globalAlpha = this.life / 120;

        ctx.fillStyle = this.color;

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 1;

    }

}

class Smoke {

    constructor(x, y) {

        this.x = x;

        this.y = y;

        this.radius = 10 + Math.random() * 12;

        this.life = 70;

        this.vx = (Math.random() - .5);

        this.vy = -Math.random();

    }

    update() {

        this.x += this.vx;

        this.y += this.vy;

        this.radius += .15;

        this.life--;

    }

    draw() {

        ctx.beginPath();

        ctx.globalAlpha = (this.life / 70) * .2;

        ctx.fillStyle = "#999";

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 1;

    }

}

/*=========================================================
    FIREWORKS.JS
    PART 2
=========================================================*/

// ==============================
// EXPLOSIONS
// ==============================

function explode(x, y, color) {

    const type = Math.floor(Math.random() * 5);

    switch (type) {

        case 0:
            normalExplosion(x, y, color);
            break;

        case 1:
            ringExplosion(x, y, color);
            break;

        case 2:
            heartExplosion(x, y, color);
            break;

        case 3:
            flowerExplosion(x, y, color);
            break;

        default:
            glitterExplosion(x, y, color);
            break;

    }

    createSmoke(x, y);

}

// ==============================
// NORMAL
// ==============================

function normalExplosion(x, y, color) {

    for (let i = 0; i < 180; i++) {

        const p = new Particle(x, y, color);

        particles.push(p);

    }

}

// ==============================
// RING
// ==============================

function ringExplosion(x, y, color) {

    const total = 180;

    for (let i = 0; i < total; i++) {

        const angle = (Math.PI * 2 / total) * i;

        const p = new Particle(x, y, color);

        p.vx = Math.cos(angle) * 7;

        p.vy = Math.sin(angle) * 7;

        p.life = 140;

        particles.push(p);

    }

}

// ==============================
// HEART
// ==============================

function heartExplosion(x, y, color) {

    for (let i = 0; i < 240; i++) {

        const t = (Math.PI * 2 * i) / 240;

        const hx = 16 * Math.pow(Math.sin(t), 3);

        const hy =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        const p = new Particle(x, y, color);

        p.vx = hx * .18;

        p.vy = -hy * .18;

        p.life = 150;

        particles.push(p);

    }

}

// ==============================
// FLOWER
// ==============================

function flowerExplosion(x, y, color) {

    for (let i = 0; i < 260; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 9;

        const p = new Particle(x, y, color);

        p.vx = Math.cos(angle) * speed;

        p.vy = Math.sin(angle) * speed;

        p.life = 150;

        particles.push(p);

    }

}

// ==============================
// GLITTER
// ==============================

function glitterExplosion(x, y, color) {

    for (let i = 0; i < 220; i++) {

        const p = new Particle(x, y, color);

        p.radius = Math.random() * 1.5 + 0.5;

        p.life = 90;

        particles.push(p);

    }

}

// ==============================
// SMOKE
// ==============================

function createSmoke(x, y) {

    for (let i = 0; i < 20; i++) {

        smokeParticles.push(new Smoke(x, y));

    }

}

// ==============================
// FIREWORK SHOW
// ==============================

let launcher = null;

function startFireworks() {

    launcher = setInterval(() => {

        rockets.push(new Rocket());

    }, 450);

    setTimeout(() => {

        clearInterval(launcher);

        showFinale();

    }, 18000);

}

// ==============================
// ANIMATION
// ==============================

function animate() {

    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = rockets.length - 1; i >= 0; i--) {

        rockets[i].update();
        rockets[i].draw();

        if (rockets[i].dead) {

            rockets.splice(i, 1);

        }

    }

    for (let i = particles.length - 1; i >= 0; i--) {

        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {

            particles.splice(i, 1);

        }

    }



    requestAnimationFrame(animate);

}

animate();