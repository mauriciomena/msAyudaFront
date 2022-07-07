import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card'
import './css/cards.css'

function Cards() {
    const idOpcion = useParams()

    const [ eventos,SetEventos ]= useState([])
    const [ opcion, SetOpcion ]= useState(idOpcion)

    // let tarjeta = {
    //     denominacion : 'facturafin',
    //     destalle : 'pantalla final de factura',
    //     palabra_clave : '#factura , #datawfinalfactura',
    //     fecha_actualizacion: '2022-01-01',
    //     etiquetas: '#factura , #datawfinalfactura'};
    
    useEffect(() => {
        let endPoint = 'http://localhost:8000/menu/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            SetEventos(data.data)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let endPoint = 'http://localhost:8000/menu/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            SetEventos(data.data)
        })
        .catch(error => console.log(error));
    }, [opcion])

    return  (<div className='cards'>
                {eventos.length === 0 && <p>Cargando tarjetas...</p>}
                {eventos.length !== 0 && eventos.map(evento=>{
                        
                    let tarjeta = {
                        denominacion : evento.msayuda[0].denominacion,
                        destalle : evento.msayuda[0].destalle,
                        palabra_clave : evento.msayuda[0].palabra_clave,
                        fecha_actualizacion: evento.msayuda[0].fecha_actualizacion,
                        etiquetas: evento.msayuda[0].etiquetas};                
                   
                   return <Card key={tarjeta.denominacion} evento={{...tarjeta}}/>
                })}
            </div> )
}

export default Cards;