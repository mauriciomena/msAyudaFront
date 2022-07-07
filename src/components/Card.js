import './css/card.css'

function Card(props) {
    let tarjeta = {
        denominacion : props.evento.denominacion,
        destalle : props.evento.destalle,
        palabra_clave : props.evento.palabra_clave,
        fecha_actualizacion: props.fecha_actualizacion,
        etiquetas: props.evento.etiquetas
    }
    
  return ( <div className='card'>
            <h3>{tarjeta.denominacion}</h3>
            <h4>{tarjeta.destalle}</h4>
            <p>{tarjeta.palabra_clave}</p>
            <p>{tarjeta.fecha_actualizacion}</p>
            <p>{tarjeta.etiquetas}</p>
            </div>)
};

export default Card;

