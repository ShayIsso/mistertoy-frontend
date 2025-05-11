import { httpService } from './http.service'

const BASE_URL = 'toy/'
// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
	const routeParam = toy._id || ''

    return httpService[method](BASE_URL + routeParam, toy)
}

function getDefaultFilter() {
    return { txt: '', inStock: null }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        imgUrl: '',
        createdAt: Date.now(),
        inStock: true
    }
}