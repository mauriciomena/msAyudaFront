import {useState, useRef, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import dataserver from '../dataserver';
import './css/AddOpcion.css'
import './css/nuevoDocumento.css'
import ValorPosible from './ValorPosible';
const server = dataserver;


function EditNuevoDocumento() {
    const  { id } = useParams();
    const [ archivo, setArchivo] = useState('');   
    const [menu,setMenu] = useState([])
    const [data,setData] = useState([])
    const [opc, setOpc] = useState([])
    const [lista,setLista] = useState([])
    const [valores,setValores] = useState([])
    const [erroresAdd,seterroresAdd] = useState([]) 
    const [contador , setContador] = useState(0)
    const [nuevos , setnuevos] = useState([])
    
    useEffect(() => {
        fetch(server + '/menu/buscomenu')
            .then(response => response.json())
            .then(data => {
                setMenu(data.data)
            })
            .catch(error => console.log(error));

            fetch(`${server}/menu/evento/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);                
                setArchivo(data.evento)
                setValores(data.data)
                //seteo las opciones ya relacionadas
                let opciones = data.evento.opciones
                let relacion = []
                opciones.map((opcion)=>{
                    relacion.push({
                        id_ayuda: opcion.id,
                        id_menu: opcion.id_menu,
                        opcion: opcion.vw_menu.opcion
                    })
                })
                setLista(relacion)
                console.log('archivo',archivo);
                console.log('valores',valores);
                
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let listado = lista
        listado.push(opc)        
        setLista(listado)
    }, [opc])

    useEffect(() => {
        const eventoVacio = {
            id: 0,
            id_ayuda: id,
            denominacion_valor: '',
            valor: '',
            imgurl:''
        }
        let datos = nuevos
        datos.push(eventoVacio)
        setnuevos(datos)

    }, [contador])

    const buscar = ( e )=> {
        let valorBuscado = e.target.value
        let resultado = menu.filter(opcion=>opcion.descripcion.includes(valorBuscado))
        setData(resultado)
    }

    const enviar = (event) => {
        event.preventDefault();
        let relacion = {
            id_ayuda: event.target[1].value,
            id_menu: event.target[0].value,
            opcion: event.target[2].value
        }
        setOpc(relacion)
        //quito la opcion de data
        let datalocal =  data.filter(opcion => opcion.id !== relacion.id_menu)
        setData(datalocal)
        //quito la opcion del menu para que no vuelva ser buscado
        let menulocal =  menu.filter(opcion => opcion.id !== relacion.id_menu)
        setMenu(menulocal)

        const formData = new FormData();  
        formData.append("idAyuda",event.target[1].value)
        formData.append("idOpcion",event.target[0].value)

        fetch(server + "/menu/vinculadocmenu/", {
            method: 'POST',
            headers: {
                'access-token': "token si se usa",
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                { 'idAyuda' : event.target[1].value,
                'idOpcion': event.target[0].value})
        }).then(result => result.json())
            .then(response => {
                console.log('response', response);
                seterroresAdd(response.data)
            })
            .catch(console.warn)
    };

    const agregar = ()=>{
        let eventosnuevos = contador
        eventosnuevos += 1 
        setContador(eventosnuevos)
    }

    return (   <>                
                    <div id='AddOpcion'>
                        <div>
                            <a href={archivo.archivo}><h2> <i class="fa-solid fa-file-pdf"></i>  {archivo.denominacion} </h2></a>
                            <h3>{archivo.destalle}</h3>
                            <h4>{archivo.etiquetas}</h4>
                        </div>
                        
                        {lista.map((opcion, index) => <p className='add' key={index}>{opcion.opcion}</p>)}

                        <div>
                            <form encType="multipart/form-data" method="get" name="busopcion">
                                <label>Buscar Opción:</label>
                                <input type="text"
                                    placeholder='Factura especial'
                                    onChange={(e) => { buscar(e) }}
                                />
                            </form>


                            {data.map((opcion, index) =>
                                <form encType="multipart/form-data" method="post" name="vinculo" onSubmit={e => enviar(e)}>
                                    <input type="hidden" id={opcion.id + ''} name={opcion.id + ''} value={opcion.id + ''} />
                                    <input type="hidden" name='idayuda' value={archivo.id + ''} />
                                    <input type="hidden" name='opcion' value={opcion.opcion} />
                                    <p key={index}>{opcion.opcion} <input id='btn' type="submit" value="agregar" /> </p>
                                </form>)}
                            {/* onClick={() => { enviar(opcion.id, opcion.opcion) }}  */}
                        </div>

                        <div className='valoresEvento'>
                            <h3>Valores Posibles para el evento {archivo.denominacion} </h3>
                            <button onClick={agregar}>Nuevo</button>

                            {nuevos.map((valor,index)=>{
                                return ( <ValorPosible data={valor} key={`new${index}`}/>)                                
                            })}

                            {valores.map((valor,index)=>{
                                 return ( <ValorPosible data={valor}  key={index}/>)                                
                            })}
                            
                        </div>
                    </div>
                </>
            
            );
        };

export default EditNuevoDocumento;
