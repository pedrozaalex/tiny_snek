import { Entity, ISystem } from '@asimov-ts/core'
import { toNullable } from 'fp-ts/lib/Option'
import { InputListener } from '../components'

export class InputSystem implements ISystem {
	name = 'InputSystem'

	private pressedKeys = new Array<string>()

	private handleKeyDown = (e: KeyboardEvent) => this.pressedKeys.push(e.key)

	constructor() {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	filter(e: Entity) {
		return e.hasComponent(InputListener)
	}

	update(params: { entities: Entity[] }) {
		if (params.entities.length === 0) return

		if (this.pressedKeys.length === 0) return

		const pressedKey = this.pressedKeys.shift()

		if (pressedKey === undefined) return

		params.entities.forEach(entity => {
			const inputListener = toNullable(entity.getComponentValue(InputListener))
			if (!inputListener) return

			const handler = inputListener[pressedKey]
			if (handler === undefined) return

			handler()
		})
	}
}
