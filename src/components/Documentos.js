import './css/documentos.css'
import {Link} from 'react-router-dom'

function Documentos() {
    return ( <>
        <div className='documentos'>

            <Link to='/nuevodocumento'>
                <div className="card">
                    <div className='titulo'>
                        <h3><i class="fa-solid fa-file"></i>    Nuevo Documento</h3>
                    </div>
                    <p>permite ingresar un documento y relacionarlo a una o varias opciones del menú</p>
                </div>
            </Link>

            <Link to='/nuevafaq'>
                <div className="card">
                    <div className='titulo'>
                        <h3><i class="fa-solid fa-clipboard-question"></i>     Nueva Pregunta Frecuente</h3>
                    </div>
                    <p>permite ingresar una pregunta frecuente  y relacionarlo a una o varias opciones del menú</p>
                </div>
            </Link>

            <Link to='/nuevoevento'>
                <div className="card">
                    <div className='titulo'>
                        <h3><i class="fa-brands fa-delicious"></i>    Nuevo Evento</h3>
                    </div>
                    
                    <p>permite ingresar un nuevo evento  a una o varias opciones del menú</p>
                </div>

            </Link>                
        </div>

    </> );
}

export default Documentos;