import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={toy.imgUrl} alt={toy.name} style={{ maxWidth: '150px' }} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Created At: <span>{new Date(toy.createdAt).toLocaleDateString()}</span></p>
            <p>Labels: <span>{toy.labels.join(', ')}</span></p>
            <p style={{ color: toy.inStock ? 'green' : 'red' }}>
                {toy.inStock ? 'In Stock ✅' : 'Out of Stock ❌'}
            </p>
            <hr />
            {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp; */}
            {/* <Link to={`/toy/${toy._id}`}>Details</Link> */}
        </article>
    )
}
