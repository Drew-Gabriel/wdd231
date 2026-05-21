console.log("home.js is working");

// ==========================
// FOOTER YEAR
// ==========================
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ==========================
// LAST MODIFIED
// ==========================
const lastModified = document.getElementById("lastModified");
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// ==========================
// WEATHER (MOCK)
// ==========================
const weatherContainer = document.getElementById("weather");

if (weatherContainer) {
  weatherContainer.innerHTML = `
    <p><strong>30°C</strong></p>
    <p>Partly Cloudy</p>
    <p>High: 33°C</p>
    <p>Low: 24°C</p>
    <p>Humidity: 60%</p>
  `;
}

// ==========================
// MEMBER SPOTLIGHTS (SAFE VERSION)
// ==========================
const spotlightContainer = document.getElementById("spotlights");

async function loadSpotlights() {
  if (!spotlightContainer) return;

  try {
    const response = await fetch("data/members.json");

    const members = await response.json();

    // ONLY gold/silver
    const eligible = members.filter(m =>
      m.membership &&
      (m.membership.toLowerCase() === "gold" ||
       m.membership.toLowerCase() === "silver")
    );

    eligible.sort(() => Math.random() - 0.5);

    const selected = eligible.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("member");

      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.image}" alt="${member.name}">
        <p>${member.phone}</p>
        <p><strong>${member.membership}</strong></p>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Spotlight error:", err);
    spotlightContainer.innerHTML = "<p>Spotlights unavailable</p>";
  }
}

loadSpotlights();
