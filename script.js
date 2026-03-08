/* Toggle Style Switcher */

const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
styleSwitcherToggle.addEventListener('click', () => { document.querySelector('.style-switcher').classList.toggle('open'); })

window.addEventListener('scroll', () => { if(document.querySelector('.style-switcher').classList.contains('open')) { document.querySelector('.style-switcher').classList.remove('open'); } })

const alternateStyles = document.querySelectorAll('.alternate-style');
const THEME_KEY = 'portfolio-theme-color';

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute('title')) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
    try { localStorage.setItem(THEME_KEY, color); } catch (e) {}
}

function applySavedTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) setActiveStyle(saved);
    } catch (e) {}
}

/* Dark/Light Mode */

const dayNight = document.querySelector('.day-night');
const DARK_KEY = 'portfolio-dark-mode';

function setDayNightIcon(isDark) {
    const icon = dayNight.querySelector('i');
    icon.classList.remove('fa-sun', 'fa-moon');
    icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
}

function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    setDayNightIcon(isDark);
    try { localStorage.setItem(DARK_KEY, isDark ? '1' : '0'); } catch (e) {}
}

dayNight.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    applyDarkMode(isDark);
});

window.addEventListener('load', () => {
    applySavedTheme();
    try {
        const saved = localStorage.getItem(DARK_KEY);
        const isDark = saved === null ? true : saved === '1';
        applyDarkMode(isDark);
    } catch (e) {
        setDayNightIcon(document.body.classList.contains('dark'));
    }
});

/* Typing Animation */

var typed = new Typed('.typing', { strings: ["Full Stack Web Developer", "React Developer", "MERN Stack Developer", "Node.js Developer", "Frontend Developer"], typeSpeed: 100, Backspeed: 60, loop: true })

/* Changing Aside Active Link */

const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for(let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(){
            removeBackSection();
            for(let j = 0; j < totalNavList; j++) { 
                if(navList[j].querySelector('a').classList.contains('active')) { addBackSection(j);/*allSection[j].classList.add('back-section');*/ }
                navList[j].querySelector('a').classList.remove('active'); }
        this.classList.add('active');
        showSection(this);

        if(window.innerWidth < 1200) { asideSectionTogglerBtn(); }
    })
}

function addBackSection(num) { allSection[num].classList.add('back-section'); }

function removeBackSection(){
    for( let i = 0; i < totalSection; i++){ allSection[i].classList.remove('back-section'); }
}

function showSection(element){
    for( let i = 0; i < totalSection; i++){ allSection[i].classList.remove('active'); }

    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector('#' + target);
    targetSection.classList.add('active');
    
    // Trigger portfolio animations if portfolio section is activated
    if (target === 'portfolio') {
        setTimeout(() => {
            initPortfolioAnimations();
        }, 100);
    }
}

function updateNav(element){
    for(let i = 0; i < totalNavList; i++){
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if(target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) { navList[i].querySelector('a').classList.add('active'); }
        
    }
}

document.querySelector('.hire-me').addEventListener('click', function(){
    const sectionIndex = this.getAttribute('data-section-index');
    /*console.log(sectionIndex);*/
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

/* Activating Mobile Menu */

const navTogglerBtn = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => { asideSectionTogglerBtn(); })

function asideSectionTogglerBtn(){
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for(let i = 0; i < totalSection; i++) { allSection[i].classList.toggle('open'); }
}

/* Email.js Form Submission */

// Initialize Email.js when page loads
window.addEventListener('DOMContentLoaded', function() {
    emailjs.init("wvQx-Gjd96m8m3DyS");
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            const userName = document.getElementById('user_name').value.trim();
            const userEmail = document.getElementById('user_email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if(!userName || !userEmail || !subject || !message) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#f44336';
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                formMessage.style.borderRadius = '5px';
                return;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formMessage.style.display = 'none';
            
            // Send email using Email.js
            // Using templateParams with common variable names
            const templateParams = {
                from_name: userName,
                from_email: userEmail,
                subject: subject,
                message: message,
                to_email: 'ayazalidharejo34@gmail.com'
            };
            
            emailjs.send('service_spcm19u', 'wiIaK84uN_HRQctYzeQZY', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                formMessage.style.display = 'block';
                formMessage.style.color = '#4caf50';
                formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                formMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                formMessage.style.borderRadius = '5px';
                contactForm.reset();
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Hide message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                formMessage.style.display = 'block';
                formMessage.style.color = '#f44336';
                formMessage.textContent = 'Failed to send message. Error: ' + (error.text || error.message || 'Unknown error. Please try again later or contact me directly via email.');
                formMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                formMessage.style.borderRadius = '5px';
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }
});

/* Portfolio View More (mobile): expand card to show full content */
document.querySelectorAll('.portfolio-view-more').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var inner = this.closest('.portfolio-item-inner');
        if (!inner) return;
        var isExpanded = inner.classList.toggle('expanded');
        this.textContent = isExpanded ? 'View Less' : 'View More';
        this.setAttribute('aria-label', isExpanded ? 'View less' : 'View more');
    });
});

/* Portfolio Animations */

function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Reset and trigger animations when portfolio section becomes active
    portfolioItems.forEach((item, index) => {
        // Reset animation
        item.style.animation = 'none';
        // Force reflow
        void item.offsetWidth;
        // Apply animation with delay
        item.style.animation = `fadeInUp 0.6s ease forwards`;
        item.style.animationDelay = `${(index % 3) * 0.1 + 0.1}s`;
    });
}

// Trigger animations on page load if portfolio is active
window.addEventListener('load', () => {
    const portfolioSection = document.querySelector('.portfolio.section');
    if (portfolioSection && portfolioSection.classList.contains('active')) {
        setTimeout(() => {
            initPortfolioAnimations();
        }, 300);
    }
});


