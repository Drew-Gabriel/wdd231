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
