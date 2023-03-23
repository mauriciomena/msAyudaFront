
import { useEffect, useState, useRef} from 'react';
import '../components/css/valorposible.css'
import dataserver from '../dataserver';

function ValorPosible(props) {
    const [errores, setErrores] = useState()
    const [valor , setValor] = useState()
    const [denoValor , setDenoValor] = useState()
    const imagen = useRef()

    const data = props.data
    console.log('data',data);

    useEffect(()=>{
        setValor(data.valor)
        setDenoValor(data.denominacion_valor)
    },[])


    const enviar = (e)=>{
        e.preventDefault();
        
         const formData = new FormData()
         formData.append('id_ayuda',data.id_ayuda)
         formData.append('id',data.id)
         formData.append('denominacion_valor',denoValor)
         formData.append('valor',valor)
         formData.append('imagen',imagen.current.files[0])
         
         
         fetch(dataserver+"/menu/addvalorposilble/",
        {
            method: 'POST',
            headers: {
                'access-token': "token si se usa"
            },
            body: formData
        } )
        .then(result => result.json())
        .then(response => {       
          console.log(response );  
          setErrores(response.errors)
        })
        .catch(console.warn)  
    }

    const handdleValor       = (e) => { setValor(e.target.value)}
    const handdleDescripcion = (e) => { setDenoValor(e.target.value) }
    
    const deletevalor = () => { 
        
        fetch(dataserver+"/menu/delvalorposilble/",
        {
            method: 'POST',
            headers: {
                'access-token': "token si se usa",
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: data.id
            })
        } )
        .then(result => result.json())
        .then(response => {   
          console.log('response.errors',response.errors);    
          setErrores(response.errors)
        })
        .catch(console.warn)  

     }
    

    return ( <>
        <div id='valorposible' name="valorPosible" >
            <form encType="multipart/form-data" method="post" onSubmit={e => enviar(e)}>
                
                { errores && errores.msg && errores.msg.length > 0 && <p key={`msj${data.id}`} className='alerta'>{errores.msg} </p>}  
                {/* { errores && errores.msg && <p> {errores.msg} </p>}   */}
                
                <input type="hidden" name='idayuda' value={data.id_ayuda} />
                <input type="hidden" name='id' value={data.id} />
                
                <label>Descripción:</label>
                <input type="text"  name='denominacion_valor' onChange={e=>handdleDescripcion(e)} value={denoValor} maxlength="50" />
                
                <label>Valor:</label>
                <input type="text"  name='valor' onChange={e=>handdleValor(e)} value={valor}  maxlength="50" />
                
                <label>Imagen Actual:</label>
                <img src={data.imgurl} />
                
                <label>Actualizar imagen:</label>
                <input ref={imagen}  type="file" id="imagen" name="imagen" accept="image/png, image/jpeg" />
                
                <input className='btn' id='btn' type="submit" value="Guardar" />            
            </form>

            <button className='btn' id='borrar' onClick={deletevalor}>Borrar</button>

        </div>
    </> );
}

export default ValorPosible;
