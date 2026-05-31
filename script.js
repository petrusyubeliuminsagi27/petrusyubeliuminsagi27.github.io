document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    const mainContent = document.querySelector('.main-content');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('open');
        nav.classList.toggle('open');
    });
    
    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active-section');
            
            // Close menu on mobile
            if (window.innerWidth <= 768) {
                menuBtn.classList.remove('open');
                nav.classList.remove('open');
            }
        });
    });
    
    // Collapse sidebar on larger screens
    function handleSidebar() {
        if (window.innerWidth > 768) {
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            
            if (isCollapsed) {
                nav.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
            
            // Toggle sidebar collapse
            nav.addEventListener('click', function(e) {
                if (e.target.closest('.nav-link') || e.target.closest('.social-media a')) {
                    return;
                }
                
                nav.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
                localStorage.setItem('sidebarCollapsed', nav.classList.contains('collapsed'));
            });
        }
    }
    
    handleSidebar();
    window.addEventListener('resize', handleSidebar);
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Terima kasih, ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize first section as active
    if (sections.length > 0) {
        sections[0].classList.add('active-section');
    }
});