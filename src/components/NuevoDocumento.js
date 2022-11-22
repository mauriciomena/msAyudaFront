import {useState, useRef, useEffect} from 'react';
import dataserver from '../dataserver';
import './css/AddOpcion.css'
import './css/nuevoDocumento.css'


const server = dataserver;
function NuevoDocumento(props) {
    // const [ id, setId] = useState(0);
    const [ errores, setErrores] = useState([]);
    const [ archivo, setArchivo] = useState('');   
    const [menu,setMenu] = useState([])
    const [data,setData] = useState([])
    const [opc, setOpc] = useState([])
    const [lista,setLista] = useState([])
    const [erroresAdd,seterroresAdd] = useState([]) 
    const [ tipo,setTipo] = useState([]);

    const documento     = useRef()
    const titulo        = useRef()
    const descripcion   = useRef()
    const etiquetas     = useRef()

    useEffect(() => {
        
        setTipo(props.id)
        fetch(server + '/menu/buscomenu')
            .then(response => response.json())
            .then(data => {
                setMenu(data.data)
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let listado = lista
        listado.push(opc)        
        setLista(listado)
    }, [opc])

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

    const subir = (e)=>{
        e.preventDefault();
        const formData = new FormData();  
        
        formData.append("documento",documento.current.files[0])
        formData.append("titulo",titulo.current.value)
        formData.append("descripcion",descripcion.current.value)
        formData.append("etiquetas",etiquetas.current.value)
        formData.append("tipo",tipo)
        
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
           
          setErrores(response.errors)
          response.errors && response.errors.documento?  setArchivo(response.errors.documento): setArchivo('')
        })
        .catch(console.warn)  
    };

    const validaTitulo = (e)=>{
        const valor = e.target.value        
        if (valor===null || valor===''){
            setErrores({
                ...errores,
                titulo: {
                    msg: 'El título no puede quedar vacio '
                }
            })
        } else {
            let err  = errores
            delete err.titulo
            setErrores(err)
        }
        
    };
    const validaDescripcion = (e)=>{
        const valor = e.target.value        
        if (valor===null || valor===''){
            setErrores({
                ...errores,
                descripcion: {
                    msg: 'Debe contener una descripción'
                }
            })
        }else{
            let err  = errores
            delete err.descripcion
            setErrores(err)
        }
        
    };
    const validaEtiqueta = (e)=>{
        const valor = e.target.value 
        if (valor === null || valor === '') {
            setErrores({
                ...errores,
                etiqueta: {
                    msg: 'Debe contener al menos una Etiqueta'
                }
            })
        } else {
            let err  = errores
            delete err.etiqueta
            setErrores(err)
        }           
        
    };

    return (   <>
                {/* cabecera */}
                
                {tipo==='INT'?<h2>Nuevo Documento</h2>:tipo==='EVE'?<h2>Nuevo Evento</h2>:<h2>Nueva pregunta frecuente</h2>}
                { (archivo.length === 0 )&&
                    <div id='nuevoDocumento' >
                        {errores && errores.msg && <p>{errores.msg} </p>}
                        
                        
                        <form encType="multipart/form-data" method="post" onSubmit={(e)=>{subir(e)}}  name="uploadArc">
                            <div>
                                <label>
                                    {tipo==='INT'? 'Titulo del Documento' :tipo==='EVE'?'Nombre del Evento:':'Pregunta:'}
                                    <input ref={titulo}
                                            onBlur={(e)=>validaTitulo(e)}
                                            className='inpt'
                                            type='text' 
                                            id='titulo'
                                            placeholder=''
                                            maxlength="50" />
                                </label>
                                {errores && errores.titulo && <p>{errores.titulo.msg}</p>}
                            </div>
                            <div>   
                                <label>
                                    Informacion adicional:
                                    <textarea  ref={descripcion}
                                            onBlur={(e)=>validaDescripcion(e)}
                                            className='inpt'
                                            type='text' 
                                            id='descripcion'
                                            placeholder='1000 caracteres para escribir lo que necesario'
                                            maxlength="1000">
                                                </textarea>
                                </label>
                                {errores && errores.descripcion && <p>{errores.descripcion.msg}</p>}
                            </div>
                            <div>
                                <label>
                                    Etiquetas:
                                    <input ref={etiquetas}
                                            onBlur={(e)=>validaEtiqueta(e)}
                                            className='inpt'
                                            type='text' 
                                            id='etiquetas'
                                            placeholder='#etiqueta'
                                            maxlength="50" />
                                </label>
                                {errores && errores.etiqueta && <p>{errores.etiqueta.msg}</p>}
                            </div>

                            <label for="file">Seleccione el archivo</label>
                            <input className='file' 
                                    ref={documento} 
                                    type="file"
                                    id="documento" 
                                    required
                                    name="documento" 
                                    accept="*.pdf"/>
                            {errores && errores.documento && <p>{errores.msg}</p>}
                            <div className='botones' >
                                <input className='btn' type="submit" value="Enviar" />
                                                        
                            </div>
                        </form>
                    </div> } 
                    {/* opciones de menú */}
                    {archivo!== undefined && archivo!== ''&& archivo!== null && 
                    <div id='AddOpcion'>
                        <div>                        
                            <a href={archivo.archivo}><h2> <i class="fa-solid fa-file-pdf"></i>  {archivo.denominacion} </h2></a>
                            <h3>{archivo.destalle}</h3>
                            <h4>{archivo.etiquetas}</h4>   
                        </div>
                        { lista.map((opcion,index) => <p className='add' key={index}>{opcion.opcion}</p> )} 
                        
                        <div>

                            <form encType="multipart/form-data" method="get" name="busopcion">
                                <label>Buscar Opción:</label>
                                <input type="text"
                                    placeholder='Factura especial'
                                    onChange={(e) => { buscar(e) }}
                                />
                            </form>


                            {data.map((opcion, index) =>
                            <form encType="multipart/form-data" method="post" name="vinculo" onSubmit={e=>enviar(e)}>
                                <input type="hidden" id={opcion.id+''}  name={opcion.id+''} value={opcion.id+''}/>
                                <input type="hidden" name='idayuda' value={archivo.id+''}/>
                                <input type="hidden" name='opcion' value={opcion.opcion}/>
                                <p key={index}>{opcion.opcion} <input id='btn' type="submit" value="agregar" /> </p>
                            </form> )}
                            {/* onClick={() => { enviar(opcion.id, opcion.opcion) }}  */}
                        </div>
                    </div>}
                </>
            
            );
}

export default NuevoDocumento;
