<?php
require_once 'config.php';

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $password_input = $_POST['password'];
    $correct_password_plain = getenv('APP_PASSWORD');

    // Use password_verify to check against the plain password from .env
    // In a real database scenario, you would compare $password_input against a stored hash.
    // Here we compare the input directly with the secret in .env
    if ($password_input === $correct_password_plain) {
        $_SESSION['loggedin'] = true;
        header("Location: welcome.php");
        exit;
    } else {
        $error = "Upss... passwordnya salah 💔 Coba lagi ya sayang ❤️";
    }
}

// Jika sudah login, langsung ke welcome.php
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    header("Location: welcome.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valentine Login ❤️</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body class="login-page">
    <div class="hearts-container" id="hearts-container"></div>
    
    <div class="login-container animate-fade-in">
        <div class="login-box">
            <h1 class="heartbeat">Hi Sayangkuu cintaa! ❤️</h1>
            <p>Masukkan tanggal spesial kita untuk masuk ya...</p>
            
            <form action="" method="POST">
                <div class="input-group">
                    <input type="password" name="password" placeholder="Password (DDMMYYYY)" required autocomplete="off">
                </div>
                <button type="submit" class="btn-login">Masuk ✨</button>
            </form>
            
            <?php if ($error): ?>
                <p class="error-msg"><?php echo $error; ?></p>
            <?php endif; ?>
        </div>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>
