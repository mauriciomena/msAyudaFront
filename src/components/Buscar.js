import { useState, useEffect, useRef } from 'react';
import dataserver from '../dataserver';

import './css/buscar.css'

function Buscar() {

    const [ eventos,SetEventos ]= useState([])
    const [ valorBuscado,SetvalorBuscado ]= useState('')
    
    let endPoint = dataserver+'/menu/buscar'

    useEffect(() => {
        const formData = new FormData();          
        formData.append("buscar",valorBuscado)        

        fetch(endPoint,{
            method: 'GET',
            headers: {
                'access-token': "token si se usa"
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            SetEventos(data.data)
            
        })
        .catch(error => console.log(error));

    }, [valorBuscado])

    const handdlebuscar = (e) => SetvalorBuscado(e.current.value)

    return ( <div className='buscar'>
                <form>

                    <input onChange={(e)=>{handdlebuscar(e)}}  type="text"></input>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    
                </form>
            </div> );
}

export default Buscar;