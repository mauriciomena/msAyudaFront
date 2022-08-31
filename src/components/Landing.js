import './css/landing.css'
import {Link} from 'react-router-dom'


function Landing() {
    return ( <>
        <div className="landing">
            <h2>Seleccione una opción del Menu para buscar sus eventos</h2>
            <Link to='/documentos'> Documentos </Link>

        </div>
    </> );
}

export default Landing;