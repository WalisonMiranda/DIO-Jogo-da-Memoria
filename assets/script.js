const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
    gameOver();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCard();
        return;
    }

    unflipCards();
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function gameOver() {
    let cardsLeft = 12;

    for(let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains('flip')) {
            cardsLeft--;
        }
    }

    setTimeout(() => {
        if (cardsLeft === 0) {
            alert('You win!');
        }
    }, 1000);
}

cards.forEach(card => card.addEventListener('click', flipCard));
