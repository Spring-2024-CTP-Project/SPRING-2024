import {Link} from "react-router-dom";
import Navbar from "../Components/navbar";
export default function NotFound() {

    return (
        <div>
            <Navbar></Navbar>
            404 Not Found
            <Link to="/"> Home</Link>
        </div>
    )
}