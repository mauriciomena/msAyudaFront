import {useState, useEffect, useRef} from 'react';
import dataserver from '../dataserver';
import './css/Uploadfile.css'

const server = dataserver;
function UploadFiles(props) {
    // const [ id, setId] = useState(0);
    const [ errores, setErrores] = useState([]);
    const imagen = useRef()

    const subir = (e)=>{
        e.preventDefault();
        const formData = new FormData();  
        
        formData.append("id",props.id)
        formData.append("imagen",imagen.current.files[0])
        
        fetch(server+"/menu/upfilevaloresposibles/",
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
                 <div className='uploadFiles' id="subir">
                    {errores && errores.msg && <p>{errores.msg}</p>}
                    {console.log(props.id)}
                    
                    <form encType="multipart/form-data" method="post" onSubmit={(e)=>{subir(e)}}  name="uploadArc">
                        <label for="file">Seleccione el archivo</label>
                        <input ref={imagen} type="file" id="imagen" name="imagen" required accept="image/*,.pdf"/>
                        {errores && errores.imagen && <p>{errores.msg}</p>}
                        <div>
                            <input type="submit" value="Enviar" className="primary"/>
                            <input type="reset" value="limpiar" className="cancel"/>                        
                        </div>
                    </form>
                 </div>
                </>
            
            );
}

export default UploadFiles;
