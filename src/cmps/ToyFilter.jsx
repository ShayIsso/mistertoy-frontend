import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value}))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)        
    }

    const { txt } = filterByToEdit


    return (
       <section className="toy-filter container">
            <h3>Toy Filter</h3>
            <form onSubmit={onSubmitFilter} className="filter-form flex align-center">
                <input  
                    onChange={handleChange}
                    value={txt}
                    type="text"
                    placeholder="Search"
                    name="txt"                
                />
            </form>
       </section>
    )
}