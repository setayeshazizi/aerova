/* =========================================
   AIRPORT BOOKING SYSTEM
========================================= */

/* =========================================
   GLOBAL VARIABLES
========================================= */

let currentStep = 1;

let selectedSeat = null;

let bookingData = {
  from: "",
  to: "",
  date: "",
  travelClass: "",

  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  passport: "",
  birthDate: "",

  seat: null,

  extras: [],

  basePrice: 250,
  extrasPrice: 0,
  totalPrice: 250,

  bookingReference: "",
};
/* =========================================
   DOM ELEMENTS
========================================= */

const flightForm = document.getElementById("flightForm");

const passengerForm = document.getElementById("passengerForm");

const fromCity = document.getElementById("fromCity");

const toCity = document.getElementById("toCity");

const departureDate = document.getElementById("departureDate");

const travelClass = document.getElementById("travelClass");

const flightPreview = document.getElementById("flightPreview");

const progressBar = document.getElementById("progressBar");

const progressSteps = document.querySelectorAll(".progress-step");

const bookingSteps = document.querySelectorAll(".booking-step");

const seats = document.querySelectorAll(".seat.available");

const extras = document.querySelectorAll(".extra-option");

const themeToggle = document.getElementById("themeToggle");

const notificationToast = document.getElementById("notificationToast");

const toastMessage = document.getElementById("toastMessage");

/* =========================================
   CITY DATA
========================================= */

const cityData = {
  HER: {
    code: "HER",
    name: "Herat",
  },

  KBL: {
    code: "KBL",
    name: "Kabul",
  },

  DXB: {
    code: "DXB",
    name: "Dubai",
  },

  IST: {
    code: "IST",
    name: "Istanbul",
  },

  DEL: {
    code: "DEL",
    name: "Delhi",
  },

  DOH: {
    code: "DOH",
    name: "Doha",
  },
};
/* =========================================
   CLASS PRICES
========================================= */

const classPrices = {
  Economy: 250,

  Premium: 390,

  Business: 650,
};
/* =========================================
   SET MINIMUM DATE
========================================= */

const today = new Date().toISOString().split("T")[0];

departureDate.min = today;
/* =========================================
   FLIGHT FORM
========================================= */

flightForm.addEventListener("submit", function (event) {
  event.preventDefault();

  /* Validate same airport */

  if (fromCity.value === toCity.value) {
    showToast("Departure and destination cannot be the same.");

    toCity.focus();

    return;
  }

  /* Validate */

  if (
    !fromCity.value ||
    !toCity.value ||
    !departureDate.value ||
    !travelClass.value
  ) {
    showToast("Please complete all flight information.");

    return;
  }

  /* Store data */

  bookingData.from = fromCity.value;

  bookingData.to = toCity.value;

  bookingData.date = departureDate.value;

  bookingData.travelClass = travelClass.value;

  bookingData.basePrice = classPrices[travelClass.value];

  bookingData.totalPrice = bookingData.basePrice;

  /* Save */

  saveBooking();

  /* Next step */

  goToStep(2);
});
