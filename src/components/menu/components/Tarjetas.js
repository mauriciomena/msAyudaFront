import React, { useContext } from 'react'
import Cards from '../../Cards'
import { MenuContext } from '../context/MenuProvider'

export const Tarjetas = () => {
   const {idOpcion}=useContext(MenuContext);
   
  return (
      <div className="tarjetas">  
        <div className='ayuda'>
            {idOpcion > 0 && <Cards id={idOpcion} />}
        </div>
      </div>)
};
