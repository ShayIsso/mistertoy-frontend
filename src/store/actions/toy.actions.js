import { toyService } from '../../services/toy.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_TOYS, TOY_UNDO, UPDATE_TOY } from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export async function loadToys() {
	const { filterBy } = store.getState().toyModule

	store.dispatch({ type: SET_IS_LOADING, isLoading: true })
	try {
		const toys = await toyService.query(filterBy)
		store.dispatch({ type: SET_TOYS, toys })
	} catch (err) {
		console.log('car action -> Cannot load toys', err)
		throw err
	}
	finally {
		setTimeout(() => {
			store.dispatch({ type: SET_IS_LOADING, isLoading: false })
		}, 250)
	}
}

export function removeToy(toyId) {
	return toyService
		.remove(toyId).then(() => {
			store.dispatch({ type: REMOVE_TOY, toyId })
		})
		.catch(err => {
			console.log('car action -> Cannot remove toy', err)
			throw err
		})
}

export function removeToyOptimistic(toyId) {
	store.dispatch({ type: REMOVE_TOY, toyId })

	return toyService.remove(toyId)
		.then(() => {
			showSuccessMsg('Removed Toy!')
		})
		.catch(err => {
			store.dispatch({ type: TOY_UNDO })
			console.log('car action -> Cannot remove toy', err)
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

export function setFilter(filterBy = toyService.getDefaultFilter()) {
	store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}