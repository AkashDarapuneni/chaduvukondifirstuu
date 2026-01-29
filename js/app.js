document.addEventListener('DOMContentLoaded', () => {
    const categoryView = document.getElementById('category-view');
    const materialsContainer = document.getElementById('materials-container');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('material-search');
    const backBtn = document.getElementById('back-btn');
    const sectionTitle = document.getElementById('section-title');
    const categoryCards = document.querySelectorAll('.category-card');

    let currentCategory = null;

    // Category Selection
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            currentCategory = card.getAttribute('data-category');
            showMaterials(currentCategory);
        });
    });

    // Show Materials List
    function showMaterials(category, filter = '') {
        categoryView.classList.add('hidden');
        materialsContainer.classList.remove('hidden');
        searchContainer.classList.remove('hidden');
        backBtn.classList.remove('hidden');

        // Update Title
        const titles = {
            'ppt': 'Presentations',
            'pdf': 'Documents',
            'note': 'Notes'
        };
        sectionTitle.textContent = titles[category] || 'Materials';

        renderMaterials(category, filter);
    }

    // Render Materials with Search Filter
    function renderMaterials(category, filter = '') {
        const data = window.MATERIALS_DATA || [];
        const filtered = data.filter(item =>
            item.type === category &&
            item.title.toLowerCase().includes(filter.toLowerCase())
        );

        materialsContainer.innerHTML = '';

        if (filtered.length === 0) {
            materialsContainer.innerHTML = `
                <div class="no-results">
                    <img src="assets/images/ilaanti-silly-questions-adugutharenti-venkatesh.gif" alt="No materials">
                    <p>Em levu mawa! Try another search.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'material-card flip-card';

            const iconClass = item.type === 'ppt' ? 'fa-file-powerpoint' :
                item.type === 'pdf' ? 'fa-file-pdf' : 'fa-file-lines';

            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div class="card-icon ${item.type}">
                            <i class="fa-solid ${iconClass}"></i>
                        </div>
                        <div class="card-content">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                        <div class="card-actions">
                            <button class="btn-view" data-file="assets/${item.type}s/${item.filename}" data-id="${item.id}">View</button>
                            <a href="assets/${item.type}s/${item.filename}" class="btn-download" download="${item.filename}" target="_blank">
                                <i class="fa-solid fa-download"></i>
                            </a>
                        </div>
                    </div>
                    <div class="flip-card-back">
                        <i class="fa-solid fa-face-laugh-wink"></i>
                        <p>All the best mawa!</p>
                        <p>Baga chaduvuko!</p>
                        <button class="btn-flip-back">Ok back!</button>
                    </div>
                </div>
            `;
            materialsContainer.appendChild(card);

            // Add flip back button listener
            card.querySelector('.btn-flip-back').addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('flipped');
            });

            // Add view button listener (show in modal)
            card.querySelector('.btn-view').addEventListener('click', (e) => {
                e.preventDefault();
                showRandomMeme(); // Show GIF popup
                const filePath = e.target.getAttribute('data-file');
                if (filePath) {
                    openFileInModal(filePath, item.title, item.type);
                }
            });

            // Add download button functionality with proper file download
            const downloadBtn = card.querySelector('.btn-download');
            downloadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                showRandomMeme(); // Show GIF popup on download
                
                const filePath = e.currentTarget.getAttribute('href');
                const filename = item.filename;
                
                try {
                    // Fetch the file and create a download
                    const response = await fetch(filePath);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    // Fallback: just open in new tab if fetch fails
                    window.open(filePath, '_blank');
                }
            });

            // Add double-click to flip card (for encouragement message)
            card.addEventListener('dblclick', () => {
                card.classList.add('flipped');
            });
        });
    }

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        renderMaterials(currentCategory, e.target.value);
    });

    // Back Button Logic
    backBtn.addEventListener('click', () => {
        categoryView.classList.remove('hidden');
        materialsContainer.classList.add('hidden');
        searchContainer.classList.add('hidden');
        backBtn.classList.add('hidden');
        sectionTitle.textContent = 'Select a Category';
        searchInput.value = '';
    });

    // Function to open file in modal
    function openFileInModal(filePath, title, type) {
        const modal = document.getElementById('preview-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = modal.querySelector('.modal-body');
        const modalDownload = document.getElementById('modal-download');

        modalTitle.textContent = title;
        modalDownload.href = filePath;
        modalDownload.download = filePath.split('/').pop();

        // Create iframe for file preview
        modalBody.innerHTML = `
            <iframe src="${filePath}" 
                    style="width: 100%; height: 500px; border: none; border-radius: 10px;"
                    frameborder="0">
            </iframe>
        `;

        modal.style.display = 'flex';
    }

    // Close modal functionality
    const modal = document.getElementById('preview-modal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Simple Meme Interaction: Periodic Popups
    const memePopup = document.getElementById('meme-popup-layer');
    const memeImg = document.getElementById('meme-img');
    const memeText = document.getElementById('meme-text');

    const memes = [
        { img: 'assets/images/study5x.gif', text: 'Inka chusthu kurchuntav enti? Chaduve!' },
        { img: 'assets/images/ilaanti-silly-questions-adugutharenti-venkatesh.gif', text: 'Important questions unte cheppu mawa!' },
        { img: 'assets/images/nidra-nuvvu-naaku-nachav.gif', text: 'Mind block aipothundi... Take a break!' }
    ];

    function showRandomMeme() {
        if (!memePopup) return;
        const meme = memes[Math.floor(Math.random() * memes.length)];
        memeImg.src = meme.img;
        memeText.textContent = meme.text;
        memePopup.classList.remove('hidden');
        memePopup.classList.remove('out');

        setTimeout(() => {
            memePopup.classList.add('out');
            setTimeout(() => {
                memePopup.classList.add('hidden');
            }, 300);
        }, 3000);
    }

    // Floating Emojis Effect
    function spawnFloatingEmoji() {
        const emojis = ['😂', '🔥', '🎓', '🚀', '💀', '💯', '💅', '✨', '🥶'];
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        document.body.appendChild(emoji);

        // Remove after animation
        setTimeout(() => {
            emoji.remove();
        }, 4000);
    }

    // Spawn emoji every 10 seconds
    setInterval(spawnFloatingEmoji, 10000);

    // Show first meme after 5 seconds, then random meme every 60 seconds
    setTimeout(showRandomMeme, 5000);
    setInterval(showRandomMeme, 60000);
});
