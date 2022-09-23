import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import dataserver from '../dataserver';
import './css/InfoAyuda.css'
import UploadFiles from './UploadFiles';


function InfoAyuda() {
    const idOpcion = useParams()
    const [ valores,Setvalores ]= useState([])
    const [ ayuda,Setayuda ]= useState([])    
    const [ idValor,SetidValor ]= useState(0)        
    const [ visible, SetVisible] = useState(false)
    
    useEffect(() => {
        let endPoint = dataserver+'/menu/evento/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            Setvalores(data.data)
            Setayuda(data.evento)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let endPoint = dataserver+'/menu/evento/'+idOpcion.id
        fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            Setvalores(data.data)
            Setayuda(data.evento) 
            console.log(data);
        })
        .catch(error => console.log(error));
    }, [idOpcion])


    const handleClick = (id) =>{
        !visible? SetVisible(true): SetVisible(false)
        SetidValor(id)
    }

    return  (   <>
                <div className='InfoAyuda'>
                    {ayuda.length === 0 && <p>Cargando informacion...</p>}
                    <div>
                        <h2>{ayuda.denominacion} </h2>
                        <h3>Detalle:</h3>
                        <p>{ayuda.destalle}</p>
                        <h3>Etiquetas:</h3>
                        <p>{ayuda.etiquetas}</p>
                    </div>
                    <h3>Opciones relacionadas:</h3>
                    {ayuda.opciones && ayuda.opciones.length > 0 && ayuda.opciones.map((   opcion,index) => {return <p key={index}>{opcion.vw_menu.opcion}</p>})}
            
                    <embed className='visor' src={ayuda.imgurl} type="application/pdf" /> 
                    
                    {valores.length !== 0 && 
                     <div >
                        <table>
                            <tr>
                                <th>Valor</th>
                                <th>Descripcion</th>
                                <th>Documento</th>
                                <th>Imagen</th>
                            </tr>
                            { valores.map(evento=>{
                                console.log(evento);
                                let tarjeta = {
                                    id:            evento.id, 
                                    denominacion : evento.denominacion_valor,
                                    valor : evento.valor,
                                    imagen: evento.imgurl
                                    };                
                                console.log(tarjeta.imagen);
                                return( <>
                                    <tr>
                                        <td>{tarjeta.valor}</td>
                                        <td>{tarjeta.denominacion}</td>
                                        {/* <td><i class="fa-solid fa-download"></i></td> */}
                                        <td className='col-3'><i class="fa-solid fa-circle-plus"></i></td>
                                        <td onClick={()=>{ handleClick(tarjeta.id) }} className='col-4'><i class="fa-solid fa-circle-plus"></i></td>
                                    </tr>
                                    { !(tarjeta.imagen.length === 0) && (<img src={tarjeta.imagen}/>) }
                                    
                                </>)
                            })}
                        </table>
                        { visible &&  <UploadFiles id={idValor}/>}                        
                    </div>
                    }
                   
                    
                </div> 
            </>
        )
}

export default InfoAyuda;