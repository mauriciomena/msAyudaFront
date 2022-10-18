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

        
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

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
       
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

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

    const copiarAlPortapapeles = (tarjeta)=> {
        let texto  = `DELETE FROM EVENTOS WHERE  libreria = 'ayud' AND  evento = '${tarjeta.evento}';`+
            `INSERT INTO  EVENTOS ( libreria , evento , descripcion , objeto ,tipo_empresa) VALUES `+
            `( 'ayud' ,'${tarjeta.evento}','${tarjeta.denominacion}','${tarjeta.valor}','GENE');`
        let aux = document.createElement("input");
        aux.setAttribute("value", texto);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        alert('Evento copiado')
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
                    {valores.length !== 0 && 
                     <div className='valoresposibles'>
                        <h3>Valores Posibles:</h3>
                        { valores.map(evento=>{
                            console.log(evento);
                            let tarjeta = {
                                evento :       ayuda.denominacion,
                                id:            evento.id, 
                                denominacion : evento.denominacion_valor,
                                valor : evento.valor,
                                imagen: evento.imgurl
                                };                
                            
                            return( <div className='valorPosible'>

                                    <p onClick={()=>copiarAlPortapapeles( tarjeta)}>
                                        <i class="fa-regular fa-copy"></i> 
                                    </p>
                                    <p>  Indica que: {tarjeta.denominacion}  cuando el objeto está en: {tarjeta.valor} </p>
                                    <div className='imagen' >
                                        { !(tarjeta.imagen.length === 0) && (<img src={tarjeta.imagen}/>) }
                                    </div>
                                    <div>
                                        {(tarjeta.imagen.length === 0) && (<p onClick={() => { handleClick(tarjeta.id) }} className='col-4'> <i class="fa-solid fa-circle-plus"></i> Agregar imagen </p>)}                                    
                                    </div>
                                    

                            </div>)
                        })}
                        { visible &&  <UploadFiles id={idValor}/>}                        
                    </div>
                    }
                    <h3>Opciones relacionadas:</h3>
                    {ayuda.opciones && ayuda.opciones.length > 0 && ayuda.opciones.map((   opcion,index) => {return <p key={index}>{opcion.vw_menu.opcion}</p>})}
                    {ayuda.imgurl && <embed className='visor' src={ayuda.imgurl} type="application/pdf" /> }
                   
                    
                </div> 
            </>
        )
}

export default InfoAyuda;