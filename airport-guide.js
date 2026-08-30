let currentTheme = "dark";

//Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeGuidePage();
});

function initializeGuidePage() {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }

  initCustomCursor();
  initParticles();
  initNavigation();
  initClock();
  initTheme();
  initCounters();
  initBackToTop();
  initServices();
  initSearch();
}

//Particles
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle =
        currentTheme === "dark"
          ? `rgba(255,255,255,${this.opacity})`
          : `rgba(0,0,0,${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

//Navigation
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
}

//Live Clock
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

//Theme
function initTheme() {
  const savedTheme = localStorage.getItem("aerova-theme");
  if (savedTheme) {
    setTheme(savedTheme, false);
  }
}

function toggleTheme() {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("aerova-theme", newTheme);
}

function setTheme(theme, notify = true) {
  currentTheme = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (notify) showToast(`Theme switched to ${currentTheme} mode`);
}

//Toast
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
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

//Counters
function initCounters() {
  const counters = document.querySelectorAll(".counter-guide");
  if (!counters.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target")) || 0;
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);

            counter.textContent = currentValue;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

//Back to Top
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

//Services Data
const servicesData = [
  {
    icon: "fas fa-shield-alt",
    title: "Security Checkpoint",
    desc: "Fast-track security screening with dedicated lanes",
    tag: "Terminal A & B",
    category: "security",
  },
  {
    icon: "fas fa-suitcase",
    title: "Baggage Claim",
    desc: "Automated baggage carousels with real-time tracking",
    tag: "Level 1",
    category: "baggage",
  },
  {
    icon: "fas fa-utensils",
    title: "Restaurants",
    desc: "International cuisine from fast food to fine dining",
    tag: "All Terminals",
    category: "restaurants",
  },
  {
    icon: "fas fa-shopping-bag",
    title: "Duty Free Shops",
    desc: "Luxury brands and local products at tax-free prices",
    tag: "Terminal B & C",
    category: "shops",
  },
  {
    icon: "fas fa-restroom",
    title: "Restrooms",
    desc: "Clean and accessible facilities throughout the airport",
    tag: "Every 100m",
    category: "restrooms",
  },
  {
    icon: "fas fa-couch",
    title: "Lounges",
    desc: "Premium lounges with showers, food and workspaces",
    tag: "Terminal A",
    category: "lounges",
  },
  {
    icon: "fas fa-wifi",
    title: "Free Wi-Fi",
    desc: "High-speed internet access throughout the terminal",
    tag: "All Areas",
    category: "services",
  },
  {
    icon: "fas fa-wheelchair",
    title: "Accessibility",
    desc: "Complete accessibility services for all passengers",
    tag: "All Terminals",
    category: "services",
  },
  {
    icon: "fas fa-child",
    title: "Family Zone",
    desc: "Play areas and family-friendly facilities",
    tag: "Terminal B",
    category: "services",
  },
  {
    icon: "fas fa-paw",
    title: "Pet Relief",
    desc: "Designated areas for traveling pets",
    tag: "Near Gate 12",
    category: "services",
  },
  {
    icon: "fas fa-clock",
    title: "24/7 Support",
    desc: "Round-the-clock customer service desks",
    tag: "Main Concourse",
    category: "services",
  },
  {
    icon: "fas fa-car",
    title: "Parking",
    desc: "Short-term and long-term parking options",
    tag: "Level P1-P3",
    category: "services",
  },
];

//Init Services
function initServices() {
  const servicesGrid = document.getElementById("servicesGrid");
  if (!servicesGrid) return;

  renderServices(servicesData);
}

function renderServices(services) {
  const servicesGrid = document.getElementById("servicesGrid");
  if (!servicesGrid) return;

  servicesGrid.innerHTML = services
    .map(
      (service) => `
    <div class="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up">
        <div class="service-card-guide" data-category="${service.category}">
            <div class="service-icon-guide">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
            <span class="service-tag-guide">${service.tag}</span>
        </div>
    </div>
`,
    )
    .join("");
}

//Search & Filter
function initSearch() {
  const searchInput = document.getElementById("guideSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchBtn = document.getElementById("guideSearchBtn");

  function filterServices() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const category = categoryFilter ? categoryFilter.value : "all";

    let filtered = servicesData.filter((service) => {
      const matchesQuery =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.desc.toLowerCase().includes(query) ||
        service.tag.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || service.category === category;

      return matchesQuery && matchesCategory;
    });

    renderServices(filtered);

    if (filtered.length === 0) {
      showToast("No services found matching your search", "info");
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", filterServices);
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") filterServices();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterServices);
  }

  // Map zone clicks
  document.querySelectorAll(".map-zone").forEach((zone) => {
    zone.addEventListener("click", function () {
      const span = this.querySelector("span");
      const zoneName = span ? span.textContent : "this area";
      showToast(`Exploring ${zoneName}...`, "info");
    });
  });
}

(function () {
  const clockElement = document.getElementById("liveClock");
  if (!clockElement) {
    console.log("Clock element not found!");
    return;
  }
  console.log("Clock element found, starting clock...");

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = String(hours).padStart(2, "0");

    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  // Run immediately
  updateClock();

  // Update every second
  setInterval(updateClock, 1000);

  console.log("Clock started successfully!");
})();
