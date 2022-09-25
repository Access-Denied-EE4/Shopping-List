import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {Link, useNavigate} from 'react-router-dom';
import {MenuBarData} from "./MenuBarData";
import { IconContext } from 'react-icons';
import './MenuBar.css';

function MenuBar() {

//false by default as dont want it showing 
const [sidebar, setSidebar]=useState(false);

const showSideBar=()=>setSidebar(!sidebar);

  return (
    <>
        <div className='menubar'>
            {/* menu bar icon from react icons*/}
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSideBar}/>
            </Link>
        </div>
        {/* if we clicked on side bar, show nav-menu active else show nav-menu*/}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className="menubar-toggle">
                    <Link to="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose onClick={showSideBar} color={'#fff'}/>
                    </Link>
                </li>
                {MenuBarData.map((item, index) =>{
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </>
  )
}

export default MenuBar;