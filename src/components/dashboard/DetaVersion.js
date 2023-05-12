import { useEffect, useState } from 'react' ;
import dataserver from '../../tareasServer'
import './css/dashboard.css'

function DetaVersion(  version ) {
    const [data, SetData] = useState([]);
    
    useEffect(()=>{
        const ver = version.version
        const endpoint = dataserver +'/entregas/?version='+ver.version+'&'+'sistema='+ver.sistema
        
        fetch(endpoint)
        .then(response => response.json())
        .then(data=>{            

            const incidentes = data.data.map( incidente => {
                //let fechaFormateada = `${incidente.fecha.substring(10,2)}/${incidente.fecha.substring(4,2)}/${incidente.fecha.substring(0,4)}`
                let fechaFormateada = `${incidente.fecha.substring(8,10)}-${incidente.fecha.substring(5,7)}-${incidente.fecha.substring(0,4)}`
                return {...incidente,
                            fecha:fechaFormateada }  }
            )
            SetData(incidentes)

            }
        ).catch(error=>{
            console.log(error)
        })
    },[version]);

    return ( <div id='DetaVersion'>
          { version.version.version && <h3> Detalle de la versión {version.version.version} de {version.version.deno_sistema} </h3>}
          <ul>
          { data && data.length > 0 &&
                data.map(incidente => {
                    return (
                    <li key={incidente.id} > 
                        <h4 className='titulo'> 
                            <i className={incidente.tipo_incidente==='E' || incidente.tipo_incidente==='R'?"fa-solid fa-bug":"fa-solid fa-check"}></i>
                            {incidente.fecha} {incidente.asunto} {incidente.deno_tipo_incidente}
                        </h4>
                        <p> {incidente.tarea} incidente: {incidente.id}</p>
                    </li>
                    )
                })  
            }
            </ul>
            
            
    </div> );
}

export default DetaVersion;