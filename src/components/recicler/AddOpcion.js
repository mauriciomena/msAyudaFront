import {useEffect, useState} from 'react';
import dataserver from '../dataserver';
import './css/AddOpcion.css'

function AddOpcion(props) {
    const [menu,setMenu] = useState([])
    const [data,setData] = useState([])
    const [erroresAdd,seterroresAdd] = useState([])

    useEffect(() => {
        fetch(dataserver + '/menu/buscomenu')
            .then(response => response.json())
            .then(data => {
                setMenu(data.data)
            })
            .catch(error => console.log(error));
    }, [])

    const buscar = ( e )=> {
        let valorBuscado = e.target.value
        let resultado = menu.filter(opcion=>opcion.descripcion.includes(valorBuscado))
        setData(resultado)
    }

    const enviar = (id) => {
        const formData = new FormData()
        const idAyuda = props.id
        
        formData.append('idAyuda',idAyuda)
        formData.append('idOpcion',id)

        console.log('idAyuda',idAyuda);
        console.log('id',id);
        fetch(dataserver + "/menu/addOpcion/",
            {
                method: 'POST',
                headers: {
                    'access-token': "token si se usa"
                },
                body: formData
            })
            .then(result => result.json())
            .then(response => {

                seterroresAdd(response.errors)
                // response.errors && response.errors.archivo ? setArchivo(response.errors.archivo) : setArchivo('')
            })
            .catch(console.warn)
    };
    
    return ( < >
        <div className='AddOpcion'>
            
            <form encType="multipart/form-data" method="get" name="busopcion">
                <label>Buscar Opción:</label>
                <input type="text"
                    placeholder='Factura especial'
                    onChange={(e)=>{buscar(e)}}
                />
            </form>
            <tr>
                <th>opcion</th>                              
                {data.map(opcion =>  <td>{opcion.opcion} <button onClick={()=>{console.log(opcion.id);}  }  >Agregar</button> </td> )}                
            </tr>
        </div>
    </> );
}

export default AddOpcion;
