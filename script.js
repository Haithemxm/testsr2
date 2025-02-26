document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const catGif = document.getElementById('catGif');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const polaroidContainer = document.getElementById('polaroidContainer');
    const photoModal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');
    const floatingElements = document.querySelector('.floating-elements');

    // Array of cat GIFs for different expressions
    const catGifs = [
        'cat-angry1.gif',
        'cat-angry2.gif',
        'cat-angry3.gif',
        'cat-angry4.gif',
        'cat-angry5.gif'
    ];

    let currentGifIndex = 0;

    // Function to get random position for NO button
    function moveNoButton() {
        // Get viewport and button dimensions with extra safety margin
        const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth) - 50;
        const viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight) - 50;
        const buttonWidth = noBtn.offsetWidth + 20; // Add padding
        const buttonHeight = noBtn.offsetHeight + 20; // Add padding
        
        // Ensure we have space to move
        if (buttonWidth >= viewportWidth || buttonHeight >= viewportHeight) {
            return; // Prevent movement if viewport is too small
        }
        
        // Define very strict boundaries (25% inside viewport)
        const safeMargin = Math.max(buttonWidth, buttonHeight, viewportWidth * 0.25);
        const minX = safeMargin;
        const maxX = viewportWidth - buttonWidth - safeMargin;
        const minY = safeMargin;
        const maxY = viewportHeight - buttonHeight - safeMargin;
        
        // Calculate new position
        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (maxY - minY) + minY;
        
        // Apply new position
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.round(newX)}px`;
        noBtn.style.top = `${Math.round(newY)}px`;
        
        // Change cat GIF
        currentGifIndex = (currentGifIndex + 1) % catGifs.length;
        catGif.src = catGifs[currentGifIndex];
    }

    // Initialize Polaroid photos
    function initializePage2() {
        if (!polaroidContainer) return;
        
        // Clear existing content
        polaroidContainer.innerHTML = '';
        
        // Array of photo paths
        const photos = [
            'photo1.jpg',
            'photo2.jpg',
            'photo3.jpg',
            'photo4.jpg',
            'photo5.png',
            'photo6.jpg'
        ];

        // Create polaroid elements
        photos.forEach((photo, index) => {
            const polaroid = document.createElement('div');
            polaroid.className = 'polaroid';
            polaroid.style.opacity = '0';
            
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `Memory ${index + 1}`;
            
            polaroid.appendChild(img);
            polaroidContainer.appendChild(polaroid);

            // Add click handler for enlarging photo
            polaroid.addEventListener('click', () => {
                if (modalImage && photoModal) {
                    modalImage.src = photo;
                    photoModal.style.display = 'flex';
                    requestAnimationFrame(() => {
                        photoModal.classList.add('active');
                    });
                    document.body.style.overflow = 'hidden';
                }
            });

            // Add fade-in animation with delay
            setTimeout(() => {
                polaroid.style.opacity = '1';
                // Add random rotation
                const rotation = index % 2 === 0 ? -2 : 2;
                polaroid.style.transform = `rotate(${rotation}deg)`;
            }, index * 200);
        });
    }

    // Create floating elements
    function createFloatingElement(config) {
        const element = document.createElement('div');
        element.className = `floating-element ${config.class}`;
        
        if (config.emoji) {
            element.textContent = config.emoji;
        }

        // Random starting position with more spread
        const side = Math.random() > 0.5 ? 'left' : 'right';
        element.style[side] = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
        const delay = -Math.random() * duration; // Random start point in animation
        element.style.setProperty('--float-duration', `${duration}s`);
        element.style.animationDelay = `${delay}s`;

        // Random size variation
        const scale = 0.8 + Math.random() * 0.4; // Random scale between 0.8 and 1.2
        element.style.transform = `scale(${scale})`;

        return element;
    }

    // Initialize floating elements
    function initFloatingElements() {
        if (!floatingElements) return;
        
        const floatingConfig = {
            hearts: {
                emoji: '♥',
                class: 'floating-heart',
                count: 10,
                minDuration: 4,
                maxDuration: 6
            },
            sparkles: {
                class: 'floating-sparkle',
                count: 15,
                minDuration: 3,
                maxDuration: 5
            },
            stars: {
                emoji: '⭐',
                class: 'floating-star',
                count: 8,
                minDuration: 5,
                maxDuration: 7
            },
            petals: {
                emoji: '🌸',
                class: 'floating-petal',
                count: 8,
                minDuration: 6,
                maxDuration: 8
            }
        };

        Object.values(floatingConfig).forEach(config => {
            for (let i = 0; i < config.count; i++) {
                const element = createFloatingElement(config);
                floatingElements.appendChild(element);
                
                // Remove and recreate element after animation
                element.addEventListener('animationend', () => {
                    element.remove();
                    setTimeout(() => {
                        const newElement = createFloatingElement(config);
                        floatingElements.appendChild(newElement);
                    }, Math.random() * 1000); // Random delay before recreating
                });
            }
        });
    }

    // Initialize floating elements
    initFloatingElements();

    // Button Event Listeners
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            if (page1 && page2) {
                // Create heart transition element
                const heartTransition = document.createElement('div');
                heartTransition.className = 'heart-transition';
                heartTransition.innerHTML = '<div class="heart-icon">❤️</div>';
                document.body.appendChild(heartTransition);
                
                // Create floating hearts
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.className = 'floating-heart';
                        heart.innerHTML = '❤️';
                        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
                        heart.style.left = `${Math.random() * 100}%`;
                        heart.style.top = `${Math.random() * 100}%`;
                        document.body.appendChild(heart);
                        
                        // Remove heart after animation completes
                        setTimeout(() => {
                            heart.remove();
                        }, 2000);
                    }, i * 100);
                }
                
                // Add exit animation to page 1
                page1.classList.add('page-exit');
                
                // Show heart transition
                setTimeout(() => {
                    heartTransition.classList.add('heart-active');
                }, 300);
                
                // Hide heart transition and show page 2
                setTimeout(() => {
                    heartTransition.classList.remove('heart-active');
                    heartTransition.classList.add('heart-inactive');
                    
                    page1.style.display = 'none';
                    page2.style.display = 'block';
                    initializePage2();
                    
                    // Add enter animation to page 2
                    setTimeout(() => {
                        page2.classList.add('page-enter');
                    }, 50);
                    
                    // Remove heart transition element after it's done
                    setTimeout(() => {
                        heartTransition.remove();
                    }, 1000);
                }, 1500);
                
                window.scrollTo(0, 0);
            }
        });
    }

    if (noBtn) {
        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('click', moveNoButton);
    }

    // Modal Event Listeners
    if (closeButton && photoModal) {
        closeButton.addEventListener('click', () => {
            photoModal.classList.remove('active');
            setTimeout(() => {
                photoModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
    }

    if (photoModal) {
        photoModal.addEventListener('click', (e) => {
            if (e.target === photoModal) {
                photoModal.classList.remove('active');
                setTimeout(() => {
                    photoModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }

    // Escape key handler for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && photoModal && photoModal.classList.contains('active')) {
            photoModal.classList.remove('active');
            setTimeout(() => {
                photoModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });
});
