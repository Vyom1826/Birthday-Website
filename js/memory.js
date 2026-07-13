// =========================================
// MEMORY ROOM
// =========================================



// Cards
const cameraCard = document.getElementById("cameraCard");
const giftCard = document.getElementById("giftCard");
const letterCard = document.getElementById("letterCard");

// =========================================
// OPEN PAGES
// =========================================

cameraCard.addEventListener("click", () => {

    if (!cameraCard.classList.contains("completed")) {

        window.location.href = "camera.html";

    }

});

giftCard.addEventListener("click", () => {

    if (!giftCard.classList.contains("completed")) {

        window.location.href = "gift.html";

    }

});

letterCard.addEventListener("click", () => {

    if (!letterCard.classList.contains("completed")) {

        window.location.href = "letter.html";

    }

});

// =========================================
// RESTORE COMPLETED STATE
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    restoreProgress();

});

// =========================================

function restoreProgress() {

    const cameraDone =
        localStorage.getItem("cameraDone") === "true";

    const giftDone =
        localStorage.getItem("giftDone") === "true";

    const letterDone =
        localStorage.getItem("letterDone") === "true";

    if (cameraDone) {

        cameraCard.classList.add("completed");

    }

    if (giftDone) {

        giftCard.classList.add("completed");

    }

    if (letterDone) {

        letterCard.classList.add("completed");

    }

    checkCompletion();

}

// =========================================
// CHECK COMPLETION
// =========================================

function checkCompletion() {

    const cameraDone =
        localStorage.getItem("cameraDone") === "true";

    const giftDone =
        localStorage.getItem("giftDone") === "true";

    const letterDone =
        localStorage.getItem("letterDone") === "true";

    if (cameraDone && giftDone && letterDone) {

        unlockAllComplete();

    }

}

// =========================================
// ALL COMPLETED
// =========================================

function unlockAllComplete() {

    const cardContainer =
        document.querySelector(".cards");

    const glassCard =
        document.querySelector(".glass-card");

    // Disable clicking
    cardContainer.style.pointerEvents = "none";

    // Glow
    document
        .querySelectorAll(".memory-card")
        .forEach(card => {

            card.style.boxShadow =
                "0 0 35px rgba(255,215,120,.7)";

            card.style.borderColor =
                "#FFD86A";

        });

    // Wait

    setTimeout(() => {

        glassCard.classList.add("fade-out");

    }, 1800);

    // Redirect

    setTimeout(() => {

        window.location.href = "surprise.html";

    }, 3200);

}

