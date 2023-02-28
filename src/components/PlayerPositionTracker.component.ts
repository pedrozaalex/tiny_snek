import { Component } from '@asimov-ts/core'

type Position2D = { x: number; y: number }

export class PlayerPositionTrackerComponent extends Component<Position2D[]> {
	constructor(pos: Position2D[] = []) {
		super(pos)
	}
}
