import '../../css/menu.css'
import { Spinner } from 'react-bootstrap';
import { useMenu } from '../hooks/useMenu';
import { MenuHija } from './MenuHija';
import { Tarjetas } from './Tarjetas';
function Menu(){
    const { isloading, madres, setOpenOption, isOpen} = useMenu();
    
    return (
        <div className='Menu'>
            {isloading && <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando Menu...</span>
            </Spinner>}
            {
                <ul className='tree'>
                    {madres.map((op, index) => {
                        return <li key={op.opcion} > <span onClick={()=>setOpenOption(op.opcion)}>{op.descripcion}</span>
                        {isOpen(op.opcion)&& <MenuHija opcion={op.opcion}  />}
                        </li>
                    })}
                </ul>
            }
            <Tarjetas />
        </div>
    )
}
export default Menu;


