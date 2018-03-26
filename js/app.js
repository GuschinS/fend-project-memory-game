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
const mov = document.querySelector('.moves');
const star = document.querySelector('.stars');
//let open = document.querySelectorAll('.open');
let clicks = 0;
let moves = 0;
let match = 0;
let checkArrey = [];

/*
 *
 * Create card
 *
 */


function createCard() {
	const cards = shuffle(icons);
	for (var i = 0; i < cards.length; i++) {
		const li = '<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>';
		deck.insertAdjacentHTML('beforeend', li);
	};
	liCards = document.querySelectorAll('.card');
	clickCard();
};

/*
 *
 * Click card
 *
 */

function clickCard() {
	for (let i = 0; i < liCards.length; i++) {
		liCards[i].addEventListener('click', function (event) {
			event.preventDefault();
			let checkCard = event.target;
			if (checkCard.nodeName === 'LI' && checkCard.className !== 'card open show' && checkCard.className !== 'card match') {
				console.log(checkCard.className)
				if (clicks < 2) {
					checkCard.setAttribute('class', 'card open show');
					checkArrey.push(liCards[i].firstChild.className);
					console.log(liCards[i].firstChild.className);
					console.log(checkArrey);
					clicks += 1;
					console.log(clicks);

					//					comparison()
				}
				setTimeout(function () {
					comparison();
				}, 2000);
			}
		});
	}
}

/*
 *
 * Comparison
 *
 */

function comparison() {
	end();
	if (checkArrey.length == 2) {
		moves += 1;
		//		console.log(moves);
		mov.textContent = moves;
		stars();


		if (checkArrey[0] !== checkArrey[1]) {
			open = document.querySelectorAll('.open');
			for (let i = 0; i < open.length; i++) {
				open[i].classList.remove('open', 'show');
			}
			checkArrey = [];
			clicks = 0;
			console.log('no');
		} else {
			open = document.querySelectorAll('.open');
			for (let i = 0; i < open.length; i++) {
				open[i].setAttribute('class', 'card match');
			}
			checkArrey = [];
			clicks = 0;
			console.log('yes');
			match += 1;
			console.log(match);
		}
	}
}

/*
 *
 * Stars
 *
 */

function stars() {
	const starar = star.getElementsByTagName('*');
	for (i = 0; i < starar.length; i++) {
		//		console.log(starar);
		if (moves > 14) {
			starar[5].className = 'fa fa-star';
			if (moves > 19) {
				starar[3].className = 'fa fa-star';
				if (moves > 24) {
					starar[1].className = 'fa fa-star';
				}
			}
		}
	}

}

/*
 *
 * End
 *
 */

function end() {
	if (match === 8) {
		deck.innerHTML = "";
		checkArrey = [];
		clicks = 0;
		match = 0;
		setTimeout(function () {
			createCard();
		}, 2000);
	}
}

/*
 *
 * Restart
 *
 */

restart.addEventListener('click', function (event) {
	event.preventDefault();
	deck.innerHTML = "";
	checkArrey = [];
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
