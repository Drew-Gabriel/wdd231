console.log("directory.js is working");

const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const modeBtn = document.querySelector("#modeBtn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (err) {
    console.error("Error loading members:", err);
  }
}

function displayMembers(members) {
  if (!membersContainer) return;

  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <p>${member.website}</p>
      <p><strong>${member.membership}</strong></p>
    `;

    membersContainer.appendChild(card);
  });
}

getMembers();

// GRID / LIST
if (gridBtn && listBtn) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
}

// DARK MODE
if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    console.log("CLICKED:",
  });
}

// FOOTER SAFETY
const year = document.getElementById("currentyear");
if (year) year.textContent = new Date().getFullYear();

const modified = document.getElementById("lastModified");
if (modified) {
  modified.textContent = `Last Modified: ${document.lastModified}`;
}
