document.addEventListener("DOMContentLoaded", () => {
    const btnBlow = document.getElementById("btnBlow");
    const btnCut = document.getElementById("btnCut");
    const btnContinue = document.getElementById("btnContinue");
    const flames = document.querySelectorAll(".flame");
    const knife = document.getElementById("knife");
    const cakeSplitWrapper = document.getElementById("cakeSplitWrapper");
    const candlesRow = document.querySelector(".candles-row");
    const hiddenHeart = document.getElementById("hiddenHeart");
    const subtitle = document.getElementById("subtitle");

    let isExtinguished = false;
    let micStream = null;
    let audioContext = null;
    let analyser = null;
    let dataArray = null;

    // Reveal 'Blow Out Candles' once cake architecture sequence finishes falling completely
    setTimeout(() => {
        btnBlow.classList.remove("hidden");
        btnBlow.style.opacity = "1";
    }, 3600);

    // Click handler acts as an immediate fallback or triggers the microphone experience
    btnBlow.addEventListener("click", () => {
        if (isExtinguished) return;

        // Attempt to initialize microphone for genuine interactive blowing
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            btnBlow.innerHTML = "<span>💨</span> BLOW INTO MICROPHONE...";
            subtitle.innerText = "Breathe in deeply and blow directly onto your screen! 🌬️";

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    micStream = stream;
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaStreamSource(stream);
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 256;
                    source.connect(analyser);

                    const bufferLength = analyser.frequencyBinCount;
                    dataArray = new Uint8Array(bufferLength);

                    // Start checking audio levels
                    checkBlowVolume();
                })
                .catch(err => {
                    // Access denied or mic error -> Fall back instantly to a standard button action
                    triggerBlowOutSequence();
                });
        } else {
            // Browser doesn't support getUserMedia -> Standard action fallback
            triggerBlowOutSequence();
        }
    });

    // Audio level analysis loop monitoring for high-volume wind friction (blowing air)
    function checkBlowVolume() {
        if (isExtinguished || !analyser) return;

        analyser.getByteFrequencyData(dataArray);
        let totalVolume = 0;

        // Target mid-to-high frequencies where blowing close to a microphone registers strongly
        for (let i = 15; i < dataArray.length; i++) {
            totalVolume += dataArray[i];
        }
        let averageVolume = totalVolume / (dataArray.length - 15);

        if (averageVolume > 60) {
            triggerBlowOutSequence();

            // Clean up microphone streams safely
            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
            }
            analyser = null;
        } else {
            requestAnimationFrame(checkBlowVolume);
        }
    }

    // Beautifully staggered blowout chain with synchronized canvas smoke wisps
    function triggerBlowOutSequence() {
        if (isExtinguished) return;
        isExtinguished = true;

        btnBlow.classList.add("hidden");
        subtitle.innerText = "Gorgeous wish! Now, let's slice the cake...";

        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.style.animation = "none";
                flame.classList.add("extinguishing");
                flame.classList.remove("lit");

                // Map HTML element position into Canvas coordinate mapping space
                const rect = flame.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2 - canvasRect.left;
                const targetY = rect.top + rect.height / 2 - canvasRect.top;

                // Fire off a realistic smoke trail from the candle wick tip
                emitSmokeTrail(targetX, targetY);

            }, index * 140); // 140ms stagger creates a sweeping breath motion across the cake
        });

        setTimeout(() => {
            btnCut.classList.remove("hidden");
            btnCut.style.opacity = "1";
        }, 1200);
    }

    // Knife Slicing Action & High Velocity Party Popper Explosion Engine
    btnCut.addEventListener("click", () => {
        btnCut.classList.add("hidden");
        knife.classList.add("slice-action");

        setTimeout(() => {
            cakeSplitWrapper.classList.add("split");
            hiddenHeart.classList.add("reveal");

            candlesRow.style.opacity = "0";
            candlesRow.style.transform = "scale(0.8)";

            subtitle.innerText = "BOOM! Look inside Mahi's cake! ❤️ 🎉";
            triggerPremiumPartyPopperBlast();
        }, 500);

        setTimeout(() => {
            knife.style.transform = "translate(-50%, -300px)";
            knife.style.opacity = "0";

            btnContinue.classList.remove("hidden");
            btnContinue.style.opacity = "1";
        }, 1400);
    });

    // UPDATED ROUTING LOGIC: Triggers confetti, prints a loading message, then transitions
    btnContinue.addEventListener("click", () => {
        subtitle.innerText = "Opening your special birthday surprise... 🎁✨";
        triggerPremiumPartyPopperBlast();

        // Staggered redirect allows the confetti burst to perform cleanly before moving away

        localStorage.setItem("giftDone", "true");

        window.location.href = "memory.html";

    });
    // Note: Replace "next.html" above with whatever your actual second file name or URL link is!
}, 1200);


// --- 🎆 Theme-Matched Party Popper & Smoke Canvas Particle Framework ---
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Ambient floating backdrop background dust particles
class AmbientSparkle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * -0.9 - 0.2;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.color = `rgba(212, 175, 55, ${Math.random() * 0.3})`;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Lingering Grey-White Candle Smoke Particle Structure
class CandleSmokeWisp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 2;
        this.speedY = Math.random() * -1.2 - 0.6;
        this.speedX = Math.random() * 0.8 - 0.2;
        this.opacity = 0.65;
        this.growthRate = Math.random() * 0.12 + 0.08;
        this.fadeRate = Math.random() * 0.008 + 0.007;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += this.growthRate;
        this.opacity -= this.fadeRate;
    }
    draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.fillStyle = `rgba(210, 210, 210, ${this.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(230, 230, 230, 0.2)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// High Velocity Confetti Explosions
class PremiumConfetti {
    constructor(x, y, directionSign) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 9 + 5;
        this.speedX = (Math.random() * 16 + 8) * directionSign;
        this.speedY = Math.random() * -19 - 7;
        this.gravity = 0.38;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 14 - 7;

        const luxuryPalette = ['#d4af37', '#f3e5ab', '#ffffff', '#e0e0e0', '#2b2b2b', '#111111', '#ff4081', '#00e5ff'];
        this.color = luxuryPalette[Math.floor(Math.random() * luxuryPalette.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.speedX *= 0.97;
        this.rotation += this.rotationSpeed;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        ctx.restore();
    }
}

// Populate ambient spark canvas array lists
for (let i = 0; i < 35; i++) {
    particles.push(new AmbientSparkle());
}

// Generates a steady continuous plume stream of smoke for a specific extinguished candle
function emitSmokeTrail(startX, startY) {
    let smokeCount = 0;
    const intervalId = setInterval(() => {
        particles.push(new CandleSmokeWisp(startX, startY));
        particles.push(new CandleSmokeWisp(startX + (Math.random() * 4 - 2), startY));

        smokeCount++;
        if (smokeCount > 18) {
            clearInterval(intervalId);
        }
    }, 80);
}

function triggerPremiumPartyPopperBlast() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 30;
    for (let i = 0; i < 75; i++) {
        particles.push(new PremiumConfetti(centerX, centerY, -1));
        particles.push(new PremiumConfetti(centerX, centerY, 1));
    }
}

function animateParticlesLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if ((p instanceof PremiumConfetti && p.y > canvas.height + 20) ||
            (p instanceof CandleSmokeWisp && p.opacity <= 0)) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateParticlesLoop);
}
animateParticlesLoop();