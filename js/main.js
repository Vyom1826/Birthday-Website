// ======================================
// SECRET PIN
// ======================================

const SECRET_PIN = "1826"; // Change this

// ======================================
// ELEMENTS
// ======================================

const boxes = document.querySelectorAll(".pin-box");
const numberButtons = document.querySelectorAll(".key");
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");
const message = document.getElementById("message");
const card = document.querySelector(".glass-card");

let enteredPin = "";

// ======================================
// UPDATE PIN BOXES
// ======================================

function updateDisplay() {

    boxes.forEach((box, index) => {

        if (enteredPin[index]) {

            box.innerHTML = "•";
            box.classList.add("active");

        } else {

            box.innerHTML = "";
            box.classList.remove("active");

        }

    });

}

// ======================================
// CHECK PIN
// ======================================

function checkPin() {

    if (enteredPin.length !== 4) return;

    if (enteredPin === SECRET_PIN) {

        unlockAnimation();

    } else {

        wrongPin();

    }

}

// ======================================
// WRONG PIN
// ======================================

function wrongPin() {

    message.innerHTML = "❌ Oops! That's not the secret PIN.";

    card.classList.add("shake");

    navigator.vibrate?.(150);

    setTimeout(() => {

        enteredPin = "";

        updateDisplay();

        message.innerHTML = "";

        card.classList.remove("shake");

    }, 1000);

}

// ======================================
// SUCCESS
// ======================================

function unlockAnimation() {

    message.innerHTML = "💖 Unlocking your surprise...";

    card.classList.add("success");

    setTimeout(() => {

        document.body.classList.add("fade-out");

    }, 1000);

    setTimeout(() => {



        localStorage.removeItem("cameraDone");
        localStorage.removeItem("giftDone");
        localStorage.removeItem("letterDone");


        // Change this later
        window.location.href = "welcome.html";

    }, 1800);

}

// ======================================
// NUMBER BUTTONS
// ======================================

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (enteredPin.length >= 4) return;

        enteredPin += button.innerText;

        updateDisplay();

        checkPin();

    });

});

// ======================================
// DELETE
// ======================================

deleteBtn.addEventListener("click", () => {

    enteredPin = enteredPin.slice(0, -1);

    updateDisplay();

});

// ======================================
// CLEAR
// ======================================

clearBtn.addEventListener("click", () => {

    enteredPin = "";

    updateDisplay();

});

// ======================================
// KEYBOARD SUPPORT
// ======================================

document.addEventListener("keydown", e => {

    if (e.key >= "0" && e.key <= "9") {

        if (enteredPin.length < 4) {

            enteredPin += e.key;

            updateDisplay();

            checkPin();

        }

    }

    if (e.key === "Backspace") {

        enteredPin = enteredPin.slice(0, -1);

        updateDisplay();

    }

});