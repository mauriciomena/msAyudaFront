import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import tareasServer from '../tareasServer';
import '../components/css/sprint.css'

function Sprint() {
    
        
    const [data , setData ] = useState([]);
    const [backlog , setBacklog ] = useState([]);
    const [hacer , setHacer ] = useState([]);
    const [totPresupuestado , settotPresupuestado ] = useState(0);
    const [proceso , setProceso ] = useState([]);
    const [testing , setTesting ] = useState([]);
    const [testingOk , settestingOk ] = useState([]);
    const [hecho , setHecho ] = useState([]);
    const [meta , setMeta ] = useState([]);
    const idSprint = useParams()

    useEffect(()=>{
        const endpoint = tareasServer+'/tareas/sprint/'+idSprint.id

        // const menu = document.getElementsByClassName('Menu');
        // menu.classList.add("invisible");
            
        
        fetch(endpoint)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
                setData(data.data)
                setBacklog(data.data.backlog)
                setHacer(data.data.hacer)
                setProceso(data.data.proceso)
                setTesting(data.data.testing)
                settestingOk(data.data.testingOk)
                setHecho(data.data.hecho)
                setMeta(data.meta)

                console.log(data.meta);
            }
        ).catch(error=>{
            console.log(error)
        })

    },[])    

    return (  <>
                <h1>Sprint {idSprint.id}</h1>
                { meta.total_puntos && <p> Puntos totales: {meta.total_puntos} </p>  } 
                {/* { meta.presupuesto && <p> Presupuesto: {Math.round(meta.presupuesto / 60)} Hs. Consumido: {Math.round(meta.consumido/60)} Hs. = {Math.round(( meta.presupuesto - meta.consumido)  / 60)} Hs.</p>  }  */}
                <div key={'sp'} className='sprint'>
                    <div key={'bkl'} className='backlog'>
                        <p>Max 30 tarjetas</p>
                        <h2>Backlog {meta.enBacklog}</h2>
                        { backlog.length > 0 && backlog.map((incidente,index)=>{
                            return <div className='card' >  
                                        <p > {incidente.numero_tarea} </p> 
                                        <p>{incidente.asunto}</p> 
                                        <p>Dificultad: {incidente.deno_dificultad}</p>  
                                        <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs. Usado: {Math.round(incidente.total_consumido / 60)} Hs.</p> 
                                        <i class="fa-duotone fa-light-emergency-on"></i>
                                    </div>
                        })}
                    </div>   

                    <div key={'hacer'} className='hacer'>
                        <p>Min 6 tarjetas</p>
                        <h2>Por Hacer {meta.enHacer}</h2>
                        { hacer.length > 0 && hacer.map((incidente,index)=>{
                            return <div className='card' >  
                                        <p > {incidente.numero_tarea} </p> 
                                        <p>{incidente.asunto}</p> 
                                        <p>Dificultad: {incidente.deno_dificultad}</p>  
                                        <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs. Usado: {Math.round(incidente.total_consumido / 60)} Hs.</p> 
                                        <i class="fa-duotone fa-light-emergency-on"></i>
                                    </div>
                        })}
                    </div>                   
                    <div className='proceso'>
                        <p>Max 7 tarjetas</p>
                        <h2>En Proceso {meta.enProceso}</h2>
                        { proceso.length > 0 && proceso.map(incidente=>{
                            return <div className='card' > 
                                        <i class="fa-duotone fa-light-emergency-on"></i>  
                                        <p > {incidente.numero_tarea} </p> {incidente.asunto} 
                                        <p>Dificultad: {incidente.deno_dificultad}</p>  
                                        <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs. Usado: {Math.round(incidente.total_consumido / 60)} Hs</p> 
                                    </div>
                        })}
                    </div>                
                    <div className='testing'>
                        <p>Max 10 tarjetas</p>
                        <h2>En Testing {meta.enTesting}</h2>
                        { testing.length > 0 && testing.map(incidente=>{
                            return <div className='card' > <i class="fa-duotone fa-light-emergency-on"></i> <p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.deno_dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> <p>Usado: {Math.round(incidente.total_consumido / 60)} Hs.</p></div>
                        })}
                    </div>                
                    <div className='testingok'>
                        <p>Max 10 tarjetas</p>
                        <h2>Test OK {meta.enTestingOk}</h2>
                        { testingOk.length > 0 && testingOk.map(incidente=>{
                            return <div className='card' > <i class="fa-duotone fa-light-emergency-on"></i> <p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.deno_dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> <p>Usado: {Math.round(incidente.total_consumido / 60)} Hs.</p></div>
                        })}
                    </div>                    
                    <div className='hecho'>
                        <p>Sin reglas</p>
                        <h2>Hecho {meta.hecho} </h2>
                        { hecho.length > 0 && hecho.map(incidente=>{
                            return <div className='card' > <i class="fa-duotone fa-light-emergency-on"></i> <p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.deno_dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> <p>Usado: {Math.round(incidente.total_consumido / 60)} Hs.</p></div>
                        })}
                    </div>                                        
                </div>

            </>);
}

export default Sprint;