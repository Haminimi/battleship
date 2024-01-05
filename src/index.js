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
}
