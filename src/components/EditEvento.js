import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './css/EditEvento.css'

function EditEvento() {
    const idOpcion = useParams()
    const [ valores,Setvalores ]= useState([])
    const [ ayuda,Setayuda ]= useState([])    
    
    useEffect(() => {
        let endPoint = 'http://192.168.10.95:8000/menu/evento/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            Setvalores(data.data)
            Setayuda(data.evento)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let endPoint = 'http://192.168.10.95:8000/menu/evento/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            Setvalores(data.data)
            Setayuda(data.evento)
        })
        .catch(error => console.log(error));
    }, [idOpcion])

    return  (   <>
                <div >
                    {ayuda.length === 0 && <p>Cargando informacion del evento...</p>}
                    <div>
                        <h2>Edicion de {ayuda.denominacion} </h2>
                        <form>
                            <div>
                                <label>Detalle:</label>
                                <input type="text" value={ayuda.destalle}/>                                    
                            </div>
                            <div>
                                <label>Palabras clave:
                                    {/* <input type="text" value={ayuda.palabra_clave} onChange={this.handleChange} /> */}
                                    <input type="text" value={ayuda.palabra_clave}/>                                    
                                </label>
                                
                            </div>
                            <div>
                                <label>Fecha de Actualización:</label>
                                <input type='date'>{ayuda.fecha_actualizacion}</input>
                            </div>                            
                            <div>
                                <label>Etiquetas:</label>
                                <input type='date'>{ayuda.etiquetas}</input>
                            </div>              
                            
                            <input type="submit" value="Enviar" />
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