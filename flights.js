(function () {
  "use strict";

  /* ---------- Theme toggle (persist in localStorage) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("skynest-theme");
  if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

  themeToggle.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("skynest-theme", next);
  });
  /* ---------- Navbar shadow on scroll ---------- */
  const navbar = document.querySelector(".navbar-sky");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });
    /* ============================================================
     FLIGHT DATA (demo dataset)
     ============================================================ */
  const FLIGHTS = [
    { airline: "Kam Air", code: "RQ", logo: "bi-airplane-fill", color: "#3b82f6", no: "RQ 101", from: "HEA", to: "DXB", dep: "13:20", arr: "15:40", dur: "2h 20m", durMin: 140, stops: 0, stopLabel: "Non-stop", baggage: "20kg checked", aircraft: "Airbus A320", price: 165, cabin: "Economy", cancel: "Free cancellation up to 24h before departure.", depSlot: "afternoon" },
    { airline: "Ariana Afghan Airlines", code: "FG", logo: "bi-airplane-fill", color: "#06b6d4", no: "FG 204", from: "HEA", to: "DXB", dep: "06:10", arr: "11:30", dur: "5h 20m", durMin: 320, stops: 1, stopLabel: "1 Stop · KBL", baggage: "25kg checked", aircraft: "Boeing 737-800", price: 210, cabin: "Economy", cancel: "Free cancellation up to 24h before departure.", depSlot: "morning" },
    { airline: "Turkish Airlines", code: "TK", logo: "bi-airplane-fill", color: "#8b5cf6", no: "TK 707", from: "HEA", to: "DXB", dep: "22:45", arr: "09:15", dur: "10h 30m", durMin: 630, stops: 1, stopLabel: "1 Stop · IST", baggage: "30kg checked", aircraft: "Boeing 787-9", price: 480, cabin: "Business", cancel: "Free cancellation up to 48h before departure.", depSlot: "night" },
    { airline: "Emirates", code: "EK", logo: "bi-airplane-fill", color: "#dc2626", no: "EK 902", from: "HEA", to: "DXB", dep: "08:30", arr: "11:00", dur: "3h 30m", durMin: 210, stops: 1, stopLabel: "1 Stop · KBL", baggage: "30kg checked", aircraft: "Airbus A350", price: 520, cabin: "Business", cancel: "Free cancellation up to 48h before departure.", depSlot: "morning" },
    { airline: "Qatar Airways", code: "QR", logo: "bi-airplane-fill", color: "#10b981", no: "QR 334", from: "HEA", to: "DXB", dep: "16:55", arr: "21:10", dur: "4h 15m", durMin: 255, stops: 1, stopLabel: "1 Stop · DOH", baggage: "30kg checked", aircraft: "Airbus A350-1000", price: 395, cabin: "Economy", cancel: "Free cancellation up to 24h before departure.", depSlot: "afternoon" },
    { airline: "Kam Air", code: "RQ", logo: "bi-airplane-fill", color: "#3b82f6", no: "RQ 118", from: "HEA", to: "DXB", dep: "19:40", arr: "22:00", dur: "2h 20m", durMin: 140, stops: 0, stopLabel: "Non-stop", baggage: "20kg checked", aircraft: "Airbus A320", price: 185, cabin: "Economy", cancel: "Free cancellation up to 24h before departure.", depSlot: "evening" },
    { airline: "Ariana Afghan Airlines", code: "FG", logo: "bi-airplane-fill", color: "#06b6d4", no: "FG 310", from: "HEA", to: "DXB", dep: "14:05", arr: "19:25", dur: "5h 20m", durMin: 320, stops: 2, stopLabel: "2 Stops · KBL, MCT", baggage: "25kg checked", aircraft: "Boeing 737-800", price: 175, cabin: "Economy", cancel: "Free cancellation up to 24h before departure.", depSlot: "afternoon" },
    { airline: "Turkish Airlines", code: "TK", logo: "bi-airplane-fill", color: "#8b5cf6", no: "TK 812", from: "HEA", to: "DXB", dep: "03:20", arr: "13:50", dur: "10h 30m", durMin: 630, stops: 2, stopLabel: "2 Stops · IST, MCT", baggage: "30kg checked", aircraft: "Boeing 787-9", price: 410, cabin: "Economy", cancel: "Free cancellation up to 48h before departure.", depSlot: "night" },
    { airline: "Emirates", code: "EK", logo: "bi-airplane-fill", color: "#dc2626", no: "EK 556", from: "HEA", to: "DXB", dep: "10:15", arr: "12:35", dur: "2h 20m", durMin: 140, stops: 0, stopLabel: "Non-stop", baggage: "35kg checked", aircraft: "Airbus A380", price: 690, cabin: "First Class", cancel: "Free cancellation up to 48h before departure.", depSlot: "morning" },
    { airline: "Qatar Airways", code: "QR", logo: "bi-airplane-fill", color: "#10b981", no: "QR 778", from: "HEA", to: "DXB", dep: "23:30", arr: "03:45", dur: "4h 15m", durMin: 255, stops: 1, stopLabel: "1 Stop · DOH", baggage: "40kg checked", aircraft: "Airbus A350-1000", price: 540, cabin: "First Class", cancel: "Free cancellation up to 48h before departure.", depSlot: "night" },
    { airline: "Kam Air", code: "RQ", logo: "bi-airplane-fill", color: "#3b82f6", no: "RQ 250", from: "HEA", to: "DXB", dep: "17:25", arr: "19:45", dur: "2h 20m", durMin: 140, stops: 0, stopLabel: "Non-stop", baggage: "20kg checked", aircraft: "Airbus A320", price: 199, cabin: "Business", cancel: "Free cancellation up to 24h before departure.", depSlot: "evening" },
    { airline: "Ariana Afghan Airlines", code: "FG", logo: "bi-airplane-fill", color: "#06b6d4", no: "FG 415", from: "HEA", to: "DXB", dep: "09:50", arr: "15:10", dur: "5h 20m", durMin: 320, stops: 1, stopLabel: "1 Stop · KBL", baggage: "25kg checked", aircraft: "Boeing 737-800", price: 225, cabin: "Premium Economy", cancel: "Free cancellation up to 24h before departure.", depSlot: "morning" }
  ];

  const AIRLINES = ["Ariana Afghan Airlines", "Kam Air", "Turkish Airlines", "Emirates", "Qatar Airways"];
   /* ============================================================
     FILTER SIDEBAR MARKUP (shared by desktop + mobile)
     ============================================================ */
  function buildFiltersHTML() {
    const airlineChecks = AIRLINES.map((a, i) => `
      <label class="filter-check">
        <input type="checkbox" class="filter-airline" data-airline="${a}" ${i < 2 ? "checked" : ""}>
        <span>${a}</span>
      </label>`).join("");

    return `
      <div class="filter-group">
        <div class="filter-title"><i class="bi bi-cash-coin"></i> Max Price</div>
        <div class="price-range-wrap"><span>$0</span><span class="price-label">$700</span></div>
        <input type="range" class="form-range filter-price" id="priceRange" min="100" max="700" step="5" value="700">
      </div>
      <div class="filter-group">
        <div class="filter-title"><i class="bi bi-buildings"></i> Airlines</div>
        ${airlineChecks}
      </div>
      <div class="filter-group">
        <div class="filter-title"><i class="bi bi-signpost-split"></i> Stops</div>
        <label class="filter-check"><input type="checkbox" class="filter-stop" data-stops="0" checked><span>Non-stop</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-stop" data-stops="1" checked><span>1 Stop</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-stop" data-stops="2" checked><span>2+ Stops</span></label>
      </div>
      <div class="filter-group">
        <div class="filter-title"><i class="bi bi-clock"></i> Departure Time</div>
        <label class="filter-check"><input type="checkbox" class="filter-time" data-slot="morning" checked><span>Morning</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-time" data-slot="afternoon" checked><span>Afternoon</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-time" data-slot="evening" checked><span>Evening</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-time" data-slot="night" checked><span>Night</span></label>
      </div>
      <div class="filter-group">
        <div class="filter-title"><i class="bi bi-bag-check"></i> Class</div>
        <label class="filter-check"><input type="checkbox" class="filter-class" data-class="Economy" checked><span>Economy</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-class" data-class="Premium Economy" checked><span>Premium Economy</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-class" data-class="Business" checked><span>Business</span></label>
        <label class="filter-check"><input type="checkbox" class="filter-class" data-class="First Class" checked><span>First Class</span></label>
      </div>
      <button class="btn-reset" id="resetFilters"><i class="bi bi-arrow-counterclockwise"></i> Reset Filters</button>
    `;
  }

   const filterDesktop = document.getElementById("filterPanelDesktop");
  const filterMobile = document.getElementById("filterPanelMobile");
  if (filterDesktop) filterDesktop.innerHTML = buildFiltersHTML();
  if (filterMobile) filterMobile.innerHTML = buildFiltersHTML();
   /* ============================================================
     SEARCH FORM
     ============================================================ */
  const searchForm = document.getElementById("searchForm");
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");
  const departDate = document.getElementById("departDate");
  const returnDate = document.getElementById("returnDate");
  const returnField = document.getElementById("returnField");
  const searchAlert = document.getElementById("searchAlert");
  const tripRadios = document.querySelectorAll('input[name="tripType"]');
  const swapBtn = document.getElementById("swapBtn");
  const flightList = document.getElementById("flightList");
  const emptyState = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");
  const sortBy = document.getElementById("sortBy");

  /* Default dates: today + tomorrow */
  const today = new Date();
  const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
  const fmt = (d) => d.toISOString().split("T")[0];
  departDate.value = fmt(today);
  returnDate.value = fmt(tomorrow);

  /* Trip type toggle: hide return for One Way */
  tripRadios.forEach((r) => r.addEventListener("change", function () {
    const oneWay = document.getElementById("tripOne").checked;
    returnField.classList.toggle("hidden-return", oneWay);
  }));
   /* Swap From / To with rotation */
  swapBtn.addEventListener("click", function () {
    const a = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = a;
    swapBtn.classList.add("spin");
    setTimeout(() => swapBtn.classList.remove("spin"), 500);
  });
  /* Validation + search */
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchAlert.classList.add("d-none");
    [fromInput, toInput, departDate, returnDate].forEach((el) => el.classList.remove("is-invalid"));

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    let ok = true;
    let msg = "";

    if (!from) { fromInput.classList.add("is-invalid"); ok = false; msg = "Please enter an origin."; }
    if (!to) { toInput.classList.add("is-invalid"); ok = false; if (!msg) msg = "Please enter a destination."; }
    if (from && to && from.toLowerCase() === to.toLowerCase()) {
      fromInput.classList.add("is-invalid"); toInput.classList.add("is-invalid");
      ok = false; msg = "Origin and destination cannot be the same.";
    }
    if (!departDate.value) { departDate.classList.add("is-invalid"); ok = false; if (!msg) msg = "Departure date is required."; }
    if (document.getElementById("tripRound").checked) {
      if (!returnDate.value) { returnDate.classList.add("is-invalid"); ok = false; if (!msg) msg = "Return date is required for round trips."; }
      else if (returnDate.value < departDate.value) { returnDate.classList.add("is-invalid"); ok = false; if (!msg) msg = "Return date cannot be earlier than departure."; }
    }

    if (!ok) {
      searchAlert.textContent = msg;
      searchAlert.classList.remove("d-none");
      searchAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    /* Show results */
    renderFlights();
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
  });
   /* ============================================================
     RENDER FLIGHT CARDS (with filtering + sorting)
     ============================================================ */
  function getActiveFilters(scope) {
    const maxPrice = parseInt(scope.querySelector(".filter-price").value, 10);
    const airlines = Array.from(scope.querySelectorAll(".filter-airline:checked")).map((c) => c.dataset.airline);
    const stops = Array.from(scope.querySelectorAll(".filter-stop:checked")).map((c) => parseInt(c.dataset.stops, 10));
    const times = Array.from(scope.querySelectorAll(".filter-time:checked")).map((c) => c.dataset.slot);
    const classes = Array.from(scope.querySelectorAll(".filter-class:checked")).map((c) => c.dataset.class);
    return { maxPrice, airlines, stops, times, classes };
  }
  function applyFilters(list) {
    /* Merge filters from both panels (union of checked) */
    const d = filterDesktop ? getActiveFilters(filterDesktop) : null;
    const m = filterMobile ? getActiveFilters(filterMobile) : null;
    const merge = (key) => {
      const set = new Set();
      if (d) d[key].forEach((v) => set.add(v));
      if (m) m[key].forEach((v) => set.add(v));
      return set;
    };
    const maxPrice = Math.min(d?.maxPrice || 700, m?.maxPrice || 700);
    const airlines = merge("airlines");
    const stops = merge("stops");
    const times = merge("times");
    const classes = merge("classes");
    return list.filter((f) =>
      f.price <= maxPrice &&
      airlines.has(f.airline) &&
      stops.has(f.stops) &&
      times.has(f.depSlot) &&
      classes.has(f.cabin)
    );
  }
   function sortFlights(list) {
    const mode = sortBy.value;
    const arr = list.slice();
    if (mode === "cheapest") arr.sort((a, b) => a.price - b.price);
    else if (mode === "fastest") arr.sort((a, b) => a.durMin - b.durMin);
    else if (mode === "earliest") arr.sort((a, b) => a.dep.localeCompare(b.dep));
    else arr.sort((a, b) => (a.stops - b.stops) || (a.price - b.price)); /* recommended */
    return arr;
  }
function stopBadgeClass(stops) {
    return stops === 0 ? "stop-non" : stops === 1 ? "stop-1" : "stop-2";
  }
  function flightCardHTML(f, i) {
    return `
      <article class="flight-card" style="animation-delay:${i * 0.06}s">
        <div class="flight-grid">
          <div class="airline-block">
            <div class="airline-logo" style="background:${f.color}"><i class="bi ${f.logo}"></i></div>
            <div>
              <div class="airline-name">${f.airline}</div>
              <div class="flight-no">${f.no}</div>
            </div>
          </div>
          <div class="route-block">
            <div class="route-times">
              <span>${f.dep}<br><small class="route-codes">${f.from}</small></span>
              <span class="route-arrow"><i class="bi bi-airplane"></i><br><small>${f.dur}</small></span>
              <span>${f.arr}<br><small class="route-codes">${f.to}</small></span>
            </div>
            <div class="route-meta">
              <span class="stop-badge ${stopBadgeClass(f.stops)}">${f.stopLabel}</span>
              <span class="baggage-info"><i class="bi bi-bag-fill"></i> ${f.baggage}</span>
            </div>
          </div>
          <div class="price-block">
            <div class="price-label">From</div>
            <div class="price"><span class="currency">$</span>${f.price}</div>
            <div class="flight-actions">
              <button class="btn btn-outline-soft view-details" data-no="${f.no}">View Details</button>
              <a href="../booking.html" class="btn btn-gradient book-now">Book Now</a>
            </div>
          </div>
        </div>
      </article>`;
  }
  function renderFlights() {
    const filtered = applyFilters(FLIGHTS);
    const sorted = sortFlights(filtered);
    flightList.innerHTML = sorted.map((f, i) => flightCardHTML(f, i)).join("");
    resultCount.textContent = `${sorted.length} flight${sorted.length === 1 ? "" : "s"} available`;
    emptyState.classList.toggle("d-none", sorted.length > 0);
    attachDetailHandlers();
  }
   /* ============================================================
     FILTER + SORT WIRING
     ============================================================ */
  function wireFilterPanel(scope) {
    if (!scope) return;
    const priceRange = scope.querySelector(".filter-price");
    const priceLabel = scope.querySelector(".price-label");
    if (priceRange && priceLabel) {
      priceRange.addEventListener("input", () => { priceLabel.textContent = "$" + priceRange.value; renderFlights(); });
    }
    scope.querySelectorAll("input[type=checkbox]").forEach((c) => c.addEventListener("change", renderFlights));
    const reset = scope.querySelector("#resetFilters");
    if (reset) reset.addEventListener("click", function () {
      scope.querySelectorAll("input[type=checkbox]").forEach((c) => (c.checked = true));
      if (priceRange) { priceRange.value = 700; priceLabel.textContent = "$700"; }
      renderFlights();
    });
  }
  wireFilterPanel(filterDesktop);
  wireFilterPanel(filterMobile);

  sortBy.addEventListener("change", renderFlights);
  /* ============================================================
     FLIGHT STATUS CHECKER
     ============================================================ */
  const statusForm = document.getElementById("statusForm");
  const statusInput = document.getElementById("statusInput");
  const statusCard = document.getElementById("statusCard");

  /* Deterministic demo status from flight number */
  function statusFor(no) {
    const clean = no.replace(/\s+/g, "").toUpperCase();
    const statuses = [
      { key: "ontime", label: "On Time", dot: "ontime", detail: "Scheduled departure on time. Gate will be announced 45 minutes before boarding." },
      { key: "delayed", label: "Delayed", dot: "delayed", detail: "Delayed by approximately 35 minutes due to weather conditions." },
      { key: "boarding", label: "Boarding", dot: "boarding", detail: "Boarding has started. Please proceed to the gate immediately." },
      { key: "cancelled", label: "Cancelled", dot: "cancelled", detail: "This flight has been cancelled. Please contact customer support for rebooking." }
    ];
    const idx = (clean.charCodeAt(clean.length - 1) + clean.length) % statuses.length;
    return statuses[idx];
  }

  statusForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const no = statusInput.value.trim();
    if (!no) { statusInput.focus(); return; }
    const s = statusFor(no);
    const f = FLIGHTS.find((x) => x.no.replace(/\s+/g, "").toUpperCase() === no.replace(/\s+/g, "").toUpperCase());
    const route = f ? `${f.from} → ${f.to}` : "Route info unavailable";
    const dep = f ? `${f.dep} · ${f.airline}` : "Schedule unavailable";
    statusCard.innerHTML = `
      <div class="status-result">
        <div class="status-row">
          <span class="status-dot ${s.dot}"></span>
          <span class="status-label">${s.label}</span>
          <span class="text-muted ms-auto">Flight ${no.toUpperCase()}</span>
        </div>
        <div class="status-detail">
          <div><strong>Route:</strong> ${route}</div>
          <div><strong>Schedule:</strong> ${dep}</div>
          <div>${s.detail}</div>
        </div>
      </div>`;
  });
   /* ============================================================
     POPULAR DESTINATIONS
     ============================================================ */
  const DESTINATIONS = [
    { name: "Dubai", country: "United Arab Emirates", desc: "Futuristic skyline, golden deserts and world-class shopping.", img: "https://images.pexels.com/photos/19664340/pexels-photo-19664340.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Istanbul", country: "Turkey", desc: "Where two continents meet — minarets, bazaars and the Bosphorus.", img: "https://images.pexels.com/photos/8518777/pexels-photo-8518777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Doha", country: "Qatar", desc: "A gleaming bayfront city of art, culture and desert adventure.", img: "https://images.pexels.com/photos/19748320/pexels-photo-19748320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Delhi", country: "India", desc: "Ancient monuments, vibrant streets and rich Mughal heritage.", img: "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Kuala Lumpur", country: "Malaysia", desc: "Towering skyscrapers, lush parks and a blend of cultures.", img: "https://images.pexels.com/photos/9395978/pexels-photo-9395978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Abu Dhabi", country: "United Arab Emirates", desc: "Grand mosques, island Corniche and serene Gulf waters.", img: "https://images.pexels.com/photos/28448972/pexels-photo-28448972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" }
  ];
  const destGrid = document.getElementById("destinationsGrid");
  destGrid.innerHTML = DESTINATIONS.map((d) => `
    <div class="col-md-6 col-lg-4">
      <div class="dest-card">
        <div class="dest-img"><img src="${d.img}" alt="${d.name} skyline" loading="lazy"></div>
        <div class="dest-body">
          <div class="dest-country">${d.country}</div>
          <div class="dest-name">${d.name}</div>
          <p class="dest-desc">${d.desc}</p>
          <a href="../booking.html" class="dest-btn">Explore Flights <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div>`).join("");
     /* ============================================================
     INITIAL RENDER
     ============================================================ */
  renderFlights();
})();