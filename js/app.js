/*
 * Create a list that holds all of your cards
 */
const icons = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
let clicks = 0;



function createCard() {
	const cards = shuffle(icons);
	for (var i = 0; i < cards.length; i++) {
		const li = '<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>';
		deck.insertAdjacentHTML('beforeend', li);
		//		console.log(li);
	};
};

/*
 * Click card
 */

deck.addEventListener('click', function (event) {
	event.preventDefault();
	let checkCard = event.target;
	if (checkCard.nodeName === 'LI') {
		if (clicks < 2) {
			checkCard.setAttribute('class', 'card open show');
			if (clicks < 1) {
				const card1 = checkCard.firstChild.className;
				console.log(card1);
			} else {
				(clicks < 2)
				const card2 = checkCard.firstChild.className;
				console.log(card2);
				//				if (card1 == card2) {
				//					console.log('+');
				//					let li = document.querySelectorAll('.card');
				//					li.setAttribute('class', 'card match')
				//				} else {
				//					console.log('-')
				//					let li = document.querySelectorAll('.card');
				//					li.setAttribute('class', 'card')
			}

			clicks += 1;
			console.log(clicks);
		}
	}
});

/*
 * Check
 */


/*
 * Restart
 */

restart.addEventListener('click', function (event) {
	event.preventDefault();
	deck.innerHTML = "";
	clicks = 0;
	createCard();
})

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};


createCard();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
