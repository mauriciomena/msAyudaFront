import {useState, useRef, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import dataserver from '../dataserver';
import './css/AddOpcion.css'
import './css/nuevoDocumento.css'


const server = dataserver;
function NuevoDocumento(props) {
    // const [ id, setId] = useState(0);
    const [ errores, setErrores] = useState({});
    const [ totalErrores, setTotalErrores] = useState([]);    
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
        
        console.log(errores);
        console.log('Object.keys(errores).length',Object.keys(errores).length);

        if (Object.keys(errores).length){
        } else{
            const formData = new FormData();  
        
            if( tipo != 'EVE'){
                formData.append("documento",documento.current.files[0])
            }
            formData.append("titulo",titulo.current.value)
            formData.append("descripcion",descripcion.current.value)
            formData.append("etiquetas",etiquetas.current.value)
            formData.append("tipo",tipo)

            const endpoint = tipo !== 'EVE'? server+"/menu/adddocumentos/" : server+"/menu/addevento/" 
            
            if (tipo !== 'EVE') {
                fetch(endpoint,
                    {
                        method: 'POST',
                        headers: {
                            'access-token': "token si se usa"
                        },
                        body: formData
                    } )
                    .then(result => result.json())
                    .then(response => {         
                       console.log('response',response);
                      setErrores(response.errors)
                      response.errors && response.errors.documento?  setArchivo(response.errors.documento): setArchivo('')
                    })
                    .catch(console.warn)  
            } else{
                fetch(endpoint,
                    {
                        method: 'POST',
                        headers: {
                            'access-token': "token si se usa",
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(
                            { 'titulo' : titulo.current.value,
                            'descripcion': descripcion.current.value,
                            'etiquetas': etiquetas.current.value,
                            'tipo': tipo
                        })
                    } )
                    .then(result => result.json())
                    .then(response => {         
                        
                      setErrores(response.errors)
                      console.log(response.errors);

                      response.errors && response.errors.documento?  setArchivo(response.errors.documento): setArchivo('')
                      
                    })
                    .catch(console.warn)  
            }
            
        }
    };

    const validaTitulo = (e)=>{
        let err  = errores
        delete err.titulo
        setErrores(err)

        const valor = e.target.value        
        if (valor===null || valor===''){
            setErrores({
                ...errores,
                titulo: {
                    msg: 'El título no puede quedar vacio '
                }
            })
            setTotalErrores( totalErrores ++ )
        } else
            if (tipo === 'EVE' && valor.length > 50){
                setErrores({
                    ...errores,
                    titulo: {
                        msg: 'El evento no puede contener más de 50 caracteres'
                    }
                })
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
                
                    {tipo === 'INT' ? <h2>Nuevo Documento</h2> : tipo === 'EVE' ? <h2>Nuevo Evento</h2> : <h2>Nueva pregunta frecuente</h2>}
                    {console.log('errores', errores )}
                    { errores && errores.id && errores.id > 0 &&  <Navigate to={`/editdocumento/${errores.id}`} replace={true} /> }
                    <div id='nuevoDocumento' >
                        {
                            Object.keys(errores).length > 0 &&
                            <div className='msgerror'>
                                {errores && errores.documento && <p>{errores.documento.msg} </p>}

                            </div>
                        }

                        <form encType="multipart/form-data" method="post" onSubmit={(e) => { subir(e) }} name="uploadArc">
                            <div>
                                <label>
                                    {tipo === 'INT' ? 'Titulo del Documento' : tipo === 'EVE' ? 'Nombre del Evento:' : 'Pregunta:'}
                                    <input ref={titulo}
                                        onBlur={(e) => validaTitulo(e)}
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
                                    <textarea ref={descripcion}
                                        onBlur={(e) => validaDescripcion(e)}
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
                                        onBlur={(e) => validaEtiqueta(e)}
                                        className='inpt'
                                        type='text'
                                        id='etiquetas'
                                        placeholder='#etiqueta'
                                        maxlength="1000" />
                                </label>
                                {errores && errores.etiqueta && <p>{errores.etiqueta.msg}</p>}
                            </div>
                            {tipo != 'EVE' &&
                                <div>
                                    <label for="file">Seleccione el archivo</label>
                                    <input className='file'
                                        ref={documento}
                                        type="file"
                                        id="documento"
                                        required
                                        name="documento"
                                        accept=".pdf, .doc,.docx, .mp4" />
                                    {errores && errores.documento && <p>{errores.msg}</p>}
                                </div>
                            }

                            <div className='botones' >
                                <input className='btn' type="submit" value="Enviar" />

                            </div>
                        </form>
                    </div>
                    {/* opciones de menú */}

                </>
            
            );
        };

export default NuevoDocumento;
