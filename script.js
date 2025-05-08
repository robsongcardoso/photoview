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

    // Function to create image list item
    function createImageListItem(imagePath) {
        const item = document.createElement('div');
        item.className = 'image-list-item';

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Thumb';
        img.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'image-list-info';

        const title = document.createElement('div');
        title.className = 'image-list-title';
        title.textContent = imagePath.split('/').pop();

        info.appendChild(title);

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button image-list-copy';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copiar Link';
        copyButton.onclick = () => copyToClipboard(window.location.origin + '/' + imagePath);

        item.appendChild(img);
        item.appendChild(info);
        item.appendChild(copyButton);
        return item;
    }

    let currentView = 'grid';
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    if (toggleViewBtn) {
        toggleViewBtn.addEventListener('click', () => {
            currentView = currentView === 'grid' ? 'list' : 'grid';
            toggleViewBtn.textContent = currentView === 'grid' ? 'Visualizar em Lista' : 'Visualizar em Grade';
            loadImages();
        });
    }

    // Function to load images from the images directory
    async function loadImages() {
        try {
            // Tenta carregar o arquivo de índice de imagens
            const response = await fetch('images/index.json?t=' + Date.now());
            const images = await response.json();
            gallery.innerHTML = '';
            if (images.length === 0) {
                gallery.innerHTML = '<p>Nenhuma imagem encontrada. Adicione imagens na pasta "images" e atualize o arquivo index.json</p>';
                return;
            }
            if (currentView === 'grid') {
                gallery.className = 'image-grid';
                images.forEach(imagePath => {
                    const card = createImageCard(imagePath);
                    gallery.appendChild(card);
                });
            } else {
                gallery.className = 'image-list';
                images.forEach(imagePath => {
                    const item = createImageListItem(imagePath);
                    gallery.appendChild(item);
                });
            }
        } catch (error) {
            console.error('Error loading images:', error);
            gallery.innerHTML = '<p>Erro ao carregar as imagens. Por favor, verifique se o arquivo images/index.json existe.</p>';
        }
    }

    // Load images when the page loads
    loadImages();
}); 