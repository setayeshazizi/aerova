
/* =========================================================
   AEROVA - LOST & FOUND
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. SELECT HTML ELEMENTS
   ========================================================= */

const lostItemForm = document.getElementById("lostItemForm");

const itemsContainer =
    document.getElementById("itemsContainer");

const searchInput =
    document.getElementById("searchInput");

const filterCategory =
    document.getElementById("filterCategory");


/* =========================================================
   2. ARRAY
   ========================================================= */

let lostItems =
    JSON.parse(
        localStorage.getItem("aerovaLostItems")
    ) || [];


/* =========================================================
   3. SAMPLE DATA
   ========================================================= */

if (lostItems.length === 0) {

    lostItems = [

        {
            id: Date.now() - 3000,

            name: "Black Backpack",

            category: "bags",

            location: "Gate A12",

            date: "2026-08-25",

            description:
                "Black backpack with a small blue tag.",

            contactName: "Alex",

            contact: "alex@example.com",

            status: "Searching"
        },


        {
            id: Date.now() - 2000,

            name: "Wireless Headphones",

            category: "electronics",

            location: "Airport Lounge",

            date: "2026-08-26",

            description:
                "White wireless headphones in a small case.",

            contactName: "Sarah",

            contact: "sarah@example.com",

            status: "Found"
        },


        {
            id: Date.now() - 1000,

            name: "Travel Wallet",

            category: "other",

            location: "Security Checkpoint",

            date: "2026-08-27",

            description:
                "Brown travel wallet containing several cards.",

            contactName: "Daniel",

            contact: "daniel@example.com",

            status: "Searching"
        }

    ];


    saveItems();
}


/* =========================================================
   4. LOCAL STORAGE - SAVE
   ========================================================= */

function saveItems() {

    localStorage.setItem(
        "aerovaLostItems",
        JSON.stringify(lostItems)
    );
}


/* =========================================================
   5. CATEGORY NAME
   ========================================================= */

function getCategoryName(category) {

    const categories = {

        electronics: "Electronics",

        bags: "Bags & Luggage",

        documents: "Documents",

        clothing: "Clothing",

        jewelry: "Jewelry",

        other: "Other"
    };


    return categories[category] || "Other";
}


/* =========================================================
   6. CATEGORY ICON
   ========================================================= */

function getCategoryIcon(category) {

    const icons = {

        electronics: "bi-phone",

        bags: "bi-backpack",

        documents: "bi-file-earmark-text",

        clothing: "bi-person-badge",

        jewelry: "bi-gem",

        other: "bi-box"
    };


    return icons[category] || "bi-box";
}


/* =========================================================
   7. DISPLAY ITEMS
   ========================================================= */

function displayItems(items = lostItems) {

    itemsContainer.innerHTML = "";


    /* No results */

    if (items.length === 0) {

        itemsContainer.innerHTML = `

            <div class="col-12">

                <div class="text-center py-5">

                    <i
                        class="bi bi-search"
                        style="
                            font-size: 3rem;
                            color: var(--text-muted);
                        "
                    ></i>


                    <h4 class="mt-3">
                        No items found
                    </h4>


                    <p
                        style="
                            color: var(--text-secondary);
                        "
                    >
                        Try another search or category.
                    </p>

                </div>

            </div>
        `;

        return;
    }


    /* forEach */

    items.forEach((item, index) => {

        const card =
            document.createElement("div");


        card.className =
            "col-md-6 col-lg-4";


        card.innerHTML = `

            <div class="item-card">

                <div class="item-icon">

                    <i class="
                        bi
                        ${getCategoryIcon(item.category)}
                    "></i>

                </div>


                <h4>
                    ${escapeHTML(item.name)}
                </h4>


                <p>

                    <i class="bi bi-grid"></i>

                    ${getCategoryName(item.category)}

                </p>


                <p>

                    <i class="bi bi-geo-alt"></i>

                    ${escapeHTML(item.location)}

                </p>


                <p>

                    <i class="bi bi-calendar3"></i>

                    ${formatDate(item.date)}

                </p>


                <p>

                    <i class="bi bi-person"></i>

                    ${escapeHTML(item.contactName)}

                </p>


                <p class="mt-3">

                    ${escapeHTML(item.description)}

                </p>


                <span class="item-status">

                    ${item.status}

                </span>


                <button
                    class="
                        btn
                        btn-sm
                        btn-outline-danger
                        mt-3
                    "
                    onclick="deleteItem(${item.id})"
                >

                    <i class="bi bi-trash"></i>

                    Delete

                </button>

            </div>
        `;


        itemsContainer.appendChild(card);


        /* Animation */

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";


        setTimeout(() => {

            card.style.transition =
                "all 0.5s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 100);

    });
}


/* =========================================================
   8. FORM SUBMIT
   ========================================================= */

lostItemForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* Get values */

        const itemName =
            document
                .getElementById("itemName")
                .value
                .trim();


        const category =
            document
                .getElementById("category")
                .value;


        const location =
            document
                .getElementById("location")
                .value
                .trim();


        const lostDate =
            document
                .getElementById("lostDate")
                .value;


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const contactName =
            document
                .getElementById("contactName")
                .value
                .trim();


        const contact =
            document
                .getElementById("contact")
                .value
                .trim();


        /* =================================================
           VALIDATION
           ================================================= */

        if (
            !itemName ||
            !category ||
            !location ||
            !lostDate ||
            !description ||
            !contactName ||
            !contact
        ) {

            showMessage(
                "Please complete all required fields.",
                "error"
            );

            return;
        }


        /* =================================================
           CREATE OBJECT
           ================================================= */

        const newItem = {

            id: Date.now(),

            name: itemName,

            category: category,

            location: location,

            date: lostDate,

            description: description,

            contactName: contactName,

            contact: contact,

            status: "Searching"
        };


        /* =================================================
           ADD OBJECT TO ARRAY
           ================================================= */

        lostItems.unshift(newItem);


        /* =================================================
           SAVE
           ================================================= */

        saveItems();


        /* =================================================
           DISPLAY
           ================================================= */

        displayItems(lostItems);


        /* =================================================
           UPDATE STATISTICS
           ================================================= */

        updateStats();


        /* =================================================
           RESET FORM
           ================================================= */

        lostItemForm.reset();


        /* =================================================
           SUCCESS MESSAGE
           ================================================= */

        showMessage(
            "Your lost item report has been submitted successfully!",
            "success"
        );


        /* =================================================
           SCROLL
           ================================================= */

        setTimeout(() => {

            document
                .getElementById("search-items")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 500);

    }
);


/* =========================================================
   9. SEARCH EVENT
   ========================================================= */

searchInput.addEventListener(
    "input",
    function() {

        filterItems();

    }
);


/* =========================================================
   10. CATEGORY FILTER EVENT
   ========================================================= */

filterCategory.addEventListener(
    "change",
    function() {

        filterItems();

    }
);


/* =========================================================
   11. FILTER ITEMS
   ========================================================= */

function filterItems() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        filterCategory.value;


    const filteredItems =
        lostItems.filter(function(item) {


            /* Search */

            const matchesSearch =

                item.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                item.description
                    .toLowerCase()
                    .includes(searchValue)

                ||

                item.location
                    .toLowerCase()
                    .includes(searchValue);


            /* Category */

            const matchesCategory =

                selectedCategory === "all"

                ||

                item.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayItems(filteredItems);
}


/* =========================================================
   12. DELETE ITEM
   ========================================================= */

function deleteItem(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this report?"
        );


    if (!confirmDelete) {

        return;
    }


    /* filter() removes selected item */

    lostItems =
        lostItems.filter(function(item) {

            return item.id !== id;

        });


    /* Save */

    saveItems();


    /* Display */

    displayItems(lostItems);


    /* Statistics */

    updateStats();


    /* Message */

    showMessage(
        "The report has been deleted.",
        "success"
    );
}


/* =========================================================
   13. UPDATE STATISTICS
   ========================================================= */

function updateStats() {

    const statNumbers =
        document.querySelectorAll(
            ".stat-card h3"
        );


    if (statNumbers.length < 3) {

        return;
    }


    /* Total */

    const totalItems =
        lostItems.length;


    /* Searching */

    const searchingItems =
        lostItems.filter(function(item) {

            return item.status === "Searching";

        }).length;


    /* Found */

    const foundItems =
        lostItems.filter(function(item) {

            return item.status === "Found";

        }).length;


    /* Update HTML */

    statNumbers[0].textContent =
        totalItems;


    statNumbers[1].textContent =
        foundItems;


    statNumbers[2].textContent =
        searchingItems;
}


/* =========================================================
   14. SHOW MESSAGE
   ========================================================= */

function showMessage(message, type) {

    const oldMessage =
        document.querySelector(
            ".custom-message"
        );


    if (oldMessage) {

        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");


    messageBox.className =
        "custom-message";


    const icon =

        type === "success"

            ? "bi-check-circle"

            : "bi-exclamation-circle";


    messageBox.innerHTML = `

        <div>

            <i class="bi ${icon}"></i>

            <span>
                ${escapeHTML(message)}
            </span>

        </div>


        <button
            type="button"
            aria-label="Close"
            onclick="
                this.parentElement.remove()
            "
        >

            <i class="bi bi-x"></i>

        </button>

    `;


    document.body.appendChild(
        messageBox
    );


    setTimeout(() => {

        if (messageBox) {

            messageBox.remove();
        }

    }, 4000);
}


/* =========================================================
   15. FORMAT DATE
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "Unknown date";
    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",

            month: "short",

            day: "numeric"
        }
    );
}


/* =========================================================
   16. ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent = value;


    return div.innerHTML;
}


/* =========================================================
   17. MESSAGE CSS
   ========================================================= */

const messageStyles =
    document.createElement("style");


messageStyles.textContent = `

    .custom-message {

        position: fixed;

        top: 25px;

        right: 25px;

        z-index: 9999;

        min-width: 320px;

        display: flex;

        align-items: center;

        justify-content: space-between;

        gap: 20px;

        padding: 16px 18px;

        border: 1px solid
            var(--border-color);

        border-radius: 14px;

        background: var(--bg-card);

        color: var(--text-primary);

        box-shadow: var(--shadow-lg);

        backdrop-filter: blur(15px);

        animation:
            messageIn 0.4s ease forwards;
    }


    .custom-message > div {

        display: flex;

        align-items: center;

        gap: 10px;
    }


    .custom-message i {

        color:
            var(--accent-primary);

        font-size: 1.25rem;
    }


    .custom-message button {

        border: none;

        background: transparent;

        color:
            var(--text-secondary);

        cursor: pointer;

        font-size: 1.1rem;
    }


    .custom-message button:hover {

        color:
            var(--text-primary);
    }


    @keyframes messageIn {

        from {

            opacity: 0;

            transform:
                translateX(40px);
        }


        to {

            opacity: 1;

            transform:
                translateX(0);
        }
    }


    @media (max-width: 500px) {

        .custom-message {

            left: 15px;

            right: 15px;

            min-width: auto;
        }
    }

`;


document.head.appendChild(
    messageStyles
);


/* =========================================================
   18. START APPLICATION
   ========================================================= */

displayItems();

updateStats();
