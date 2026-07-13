// =====================================
// IMAGES
// =====================================

const memories = [

    {
        image: "assets/photo1.jpg",
        caption: "Beautiful Memory ❤️"
    },

    {
        image: "assets/photo2.jpg",
        caption: "A Day I'll Never Forget 🌸"
    },

    {
        image: "assets/photo3.jpg",
        caption: "Your Beautiful Smile ✨"
    },

    {
        image: "assets/photo4.jpg",
        caption: "One More Precious Moment 💖"
    },

    {
        image: "assets/photo5.jpg",
        caption: "Together Forever ❤️"
    },

    {
        image: "assets/photo6.jpg",
        caption: "Happy Birthday Mahi 🎂"
    }

];


// ===============================
// CAMERA SOUND
// ===============================

const shutterSound = new Audio("assets/camera-shutter.mp3");

shutterSound.volume = 0.8;

function playShutter() {

    shutterSound.currentTime = 0;

    shutterSound.play();

}

// =====================================
// ELEMENTS
// =====================================

const shutter = document.getElementById("shutter");

const flash = document.getElementById("flash");

const nextBtn = document.getElementById("nextBtn");

const memoryBoard = document.getElementById("memoryBoard");

let current = 0;

let firstPhoto = true;

// =====================================
// CAMERA CLICK
// =====================================

shutter.addEventListener("click", () => {

    if (current !== 0) return;

    playShutter();

    flash.animate([

        { opacity: 0 },

        { opacity: 1 },

        { opacity: 0 }

    ], {

        duration: 300

    });

    setTimeout(() => {

        createPolaroid();

        nextBtn.classList.remove("hidden");

    }, 300);

});


function createPolaroid() {

    const card = document.createElement("div");

    card.className = "polaroid";

    card.style.transform =
        `rotate(${Math.random() * 8 - 4}deg)`;

    card.innerHTML = `

        <div class="photo-wrapper">

            <img src="${memories[current].image}">

            <div class="develop-layer"></div>

        </div>

        <p class="caption">

            ${memories[current].caption}

        </p>

    `;

    memoryBoard.appendChild(card);

    const layer = card.querySelector(".develop-layer");

    const caption = card.querySelector(".caption");

    caption.style.opacity = "0";

    setTimeout(() => {

        layer.style.transition = "2.5s";

        layer.style.opacity = "0";

    }, 300);

    setTimeout(() => {

        caption.style.opacity = "1";

    }, 2400);

}

nextBtn.addEventListener("click", () => {

    current++;

    playShutter();

    if (current < memories.length) {

        flash.animate([

            { opacity: 0 },

            { opacity: 1 },

            { opacity: 0 }

        ], {

            duration: 300

        });

        setTimeout(createPolaroid, 300);

    }

    else {

        nextBtn.innerHTML = "Continue ❤️";

        nextBtn.onclick = function () {

            localStorage.setItem("cameraDone", "true");

            window.location.href = "memory.html";

        }

    }

});
