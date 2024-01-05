export class Gameboard {
	constructor() {
		this.coordinates = {};
		this.missed = [];
		this.ships = [];
	}

	initializeCoordinates() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this.coordinates[`${i}, ${j}`] = true;
			}
		}
	}

	placeShip(ship, coordinates) {
		const shipLength = ship.length;
		if (shipLength === coordinates.length) {
			this.ships.push(ship);
			coordinates.forEach((coordinate) => {
				this.coordinates[coordinate] = ship;
			});
		}
	}

	receiveAttack(coordinates) {
		if (this.missed.includes(coordinates)) {
			return;
		} else {
			if (this.coordinates[coordinates] !== true) {
				const ship = this.coordinates[coordinates];
				ship.hit();
			} else {
				this.missed.push(coordinates);
			}
		}
	}

	gameOver() {
		return this.ships.every((ship) => ship.sunk === true);
	}
}
