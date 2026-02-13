// ================= CONFIG =================
const CONFIG = {
    CORRECT_PASSWORD: "23032023",
    TANGGAL_JADIAN: "2023-03-23"
};

// ================= STATE =================
let typingTimeout;
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let surpriseIndex = 0;

// ================= MESSAGES =================
const typingMessages = [
    "Kamu adalah alasan aku tersenyum setiap hari 💕",
    "Terima kasih sudah hadir dalam hidupku 🌹",
    "Setiap detik bersamamu sangat berarti ❤️",
    "I love you more than words can say 💖"
];

const surpriseMessages = [
    "I Love You 💖",
    "Kamu adalah hal terindah di hidupku 💕",
    "Aku beruntung memilikimu 🥰",
    "Selamanya ya ❤️"
];

// ================= HEART BACKGROUND =================
function createHeart() {
    const container = document.getElementById("hearts-container");
    if (!container) return;

    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-10px";
    heart.style.fontSize = "20px";
    heart.style.animation = "fall 5s linear forwards";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
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

// ================= COUNTER =================
function updateDays() {
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

        updateDays();
        typeEffect();

    } else {
        error.classList.remove("hidden");
        document.getElementById("password-input").value = "";
    }
}

// ================= LOGOUT =================
function handleLogout() {

    document.getElementById("welcome-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");

    clearTimeout(typingTimeout);
    document.getElementById("typing-text").textContent = "";
    charIndex = 0;
    messageIndex = 0;
}

// ================= SURPRISE =================
function showSurprise() {
    const modal = document.getElementById("surprise-modal");
    const text = document.getElementById("modal-text");

    text.textContent = surpriseMessages[surpriseIndex];
    surpriseIndex = (surpriseIndex + 1) % surpriseMessages.length;

    modal.classList.remove("hidden");
}

function closeModal() {
    document.getElementById("surprise-modal").classList.add("hidden");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    setInterval(createHeart, 1000);

    document.getElementById("login-form")
        .addEventListener("submit", handleLogin);

    document.getElementById("logout-btn")
        .addEventListener("click", handleLogout);

    document.getElementById("surprise-btn")
        .addEventListener("click", showSurprise);

    document.getElementById("close-modal")
        .addEventListener("click", closeModal);

});
