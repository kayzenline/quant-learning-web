document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------------------
    // 1. Mouse Tracking for Spotlight Effects
    // ---------------------------------------------------------
    const container = document.body;
    
    // Update simple global mouse variables for any element to use
    container.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        container.style.setProperty("--mouse-x", `${x}px`);
        container.style.setProperty("--mouse-y", `${y}px`);
    });

    // Advanced Spotlight for Cards (localized interpolation)
    const cards = document.querySelectorAll(".step-card, .module-card, .btn-start");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // ---------------------------------------------------------
    // 2. Smooth Reveal Animations (Intersection Observer)
    // ---------------------------------------------------------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Stagger children if needed
                const children = entry.target.querySelectorAll(".animate-child");
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = "1";
                        child.style.transform = "translateY(0)";
                    }, index * 100);
                });
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial styles for observing
    const animatedElements = document.querySelectorAll(".step-card, .module-card, .section-header");
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        revealObserver.observe(el);
    });

    // ---------------------------------------------------------
    // 3. Navbar Interaction
    // ---------------------------------------------------------
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mobileToggle.classList.toggle("active");
        });
    }

    // ---------------------------------------------------------
    // 4. Smooth Scroll with Offset
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    mobileToggle.classList.remove("active");
                }

                const offsetTop = target.offsetTop - 100; // Header height + padding
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // ---------------------------------------------------------
    // 5. Hero Parallax (Subtle)
    // ---------------------------------------------------------
    const heroContent = document.querySelector(".hero-content");
    const heroOrbs = document.querySelectorAll(".hero-orb");
    
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        
        if (scrolled < 1000) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
            
            heroOrbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    // ---------------------------------------------------------
    // 6. Easter Egg
    // ---------------------------------------------------------
    console.log(
        "%c⚡ Deep Quant Loaded", 
        "background: #030712; color: #3b82f6; padding: 10px 20px; border-radius: 4px; font-weight: bold;"
    );
});
