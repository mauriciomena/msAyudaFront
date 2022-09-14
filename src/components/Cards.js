import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card'
import './css/cards.css'
import dataserver from '../dataserver';

function Cards(props) {
    const idOpcion = useParams()
    const [ eventos,SetEventos ]= useState([])
    const [ documentos,SetDocumentos ]= useState([])    
    const [ faqs,SetFaqs ]= useState([])    
    const [ infoOpcion,SetinfoOpcion ]= useState([])
    
    let endPoint = dataserver+'/menu/'+idOpcion.id

    useEffect(() => {
        
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            let eveloc = data.data.filter(opcion => opcion.msayuda[0].tipo === 'EVE')
            SetEventos(eveloc)
            let docloc = data.data.filter(opcion => opcion.msayuda[0].tipo === 'INT')
            
            SetDocumentos(docloc)            
            let faq = data.data.filter(opcion => opcion.msayuda[0].tipo === 'FAQ')
            
            SetFaqs(faq)                        
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            let eveloc = data.data.filter(opcion => opcion.msayuda[0].tipo === 'EVE')
            SetEventos(eveloc)
            let docloc = data.data.filter(opcion => opcion.msayuda[0].tipo === 'INT')
            
            SetDocumentos(docloc)            
            let faq = data.data.filter(opcion => opcion.msayuda[0].tipo === 'FAQ')
            
            SetFaqs(faq) 
            
            SetinfoOpcion(data.opcion.dataValues)
        })
        .catch(error => console.log(error));

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }, [idOpcion])

    return  (   <>
                <h2>Ayuda de la opción {infoOpcion.descripcion}</h2>
                <h3>Eventos:</h3>
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
                <h3>Documentos:</h3>
                <div className='cards'>
                    {documentos.length !== 0 && documentos.map(documento => {
                        let tarjeta = {
                            id: documento.msayuda[0].id,
                            denominacion: documento.msayuda[0].denominacion,
                            destalle: documento.msayuda[0].destalle,
                            palabra_clave: documento.msayuda[0].palabra_clave,
                            fecha_actualizacion: documento.msayuda[0].fecha_actualizacion,
                            etiquetas: documento.msayuda[0].etiquetas
                        };

                        return <Card key={tarjeta.denominacion} evento={{ ...tarjeta }} />
                    })}
                </div>
                <h3>Faqs:</h3>
                <div className='cards'>
                    {faqs.length !== 0 && faqs.map(faq => {
                        let tarjeta = {
                            id: faq.msayuda[0].id,
                            denominacion: faq.msayuda[0].denominacion,
                            destalle: faq.msayuda[0].destalle,
                            palabra_clave: faq.msayuda[0].palabra_clave,
                            fecha_actualizacion: faq.msayuda[0].fecha_actualizacion,
                            etiquetas: faq.msayuda[0].etiquetas
                        };

                        return <Card key={tarjeta.denominacion} evento={{ ...tarjeta }} />
                    })}
                </div>
            </>
        )
}

export default Cards;