import './App.css';
import Menu from './components/Menu';
import Cards from './components/Cards';
import Landing from './components/Landing';
import { Route, Routes } from 'react-router-dom'

import ValoresPosibles from './components/ValoresPosibles';
import EditEvento from './components/EditEvento';
import NavBar from './components/NavBar';



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
              <Route exact path="/" element={<Landing/>} ></Route>
              <Route exact path="/menu/:id" element={<Cards/>} ></Route>
              <Route exact path="/menu/evento/:id" element={<ValoresPosibles/>} ></Route>
              <Route exact path="/evento/edit/:id" element={<EditEvento/>} ></Route>
                            
            </Routes>
          </div>
      </div>
    </>
    
  );
}

export default App;
