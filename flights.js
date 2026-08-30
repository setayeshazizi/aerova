/* flights.js - cleaned and fixed */

// Theme toggle
const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

window.toggleTheme = function () {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  localStorage.setItem("skycrest-theme", next);
  applyTheme(next);
};

applyTheme(localStorage.getItem("skycrest-theme") || "dark");
if (themeBtn) themeBtn.addEventListener("click", window.toggleTheme);

// Live clock
function updateClock() {
  const clock = document.getElementById("liveClock");
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// Sample flight data (minimal demo set)
const flights = [
  {
    id: 1,
    code: 'RQ101',
    airline: 'AEROVA',
    fromCode: 'HEA',
    fromCity: 'Herat',
    toCode: 'DXB',
    toCity: 'Dubai',
    depart: '13:20',
    arrive: '15:40',
    durationMin: 140,
    stops: 0,
    baggage: '20kg',
    cabin: 'Economy',
    price: 199,
    aircraft: 'A320',
    cancellation: 'Non-refundable'
  },
  {
    id: 2,
    code: 'RQ202',
    airline: 'AEROVA',
    fromCode: 'HEA',
    fromCity: 'Herat',
    toCode: 'DEL',
    toCity: 'Delhi',
    depart: '11:25',
    arrive: '17:55',
    durationMin: 370,
    stops: 1,
    baggage: '25kg',
    cabin: 'Economy',
    price: 299,
    aircraft: 'B737',
    cancellation: 'Refundable'
  }
];

// Helpers
function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function stopsLabel(stops) {
  if (stops === 0) return "Non-stop";
  if (stops === 1) return "1 Stop";
  return `${stops} Stops`;
}

function timeBucket(time) {
  const hour = parseInt(time.split(":")[0], 10);
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

// Render flight cards
const resultsList = document.getElementById("resultsList");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function flightCardHTML(f) {
  return `
  <div class="flight-card mb-4">
    <div class="row">
      <div class="col-lg-7">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <p class="airport-code mb-0">${f.fromCode}</p>
            <p class="flight-time mb-0">${f.depart}</p>
            <p class="flight-city mb-0">${f.fromCity}</p>
          </div>
          <div class="text-center">
            <p class="flight-duration mb-0">${formatDuration(f.durationMin)}</p>
            <p class="stops mb-0">${stopsLabel(f.stops)}</p>
          </div>
          <div class="text-end">
            <p class="airport-code mb-0">${f.toCode}</p>
            <p class="flight-time mb-0">${f.arrive}</p>
            <p class="flight-city mb-0">${f.toCity}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-5 text-end">
        <div class="price-block">
          <p class="price-from mb-0">From</p>
          <p class="price-value mb-0">$${f.price}</p>
          <div class="mt-2">
            <button class="btn btn-ghost btn-sm px-3" data-details="${f.id}">View Details</button>
            <a class="btn btn-lux btn-sm px-4" href="booking.html?flight=${encodeURIComponent(f.code)}">Book Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderFlights(list) {
  if (!resultsList) return;
  resultsList.innerHTML = list.map(flightCardHTML).join("");
  if (resultCount) resultCount.textContent = `${list.length} ${list.length === 1 ? 'flight available' : 'flights available'}`;
  if (emptyState) emptyState.classList.toggle('show', list.length === 0);
}

// Filters and sorting
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const sortSelect = document.getElementById("sortSelect");

function checkedValues(name) {
  return Array.from(document.querySelectorAll(`input[data-filter="${name}"]:checked`)).map((el) => el.value);
}

function applyFilters() {
  const maxPrice = Number(priceRange ? priceRange.value : 1500);
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

  list = sortFlights(list, sortSelect ? sortSelect.value : "recommended");
  renderFlights(list);
}

function sortFlights(list, mode) {
  const copy = list.slice();
  if (mode === "cheapest") copy.sort((a, b) => a.price - b.price);
  else if (mode === "fastest") copy.sort((a, b) => a.durationMin - b.durationMin);
  else if (mode === "earliest") copy.sort((a, b) => a.depart.localeCompare(b.depart));
  else copy.sort((a, b) => a.stops - b.stops || a.price - b.price);
  return copy;
}

if (priceRange) {
  priceRange.addEventListener("input", () => {
    if (priceValue) priceValue.textContent = "$" + priceRange.value;
    applyFilters();
  });
}
if (sortSelect) sortSelect.addEventListener("change", applyFilters);
document.querySelectorAll("input[data-filter]").forEach((el) => el.addEventListener("change", applyFilters));

function resetFilters() {
  document.querySelectorAll("input[data-filter]").forEach((el) => (el.checked = false));
  if (priceRange) {
    priceRange.value = priceRange.max || 1500;
    if (priceValue) priceValue.textContent = "$" + priceRange.value;
  }
  if (sortSelect) sortSelect.value = "recommended";
  applyFilters();
}
document.querySelectorAll("[data-reset-filters]").forEach((btn) => btn.addEventListener("click", resetFilters));

// Initial render
applyFilters();

// Search form handling
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

document.querySelectorAll('input[name="tripType"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const roundTrip = document.getElementById("roundTrip")?.checked;
    if (returnWrap) returnWrap.classList.toggle("d-none", !roundTrip);
    if (!roundTrip && returnInput) {
      returnInput.value = "";
      clearError(returnInput);
    }
  });
});

if (swapBtn) {
  swapBtn.addEventListener("click", () => {
    if (fromInput && toInput) {
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
    }
    swapBtn.classList.remove("spin");
    void swapBtn.offsetWidth;
    swapBtn.classList.add("spin");
  });
}

function showError(input, message) {
  if (!input) return;
  const wrap = input.closest(".field");
  if (wrap) {
    wrap.classList.add("is-invalid-lux");
    const errorEl = wrap.querySelector(".field-error");
    if (errorEl) errorEl.textContent = message;
  }
  input.setAttribute("aria-invalid", "true");
}

function clearError(input) {
  if (!input) return;
  const wrap = input.closest(".field");
  if (wrap) wrap.classList.remove("is-invalid-lux");
  input.removeAttribute("aria-invalid");
}

function validateForm() {
  let valid = true;
  [fromInput, toInput, departInput, returnInput, passengersInput, cabinInput].forEach(clearError);
  if (fromInput && !fromInput.value.trim()) {
    showError(fromInput, "Please enter a departure airport.");
    valid = false;
  }
  if (toInput && !toInput.value.trim()) {
    showError(toInput, "Please enter a destination airport.");
    valid = false;
  }
  if (fromInput && toInput && fromInput.value.trim() && fromInput.value.trim().toLowerCase() === toInput.value.trim().toLowerCase()) {
    showError(toInput, "Departure and destination cannot be the same.");
    valid = false;
  }
  if (departInput && !departInput.value) {
    showError(departInput, "Please choose a departure date.");
    valid = false;
  }
  const roundTrip = document.getElementById("roundTrip");
  if (roundTrip && roundTrip.checked && returnInput) {
    if (!returnInput.value) {
      showError(returnInput, "Please choose a return date.");
      valid = false;
    } else if (departInput && departInput.value && returnInput.value < departInput.value) {
      showError(returnInput, "Return date cannot be earlier than departure.");
      valid = false;
    }
  }
  if (passengersInput && !passengersInput.value) {
    showError(passengersInput, "Select the number of passengers.");
    valid = false;
  }
  if (cabinInput && !cabinInput.value) {
    showError(cabinInput, "Select a cabin class.");
    valid = false;
  }
  return valid;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (resultsSection) resultsSection.classList.add("d-none");
    if (loadingState) {
      loadingState.classList.add("show");
      loadingState.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      if (loadingState) loadingState.classList.remove("show");
      if (resultsSection) resultsSection.classList.remove("d-none");
      applyFilters();
      if (resultsSection) resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1200);
  });
}

// View details modal
const detailModal = document.getElementById("flightModal") ? new bootstrap.Modal(document.getElementById("flightModal")) : null;
const modalBody = document.getElementById("flightModalBody");
const modalTitle = document.getElementById("flightModalLabel");
const modalBookBtn = document.getElementById("modalBookBtn");

function detailRow(key, value) {
  const div = document.createElement('div');
  div.className = 'detail-row';
  div.innerHTML = `<span class="detail-key">${key}</span><span class="detail-val">${value}</span>`;
  return div.outerHTML;
}

if (resultsList) {
  resultsList.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-details]");
    if (!btn) return;
    const flight = flights.find((f) => f.id === Number(btn.dataset.details));
    if (!flight) return;
    if (modalTitle) modalTitle.textContent = flight.airline + " · " + flight.code;
    if (modalBody) {
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
    }
    if (modalBookBtn) modalBookBtn.href = "booking.html?flight=" + encodeURIComponent(flight.code);
    if (detailModal) detailModal.show();
  });
}

// Flight status board
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

if (statusForm) {
  statusForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!statusInput) return;
    const key = statusInput.value.replace(/\s+/g, "").toUpperCase();
    const data = statusData[key];
    if (!data) {
      if (statusResult) statusResult.classList.remove("show");
      if (statusError) {
        statusError.textContent = key ? `Flight ${key} was not found. Try RQ101, RQ202, RQ303 or RQ404.` : "Please enter a flight number.";
        statusError.classList.remove("d-none");
      }
      return;
    }
    if (statusError) statusError.classList.add("d-none");
    if (statusResult) {
      statusResult.innerHTML = `
        <div class="row align-items-center g-4 text-center text-md-start">
          <div class="col-md-3">
            <p class="board-city mb-1">Flight</p>
            <p class="board-code mb-0">${key}</p>
          </div>
          <div class="col-md-5">
            <p class="board-code mb-0" style="font-size:2rem">${data.fromCode}</p>
            <p class="board-arrow mb-0" aria-hidden="true"><i class="bi bi-arrow-down"></i></p>
            <p class="board-code mb-0" style="font-size:2rem">${data.toCode}</p>
          </div>
          <div class="col-md-4 text-md-end">
            <span class="status-pill ${data.cls}">${data.status}</span>
            <p class="board-city mt-3 mb-1">Departure ${data.depart}</p>
            <p class="board-city mb-0">Arrival ${data.arrive}</p>
          </div>
        </div>`;
      statusResult.classList.add("show");
    }
  });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = index * 80 + "ms";
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));

// Soft particles
const particleLayer = document.getElementById("particles");
if (particleLayer) {
  for (let i = 0; i < 14; i++) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = 60 + Math.random() * 40 + "%";
    dot.style.animationDuration = 12 + Math.random() * 12 + "s";
    dot.style.animationDelay = -Math.random() * 12 + "s";
    particleLayer.appendChild(dot);
  }
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNav');
  if (nav && window.scrollY > 50) nav.classList.add('scrolled');
  else if (nav) nav.classList.remove('scrolled');
});
