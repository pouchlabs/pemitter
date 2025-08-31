/** biome-ignore-all lint/complexity/noUselessTernary: <> */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: <> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/complexity/noBannedTypes: <> */
import { hexoid } from './utils'

type Evkey = ''
export interface Event {
	type: string
	id: string
	fn: Function
	isWildcard: boolean
}
export interface Events {
	handlers: object[]
	type: string
}

interface ReturnEvent {
	type?: string
	data: any
}
/**
 * create new event emitter instance.
 * @class
 */
class Pemitter {
	private _events: Map<Evkey, Event> = new Map()
	_once: boolean = false
	_id: string

	/**
	 * add event listener
	 * @param event -event to listen to.
	 * @param cb -a callback function to be called
	 */
	on(event: string, cb: (ev: ReturnEvent) => {}): void {
		if (
			event &&
			typeof event === 'string' &&
			event.length > 0 &&
			cb &&
			typeof cb === 'function'
		) {
			const newevent: Event = {
				type: event,
				id: hexoid(16),
				fn: cb,
				isWildcard: event.startsWith('*') && event.length === 1 ? true : false,
			}

			const found: Events = this._events.get(event)
			if (!found) {
				//create new and add
				const handlers = []
				handlers.push(newevent)
				this._events.set(event, { type: event, handlers })
				return
			}
			//found
			//append new handler
			found.handlers.push(newevent)
		} else {
			throw new Error('pemitter: event and cb are required.')
		}
	}
	/**
	 * listens on event once
	 * @param event -event to emit once.
	 * @param cb  -callback function to run.
	 * @returns
	 */
	once(event: string, cb: (ev: ReturnEvent) => {}): void {
		if (
			event &&
			typeof event === 'string' &&
			event.length > 0 &&
			cb &&
			typeof cb === 'function'
		) {
			const newevent: Event = {
				type: event,
				id: hexoid(16),
				fn: cb,
				isWildcard: event.startsWith('*') && event.length === 1 ? true : false,
			}
			this._once = true
			this._id = newevent.id
			const found: Events = this._events.get(event)
			if (!found) {
				//create new and add
				const handlers = []
				handlers.push(newevent)
				this._events.set(event, { type: event, handlers })
				return
			}
			//found
			//append new handler
			found.handlers.push(newevent)
		} else {
			throw new Error('pemitter: event and cb are required.')
		}
	}
	/**
	 * emit events
	 * @param event - event to emit.
	 * @param data - data to send.
	 *
	 */
	emit(event: string, data: any): void {
		try {
			if (event && typeof event === 'string' && event.length > 0 && data) {
				const timmer = setTimeout(() => {
					const found: Events = this._events.get(event.trim())
					if (!found) return
					const wildcard: Events = this._events.get(' * '.trim())
					//for wildcard
					if (wildcard) {
						//trick for once listener
						!this?._once
							? wildcard.handlers.forEach((h: Event) => {
									h.fn({ type: event, data })
								})
							: wildcard.handlers
									.find((ev) => (ev.id = this?._id))
									?.fn({ type: event, data })
					}
					//
					!this?._once
						? found.handlers.forEach((h: Event) => {
								h.fn({ type: event, data })
							})
						: found.handlers
								.find((ev) => (ev.id = this?._id))
								?.fn({ type: event, data })
					clearTimeout(timmer)
				}, 2)
			} else {
				throw new Error('pemitter: event & data required')
			}
		} catch (error) {
			throw new Error(error?.message)
		}
	}
	/**
	 * off all event listeners for current event .
	 * @param event
	 */
	off(event: string): void {
		try {
			if (event && typeof event === 'string' && event.length > 0) {
				const timmer = setTimeout(() => {
					const found = this._events.get(event.trim())
					if (found) {
						this._events.delete(found.type)
						clearTimeout(timmer)
					}
				}, 1)
			} else {
				throw new Error('pemitter: event string required')
			}
		} catch (error) {
			throw new Error(error?.message)
		}
	}
	/**
	 * clear all event listeners
	 */
	clear(): void {
		this._events.clear()
	}
	/**
	 * adds event listener same as on.
	 * @param event - event to listen to.
	 * @param cb - callback function to use.
	 */
	addListener(event: string, cb: (ev: ReturnEvent) => {}): void {
		this.on(event, cb)
	}
	/**
	 * removes all listeners same as clear.
	 */
	removeAllListeners(): void {
		this.clear()
	}
	/**
	 * removes a listener same as off.
	 * @param event -event to remove.
	 */
	removeListener(event: string): void {
		this.off(event)
	}
}

export { Pemitter }
export default Pemitter
