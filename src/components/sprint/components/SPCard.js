import { useState } from 'react'
import './SPCard.css'

export const SPCard = ({incidente}) => {
  const [open, setOpen] = useState(false);
  const  {numero_tarea, asunto,  puntos_dificultad,  en_proceso_por,  prioridad ,tiempo_presupuestado} = incidente

  return (    <div 
                  // onMouseOver={()=>setOpen(true)}
                  //  onMouseOut={()=>setOpen(false)}
                  className={`spcard ${open?'cardmx':'cardsm'}`} >  
              {!open && <p>{numero_tarea}:{asunto.toLowerCase().substring(0,40)}...</p> }
              {/* {open && <p>{numero_tarea}:{asunto}</p> } */}
              {!open && <div className='sticks'>
                <div > {en_proceso_por?.length > 0 && <div className='procesopor' ><i class="fa fa-wrench" aria-hidden="true"><span> {en_proceso_por}</span></i> </div>    }</div>
                <div className={`puntos ${puntos_dificultad>3?'difmayor':puntos_dificultad==3?'diftres':puntos_dificultad==2?'difdos':'difuno'}`}>{puntos_dificultad}</div>
                <div className={prioridad==0?'alert':'prior'}><i className={`fa ${prioridad==0?'fa-ambulance':prioridad==1?'fa-arrow-circle-o-up':prioridad==2?'fa-arrow-circle-o-right':'fa-arrow-circle-o-down'} `} aria-hidden="true"></i> </div> 
              </div>}
              {/* {open && en_proceso_por?.length > 0 && <p className='procesopor'>En proceso por: {en_proceso_por}</p>  }
              {open && <p>Prioridad: {prioridad==0?'Urgente':prioridad==1?'Alta':prioridad==2?'Media':'Baja'} </p>}
              {open && <p>Dificultad: {puntos_dificultad} </p>}
              {open && <p>Tiempo Presupuestado: {tiempo_presupuestado} </p>} */}
              
    </div>
  )
}
