import React from 'react';
import {useEffect, useState} from 'react';

function SubMenu( hijas) {

    const  [child, SetChild] = useState([])

    useEffect(()=>{

       SetChild(hijas.hijas)
       console.log(child);
        
    },[child])
    
    return (  
        
        <>
            <ul>
                { child.map(hija=> <li key={hija.opcion}> {hija.descripcion}  </li>)}

            </ul>
        </>
    );
}

export default SubMenu;