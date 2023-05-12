import { useEffect, useState } from 'react' ;
import dataserver from '../../tareasServer'
import DetaVersion from './DetaVersion';
import './css/dashboard.css'

function InfoVersion() {
    const [data, SetData] = useState([]);
    const [version, setVersion] = useState({});

    const endpoint = dataserver +'/entregas/compilaciones'
    useEffect(()=>{
        fetch(endpoint)
        .then(response => response.json())
        .then(data=>{
            
            SetData(data.data)
            }
        ).catch(error=>{
            console.log(error)
        })
    },[]);

    const handdleDropDown =() => { 
        
        setVersion(JSON.parse(event.target.value))}

    return ( <div className='InfoVersion'>

            <select className='DropDownVersion' onChange={ handdleDropDown } name="versiones" id="versiones">
            { data && data.length > 0 &&
                data.map(ver => {
                    // return (<p key={ver.version+ver.sistema} className='CardVersion' onClick={ ()=>setVersion( ver ) }>  </p>)
                    return  <option                             
                                value={ JSON.stringify(ver) }>
                                    {ver.deno_sistema} Version: {ver.version}
                            </option>
                })  
                }
            </select>
            { version.version && <DetaVersion version={version}/>}
            
            
    </div> );
}

export default InfoVersion;