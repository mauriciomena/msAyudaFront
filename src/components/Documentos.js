import './css/documentos.css'
import {Link} from 'react-router-dom'

function Documentos() {
    return ( <>
        <div className='documentos'>

            <Link to='/nuevodocumento'>
                <div className="card">
                    <div className='titulo'>
                        <h3>+ Nuevo Documento</h3>
                    </div>
                    <p>permite ingresar un documento y relacionarlo a una o varias opciones del menú</p>
                </div>
            </Link>

            <Link to='/'>
                <div className="card">
                    <div className='titulo'>
                        <h3>+ Nuevo Evento</h3>
                    </div>
                    
                    <p>permite ingresar un nuevo evento  a una o varias opciones del menú</p>
                </div>

            </Link>                
        </div>

    </> );
}

export default Documentos;