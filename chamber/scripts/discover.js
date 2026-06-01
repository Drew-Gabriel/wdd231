import { places } from "../data/discover.mjs";

const container = document.querySelector("#places");

places.forEach(place => {

const card = document.createElement("section");
card.classList.add("card");

card.innerHTML = `
<h2>${place.name}</h2>

<figure>
<img src="${place.image}"
alt="${place.name}"
loading="lazy"
width="300"
height="200">
</figure>

<address>${place.address}</address>

<p>${place.description}</p>

<button>Learn More</button>
`;

container.appendChild(card);

});

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {

visitMessage.textContent =
"Welcome! Let us know if you have any questions.";

} else {

const days = Math.floor(
(now - Number(lastVisit)) / 86400000
);

if (days < 1) {

visitMessage.textContent =
"Back so soon! Awesome!";

} else if (days === 1) {

visitMessage.textContent =
"You last visited 1 day ago.";

} else {

visitMessage.textContent =
`You last visited ${days} days ago.`;

}
}

localStorage.setItem("lastVisit", now);
document.getElementById("currentyear").textContent = new Date().getFullYear();
