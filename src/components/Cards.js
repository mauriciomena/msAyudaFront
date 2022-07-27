import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card'
import './css/cards.css'

function Cards() {
    const idOpcion = useParams()
    const [ eventos,SetEventos ]= useState([])
    const [ infoOpcion,SetinfoOpcion ]= useState([])
    

    useEffect(() => {
        let endPoint = 'http://192.168.10.22:8000/menu/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            SetEventos(data.data)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let endPoint = 'http://192.168.10.22:8000/menu/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            SetEventos(data.data)
            SetinfoOpcion(data.opcion.dataValues)
        })
        .catch(error => console.log(error));
    }, [idOpcion])

    return  (   <>
                <h2>Ayuda de la opción {infoOpcion.descripcion}</h2>
                {eventos.length !== 0 && <p>Total de Eventos Encontrados {eventos.length}</p>}
                <div className='cards'>
                    {eventos.length === 0 && <p>Cargando tarjetas...</p>}                    
                    {eventos.length !== 0 && eventos.map(evento=>{                            
                        let tarjeta = {
                            id:            evento.msayuda[0].id, 
                            denominacion : evento.msayuda[0].denominacion,
                            destalle : evento.msayuda[0].destalle,
                            palabra_clave : evento.msayuda[0].palabra_clave,
                            fecha_actualizacion: evento.msayuda[0].fecha_actualizacion,
                            etiquetas: evento.msayuda[0].etiquetas};                
                    
                    return <Card key={tarjeta.denominacion} evento={{...tarjeta}}/>
                    })}

                </div> 
            </>
        )
}

export default Cards;