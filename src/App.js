import './App.css';

import Contenedor from './components/Contenedor';
import Navibar from './components/Navibar';



function App() {
  return (
    <>
      <Navibar />
      <div className='App'>
        <Contenedor/>
      </div>
    </>
    
  );
}

export default App;
