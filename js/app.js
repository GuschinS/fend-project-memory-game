/*
 *
 * Create a list that holds all of your cards
 *
 */

const icons = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const mov = document.querySelector('#moves');
const movend = document.querySelector('.moves');
const star = document.querySelector('#stars');
const starend = document.querySelector('.stars');
const cancel = document.querySelector('.cancel');
const rest = document.querySelector('#reset');
const endGame = document.querySelector('#end');
const time = document.querySelector('#time');
const timeend = document.querySelector('.time');
let clicks = 0;
let moves = 0;
let match = 0;
let starnum = 3;
let seconds = 0;
let checkArrey = [];

/*
 *
 * Create card
 *
 */


function createCard() {
	updateTime();
	const cards = shuffle(icons);
	for (var i = 0; i < cards.length; i++) {
		const li = `<li class = "card"><i class = "fa fa-${cards[i]}"></i></li>`;
		deck.insertAdjacentHTML('beforeend', li);
	}
	liCards = document.querySelectorAll('.card');
	clickCard();
}

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
			if (checkCard.nodeName === 'LI' && checkCard.className !== 'card open show' && checkCard.className !== 'card match' && checkCard.className !== 'card red') {
				if (clicks < 2) {
					checkCard.setAttribute('class', 'card open show');
					checkArrey.push(liCards[i].firstChild.className);
					console.log(liCards[i].firstChild.className);
					console.log(checkArrey);
					clicks += 1;
					console.log(clicks);
				}
				setTimeout(function () {
					comparison();
				}, 1000);
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
		checkStart();
		moves += 1;
		mov.textContent = moves;
		stars();
		if (checkArrey[0] !== checkArrey[1]) {
			open = document.querySelectorAll('.open');
			for (let i = 0; i < open.length; i++) {
				open[i].setAttribute('class', 'card red');
				setTimeout(function () {
					open[i].setAttribute('class', 'card');
				}, 200);
			}
			checkArrey = [];
			clicks = 0;
			console.log('no');
		} else {
			open = document.querySelectorAll('.open');
			for (let i = 0; i < open.length; i++) {
				open[i].setAttribute('class', 'card white');
				setTimeout(function () {
					open[i].setAttribute('class', 'card match');
				}, 200);
			}
			checkArrey = [];
			clicks = 0;
			console.log('yes');
			match += 1;
		}
	}
}

/*
 *
 * Stars
 *
 */

function stars() {
	const starar = star.getElementsByTagName('i');
	for (i = 0; i < starar.length; i++) {
		if (moves > 14 && moves <= 19) {
			starar[2].className = 'fa fa-star-o';
			starnum = 2;
		} else if (moves > 19) {
			starar[1].className = 'fa fa-star-o';
			starnum = 1;
//		} else if (moves > 24) {
//			starar[0].className = 'fa fa-star-o';
//			starnum = 0;
		} else {
			starar[0].className = 'fa fa-star';
			starar[1].className = 'fa fa-star';
			starar[2].className = 'fa fa-star';
			starnum = 3;
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
		endGame.removeAttribute('style');
		movend.textContent = moves + ' Moves';
		starend.textContent = starnum + ' Stars';
		timeend.textContent = `Your Time ${time.textContent}`;
		checkArrey = [];
		clicks = 0;
		match = 0;
		moves = 0;
		seconds = 0;
		stars();
		mov.textContent = moves;
		endTimer();
		createCard();
	}
}

/*
 *
 * Restart
 *
 */

restart.addEventListener('click', function (event) {
	event.preventDefault();
	rest.removeAttribute('style');
	deck.innerHTML = "";
	checkArrey = [];
	clicks = 0;
	match = 0;
	moves = 0;
	seconds = 0;
	stars();
	mov.textContent = moves;
	endTimer();
	createCard();
});


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
}


createCard();

/*
 *
 * Timer
 *
 */

let timer;

function checkStart() {
	if (moves === 0) {
		timer = setTimeout(counter, 1000);
	}
}

function endTimer() {
	clearTimeout(timer);
}


function counter() {
	seconds++;
	updateTime();


	timer = setTimeout(counter, 1000);
}


function updateTime() {
	time.textContent = elapsedTime();
}


function elapsedTime() {
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	return ((min < 10) ? "0" + min : min) + ":" + ((sec < 10) ? "0" + sec : sec);
}


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
