export default function showOurShips(gameboard, grid) {
	const coordinates = Object.keys(gameboard.coordinates);
	coordinates.forEach((coordinate) => {
		if (gameboard.coordinates[coordinate] !== true) {
			const cell = grid.querySelector(`[data-human='${coordinate}']`);
			cell.style.backgroundColor = 'mediumseagreen';
		}
	});
}

export function showAttack(computerGameboard, computerGrid, event) {
	event.target.textContent = 'X';
	if (
		computerGameboard.coordinates[
			event.target.getAttribute('data-computer')
		] === true
	) {
		event.target.style.backgroundColor = 'cornflowerblue';
	} else {
		event.target.style.backgroundColor = '#FFA351';
	}

	const keys = Object.keys(computerGameboard.coordinates);
	for (const key of keys) {
		if (computerGameboard.coordinates[key].sunk === true) {
			const cell = computerGrid.querySelector(`[data-computer='${key}']`);
			cell.style.backgroundColor = '#F96167';
			cell.style.color = 'white';
		}
	}
}

export function showComputerAttack(gameboard, humanGrid, move) {
	const cell = humanGrid.querySelector(`[data-human='${move}']`);
	cell.textContent = 'X';
	if (gameboard.coordinates[cell.getAttribute('data-human')] === true) {
		cell.style.backgroundColor = 'cornflowerblue';
	} else {
		cell.style.backgroundColor = '#FFA351';
	}

	const keys = Object.keys(gameboard.coordinates);
	for (const key of keys) {
		if (gameboard.coordinates[key].sunk === true) {
			const cell = humanGrid.querySelector(`[data-human='${key}']`);
			cell.style.backgroundColor = '#F96167';
			cell.style.color = 'white';
		}
	}
}
