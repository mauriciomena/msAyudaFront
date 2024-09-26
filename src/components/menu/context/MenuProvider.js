import React, { useState, createContext } from 'react';

// 1. Crear el contexto
export const MenuContext = createContext();

// 2. Crear un componente proveedor del contexto
export const MenuProvider =({ children }) =>{
  const [idOpcion, setIdOpcion] = useState(0);

  return (
    <MenuContext.Provider value={{ idOpcion, setIdOpcion }}>
      {children}
    </MenuContext.Provider>
  )
};