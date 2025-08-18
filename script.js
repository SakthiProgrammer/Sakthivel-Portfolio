
// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

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

        // 🔹 Navbar reference
        const navbar = document.querySelector('.navbar');

        // 🔹 If at the very top -> show home style
        if (window.scrollY === 0) {
            navbar.classList.add('home-style');
            navbar.classList.remove('sticky-style');
        } else {
            navbar.classList.add('sticky-style');
            navbar.classList.remove('home-style');
        }

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop;
                const offsetHeight = section.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to current section link
                    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }

            }

        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Navbar background on scroll
    // window.addEventListener('scroll', function() {
    //     const navbar = document.querySelector('.navbar');
    //     if (window.scrollY > 50) {
    //         navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    //         navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    //     } else {
    //         navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    //         navbar.style.boxShadow = 'none';
    //     }
    // });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });


    // Contact form submission
    // const contactForm = document.querySelector('.contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();

    //         // Get form data
    //         const formData = new FormData(this);
    //         const formEntries = Object.fromEntries(formData);

    //         // Simple form validation
    //         const inputs = this.querySelectorAll('.form-input');
    //         let isValid = true;

    //         inputs.forEach(input => {
    //             if (!input.value.trim()) {
    //                 isValid = false;
    //                 input.style.borderColor = '#ff6b6b';
    //             } else {
    //                 input.style.borderColor = '#e1e5e9';
    //             }
    //         });

    //         if (isValid) {
    //             // Simulate form submission
    //             const submitBtn = this.querySelector('button[type="submit"]');
    //             const originalText = submitBtn.textContent;

    //             submitBtn.textContent = 'Sending...';
    //             submitBtn.disabled = true;
    //             processMail(message)

    //             setTimeout(() => {
    //                 alert('Thank you for your message! I\'ll get back to you soon.');
    //                 this.reset();
    //                 submitBtn.textContent = originalText;
    //                 submitBtn.disabled = false;
    //             }, 2000);
    //         } else {
    //             alert('Please fill in all fields.');
    //         }
    //     });
    // }

    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag-enhanced');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // typeWriter(document.querySelector(".typing-name"), "Sakthivel");

    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Add some interactive elements
    const cards = document.querySelectorAll('.education-card, .achievement-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0deg)';
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
    if (clickCount === 5) {
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


// Dynamic typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}


// Initialize typing effect on hero title
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.innerHTML;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 50);
//         }, 1000);
//     }
// });

// Mouse tracking effect for hero image
document.addEventListener('mousemove', function (e) {
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.01;
        const moveY = y * 0.01;

        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

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