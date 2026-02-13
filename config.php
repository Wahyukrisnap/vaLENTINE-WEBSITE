<?php
/**
 * Global Configuration File
 * This file handles session management, environment variables, 
 * and core security functions.
 * 
 * @author Professional Developer
 */

// Load Environment Loader
require_once __DIR__ . '/includes/EnvLoader.php';

// Initialize Environment Variables
EnvLoader::load(__DIR__ . '/.env');

// Session Configuration
$session_path = __DIR__ . '/sessions';
if (!is_dir($session_path)) {
    mkdir($session_path, 0777, true);
}
session_save_path($session_path);

// Start Session with security flags
session_start([
    'cookie_httponly' => true,
    'cookie_secure' => false, // Set to true if using HTTPS
    'use_only_cookies' => true,
]);

/**
 * Security Settings
 * We use hashed passwords instead of plain text for production security
 */
$hashed_password = password_hash(getenv('APP_PASSWORD') ?: 'default_password', PASSWORD_DEFAULT);
$tanggal_jadian = getenv('TANGGAL_JADIAN') ?: '2023-01-01';

/**
 * Calculates the number of days since a specific date
 * 
 * @param string $tgl The start date (YYYY-MM-DD)
 * @return int Number of days passed
 */
function hitungHari($tgl) {
    try {
        $tgl_awal = new DateTime($tgl);
        $tgl_sekarang = new DateTime();
        $diff = $tgl_awal->diff($tgl_sekarang);
        return $diff->days;
    } catch (Exception $e) {
        return 0;
    }
}

/**
 * Middleware to ensure the user is authenticated
 * Redirects to login page if session is not active
 */
function checkLogin() {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        header("Location: index.php");
        exit;
    }
}
?>
