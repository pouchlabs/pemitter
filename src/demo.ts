import Pemitter from './index'

const em = new Pemitter()

em.addListener('chat', function cb(ev) {
	console.log('onceb', ev.data.get('h')())
})
em.once('chat', function cb(ev) {
	console.log('once2', ev.data.get('h')())
})
em.removeListener('*')
em.on('chat', (ev) => {
	console.log('off', ev)
})
em.on('chat', (ev) => {
	console.log('w', ev)
})
em.on('*', (ev) => {
	console.log('w2h', ev)
})

em.emit(
	'chat',
	new Map().set('h', () => {
		console.log('bb')
	}),
)
