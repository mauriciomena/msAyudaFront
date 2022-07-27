import './css/menu.css'
import React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom' ;
import Buscar from './Buscar';
// import SubMenu from './SubMenu';


function Menu(){
    const [ menu, setMenu ]       = useState([])
    const [ madres, setMadres ]       = useState([])
    

    const getHijas = (idOpcion) =>{
        let child = []
        const hijas = menu.filter(opc => opc.opcion_madre === idOpcion)
        hijas.map(hija=> child.push({
            id: hija.id,
            opcion: hija.opcion,
            descripcion: hija.descripcion,
            ejecucion: hija.ejecucion,
        }))
        return child
    };

    useEffect(() => {
        fetch('http://192.168.10.22:8000/menu')
        .then(response => response.json())
        .then(data => {
            setMenu(data.data)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        let sistemas  = menu.filter(op => op.opcion_madre === null)
        let madres = []
        sistemas.map(opcion=>{ 
            let hijas = getHijas(opcion.opcion)
            //hijas indica que es una opcion madre
            if (hijas.length > 0){ 
                let pos = madres.indexOf(opcion)
                
                if ( pos === -1) {
                    let data = {
                        madre: { id: opcion.id,
                                 opcion: opcion.opcion,
                                 descripcion: opcion.descripcion,
                                 ejecucion: opcion.ejecucion },
                        hija: hijas
                    }
                    madres.push(data)
                } 
            }
            return 0            
        })
        setMadres(madres)
    }, [menu])


    return (
        <>
            { menu.length === 0 && <p>Cargando Menu...</p>  }
            {
                <ul className='Menu'>
                    {madres.map((op, index) => {
                        return <li key={op.madre.opcion}>{op.madre.descripcion}
                            <ul >{op.hija.map(hi => <li key={hi.opcion}>
                                {hi.descripcion}
                                <ul  > {getHijas(hi.opcion).map(i => <li key={i.opcion}>
                                    <Link to={'menu/' + i.id}>{i.descripcion}  </Link>
                                    <ul  > {getHijas(i.opcion).map(j => <li key={j.opcion}>
                                        <Link to={'menu/' + j.id}> {j.descripcion} </Link>
                                        <ul  > {getHijas(j.opcion).map(k => <li key={k.opcion}>
                                            <Link to={'menu/' + k.id}>{k.descripcion}</Link>
                                            <ul  > {getHijas(k.opcion).map(h => <li key={h.opcion}>
                                                <Link to={'menu/' + h.id}>{h.descripcion}</Link>
                                                <ul  > {getHijas(h.opcion).map(l => <li key={l.opcion}>
                                                    <Link to={'menu/' + l.id}>{l.descripcion}</Link>
                                                </li>)}
                                                </ul>
                                            </li>)}
                                            </ul>
                                        </li>)}
                                        </ul>
                                    </li>)}
                                    </ul>
                                </li>)}
                                </ul>
                            </li>)}</ul></li>
                    })}
                </ul>
            }
        </>
    )
}
export default Menu;