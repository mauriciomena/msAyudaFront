import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import LongCard from './LongCard'
import Card from './Card'
import './css/ValoresPosibles.css'

function ValoresPosibles() {
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
                        <h2>Variantes posibles del Evento:  {ayuda.denominacion} </h2>
                        <h3>( {ayuda.destalle} )</h3>
                        <h4>Este evento permite....</h4>
                    </div>
                    <div className='ValoresPosibles'>
                        {valores.length !== 0 && valores.map((evento,index)=>{
                            
                            let tarjeta = {
                                id:            evento.id, 
                                denominacion : evento.denominacion_valor,
                                valor : evento.valor
                                };                
                        
                        return <LongCard key={index} info={{...tarjeta}}/>
                        })}
                    </div>
                    
                </div> 
            </>
        )
}

export default ValoresPosibles;