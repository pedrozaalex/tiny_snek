import { IEvent } from '@asimov-ts/common'

export class PlayerAteFoodEvent implements IEvent {
	type = 'OnPlayerAteFood'
}

export class PlayerDiedEvent implements IEvent {
	type = 'OnPlayerDied'
}

export class OnGameRestartEvent implements IEvent {
	type = 'OnGameRestart'
}
