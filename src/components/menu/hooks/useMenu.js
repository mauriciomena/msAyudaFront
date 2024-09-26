import { useContext, useEffect, useState } from "react"
import dataserver from "../../../dataserver"
import { MenuContext } from "../context/MenuProvider"

export const useMenu = () => {
    const [isloading, setIsLoading] = useState(true)
    const [menu, setMenu] = useState([])
    const [madres, setMadres] = useState([])
    const [ optionOpen, setOptionOpen] = useState([])
    const [ lastOption, setLastOption ] = useState(0)   
    const { setIdOpcion } = useContext(MenuContext); 
    
    const filtraMadres = (data)=>{
        const sistemas  = data.filter(op => op.opcion_madre === null)     
        setMadres(sistemas) 
    }

    useEffect(() => {
        setIsLoading(true)
        const menucache = JSON.parse(sessionStorage.getItem('menu'))
        if (menucache){
            filtraMadres(menucache)
            setMenu(menucache)
        };
        if (!menucache){
            fetch(dataserver + '/menu')
            .then(response => response.json())
            .then(data => {
                filtraMadres(data.data)            
                setMenu(data.data)
                sessionStorage.setItem('menu',JSON.stringify(data.data))   

            })
            .catch(error => console.log(error));
        }
        const lastOptionCache = JSON.parse(sessionStorage.getItem('lastoption'))
        setLastOption(lastOptionCache)
        setIsLoading(false)
    }, [])

    const getHijas = (idOpcion) =>{
        let child = []
        const hijas = menu.filter(opc => opc.opcion_madre === idOpcion)
        hijas.map(hija=> child.push({
            id: hija.id,
            opcion: hija.opcion,
            descripcion: hija.descripcion,
            ejecucion: hija.ejecucion,
        }))
        return child
    };
    const isOpen =(opcion)=>  optionOpen.filter(i=>i === opcion).length > 0

    const setOpenOption =(opcion)=>{     
        const {id} = menu.filter(i=>i.opcion === opcion)[0]
        setIdOpcion(id)
        setOptionOpen(isOpen(opcion)? optionOpen.filter(i=>i !== opcion): [...optionOpen,opcion])
        
    }
    return {
        isloading,
        madres,
        optionOpen,
        getHijas,
        setOpenOption,
        isOpen,
        lastOption
    }
}