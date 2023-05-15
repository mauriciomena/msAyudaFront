import './App.css';
import NavBar from './components/NavBar'
import Contenedor from './components/Contenedor';



function App() {
  return (
    <>
      <NavBar />
      <div className='App'>
        <Contenedor/>
      </div>
    </>
    
  );
}

export default App;
