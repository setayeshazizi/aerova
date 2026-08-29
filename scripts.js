let currentTheme = "dark";
let typingIndex = 0,
  charIndex = 0,
  isDeleting = false,
  currentTestimonial = 0;
const typingTexts = ["Next Adventure", "Dream Destination", "Perfect Journey"];

function initializeApp() {
  if (typeof AOS !== "undefined")
    AOS.init({ duration: 1000, once: true, offset: 100 });
  [
    initCustomCursor,
    initParticles,
    initNavigation,
    initClock,
    initTypingEffect,
    initCounters,
    initTestimonials,
    initBackToTop,
    initScrollEffects,
    initForms,
    initTheme,
    initFlightStatus,
    initAutocomplete,
    initPasswordStrength,
  ].forEach((init) => init());
}

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

function initNavigation() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  // Add shadow on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const toggler = document.querySelector(".custom-toggler");
  if (toggler) {
    toggler.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 150; // Offset for navbar

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

  // Run on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Run on page load
  updateActiveLink();

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Adjust for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update active link immediately
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close mobile menu if open
        const navCollapse = document.getElementById("navMenu");
        if (navCollapse.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });
}

function initClock() {
  const clock = document.getElementById("liveClock");
  if (!clock) return;
  const update = () => {
    const now = new Date();
    clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map((n) => String(n).padStart(2, "0"))
      .join(":");
  };
  update();
  setInterval(update, 1000);
}

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

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target,
          target = Number(counter.dataset.target) || 0,
          start = performance.now();
        const update = (time) => {
          const progress = Math.min((time - start) / 2000, 1);
          counter.textContent = Math.floor((1 - (1 - progress) ** 3) * target);
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        observer.unobserve(counter);
      }),
    { threshold: 0.5 },
  );
  counters.forEach((counter) => observer.observe(counter));
}

function initTestimonials() {
  const track = document.getElementById("testimonialTrack"),
    dots = document.getElementById("testimonialDots");
  if (!track || !dots) return;
  const slides = track.querySelectorAll(".testimonial-slide");
  if (!slides.length) return;
  const update = () => {
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    dots
      .querySelectorAll(".testimonial-dot")
      .forEach((dot, i) =>
        dot.classList.toggle("active", i === currentTestimonial),
      );
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
    currentTestimonial =
      (currentTestimonial - 1 + slides.length) % slides.length;
    update();
  };
  window.goToTestimonial = (i) => {
    currentTestimonial = Math.max(0, Math.min(i, slides.length - 1));
    update();
  };
  update();
  setInterval(window.nextTestimonial, 5000);
}

function initBackToTop() {
  const button = document.getElementById("backToTop"),
    circle = document.getElementById("progressCircle");
  if (!button) return;
  window.addEventListener(
    "scroll",
    () => {
      const total = document.documentElement.scrollHeight - innerHeight,
        progress = total ? scrollY / total : 0;
      button.classList.toggle("show", scrollY > 300);
      if (circle)
        circle.style.strokeDashoffset = 2 * Math.PI * 23 * (1 - progress);
    },
    { passive: true },
  );
  window.scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

function initScrollEffects() {
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const selector = a.getAttribute("href"),
        target =
          selector && selector !== "#"
            ? document.querySelector(selector)
            : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }),
  );
}
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
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-times-circle",
    info: "fas fa-info-circle",
  };
  toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${message}</span>`;
  toast.className = `toast-notification ${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function initForms() {
  const search = document.getElementById("flightSearchForm");
  if (search)
    search.addEventListener("submit", (e) => {
      e.preventDefault();
      const from = document.getElementById("fromInput").value.trim(),
        to = document.getElementById("toInput").value.trim(),
        date = document.getElementById("departureDate").value;
      if (!from || !to || !date)
        return showToast("Please fill in all required fields", "error");
      showToast("Searching for flights...");
      setTimeout(
        () => showToast("Flights found! Redirecting...", "success"),
        2000,
      );
    });
  bindLoginForm();
  bindRegisterForm();
  const newsletter = document.getElementById("newsletterForm");
  if (newsletter)
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletter.querySelector('input[type="email"]').value;
      if (!isValidEmail(email))
        return showToast("Please enter a valid email address", "error");
      newsletter.reset();
      showToast("Thank you for subscribing!", "success");
    });
}

function bindLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim(),
      password = document.getElementById("loginPassword").value,
      emailOk = isValidEmail(email),
      passwordOk = password.length >= 6;
    emailOk
      ? hideError("loginEmailError")
      : showError("loginEmailError", "Please enter a valid email address");
    passwordOk
      ? hideError("loginPasswordError")
      : showError(
          "loginPasswordError",
          "Password must be at least 6 characters",
        );
    if (!emailOk || !passwordOk) return;
    const user = JSON.parse(localStorage.getItem("aerova-users") || "[]").find(
      (u) => u.email === email && u.password === password,
    );
    if (!user)
      return showToast("Invalid credentials. Please try again.", "error");
    localStorage.setItem("aerova-current-user", JSON.stringify(user));
    showToast("Login successful! Welcome back!", "success");
    setTimeout(() => {
      location.href = "index.html";
    }, 1500);
  });
}

function bindRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value.trim(),
      email = document.getElementById("registerEmail").value.trim(),
      password = document.getElementById("registerPassword").value,
      confirmation = document.getElementById("confirmPassword").value;
    const valid = [
      [
        name.length >= 3,
        "registerNameError",
        "Name must be at least 3 characters",
      ],
      [
        isValidEmail(email),
        "registerEmailError",
        "Please enter a valid email address",
      ],
      [
        password.length >= 8,
        "registerPasswordError",
        "Password must be at least 8 characters",
      ],
      [
        password === confirmation,
        "confirmPasswordError",
        "Passwords do not match",
      ],
    ];
    valid.forEach(([ok, id, message]) =>
      ok ? hideError(id) : showError(id, message),
    );
    if (valid.some(([ok]) => !ok)) return;
    const users = JSON.parse(localStorage.getItem("aerova-users") || "[]");
    if (users.some((u) => u.email === email))
      return showToast("Email already registered. Please login.", "error");
    users.push({ name, email, password });
    localStorage.setItem("aerova-users", JSON.stringify(users));
    showToast("Registration successful! Please login.", "success");
    setTimeout(() => switchAuthTab("login"), 1500);
  });
}
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
  document
    .querySelectorAll(".auth-tab")
    .forEach((el) => el.classList.toggle("active", el.dataset.auth === tab));
  document
    .querySelectorAll(".auth-form")
    .forEach((el) => el.classList.toggle("active", el.id === `${tab}Form`));
}
function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const reveal = input.type === "password",
    icon = input.parentElement.querySelector(".password-toggle i");
  input.type = reveal ? "text" : "password";
  if (icon) icon.className = reveal ? "fas fa-eye-slash" : "fas fa-eye";
}
function initPasswordStrength() {
  const input = document.getElementById("registerPassword"),
    display = document.getElementById("passwordStrength");
  if (!input || !display) return;
  input.addEventListener("input", () => {
    const value = input.value,
      strength = [
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
    display.textContent = `${level[0].toUpperCase() + level.slice(1)} password`;
    display.className = `password-strength show ${level}`;
  });
}

function initFlightStatus() {
  const body = document.getElementById("flightStatusBody");
  if (!body) return;
  const flights = [
    [
      "AV 1234",
      "Paris, France",
      "10:30 AM",
      "A12",
      "On Time",
      "status-on-time",
    ],
    ["AV 5678", "Dubai, UAE", "11:45 AM", "B05", "Boarding", "status-boarding"],
    ["AV 9012", "Tokyo, Japan", "01:15 PM", "C08", "Delayed", "status-delayed"],
    ["AV 3456", "Maldives", "02:30 PM", "D03", "On Time", "status-on-time"],
    [
      "AV 7890",
      "New York, USA",
      "03:45 PM",
      "A07",
      "Departed",
      "status-departed",
    ],
  ];
  body.innerHTML = flights
    .map(
      ([n, d, time, gate, status, style]) =>
        `<tr><td><strong>${n}</strong></td><td>${d}</td><td>${time}</td><td>${gate}</td><td><span class="status-badge ${style}">${status}</span></td><td><span class="countdown-timer">${generateCountdown()}</span></td></tr>`,
    )
    .join("");
}
function generateCountdown() {
  return `${Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`;
}
function initAutocomplete() {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "London",
    "Paris",
    "Berlin",
    "Tokyo",
    "Dubai",
    "Singapore",
    "Sydney",
    "Toronto",
    "Maldives",
    "Istanbul",
    "Amsterdam",
    "Barcelona",
    "Rome",
    "Vienna",
    "Prague",
  ];
  ["fromInput", "toInput"].forEach((id) => {
    const input = document.getElementById(id);
    if (input) setupAutocomplete(input, cities);
  });
}
function setupAutocomplete(input, cities) {
  const list = input.parentElement.querySelector(".autocomplete-suggestions");
  if (!list) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase(),
      matches = query
        ? cities.filter((city) => city.toLowerCase().includes(query))
        : [];
    list.innerHTML = "";
    matches.forEach((city) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "autocomplete-item";
      item.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${city}`;
      item.addEventListener("click", () => {
        input.value = city;
        list.classList.remove("active");
      });
      list.appendChild(item);
    });
    list.classList.toggle("active", matches.length > 0);
  });
  document.addEventListener("click", (e) => {
    if (!input.parentElement.contains(e.target))
      list.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  document.addEventListener("click", (e) => {
    const authTab = e.target.closest(".auth-tab"),
      searchTab = e.target.closest(".search-tab");
    if (authTab) switchAuthTab(authTab.dataset.auth);
    if (searchTab) {
      document
        .querySelectorAll(".search-tab")
        .forEach((tab) => tab.classList.remove("active"));
      searchTab.classList.add("active");
    }
  });
});
window.addEventListener("load", () =>
  setTimeout(() => {
    ["splashScreen", "preloader"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
    document.body.classList.remove("loading");
  }, 3000),
);

document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";
  const scrollPos = window.scrollY + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


 (function() { const clockElement = document.getElementById('liveClock'); if (!clockElement) return;
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = String(hours).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Run immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);

console.log('Clock initialized successfully');
})();

// ============ New Testimonials Slider ============
let currentTestimonialNew = 0;
const totalTestimonialSlides = 3;

function initTestimonialsNew() {
    updateTestimonialNew();
    
    // Auto slide
    setInterval(() => {
        nextTestimonialNew();
    }, 5000);
}

function updateTestimonialNew() {
    const track = document.getElementById('testimonialTrackNew');
    const dots = document.querySelectorAll('.testimonial-dot-new');
    
    if (!track) return;
    
    track.style.transform = `translateX(-${currentTestimonialNew * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialNew);
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
    currentTestimonialNew = index;
    updateTestimonialNew();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsNew();
});
