import { EventListener } from '@asimov-ts/common'
import { Component, Entity, IBuildable, IComponentValue } from '@asimov-ts/core'
import * as KeyCode from 'keycode-js'
import {
	GameStateComponent,
	InputListener,
	PointsComponent,
} from '../components'
import { GameState } from '../constants'

export class StateTracker extends Entity implements IBuildable {
	getInitialComponents(): Component<IComponentValue>[] {
		return [
			new PointsComponent(0),
			new GameStateComponent(GameState.Running),
			new EventListener({
				OnPlayerAteFood: () => {
					this.setComponent(PointsComponent, points => points + 1)
				},
				OnPlayerDied: () => {
					this.setComponent(new GameStateComponent(GameState.GameOver))
				},
				OnGameRestart: () => {
					this.setComponent(new GameStateComponent(GameState.Running))
					this.setComponent(new PointsComponent(0))
				},
			}),
			new InputListener({
				[KeyCode.VALUE_SPACE]: () => {
					this.setComponent(GameStateComponent, previousState => {
						if (previousState === GameState.GameOver) return previousState

						return previousState === GameState.Paused
							? GameState.Running
							: GameState.Paused
					})
				},
			}),
		]
	}
}
