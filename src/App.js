import './App.css';
import Menu from './components/Menu';
import Cards from './components/Cards';
import { Route, Routes } from 'react-router-dom'

import InfoAyuda from './components/InfoAyuda';
import EditEvento from './components/EditEvento';
import NavBar from './components/NavBar';
import Documentos from './components/Documentos';
import NuevoDocumento from './components/NuevoDocumento';
import ValoresPosibles from './components/ValoresPosibles'


function App() {
  return (
    <>
      <NavBar/>
      <div className='App'>
        <div className='menu'>
          <Menu/> 
        </div>  
          <div className='contenedor'>
            <Routes>
              <Route exact path="/" element={<Documentos/>} ></Route>
              <Route exact path="/documentos" element={<Documentos/>} ></Route>
              <Route exact path="/nuevodocumento"   element={ <NuevoDocumento id='INT'/>} ></Route>              
              <Route exact path="/nuevafaq"  element={ <NuevoDocumento id='FAQ' />} ></Route>              
              <Route exact path="/nuevoevento"  element={ <NuevoDocumento id='EVE' />} ></Route>                            
              <Route exact path="/menu/:id" element={<Cards/>} ></Route>
              {/* <Route exact path="/menu/evento/:id" element={<ValoresPosibles/>} ></Route> */}
              <Route exact path="/menu/evento/:id" element={<InfoAyuda/>} ></Route>
              <Route exact path="/evento/edit/:id" element={<EditEvento/>} ></Route>
                            
            </Routes>
          </div>
      </div>
    </>
    
  );
}

export default App;
