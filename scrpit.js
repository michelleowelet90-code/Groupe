// ========================
// 1. MENU BURGER (Fonctionnalité JS n°1)
// ========================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-list a');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    // Changer icône burger/close
    const icon = burger.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========================
// 2. CARROUSEL (Fonctionnalité JS n°2)
// ========================
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Gestion des limites
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    
    // Cacher tous les slides
    slides.forEach(slide => {
        slide.classList.remove('active-slide');
    });
    
    // Désactiver tous les dots
    dots.forEach(dot => {
        dot.classList.remove('active-dot');
    });
    
    // Afficher le slide actif
    slides[slideIndex].classList.add('active-slide');
    dots[slideIndex].classList.add('active-dot');
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

// Événements boutons
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// Cliquer sur les dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slideIndex = index;
        showSlide(slideIndex);
    });
});

// Auto-play (optionnel, on peut le retirer si on veut)
setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
}, 5000); // change toutes les 5 secondes

// Initialisation
showSlide(slideIndex);

// ========================
// 3. VALIDATION FORMULAIRE (Fonctionnalité JS n°3)
// (à déplacer dans contact.html plus tard)
// ========================
// Pour l'instant on prépare la fonction, elle sera appelée dans contact.html
function validateContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    let errorMessage = '';
    
    // Réinitialiser les erreurs
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validation nom
    if (!name.value.trim()) {
        showError(name, 'Le nom est requis');
        isValid = false;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'L\'email est requis');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Email invalide');
        isValid = false;
    }
    
    // Validation message
    if (!message.value.trim()) {
        showError(message, 'Le message est requis');
        isValid = false;
    }
    
    if (isValid) {
        alert('Formulaire envoyé avec succès (simulation)');
        // Ici on pourrait vraiment envoyer, mais pas de backend demandé
        event.target.reset();
    }
    
    return false;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#ff6b6b';
}

// Exposer la fonction globalement pour contact.html
window.validateContactForm = validateContactForm;

// ========================
// ANIMATIONS AU SCROLL (bonus)
// ========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .expertise-item, .section-title');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initialiser les animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);