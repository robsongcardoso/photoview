document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const notification = document.getElementById('notification');

    // Function to show notification
    function showNotification() {
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }

    // Function to copy link to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showNotification();
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    // Function to create image card
    function createImageCard(imagePath) {
        const card = document.createElement('div');
        card.className = 'image-card';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Imagem';
        img.loading = 'lazy';

        const imageInfo = document.createElement('div');
        imageInfo.className = 'image-info';

        const title = document.createElement('h3');
        title.textContent = imagePath.split('/').pop();

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copiar Link';
        copyButton.onclick = () => copyToClipboard(window.location.origin + '/' + imagePath);

        imageContainer.appendChild(img);
        imageInfo.appendChild(title);
        imageInfo.appendChild(copyButton);
        card.appendChild(imageContainer);
        card.appendChild(imageInfo);

        return card;
    }

    // Function to load images from the images directory
    async function loadImages() {
        try {
            // Tenta carregar o arquivo de índice de imagens
            const response = await fetch('images/index.json');
            const images = await response.json();
            
            if (images.length === 0) {
                gallery.innerHTML = '<p>Nenhuma imagem encontrada. Adicione imagens na pasta "images" e atualize o arquivo index.json</p>';
                return;
            }

            images.forEach(imagePath => {
                const card = createImageCard(imagePath);
                gallery.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading images:', error);
            gallery.innerHTML = '<p>Erro ao carregar as imagens. Por favor, verifique se o arquivo images/index.json existe.</p>';
        }
    }

    // Load images when the page loads
    loadImages();
}); 