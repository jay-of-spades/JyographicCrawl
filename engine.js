// // Confirm the engine is running
// console.log('Jyotish Engine Initialized.');

// // Fetch the database of cards
// fetch('cards.json')
//   .then(response => response.json()) // Translate the JSON
//   .then(data => {
//     const gameBoard = document.getElementById('game-board'); // Find the table

//     // Loop through every card in your database and draw it on the screen
//     data.forEach(card => {
//       const cardElement = document.createElement('div');
//       cardElement.className = 'card';

//       // Inject the Jyotish data into the HTML structure
//       cardElement.innerHTML = `
//                 <div class="card-title">${card.name}</div>
//                 <img src="${card.image}" alt="${card.name}" class="card-image">
//                 <div class="card-planet">Ruling: ${card.rulingPlanet}</div>
//                 <div class="card-effect">${card.effect}</div>
//                 <div class="card-mana">Cost: ${card.manaCost} Prana</div>
//             `;

//       // Place the card on the board
//       gameBoard.appendChild(cardElement);
//     });
//   })
//   .catch(error => console.error('Error loading the cosmos:', error));

// Game State Variables (The Memory of the Engine)
let masterGrimoire = []; // The complete database of all 9 cards
let playerHand = []; // The cards the Prince currently holds in this battle
let rakshasaBoon = null; // The enemy's active card

// Fetch the database, BUT do not draw them immediately
fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    masterGrimoire = data;
    initializeBattle(); // Trigger the start sequence once data is loaded
  })
  .catch(error => console.error('Error loading the cosmos:', error));

// --- CORE GAME FUNCTIONS ---

function initializeBattle() {
  console.log('The Kali Yuga deepens. Battle begins.');

  // 1. The Prince only starts with 3 specific cards (IDs 1, 2, and 3)
  playerHand = masterGrimoire.filter(card => card.id <= 3);

  // 2. The Rakshasa starts with a Boon (We'll use Shukra's Sanjivani, ID 6)
  rakshasaBoon = masterGrimoire.find(card => card.id === 6);
  document.getElementById('enemy-active-card').innerText =
    `Active Boon: ${rakshasaBoon.name}`;

  // 3. Deal the cards to the board
  renderHand();
}

function renderHand() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the board completely

  // Only render the cards currently in the playerHand array
  playerHand.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    cardElement.innerHTML = `
            <div class="card-title">${card.name}</div>
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <div class="card-planet">Ruling: ${card.rulingPlanet}</div>
            <div class="card-effect">${card.effect}</div>
            <div class="card-mana">Cost: ${card.manaCost} Prana</div>
        `;

    // The Interactive Tripwire
    cardElement.addEventListener('click', () => {
      playCard(card, index);
    });

    gameBoard.appendChild(cardElement);
  });
}

function playCard(playedCard, cardIndex) {
  console.log(`The Prince casts: ${playedCard.name}`);
  alert(
    `You played ${playedCard.name}! It costs ${playedCard.manaCost} Prana.`,
  );

  // Remove the card from the Prince's hand array
  playerHand.splice(cardIndex, 1);

  // Re-render the board to show the card is gone
  renderHand();
}
