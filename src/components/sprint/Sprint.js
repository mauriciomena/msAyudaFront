import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import tareasServer from '../../tareasServer';
import './sprint.css'
import { SPCard } from './components/SPCard';

function Sprint() {
        
    const [data , setData ] = useState([]);
    const [backlog , setBacklog ] = useState([]);
    const [hacer , setHacer ] = useState([]);
    const [presupuesto , setPresupuesto ] = useState([]);
    const [proceso , setProceso ] = useState([]);
    const [testing , setTesting ] = useState([]);
    const [testingOk , settestingOk ] = useState([]);
    const [hecho , setHecho ] = useState([]);
    const [meta , setMeta ] = useState([]);
    const idSprint = useParams()

    useEffect(()=>{
        const endpoint = tareasServer+'/tareas/sprint/'+idSprint.id       
        
        fetch(endpoint)
        .then(response => response.json())
        .then(data=>{
            
                
                setData(data.data)
                setPresupuesto(data.data.presupuesto)
                setBacklog(data.data.backlog)
                setHacer(data.data.hacer)
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

    return (  <div id='conenedorsp'>
                <h2>Sprint {idSprint.id}</h2>
                { meta.total_puntos && <p> Puntos totales: {meta.total_puntos} avance: { Math.round((meta.puntosHecho / meta.total_puntos)*100) }% </p>  } 
                {/* { meta.presupuesto && <p> Presupuesto: {Math.round(meta.presupuesto / 60)} Hs. Consumido: {Math.round(meta.consumido/60)} Hs. = {Math.round(( meta.presupuesto - meta.consumido)  / 60)} Hs.</p>  }  */}
                
                <div key={'sp'} className='sprint'>
                    {presupuesto.length > 0  && <div key={'pres'} className='columna presup'>
                        <div className='titulo'>
                            <h4>Presupuestar {meta.enPresupuesto}</h4>
                            <p>Max 5 tarjetas</p>
                            <p>Puntos: {meta.puntosPresupuesto}</p>
                        </div>
                        
                        { presupuesto.map((incidente,index)=>{
                            return <SPCard incidente={incidente}/>
                        })}
                    
                    </div>   
}
                    {  backlog.length > 0 && <div key={'bkl'} className='columna backlog'>
                        <div className='titulo'>
                            <h4>Backlog {meta.enBacklog}</h4>
                            <p>Max 30 tarjetas</p>
                            <p>Puntos: {meta.puntosBacklog}</p>
                        </div>
                        
                            { backlog.map((incidente,index)=>{
                                return <SPCard incidente={incidente}/>
                            })}
                
                    </div>   }

                    {hacer.length > 0 && <div key={'hacer'} className='columna hacer'>
                        <div className='titulo'>
                            <h4>Por Hacer {meta.enHacer}</h4>
                            <p>Min 6 tarjetas</p>
                            <p>Puntos {meta.puntosEnHacer}</p>
                        </div>
                
                            { hacer.length > 0 && hacer.map((incidente,index)=>{
                                return <SPCard incidente={incidente}/> 
                            })}
                        
                    </div>  }  

                    {proceso.length > 0 && <div className='columna proceso'>
                        <div className='titulo'>
                            <h4>En Proceso {meta.enProceso}</h4>
                            <p>Max 7 tarjetas</p>
                            <p>Puntos {meta.puntosEnProceso}</p>
                        </div>
                        
                            { proceso.length > 0 && proceso.map(incidente=>{
                            return <SPCard incidente={incidente}/>
                            })}
                        
                    </div>   }             
                    {testing.length > 0 && <div className='columna testing'>
                        <div className='titulo'>
                            <h4>En Testing {meta.enTesting}</h4>
                            <p>Max 10 tarjetas</p>
                            <p>Puntos {meta.punstoEnTesting}</p>
                        </div>
                        
                            { testing.length > 0 && testing.map(incidente=>{
                                return <SPCard incidente={incidente}/>
                            })}
                        
                    </div>   }             
                    { testingOk.length > 0 && <div className='columna testingok'>
                        <div className='titulo'>
                            <h4>Test OK {meta.enTestingOk}</h4>
                            <p>Max 10 tarjetas</p>
                            <p>Puntos {meta.puntosEnTestingOk}</p>
                        </div>
                        
                            { testingOk.length > 0 && testingOk.map(incidente=>{
                            return <SPCard incidente={incidente}/>
                            })}
                        
                    </div> }                   
                    {hecho.length > 0 && <div className='columna hecho'>
                        <div className='titulo'>
                            <h4>Hecho {meta.hecho} </h4>
                            <p>Sin reglas</p>
                            <p>Puntos {meta.puntosHecho} </p>
                        </div>
                        
                            { hecho.length > 0 && hecho.map(incidente=>{
                                return <SPCard incidente={incidente}/>
                            })}
                        
                    </div>
                    }                                        
                </div>

            </div>);
}

export default Sprint;