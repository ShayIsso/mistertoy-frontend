import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId)
                .then(toy => setToyToEdit(toy))
                .catch(err => {
                    showErrorMsg('Failed to load toy')
                    navigate('/toy')
                })
        }
    }, [])

    function handleChange({ target }) {
        let { name, value, type } = target
        if (type === 'number') value = +value
        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Failed to save toy')
                console.log(err)
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit Toy' : 'Add Toy'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                    placeholder="Enter toy name"
                />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={toyToEdit.price}
                    onChange={handleChange}
                    placeholder="Enter toy price"
                />

                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
            </form>
        </section>
    )
}