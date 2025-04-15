// Fungsi untuk animasi scroll yang halus pada navigasi
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua link navigasi
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Tambahkan event listener untuk setiap link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Cek apakah link mengarah ke halaman yang sama
            const targetPage = this.getAttribute('href');
            if (targetPage.includes('#')) {
                const targetId = targetPage.split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animasi fade-in untuk elemen saat halaman dimuat
    fadeInElements();
    
    // Validasi form kontak jika ada di halaman
    setupContactForm();
    
    // Setup galeri jika ada di halaman
    setupGallery();
    
    // Tambahkan efek hover pada skill cards
    setupSkillCards();
    
    // Tambahkan tema gelap/terang toggle
    setupDarkModeToggle();
});

// Fungsi untuk animasi fade-in elemen saat scroll
function fadeInElements() {
    // Tambahkan class untuk semua elemen yang ingin di-animate
    const fadeElements = document.querySelectorAll('.hero, .skill-card, .gallery-item, .blog-post, .contact-form, .contact-info');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
        element.style.transform = 'translateY(20px)';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Fungsi untuk melakukan fade in elemen yang terlihat
    function handleScrollAnimation() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Panggil saat halaman dimuat dan saat scroll
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
}

// Fungsi untuk validasi form kontak
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Dapatkan nilai input
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validasi dasar
            let isValid = true;
            let errorMessage = '';
            
            if (!name.trim()) {
                isValid = false;
                errorMessage += 'Nama harus diisi.\n';
                highlightError('name');
            }
            
            if (!email.trim()) {
                isValid = false;
                errorMessage += 'Email harus diisi.\n';
                highlightError('email');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Format email tidak valid.\n';
                highlightError('email');
            }
            
            if (!subject.trim()) {
                isValid = false;
                errorMessage += 'Subjek harus diisi.\n';
                highlightError('subject');
            }
            
            if (!message.trim()) {
                isValid = false;
                errorMessage += 'Pesan harus diisi.\n';
                highlightError('message');
            }
            
            if (!isValid) {
                showNotification(errorMessage, 'error');
            } else {
                // Di sini Anda bisa menambahkan kode untuk mengirim form ke server
                // Untuk simulasi, kita hanya akan menampilkan notifikasi sukses
                showNotification('Terima kasih! Pesan Anda telah dikirim. Saya akan menghubungi Anda segera.', 'success');
                contactForm.reset();
            }
        });
        
        // Tambahkan event listener untuk menghapus highlight error saat input diubah
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('input-error');
            });
        });
    }
}

// Fungsi validasi format email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fungsi untuk highlight field yang error
function highlightError(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.classList.add('input-error');
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'info') {
    // Cek apakah ada notifikasi sebelumnya
    let notification = document.querySelector('.notification');
    
    if (notification) {
        // Hapus notifikasi sebelumnya
        notification.remove();
    }
    
    // Buat elemen notifikasi baru
    notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Tambahkan event listener untuk tombol close
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.remove();
    });
    
    // Otomatis hilang setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Tambahkan style untuk notifikasi jika belum ada
    addNotificationStyles();
}

// Fungsi untuk menambahkan style notifikasi
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification-content {
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            
            .notification-info .notification-content {
                background-color: #e0f7fa;
                color: #006064;
            }
            
            .notification-success .notification-content {
                background-color: #e8f5e9;
                color: #1b5e20;
            }
            
            .notification-error .notification-content {
                background-color: #ffebee;
                color: #b71c1c;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                padding: 0 0 0 10px;
                color: inherit;
            }
            
            .input-error {
                border: 1px solid #f44336 !important;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Fungsi untuk galeri
function setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Tambahkan lightbox untuk galeri
        createLightbox();
        
        // Tambahkan event listener untuk setiap item galeri
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            
            img.addEventListener('click', function() {
                openLightbox(this.src, item.querySelector('.gallery-caption h3').textContent);
            });
        });
    }
}

// Fungsi untuk membuat lightbox
function createLightbox() {
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-image" src="" alt="Lightbox image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Tambahkan event listener untuk tombol close
        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.addEventListener('click', closeLightbox);
        
        // Juga tutup lightbox saat klik di luar gambar
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Tambahkan style untuk lightbox
        addLightboxStyles();
    }
}

// Fungsi untuk membuka lightbox
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    lightboxImage.src = src;
    lightboxCaption.textContent = caption || '';
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Mencegah scroll pada body
    
    // Animasi fade in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

// Fungsi untuk menutup lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    lightbox.style.opacity = '0';
    
    // Tunggu animasi selesai sebelum hide
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Kembalikan scroll pada body
    }, 300);
}

// Fungsi untuk menambahkan style lightbox
function addLightboxStyles() {
    if (!document.getElementById('lightbox-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'lightbox-styles';
        styleElement.textContent = `
            .lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 1000;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-image {
                display: block;
                max-width: 100%;
                max-height: 80vh;
                margin: 0 auto;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            }
            
            .lightbox-caption {
                color: white;
                text-align: center;
                padding: 10px 0;
                font-size: 18px;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                transition: color 0.3s;
            }
            
            .lightbox-close:hover {
                color: hsl(343, 100%, 40%);
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Fungsi untuk efek hover pada skill cards
function setupSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
        
        // Tambahkan transisi
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
}

// Fungsi untuk toggle tema gelap/terang
function setupDarkModeToggle() {
    // Tambahkan tombol dark mode ke header
    const header = document.querySelector('header');
    
    if (header) {
        const darkModeButton = document.createElement('button');
        darkModeButton.id = 'dark-mode-toggle';
        darkModeButton.innerHTML = '🌙';
        darkModeButton.title = 'Toggle Dark/Light Mode';
        
        // Tambahkan style untuk tombol
        darkModeButton.style.background = 'none';
        darkModeButton.style.border = 'none';
        darkModeButton.style.fontSize = '20px';
        darkModeButton.style.cursor = 'pointer';
        darkModeButton.style.marginLeft = '10px';
        darkModeButton.style.padding = '5px';
        darkModeButton.style.borderRadius = '50%';
        darkModeButton.style.width = '40px';
        darkModeButton.style.height = '40px';
        darkModeButton.style.display = 'flex';
        darkModeButton.style.justifyContent = 'center';
        darkModeButton.style.alignItems = 'center';
        darkModeButton.style.transition = 'background-color 0.3s';
        
        // Tambahkan ke header
        header.appendChild(darkModeButton);
        
        // Cek preferensi dari localStorage
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Set tema awal berdasarkan preferensi
        if (isDarkMode) {
            enableDarkMode();
        }
        
        // Event listener untuk toggle
        darkModeButton.addEventListener('click', function() {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
        
        // Tambahkan style untuk dark mode
        addDarkModeStyles();
    }
}

// Fungsi untuk enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    const darkModeButton = document.getElementById('dark-mode-toggle');
    if (darkModeButton) {
        darkModeButton.innerHTML = '☀️';
    }
    localStorage.setItem('darkMode', 'true');
}

// Fungsi untuk disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    const darkModeButton = document.getElementById('dark-mode-toggle');
    if (darkModeButton) {
        darkModeButton.innerHTML = '🌙';
    }
    localStorage.setItem('darkMode', 'false');
}

// Fungsi untuk menambahkan style dark mode
function addDarkModeStyles() {
    if (!document.getElementById('dark-mode-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'dark-mode-styles';
        styleElement.textContent = `
            body.dark-mode {
                background-color: #121212;
                color: #e0e0e0;
            }
            
            body.dark-mode header {
                border-bottom-color: #333;
            }
            
            body.dark-mode footer {
                border-top-color: #333;
            }
            
            body.dark-mode .logo,
            body.dark-mode h1,
            body.dark-mode h2,
            body.dark-mode h3 {
                color: hsl(343, 100%, 60%);
            }
            
            body.dark-mode nav ul li a {
                color: #e0e0e0;
            }
            
            body.dark-mode nav ul li a:hover {
                color: hsl(343, 100%, 60%);
            }
            
            body.dark-mode .skill-card,
            body.dark-mode .blog-post,
            body.dark-mode .contact-form,
            body.dark-mode .contact-info,
            body.dark-mode .gallery-caption {
                background-color: #1e1e1e;
                color: #e0e0e0;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            }
            
            body.dark-mode .post-meta {
                color: #aaa;
            }
            
            body.dark-mode .btn {
                background-color: hsl(343, 100%, 60%);
            }
            
            body.dark-mode .btn:hover {
                background-color: hsl(343, 100%, 50%);
            }
            
            body.dark-mode input,
            body.dark-mode textarea {
                background-color: #2d2d2d;
                border-color: #444;
                color: #e0e0e0;
            }
            
            body.dark-mode #dark-mode-toggle {
                background-color: #333;
            }
            
            body.dark-mode #dark-mode-toggle:hover {
                background-color: #444;
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Fungsi untuk mendeteksi halaman aktif dan highlight menu
function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.style.color = 'hsl(343, 100%, 40%)';
            link.style.borderBottom = '2px solid hsl(343, 100%, 40%)';
        }
    });
}

// Panggil fungsi highlight menu
highlightActiveMenu();

// Fungsi untuk animasi scroll ke atas
function addScrollToTopButton() {
    // Buat tombol
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-to-top';
    scrollButton.innerHTML = '&#8679;';
    scrollButton.title = 'Scroll to top';
    
    // Style tombol
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '20px';
    scrollButton.style.right = '20px';
    scrollButton.style.width = '40px';
    scrollButton.style.height = '40px';
    scrollButton.style.borderRadius = '50%';
    scrollButton.style.backgroundColor = 'hsl(343, 100%, 40%)';
    scrollButton.style.color = 'white';
    scrollButton.style.border = 'none';
    scrollButton.style.fontSize = '24px';
    scrollButton.style.cursor = 'pointer';
    scrollButton.style.display = 'none';
    scrollButton.style.opacity = '0';
    scrollButton.style.transition = 'opacity 0.3s, transform 0.3s';
    scrollButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    scrollButton.style.zIndex = '100';
    
    // Tambahkan ke body
    document.body.appendChild(scrollButton);
    
    // Tambahkan event listener
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Tampilkan/sembunyikan tombol berdasarkan scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
            setTimeout(() => {
                scrollButton.style.opacity = '1';
                scrollButton.style.transform = 'scale(1)';
            }, 10);
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollButton.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Panggil fungsi untuk membuat tombol scroll to top
addScrollToTopButton();

// Tambahkan animasi teks pada halaman home jika ada
function setupTextAnimation() {
    const heroHeading = document.querySelector('.hero-text h1');
    
    if (heroHeading) {
        // Efek typing animation pada heading
        const originalText = heroHeading.textContent;
        heroHeading.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroHeading.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
}

// Panggil fungsi untuk animasi teks
setTimeout(setupTextAnimation, 500);

// Tambahkan filter untuk gallery
function setupGalleryFilter() {
    const galleryPage = document.querySelector('.gallery');
    
    if (galleryPage) {
        // Ambil semua kategori dari caption
        const galleryItems = document.querySelectorAll('.gallery-item');
        const categories = new Set();
        
        galleryItems.forEach(item => {
            const caption = item.querySelector('.gallery-caption h3').textContent;
            categories.add(caption);
        });
        
        // Buat filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.className = 'gallery-filter';
        filterContainer.style.display = 'flex';
        filterContainer.style.justifyContent = 'center';
        filterContainer.style.marginBottom = '20px';
        filterContainer.style.flexWrap = 'wrap';
        
        // Tambahkan button "Semua"
        const allButton = document.createElement('button');
        allButton.textContent = 'Semua';
        allButton.className = 'filter-btn active';
        allButton.style.margin = '5px';
        allButton.style.padding = '8px 15px';
        allButton.style.border = 'none';
        allButton.style.borderRadius = '5px';
        allButton.style.backgroundColor = 'hsl(343, 100%, 40%)';
        allButton.style.color = 'white';
        allButton.style.cursor = 'pointer';
        allButton.style.transition = 'background-color 0.3s';
        
        filterContainer.appendChild(allButton);
        
        // Tambahkan button untuk setiap kategori
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'filter-btn';
            button.style.margin = '5px';
            button.style.padding = '8px 15px';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.backgroundColor = '#ddd';
            button.style.color = '#333';
            button.style.cursor = 'pointer';
            button.style.transition = 'background-color 0.3s';
            
            filterContainer.appendChild(button);
        });
        
        // Tambahkan filter di atas gallery
        const galleryParent = galleryPage.parentNode;
        galleryParent.insertBefore(filterContainer, galleryPage);
        
        // Event listener untuk filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.backgroundColor = '#ddd';
                    btn.style.color = '#333';
                });
                
                // Add active class to current button
                this.classList.add('active');
                this.style.backgroundColor = 'hsl(343, 100%, 40%)';
                this.style.color = 'white';
                
                const filter = this.textContent;
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const caption = item.querySelector('.gallery-caption h3').textContent;
                    
                    if (filter === 'Semua' || caption === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Panggil fungsi untuk setup filter gallery
setupGalleryFilter();