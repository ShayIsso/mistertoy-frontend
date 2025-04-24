import { Link } from 'react-router-dom'
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    // console.log('Rendering...')
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button>
                            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                        </button>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                    </div>
                </li>)}
        </ul>
    )
}