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
      <div className='footer'>
          <h5>Macrosistemas SRL 2022</h5>
      </div>
    </>
    
  );
}

export default App;
