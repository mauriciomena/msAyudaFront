import './css/documentos.css'
import {Link} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import server from '../dataserver';
import Card from './Card';

function Documentos() {
    const [ eventos, SetEventos ] = useState([]);
    const [ documentos, SetDocumentos ] = useState([]);
    const [ faqs, SetFaqs ] = useState([]);
    const [ filtro, SetFiltro ] = useState([])
    const buscado = useRef();    
    useEffect(()=>{
        console.log(filtro);
        if (filtro.length > 0 )  {
            fetch(server+"/menu/buscar/",
            {
                method: 'POST',
                headers: {
                    'access-token': "token si se usa",
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(
                    {
                        'buscar' : filtro
                    }
                )
            } )
            .then(result => result.json())
            .then(response => {  
                // console.log(response);       
                 let eveloc = response.data.filter(opcion => opcion.tipo === 'EVE')
                 SetEventos(eveloc)
                let docloc = response.data.filter(opcion => opcion.tipo === 'INT')                    
                SetDocumentos(docloc)            
                let faq = response.data.filter(opcion => opcion.tipo === 'FAQ')
                SetFaqs(faq)                        
            })
            .catch(console.warn)  
        } else{
            //limpio los filtros
            SetEventos([])
            SetDocumentos([])
            SetFaqs([])
        }
        
    },[filtro])
  
    const buscar=()=>{ SetFiltro(buscado.current.value) };
    
    return ( <>
        <div className='documentos'>
            <div className='buscar'>
                <form>
                    <input  ref={buscado} onChange={buscar} type="text" placeholder='Buscá aquí tus preguntas frecuentes , eventos , documentos '/>
                </form>

                <div className='cards'>
                    {eventos.length !== 0 && eventos.map(( ev,index ) =>{         
                        
                        let tarjeta = {
                            id:            ev.id, 
                            denominacion : ev.denominacion,
                            destalle : ev.destalle,
                            palabra_clave : ev.palabra_clave,
                            fecha_actualizacion: ev.fecha_actualizacion,
                            etiquetas: ev.etiquetas,
                            tipo: 'EVE',
                        };                
                        
                    return <Card key={index} evento={{...tarjeta}}/>
                    })}
                </div> 
                {/* <img src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=http://www.macrosistemassrl.com.ar&amp;choe=UTF-8" /> */}
                
                 <div className='cards'>
                    {documentos.length !== 0 && documentos.map((documento,index) => {
                        let tarjeta = {
                            id: documento.id,
                            denominacion: documento.denominacion,
                            destalle: documento.destalle,
                            palabra_clave: documento.palabra_clave,
                            fecha_actualizacion: documento.fecha_actualizacion,
                            etiquetas: documento.etiquetas,
                            tipo:'INT'
                        };

                        return <Card key={index*100} evento={{ ...tarjeta }} />
                    })}
                </div>                
                <div className='cards'>
                    {faqs.length !== 0 && faqs.map((faq,index) => {
                        let tarjeta = {
                            id: faq.id,
                            denominacion: faq.denominacion,
                            destalle: faq.destalle,
                            palabra_clave: faq.palabra_clave,
                            fecha_actualizacion: faq.fecha_actualizacion,
                            etiquetas: faq.etiquetas,
                            tipo:'FAQ'
                        };

                        return <Card key={index*1000} evento={{ ...tarjeta }} />
                    })}
                </div> 
            </div>
    
            <Link to='/nuevodocumento'>
                <div className="card">
                    <div className='titulo'>
                        <h3><i class="fa-solid fa-file"></i>    Nuevo Documento</h3>
                    </div>
                    <p>permite ingresar un documento y relacionarlo a una o varias opciones del menú</p>
                </div>
            </Link>

            <Link to='/nuevafaq'>
                <div className="card">
                    <div className='titulo'>
                        <h3><i class="fa-solid fa-clipboard-question"></i>     Nueva Pregunta Frecuente</h3>
                    </div>
                    <p>permite ingresar una pregunta frecuente  y relacionarlo a una o varias opciones del menú</p>
                </div>
            </Link>

            <Link to='/nuevoevento'>
                <div className="card">
                    <div className='titulo'>
                        <h3><i class="fa-solid fa-gears"></i>    Nuevo Evento</h3>
                    </div>
                    
                    <p>permite ingresar un nuevo evento  a una o varias opciones del menú</p>
                </div>

            </Link>                
        </div>

    </> );
}

export default Documentos;