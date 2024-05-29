import {Link} from "react-router-dom";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer.jsx";
export default function NotFound() {

    return (
        <div>
            <Navbar></Navbar>
             
            <div className="row">
                <div className="col background " style={{height:"100vh"}}>
                404 PAGE NOT FOUND
                </div>
                
           
            </div>
           <Footer></Footer>
        </div>
    )
}