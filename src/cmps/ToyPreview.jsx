import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    return (
        <Link to={`/toy/${toy._id}`}>
            <article className="toy-preview">
                <h4 className="toy-name">{toy.name}</h4>
                <img src={toy.imgUrl} alt={toy.name} style={{ maxWidth: '150px' }} />
                <p>Price: <span>${toy.price.toLocaleString()}</span></p>
                <p style={{ color: toy.inStock ? 'green' : 'red' }}>
                    {toy.inStock ? 'In Stock ✅' : 'Out of Stock ❌'}
                </p>
                <hr />
            </article>
        </Link>
    )
}
