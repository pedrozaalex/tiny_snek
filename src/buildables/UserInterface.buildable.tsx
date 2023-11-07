import { EventQueue } from '@asimov-ts/common'
import { Entity, IBuildable } from '@asimov-ts/core'
import { pipe } from 'fp-ts/lib/function'
import { getOrElse, isSome } from 'fp-ts/lib/Option'
import { Match, Switch } from 'solid-js'
import { GameStateComponent, PointsComponent } from '../components'
import { GameState } from '../constants'
import { OnGameRestartEvent } from '../events'
import { UIBlockComponent } from '../components'

type UIProps = {
	points: number
	gameState: GameState
}

export class UserInterface extends Entity implements IBuildable {
	private restartButtonHandler = () =>
		this.setComponent(EventQueue, queuedEvents => [...queuedEvents, new OnGameRestartEvent()])

	getInitialComponents() {
		return [
			new EventQueue(),
			new UIBlockComponent({
				mapEntitiesToProps: (entities: Entity[]): UIProps => {
					const points = entities
						.filter(e => e.hasComponent(PointsComponent))
						.map(e => e.getComponentValue(PointsComponent))
						.reduce((acc, points) => (isSome(points) ? acc + points.value : acc), 0)

					const [gameState] = entities
						.filter(e => e.hasComponent(GameStateComponent))
						.map(e =>
							pipe(
								e.getComponentValue(GameStateComponent),
								getOrElse(() => GameState.Running)
							)
						)

					return {
						points,
						gameState
					}
				},

				render: (props: UIProps) => (
					<>
						<div class='ui-root'>
							<div class='ui-header'>
								<p>score: {props.points.toString().padStart(4, '0')}</p>
							</div>

							<div class='game-state'>
								<Switch fallback={null}>
									<Match when={props.gameState === GameState.Paused}>
										<span>Paused</span>
									</Match>
									<Match when={props.gameState === GameState.GameOver}>
										<span>Game Over</span>
										<button onClick={this.restartButtonHandler}>restart?</button>
									</Match>
								</Switch>
							</div>
						</div>

						<div class='controls'>
							<p>controls: &larr; &rarr; &uarr; &darr; to move, space to pause</p>
						</div>
					</>
				)
			})
		]
	}
}
