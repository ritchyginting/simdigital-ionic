<?php
header('Access-Control-Allow-Origin: *'); // Allow CORS
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetDir = __DIR__ . '/images/';
    $fileName = date("Y-m-d-G-i-s") .'.'. $ekstensi;
    //$fileName = basename($_FILES['file']['name']);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        echo json_encode(["status" => "success", "message" => "Photo berhasil di upload."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Photo gagal di upload."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Permintaan error."]);
}
?>
