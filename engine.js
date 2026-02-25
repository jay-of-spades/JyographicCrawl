// Confirm the engine is running
console.log('Jyotish Engine Initialized.');

// Fetch the database of cards
fetch('cards.json')
  .then(response => response.json()) // Translate the JSON
  .then(data => {
    const gameBoard = document.getElementById('game-board'); // Find the table

    // Loop through every card in your database and draw it on the screen
    data.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';

      // Inject the Jyotish data into the HTML structure
      cardElement.innerHTML = `
                <div class="card-title">${card.name}</div>
                <img src="${card.image}" alt="${card.name}" class="card-image">
                <div class="card-planet">Ruling: ${card.rulingPlanet}</div>
                <div class="card-effect">${card.effect}</div>
                <div class="card-mana">Cost: ${card.manaCost} Prana</div>
            `;

      // Place the card on the board
      gameBoard.appendChild(cardElement);
    });
  })
  .catch(error => console.error('Error loading the cosmos:', error));
