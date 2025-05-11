import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../cmps/Loader.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details')
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <Loader />
    const formattedDate = new Date(toy.createdAt).toLocaleString('he')
    return (
        <section className="toy-details" style={{ textAlign: 'center' }}>

            <h1>
                Toy name: <span>{toy.name}</span>
            </h1>
            <img src={toy.imgUrl} alt={toy.name} style={{ maxWidth: '150px' }} />

            <h1>
                Toy price: <span>${toy.price}</span>
            </h1>
            <h1>
                Labels: <span>{toy.labels.join(' ,')}</span>
            </h1>
            <h1>
                Created At: <span>{formattedDate}</span>
            </h1>
            <h1 style={{ color: toy.inStock ? 'green' : 'red' }}>
                {toy.inStock ? 'In Stock ✅' : 'Out of Stock ❌'}
            </h1>
            <button className='back-btn'>
                <Link to="/toy">Back</Link>
            </button>

        </section >
    )
}