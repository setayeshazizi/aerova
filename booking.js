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

/* =========================================
   FLIGHT PREVIEW
========================================= */

function updateFlightPreview() {
  if (fromCity.value && toCity.value) {
    document.getElementById("previewFrom").textContent = fromCity.value;

    document.getElementById("previewTo").textContent = toCity.value;

    flightPreview.classList.remove("d-none");
  } else {
    flightPreview.classList.add("d-none");
  }
}

fromCity.addEventListener("change", updateFlightPreview);

toCity.addEventListener("change", updateFlightPreview);

/* =========================================
   PASSENGER FORM
========================================= */

passengerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();

  const lastName = document.getElementById("lastName").value.trim();

  const email = document.getElementById("email").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const passport = document.getElementById("passport").value.trim();

  const birthDate = document.getElementById("birthDate").value;

  /* Name validation */

  if (firstName.length < 2 || lastName.length < 2) {
    showToast("Please enter a valid passenger name.");

    return;
  }

  /* Email validation */

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showToast("Please enter a valid email address.");

    return;
  }

  /* Phone validation */

  if (phone.length < 7) {
    showToast("Please enter a valid phone number.");

    return;
  }

  /* Passport */

  if (passport.length < 5) {
    showToast("Please enter a valid passport number.");

    return;
  }

  /* Store */

  bookingData.firstName = firstName;

  bookingData.lastName = lastName;

  bookingData.email = email;

  bookingData.phone = phone;

  bookingData.passport = passport;

  bookingData.birthDate = birthDate;

  saveBooking();

  goToStep(3);
});

/* =========================================
   SEAT SELECTION
========================================= */

seats.forEach(function (seat) {
  seat.addEventListener("click", function () {
    /* Remove previous selection */

    seats.forEach(function (item) {
      item.classList.remove("selected");
    });

    /* Select current */

    seat.classList.add("selected");

    selectedSeat = seat.dataset.seat;

    bookingData.seat = selectedSeat;

    showToast(`Seat ${selectedSeat} selected.`);

    saveBooking();
  });
});

/* =========================================
   EXTRAS
========================================= */

extras.forEach(function (extra) {
  extra.addEventListener("change", calculateExtras);
});

function calculateExtras() {
  bookingData.extras = [];

  bookingData.extrasPrice = 0;

  extras.forEach(function (extra) {
    if (extra.checked) {
      const name = extra.dataset.name;

      const price = Number(extra.dataset.price);

      bookingData.extras.push({
        name: name,

        price: price,
      });

      bookingData.extrasPrice += price;
    }
  });

  bookingData.totalPrice = bookingData.basePrice + bookingData.extrasPrice;

  saveBooking();
}
/* =========================================
   REVIEW BOOKING
========================================= */

document
  .getElementById("reviewBookingBtn")
  .addEventListener("click", function () {
    if (!selectedSeat) {
      showToast("Please select a seat first.");

      return;
    }

    updateSummary();

    goToStep(4);
  });

  /* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary() {
  const from = cityData[bookingData.from];

  const to = cityData[bookingData.to];

  document.getElementById("summaryFrom").textContent = from.code;

  document.getElementById("summaryFromName").textContent = from.name;

  document.getElementById("summaryTo").textContent = to.code;

  document.getElementById("summaryToName").textContent = to.name;

  document.getElementById("summaryPassenger").textContent =
    `${bookingData.firstName} ${bookingData.lastName}`;

  document.getElementById("summaryDate").textContent = formatDate(
    bookingData.date,
  );

  document.getElementById("summaryClass").textContent = bookingData.travelClass;

  document.getElementById("summarySeat").textContent = bookingData.seat;

  document.getElementById("basePrice").textContent =
    `$${bookingData.basePrice}`;

  document.getElementById("extrasPrice").textContent =
    `$${bookingData.extrasPrice}`;

  document.getElementById("totalPrice").textContent =
    `$${bookingData.totalPrice}`;
}

/* =========================================
   CONFIRM BOOKING
========================================= */

document
  .getElementById("confirmBookingBtn")
  .addEventListener("click", function () {
    /* Generate reference */

    bookingData.bookingReference = generateBookingReference();

    /* Save */

    saveBooking();

    /* Generate boarding pass */

    generateBoardingPass();

    /* Scroll */

    document.getElementById("boarding").scrollIntoView({
      behavior: "smooth",
    });

    showToast("Booking confirmed successfully!");
  });

  /* =========================================
   GENERATE BOARDING PASS
========================================= */

function generateBoardingPass() {
  const from = cityData[bookingData.from];

  const to = cityData[bookingData.to];

  document.getElementById("passFrom").textContent = from.code;

  document.getElementById("passFromName").textContent = from.name;

  document.getElementById("passTo").textContent = to.code;

  document.getElementById("passToName").textContent = to.name;

  document.getElementById("passPassenger").textContent =
    `${bookingData.firstName} ${bookingData.lastName}`;

  document.getElementById("passDate").textContent = formatDate(
    bookingData.date,
  );

  document.getElementById("passClass").textContent = bookingData.travelClass;

  document.getElementById("passSeat").textContent = bookingData.seat;

  document.getElementById("bookingReference").textContent =
    bookingData.bookingReference;

  document.getElementById("boardingPass").classList.remove("d-none");

  document.getElementById("boardingActions").classList.remove("d-none");
}
/* =========================================
   BOOKING REFERENCE
========================================= */

function generateBookingReference() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "SP-";

  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
/* =========================================
   STEP NAVIGATION
========================================= */

function goToStep(step) {
  currentStep = step;

  /* Hide all steps */

  bookingSteps.forEach(function (section) {
    section.classList.remove("active");
  });

  /* Show selected */

  document.getElementById(`step${step}`).classList.add("active");

  /* Progress */

  progressSteps.forEach(function (item) {
    const stepNumber = Number(item.dataset.step);

    item.classList.remove("active", "completed");

    if (stepNumber < step) {
      item.classList.add("completed");
    }

    if (stepNumber === step) {
      item.classList.add("active");
    }
  });

  /* Progress bar */

  const percentage = ((step - 1) / 3) * 100;

  progressBar.style.width = `${percentage}%`;

  /* Scroll */

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth",
  });
}
/* =========================================
   DATE FORMAT
========================================= */

function formatDate(dateString) {
  if (!dateString) {
    return "---";
  }

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
/* =========================================
   TOAST
========================================= */

function showToast(message) {
  toastMessage.textContent = message;

  const toast = new bootstrap.Toast(notificationToast, {
    delay: 3000,
  });

  toast.show();
}
/* =========================================
   LOCAL STORAGE
========================================= */

function saveBooking() {
  localStorage.setItem("skyPortBooking", JSON.stringify(bookingData));
}
/* =========================================
   LOAD SAVED BOOKING
========================================= */

function loadBooking() {
  const saved = localStorage.getItem("skyPortBooking");

  if (!saved) {
    return;
  }

  try {
    const data = JSON.parse(saved);

    bookingData = data;
  } catch (error) {
    console.log("Unable to load saved booking.");
  }
}
