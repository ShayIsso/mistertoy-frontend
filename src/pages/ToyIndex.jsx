import { useEffect } from "react"
import { useSelector,  } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, removeToyOptimistic, saveToy } from "../store/actions/toy.actions.js"



export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Faild to load toys', err)
            })
    }, [])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch((err) => showErrorMsg(`Cannot remove toy`, err))
    }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?')
    //     const toyToSave = { ...toy, price }

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    //         })
    //         .catch((err) => showErrorMsg('Cannot update toy'))
    // }

    // function onAddToy() {
    //     const toyToSave = toyService.getRandomToy()
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    //         })
    //         .catch((err) => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    return (
        <div>
            <header>
                <h3>Bug List</h3>
                <button>
                    <Link to={"/toy/edit"}>Add Toy</Link>
                </button>
            </header>
            <main>
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
            </main>
        </div>
    )
}
