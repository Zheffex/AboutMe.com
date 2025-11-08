// ============================================
// PERSONAL DIARY - MAIN SCRIPT
// Smooth scrolling, animations, and interactions
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initCarSlider();
    initSmoothScrolling();
    initMusicPlayer();
    initGalleryModal();
    initAppModals();
    initExpandableCards();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-content, .hobbies-grid, .place-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// CAR SLIDER FUNCTIONALITY
// ============================================
function initCarSlider() {
    const slider = document.getElementById('car-slider');
    const slides = document.querySelectorAll('.car-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const thumbs = document.querySelectorAll('.car-thumb');
    const mainTitle = document.getElementById('car-main-title');
    const mainDescription = document.getElementById('car-main-description');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Car data for each slide - All Black Supras
    const carData = [
        {
            title: 'MK4 Supra',
            description: 'The legendary A80 generation. Twin-turbo 2JZ-GTE engine, timeless design, and an icon of 90s Japanese engineering. This black beauty represents the golden era of Toyota\'s performance heritage.',
            bgImage: '../assets/supra/supra.jpg'
        },
        {
            title: 'MK5 Supra',
            description: 'The modern revival. BMW-powered with Toyota soul. A sleek black silhouette that pays homage to its legendary predecessor while embracing cutting-edge technology and performance.',
            bgImage: '../assets/supra/supra1.jpg'
        },
        {
            title: 'Modified Beast',
            description: 'Customized to perfection. Wide body kits, aggressive aero, and tuned for maximum performance. This black Supra showcases the endless possibilities of aftermarket passion.',
            bgImage: '../assets/supra/supra2.jpg'
        },
        {
            title: 'Stock Purity',
            description: 'Factory perfection in black. Unmodified, unadulterated, pure Supra essence. Every curve and line exactly as the engineers intended - a masterpiece in its original form.',
            bgImage: '../assets/supra/supra3.jpg'
        },
        {
            title: 'Legendary Icon',
            description: 'More than a car - a cultural phenomenon. The black Supra transcends automotive boundaries, appearing in films, games, and the hearts of enthusiasts worldwide. Forever legendary.',
            bgImage: '../assets/supra/supra4.jpg'
        }
    ];
    
    // Preload images for faster transitions
    function preloadImages() {
        carData.forEach(car => {
            const img = new Image();
            img.src = car.bgImage;
        });
    }
    
    // Preload all images on initialization
    preloadImages();
    
    // Get addiction section for background update
    const addictionSection = document.querySelector('.addiction');
    
    // Function to update content and background
    function updateContent(index) {
        if (mainTitle) {
            mainTitle.textContent = carData[index].title;
        }
        if (mainDescription) {
            mainDescription.textContent = carData[index].description;
        }
        
        // Update background image
        if (addictionSection) {
            addictionSection.style.setProperty('--bg-image', `url('${carData[index].bgImage}')`);
        }
    }
    
    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and thumbs
        slides.forEach(slide => slide.classList.remove('active'));
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to current slide and thumb
        slides[index].classList.add('active');
        if (thumbs[index]) thumbs[index].classList.add('active');
        
        // Update content
        updateContent(index);
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Function to go to specific slide
    function goToSlide(index) {
        showSlide(index);
        resetAutoSlide();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    // Event listeners for thumbnails
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            goToSlide(index);
        });
        
        // Add hover functionality for faster preview
        thumb.addEventListener('mouseenter', () => {
            // Quick preview on hover without changing the active state
            if (currentSlide !== index) {
                // Temporarily show the hovered image
                slides.forEach(slide => slide.classList.remove('active'));
                slides[index].classList.add('active');
                
                // Revert back to current slide after a short delay if not clicked
                setTimeout(() => {
                    if (currentSlide !== index) {
                        slides.forEach(slide => slide.classList.remove('active'));
                        slides[currentSlide].classList.add('active');
                    }
                }, 300);
            }
        });
    });
    
    // Pause auto-slide on hover
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });
    
    // Initialize first slide
    showSlide(0);
    
    // Start auto-slide
    startAutoSlide();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const handleScroll = throttle(function() {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', handleScroll);

// ============================================
// MUSIC PLAYER FUNCTIONALITY
// ============================================
function initMusicPlayer() {
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    
    if (!bgMusic || !musicToggle) return;
    
    // Auto-play handling with user interaction
    let userInteracted = false;
    
    // Listen for any user interaction to enable audio
    document.addEventListener('click', function enableAudio() {
        if (!userInteracted) {
            userInteracted = true;
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
            }).catch(error => {
                console.log('Audio autoplay prevented:', error);
            });
            // Remove this event listener after first interaction
            document.removeEventListener('click', enableAudio);
        }
    }, { once: true });
    
    // Toggle play/pause on button click
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        }
    });
    
    // Update button state when audio ends
    bgMusic.addEventListener('ended', function() {
        musicToggle.classList.remove('playing');
    });
    
    // Handle volume control (optional - you can add a volume slider later)
    bgMusic.volume = 0.3; // Set initial volume to 30%
}

// ============================================
// GALLERY MODAL FUNCTIONALITY
// ============================================
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalContent = document.querySelector('.gallery-modal-content');
    const closeBtn = document.querySelector('.gallery-close');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryGrid = document.getElementById('gallery-grid');
    const clickableItems = document.querySelectorAll('.hobby-clickable');
    // Track current gallery list and index for slideshow navigation
    let currentGalleryType = null;
    let currentItems = [];
    let currentIndex = 0;
    
    if (!modal || !closeBtn || !galleryTitle || !galleryGrid) return;
    
    // Gallery data mapping
    const galleryData = {
        travel: {
            title: 'Scenic Nature Locations',
            folder: 'assets/natureView',
            items: [
                { name: 'Lake Braies, Dolomites – Italy', file: 'Nature1.jpg' },
                { name: 'Moraine Lake – Banff, Canada', file: 'Nature2.png' },
                { name: 'Aurora Borealis – Tromsø, Norway', file: 'Nature3.jpg' },
                { name: 'Nordic Fjord – Western Norway', file: 'Nature4.jpg' },
                { name: 'Oeschinen Lake – Bernese Oberland, Switzerland', file: 'Nature6.jpg' },
                { name: 'Emerald Lake – Yoho National Park, Canada', file: 'Nature7.jpg' },
                { name: 'Northern Lights – Abisko, Sweden', file: 'Nature8.jpg' },
                { name: 'Christmas Market – Rothenburg ob der Tauber, Germany', file: 'Nature9.jpg' },
                { name: 'Manhattan Skyline – New York City, USA', file: 'Nature10.jpg' },
                { name: 'Old Town – Prague, Czech Republic', file: 'Nature12.jpg' },
                { name: 'Historic Alley – San Miguel de Allende, Mexico', file: 'Nature13.jpg' }
            ]
        },
        places: {
            title: 'Sacred Architecture',
            folder: 'assets/cathedral/france',
            items: [
                { name: 'Notre-Dame de Paris', file: 'Notre-Dame de Paris – Paris.jpg' },
                { name: 'Chartres Cathedral', file: 'Chartres Cathedral – Chartres.jpg' },
                { name: 'Amiens Cathedral', file: 'Amiens Cathedral – Amiens.jpg' },
                { name: 'Reims Cathedral', file: 'Reims Cathedral – Reims.jpg' },
                { name: 'Strasbourg Cathedral', file: 'Strasbourg Cathedral – Strasbourg (Alsace).jpg' },
                { name: 'Beauvais Cathedral', file: 'Beauvais Cathedral – Beauvais (tallest Gothic choir ever built).jpg' },
                { name: 'Bourges Cathedral', file: 'Bourges Cathedral – Bourges.jpg' },
                { name: 'Rouen Cathedral', file: 'Rouen Cathedral – Rouen.jpg' },
                { name: 'Laon Cathedral', file: 'Laon Cathedral – Laon.jpg' },
                { name: 'Saint-Denis Basilica', file: 'Saint-Denis Basilica – near Paris (first truly Gothic building).jpg' }
            ]
        },
        cinema: {
            title: 'Horror Films Collection',
            folder: 'assets/horrorFilms',
            items: [
                { name: 'A Nightmare on ELM STREET', file: 'A Nightmare on ELM STREET.jpg' },
                { name: 'Annabelle', file: 'Annabelle.jpg' },
                { name: 'Chainsaw', file: 'Chainsaw..jpg' },
                { name: 'Chucky', file: 'Chucky.jpg' },
                { name: 'Dead Silence', file: 'DeadSilence.jpg' },
                { name: 'Dracula', file: 'Dracula.jpg' },
                { name: 'The Black Phone', file: 'Ehan Hawke The Black Phone.jpg' },
                { name: 'Evil Dead', file: 'EvilDead.jpg' },
                { name: 'Frankenstein', file: 'Frankenstein.jpg' },
                { name: 'IT', file: 'IT.jpg' },
                { name: 'Insidious', file: 'Insidious.jpg' },
                { name: 'JIGSAW', file: 'JIGSAW..jpg' },
                { name: 'Jeepers Creeper', file: 'Jeepers Creeper.jpg' },
                { name: 'Nosferatu', file: 'Nosferatu.jpg' },
                { name: 'Orphan', file: 'Orphan.jpg' },
                { name: 'Psycho', file: 'Psycho.jpg' },
                { name: 'Rosemary’s Baby', file: 'Rosemary’s Baby.jpg' },
                { name: 'Smile', file: 'Smile.jpg' },
                { name: 'Terrifier', file: 'Terrifier.jpg' },
                { name: 'Thanksgiving', file: 'Thanxsgiving.jpg' },
                { name: 'The Birds', file: 'The Birds.jpg' },
                { name: 'The Exorcist', file: 'The Exorcist.jpg' },
                { name: 'The Wolf Man', file: 'The Wolf Man.jpg' },
                { name: 'The Nun', file: 'The nun.jpg' },
                { name: 'The Boy', file: 'TheBoy.jpg' },
                { name: 'The Jester', file: 'TheJester..jpg' },
                { name: 'The Strangers', file: 'TheStrangers..jpg' },
                { name: 'Wrong Turn', file: 'WrongTurn.jpg' },
                { name: 'Black Friday', file: 'blackfriday.jpg' }
            ]
        },
        music: {
            title: 'Music Collection',
            folder: 'assets/song',
            items: [
                { name: 'Calvin Harris - Outside', file: 'Calvin Harris - Outside (Lyrics) ft. Ellie Goulding.mp3' },
                { name: 'Cintamu Sepahit Topi Miring', file: 'Cintamu Sepahit Topi Miring.mp3' },
                { name: 'DJ Goreng Goreng', file: 'DJ GORENG GORENG BY DJ SOPAN JEDAG JEDUG VIRAL TIK TOK TERBARU 2022 YANG KALIAN CARI.mp3' },
                { name: 'DJ Lagi Tamvan', file: 'DJ LAGI TAMVAN X LAGI SYANTIK  DJ JEDAG JEDUG VIRAL TIK TOK REVERB!!!.mp3' },
                { name: 'DJ Romlos Propun', file: 'DJ ROMLOS PROPUN THAI X INDO MASHUP TRENDING 2025 REMIX  DJ FERNZ BASS.mp3' },
                { name: 'Eminem - Love The Way You Lie', file: 'Eminem - Love The Way You Lie ft. Rihanna.mp3' },
                { name: 'Heyek Crew - Suwung', file: 'Heyek Crew - Suwung (Lyrics  Lyrics Video).mp3' },
                { name: 'Like a Prayer Choir', file: 'I\'ll Take You There Choir - Like a Prayer (Choir Version From Deadpool & Wolverine).mp3' },
                { name: 'Lady Gaga - Judas', file: 'Lady Gaga - Judas (Lyrics).mp3' },
                { name: 'Montagem Xonada', file: 'MONTAGEM XONADA.mp3' },
                { name: 'Multo - Cup of Joe', file: 'Multo - Cup of Joe (Official Lyric Video).mp3' },
                { name: 'Kiyo - Eba', file: 'kiyo - Eba (Official Lyric Video).mp3' }
            ]
        }
    };
    
    // Function to open modal and load gallery
    function openGallery(hobbyType) {
        const data = galleryData[hobbyType];
        if (!data) return;
        
        // Track current items for fullscreen navigation
        currentGalleryType = hobbyType;
        currentItems = data.items.map(item => ({ src: `${data.folder}/${item.file}` , name: item.name }));
        currentIndex = 0;

        // Set gallery title
        galleryTitle.textContent = data.title;
        
        // Clear existing gallery items
        galleryGrid.innerHTML = '';
        
        // Add category-specific styling to modal
        modal.className = 'gallery-modal';
        if (hobbyType === 'cinema') {
            modal.classList.add('cinema-modal');
        } else if (hobbyType === 'travel') {
            modal.classList.add('travel-modal');
        } else if (hobbyType === 'music') {
            modal.classList.add('music-modal');
        } else if (hobbyType === 'places') {
            modal.classList.add('places-modal');
        }
        
        // Create gallery items with staggered animation
        data.items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            if (hobbyType === 'music') {
                // For music items, create Spotify-like card with album art
                const seed = encodeURIComponent(item.name.replace(/[^a-z0-9]/gi, '-'));
                galleryItem.innerHTML = `
                    <div class="gallery-audio-item">
                        <div class="album-art">
                            <img src="https://picsum.photos/seed/${seed}/400/400" alt="${item.name} cover" loading="lazy" />
                            <button class="album-play" aria-label="Play"><i class="fas fa-play"></i></button>
                        </div>
                        <div class="audio-meta">
                            <div class="track-title">${item.name}</div>
                            <div class="music-visualizer">
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                            </div>
                        </div>
                        <audio class="audio-player" controls preload="none" style="width: 100%; margin-top: 0.75rem;">
                            <source src="${data.folder}/${item.file}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                `;

                // Hook up play button to audio
                const audioEl = galleryItem.querySelector('.audio-player');
                const playBtn = galleryItem.querySelector('.album-play');
                const container = galleryItem.querySelector('.gallery-audio-item');
                const visualizer = galleryItem.querySelector('.music-visualizer');

                function pauseOthers() {
                    const allAudios = modal.querySelectorAll('audio.audio-player');
                    allAudios.forEach(a => {
                        if (a !== audioEl) a.pause();
                    });
                }

                function updateUI(isPlaying) {
                    if (isPlaying) {
                        container.classList.add('playing');
                        if (visualizer) visualizer.classList.add('playing');
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    } else {
                        container.classList.remove('playing');
                        if (visualizer) visualizer.classList.remove('playing');
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    }
                }

                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (audioEl.paused) {
                        pauseOthers();
                        audioEl.play();
                    } else {
                        audioEl.pause();
                    }
                });

                // Also toggle play on album art click
                const albumArt = galleryItem.querySelector('.album-art');
                albumArt.addEventListener('click', (e) => {
                    // Avoid double-trigger when clicking the button
                    if (e.target.closest('.album-play')) return;
                    if (audioEl.paused) {
                        pauseOthers();
                        audioEl.play();
                    } else {
                        audioEl.pause();
                    }
                });

                audioEl.addEventListener('play', () => updateUI(true));
                audioEl.addEventListener('pause', () => updateUI(false));
            } else {
                // For image items with enhanced hover effects
                galleryItem.innerHTML = `
                    <div class="gallery-image-container">
                        <img src="${data.folder}/${item.file}" alt="${item.name}" loading="lazy" data-index="${index}">
                        <div class="gallery-image-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-search-plus"></i>
                                <span>View Full Size</span>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-item-name">${item.name}</div>
                `;
                
                // Add click event for full-size viewing
                galleryItem.addEventListener('click', function() {
                    if (hobbyType !== 'music') {
                        currentIndex = index;
                        openImageViewer(currentIndex);
                    }
                });
            }
            
            galleryGrid.appendChild(galleryItem);
        });
        
        // Show modal with enhanced animation
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    }
    
    // Full-size image viewer with slideshow navigation
    function openImageViewer(startIndex) {
        currentIndex = startIndex;
        const viewer = document.createElement('div');
        viewer.className = 'image-viewer';
        viewer.innerHTML = `
            <div class="image-viewer-content">
                <img class="image-viewer-img" src="${currentItems[currentIndex].src}" alt="${currentItems[currentIndex].name}">
                <div class="image-viewer-close" aria-label="Close">&times;</div>
                <button class="image-viewer-prev" aria-label="Previous">&#10094;</button>
                <button class="image-viewer-next" aria-label="Next">&#10095;</button>
                <div class="image-viewer-caption">${currentItems[currentIndex].name}</div>
            </div>
        `;

        // Helper to update image and caption
        function renderImage() {
            const img = viewer.querySelector('.image-viewer-img');
            const caption = viewer.querySelector('.image-viewer-caption');
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = currentItems[currentIndex].src;
                img.alt = currentItems[currentIndex].name;
                caption.textContent = currentItems[currentIndex].name;
                img.onload = () => {
                    img.style.opacity = '1';
                };
            }, 120);
            // Preload neighbors
            const nextIdx = (currentIndex + 1) % currentItems.length;
            const prevIdx = (currentIndex - 1 + currentItems.length) % currentItems.length;
            [nextIdx, prevIdx].forEach(i => {
                const pre = new Image();
                pre.src = currentItems[i].src;
            });
        }

        document.body.appendChild(viewer);

        // Navigation handlers
        const prevBtn = viewer.querySelector('.image-viewer-prev');
        const nextBtn = viewer.querySelector('.image-viewer-next');
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
            renderImage();
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentItems.length;
            renderImage();
        });

        // Close viewer when clicking outside or on close button
        viewer.addEventListener('click', function(e) {
            if (e.target === viewer || e.target.classList.contains('image-viewer-close')) {
                viewer.remove();
            }
        });

        // Keyboard controls
        document.addEventListener('keydown', function keyHandler(e) {
            if (e.key === 'Escape') {
                viewer.remove();
                document.removeEventListener('keydown', keyHandler);
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
                renderImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentItems.length;
                renderImage();
            }
        });

        // Initial render
        renderImage();
    }
    
    // Function to close modal
    function closeGallery() {
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            galleryGrid.innerHTML = '';
        }, 300);
    }
    
    // Event listeners for clickable hobby items
    clickableItems.forEach(item => {
        item.addEventListener('click', function() {
            const hobbyType = this.getAttribute('data-hobby');
            if (hobbyType) {
                openGallery(hobbyType);
            }
        });
    });
    
    // Event listeners for modal close
    closeBtn.addEventListener('click', closeGallery);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGallery();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeGallery();
        }
    });
    
    // Initialize modal styles
    modalContent.style.transform = 'scale(0.7)';
    modalContent.style.opacity = '0';
    modalContent.style.transition = 'all 0.3s ease';
}

// ============================================
// APP MODALS: Read Me & Message Envelope
// ============================================
function initAppModals() {
    const readBtn = document.getElementById('readme-btn');
    const readModal = document.getElementById('readme-modal');
    const messageBtn = document.getElementById('message-btn');
    const messageModal = document.getElementById('message-modal');
    const envelope = document.getElementById('envelope');

    const openModal = (modal) => {
        if (modal) {
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        }
    };
    const closeModal = (modal) => {
        if (modal) {
            modal.setAttribute('aria-hidden', 'true');
            if (modal === messageModal && envelope) {
                envelope.classList.remove('open');
            }
        }

        // Remove modal-open class if no modals remain open
        const anyOpen = [readModal, messageModal].some(m => m && m.getAttribute('aria-hidden') === 'false');
        if (!anyOpen) {
            document.body.classList.remove('modal-open');
        }
    };

    if (readBtn && readModal) {
        readBtn.addEventListener('click', () => openModal(readModal));
    }

    if (messageBtn && messageModal) {
        messageBtn.addEventListener('click', () => openModal(messageModal));
    }

    // Close buttons
    document.querySelectorAll('.app-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.app-modal');
            closeModal(modal);
        });
    });

    // Click overlay to close
    [readModal, messageModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ESC to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [readModal, messageModal].forEach(m => m && closeModal(m));
        }
    });

    // Envelope interaction
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
    }
}

// ============================================
// Expandable Card Component
// ============================================
function initExpandableCards() {
    const cards = document.querySelectorAll('.expand-card');
    cards.forEach(card => {
        const header = card.querySelector('.expand-header');
        const content = card.querySelector('.expand-content');

        if (!header || !content) return;

        const getExpandedMax = () => {
            const vhLimit = Math.floor(window.innerHeight * 0.65); // cap to viewport for scroll
            const fullHeight = content.scrollHeight;
            return Math.min(fullHeight, vhLimit);
        };

        const setMaxHeight = (open) => {
            if (open) {
                content.style.maxHeight = getExpandedMax() + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        };

        const toggle = () => {
            const isOpen = card.classList.toggle('open');
            header.setAttribute('aria-expanded', String(isOpen));
            setMaxHeight(isOpen);
        };

        // Initialize collapsed
        setMaxHeight(false);

        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });

        // Recalculate on resize for responsive content
        window.addEventListener('resize', () => {
            if (card.classList.contains('open')) {
                setMaxHeight(true);
            }
        });
    });
}

