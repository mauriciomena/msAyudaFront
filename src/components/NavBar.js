import './css/navBar.css'
import Buscar from './Buscar';
import { Link } from 'react-router-dom';

function NavBar() {
    return ( <>
                <div className='navBar'>
                    {/* <div>logo</div> */}
                    
                    
                    <div className='logo'>
                        <Link to='/'> <h2> <img src='/logoms.png'/></h2></Link>
                    </div>
                    <div className='navegacion'>
                        <ul>
                            <Link to='/documentos'><li>Buscar</li></Link>
                            <Link to='/menu'><li>Menu</li></Link>
                            <Link to='/documentos'> <li>Documentos</li></Link>
                            <Link to='/documentos'> <li>FAQ</li></Link>
                            <Link to='/documentos'> <li>Eventos</li></Link>
                            <Link to='/sprint/9'>  <li>Sprint</li></Link>
                        </ul>
                    </div>
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