
// FOUC Prevention - Show page when CSS is loaded
function showPageWhenReady() {
    // Check if CSS is loaded by testing a style property
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.className = 'category-card'; // Use a class that should be styled
    document.body.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const hasStyles = computedStyle.boxShadow !== 'none' || computedStyle.borderRadius !== '0px';
    
    document.body.removeChild(testElement);
    
    if (hasStyles) {
        document.body.classList.add('loaded');
    } else {
        // Retry after a short delay if styles aren't loaded yet
        setTimeout(showPageWhenReady, 10);
    }
}

// Start the check immediately
showPageWhenReady();

document.addEventListener('DOMContentLoaded', function() {
    // Ensure page is shown even if CSS check fails
    setTimeout(() => {
        if (!document.body.classList.contains('loaded')) {
            document.body.classList.add('loaded');
        }
    }, 100);

    const modal = document.getElementById('media-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalButton = document.getElementById('modal-close');
    const ctaButtons = document.querySelectorAll('.card-cta');

    // Funktion zum Öffnen des Modals
    const openModal = (type, src) => {
        // Vorherigen Inhalt leeren, um z.B. Videos zu stoppen
        modalBody.innerHTML = '';

        if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.autoplay = true;
            video.muted = true; // Wichtig für Autoplay in den meisten Browsern
            video.loop = true;
            video.playsInline = true; // Wichtig für iOS
            video.controls = false; // Keine Steuerelemente für den Kino-Look
            modalBody.appendChild(video);
        }

        if (type === '3d') {
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('mozallowfullscreen', 'true');
            iframe.setAttribute('webkitallowfullscreen', 'true');
            iframe.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking');
            modalBody.appendChild(iframe);
        }
        
        modal.classList.add('active');
    };
    
    // Funktion zum Schließen des Modals
    const closeModal = () => {
        modal.classList.remove('active');
        // Inhalt leeren, um Video/Audio im Hintergrund zu stoppen
        modalBody.innerHTML = '';
    };

    // Event Listeners für die CTA-Buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const src = button.dataset.src;
            openModal(type, src);
        });
    });

    // Event Listeners zum Schließen
    closeModalButton.addEventListener('click', closeModal);
    
    // Schließen bei Klick auf den Hintergrund
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Schließen bei Drücken der Escape-Taste
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
