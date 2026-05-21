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
// WEATHER (MOCK DATA)
// ==========================
const weatherContainer = document.getElementById("weather");

function loadWeather() {
  if (!weatherContainer) return;

  const weather = {
    temp: 30,
    condition: "Partly Cloudy",
    high: 33,
    low: 24,
    humidity: 60
  };

  weatherContainer.innerHTML = `
    <p><strong>${weather.temp}°C</strong></p>
    <p>${weather.condition}</p>
    <p>High: ${weather.high}°</p>
    <p>Low: ${weather.low}°</p>
    <p>Humidity: ${weather.humidity}%</p>
  `;
}

loadWeather();

// ==========================
// MEMBER SPOTLIGHTS (FIXED)
// ==========================
const spotlightContainer = document.getElementById("spotlights");

async function loadSpotlights() {
  if (!spotlightContainer) return;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Failed to load members.json");
    }

    const members = await response.json();

    // filter GOLD & SILVER (case-safe)
    const eligibleMembers = members.filter(member => {
      return member.membership.toLowerCase() === "gold" ||
             member.membership.toLowerCase() === "silver";
    });

    // shuffle
    eligibleMembers.sort(() => Math.random() - 0.5);

    // pick 2–3
    const selected = eligibleMembers.slice(0, 3);

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

  } catch (error) {
    console.error("Spotlight error:", error);
    spotlightContainer.innerHTML = "<p>Spotlights unavailable</p>";
  }
}

loadSpotlights();
