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

    const handdleDropDown =(e) => { setVersion(JSON.parse(e.target.value))}
    const handleSubmit    =(e) => { 
            e.preventDefault()
            
            const  inicial  = e.target[0].value
            const  final    = e.target[1].value    
            setVersion({
                ...version,
                version:0,
                inicial:inicial,
                final: final,
            })
        }

    return ( <div className='InfoVersion'>

            <form onSubmit={ handleSubmit }>
                <label>Fecha Incial</label>
                <input className='fecha' id='inicial' name='inicial' type='date'>
                </input>

                <label>Fecha Final</label>
                <input className='fecha' id='final' name='final' type='date' >
                </input>

                <input type='submit' className='btn' value="Filtrar"/>

            </form>        

            <select className='DropDownVersion' onChange={ handdleDropDown } name="versiones" id="versiones">
            { data && data.length > 0 &&
                data.map((ver,i) => {
                    // return (<p key={ver.version+ver.sistema} className='CardVersion' onClick={ ()=>setVersion( ver ) }>  </p>)
                    return  <option key={ver.version+i}                            
                                value={ JSON.stringify(ver) }>
                                    {ver.deno_sistema}   Version: {ver.version}
                            </option>
                })  
                }
            </select>
            <DetaVersion version={version}/>
            
    </div> );
}

export default InfoVersion;