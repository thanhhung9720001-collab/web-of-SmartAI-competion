document.addEventListener('DOMContentLoaded', () => {

  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  // Run once on load in case page is already scrolled
  handleScroll();


  // --- LIGHTBOX IMAGE MODAL ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSrc = trigger.getAttribute('data-target') || trigger.getAttribute('src');
      const captionText = trigger.getAttribute('alt') || 'Tài nguyên dự án GlobalBridge AI';

      lightboxImg.src = targetSrc;
      lightboxCaption.textContent = captionText;
      
      // Display the lightbox with flex layout
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Disable background scrolling
    });
  });

  const closeLightbox = () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });


  // --- SMOOTH INTERNAL LINKS SCROLLING ---
  const navLinks = document.querySelectorAll('.nav-links a, .nav-cta a, .hero-buttons a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Adjust scroll position to account for sticky navbar height
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
