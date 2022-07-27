import React from 'react';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './css/ValoresPosibles.css'
import UploadFiles from './UploadFiles';


function ValoresPosibles() {
    const idOpcion = useParams()
    const [ valores,Setvalores ]= useState([])
    const [ ayuda,Setayuda ]= useState([])    
    const [ idValor,SetidValor ]= useState(0)        
    const [ visible, SetVisible] = useState(false)
    
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


    const handleClick = (id) =>{
        !visible? SetVisible(true): SetVisible(false)
        SetidValor(id)
    }

    return  (   <>
                <div >
                    {ayuda.length === 0 && <p>Cargando informacion del evento...</p>}
                    <div>
                        <h2>Variantes posibles del Evento:  {ayuda.denominacion} </h2>
                        <h3>( {ayuda.destalle} )</h3>
                        <p>{ayuda.etiquetas}</p>
                    </div>
                    <div className='ValoresPosibles'>
                        <table>
                            <tr>
                                <th>Valor</th>
                                <th>Descripcion</th>
                                <th>Documento</th>
                                <th>Imagen</th>
                            </tr>
                            {valores.length !== 0 && valores.map(evento=>{
                                let tarjeta = {
                                    id:            evento.id, 
                                    denominacion : evento.denominacion_valor,
                                    valor : evento.valor
                                    };                
                                
                                return( <tr>
                                    <td>{tarjeta.valor}</td>
                                    <td>{tarjeta.denominacion}</td>
                                    {/* <td><i class="fa-solid fa-download"></i></td> */}
                                    <td className='col-3'><i class="fa-solid fa-circle-plus"></i></td>
                                    <td onClick={()=>{ handleClick(tarjeta.id) }} className='col-4'><i class="fa-solid fa-circle-plus"></i></td>
                                </tr>)
                            })}
                        </table>
                        { visible &&  <UploadFiles id={idValor}/>}                        
                    </div>
                    
                </div> 
            </>
        )
}

export default ValoresPosibles;