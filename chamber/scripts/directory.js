console.log("directory.js is working");

const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const modeBtn = document.querySelector("#modeBtn");

// Load members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("members.json not found");
    }

    const members = await response.json();

    displayMembers(members);

  } catch(error) {
    console.error(error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <p>${member.website}</p>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;

    membersContainer.appendChild(card);
  });
}

getMembers();

// Grid/List buttons
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

// Dark mode
if (modeBtn) {
  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// Footer
document.getElementById("currentyear").textContent =
new Date().getFullYear();

const modified = document.getElementById("lastModified");
if(modified){
modified.textContent =
`Last Modified: ${document.lastModified}`;
}
