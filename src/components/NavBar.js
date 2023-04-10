import './css/navBar.css'
import Buscar from './Buscar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
  //const  [ respost, setRespost] = useState('');
   /* prueba post senasa*/

    // const testpost = ()=>{
    //     var myHeaders = new Headers();
    //     myHeaders.append("Cookie", "PHPSESSID=ig2ilevf47coccahjtlcf5rovk");
    //     myHeaders.append("access-token", "token si se usa");

    //     var formdata = new FormData();
    //     formdata.append("products[0][id_product_code]", "8897");
    //     formdata.append("products[0][batchId]", "04-21");
    //     formdata.append("products[0][amount]", "1");
        
    //     var requestOptions = {
    //                         method: 'POST',
    //                         headers: myHeaders,
    //                         body: formdata,
    //                         redirect: 'follow'
    //                         };
    //     fetch("https://test.senasa.gov.ar/agrotraza/src/api/Alta_Envio?authUser=ELBOZAL&authPass=ELBOZAL2021&userTaxId=30568664430&sendDate=20230208&senderDepositId=2023&receiverCompanyCuit=30-50065891-2&receiverDepositId=2985", 
    //     {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: formdata,
    //         redirect: 'follow'
    //         } )
    //     .then(response => response.text())
    //     .then(result => {
    //         console.log(result)
    //         setRespost(result)
    //     } )
    //     .catch(error => {console.log('error', error)});

    // };

    /* prueba post senasa*/
    return ( <>
                <div className='navBar'>
                    {/* <div>logo</div> */}
                    
                    
                    <div className='logo'>
                        <Link to='/'> <h2> <img src='/logoms.png'/></h2></Link>
                    </div>
                    <div className='navegacion'>
                        <ul>
                            <Link to='/documentos'><li>Buscar</li></Link>
                            <Link to='/menu'><li>Menu</li></Link>
                            <Link to='/documentos'> <li>Documentos</li></Link>
                            <Link to='/documentos'> <li>FAQ</li></Link>
                            <Link to='/documentos'> <li>Eventos</li></Link>
                            <Link to='/sprint/13'>  <li>Sprint</li></Link>
                            {/* <Link to='/login'>  <li>Iniciar Sesión</li> </Link> */}

                            {/* /prueba post senasa */}
                            {/* <li onClick={testpost()}>Test post</li> */}
                            {/* prueba post senasa  */}
                        </ul>
                    </div>
                    {/* <Buscar /> */}
                    <div className='user'><i class="fa-solid fa-user"></i></div>

                    
                        {/* <div id="logo">
                            <img  src="m1.png"></img>
                        </div> */}
                    {/* <div>usuario</div>                     */}
                </div>
    </> );
}

export default NavBar; 