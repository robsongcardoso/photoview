<?php
header('Content-Type: application/json');

// Configurações
$uploadDir = '../images/';
$indexFile = $uploadDir . 'index.json';
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

// Cria o diretório se não existir
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Cria o arquivo index.json se não existir
if (!file_exists($indexFile)) {
    file_put_contents($indexFile, '[]');
}

try {
    // Processa o upload das imagens
    if (isset($_FILES['images'])) {
        foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
            $file = [
                'name' => $_FILES['images']['name'][$key],
                'type' => $_FILES['images']['type'][$key],
                'tmp_name' => $tmp_name,
                'error' => $_FILES['images']['error'][$key],
                'size' => $_FILES['images']['size'][$key]
            ];

            // Verifica se é uma imagem válida
            if (!in_array($file['type'], $allowedTypes)) {
                throw new Exception('Tipo de arquivo não permitido: ' . $file['name']);
            }

            // Move o arquivo para o diretório de imagens
            $destination = $uploadDir . basename($file['name']);
            if (!move_uploaded_file($file['tmp_name'], $destination)) {
                throw new Exception('Erro ao mover o arquivo: ' . $file['name']);
            }
        }
    }

    // Atualiza o arquivo index.json
    if (isset($_FILES['index.json'])) {
        $indexContent = file_get_contents($_FILES['index.json']['tmp_name']);
        error_log('index.json recebido via FILES: ' . $indexContent);
    } elseif (isset($_POST['index.json'])) {
        $indexContent = $_POST['index.json'];
        error_log('index.json recebido via POST: ' . $indexContent);
    } else {
        $indexContent = false;
        error_log('index.json não recebido.');
    }

    if ($indexContent !== false) {
        // Valida se o conteúdo é um JSON válido
        json_decode($indexContent);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Conteúdo JSON inválido');
        }

        if (!file_put_contents($indexFile, $indexContent)) {
            throw new Exception('Erro ao salvar o arquivo index.json');
        }
    }

    // Reconstrói o index.json automaticamente após upload
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
    }

    // Retorna o conteúdo atual do index.json
    $currentIndex = file_get_contents($indexFile);
    echo json_encode([
        'success' => true,
        'images' => json_decode($currentIndex)
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'success' => false
    ]);
} 