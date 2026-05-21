// ==========================
// FOOTER YEAR
// ==========================
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


// ==========================
// WEATHER (MOCK DATA - SAFE FOR SCHOOL PROJECT)
// ==========================
const weatherContainer = document.getElementById("weather");

function loadWeather() {
  if (!weatherContainer) return;

  // You can replace this later with real API (OpenWeatherMap)
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
// MEMBER SPOTLIGHTS
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

    // Filter Gold + Silver members only
    const eligibleMembers = members.filter(member =>
      member.membership === "Gold" || member.membership === "Silver"
    );

    // Shuffle array
    eligibleMembers.sort(() => Math.random() - 0.5);

    // Pick 3 members
    const selected = eligibleMembers.slice(0, 3);

    // Display
    spotlightContainer.innerHTML = selected.map(member => `
      <div class="card spotlight">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><strong>${member.membership} Member</strong></p>
      </div>
    `).join("");

  } catch (error) {
    spotlightContainer.innerHTML = "<p>Spotlights unavailable</p>";
    console.error(error);
  }
}

loadSpotlights();
