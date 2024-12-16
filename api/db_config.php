<?php
header('Access-Control-Allow-Origin: *');
$hostname   = 'localhost';
$username   = 'ubglauri_sim_database1';
$password   = 'sim_database1'; //isikan password database (jika ada)
$database   = 'ubglauri_sim_database';
$charset    = 'utf8';
$dsn        = "mysql:host=" . $hostname . ";port=3306;dbname=" . $database . ";charset=" . $charset;
$opt        = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    PDO::ATTR_EMULATE_PREPARES   => false,
);
$pdo = new PDO($dsn, $username, $password, $opt);
$data = array();
?>
