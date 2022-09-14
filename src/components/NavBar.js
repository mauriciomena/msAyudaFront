import './css/navBar.css'
import Buscar from './Buscar';
import { Link } from 'react-router-dom';

function NavBar() {
    return ( <>
                <div className='navBar'>
                    {/* <div>logo</div> */}
                    
                    <Link to='/'> <h2> <img src='logoms.png'/>  Gestion de Ayudas</h2></Link>
                    
                    {/* <Buscar /> */}
                    <div className='user'><i class="fa-solid fa-user"></i></div>
                    
                        {/* <div id="logo">
                            <img  src="m1.png"></img>
                        </div> */}
                    {/* <div>usuario</div>                     */}
                </div>
    </> );
}

export default NavBar; 