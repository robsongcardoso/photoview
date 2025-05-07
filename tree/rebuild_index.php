<?php
header('Content-Type: application/json');
$dir = 'images/';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$images = [];
if (is_dir($dir)) {
    foreach (scandir($dir) as $file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $allowedExtensions)) {
            $images[] = $dir . $file;
        }
    }
    file_put_contents($dir . 'index.json', json_encode($images, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'images' => $images]);
} else {
    echo json_encode(['success' => false, 'error' => 'Diretório de imagens não encontrado!']);
} 