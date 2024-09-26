import { useEffect, useState } from 'react' ;
import dataserver from '../../tareasServer'
import './css/dashboard.css'

function DetaVersion(  version ) {
    const [data, SetData] = useState([]);
    let endpoint = dataserver +'/entregas'

    useEffect(()=>{
        
        const ver = version.version
        
        if (ver.version > 0 ){
           endpoint = dataserver +'/entregas/?version='+ver.version+'&'+'sistema='+ver.sistema
        } else{            
           endpoint = dataserver +'/entregas/fordate?inicial='+ver.inicial+'&'+'final='+ver.final
        }

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
          { version.version.version  > 0 && <h3> Detalle de la versión {version.version.version} de {version.version.deno_sistema} </h3>}
          
          <ul>
          { data && data.length > 0 &&
                data.map((incidente, index) => {
                    return (
                    <li key={incidente.id  + index} > 
                        <i className={incidente.tipo_incidente==='E' || incidente.tipo_incidente==='R'?"fa-solid fa-bug":"fa-solid fa-circle-info"}></i>
                        
                        <span>{  version.version.inicial? `${incidente.deno_sistema} Versión: ${incidente.version}` :'' }</span>
                        <br/>
                        <span>{incidente.fecha} {incidente.asunto} {incidente.deno_tipo_incidente} </span>
                        <br/>
                        <p> {incidente.tarea} incidente: {incidente.id}</p>
                    </li>
                    )
                })  
            }
            </ul>
            
            
    </div> );
}

export default DetaVersion;