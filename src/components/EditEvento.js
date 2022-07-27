import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './css/EditEvento.css'

function EditEvento() {
    const idOpcion = useParams()
    const [ valores,Setvalores ]= useState([])
    const [ ayuda,Setayuda ]= useState([])    
    
    useEffect(() => {
        let endPoint = 'http://192.168.10.22:8000/menu/evento/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            Setvalores(data.data)
            Setayuda(data.evento)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let endPoint = 'http://192.168.10.22:8000/menu/evento/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            Setvalores(data.data)
            Setayuda(data.evento)
        })
        .catch(error => console.log(error));
    }, [idOpcion])

    return  (   <>
                <div className='EditEvento' >
                    {ayuda.length === 0 && <p>Cargando informacion del evento...</p>}
                    <div>
                        <h2>Edicion de {ayuda.denominacion} </h2>
                        <form className='form'>
                          
                            <div>
                                <label>Palabras clave:
                                    {/* <input type="text" value={ayuda.palabra_clave} onChange={this.handleChange} /> */}
                                    <div><input type="text" value={ayuda.palabra_clave}/> </div>
                                </label>
                            </div>
                            <div>
                                <label>Detalle:</label>
                                <div><textarea  value={ayuda.destalle}/></div>
                            </div>
                            
                            <div>
                                <label>Fecha de Actualización:</label>
                                <div><input type='date'>{ayuda.fecha_actualizacion}</input></div>
                                
                            </div>                            
                            <div>
                                <label>Etiquetas:
                                    <div><input type='date'>{ayuda.etiquetas}</input></div>
                                </label>
                            </div>              
                            <div>
                                <input type="submit" value="Enviar" />
                            </div>
                        </form>
                    </div>
                    {/* <div className='EditEvento'>
                        {valores.length !== 0 && valores.map((evento,index)=>{
                            
                            let tarjeta = {
                                id:            evento.id, 
                                denominacion : evento.denominacion_valor,
                                valor : evento.valor
                                };                
                        
                        return <LongCard key={index} info={{...tarjeta}}/>
                        })}
                    </div> */}
                    
                </div> 
            </>
        )
}

export default EditEvento;