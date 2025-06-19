const images = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6'];
let shuffled = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

const gameBoard = document.getElementById('gameBoard');
const scoreSpan = document.getElementById('score');
const resetBtn = document.getElementById('resetBtn');

const startScreen = document.getElementById('startScreen');
const winScreen = document.getElementById('winScreen');
const gameContainer = document.getElementById('gameContainer');
const startBtn = document.getElementById('startBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

function shuffleCards() {
  shuffled = [...images].sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = '';
  shuffleCards();
  shuffled.forEach((imgName, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgName;
    card.dataset.index = index;


    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');


    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const frontImg = document.createElement('img');
    frontImg.src = './imgs-jogo/verso.png';
    frontImg.alt = 'Verso da carta';
    cardFront.appendChild(frontImg);


    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const backImg = document.createElement('img');
    backImg.src = `./imgs-jogo/${imgName}.png`;
    backImg.alt = `Imagem do par ${imgName}`;
    cardBack.appendChild(backImg);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  score = 0;
  scoreSpan.innerText = score;
  resetSelection();
  lockBoard = false;
}

function flipCard() {
  if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    score++;
    scoreSpan.innerText = score;
    resetSelection();

    if (score === images.length / 2) {

      setTimeout(() => {
        gameContainer.classList.add('hidden');
        winScreen.classList.remove('hidden');
        resetBtn.classList.add('hidden');
      }, 600);
    } else {
      lockBoard = false;
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetSelection();
      lockBoard = false;
    }, 1000);
  }
}

function resetSelection() {
  [firstCard, secondCard] = [null, null];
}

resetBtn.addEventListener('click', () => {
  createBoard();
});

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
  createBoard();
});

playAgainBtn.addEventListener('click', () => {
  winScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
  createBoard();
});

