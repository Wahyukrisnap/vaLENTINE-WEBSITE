/**
 * Valentine Website - FIXED VERSION (MP3 Version)
 */

// ================= CONFIG =================
const CONFIG = {
    CORRECT_PASSWORD: "23032023",
    TANGGAL_JADIAN: "2023-03-23"
};

// ================= STATE =================
let currentSurpriseIndex = 0;
let music;
let typingTimeout;
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ================= MESSAGES =================
const warmMessages = [
    "I Love You More Than Yesterday 💖",
    "Kamu adalah hal terindah yang selalu memberikan rasa nyaman 🥺",
    "Setiap hari bersamamu adalah petualangan favoritku 🫂",
    "Terima kasih sudah sabar dan selalu ada 🤍",
    "Aku sangat beruntung memilikimu 💞",
    "Kamu membuat duniaku lebih berwarna 🌈",
    "Janji kita terus bareng selamanya ya? 💍",
    "Cintaku ke kamu seperti lagu 'Fix You' ❤️",
    "Sayang kamu banyaaakkkk 😘",
    "Terima kasih sudah hadir di hidupku 🥺🤍"
];

const typingMessages = [
    "Kamu adalah alasan aku tersenyum setiap hari 💕",
    "Setiap detik bersamamu adalah anugerah 🌹",
    "Terima kasih sudah menjadi bagian hidupku ❤️",
    "I love you more than words can say 💖"
];

// ================= HEART BACKGROUND =================
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const hearts = ['❤️','💖','💕','💗','💓','🌸'];

    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (5 + Math.random() * 5) + 's';
    heart.style.fontSize = (1 + Math.random()) + 'rem';

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
}

// ================= TYPING EFFECT =================
function typeEffect() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    const current = typingMessages[messageIndex];

    if (isDeleting) {
        el.textContent = current.substring(0, charIndex--);
    } else {
        el.textContent = current.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % typingMessages.length;
        speed = 400;
    }

    typingTimeout = setTimeout(typeEffect, speed);
}

// ================= DAY COUNTER =================
function updateDaysCounter() {
    const el = document.getElementById("days-counter");
    if (!el) return;

    const start = new Date(CONFIG.TANGGAL_JADIAN);
    start.setHours(0,0,0,0);

    const now = new Date();
    now.setHours(0,0,0,0);

    const diff = Math.floor((now - start) / (1000*60*60*24));
    el.textContent = diff + " Hari";
}

// ================= LOGIN =================
function handleLogin(e) {
    e.preventDefault();

    const input = document.getElementById("password-input").value;
    const error = document.getElementById("error-msg");

    if (input === CONFIG.CORRECT_PASSWORD) {

        error.classList.add("hidden");

        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("welcome-section").classList.remove("hidden");

        // 🎵 PLAY MUSIC WITH FADE IN
        music.volume = 0;
        music.play().catch(() => {});

        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 0.8) {
                vol += 0.05;
                music.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 200);

        updateDaysCounter();
        typeEffect();

        if (window.confetti) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

    } else {
        error.classList.remove("hidden");
        document.getElementById("password-input").value = "";
    }
}

// ================= LOGOUT =================
function handleLogout() {

    document.getElementById("welcome-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");

    if (music) {
        music.pause();
        music.currentTime = 0;
    }

    clearTimeout(typingTimeout);
    document.getElementById("typing-text").textContent = "";
    charIndex = 0;
    messageIndex = 0;
}

// ================= SURPRISE =================
function showSurprise() {
    const modal = document.getElementById("surprise-modal");
    const text = document.getElementById("modal-text");

    text.textContent = warmMessages[currentSurpriseIndex];
    currentSurpriseIndex = (currentSurpriseIndex + 1) % warmMessages.length;

    modal.classList.remove("hidden");

    if (window.confetti) {
        confetti({
            particleCount: 80,
            spread: 60
        });
    }
}

function closeModal() {
    document.getElementById("surprise-modal").classList.add("hidden");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    music = document.getElementById("bg-music");

    createHearts();
    setInterval(createHearts, 1000);

    document.getElementById("login-form")
        .addEventListener("submit", handleLogin);

    document.getElementById("logout-btn")
        .addEventListener("click", handleLogout);

    document.getElementById("surprise-btn")
        .addEventListener("click", showSurprise);

    document.getElementById("close-modal")
        .addEventListener("click", closeModal);

});
