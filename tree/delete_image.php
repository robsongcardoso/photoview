<?php
header('Content-Type: application/json');

if (!isset($_POST['filename']) || empty($_POST['filename'])) {
    echo json_encode(['success' => false, 'error' => 'Nome do arquivo não informado!']);
    exit;
}

$dir = '../images/';
$filename = basename($_POST['filename']); // segurança: impede path traversal
$filePath = $dir . $filename;

if (!file_exists($filePath)) {
    echo json_encode(['success' => false, 'error' => 'Arquivo não encontrado!']);
    exit;
}

if (!unlink($filePath)) {
    echo json_encode(['success' => false, 'error' => 'Erro ao excluir o arquivo!']);
    exit;
}

// Reconstrói o index.json
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$images = [];
foreach (scandir($dir) as $file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($ext, $allowedExtensions)) {
        $images[] = $dir . $file;
    }
}
file_put_contents($dir . 'index.json', json_encode($images, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'images' => $images]); 