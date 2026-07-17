/*====================================================
                ELEMENTS
====================================================*/

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const vinyl = document.getElementById("vinyl");

const album = document.getElementById("albumCover");

const progress = document.getElementById("progress");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const stars = document.getElementById("stars");

const hearts = document.getElementById("hearts");

const notes = document.getElementById("musicNotes");

const bars = document.querySelectorAll("#equalizer span");

/*====================================================
                    STARS
====================================================*/

for (let i = 0; i < 250; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";

    star.style.height = size + "px";

    star.style.animationDuration =
        (2 + Math.random() * 4) + "s";

    star.style.animationDelay =
        Math.random() * 5 + "s";

    stars.appendChild(star);

}

/*====================================================
                HEARTS
====================================================*/

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.className = "floatingHeart";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (18 + Math.random() * 18) + "px";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 900);

/*====================================================
                MUSIC NOTES
====================================================*/

const symbols = ["♪", "♫", "♬", "♩"];

function createNote() {

    const note = document.createElement("div");

    note.className = "musicNote";

    note.innerHTML =
        symbols[Math.floor(Math.random() * symbols.length)];

    note.style.left = Math.random() * 100 + "vw";

    note.style.fontSize =
        (18 + Math.random() * 16) + "px";

    notes.appendChild(note);

    setTimeout(() => {

        note.remove();

    }, 7000);

}

setInterval(createNote, 1200);

/*====================================================
                PLAY
====================================================*/

playBtn.onclick = () => {

    if (audio.paused) {

        audio.play();

        playBtn.innerHTML = "❚❚";

        vinyl.classList.add("spin");

        album.classList.add("pulse");

        startBars();

    } else {

        audio.pause();

        playBtn.innerHTML = "▶";

        vinyl.classList.remove("spin");

        album.classList.remove("pulse");

        stopBars();

    }

};

/*====================================================
            PROGRESS BAR
====================================================*/

audio.addEventListener("loadedmetadata", () => {

    duration.innerHTML = format(audio.duration);

});

audio.addEventListener("timeupdate", () => {

    currentTime.innerHTML = format(audio.currentTime);

    progress.style.width =

        (audio.currentTime / audio.duration) * 100 + "%";

});

function format(sec) {

    const m = Math.floor(sec / 60);

    const s = Math.floor(sec % 60);

    return m + ":" + (s < 10 ? "0" : "") + s;

}

/*=========================================
        SEEK BAR
=========================================*/

let isDragging = false;

function seek(e) {

    const rect = progressBar.getBoundingClientRect();

    let x = e.clientX - rect.left;

    x = Math.max(0, Math.min(x, rect.width));

    const percent = x / rect.width;

    progress.style.width = (percent * 100) + "%";

    audio.currentTime = percent * audio.duration;

}

progressBar.addEventListener("click", seek);

progressBar.addEventListener("pointerdown", (e) => {

    isDragging = true;

    seek(e);

});

document.addEventListener("pointermove", (e) => {

    if (!isDragging) return;

    seek(e);

});

document.addEventListener("pointerup", () => {

    isDragging = false;

});

/*====================================================
                EQUALIZER
====================================================*/

let equalizer;

function startBars() {

    equalizer = setInterval(() => {

        bars.forEach(bar => {

            bar.style.height =

                (10 + Math.random() * 40) + "px";

        });

    }, 120);

}

function stopBars() {

    clearInterval(equalizer);

    bars.forEach(bar => {

        bar.style.height = "20px";

    });

}

/*====================================================
                    LYRICS
====================================================*/



const lyricsData = [

    {
        time: 15.5,
        text: "Jab se tujhe dekha hai, dil yahi kehne laga,"
    },

    {
        time: 20.5,
        text: "Har khushi ka matlab bas tu hi ban gaya."
    },

    {
        time: 27.5,
        text: "Subah ki pehli roshni, shaam ka sukoon hai tu,"
    },

    {
        time: 32.5,
        text: "Har dua me in jo maanga tha, woh haseen junoon hai tu."
    },

    {
        time: 38.5,
        text: "Rab se bas itni si dua,"
    },

    {
        time: 41.5,
        text: "Har pal tera ho khushiyon se bhara."
    },

    {
        time: 44.5,
        text: "Aaj tera janamdin hai,"
    },

    {
        time: 47.0,
        text: "Dil yeh geet sirf tere liye gaa raha."
    },

    {
        time: 51.5,
        text: "Happy Birthday, Mahi,"
    },

    {
        time: 56.5,
        text: "Tu meri har khushi ki wajah bani."
    },

    {
        time: 62.5,
        text: "Teri hansi mein meri duniya,"
    },

    {
        time: 65.5,
        text: "Teri baaton mein meri zindagi."
    },

    {
        time: 68.5,
        text: "Har saal yun hi muskurana,"
    },

    {
        time: 71.5,
        text: "Har sapna tera sach ho jaana."
    },

    {
        time: 74.5,
        text: "Meri dua hai bas itni si,"
    },

    {
        time: 77.5,
        text: "Hamesha khush rehna, Mahi."
    },

    {
        time: 92.5,
        text: "Chaand bhi tere noor se sharmaaye,"
    },

    {
        time: 98.5,
        text: "Taare tera naam gungunaaye."
    },

    {
        time: 104.5,
        text: "Har nayi manzil tu aasaani se paaye,"
    },

    {
        time: 110.0,
        text: "Har dua teri Rab kabool kar jaaye."
    },

    {
        time: 116.0,
        text: "Agar kabhi udaasi aaye,"
    },

    {
        time: 119.0,
        text: "Meri muskaan tujhe hasaaye."
    },

    {
        time: 122.0,
        text: "Har mod pe saath rahoon,"
    },

    {
        time: 125.0,
        text: "Dil se bas itna vaada nibhaoon."
    },

    {
        time: 128.0,
        text: "Happy Birthday, Mahi,"
    },

    {
        time: 133.5,
        text: "Aaj ka din hai sirf tera hi."
    },

    {
        time: 139.5,
        text: "Khushiyon ki baarish hoti rahe,"
    },

    {
        time: 142.5,
        text: "Har dua teri poori hoti rahe."
    },

    {
        time: 145.5,
        text: "Chaand, taare aur yeh jahaan,"
    },

    {
        time: 148.5,
        text: "Sab kahe ek hi baat—"
    },

    {
        time: 151.5,
        text: "Happy Birthday, Mahi... I hope you always keep smiling."
    }


];

const lyrics = document.getElementById("lyrics");

lyricsData.forEach(line => {

    const div = document.createElement("div");

    div.className = "lyric";

    div.innerHTML = line.text;

    lyrics.appendChild(div);

});

const lyricElements = document.querySelectorAll(".lyric");

audio.addEventListener("timeupdate", () => {

    let index = 0;

    lyricsData.forEach((line, i) => {

        if (audio.currentTime >= line.time) {

            index = i;

        }

    });

    lyricElements.forEach(el => {

        el.classList.remove("active");

        el.classList.remove("past");

    });

    lyricElements[index].classList.add("active");

    for (let i = 0; i < index; i++) {

        lyricElements[i].classList.add("past");

    }

    lyrics.style.transform =

        `translateY(-${index * 88}px)`;

});

/*==================================================
            CINEMATIC ENDING
==================================================*/

const endingScreen = document.getElementById("endingScreen");

const continueBtn = document.getElementById("continueBtn");

const replayBtn = document.getElementById("replayBtn");

audio.addEventListener("ended", () => {

    console.log("Song Finished");

    endingScreen.classList.add("show");

    continueBtn.classList.add("show");

    replayBtn.classList.add("show");

});

/*=====================================
        CONTINUE BUTTON
=====================================*/

continueBtn.onclick = () => {

    document.body.style.transition = "1.5s";

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "final1.html";

    }, 1500);

};

replayBtn.addEventListener("click", () => {

    replayBtn.classList.remove("show");

    continueBtn.classList.remove("show");

    endingScreen.classList.remove("show");

    audio.currentTime = 0;

    audio.play();

    playBtn.innerHTML = "❚❚";

    vinyl.classList.add("spin");

    album.classList.add("pulse");

    startBars();

});