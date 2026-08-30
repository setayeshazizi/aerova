# AEROVA — Airport & Travel Website
Your Gateway to the World 

A premium, modern, and interactive airport & travel experience platform built with HTML, CSS, Bootstrap, and JavaScript.
AEROVA is a front-end airport and travel website designed to provide users with a smooth and visually engaging experience for exploring flights, booking seats, managing boarding passes, finding airport services, and reporting lost items.

---

## Features
- Design & User Experience
 
 - Dark / Light Mode
 
 - Switch between dark and light themes
 
- Theme preference saved using LocalStorage

 - Live Clock
 
- Real-time clock displayed in the navigation bar

- Interactive hover effects

- Particles Backgroun
 
- Animated canvas-based particle background

- AOS Animations

- Smooth scroll-triggered animations

 - 3D Flip Cards
 
- Interactive destination cards with 3D effects

- Fully Responsive

- Mobile-first design

- Optimized for desktop, tablet, and mobile

- Splash Screen

- Branded introduction animation

- Airport-Themed Preloader

- Cloud & runway inspired loading animation


---


## Authentication
AEROVA includes a complete front-end authentication experience.
Features
- Register / Login
Real-time form validation
- Show / Hide password
  - LocalStorage session persistence
- Protected pages with authentication guards
  - Logout functionality
Note: Authentication is implemented on the front end and is intended for demonstration purposes.


---


## Flight Explorer
Find the perfect flight with an intuitive flight search interface.
- Search & Filter
- Users can filter flights by:
Destination
Price
Departure time
Airline
  Sorting
Flights can be sorted by:
   Cheapest
  Fastest
   Earliest departure
  Flight Details
Each flight card can display:
Airline
Flight number
Departure
Arrival
Duration
Price
Flight status
  Flight Status
Users can check the current status of their selected flight.


---


## Booking System
AEROVA provides a multi-step booking experience designed to simulate a real airline booking flow.
Booking Flow
Flight Selection
      ↓
      
Passenger Information
      ↓
      
Seat Selection
      ↓
      
Extras & Confirmation
- Seat Selection
Interactive aircraft seat map with different seat states:

🟢 Available

🔵 Selected

🔴 Occupied

Users can visually select their preferred seat before completing their booking.


---


## Travel Extras
Passengers can customize their journey with additional services:
- Extra baggage
- Priority boarding
- Airport lounge access
Because apparently flying wasn’t complicated enough already. 


---

## Digital Boarding Pass
After booking, users can access a digital boarding pass.
Includes
- Passenger information
- Flight information
  - Seat number
- Booking reference
  - QR-style barcode
- Print-ready layout
  - Copy booking code
Your boarding pass is basically your “I have successfully spent money and now I’m going somewhere” certificate.


---


## Airport Guide
Navigate the airport without walking around like you’re looking for a hidden treasure.
Features
- Interactive terminal map
- Gate information
  - Restaurant search
- Shops & services
  - Service search
- Category filtering
  - Operating hours
- Airport tips


---


## Lost & Found
Lost something at the airport?
AEROVA provides a simple Lost & Found management interface.
 Report Lost Items
- Users can submit:
Item name
Category
Description
Location
Date
Contact information
 Search Found Items
Users can:
Search found items
Filter results
Check item details
 Status Tracking
- Items can have statuses such as:
   Reported
  
   ↓
  
 Searching
 
   ↓
   
 Found
 
LocalStorage

Lost & Found reports can be stored locally using the browser’s LocalStorage API.


---

 Lost & Found Report & search lost items lost-found.html


---


## Tech Stack
### Technology Purpose
- HTML5 Structure & semantic markup
 - CSS3 Styling, animations & themes
-Bootstrap 5 Responsive layout & UI components
- JavaScript ES6+ Logic & interactivity
- Font Awesome 6 Icons
  - Bootstrap Icons Additional icons
- Google Fonts Typography
  - AOS Scroll animations
- LocalStorage API Client-side data persistence
  - Canvas API Particle background
### Typography
- AEROVA uses a combination of:
Plus Jakarta Sans
Playfair Display
to create a modern combination of clean UI typography and premium travel branding.


---


## Quick Start
Option 1 — Clone the Repository
Open your terminal and run:
git clone https://github.com/your-username/aerova.git
Then enter the project directory:
cd aerova
Open index.html in your browser.


---


Option 2 — VS Code
For the best development experience:
Clone the repository
Open the project in VS Code
Install Live Server
Right-click index.html
Select Open with Live Server
And congratulations 
You are officially operating an airport from your browser.


---


## Project Goals
AEROVA was created to demonstrate practical front-end development skills, including:
Semantic HTML
Responsive CSS
Bootstrap components
JavaScript DOM manipulation
Form validation
Event handling
LocalStorage
Authentication logic
Interactive UI components
Multi-step forms
Dynamic filtering and sorting
Theme switching
UI animations


---


## JavaScript Concepts Used
The project makes use of modern JavaScript concepts such as:
Variables
Functions
Arrow Functions
Arrays
Objects
Array Methods
DOM Manipulation
Events
Form Validation
LocalStorage
Template Literals
Conditional Logic
Modules
Dynamic Rendering
Basically, enough JavaScript to make the browser question its life choices. 


---


## Responsive Design
AEROVA is designed to work across different screen sizes:
📱 Mobile

    ↓
📲 Tablet

    ↓
💻 Laptop

    ↓
🖥️ Desktop

The layout adapts using Bootstrap’s responsive grid system combined with custom CSS media queries.


---


## Future Improvements
AEROVA could be extended with:
 Real flight API integration
 Online payment integration
 Backend database
 JWT authentication
 Email booking confirmation
 PWA support
 Multi-language support
 Multi-currency support
 Real airport maps
 Live flight tracking
 Push notifications
 User dashboard
 Admin dashboard
Cloud-based data storage
Basically…
AEROVA 2.0 is waiting for us. 

---

## License
This project is created for educational and portfolio purposes.
Feel free to explore, modify, and improve it.


