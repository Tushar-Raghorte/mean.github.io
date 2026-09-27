/*==========================================================
    app.js
==========================================================*/

"use strict";

/*==========================================================
    TRAINING START DATE
==========================================================*/

const targetDate = new Date(
    "September 28, 2026 11:00:00"
).getTime();

/*==========================================================
    COUNTDOWN ELEMENTS
==========================================================*/

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

/*==========================================================
    THEME
==========================================================*/

const body = document.body;

const themeButton =
    document.getElementById("themeToggle");

const themeIcon =
    themeButton.querySelector("i");

/*==========================================================
    UPDATE COUNTDOWN
==========================================================*/

function updateCountdown() {

    const now = new Date().getTime();

    const difference = targetDate - now;

    if (difference <= 0) {

        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";

        return;
    }

    const day =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hour =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minute =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const second =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );

    days.innerHTML =
        String(day).padStart(2, "0");

    hours.innerHTML =
        String(hour).padStart(2, "0");

    minutes.innerHTML =
        String(minute).padStart(2, "0");

    seconds.innerHTML =
        String(second).padStart(2, "0");

}

/*==========================================================
    START TIMER
==========================================================*/

updateCountdown();

setInterval(updateCountdown, 1000);

/*==========================================================
    APPLY THEME
==========================================================*/

function applyTheme(theme) {

    if (theme === "dark") {

        body.classList.add("dark");

        themeIcon.className =
            "fa-solid fa-sun";

    }

    else {

        body.classList.remove("dark");

        themeIcon.className =
            "fa-solid fa-moon";

    }

    localStorage.setItem(
        "theme",
        theme
    );

}

/*==========================================================
    LOAD SAVED THEME
==========================================================*/

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme) {

    applyTheme(savedTheme);

}

else {

    if (
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {

        applyTheme("dark");

    }

}

/*==========================================================
    TOGGLE THEME
==========================================================*/

themeButton.addEventListener(
    "click",
    () => {

        if (
            body.classList.contains("dark")
        ) {

            applyTheme("light");

        }

        else {

            applyTheme("dark");

        }

    }
);

/*==========================================================
    CARD HOVER EFFECT
==========================================================*/

const cards =
    document.querySelectorAll(
        ".card, .feature"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            card.style.background =
                `radial-gradient(circle at ${x}px ${y}px,
                rgba(255,255,255,.35),
                rgba(255,255,255,.12))`;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.background = "";

        }
    );

});

/*==========================================================
    PAGE LOAD ANIMATION
==========================================================*/

window.addEventListener(
    "load",
    () => {

        document.body.style.opacity = "1";

    }
);

document.body.style.opacity = "0";

document.body.style.transition =
    "opacity .8s ease";
