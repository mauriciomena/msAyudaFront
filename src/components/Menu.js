import './css/menu.css'
import React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom' ;
import Cards from './Cards';
import dataserver from '../dataserver';

function Menu(){
    const [ menu, setMenu ]       = useState([])
    const [ madres, setMadres ]       = useState([])
    const [ idMenu, setIdMenu ]       = useState([])   

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
        fetch(dataserver+'/menu')
        .then(response => response.json())
        .then(data => {
            console.log(data);
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

    const handleclick = (opcion)=>{

        console.log('opcion',opcion);
        
        // const elemento = document.getElementById(opcion.opcion)
        // const hijas = getHijas(opcion.opcion)
        // console.log('hijas',hijas);
        // console.log('elemento',elemento);
        // const  ul = document.createElement('ul') 
        // const  li = document.createElement('li') 
        
        // if (hijas.length>0){
        //     var newul= elemento.appendChild(ul);
        //     console.log(hijas);
        //     hijas.map(i=>{
        //         return newul.appendChild(li).innerText=i.descripcion;
        //     })

            
            
        // }

        setIdMenu(opcion.id)
        
    }
    const addspace = (nivel)=>{
        let space = ''
        for (let i = 0; i < nivel; i++) {
            space = space + '>'
        }
        
        return space
    }

    return (<div className='Menu'>

            <div className='tree'>
                <ul >
                    {console.log(menu)}
                    {menu.map((i,index)=>{
                        return<li key={i.opcion} onClick={e=>handleclick(i)} > { addspace(i.nivel) + i.descripcion} </li>
                    })}


                {/* {madres.map((op, index) => {
                        return <li key={op.madre.opcion}>{op.madre.descripcion}
                            <ul >{op.hija.map(hi => <li key={hi.opcion}> {hi.descripcion}
                                <ul> {getHijas(hi.opcion).map(i => <li key={i.opcion} onClick={e=>handleclick(i)}>{i.descripcion} 
                                    <ul> {getHijas(i.opcion).map(j => <li key={j.opcion} onClick={e=>handleclick(j)}> {j.descripcion} 
                                        <ul  > {getHijas(j.opcion).map(k => <li key={k.opcion}  onClick={e=>handleclick(k)}>{k.descripcion}
                                            <ul  > {getHijas(k.opcion).map(h => <li key={h.opcion} onClick={e=>handleclick(h)}>{h.descripcion}
                                                <ul  > {getHijas(h.opcion).map(l => <li key={l.opcion} onClick={e=>handleclick(l)}>{l.descripcion}
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
                    })} */}
                </ul>
            </div>
            
        
        <div className="tarjetas">
            <div className='ayuda'> 
                <Cards  id={idMenu}/>
            </div>
        </div>
    </div>
    
    )
}
export default Menu;