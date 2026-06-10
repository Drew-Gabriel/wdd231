const container = document.querySelector("#recipeContainer");
let recipesData = [];

// FETCH DATA
async function loadRecipes() {
  try {
    const res = await fetch("./data/recipes.json");
    recipesData = await res.json();
    displayRecipes(recipesData);
  } catch (err) {
    console.error(err);
  }
}

loadRecipes();

// DISPLAY ITEMS
function displayRecipes(data) {
  container.innerHTML = "";

  data.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${recipe.image}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p>${recipe.region}</p>
      <p>${recipe.time}</p>
      <p>${recipe.difficulty}</p>
      <button onclick="openModal(${recipe.id})">View</button>
    `;

    container.appendChild(card);
  });
}

// FIXED MODAL (IMPORTANT)
window.openModal = function (id) {
  const recipe = recipesData.find(r => r.id === id);
  if (!recipe) return;

  const old = document.querySelector(".modal");
  if (old) old.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>${recipe.name}</h2>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Region:</strong> ${recipe.region}</p>
      <p><strong>Time:</strong> ${recipe.time}</p>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
    </div>
  `;

  document.body.appendChild(modal);
};

// MENU
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("#navLinks").classList.toggle("show");
  });
});
