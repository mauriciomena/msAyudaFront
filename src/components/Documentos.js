import './css/documentos.css'
import {Link} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import server from '../dataserver';
import LongCard from './LongCard';

function Documentos() {
    const [ eventos, SetEventos ] = useState([]);
    const [ documentos, SetDocumentos ] = useState([]);
    const [ faqs, SetFaqs ] = useState([]);
    const [ filtro, SetFiltro ] = useState([])
    const buscado = useRef();    


    useEffect(()=>{
        fetch(server+"/menu/catalogo/")
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
    },[])


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
                 console.log(response);
                 let eveloc = response.data.filter(opcion => opcion.tipo === 'EVE')
                 SetEventos(eveloc)
                let docloc = response.data.filter(opcion => opcion.tipo === 'INT')                    
                SetDocumentos(docloc)            
                let faq = response.data.filter(opcion => opcion.tipo === 'FAQ')
                SetFaqs(faq)                        
            })
            .catch(console.warn)  
        } else{
            fetch(server+"/menu/catalogo/")
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
        }
        
    },[filtro])
  
    const buscar=()=>{ SetFiltro(buscado.current.value) };
    
    return ( <>
        <div className='documentos'>
        <Link to='/nuevodocumento'>
                <div className="cardAdd">
                    <div className='titulo'>
                        <h5><i class="fa-solid fa-file"></i> Nuevo Documento</h5>
                    </div>
                    {/* <p>permite ingresar un documento y relacionarlo a una o varias opciones del menú</p> */}
                </div>
            </Link>

            <Link to='/nuevafaq'>
                <div className="cardAdd">
                    <div className='titulo'>
                        <h5><i class="fa-solid fa-clipboard-question"></i> Nueva FAQ    </h5>
                    </div>
                    {/* <p>permite ingresar una pregunta frecuente  y relacionarlo a una o varias opciones del menú</p> */}
                </div>
            </Link>

            <Link to='/nuevoevento'>
                <div className="cardAdd">
                    <div className='titulo'>
                        <h5><i class="fa-solid fa-gears"></i>    Nuevo Evento</h5>
                    </div>
                    {/* <p>permite ingresar un nuevo evento  a una o varias opciones del menú</p> */}
                </div>
            </Link>  
            <div className='buscar'>
                <form>
                    <label>Buscador de eventos documentos y faqs:</label>
                    <input  ref={buscado} onChange={buscar} type="text" placeholder='como configurar...'/>
                </form>
                <br />
                
                {/* <img src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=http://www.macrosistemassrl.com.ar&amp;choe=UTF-8" /> */}
                <hr />
                 
                <h3>Últimas entradas:</h3>
                
                <div className='cards'>
                    <h4>Eventos</h4>
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
                        
                    return <LongCard key={index} evento={{...tarjeta}}/>
                    })}
                </div> 
                <div className='cards'>
                    <h4>Documentos</h4>
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

                        return <LongCard key={index*100} evento={{ ...tarjeta }} />
                    })}
                </div>                
                <div className='cards'>
                    <h4>Faqs</h4>
                    {faqs.length !== 0 && faqs.map((faq,index) => {
                        let tarjeta = {
                            id: faq.id,
                            denominacion: '¿'+faq.denominacion+'?',
                            destalle: faq.destalle,
                            palabra_clave: faq.palabra_clave,
                            fecha_actualizacion: faq.fecha_actualizacion,
                            etiquetas: faq.etiquetas,
                            tipo:'FAQ'
                        };

                        return <LongCard key={index*1000} evento={{ ...tarjeta }} />
                    })}
                </div> 
            </div>
    
                          
        </div>

    </> );
}

export default Documentos;