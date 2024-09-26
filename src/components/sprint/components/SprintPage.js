import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"

export const SprintPage = () => {
    const navigate = useNavigate();
    const sprints = [40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]
    return (
        <main >
        <div>
            <h2>Pagina que muestra todos los sprints</h2>
        </div>
        
        <div className="contenedorsp">

            {sprints.map(i=>{
                return <Card onClick={()=>navigate(`/sprint/${i}`)} key={`sp${i}`}>
                    <h3>Sprint {i}</h3>
                    <p>el objetivo es...</p>
                </Card>
            })}
            
        </div>

        </main>
  )
}
