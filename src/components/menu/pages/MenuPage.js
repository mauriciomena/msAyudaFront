import Menu from "../components/Menu"
import { MenuProvider } from "../context/MenuProvider"

export const MenuPage = () => {
  return (
    <MenuProvider>
        <Menu />
    </MenuProvider>
  )
}
