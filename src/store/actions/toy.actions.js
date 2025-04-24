import { toyService } from '../../services/toy.service.local.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import { ADD_TOY, SET_TOYS, UPDATE_TOY } from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export function loadToys() {
	return toyService.query()
		.then((toys) => {
			store.dispatch({ type: SET_TOYS, toys })
		})
		.catch(err => {
			console.log('car action -> Cannot load toys', err)
			throw err
		})
}

export function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY

	return toyService.save(toy)
		.then(savedToy => {
			store.dispatch({ type, toy: savedToy })
			return savedToy
		})
		.catch(err => {
			console.log('car action -> Cannot save toy', err)
			throw err
		})
}