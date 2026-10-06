document.addEventListener("DOMContentLoaded", () => {
    loadGames();

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});


async function loadGames() {
    try {
        const response = await fetch("/api/games");

        if (!response.ok) {
            throw new Error("Failed to load games");
        }

        const games = await response.json();

        displayGames(games);

    } catch (error) {
        console.error("Error loading games:", error);
    }
}


function displayGames(games) {
    const gamesContainer = document.querySelector(".games-grid");

    if (!gamesContainer) {
        console.error("Games container not found");
        return;
    }

    gamesContainer.innerHTML = "";

    games.forEach(game => {
        const gameCard = document.createElement("div");

        gameCard.className = "game-card";

        gameCard.innerHTML = `
            <div class="game-image">
                ${
                    game.image_url
                    ? `<img src="${game.image_url}" alt="${game.name}">`
                    : ""
                }
            </div>

            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.description || "No description available."}</p>

                <div class="game-meta">
                    <span>${game.genre || "Game"}</span>
                    <span>${game.platforms || "PC"}</span>
                </div>
            </div>
        `;

        gamesContainer.appendChild(gameCard);
    });
}
