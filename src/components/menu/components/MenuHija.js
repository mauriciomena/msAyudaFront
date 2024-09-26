import { useMenu } from "../hooks/useMenu";

export const MenuHija = ({ opcion }) => {
  const {getHijas, setOpenOption, isOpen } = useMenu();
  return (
    <> 
            {  <ul >  {getHijas(opcion).map(i => {
                  return <li className='click' 
                              id={i.id} 
                              key={i.opcion}
                              >
                              <span onClick={()=>setOpenOption(i.opcion)}>{i.descripcion}</span>
                              {isOpen(i.opcion)&& <MenuHija opcion={i.opcion}/>}
                          </li>  }
              )}
          </ul>
        }
    </> ) 
};