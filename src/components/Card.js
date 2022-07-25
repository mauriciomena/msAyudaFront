import './css/card.css'
import { Link } from 'react-router-dom';

function Card(props) {
    let tarjeta = {
        id:            props.evento.id, 
        denominacion : props.evento.denominacion,
        destalle : props.evento.destalle,
        palabra_clave : props.evento.palabra_clave,
        fecha_actualizacion: props.fecha_actualizacion,
        etiquetas: props.evento.etiquetas
    }
    
  return ( <>
                <Link to={'/menu/evento/'+tarjeta.id}>
                    <div className='card'>
                        <div>
                            <i className="fa-solid fa-arrow-up-right-dots"></i>
                            <h3>{tarjeta.denominacion}</h3>
                        </div>
                        <div>
                            <p>Detalle: {tarjeta.destalle}</p>
                            <p>Palabras Clave: {tarjeta.palabra_clave}</p>
                            <p>Fecha de Actualizacion: {tarjeta.fecha_actualizacion}</p>
                            {/* <p>Etiquetas: {tarjeta.etiquetas}</p> */}
                        </div>

                        <div className='edit'> 
                            <Link  to={'/evento/edit/'+tarjeta.id}><i class="fa-solid fa-pen-to-square"></i> Editar </Link>
                        </div>
                    </div>
                </Link>
            </>
            )
};

export default Card;

