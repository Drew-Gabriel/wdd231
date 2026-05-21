console.log("directory.js is working");

const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const modeBtn = document.querySelector("#modeBtn");

// Load members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    membersContainer.innerHTML = "";

    members.forEach(member => {
      const card = document.createElement("div");

      card.classList.add("member");

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>${member.website}</p>
        <p><strong>Membership:</strong> ${member.membership}</p>
      `;

      membersContainer.appendChild(card);
    });

  } catch(error) {
    console.log(error);
  }
}

getMembers();

// Grid view
if (gridBtn) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });
}

// List view
if (listBtn) {
  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
}

// Dark mode
if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// Footer
document.querySelector("#currentyear").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;
