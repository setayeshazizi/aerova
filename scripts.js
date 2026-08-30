
// ============ Global Variables ============
let currentTheme = "dark";
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentTestimonial = 0;
let currentTestimonialNew = 0;
const totalTestimonialSlides = 3;
const typingTexts = ["Next Adventure", "Dream Destination", "Perfect Journey"];

// ============ Initialize ============
function initializeApp() {
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }

    initCustomCursor();
    initParticles();
    initNavigation();
    initClock();
    initTypingEffect();
    initCounters();
    initTestimonials();
    initTestimonialsNew();
    initBackToTop();
    initScrollEffects();
    initTheme();
    initForms();
    initFlightStatus();
    initAutocomplete();
    initPasswordStrength();
}

// ============ Custom Cursor ============
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    document.addEventListener('mousemove', function (e) {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    const hoverElements = document.querySelectorAll('a, button, input, select, textarea, .btn');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ============ Particles ============
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        size: Math.random() * 3 + 1,
        sx: Math.random() * 0.5 - 0.25,
        sy: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1,
    }));

    const resize = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const color = currentTheme === "dark" ? "255, 255, 255" : "0, 0, 0";

        particles.forEach((p) => {
            p.x = (p.x + p.sx + canvas.width) % canvas.width;
            p.y = (p.y + p.sy + canvas.height) % canvas.height;
            ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();
}

// ============ Navigation ============
function initNavigation() {
    const nav = document.getElementById("mainNav");
    if (!nav) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    const toggler = document.querySelector(".custom-toggler");
    if (toggler) {
        toggler.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && href.substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });

                navLinks.forEach((l) => l.classList.remove("active"));
                this.classList.add("active");

                const navCollapse = document.getElementById("navMenu");
                if (navCollapse && navCollapse.classList.contains("show") && typeof bootstrap !== 'undefined') {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });
}

// ============ Live Clock ============
function initClock() {
    const clock = document.getElementById("liveClock");
    if (!clock) return;

    const update = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = String(hours).padStart(2, "0");

        clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    };

    update();
    setInterval(update, 1000);
}

// ============ Typing Effect ============
function initTypingEffect() {
    const element = document.getElementById("typingText");
    if (!element) return;

    const type = () => {
        const text = typingTexts[typingIndex];
        charIndex += isDeleting ? -1 : 1;
        element.textContent = text.slice(0, charIndex);

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === text.length) {
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingIndex = (typingIndex + 1) % typingTexts.length;
            speed = 500;
        }

        setTimeout(type, speed);
    };

    type();
}

// ============ Counters ============
function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target) || 0;
            const start = performance.now();

            const update = (time) => {
                const progress = Math.min((time - start) / 2000, 1);
                counter.textContent = Math.floor((1 - (1 - progress) ** 3) * target);
                if (progress < 1) requestAnimationFrame(update);
            };

            requestAnimationFrame(update);
            observer.unobserve(counter);
        }),
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

// ============ Old Testimonials (for backward compatibility) ============
function initTestimonials() {
    const track = document.getElementById("testimonialTrack");
    const dots = document.getElementById("testimonialDots");
    if (!track || !dots) return;

    const slides = track.querySelectorAll(".testimonial-slide");
    if (!slides.length) return;

    const update = () => {
        track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        dots.querySelectorAll(".testimonial-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentTestimonial);
        });
    };

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "testimonial-dot";
        dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
        dot.addEventListener("click", () => {
            currentTestimonial = i;
            update();
        });
        dots.appendChild(dot);
    });

    window.nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % slides.length;
        update();
    };

    window.prevTestimonial = () => {
        currentTestimonial = (currentTestimonial - 1 + slides.length) % slides.length;
        update();
    };

    window.goToTestimonial = (i) => {
        currentTestimonial = Math.max(0, Math.min(i, slides.length - 1));
        update();
    };

    update();
    setInterval(window.nextTestimonial, 5000);
}

// ============ New Testimonials Slider ============
function initTestimonialsNew() {
    const track = document.getElementById("testimonialTrackNew");
    if (!track) return;

    updateTestimonialNew();

    // Auto slide
    setInterval(() => {
        nextTestimonialNew();
    }, 5000);
}

function updateTestimonialNew() {
    const track = document.getElementById("testimonialTrackNew");
    const dots = document.querySelectorAll(".testimonial-dot-new");

    if (!track) return;

    track.style.transform = `translateX(-${currentTestimonialNew * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentTestimonialNew);
    });
}

function nextTestimonialNew() {
    currentTestimonialNew = (currentTestimonialNew + 1) % totalTestimonialSlides;
    updateTestimonialNew();
}

function prevTestimonialNew() {
    currentTestimonialNew = (currentTestimonialNew - 1 + totalTestimonialSlides) % totalTestimonialSlides;
    updateTestimonialNew();
}

function goToTestimonialNew(index) {
    currentTestimonialNew = Math.max(0, Math.min(index, totalTestimonialSlides - 1));
    updateTestimonialNew();
}

// ============ Back to Top ============
function initBackToTop() {
    const button = document.getElementById("backToTop");
    const circle = document.getElementById("progressCircle");
    if (!button) return;

    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - innerHeight;
        const progress = total ? window.scrollY / total : 0;

        button.classList.toggle("show", window.scrollY > 300);
        if (circle) {
            circle.style.strokeDashoffset = 2 * Math.PI * 23 * (1 - progress);
        }
    }, { passive: true });

    window.scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============ Scroll Effects ============
function initScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const selector = a.getAttribute("href");
            const target = selector && selector !== "#" ? document.querySelector(selector) : null;

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

// ============ Theme ============
function initTheme() {
    setTheme(localStorage.getItem("aerova-theme") || "dark", false);
}

function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
    localStorage.setItem("aerova-theme", currentTheme);
}

function setTheme(theme, notify = true) {
    currentTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (notify) showToast(`Theme switched to ${currentTheme} mode`);
}

// ============ Toast ============
function showToast(message, type = "info") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-times-circle",
        info: "fas fa-info-circle",
    };

    const icon = icons[type] || icons.info;
    toast.innerHTML = `<div class="toast-content ${type}"><i class="${icon}"></i><span class="toast-message">${message}</span></div>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ============ Forms & Auth ============
function initForms() {
    const search = document.getElementById("flightSearchForm");
    if (search) {
        search.addEventListener("submit", (e) => {
            e.preventDefault();
            const from = (document.getElementById("fromInput") || {}).value?.trim() || "";
            const to = (document.getElementById("toInput") || {}).value?.trim() || "";
            const date = (document.getElementById("departureDate") || {}).value || "";

            if (!from || !to || !date) {
                return showToast("Please fill in all required fields", "error");
            }

            showToast("Searching for flights...");
            setTimeout(() => showToast("Flights found! Redirecting...", "success"), 2000);
        });
    }

    bindLoginForm();
    bindRegisterForm();

    const newsletter = document.getElementById("newsletterForm");
    if (newsletter) {
        newsletter.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = (newsletter.querySelector('input[type="email"]') || {}).value || "";

            if (!isValidEmail(email)) {
                return showToast("Please enter a valid email address", "error");
            }

            newsletter.reset();
            showToast("Thank you for subscribing!", "success");
        });
    }
}

// ============ Login Form ============
function bindLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = (document.getElementById("loginEmail") || {}).value?.trim() || "";
        const password = (document.getElementById("loginPassword") || {}).value || "";

        const emailOk = isValidEmail(email);
        const passwordOk = password.length >= 6;

        emailOk ? hideError("loginEmailError") : showError("loginEmailError", "Please enter a valid email address");
        passwordOk ? hideError("loginPasswordError") : showError("loginPasswordError", "Password must be at least 6 characters");

        if (!emailOk || !passwordOk) return;

        const users = JSON.parse(localStorage.getItem("aerova-users") || "[]");
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return showToast("Invalid credentials. Please try again.", "error");
        }

        const sessionUser = {
            ...user,
            loginTime: new Date().toISOString(),
            sessionId: 'session_' + Date.now()
        };

        localStorage.setItem("aerova-current-user", JSON.stringify(sessionUser));
        showToast("Login successful! Welcome back!", "success");

        setTimeout(() => {
            window.location.href = "flights.html";
        }, 1500);
    });
}

// ============ Register Form ============
function bindRegisterForm() { const form = document.getElementById("registerForm"); if (!form) return;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmation = document.getElementById("confirmPassword").value;
    const termsCheck = document.getElementById("termsCheck");
    
    const validations = [
        [name.length >= 3, "registerNameError", "Name must be at least 3 characters"],
        [isValidEmail(email), "registerEmailError", "Please enter a valid email address"],
        [password.length >= 8, "registerPasswordError", "Password must be at least 8 characters"],
        [password === confirmation, "confirmPasswordError", "Passwords do not match"],
    ];
    
    // Check terms checkbox
    if (termsCheck && !termsCheck.checked) {
        showToast("Please agree to Terms & Conditions", "error");
        return;
    }
    
    validations.forEach(([ok, id, message]) => {
        ok ? hideError(id) : showError(id, message);
    });
    
    if (validations.some(([ok]) => !ok)) return;
    
    const users = JSON.parse(localStorage.getItem("aerova-users") || "[]");
    
    if (users.some((u) => u.email === email)) {
        return showToast("Email already registered. Please login.", "error");
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem("aerova-users", JSON.stringify(users));
    
    // ✅ لاگین خودکار بعد از ثبت‌نام
    const sessionUser = {
        ...newUser,
        loginTime: new Date().toISOString(),
        sessionId: 'session_' + Date.now()
    };
    
    localStorage.setItem("aerova-current-user", JSON.stringify(sessionUser));
    
    showToast("Registration successful! Redirecting...", "success");
    
    // ✅ هدایت مستقیم به flights.html
    setTimeout(() => {
        window.location.href = "flights.html";
    }, 1500);
});
}

// ============ Helpers ============
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        el.classList.add("show");
    }
}

function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("show");
}

function switchAuthTab(tab) {
    document.querySelectorAll(".auth-tab").forEach((el) => {
        el.classList.toggle("active", el.dataset.auth === tab);
    });

    document.querySelectorAll(".auth-form").forEach((el) => {
        el.classList.toggle("active", el.id === `${tab}Form`);
    });
}

function togglePassword(id) {
    const input = document.getElementById(id);
    if (!input) return;

    const reveal = input.type === "password";
    const icon = input.parentElement && input.parentElement.querySelector(".password-toggle i");

    input.type = reveal ? "text" : "password";
    if (icon) {
        icon.className = reveal ? "fas fa-eye-slash" : "fas fa-eye";
    }
}

// ============ Password Strength ============
function initPasswordStrength() {
    const input = document.getElementById("registerPassword");
    const display = document.getElementById("passwordStrength");
    if (!input || !display) return;

    input.addEventListener("input", () => {
        const value = input.value;
        const strength = [
            value.length >= 8,
            /[A-Z]/.test(value),
            /[0-9]/.test(value),
            /[^A-Za-z0-9]/.test(value),
        ].filter(Boolean).length;

        if (!value) {
            display.textContent = "";
            display.className = "password-strength";
            return;
        }

        const level = strength <= 1 ? "weak" : strength <= 3 ? "medium" : "strong";
        const label = level.charAt(0).toUpperCase() + level.slice(1);

        display.textContent = `${label} (${strength}/4)`;
        display.className = `password-strength show ${level}`;
    });
}

// ============ Flight Status ============
function initFlightStatus() {
    const body = document.getElementById("flightStatusBody");
    if (!body) return;

    const flights = [
        ["AV 1234", "Paris, France", "10:30 AM", "A12", "On Time", "status-on-time"],
        ["AV 5678", "Dubai, UAE", "11:45 AM", "B05", "Boarding", "status-boarding"],
        ["AV 9012", "Tokyo, Japan", "01:15 PM", "C08", "Delayed", "status-delayed"],
        ["AV 3456", "Maldives", "02:30 PM", "D03", "On Time", "status-on-time"],
        ["AV 7890", "New York, USA", "03:45 PM", "A07", "Departed", "status-departed"],
    ];

    body.innerHTML = flights.map(([n, d, time, gate, status, style]) => {
        return `<tr>
            <td><strong>${n}</strong></td>
            <td>${d}</td>
            <td>${time}</td>
            <td>${gate}</td>
            <td><span class="status-badge ${style}">${status}</span></td>
            <td><span class="countdown-timer">${generateCountdown()}</span></td>
        </tr>`;
    }).join("");
}

function generateCountdown() {
    // Simple placeholder countdown rendering
    return "--:--";
}

// ============ Autocomplete ============
function initAutocomplete() {
    const cities = [
        "New York", "Los Angeles", "Chicago", "London", "Paris", "Berlin",
        "Tokyo", "Dubai", "Singapore", "Sydney", "Toronto", "Maldives",
        "Istanbul", "Amsterdam", "Barcelona", "Rome", "Vienna", "Prague",
    ];

    ["fromInput", "toInput"].forEach((id) => {
        const input = document.getElementById(id);
        if (input) setupAutocomplete(input, cities);
    });
}

function setupAutocomplete(input, cities) {
    const list = input.parentElement && input.parentElement.querySelector(".autocomplete-suggestions");
    if (!list) return;

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        const matches = query ? cities.filter((city) => city.toLowerCase().includes(query)) : [];

        list.innerHTML = "";

        matches.forEach((city) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "autocomplete-item";
            item.textContent = city;

            item.addEventListener("click", () => {
                input.value = city;
                list.classList.remove("active");
            });

            list.appendChild(item);
        });

        list.classList.toggle("active", matches.length > 0);
    });

    document.addEventListener("click", (e) => {
        if (!input.parentElement.contains(e.target)) {
            list.classList.remove("active");
        }
    });
}

// ============ Event Listeners ============
document.addEventListener("DOMContentLoaded", () => {
    initializeApp();

    document.addEventListener("click", (e) => {
        const authTab = e.target.closest(".auth-tab");
        const searchTab = e.target.closest(".search-tab");

        if (authTab) switchAuthTab(authTab.dataset.auth);

        if (searchTab) {
            document.querySelectorAll(".search-tab").forEach((tab) => {
                tab.classList.remove("active");
            });
            searchTab.classList.add("active");
        }
    });
});

// ============ Window Load ============
window.addEventListener("load", () => {
    setTimeout(() => {
        ["splashScreen", "preloader"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
        document.body.classList.remove("loading");
    }, 3000);
});

      // Flights page specific JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Flight data
            const flights = [
                { id: 1, airline: "Kam Air", code: "RQ 101", aircraft: "Boeing 737-500", fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai", depart: "13:20", arrive: "15:40", durationMin: 140, stops: 0, baggage: "25 kg", cabin: "Economy", price: 165 },
                { id: 2, airline: "Ariana Afghan Airlines", code: "FG 305", aircraft: "Airbus A310", fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai", depart: "07:05", arrive: "09:50", durationMin: 165, stops: 0, baggage: "20 kg", cabin: "Economy", price: 149 },
                { id: 3, airline: "Emirates", code: "EK 640", aircraft: "Boeing 777-300ER", fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai", depart: "18:45", arrive: "22:30", durationMin: 225, stops: 1, baggage: "35 kg", cabin: "Business", price: 720 },
                { id: 4, airline: "Qatar Airways", code: "QR 419", aircraft: "Airbus A350-900", fromCode: "HEA", fromCity: "Herat", toCode: "DOH", toCity: "Doha", depart: "09:30", arrive: "13:15", durationMin: 225, stops: 1, baggage: "30 kg", cabin: "Economy", price: 289 },
                { id: 5, airline: "Turkish Airlines", code: "TK 707", aircraft: "Boeing 787-9", fromCode: "HEA", fromCity: "Herat", toCode: "IST", toCity: "Istanbul", depart: "23:10", arrive: "05:05", durationMin: 355, stops: 1, baggage: "30 kg", cabin: "Economy", price: 342 },
                { id: 6, airline: "Emirates", code: "EK 218", aircraft: "Airbus A380-800", fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai", depart: "16:00", arrive: "18:10", durationMin: 130, stops: 0, baggage: "40 kg", cabin: "First Class", price: 1480 },
                { id: 7, airline: "Kam Air", code: "RQ 202", aircraft: "Boeing 767-200", fromCode: "HEA", fromCity: "Herat", toCode: "DEL", toCity: "Delhi", depart: "11:25", arrive: "17:55", durationMin: 390, stops: 2, baggage: "25 kg", cabin: "Economy", price: 268 },
                { id: 8, airline: "Qatar Airways", code: "QR 852", aircraft: "Boeing 787-8", fromCode: "HEA", fromCity: "Herat", toCode: "KUL", toCity: "Kuala Lumpur", depart: "02:40", arrive: "17:20", durationMin: 560, stops: 2, baggage: "30 kg", cabin: "Business", price: 965 },
                { id: 9, airline: "Turkish Airlines", code: "TK 372", aircraft: "Airbus A321neo", fromCode: "HEA", fromCity: "Herat", toCode: "IST", toCity: "Istanbul", depart: "14:50", arrive: "19:35", durationMin: 285, stops: 0, baggage: "25 kg", cabin: "Business", price: 655 },
                { id: 10, airline: "Ariana Afghan Airlines", code: "FG 211", aircraft: "Boeing 737-400", fromCode: "HEA", fromCity: "Herat", toCode: "AUH", toCity: "Abu Dhabi", depart: "20:15", arrive: "23:05", durationMin: 170, stops: 0, baggage: "20 kg", cabin: "Economy", price: 178 },
                { id: 11, airline: "Emirates", code: "EK 942", aircraft: "Boeing 777-200LR", fromCode: "HEA", fromCity: "Herat", toCode: "AUH", toCity: "Abu Dhabi", depart: "05:35", arrive: "08:30", durationMin: 175, stops: 1, baggage: "30 kg", cabin: "Economy", price: 205 },
                { id: 12, airline: "Kam Air", code: "RQ 303", aircraft: "Airbus A340-300", fromCode: "HEA", fromCity: "Herat", toCode: "DOH", toCity: "Doha", depart: "21:40", arrive: "01:20", durationMin: 220, stops: 0, baggage: "25 kg", cabin: "First Class", price: 1120 }
            ];
               });