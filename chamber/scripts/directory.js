console.log("directory.js is working");
const membersContainer = document.querySelector('#members');

const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

const modeBtn = document.querySelector('#modeBtn');

async function getMembers() {

  const response = await fetch('data/members.json');

  const data = await response.json();

  displayMembers(data);
}

function displayMembers(members) {

  members.forEach(member => {

  const card = document.createElement("div");
  card.classList.add("member");

  card.innerHTML = `
    <img src="${member.image}" alt="${member.name}">
    <h3>${member.name}</h3>
    <p>${member.phone}</p>
    <p>${member.website}</p>
    <p><strong>Membership:</strong> ${member.membership}</p>
  `;

  container.appendChild(card);
});

}

getMembers();

gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

document.querySelector('#currentyear').textContent =
  new Date().getFullYear();

document.querySelector('#lastModified').textContent =
  `Last Modified: ${document.lastModified}`;
