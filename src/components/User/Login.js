import { useState } from "react";
import dataserver from "../../dataserver";


function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState('');

    const handdleUser = ( e )=>{ 
        setUsuario(e.target.value)  
     };

     const handdlePass = ( e )=>{ 
        setPassword(e.target.value)  
     };

     const enviar = (e)=> {
        e.preventDefault();
        const endpoint = dataserver+"/user/login"
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'access-token': "token si se usa",
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(
                    {
                        'usuario' : usuario,
                        'password' : password
                    }
                )
            } )
            .then(result => result.json())
            .then(response => {   
                setErrores(response.errors)                
            })
            .catch(console.warn)  
        };


    return ( <>

        <form onSubmit={e=>enviar(e)} >
            { errores &&  errores.msg && <p> {errores.msg} </p> }

            <div>
                <label>
                    Usuario:
                <input type="text" id="usuario" onChange={e=>handdleUser(e)}/>
                </label>
            </div>
            <div>
                <label>
                    Constraseña:
                <input type="password" id="password" onChange={e=>handdlePass(e)}/>
                </label>
            </div>

        </form>
    
    </> );
}

export default Login;