import {useState, useRef} from 'react';
import dataserver from '../dataserver';
import './css/nuevoDocumento.css'


const server = dataserver;
function NuevoDocumento(props) {
    // const [ id, setId] = useState(0);
    const [ errores, setErrores] = useState([]);
    const documento     = useRef()
    const titulo        = useRef()
    const descripcion   = useRef()
    const etiquetas     = useRef()

    const subir = (e)=>{
        e.preventDefault();
        const formData = new FormData();  
        
        formData.append("documento",documento.current.files[0])
        formData.append("titulo",titulo.current.value)
        formData.append("descripcion",descripcion.current.value)
        formData.append("etiquetas",etiquetas.current.value)
        
        fetch(server+"/menu/adddocumentos/",
        {
            method: 'POST',
            headers: {
                'access-token': "token si se usa"
            },
            body: formData
        } )
        .then(result => result.json())
        .then(response => {         
            console.log(response); 
          setErrores(response.errors)
        })
        .catch(console.warn)  
    };


    return (   <>
                 <div id='nuevoDocumento' >
                    {errores && errores.msg && <p>{errores.msg}</p>}
                    
                    <form encType="multipart/form-data" method="post" onSubmit={(e)=>{subir(e)}}  name="uploadArc">
                        <div>
                            <label>
                                Titulo de Documento:
                                <input ref={titulo}
                                        className='inpt'
                                        type='text' 
                                        id='titulo'
                                        placeholder='' />
                            </label>
                        </div>
                        <div>   
                            <label>
                                Descripcion corta:
                                <input ref={descripcion}
                                        className='inpt'
                                        type='text' 
                                        id='descripcion'
                                        placeholder='' />
                            </label>
                        </div>
                        <div>
                            <label>
                                Etiquetas:
                                <input ref={etiquetas}
                                        className='inpt'
                                        type='text' 
                                        id='etiquetas'
                                        placeholder='' />
                            </label>
                        </div>

                        <label for="file">Seleccione el archivo</label>
                        <input ref={documento} type="file" id="documento" name="documento" required accept="image/*,.pdf"/>
                        {errores && errores.documento && <p>{errores.msg}</p>}
                        <div>
                            <input className='btn' type="submit" value="Enviar" />
                            <input className='btn' type="reset" value="limpiar" />                        
                        </div>
                    </form>
                 </div>
                </>
            
            );
}

export default NuevoDocumento;
