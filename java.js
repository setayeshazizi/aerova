
const flights = [
  {
    airline: "Swiss Air",
    code: "LX 8001",
    from: "Paris (PAR)",
    to: "Zurich (ZRH)",
    depart: "08:45 AM",
    arrive: "10:00 AM",
    duration: "1h 15m",
    price: 185
  },

  {
    airline: "Air France",
    code: "AF 1208",
    from: "Paris (PAR)",
    to: "Zurich (ZRH)",
    depart: "12:30 PM",
    arrive: "01:50 PM",
    duration: "1h 20m",
    price: 210
  },

  {
    airline: "EasyJet",
    code: "EJ 4412",
    from: "Paris (PAR)",
    to: "Zurich (ZRH)",
    depart: "04:15 PM",
    arrive: "05:40 PM",
    duration: "1h 25m",
    price: 95
  },

  {
    airline: "Lufthansa",
    code: "LH 650",
    from: "Paris (PAR)",
    to: "Zurich (ZRH)",
    depart: "06:10 PM",
    arrive: "07:30 PM",
    duration: "1h 20m",
    price: 165
  }
];

const flightList = document.getElementById("flightList");

function displayFlights(data){

    flightList.innerHTML = "";

    data.forEach((flight,index)=>{

        flightList.innerHTML += `
        <div class="flight-card">

            <div class="row align-items-center">

                <div class="col-md-4">

                    <p class="code">WED, MAR 24</p>

                    <h5 class="airline">${flight.airline}</h5>

                    <p class="code">${flight.code}</p>

                </div>

                <div class="col-md-4 text-center">

                    <div class="time">
                        ${flight.depart}
                    </div>

                    <div class="duration">
                        ✈ ${flight.duration}
                    </div>

                    <div class="time">
                        ${flight.arrive}
                    </div>

                </div>

                <div class="col-md-2 text-center">

                    <div class="price">
                        $${flight.price}
                    </div>

                </div>

                <div class="col-md-2 text-end">

                    <button
                    class="select-btn"
                    onclick="selectFlight(${index})">

                    Select

                    </button>

                </div>

            </div>

        </div>
        `;

    });

}
displayFlights(flights);

// ===============================
// SELECT FLIGHT
// ===============================

function selectFlight(index){

    const buttons = document.querySelectorAll(".select-btn");

    buttons.forEach(btn=>{

        btn.innerHTML="Select";

        btn.style.background="#111827";

    });

    buttons[index].innerHTML="Selected ✓";

    buttons[index].style.background="#5BA8FF";

    alert(`You selected ${flights[index].airline}`);

}
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab=>{

    tab.addEventListener("click",()=>{

        tabs.forEach(item=>{

            item.classList.remove("active");

        });

        tab.classList.add("active");

    });

});


const aiBtn = document.querySelector(".ai");
const manualBtn = document.querySelector(".manual");

aiBtn.addEventListener("click",()=>{

    aiBtn.classList.add("active");
    manualBtn.classList.remove("active");

});

manualBtn.addEventListener("click",()=>{

    manualBtn.classList.add("active");
    aiBtn.classList.remove("active");

});
const dateText = document.querySelector(".date");

function updateClock(){

    const now = new Date();

    const time = now.toLocaleTimeString();

    dateText.innerHTML =
    `Monday, 12 March 2026 • ${time}`;

}

setInterval(updateClock,1000);

