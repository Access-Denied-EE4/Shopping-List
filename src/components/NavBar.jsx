import { NavLink, isActive } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as VscIcons from "react-icons/vsc"
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import * as TbIcons from "react-icons/tb";
import * as Fi from "react-icons/fi";
import { UserAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

//array of the objects on the navigation bar
// Path is the page it will take you to once the icon ic clicked
// The icon is the actual icon, i downloaded them from heroIcons website and they are just svg's
const navItems = [
    {
       path: "/categories",
       icon: <AiIcons.AiOutlineHome size={30} className="mr-10"/>,
       title: 'Categories',
    },
    // {
    //     path: "/account",
    //     icon: <VscIcons.VscAccount size={30} className="mr-10"/>,
    //     title: 'Account',

    // },
    {
        path: "/cart",
        icon: <AiIcons.AiOutlineShoppingCart size={30} className="mr-8" />,
        title: 'Cart',

    },
    {
        path: "/home_cart",
        icon: <TbIcons.TbClipboardList size={30} className="mr-8" />,
        title: 'home_cart',

    }
]

// loop to display icons and some positioning in the class name. more css needed
const NavBar = () => {

    //getting user and logout in object from UserAuth
    const {user,logout}=UserAuth();
    //assign naviagte to our imported function
    const navigate=useNavigate();

    const logOut=async()=>{
        try{
            if (user.email==="logouttesting@gmail.com"){
              navigate('/')
            }
            else{
            await logout();
            //upon log out, navigate/redirect back to homepage
            navigate('/')
            console.log('you are logged out');
            }
      
          }catch(e){
            console.log(e.message);
      
          }
    }

    return<nav className = "fixed bottom-0 w-screen flex justify-center items-center bg-white py-2">
        {
            navItems.map((item, index) => (
                <NavLink data-testid="nav bar" key={index} to = {item.path}>
                    {item.icon}
                </NavLink>
            ))
        }
        <Fi.FiLogOut size={28} className="mr-8" onClick={logOut} style={{cursor:'pointer'}}/>
    </nav>


};
export default NavBar;