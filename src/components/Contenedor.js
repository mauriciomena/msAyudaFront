import Menu from './Menu';
import Cards from './Cards';
import { Route, Routes } from 'react-router-dom'
import './css/contenedor.css'

import InfoAyuda from './InfoAyuda';
import EditEvento from './EditEvento';

import Documentos from './Documentos';
import NuevoDocumento from './NuevoDocumento';
import Sprint from './Sprint';
import EditNuevoDocumento from './EditNuevoDocumento';

import Landing from './Landing';
import Login from './User/Login';


function Contenedor() {
    return (<div className='contenedor'>

        <Routes>
            <Route exact path="/" element={<Landing />} ></Route>
            <Route exact path="/menu" element={<Menu />} ></Route>
            <Route exact path="/documentos" element={<Documentos />} ></Route>
            <Route exact path="/nuevodocumento" element={<NuevoDocumento id='INT' />} ></Route>
            <Route exact path="/editdocumento/:id" element={<EditNuevoDocumento />} ></Route>
            <Route exact path="/nuevafaq" element={<NuevoDocumento id='FAQ' />} ></Route>
            <Route exact path="/nuevoevento" element={<NuevoDocumento id='EVE' />} ></Route>
            {/* <Route exact path="/menu/:id" element={<Cards />} ></Route> */}
            <Route exact path="/menu/evento/:id" element={<InfoAyuda />} ></Route>
            <Route exact path="/evento/edit/:id" element={<EditEvento />} ></Route>
            <Route exact path="/sprint/:id" element={<Sprint />} ></Route>
            <Route exact path="/login" element={<Login />} ></Route>            
        </Routes>

    </div>
    );
}

export default Contenedor;