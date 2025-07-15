
document.addEventListener('DOMContentLoaded', function() {
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

    // Event Listeners nur für Video-Buttons (nicht für Navigation-Links)
    ctaButtons.forEach(button => {
        // Nur für button-Elemente mit data-type="video" das Modal öffnen
        if (button.tagName === 'BUTTON' && button.dataset.type === 'video') {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                const src = button.dataset.src;
                openModal(type, src);
            });
        }
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

    // ----------- MOBILE STICKY CTA BAR HIDE/SHOW -----------
    // Nur auf mobilen Geräten aktivieren
    if (window.innerWidth <= 768) {
        let lastScrollTop = 0;
        const stickyBar = document.querySelector('.sticky-cta-bar');
        
        if (stickyBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrollen nach unten - CTA Bar verstecken
                    stickyBar.classList.add('hidden');
                } else if (scrollTop < lastScrollTop) {
                    // Scrollen nach oben - CTA Bar zeigen
                    stickyBar.classList.remove('hidden');
                }
                
                lastScrollTop = scrollTop;
            });
        }
    }
});
