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
    const [ data,setData ]= useState([])
    
    let endPoint = dataserver+'/menu/'+idOpcion.id
    

    useEffect(() => {
        if (props.data && props.data.length > 0 ){
            setData(props.data)            
            let eveloc = props.data.filter(opcion => opcion.msayuda[0].tipo === 'EVE')
            SetEventos(eveloc)
            let docloc = props.data.filter(opcion => opcion.msayuda[0].tipo === 'INT')
            
            SetDocumentos(docloc)            
            let faq = props.data.filter(opcion => opcion.msayuda[0].tipo === 'FAQ')
            
            SetFaqs(faq)   

        }else{
            if (idOpcion.id !== undefined){
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
            }
        }
    }, [])

    useEffect(() => {
        if (data && data.length > 0 ){

            let eveloc = data.filter(opcion => opcion.msayuda[0].tipo === 'EVE')
            SetEventos(eveloc)
            let docloc = data.filter(opcion => opcion.msayuda[0].tipo === 'INT')
            
            SetDocumentos(docloc)            
            let faq = data.filter(opcion => opcion.msayuda[0].tipo === 'FAQ')
            
            SetFaqs(faq)   

        }else{
            
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
        }
    }, [idOpcion, data])

    return  (   <>
                <h2>Ayuda de la opción {infoOpcion.descripcion}</h2>

                <div className='minCards'>
                    <a href='#eve'> <div className='minCard'> <i class='fa-solid fa-gears'></i> {eventos.length} Eventos</div> </a>
                    <a href='#faq'><div className='minCard'> <i class='fa-solid fa-clipboard-question'></i> {faqs.length} FAQ</div> </a>
                    <a href='#doc'><div className='minCard'> <i class='fa-solid fa-file'></i>{documentos.length} Documentos</div></a>
                </div>
                                       
               
                <div id='faq' className='cards'>
                    {faqs.length !== 0 && faqs.map(faq => {
                        let tarjeta = {
                            id: faq.msayuda[0].id,
                            denominacion: faq.msayuda[0].denominacion,
                            destalle: faq.msayuda[0].destalle,
                            palabra_clave: faq.msayuda[0].palabra_clave,
                            fecha_actualizacion: faq.msayuda[0].fecha_actualizacion,
                            etiquetas: faq.msayuda[0].etiquetas,
                            tipo:'FAQ'
                        };

                        return <Card key={tarjeta.denominacion} evento={{ ...tarjeta }} />
                    })}
                </div>
                <div id='eve' className='cards'>
                    {eventos.length === 0 && <p>Cargando tarjetas...</p>}                    
                    {eventos.length !== 0 && eventos.map(evento=>{                            
                        let tarjeta = {
                            id:            evento.msayuda[0].id, 
                            denominacion : evento.msayuda[0].denominacion,
                            destalle : evento.msayuda[0].destalle,
                            palabra_clave : evento.msayuda[0].palabra_clave,
                            fecha_actualizacion: evento.msayuda[0].fecha_actualizacion,
                            etiquetas: evento.msayuda[0].etiquetas,
                            tipo: 'EVE',
                        };                
                    
                    return <Card key={tarjeta.denominacion} evento={{...tarjeta}}/>
                    })}
                </div>    

                <div id='doc' className='cards'>
                    {documentos.length !== 0 && documentos.map(documento => {
                        let tarjeta = {
                            id: documento.msayuda[0].id,
                            denominacion: documento.msayuda[0].denominacion,
                            destalle: documento.msayuda[0].destalle,
                            palabra_clave: documento.msayuda[0].palabra_clave,
                            fecha_actualizacion: documento.msayuda[0].fecha_actualizacion,
                            etiquetas: documento.msayuda[0].etiquetas,
                            tipo:'INT'
                        };

                        return <Card key={tarjeta.denominacion} evento={{ ...tarjeta }} />
                    })}
                </div>
                
            </>
        )
}

export default Cards;