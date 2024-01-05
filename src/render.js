export default function showOurShips(gameboard, grid) {
	const coordinates = Object.keys(gameboard.coordinates);
	coordinates.forEach((coordinate) => {
		if (gameboard.coordinates[coordinate] !== true) {
			const cell = grid.querySelector(`[data-human='${coordinate}']`);
			cell.style.backgroundColor = 'mediumseagreen';
		}
	});
}
