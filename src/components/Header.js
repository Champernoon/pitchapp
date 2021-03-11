import React from "react"
import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import {Navbar} from 'react-bootstrap';


function Header() {

return <header> <h1><Link to="/">Les pitchs</Link> </h1><h1><Link to="/create">Nouveau pitch</Link></h1> 
</header>

}

export default Header