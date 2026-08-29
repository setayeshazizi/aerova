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