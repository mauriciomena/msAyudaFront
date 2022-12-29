import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import tareasServer from '../tareasServer';
import '../components/css/sprint.css'

function Sprint() {
    const [data , setData ] = useState([]);
    const [backlog , setBacklog ] = useState([]);
    const [proceso , setProceso ] = useState([]);
    const [testing , setTesting ] = useState([]);
    const [testingOk , settestingOk ] = useState([]);
    const [hecho , setHecho ] = useState([]);
    const [meta , setMeta ] = useState([]);
    const idSprint = useParams()

    useEffect(()=>{
        console.log(idSprint.id);
        const endpoint = tareasServer+'/tareas/sprint/'+idSprint.id
        console.log(endpoint);
        fetch(endpoint)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
                setData(data.data)
                setBacklog(data.data.backlog)
                setProceso(data.data.proceso)
                setTesting(data.data.testing)
                settestingOk(data.data.testingOk)
                setHecho(data.data.hecho)
                setMeta(data.meta)
            }
        ).catch(error=>{
            console.log(error)
        })

    },[])    

    return (  <>
                <div className='sprint'>
                    <div className='backlog'>
                        <h2>Backlog {meta.enBacklog}</h2>
                        {console.log('backlog',backlog)}
                        { backlog.length > 0 && backlog.map(incidente=>{
                            return <div className='card' ><p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> </div>
                                
                        })}
                    </div>                
                    <div className='proceso'>
                        <h2>En Proceso {meta.enProceso}</h2>
                        { proceso.length > 0 && proceso.map(incidente=>{
                            return <div className='card' ><p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> </div>
                        })}
                    </div>                
                    <div className='testing'>
                        <h2>En Testing {meta.enTesting}</h2>
                        { testing.length > 0 && testing.map(incidente=>{
                            return <div className='card' ><p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> </div>
                        })}
                    </div>                
                    <div className='testingok'>
                        <h2>Testeado Ok {meta.enTestingOk}</h2>
                        { testingOk.length > 0 && testingOk.map(incidente=>{
                            return <div className='card' ><p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> </div>
                        })}
                    </div>                    
                    <div className='hecho'>
                        <h2>Hecho {meta.hecho} </h2>
                        { hecho.length > 0 && hecho.map(incidente=>{
                            return <div className='card' ><p > {incidente.numero_tarea} </p> {incidente.asunto} <p>Dificultad: {incidente.dificultad}</p>  <p>Presupuesto: {Math.round(incidente.tiempo_presupuestado / 60)} Hs.</p> </div>
                        })}
                    </div>                                        
                </div>

            </>);
}

export default Sprint;