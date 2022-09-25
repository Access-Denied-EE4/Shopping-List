import { NavLink, isActive } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as VscIcons from "react-icons/vsc"

//array of the objects on the navigation bar
// Path is the page it will take you to once the icon ic clicked
// The icon is the actual icon, i downloaded them from heroIcons website and they are just svg's
const navItems = [
    {
       path: "/categories",
       icon: <AiIcons.AiOutlineHome size={30} className="mr-10"/>,
       title: 'Categories',
    },
    {
        path: "/account",
        icon: <VscIcons.VscAccount size={30} className="mr-10"/>,
        title: 'Account',
      
    },
    {
        path: "/dairy",
        icon: <AiIcons.AiOutlineShoppingCart size={30} className="mr-8" />,
        title: 'Cart',
      
    }
]

// loop to display icons and some positioning in the class name. more css needed
const NavBar = () => {
    return<nav className = "fixed bottom-0 w-screen flex justify-center items-center bg-white py-2">
        {
            navItems.map((item, index) => (
                <NavLink key={index} to = {item.path}>
                    {item.icon}
                </NavLink>
            ))
        }
    </nav>

    
};
export default NavBar;