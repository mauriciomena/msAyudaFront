import './css/navBar.css'
import Buscar from './Buscar';

function NavBar() {
    return ( <>
                <div className='navBar'>
                    {/* <div>logo</div> */}

                    <h2>Gestion de Ayudas</h2>
                    <Buscar />
                    <div className='user'><i class="fa-solid fa-user"></i></div>
                    
                        {/* <div id="logo">
                            <img  src="m1.png"></img>
                        </div> */}
                    {/* <div>usuario</div>                     */}
                </div>
    </> );
}

export default NavBar; 