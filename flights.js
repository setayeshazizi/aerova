  AEROVA - Navigation & Clock */

// Live Clock
function initAerovaClock() {
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

// Navigation Scroll
window.addEventListener("scroll", function () {
  const nav = document.getElementById("mainNav");
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

// Theme Toggle
function toggleThemeAerova() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("aerova-theme", newTheme);
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initAerovaClock();

  // Load theme
  const savedTheme = localStorage.getItem("aerova-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // AOS
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }
});
// ============ Theme ============
function initTheme() {
  const saved = localStorage.getItem("aerova-theme");
  const defaultTheme = saved || "dark";
  applyTheme(defaultTheme, false);
}
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  applyTheme(next, true);
  localStorage.setItem("aerova-theme", next);
}
function setTheme(theme, notify = true) {
  applyTheme(theme, notify);
}
function applyTheme(theme, notify = true) {
  currentTheme = theme === "light" ? "light" : "dark";
  // Set data-theme attribute
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Update icon visibility
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");

  if (moonIcon && sunIcon) {
    if (currentTheme === "light") {
      moonIcon.style.display = "none";
      sunIcon.style.display = "block";
    } else {
      moonIcon.style.display = "block";
      sunIcon.style.display = "none";
    }
  }

  if (notify) showToast(`Theme switched to ${currentTheme} mode`);
}



/* ------------------------------------------------------------------
   1. THEME TOGGLE (saved in localStorage)
------------------------------------------------------------------ */
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.className = "bi bi-moon-stars";
    themeBtn.setAttribute("aria-label", "Switch to dark mode");
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeIcon.className = "bi bi-sun";
    themeBtn.setAttribute("aria-label", "Switch to light mode");
  }
}

applyTheme(localStorage.getItem("skycrest-theme") || "dark");

themeBtn.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  localStorage.setItem("skycrest-theme", next);
  applyTheme(next);
});

/* ------------------------------------------------------------------
   2. SAMPLE FLIGHT DATA (frontend demo data)
------------------------------------------------------------------ */
const flights = [
  {
    id: 1, airline: "Kam Air", code: "RQ 101", aircraft: "Boeing 737-500",
    fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai",
    depart: "13:20", arrive: "15:40", durationMin: 140, stops: 0,
    baggage: "25 kg", cabin: "Economy", price: 165,
    cancellation: "Free cancellation within 24 hours of booking."
  },
  {
    id: 2, airline: "Ariana Afghan Airlines", code: "FG 305", aircraft: "Airbus A310",
    fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai",
    depart: "07:05", arrive: "09:50", durationMin: 165, stops: 0,
    baggage: "20 kg", cabin: "Economy", price: 149,
    cancellation: "Refundable with a $40 service fee."
  },
  {
    id: 3, airline: "Emirates", code: "EK 640", aircraft: "Boeing 777-300ER",
    fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai",
    depart: "18:45", arrive: "22:30", durationMin: 225, stops: 1,
    baggage: "35 kg", cabin: "Business", price: 720,
    cancellation: "Flexible fare — free changes up to 6 hours before departure."
  },
  {
    id: 4, airline: "Qatar Airways", code: "QR 419", aircraft: "Airbus A350-900",
    fromCode: "HEA", fromCity: "Herat", toCode: "DOH", toCity: "Doha",
    depart: "09:30", arrive: "13:15", durationMin: 225, stops: 1,
    baggage: "30 kg", cabin: "Economy", price: 289,
    cancellation: "Changes permitted for a $75 fee; non-refundable."
  },
  {
    id: 5, airline: "Turkish Airlines", code: "TK 707", aircraft: "Boeing 787-9",
    fromCode: "HEA", fromCity: "Herat", toCode: "IST", toCity: "Istanbul",
    depart: "23:10", arrive: "05:05", durationMin: 355, stops: 1,
    baggage: "30 kg", cabin: "Economy", price: 342,
    cancellation: "Free date change once; refund minus $60."
  },
  {
    id: 6, airline: "Emirates", code: "EK 218", aircraft: "Airbus A380-800",
    fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai",
    depart: "16:00", arrive: "18:10", durationMin: 130, stops: 0,
    baggage: "40 kg", cabin: "First Class", price: 1480,
    cancellation: "Fully refundable at any time before departure."
  },
  {
    id: 7, airline: "Kam Air", code: "RQ 202", aircraft: "Boeing 767-200",
    fromCode: "HEA", fromCity: "Herat", toCode: "DEL", toCity: "Delhi",
    depart: "11:25", arrive: "17:55", durationMin: 390, stops: 2,
    baggage: "25 kg", cabin: "Economy", price: 268,
    cancellation: "Non-refundable promotional fare."
  },
  {
    id: 8, airline: "Qatar Airways", code: "QR 852", aircraft: "Boeing 787-8",
    fromCode: "HEA", fromCity: "Herat", toCode: "KUL", toCity: "Kuala Lumpur",
    depart: "02:40", arrive: "17:20", durationMin: 560, stops: 2,
    baggage: "30 kg", cabin: "Business", price: 965,
    cancellation: "Free cancellation up to 48 hours before departure."
  },
  {
    id: 9, airline: "Turkish Airlines", code: "TK 372", aircraft: "Airbus A321neo",
    fromCode: "HEA", fromCity: "Herat", toCode: "IST", toCity: "Istanbul",
    depart: "14:50", arrive: "19:35", durationMin: 285, stops: 0,
    baggage: "25 kg", cabin: "Business", price: 655,
    cancellation: "Changes free of charge; refund minus $90."
  },
  {
    id: 10, airline: "Ariana Afghan Airlines", code: "FG 211", aircraft: "Boeing 737-400",
    fromCode: "HEA", fromCity: "Herat", toCode: "AUH", toCity: "Abu Dhabi",
    depart: "20:15", arrive: "23:05", durationMin: 170, stops: 0,
    baggage: "20 kg", cabin: "Economy", price: 178,
    cancellation: "Refundable with a $40 service fee."
  },
  {
    id: 11, airline: "Emirates", code: "EK 942", aircraft: "Boeing 777-200LR",
    fromCode: "HEA", fromCity: "Herat", toCode: "AUH", toCity: "Abu Dhabi",
    depart: "05:35", arrive: "08:30", durationMin: 175, stops: 1,
    baggage: "30 kg", cabin: "Economy", price: 205,
    cancellation: "Changes allowed for a $50 fee."
  },
  {
    id: 12, airline: "Kam Air", code: "RQ 303", aircraft: "Airbus A340-300",
    fromCode: "HEA", fromCity: "Herat", toCode: "DOH", toCity: "Doha",
    depart: "21:40", arrive: "01:20", durationMin: 220, stops: 0,
    baggage: "25 kg", cabin: "First Class", price: 1120,
    cancellation: "Fully refundable at any time before departure."
  }
];

/* Helpers -------------------------------------------------------- */
function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? h + "h" : h + "h " + m + "m";
}

function stopsLabel(stops) {
  if (stops === 0) return "Non-stop";
  if (stops === 1) return "1 Stop";
  return stops + " Stops";
}

function timeBucket(time) {
  const hour = parseInt(time.split(":")[0], 10);
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

/* ------------------------------------------------------------------
   3. RENDER FLIGHT CARDS
------------------------------------------------------------------ */
const resultsList = document.getElementById("resultsList");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function flightCardHTML(f) {
  return `
  <article class="flight-card reveal visible">
    <div class="row align-items-center g-4">
      <div class="col-lg-3">
        <p class="airline-name mb-1">${f.airline}</p>
        <p class="flight-no mb-0">${f.code} &middot; ${f.aircraft}</p>
      </div>

      <div class="col-lg-6">
        <div class="row align-items-center text-center text-lg-start">
          <div class="col-4">
            <p class="airport-code mb-0">${f.fromCode}</p>
            <p class="flight-time mb-0">${f.depart}</p>
            <p class="flight-city mb-0">${f.fromCity}</p>
          </div>
          <div class="col-4 path-visual">
            <span class="flight-city">${formatDuration(f.durationMin)}</span>
            <div class="path-line">
              <span class="path-plane"><i class="bi bi-airplane-fill" aria-hidden="true"></i></span>
            </div>
            <span class="flight-city">${stopsLabel(f.stops)}</span>
          </div>
          <div class="col-4 text-end text-lg-end">
            <p class="airport-code mb-0">${f.toCode}</p>
            <p class="flight-time mb-0">${f.arrive}</p>
            <p class="flight-city mb-0">${f.toCity}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="price-block">
          <p class="price-from mb-0">From</p>
          <p class="price-value mb-0">$${f.price}</p>
        </div>
      </div>
    </div>

    <div class="card-divider"></div>

    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div>
        <span class="meta-chip"><i class="bi bi-briefcase" aria-hidden="true"></i> Baggage ${f.baggage}</span>
        <span class="meta-chip"><i class="bi bi-airplane-engines" aria-hidden="true"></i> ${f.cabin}</span>
        <span class="meta-chip"><i class="bi bi-geo-alt" aria-hidden="true"></i> ${stopsLabel(f.stops)}</span>
      </div>
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-ghost btn-sm px-3" data-details="${f.id}">View Details</button>
        <a class="btn btn-lux btn-sm px-4" href="booking.html?flight=${encodeURIComponent(f.code)}">Book Now</a>
      </div>
    </div>
  </article>`;
}

function renderFlights(list) {
  resultsList.innerHTML = list.map(flightCardHTML).join("");
  resultCount.textContent = list.length + (list.length === 1 ? " flight available" : " flights available");
  emptyState.classList.toggle("show", list.length === 0);
}

/* ------------------------------------------------------------------
   4. FILTERS + SORTING
------------------------------------------------------------------ */
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const sortSelect = document.getElementById("sortSelect");

function checkedValues(name) {
  return Array.from(document.querySelectorAll('input[data-filter="' + name + '"]:checked'))
    .map((el) => el.value);
}

function applyFilters() {
  const maxPrice = Number(priceRange.value);
  const airlines = checkedValues("airline");
  const stops = checkedValues("stops");
  const times = checkedValues("time");
  const cabins = checkedValues("cabin");

  let list = flights.filter((f) => {
    if (f.price > maxPrice) return false;
    if (airlines.length && !airlines.includes(f.airline)) return false;
    if (stops.length) {
      const key = f.stops === 0 ? "0" : f.stops === 1 ? "1" : "2";
      if (!stops.includes(key)) return false;
    }
    if (times.length && !times.includes(timeBucket(f.depart))) return false;
    if (cabins.length && !cabins.includes(f.cabin)) return false;
    return true;
  });

  list = sortFlights(list, sortSelect.value);
  renderFlights(list);
}

function sortFlights(list, mode) {
  const copy = list.slice();
  if (mode === "cheapest") copy.sort((a, b) => a.price - b.price);
  else if (mode === "fastest") copy.sort((a, b) => a.durationMin - b.durationMin);
  else if (mode === "earliest") copy.sort((a, b) => a.depart.localeCompare(b.depart));
  else copy.sort((a, b) => a.stops - b.stops || a.price - b.price); // Recommended
  return copy;
}

priceRange.addEventListener("input", () => {
  priceValue.textContent = "$" + priceRange.value;
  applyFilters();
});
sortSelect.addEventListener("change", applyFilters);
document.querySelectorAll("input[data-filter]").forEach((el) => el.addEventListener("change", applyFilters));

function resetFilters() {
  document.querySelectorAll("input[data-filter]").forEach((el) => (el.checked = false));
  priceRange.value = priceRange.max;
  priceValue.textContent = "$" + priceRange.value;
  sortSelect.value = "recommended";
  applyFilters();
}
document.querySelectorAll("[data-reset-filters]").forEach((btn) => btn.addEventListener("click", resetFilters));

/* First render */
applyFilters();

/* ------------------------------------------------------------------
   5. SEARCH FORM: trip type, swap, validation, loading
------------------------------------------------------------------ */
const form = document.getElementById("searchForm");
const fromInput = document.getElementById("fromField");
const toInput = document.getElementById("toField");
const departInput = document.getElementById("departField");
const returnInput = document.getElementById("returnField");
const returnWrap = document.getElementById("returnWrap");
const passengersInput = document.getElementById("passengersField");
const cabinInput = document.getElementById("cabinField");
const swapBtn = document.getElementById("swapBtn");
const loadingState = document.getElementById("loadingState");
const resultsSection = document.getElementById("resultsSection");

/* One Way / Round Trip -------------------------------------------- */
document.querySelectorAll('input[name="tripType"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const roundTrip = document.getElementById("roundTrip").checked;
    returnWrap.classList.toggle("d-none", !roundTrip);
    if (!roundTrip) {
      returnInput.value = "";
      clearError(returnInput);
    }
  });
});

/* Swap airports --------------------------------------------------- */
swapBtn.addEventListener("click", () => {
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
  swapBtn.classList.remove("spin");
  void swapBtn.offsetWidth; // restart the animation
  swapBtn.classList.add("spin");
});

/* Validation helpers --------------------------------------------- */
function showError(input, message) {
  const wrap = input.closest(".field");
  wrap.classList.add("is-invalid-lux");
  wrap.querySelector(".field-error").textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearError(input) {
  const wrap = input.closest(".field");
  wrap.classList.remove("is-invalid-lux");
  input.removeAttribute("aria-invalid");
}

function validateForm() {
  let valid = true;
  [fromInput, toInput, departInput, returnInput, passengersInput, cabinInput].forEach(clearError);

  if (!fromInput.value.trim()) { showError(fromInput, "Please enter a departure airport."); valid = false; }
  if (!toInput.value.trim()) { showError(toInput, "Please enter a destination airport."); valid = false; }
  if (
    fromInput.value.trim() &&
    fromInput.value.trim().toLowerCase() === toInput.value.trim().toLowerCase()
  ) {
    showError(toInput, "Departure and destination cannot be the same.");
    valid = false;
  }
  if (!departInput.value) { showError(departInput, "Please choose a departure date."); valid = false; }

  if (document.getElementById("roundTrip").checked) {
    if (!returnInput.value) {
      showError(returnInput, "Please choose a return date.");
      valid = false;
    } else if (departInput.value && returnInput.value < departInput.value) {
      showError(returnInput, "Return date cannot be earlier than departure.");
      valid = false;
    }
  }
  if (!passengersInput.value) { showError(passengersInput, "Select the number of passengers."); valid = false; }
  if (!cabinInput.value) { showError(cabinInput, "Select a cabin class."); valid = false; }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  /* Premium loading state, then reveal results */
  resultsSection.classList.add("d-none");
  loadingState.classList.add("show");
  loadingState.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    loadingState.classList.remove("show");
    resultsSection.classList.remove("d-none");
    applyFilters();
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1800);
});

/* ------------------------------------------------------------------
   6. VIEW DETAILS — one reusable Bootstrap modal
------------------------------------------------------------------ */
const detailModal = new bootstrap.Modal(document.getElementById("flightModal"));
const modalBody = document.getElementById("flightModalBody");
const modalTitle = document.getElementById("flightModalLabel");
const modalBookBtn = document.getElementById("modalBookBtn");

function detailRow(key, value) {
  return `<div class="detail-row"><span class="detail-key">${key}</span><span class="detail-val">${value}</span></div>`;
}

resultsList.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-details]");
  if (!btn) return;
  const flight = flights.find((f) => f.id === Number(btn.dataset.details));
  if (!flight) return;

  modalTitle.textContent = flight.airline + " · " + flight.code;
  modalBody.innerHTML =
    detailRow("Airline", flight.airline) +
    detailRow("Flight Number", flight.code) +
    detailRow("Departure", flight.fromCity + " (" + flight.fromCode + ") · " + flight.depart) +
    detailRow("Arrival", flight.toCity + " (" + flight.toCode + ") · " + flight.arrive) +
    detailRow("Duration", formatDuration(flight.durationMin)) +
    detailRow("Stops", stopsLabel(flight.stops)) +
    detailRow("Aircraft", flight.aircraft) +
    detailRow("Baggage", flight.baggage) +
    detailRow("Cabin", flight.cabin) +
    detailRow("Price", "$" + flight.price) +
    detailRow("Cancellation", flight.cancellation);

  modalBookBtn.href = "booking.html?flight=" + encodeURIComponent(flight.code);
  detailModal.show();
});

/* ------------------------------------------------------------------
   7. FLIGHT STATUS BOARD
------------------------------------------------------------------ */
const statusData = {
  RQ101: { status: "On Time", cls: "status-ontime", fromCode: "HEA", fromCity: "Herat", toCode: "DXB", toCity: "Dubai", depart: "13:20", arrive: "15:40" },
  RQ202: { status: "Boarding", cls: "status-boarding", fromCode: "HEA", fromCity: "Herat", toCode: "DEL", toCity: "Delhi", depart: "11:25", arrive: "17:55" },
  RQ303: { status: "Delayed", cls: "status-delayed", fromCode: "HEA", fromCity: "Herat", toCode: "DOH", toCity: "Doha", depart: "21:40", arrive: "01:20" },
  RQ404: { status: "Cancelled", cls: "status-cancelled", fromCode: "HEA", fromCity: "Herat", toCode: "IST", toCity: "Istanbul", depart: "06:10", arrive: "11:05" }
};

const statusForm = document.getElementById("statusForm");
const statusInput = document.getElementById("statusInput");
const statusResult = document.getElementById("statusResult");
const statusError = document.getElementById("statusError");

statusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const key = statusInput.value.replace(/\s+/g, "").toUpperCase();
  const data = statusData[key];

  if (!data) {
    statusResult.classList.remove("show");
    statusError.textContent = key
      ? "Flight " + key + " was not found. Try RQ101, RQ202, RQ303 or RQ404."
      : "Please enter a flight number.";
    statusError.classList.remove("d-none");
    return;
  }

  statusError.classList.add("d-none");
  statusResult.innerHTML = `
    <div class="row align-items-center g-4 text-center text-md-start">
      <div class="col-md-3">
        <p class="board-city mb-1">Flight</p>
        <p class="board-code mb-0">${key}</p>
      </div>
      <div class="col-md-5">
        <p class="board-code mb-0" style="font-size:2rem">${data.fromCity.toUpperCase()} (${data.fromCode})</p>
        <p class="board-arrow mb-0" aria-hidden="true"><i class="bi bi-arrow-down"></i></p>
        <p class="board-code mb-0" style="font-size:2rem">${data.toCity.toUpperCase()} (${data.toCode})</p>
      </div>
      <div class="col-md-4 text-md-end">
        <span class="status-pill ${data.cls}"><span class="dot"></span>${data.status}</span>
        <p class="board-city mt-3 mb-1">Departure ${data.depart}</p>
        <p class="board-city mb-0">Arrival ${data.arrive}</p>
      </div>
    </div>`;
  statusResult.classList.add("show");
});

/* ------------------------------------------------------------------
   8. SCROLL REVEAL + ATMOSPHERIC PARTICLES
------------------------------------------------------------------ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = index * 80 + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));

/* A handful of soft particles in the hero (kept light for performance) */
const particleLayer = document.getElementById("particles");
for (let i = 0; i < 14; i++) {
  const dot = document.createElement("span");
  dot.className = "particle";
  dot.style.left = Math.random() * 100 + "%";
  dot.style.top = 60 + Math.random() * 40 + "%";
  dot.style.animationDuration = 12 + Math.random() * 12 + "s";
  dot.style.animationDelay = -Math.random() * 12 + "s";
  particleLayer.appendChild(dot);
}