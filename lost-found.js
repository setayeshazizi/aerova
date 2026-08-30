let currentTheme = "dark";

//Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeLostFoundPage();
});

function initializeLostFoundPage() {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }

  initParticles();
  initNavigation();
  initClock();
  initTheme();
  initCounters();
  initBackToTop();
  initLostItemForm();
  initSearchAndFilter();
  loadLostItems();
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
          ? `rgba(255, 255, 255, ${this.opacity})`
          : `rgba(0, 0, 0, ${this.opacity})`;
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
  const itemName = document.getElementById("itemName").value.trim();
  const category = document.getElementById("category").value;
  const location = document.getElementById("location").value.trim();
  const lostDate = document.getElementById("lostDate").value;
  const description = document.getElementById("description").value.trim();
  const contactName = document.getElementById("contactName").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (
    !itemName ||
    !location ||
    !lostDate ||
    !description ||
    !contactName ||
    !contact
  ) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Create new item
  const newItem = {
    id: Date.now(),
    reportId: "AER-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    itemName,
    category,
    location,
    lostDate,
    description,
    contactName,
    contact,
    status: "reported",
    createdAt: new Date().toISOString(),
  };

  // Add to list
  lostItems.unshift(newItem);

  // Save to localStorage
  saveLostItems();

  // Reset form
  form.reset();

  // Show success
  showToast(
    `Item reported successfully! Report ID: ${newItem.reportId}`,
    "success",
  );

  // Reload items
  renderLostItems(lostItems);
}

//Search & Filter
function initSearchAndFilter() {
  const searchInput = document.getElementById("searchInput");
  const filterCategory = document.getElementById("filterCategory");

  function filterItems() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const category = filterCategory ? filterCategory.value : "all";

    let filtered = lostItems.filter((item) => {
      const matchesQuery =
        !query ||
        item.itemName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.reportId.toLowerCase().includes(query);

      const matchesCategory = category === "all" || item.category === category;

      return matchesQuery && matchesCategory;
    });

    renderLostItems(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterItems);
  }

  if (filterCategory) {
    filterCategory.addEventListener("change", filterItems);
  }
}

//Render Items
function renderLostItems(items) {
  const container = document.getElementById("itemsContainer");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-box-open" style="font-size: 3rem; color: var(--text-muted);"></i>
                <h4 class="mt-3 mb-2">No items found</h4>
                <p class="text-secondary">Try changing your search criteria</p>
            </div>
        `;
    return;
  }

  const categoryIcons = {
    electronics: "fas fa-mobile-alt",
    bags: "fas fa-suitcase",
    documents: "fas fa-file-alt",
    clothing: "fas fa-tshirt",
    jewelry: "fas fa-gem",
    other: "fas fa-box",
  };

  container.innerHTML = items
    .map(
      (item) => `
        <div class="col-lg-4 col-md-6" data-aos="fade-up">
            <div class="item-card-lost">
                <div class="item-icon-lost">
                    <i class="${categoryIcons[item.category] || "fas fa-box"}"></i>
                </div>
                <h4>${item.itemName}</h4>
                <p>${item.description.substring(0, 80)}${item.description.length > 80 ? "..." : ""}</p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-secondary small">
                    <i class="fas fa-map-marker-alt me-1"></i>${item.location}
                    </span>
                    <span class="text-secondary small">
                        <i class="fas fa-calendar me-1"></i>${item.lostDate}
                    </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-secondary small">ID: ${item.reportId}</span>
                    <span class="item-status-lost ${getStatusClass(item.status)}">${getStatusLabel(item.status)}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

function getStatusClass(status) {
  switch (status) {
    case "found":
      return "status-found-lost";
    case "searching":
      return "status-searching-lost";
    default:
      return "status-reported-lost";
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "found":
      return "Found";
    case "searching":
      return "Searching";
    default:
      return "Reported";
  }
}

//LocalStorage
function saveLostItems() {
  localStorage.setItem("aerova-lost-items", JSON.stringify(lostItems));
}

function loadLostItems() {
  const saved = localStorage.getItem("aerova-lost-items");
  if (saved) {
    try {
      lostItems = JSON.parse(saved);
    } catch (error) {
      console.log("Unable to load lost items");
      lostItems = [];
    }
  }

  // Add some demo items if empty
  if (lostItems.length === 0) {
    lostItems = [
      {
        id: 1,
        reportId: "AER-8F3K2L",
        itemName: "Black iPhone 14",
        category: "electronics",
        location: "Gate A12",
        lostDate: "2026-08-25",
        description:
          "Black iPhone 14 with clear case and a photo of a dog on the lock screen",
        contactName: "Sarah Johnson",
        contact: "sarah@email.com",
        status: "searching",
        createdAt: "2026-08-25T10:00:00Z",
      },
      {
        id: 2,
        reportId: "AER-4H7M9P",
        itemName: "Brown Leather Wallet",
        category: "bags",
        location: "Security Checkpoint B",
        lostDate: "2026-08-26",
        description:
          "Brown leather wallet with ID cards and credit cards inside",
        contactName: "Michael Chen",
        contact: "michael@email.com",
        status: "found",
        createdAt: "2026-08-26T14:30:00Z",
      },
      {
        id: 3,
        reportId: "AER-9Q2W5R",
        itemName: "Sony Headphones",
        category: "electronics",
        location: "Lounge C",
        lostDate: "2026-08-27",
        description: "Black Sony WH-1000XM4 headphones in a gray case",
        contactName: "Emily Rodriguez",
        contact: "emily@email.com",
        status: "reported",
        createdAt: "2026-08-27T09:15:00Z",
      },
    ];
    saveLostItems();
  }

  renderLostItems(lostItems);
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

(function () {
  const themeToggleBtn = document.getElementById("themeToggle");
  if (!themeToggleBtn) {
    console.log("Theme toggle button not found!");
    return;
  }

  console.log("Theme toggle button found!");

  // Remove old onclick and add new event listener
  themeToggleBtn.onclick = null;

  themeToggleBtn.addEventListener("click", function () {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    console.log("Switching theme from " + currentTheme + " to " + newTheme);

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("aerova-theme", newTheme);

    // Update icon
    const moonIcon = this.querySelector(".fa-moon");
    const sunIcon = this.querySelector(".fa-sun");

    if (newTheme === "light") {
      if (moonIcon) moonIcon.style.display = "none";
      if (sunIcon) sunIcon.style.display = "block";
    } else {
      if (moonIcon) moonIcon.style.display = "block";
      if (sunIcon) sunIcon.style.display = "none";
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("aerova-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    const moonIcon = themeToggleBtn.querySelector(".fa-moon");
    const sunIcon = themeToggleBtn.querySelector(".fa-sun");

    if (savedTheme === "light") {
      if (moonIcon) moonIcon.style.display = "none";
      if (sunIcon) sunIcon.style.display = "block";
    }
  }

  console.log("Theme system initialized!");
})();
