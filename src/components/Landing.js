import './css/landing.css'
import {Link} from 'react-router-dom'


function Landing() {

    

    return ( <>
        <div className="landing">
            <div className='wellcome'>
                <img id='logo' src='/logoms.png'  />
                <h1>Gestion de Ayudas</h1>
                
            </div>
        </div>
    </> );
}

export default Landing;