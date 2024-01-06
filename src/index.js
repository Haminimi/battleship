import './style.css';
import { Player } from './player';
import { Gameboard } from './gameboard';
import { Ship } from './ship';
import render, {
	showAttack,
	showComputerAttack,
	showNextDragShip,
} from './render';

const humanGridContainer = document.getElementById('human-grid-container');
const computerGridContainer = document.getElementById(
	'computer-grid-container'
);
let humanGrid = document.getElementById('human-grid');
let computerGrid = document.getElementById('computer-grid');
const modal = document.getElementById('modal');
const winner = document.getElementById('winner');
const replayButton = document.getElementById('replay-button');
const humanScore = document.getElementById('human-score');
const computerScore = document.getElementById('computer-score');
const ships = document.querySelectorAll('.ship');
const firstDragShip = document.getElementById('ship-1');
const secondDragShip = document.getElementById('ship-2');
const thirdDragShip = document.getElementById('ship-3');
const fourthDragShip = document.getElementById('ship-4');
const fifthDragShip = document.getElementById('ship-5');
const dragFirstShip = document.getElementById('drag-1');
const dragSecondShip = document.getElementById('drag-2');
const dragThirdShip = document.getElementById('drag-3');
const dragFourthShip = document.getElementById('drag-4');
const dragFifthShip = document.getElementById('drag-5');

function initialize() {
	const gameboard = new Gameboard();
	gameboard.initializeCoordinates();
	const firstShip = new Ship(1);
	const secondShip = new Ship(2);
	const thirdShip = new Ship(3);
	const fourthShip = new Ship(4);
	const fifthShip = new Ship(5);
	const humanPlayer = new Player('Human', gameboard);

	const computerGameboard = new Gameboard();
	computerGameboard.initializeCoordinates();
	const firstComputerShip = new Ship(1);
	const secondComputerShip = new Ship(2);
	const thirdComputerShip = new Ship(3);
	const fourthComputerShip = new Ship(4);
	const fifthComputerShip = new Ship(5);
	computerGameboard.placeComputerShips(
		firstComputerShip,
		secondComputerShip,
		thirdComputerShip,
		fourthComputerShip,
		fifthComputerShip
	);
	const computerPlayer = new Player('Computer', computerGameboard);

	humanGrid.parentNode.removeChild(humanGrid);
	humanGrid = document.createElement('div');
	humanGrid.setAttribute('id', 'human-grid');
	humanGrid.classList.add('grid');
	humanGridContainer.appendChild(humanGrid);

	computerGrid.parentNode.removeChild(computerGrid);
	computerGrid = document.createElement('div');
	computerGrid.setAttribute('id', 'computer-grid');
	computerGrid.classList.add('grid');
	computerGridContainer.appendChild(computerGrid);

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const gridCell = document.createElement('div');
			gridCell.classList.add('computer-grid-cell');
			gridCell.setAttribute('data-computer', `${i}, ${j}`);
			computerGrid.appendChild(gridCell);
		}
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			const gridCell = document.createElement('div');
			gridCell.classList.add('human-grid-cell');
			gridCell.setAttribute('data-human', `${i}, ${j}`);
			humanGrid.appendChild(gridCell);
		}
	}

	let computerCurrentScore = 0;
	let humanCurrentScore = 0;
	computerScore.textContent = `Computer: ${computerCurrentScore}`;
	humanScore.textContent = `Human: ${humanCurrentScore}`;

	function attack(event) {
		if (!event.target.classList.contains('clicked')) {
			event.target.classList.add('clicked');
			humanPlayer.humanMove(
				computerGameboard,
				event.target.getAttribute('data-computer')
			);

			showAttack(computerGameboard, computerGrid, event);

			if (computerGameboard.gameOver()) {
				winner.textContent = "You're a winner 🥳";
				humanScore.textContent = `Human: ${++humanCurrentScore}`;
				modal.showModal();
				modal.style.display = 'flex';
			} else {
				computerMove();
			}
		} else {
			return;
		}
	}

	//Drag functionality
	let draggedShip = null;

	ships.forEach((ship) => {
		ship.addEventListener('dragstart', handleDragStart);
	});
	humanGrid.addEventListener('dragover', handleDragOver);
	humanGrid.addEventListener('drop', handleDrop);

	function handleDragStart(event) {
		draggedShip = event.target;
		event.dataTransfer.setData(
			'text/plain',
			draggedShip.getAttribute('data-length')
		);
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDrop(event) {
		event.preventDefault();

		if (draggedShip) {
			const shipLength = draggedShip.getAttribute('data-length');
			const cell = document.elementFromPoint(
				event.clientX,
				event.clientY
			);
			const coordinate = cell.getAttribute('data-human');

			if (coordinate) {
				const [row, col] = coordinate.split(',').map(Number);
				const shipCoordinates = [];
				shipCoordinates.push(`${row}, ${col}`);
				if (draggedShip.classList.contains('horizontal')) {
					for (let i = 1; i < shipLength; i++) {
						shipCoordinates.push(`${row}, ${col + i}`);
					}
				} else {
					for (let i = 1; i < shipLength; i++) {
						shipCoordinates.push(`${row + i}, ${col}`);
					}
				}

				let ship = null;
				switch (shipLength) {
					case '1':
						ship = firstShip;
						break;
					case '2':
						ship = secondShip;
						break;
					case '3':
						ship = thirdShip;
						break;
					case '4':
						ship = fourthShip;
						break;
					case '5':
						ship = fifthShip;
						break;
				}

				if (
					shipCoordinates.every(
						(coordinate) =>
							gameboard.coordinates[coordinate] === true
					)
				) {
					gameboard.placeShip(ship, shipCoordinates);
					render(gameboard, humanGrid);
					showNextDragShip(
						draggedShip,
						shipLength,
						secondDragShip,
						thirdDragShip,
						fourthDragShip,
						fifthDragShip
					);

					if (shipLength === '5') {
						const computerGridCells = document.querySelectorAll(
							'.computer-grid-cell'
						);
						computerGridCells.forEach((cell) => {
							cell.style.cursor = 'pointer';
							cell.addEventListener('click', (event) => {
								attack(event);
							});
						});
					}

					draggedShip = null;
				}
			}
		}
	}

	function computerMove() {
		const move = computerPlayer.computerMove(gameboard);

		showComputerAttack(gameboard, humanGrid, move);

		if (gameboard.gameOver()) {
			winner.textContent = 'Computer is a winner 😭';
			computerScore.textContent = `Computer: ${++computerCurrentScore}`;
			modal.showModal();
			modal.style.display = 'flex';
		}
	}
}
