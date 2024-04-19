import {Link} from "react-router-dom";

export default function NotFound() {

    return (
        <div>
            404 Not Found
            <Link to="/">Home</Link>
        </div>
    )
}