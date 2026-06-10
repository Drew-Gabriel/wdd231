// ========== LOAD DATA (FETCH API) ==========
const container = document.querySelector("#recipeContainer");

let recipesData = [];

// Fetch JSON data
async function loadRecipes() {
  try {
    const response = await fetch("./data/recipes.json");

    if (!response.ok) {
      throw new Error("Failed to load recipes");
    }

    recipesData = await response.json();

    displayRecipes(recipesData);

  } catch (error) {
    console.error("Error loading data:", error);
  }
}

loadRecipes();


// ========== DISPLAY 15 ITEMS ==========
function displayRecipes(data) {
  container.innerHTML = "";

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p><strong>Region:</strong> ${recipe.region}</p>
      <p><strong>Time:</strong> ${recipe.time}</p>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>

      <button onclick="openModal(${recipe.id})">View Details</button>
    `;

    container.appendChild(card);
  });
}


// ========== MODAL ==========
function openModal(id) {
  const recipe = recipesData.find(r => r.id === id);

  if (!recipe) return;

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span id="closeBtn">&times;</span>
      <h2>${recipe.name}</h2>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Region:</strong> ${recipe.region}</p>
      <p><strong>Time:</strong> ${recipe.time}</p>
    </div>
  `;

  document.body.appendChild(modal);

  document.querySelector("#closeBtn").onclick = () => {
    modal.remove();
  };
}


// ========== HAMBURGER MENU ==========
const menuBtn = document.querySelector("#menu");
const navLinks = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


// ========== LOCAL STORAGE EXAMPLE ==========
function saveFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(id)) {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
