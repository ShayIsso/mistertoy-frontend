import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import buzImg from '../assets/img/buzzlightyear.png'

const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY).then(toys => {
        let filteredToys = [...toys]

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
        }

        if (filterBy.inStock === 'true' || filterBy.inStock === 'false') {
            filteredToys = filteredToys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
        }
        
        return filteredToys
    })


    //     if (!filterBy.txt) filterBy.txt = ''
    //     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    //     const regExp = new RegExp(filterBy.txt, 'i')
    //     return toys.filter(toy =>
    //         regExp.test(toy.name) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
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

function getRandomToy() {
    return {
        name: 'Toy-' + Math.floor(Math.random() * 1000),
        price: utilService.getRandomIntInclusive(10, 200),
        labels: _getRandomLabels(),
        imgUrl: buzImg,
        createdAt: Date.now(),
        inStock: Math.random() > 0.3
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: null }
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = []
    for (var i = 0; i < 12; i++) {
        const toy = getRandomToy()
        toy._id = utilService.makeId()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}

function _getRandomLabels() {
    const shuffled = [...labels].sort(() => 0.5 - Math.random())
    const count = utilService.getRandomIntInclusive(1, 3)
    return shuffled.slice(0, count)
}
