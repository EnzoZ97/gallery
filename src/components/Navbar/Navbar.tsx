import './Navbar.scss';
import { FaDog } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="Navbar">
            <Link to="/" className="content">
                <FaDog className="icon" />
                <h1 className="title">Dog Pictures</h1>
            </Link>
        </nav>
    )
}

export default Navbar;