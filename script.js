// Please implement exercise logic here
// Global variables
// boardSize has to be an even number

// document.body.appendChild(output);

const boardSize = 4;
const board = [];
let firstCard = null;
let firstCardElement;
let deck;
let canClick = true;
let matchedCards = 0;
// create all the board elements that will go on the screen
// build message output board
const messageOutput = document.createElement('div');
messageOutput.classList.add('message');
document.body.appendChild(messageOutput);

// gameplay
const squareClick = (cardElement, column, row) => {
  console.log(cardElement);
  console.log('FIRST CARD DOM ELEMENT', firstCard);
  console.log('BOARD CLICKED CARD', board[row][column]);
  const clickedCard = board[row][column];
  if (canClick === false) {
    return;
  }
  // the user already clicked on this square
  if (cardElement.innerText !== '') {
    return;
  }
  if (firstCard === null) {
    console.log('first turn');
    firstCard = clickedCard;
    // turn this card over
    cardElement.innerText = `${firstCard.name}\n${firstCard.suit}`;

    // hold onto this for later when it may not match
    firstCardElement = cardElement;
  // second turn
  }
  else
  {
    console.log('second turn');
    cardElement.innerText = `${clickedCard.name}\n${clickedCard.suit}`;
    if (
      clickedCard.name === firstCard.name
      && clickedCard.suit === firstCard.suit
    ) {
      matchedCards += 2;
      if (matchedCards === boardSize * boardSize) {
        messageOutput.innerText = 'YOU WIN!';
        return;
      }

      messageOutput.innerText = '🎉🎉🎉';
      console.log('match');
      canClick = false;
      setTimeout(() => {
        messageOutput.innerText = '';
        canClick = true;
      }, 1000);

      // turn this card over
      cardElement.innerText = `${clickedCard.name}\n${clickedCard.suit}`;
      // check that all card elements have inner text
    } else {
      console.log('NOT a match');

      canClick = false;
      messageOutput.innerText = '❌❌❌';
      setTimeout(() => {
        firstCardElement.innerText = '';
        cardElement.innerText = '';
        messageOutput.innerText = '';
        canClick = true;
      }, 1000);
    }
    // reset the first card
    firstCard = null;
  }
};

// return the built board
const buildBoardElements = (board) => {
  // create the element that everything will go inside of
  const boardElement = document.createElement('div');

  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // use the board data structure we passed in to create the correct size board
  for (let i = 0; i < board.length; i += 1) {
    // make a var for just this row of cards
    const row = board[i];

    // make an element for this row of cards
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // make all the squares for this row
    for (let j = 0; j < row.length; j += 1) {
      // create the square element
      const square = document.createElement('div');

      // set a class for CSS purposes
      square.classList.add('square');

      // set the click event
      // eslint-disable-next-line
      square.addEventListener('click', (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        squareClick(event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }

  return boardElement;
};

// game initialisation
const initGame = () => {
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  const doubleDeck = makeDeck();
  const deckSubset = doubleDeck.slice(0, boardSize * boardSize);
  deck = shuffleCards(deckSubset);

  // deal the cards out to the board data structure
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push(deck.pop());
    }
  }

  const boardEl = buildBoardElements(board);
  document.body.appendChild(boardEl);
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// Make deck
// const makeDeck = (cardAmount)
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['♥', '♦', '♣', '♠'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card); // add double the cards to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

let milliseconds = 3 * 60 * 1000;

// console.log(totalSeconds);
// console.log(minutes);
// console.log(seconds);

const delayInMilliseconds = 1000;
const output = document.createElement('div');
output.id = 'timer';
output.innerText = 'You have 3 minutes. Let\'s go!';
document.body.appendChild(output);

const ref = setInterval(() => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds - minutes * 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  output.innerText = `${minutes}:${seconds} `;
  console.log(milliseconds);

  if (milliseconds <= 0) {
    clearInterval(ref);
    messageOutput.innerText = 'GAME OVER! Resetting...';
    canClick = false;
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    return;
  }

  milliseconds -= 1000;
}, delayInMilliseconds);
window.addEventListener('load', initGame);
// crossOriginIsolated.log(cardAmount)
