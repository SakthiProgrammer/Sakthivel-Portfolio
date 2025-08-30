// loader

// Hide loader when the page fully loads
window.addEventListener("load", () => {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    // add a slight delay so the UX feels smooth
    setTimeout(() => {
        loader.classList.add('hidden');
        loader.setAttribute('aria-hidden', 'true');
    }, 500);
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Active section highlighting on scroll
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + 100;
        const sections = ['home', 'experience', 'skills', 'education', 'projects', 'about', 'contact'];

        // Navbar reference
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY === 0) {
            navbar.classList.add('home-style');
            navbar.classList.remove('sticky-style');
        } else {
            navbar.classList.add('sticky-style');
            navbar.classList.remove('home-style');
        }

        // Highlight active section in navbar
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop;
                const offsetHeight = section.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animated');
        });
    }, observerOptions);

    // Observe animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Achievement card hover
    document.querySelectorAll(".achievement-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.03)";
            card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
            card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
            card.style.zIndex = "5";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
            card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
            card.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
            card.style.zIndex = "1";
        });
    });

    // Navbar scrolled state
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Skill tags hover
    const skillTags = document.querySelectorAll('.skill-tag-enhanced');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image hover effects
    const heroImage = document.querySelector('.hero-image');
    const aboutImage = document.querySelector('.about-image-img');
    const bottomImage = document.querySelector('.bottom-profile-image');

    [heroImage, aboutImage, bottomImage].forEach(img => {
        if (img) {
            img.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.1) rotate(3deg)';
            });

            img.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
});

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 77;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openResume() {
    // Open resume PDF in new tab
    // Make sure to place your resume.pdf file in the same directory as your HTML file
    const resumeUrl = 'docs/resume.pdf'; // Change this path to your actual resume file

    // Check if file exists before opening
    fetch(resumeUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.open(resumeUrl, '_blank');
            } else {
                alert('Resume file not found. Please make sure resume.pdf exists in the project directory.');
            }
        })
        .catch(error => {
            // If fetch fails, try to open anyway (might work for local files)
            window.open(resumeUrl, '_blank');
        });
}

// Add some fun easter eggs
let clickCount = 0;
document.querySelector('.logo-text').addEventListener('click', function () {
    clickCount++;
    if (clickCount == 5) {
        this.style.animation = 'bounce 1s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
            clickCount = 0;
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const rate = scrolled * -0.1;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Animate elements on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    }, 100);
});

// Smooth reveal animations for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));

                if (numericValue) {
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 30);
                }

                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', animateStats);

// typing effect
const texts = ["Software Developer", "Full-Stack Developer"];
let i = 0; // text index
let j = 0; // char index
let currentText = "";
let isDeleting = false;
const speed = 100; // typing speed
const eraseSpeed = 50; // deleting speed
const delayBetween = 1500; // pause before deleting

function typeEffect() {
    const target = document.getElementById("typed-text");

    if (!isDeleting && j <= texts[i].length) {
        currentText = texts[i].substring(0, j++);
        target.textContent = currentText;
        setTimeout(typeEffect, speed);
    } else if (isDeleting && j >= 0) {
        currentText = texts[i].substring(0, j--);
        target.textContent = currentText;
        setTimeout(typeEffect, eraseSpeed);
    } else if (!isDeleting && j > texts[i].length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
    } else if (isDeleting && j < 0) {
        isDeleting = false;
        i = (i + 1) % texts.length; // switch text
        setTimeout(typeEffect, speed);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Intersection Observer for image animations
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, {
    threshold: 0.1
});

// Observe all images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.hero-image, .about-image-img, .bottom-profile-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px) scale(0.9)';
        img.style.transition = 'all 0.8s ease-out';
        imageObserver.observe(img);
    });
});

document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll(".form-input");
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = "#ff6b6b";
        } else {
            input.style.borderColor = "#e1e5e9";
        }
    });

    if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Capture form values
        const from_name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const subject = inputs[2].value.trim();
        const message = inputs[3].value.trim();

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Send email using EmailJS
        processMail(message, email, from_name, subject)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Thank you for your message! I'll get back to you soon.!",
                    icon: "success",
                });

                this.reset();
            })
            .catch(() => {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to send email. Please try again.",
                    icon: "error",
                });
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    } else {
        Swal.fire({
            title: "Validation Error",
            text: "Please fill in all fields.",
            icon: "warning",
        });
    }
});

function processMail(message, email, from_name, subject) {
    const templateParams = {
        email: email,
        subject: subject,
        to_name: from_name,
        from_name: from_name,
        message: message,
    };

    return emailjs.send("service_tt8yrbd", "template_foonw0f", templateParams);
}
