import { useEffect, useState } from "react"
import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from '../services/toy.service.local.js'

export function ToyIndex() {
    const [toys, setToys] = useState([])

    useEffect(() => {
        loadToys()
    }, [])

    function loadToys() {
        toyService.query()
            .then(setToys)
            .catch(err => {
                console.error('Error loading toys:', err)
                showErrorMsg('Cannot load toys!')
            })
    }

    function onRemoveToy(toyId) {
        console.log('Remove toy', toyId)
    }

    function onEditToy(toy) {
        console.log('Edit toy', toy)
    }

    function addToToy(toyId) {
        console.log('Add to toy', toyId)
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                    addToToy={addToToy}
                />
            </main>
        </div>
    )
}
