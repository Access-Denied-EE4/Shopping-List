import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io";

export const MenuBarData=[
    /* each object here is an item in the sidebar */
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
      },
      {
        title: 'Categories',
        path: '/categories',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Account',
        path: '/account',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
      }
];
