<?php
require_once 'config.php';
checkLogin();

$hari_bersama = hitungHari($tanggal_jadian);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Valentine! ❤️</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <!-- Canvas Confetti Library -->
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
</head>
<body class="welcome-page">
    <!-- Screen Flicker Effect on Load -->
    <div class="flicker-overlay"></div>
    
    <div class="particles-container" id="particles-container"></div>
    
    <div class="welcome-content">
        <h1 class="zoom-in">Happy Valentine My Love ❤️</h1>
        <h2 class="zoom-in delay-1">Terima kasih bubyy sudah hadir di kehidupan aku dan membuat hidup aku menjadi lebih baik, aku harap bubyy gabosen dan gaakan pernah bosan ataupun capek dengan sikap aku🙂🥺🌹</h2>
        <p class="typing-text" id="typing-text"></p>
        
        <div class="countdown-box zoom-in delay-2">
            <p>Sudah bersama selama <span class="heart-text">❤️</span> <br> <strong><?php echo $hari_bersama; ?> Hari</strong></p>
        </div>

        <div class="action-buttons zoom-in delay-3">
            <button id="surprise-btn" class="btn-surprise">Klik Untuk Kejutan 🎁</button>
            <a href="logout.php" class="btn-logout">Logout</a>
        </div>
        
        <div id="secret-message" class="secret-message hidden">
            <p>Psst... Aku punya sesuatu buat kamu ✨</p>
            <p>Kamu adalah hal terindah yang pernah aku miliki dan ingin terus aku miliki 💖</p>
        </div>
    </div>

    <!-- Popup Modal -->
    <div id="surprise-modal" class="modal hidden">
        <div class="modal-content glass">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <p class="modal-text">I Love You More Than Yesterday 💖</p>
            <div class="modal-hearts">❤️❤️❤️</div>
        </div>
    </div>

    <!-- Music (Coldplay - Fix You) -->
    <div style="display:none">
        <iframe width="0" height="0" src="https://www.youtube.com/embed/k4V3Mo61fJM?autoplay=1&loop=1&playlist=k4V3Mo61fJM" frameborder="0" allow="autoplay"></iframe>
    </div>

    <script src="assets/js/script.js"></script>
    <script>
        // Trigger confetti on load
        window.addEventListener('load', () => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
            });
        });
    </script>
</body>
</html>
