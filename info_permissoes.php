<?php
echo "<h2>Versão do PHP:</h2>";
echo phpversion();

echo "<h2>Usuário executando o PHP:</h2>";
echo get_current_user();
echo "<br>UID: " . getmyuid();

$dir = 'images'; // Altere para o diretório que deseja checar
echo "<h2>Permissões da pasta '$dir':</h2>";
if (file_exists($dir)) {
    $perms = fileperms($dir);
    echo "Permissões numéricas: " . substr(sprintf('%o', $perms), -4) . "<br>";
    echo "Permissões simbólicas: " . substr(decoct($perms), -3) . "<br>";
    echo "É gravável pelo PHP? " . (is_writable($dir) ? "Sim" : "Não");
} else {
    echo "Diretório não encontrado!";
}
?> 