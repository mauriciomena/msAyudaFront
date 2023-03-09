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

            //-----------------
            let sistemas  = data.data.filter(op => op.opcion_madre === null)
            // console.log('sistemas',sistemas);
            // let madres = []
            // sistemas.map(opcion=>{ 
            //     let hijas = getHijas(opcion.opcion)
            //     //hijas indica que es una opcion madre
            //     if (hijas.length > 0){ 
            //         let pos = madres.indexOf(opcion)
                    
            //         if ( pos === -1) {
            //             let data = {
            //                 madre: { id: opcion.id,
            //                          opcion: opcion.opcion,
            //                          descripcion: opcion.descripcion,
            //                          ejecucion: opcion.ejecucion },
            //                 hija: hijas
            //             }
            //             madres.push(data)
            //         } 
            //     }
            //     return 0            
            // })
            setMadres(sistemas)
            //----------------




        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        // let sistemas  = menu.filter(op => op.opcion_madre === null)
        // let madres = []
        // sistemas.map(opcion=>{ 
        //     let hijas = getHijas(opcion.opcion)
        //     //hijas indica que es una opcion madre
        //     if (hijas.length > 0){ 
        //         let pos = madres.indexOf(opcion)
                
        //         if ( pos === -1) {
        //             let data = {
        //                 madre: { id: opcion.id,
        //                          opcion: opcion.opcion,
        //                          descripcion: opcion.descripcion,
        //                          ejecucion: opcion.ejecucion },
        //                 hija: hijas
        //             }
        //             madres.push(data)
        //         } 
        //     }
        //     return 0            
        // })
        // setMadres(madres)
    }, [menu])

    const handleclick = ()=>{        
        document.querySelectorAll(".click").forEach(el => {
            el.addEventListener("click", e => {
              const id = e.target.getAttribute("id");
                 
              const elemento = document.getElementById(id);
              const hijas = getHijas(id);
     
              if (hijas.length > 0){
                  let cadena  = ''
                  for (let i of hijas) { cadena = cadena + "<li id="+i.opcion +" key="+i.opcion+" class=click>"+ addspace(i.nivel) + i.descripcion +"</li>"}
                  
                  elemento.insertAdjacentHTML('afterend', cadena);
              } else {
                 setIdMenu(id)
              }
            });
          });        
    };
    
    const addspace = (nivel)=>{
        let space = ''
        for (let i = 0; i < nivel; i++) {
            space = space + '>'
        }
        
        return space
    }

    return (<div className='Menu'>

            <div className='tree' onClick={handleclick()}>
                <ul >
                    
                    {madres.map((i)=>{
                        return<li id={i.opcion} key={i.opcion} className='click'> { addspace(i.nivel) + i.descripcion} </li>
                    })} 
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