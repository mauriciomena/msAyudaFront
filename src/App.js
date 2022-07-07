import './App.css';
import Menu from './components/Menu';
import Cards from './components/Cards';
import Landing from './components/Landing';
import { Route, Routes } from 'react-router-dom'



function App() {
  return (
    <div className='App'>
      <div className='menu'>
        <Menu/> 
      </div>  
        <div className='contenedor'>
          <Routes>
            <Route exact path="/" element={<Landing/>} ></Route>
            <Route exact path="/menu/:id" element={<Cards/>} ></Route>
          </Routes>
        </div>
    </div>
    
    
  );
}

export default App;
