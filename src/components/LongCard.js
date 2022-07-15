import './css/longCard.css'

function LongCard(props) {
    let tarjeta = {
        id:            props.info.id, 
        denominacion : props.info.denominacion,
        valor : props.info.valor
    }
    
  return ( <>
                <div className='longcard'>
                    <p>  {tarjeta.denominacion} : {tarjeta.valor}</p>
                </div>
            </>
            )
};

export default LongCard;

