document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS GLOBAIS ---
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const voiceCmdBtn = document.getElementById('voice-command-btn');

    // --- LÓGICA DE HEADER E NAVEGAÇÃO ---
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // --- LÓGICA DE TEMA (MODO ESCURO/CLARO) E FAVICON ---
    const faviconLight = document.getElementById('favicon-light');
    const faviconDark = document.getElementById('favicon-dark');
    
    const applyTheme = (theme) => {
        document.documentElement.className = theme;
        if (theme === 'dark') {
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            if (faviconLight) faviconLight.media = "not all";
            if (faviconDark) faviconDark.media = "all";
        } else {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            if (faviconLight) faviconLight.media = "all";
            if (faviconDark) faviconDark.media = "not all";
        }
    };

    const storedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(storedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    
    // --- LÓGICA "MONTE SEU AÇAÍ" ---
    const toppingCards = document.querySelectorAll('.topping-card');
    const toppingsDisplay = document.getElementById('toppings-display');
    const totalPriceEl = document.getElementById('build-total-price');
    const orderLink = document.getElementById('whatsapp-order-link');
    let selectedToppings = new Set();
    let basePrice = 18.00;

    if(toppingCards.length > 0) {
        toppingCards.forEach(card => {
            card.addEventListener('click', () => {
                const price = parseFloat(card.dataset.price);
                const name = card.dataset.name;
                
                card.classList.toggle('selected');
    
                if (selectedToppings.has(name)) {
                    selectedToppings.delete(name);
                    basePrice -= price;
                    const imgToRemove = toppingsDisplay.querySelector(`[data-topping="${name}"]`);
                    if(imgToRemove) imgToRemove.remove();
                } else {
                    selectedToppings.add(name);
                    basePrice += price;
                    const toppingImg = document.createElement('img');
                    toppingImg.src = `src/img/toppings/${name.toLowerCase().replace(/\s+/g, '')}.png`;
                    toppingImg.alt = ''; // Decorativo
                    toppingImg.classList.add('topping-img');
                    toppingImg.dataset.topping = name;
                    toppingImg.style.top = `${Math.random() * 40 + 10}%`;
                    toppingImg.style.left = `${Math.random() * 50 + 15}%`;
                    toppingImg.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.4 + 0.8})`;
                    toppingsDisplay.appendChild(toppingImg);
                }
    
                totalPriceEl.textContent = `R$ ${basePrice.toFixed(2).replace('.',',')}`;
                updateWhatsAppLink();
            });
        });
    
        function updateWhatsAppLink() {
            let toppingsText = "";
            if (selectedToppings.size > 0) {
                toppingsText = " com os seguintes toppings: " + Array.from(selectedToppings).join(', ');
            }
            const message = encodeURIComponent(`Olá! Quero montar um açaí${toppingsText}. Total: R$ ${basePrice.toFixed(2).replace('.',',')}`);
            orderLink.href = `https://wa.me/SEUNUMERO?text=${message}`;
        }
    }

    // --- CRONÔMETRO DE PROMOÇÃO ---
    const hoursEl = document.getElementById('hours');
    if (hoursEl) {
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const countdown = () => {
            const now = new Date();
            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay - now;
            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor(diff / 1000 / 60) % 60;
            const seconds = Math.floor(diff / 1000) % 60;

            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        };
        setInterval(countdown, 1000);
        countdown();
    }

    // --- NAVEGAÇÃO POR VOZ (EXPERIMENTAL) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && voiceCmdBtn) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        
        voiceCmdBtn.style.display = 'flex'; // Mostra o botão se a API for suportada
        
        voiceCmdBtn.addEventListener('click', () => {
            try {
                recognition.start();
                voiceCmdBtn.classList.add('listening');
            } catch(e) {
                console.error("Erro ao iniciar o reconhecimento de voz:", e);
                voiceCmdBtn.classList.remove('listening');
            }
        });

        recognition.onend = () => {
            voiceCmdBtn.classList.remove('listening');
        };
        
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            const sections = { 'promoções': '#promotions', 'promocao': '#promotions', 'ofertas': '#promotions', 'monte': '#build', 'cardapio': '#menu', 'clientes': '#reviews', 'inicio': '#home', 'topo': '#home' };
            for (const key in sections) {
                if (command.includes(key)) {
                    document.querySelector(sections[key]).scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        };
        recognition.onerror = (event) => {
            console.error("Erro no reconhecimento de voz:", event.error);
            voiceCmdBtn.classList.remove('listening');
        }
    }

    // --- ANIMAÇÕES DE SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => observer.observe(element));
    
    // --- LINK ATIVO NO SCROLL ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const activateLinkOnScroll = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', activateLinkOnScroll);

    // --- PARTICLES.JS BACKGROUND ---
    if(document.getElementById('particles-js')){
        particlesJS('particles-js', {
          "particles": { "number": { "value": 40, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#a832a8" }, "shape": { "type": "circle" }, "opacity": { "value": 0.3, "random": true }, "size": { "value": 4, "random": true }, "line_linked":{ "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } },
          "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false } } }
        });
    }
});