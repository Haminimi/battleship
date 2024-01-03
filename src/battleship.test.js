/* eslint-disable */

import { sum } from './index';
import { Ship } from './ship';

test('sum', () => {
	expect(sum(1, 2)).toBe(3);
});

test('Ship', () => {
	const ship = new Ship(5);
	expect(ship.length).toBe(5);
	expect(ship.numberOfHits).toBe(0);
	ship.hit();
	expect(ship.numberOfHits).toBe(1);
	expect(ship.isSunk()).toBe(false);
	ship.hit();
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.isSunk()).toBe(true);
});
