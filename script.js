/**
 * Static Valentine Website Logic
 * Handles single-page navigation, login, and animations
 */

// Configuration
const CONFIG = {
    CORRECT_PASSWORD: "23032023",
    TANGGAL_JADIAN: "2023-03-23", // Kembali ke 23 Maret agar tepat 1059 hari pada 14 Feb 2026
    MUSIC_URL: "https://www.youtube.com/embed/k4V3Mo61fJM?autoplay=1&loop=1&playlist=k4V3Mo61fJM"
};

// State Management
let currentSurpriseIndex = 0;
const warmMessages = [
    "I Love You More Than Yesterday 💖",
    "Kamu adalah hal terindah yang selaluu memberikan rasa nyaman🥺",
    "Setiap hari bersamamu adalah petualangan favoritku dan sekerdar jalan malem boncengan sambil ceritapun itu sudah cukup baik 🫂",
    "Terima kasih sudah sabar dan selalu ada buat aku, selalu sabar dengan sikap aku🤍",
    "Aku sangat beruntung memilikimu dan sangatt amat bersyukur, semoga bubyy bisa jaga perasaan aku terus yaa, janji jangan hianantin👤",
    "Kamu membuat duniaku jadi lebih berwarna 🌈",
    "Janji ya, kita bakal terus bareng-bareng selamanya? 💍",
    "Cintaku ke kamu itu kayak lagu Coldplay, 'Fix You'... I will try to fix you (and keep you happy, ILoveyouu bubyyyyy...) ❤️",
    "Sayangg bubyy banyaaakkk banyakkkk banyakkk banyakkkk banyakkkk😘🫀🌝",
    "dan terimakasihh banyak tuhan, semesta sudah memberikan manusia terindah yang selalu menemani setiap perjalanan aku yg kesepian dan beradd ini🙂🥺🤍"
];

// Typing Animation State
const typingMessages = [
    "Kamu adalah alasan aku tersenyum setiap hari, bahkan saat aku merasa sendiri. 💕",
    "Setiap detik bersamamu adalah anugerah yang paling indahh bubyy, dan aku sangat beruntung bisa memilikimu di hidupku. 🌹",
    "Terima kasih sudah menjadi bagian terindah dalam hidupku.",
    "I love you more than words can say ❤️"
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

/**
 * Initialize falling hearts background
 */
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '🌸'];
    const count = 15;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            const startX = Math.random() * 100;
            const duration = 5 + Math.random() * 10;
            const size = 0.8 + Math.random() * 1.5;

            heart.style.left = startX + 'vw';
            heart.style.animationDuration = duration + 's';
            heart.style.fontSize = size + 'rem';
            heart.style.opacity = 0.5 + Math.random() * 0.5;

            container.appendChild(heart);

            setTimeout(() => heart.remove(), duration * 1000);
        }, i * 400);
    }
}

/**
 * Handle Typing Animation
 */
function type() {
    const typingTextElement = document.getElementById('typing-text');
    if (!typingTextElement) return;

    const currentMessage = typingMessages[messageIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentMessage.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % typingMessages.length;
        typeSpeed = 500;
    }

    typingTimeout = setTimeout(type, typeSpeed);
}

/**
 * Calculate days since anniversary
 */
function updateDaysCounter() {
    const counterElement = document.getElementById('days-counter');
    if (!counterElement) return;

    const start = new Date(CONFIG.TANGGAL_JADIAN);
    start.setHours(0, 0, 0, 0); // Normalize to start of day
    
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize to start of day
    
    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    counterElement.textContent = `${diffDays} Hari`;
}

/**
 * Show Surprise Modal
 */
function showSurprise() {
    const modal = document.getElementById('surprise-modal');
    const modalText = document.getElementById('modal-text');
    
    modalText.textContent = warmMessages[currentSurpriseIndex];
    currentSurpriseIndex = (currentSurpriseIndex + 1) % warmMessages.length;
    
    modal.classList.remove('hidden');

    if (window.confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ffffff']
        });
    }
}

function closeModal() {
    document.getElementById('surprise-modal').classList.add('hidden');
}

/**
 * Login Functionality
 */
function handleLogin(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    
    if (passwordInput.value === CONFIG.CORRECT_PASSWORD) {
        // Success
        errorMsg.classList.add('hidden');
        
        // Switch sections
        document.getElementById('login-section').classList.remove('active');
        document.getElementById('login-section').classList.add('hidden');
        
        const welcomeSection = document.getElementById('welcome-section');
        welcomeSection.classList.remove('hidden');
        welcomeSection.classList.add('active');
        
        // Trigger Flicker & Music
        const flicker = document.getElementById('flicker-overlay');
        flicker.classList.add('flicker-active');
        
        document.getElementById('youtube-audio').src = CONFIG.MUSIC_URL;
        
        // Start animations
        updateDaysCounter();
        type();
        
        // Secret message timer
        setTimeout(() => {
            const secretMsg = document.getElementById('secret-message');
            if (secretMsg) {
                secretMsg.classList.remove('hidden');
                secretMsg.classList.add('animate-fade-in');
            }
        }, 5000);

        // Confetti burst
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

    } else {
        // Fail
        errorMsg.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * Logout Functionality
 */
function handleLogout() {
    // Reset sections
    document.getElementById('welcome-section').classList.remove('active');
    document.getElementById('welcome-section').classList.add('hidden');
    
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('login-section').classList.add('active');
    
    // Stop music & animations
    document.getElementById('youtube-audio').src = '';
    clearTimeout(typingTimeout);
    document.getElementById('typing-text').textContent = '';
    charIndex = 0;
    messageIndex = 0;
    
    // Clear password
    document.getElementById('password-input').value = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize background
    createHearts();
    setInterval(createHearts, 8000);

    // Form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // Buttons
    const surpriseBtn = document.getElementById('surprise-btn');
    if (surpriseBtn) surpriseBtn.addEventListener('click', showSurprise);

    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // Close modal on background click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('surprise-modal');
        if (e.target === modal) closeModal();
    });
});
