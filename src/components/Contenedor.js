
import { Route, Routes } from 'react-router-dom'
import './css/contenedor.css'

import InfoAyuda from './InfoAyuda';
import EditEvento from './EditEvento';

import Documentos from './Documentos';
import NuevoDocumento from './NuevoDocumento';

import EditNuevoDocumento from './EditNuevoDocumento';

import Landing from './Landing';
import InfoVersion from './dashboard/InfoVersion';
import Sprint from './sprint/Sprint';
import { SprintPage } from './sprint/components/SprintPage';
import { Container } from 'react-bootstrap';
import Menu from './menu/components/Menu';
import { MenuProvider } from './menu/context/MenuProvider';
import { MenuPage } from './menu/pages/MenuPage';



function Contenedor() {
    return ( <Container>
                <Routes>
                    <Route exact path="/" element={<Landing />} ></Route>
                    <Route exact path="/menu" element={ <MenuPage />} ></Route>
                    <Route exact path="/documentos" element={<Documentos />} ></Route>
                    <Route exact path="/nuevodocumento" element={<NuevoDocumento id='INT' />} ></Route>
                    <Route exact path="/editdocumento/:id" element={<EditNuevoDocumento />} ></Route>
                    <Route exact path="/nuevafaq" element={<NuevoDocumento id='FAQ' />} ></Route>
                    <Route exact path="/nuevoevento" element={<NuevoDocumento id='EVE' />} ></Route>
                    {/* <Route exact path="/menu/:id" element={<Cards />} ></Route> */}
                    <Route exact path="/menu/evento/:id" element={<InfoAyuda />} ></Route>
                    <Route exact path="/evento/edit/:id" element={<EditEvento />} ></Route>
                    <Route exact path="/sprints" element={<SprintPage />} ></Route>
                    <Route exact path="/sprint/:id" element={<Sprint />} ></Route>
                    <Route exact path="/compilaciones" element={<InfoVersion />} ></Route>            
                    
                </Routes>
            </Container>
    );
}

export default Contenedor;