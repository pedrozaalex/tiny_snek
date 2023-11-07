import { CollisionSystem, EventsSystem } from '@asimov-ts/common'
import { createGame } from '@asimov-ts/core'
import { Food, Player, StateTracker, UserInterface } from './buildables'
import { InputSystem, MovementSystem, RenderingSystem, TrackPlayerSystem, UIUpdaterSystem } from './systems'

createGame()
	.withBuildable(new Player())
	.withBuildable(new Food())
	.withBuildable(new StateTracker())
	.withBuildable(new UserInterface())

	.withSystem(new InputSystem())
	.withSystem(new MovementSystem())
	.withSystem(new TrackPlayerSystem())
	.withSystem(new CollisionSystem())
	.withSystem(new RenderingSystem())
	.withSystem(new EventsSystem())
	.withSystem(new UIUpdaterSystem())

	.build()
	.initialize()
