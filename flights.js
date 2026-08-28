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