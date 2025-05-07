# PhotoView

Um visualizador de imagens estático com funcionalidade de copiar links.

## Funcionalidades

- Visualização de imagens em grade responsiva
- Listagem automática de imagens do diretório `/images`
- Botão de copiar link com um clique
- Interface moderna e responsiva
- Suporte para formatos de imagem comuns (JPG, PNG, GIF, WebP)
- Interface de administração para upload e gerenciamento de imagens
- Site 100% estático - não requer servidor Node.js

## Requisitos

- Servidor web com suporte a PHP (apenas para a interface de administração)
- Permissões de escrita na pasta `images/`

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd photoview
```

2. Faça upload de todos os arquivos para seu servidor web

3. Certifique-se de que a pasta `images/` tem permissões de escrita:
```bash
chmod 777 images
```

## Uso

### Visualização de Imagens
1. Acesse o site normalmente para ver as imagens
2. Use o botão "Copiar Link" para copiar o link direto de qualquer imagem

### Administração de Imagens
1. Acesse `admin.html` para gerenciar as imagens
2. Na interface de administração você pode:
   - Fazer upload de novas imagens (arrastando ou clicando para selecionar)
   - Ver todas as imagens existentes
   - Excluir imagens indesejadas
   - O índice é atualizado automaticamente

## Estrutura de Arquivos

- `index.html` - Página principal do visualizador
- `admin.html` - Interface de administração
- `upload.php` - Script para processar uploads
- `styles.css` - Estilos CSS
- `script.js` - JavaScript para funcionalidades dinâmicas
- `images/` - Diretório para armazenar as imagens
- `images/index.json` - Lista de imagens (gerado automaticamente)

## Segurança

- A interface de administração não possui autenticação por padrão
- Recomenda-se adicionar proteção básica como:
  - Autenticação HTTP básica
  - Restrição de IP
  - Proteção por senha
  - HTTPS

## Dicas

- Mantenha backups regulares da pasta `images/`
- Monitore o espaço em disco do servidor
- Use imagens otimizadas para web para melhor performance
- Considere adicionar autenticação à interface de administração 