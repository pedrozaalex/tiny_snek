import {
	CollisionSystem,
	EventsSystem,
	UIUpdaterSystem,
} from '@asimov-ts/common'
import { createGame } from '@asimov-ts/core'
import { Food, Player, StateTracker } from './buildables'
import { UserInterface } from './buildables/UserInterface.buildable'
import { InputSystem, MovementSystem, RenderingSystem } from './systems'
import { TrackPlayerSystem } from './systems/TrackPlayer.system'

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
