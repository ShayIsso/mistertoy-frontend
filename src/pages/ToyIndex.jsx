import { useEffect, useState } from "react"
import { useSelector, } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToyOptimistic, setFilter } from "../store/actions/toy.actions.js"
import { ToyFilter } from "../cmps/ToyFilter.jsx"



export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Faild to load toys', err)
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch((err) => showErrorMsg(`Cannot remove toy`, err))
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
        console.log(filterBy)
    }

    return (
        <div className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
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
