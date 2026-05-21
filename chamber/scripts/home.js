console.log("home.js working");

fetch("data/members.json")
  .then(res => res.json())
  .then(data => {
    const spot = document.querySelector("#spotlights");

    if (!spot) return;

    const filtered = data.filter(m =>
      m.membership.toLowerCase() === "gold" ||
      m.membership.toLowerCase() === "silver"
    );

    filtered.sort(() => Math.random() - 0.5);

    const selected = filtered.slice(0, 3);

    spot.innerHTML = "";

    selected.forEach(m => {
      const div = document.createElement("div");
      div.classList.add("member");

      div.innerHTML = `
        <h3>${m.name}</h3>
        <img src="${m.image}" alt="${m.name}">
        <p>${m.phone}</p>
        <p><strong>${m.membership}</strong></p>
      `;

      spot.appendChild(div);
    });
  });
// ==========================
// WEATHER API
// ==========================

const weatherContainer = document.querySelector("#weather");

async function loadWeather() {
  try {

    // Benin City coordinates
    const url =
    "https://api.open-meteo.com/v1/forecast?latitude=6.34&longitude=5.62&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3";

    const response = await fetch(url);
    const data = await response.json();

    weatherContainer.innerHTML = `
      <p><strong>${data.current.temperature_2m}°C</strong></p>

      <h4>3 Day Forecast</h4>

      <p>Day 1:
      ${data.daily.temperature_2m_max[0]}° /
      ${data.daily.temperature_2m_min[0]}°</p>

      <p>Day 2:
      ${data.daily.temperature_2m_max[1]}° /
      ${data.daily.temperature_2m_min[1]}°</p>

      <p>Day 3:
      ${data.daily.temperature_2m_max[2]}° /
      ${data.daily.temperature_2m_min[2]}°</p>
    `;

  } catch(error) {
    weatherContainer.innerHTML =
    "<p>Weather unavailable</p>";

    console.log(error);
  }
}

loadWeather();
