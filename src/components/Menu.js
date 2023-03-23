import './css/menu.css'
import React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom' ;
import Buscar from './Buscar';
import dataserver from '../dataserver';
import Cards from '../components/Cards'
// import SubMenu from './SubMenu';


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

    const handleclick = (e)=>{     
        const id = e.target.getAttribute("id")
        setIdMenu(id);

        // let id = 0 ;

        // document.querySelectorAll(".click").forEach(el => {
        //     el.addEventListener("click", e => {

        //       id = e.target.getAttribute("id");
        //       console.log(id);
        //       //const elemento = document.getElementById(id);
        //       //const hijas = getHijas(id);     
        //     });
        //   }); 

        // console.log(id);
        // //setIdMenu(id)
    };


    return (
        <div className='Menu'>
            { menu.length === 0 && <p>Cargando Menu...</p>  }
            {
                <ul className='tree' onClick={e=>handleclick(e)}>
                    {madres.map((op, index) => {
                        return <li key={op.madre.opcion}>{op.madre.descripcion}
                            <ul >{op.hija.map(hi => <li key={hi.opcion}>
                                {hi.descripcion}
                                <ul  > {getHijas(hi.opcion).map(i => <li className='click' id={i.id} key={i.opcion}>
                                    {/* <Link to={'menu/' + i.id}>{i.descripcion}  </Link> */}
                                    {i.descripcion}
                                    <ul  > {getHijas(i.opcion).map(j => <li className='click' id={j.id} key={j.opcion}>
                                        {/* <Link to={'menu/' + j.id}> {j.descripcion} </Link> */}
                                        {j.descripcion}
                                        <ul  > {getHijas(j.opcion).map(k => <li className='click' id={k.id} key={k.opcion}>
                                            {/* <Link to={'menu/' + k.id}>{k.descripcion}</Link> */}
                                            {k.descripcion}
                                            <ul  > {getHijas(k.opcion).map(h => <li className='click' id={h.id} key={h.opcion}>
                                                {/* <Link to={'menu/' + h.id}>{h.descripcion}</Link> */}
                                                {h.descripcion}
                                                <ul  > {getHijas(h.opcion).map(l => <li className='click' id={l.id} key={l.opcion}>
                                                    {/* <Link to={'menu/' + l.id}>{l.descripcion}</Link> */}
                                                    {l.descripcion}
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
            <div className="tarjetas">
                  <div className='ayuda'> 
                        
                      {idMenu && idMenu > 0 && <Cards  id={idMenu}/>}
                  </div>
              </div>
        </div>
    )
}
export default Menu;