console.log("directory.js is working");

// ==========================
// ELEMENTS (SAFE CHECKS)
// ==========================
const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

// ==========================
// LOAD MEMBERS
// ==========================
async function getMembers() {
  try {
    const response = await fetch("../data/members.json"); // FIXED PATH

    if (!response.ok) throw new Error("Failed to load JSON");

    const members = await response.json();

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

  } catch (err) {
    console.error("Error loading members:", err);
  }
}

getMembers();

// ==========================
// GRID / LIST
// ==========================
if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
}

// ==========================
// FOOTER
// ==========================
const year = document.getElementById("currentyear");
if (year) year.textContent = new Date().getFullYear();

const modified = document.getElementById("lastModified");
if (modified) {
  modified.textContent = `Last Modified: ${document.lastModified}`;
}
