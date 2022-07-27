import {useState, useEffect, useRef} from 'react';
import './css/Uploadfile.css'


function UploadFiles(props) {
    const [ id, setId] = useState(0);
    const [ file, setFile] = useState(null);
    const [ errores, setErrores] = useState([]);

    const imagen = useRef()

    useEffect(()=>{
        setId(props.id)
    },[])
  

    // useEffect(()=>{
    //     const formData = new FormData();  
        
        
    //     formData.append("id",id)
    //     formData.append("image",file.current.files[0])

    //     fetch("http://192.168.10.95:3030/menu/upfilevaloresposibles/"+id,
    //     {
    //         method: 'POST',
    //         headers: {
    //             'access-token': "token si se usa"
    //         },
    //         body: formData                               
    //     } )
    //     .then(result => result.json())
    //     .then(response => {          
    //       setErrores(response.errors)
    //     })
    //     .catch(console.warn)  
    // },[file])


    const subir = (e)=>{
        e.preventDefault();
        setFile(imagen)
    };
    return (   <>
                 <div id="subir">
                    <form enctype="multipart/form-data" method="post" onSubmit={(e)=>{subir(e)}}  name="uploadArc">

                        <label for="file">Seleccione el archivo</label>
                        <input ref={imagen} type="file" id="imagen" name="imagen" required accept="image/*,.pdf"/>
                        {errores && errores.imagen && <p>{errores.msg}</p>}
                        <div>
                            <input type="submit" value="Enviar" ClassName="primary"/>
                            <input type="reset" value="limpiar" ClassName="cancel"/>                        
                        </div>

                    </form>
                 </div>
                </>
            
            );
}

export default UploadFiles;
