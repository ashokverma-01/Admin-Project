import React, { useEffect } from 'react'
import './sidebar.scss'
import { AccountBalanceWallet, ManageAccounts, Analytics, Assignment, Chat, Feedback, Inventory, Mail, People, Timeline } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from "react-icons/fa";

function Sidebar() {

    const location = useLocation();

    useEffect(() => {

    }, [location])

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to='/' className='link'>
                            <li className={"sidebarListItem" + (location.pathname == '/' ? " active" : "")}>
                                <FaHome className='sidebarIcons' />Home
                            </li>
                        </Link>
                        {/* <li className="sidebarListItem">
                            <Analytics className='sidebarIcons' /> Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className='sidebarIcons' /> Sales
                        </li> */}
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList" >
                        <Link to='/users' className='link'>
                            <li className={"sidebarListItem" + (location.pathname.startsWith('/user') ? " active" : "")} >
                                <People className='sidebatIcons' /> Users
                            </li>
                        </Link>
                        {/* <Link to='/products' className='link'>
                            <li className={"sidebarListItem" + (location.pathname.startsWith('/product') ? " active" : "")}>
                                <Inventory className='sidebarIcons' /> Products
                            </li>
                        </Link> *
                        <li className="sidebarListItem">
                            <Assignment className='sidebarIcons' /> Reports
                        </li>
                        <li className="sidebarListItem">
                            <AccountBalanceWallet className='sidebarIcons' /> Transactions
                        </li> */}
                    </ul>
                </div>

                {/* <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem ">
                            <Mail className='sidebatIcons' /> Mail
                        </li>
                        <li className="sidebarListItem">
                            <Feedback className='sidebarIcons' /> Feedback
                        </li>
                        <li className="sidebarListItem">
                            <Chat className='sidebarIcons' /> Messages
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem ">
                            <ManageAccounts className='sidebatIcons' /> Manage
                        </li>
                        <li className="sidebarListItem">
                            <Analytics className='sidebarIcons' /> Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Assignment className='sidebarIcons' /> Reports
                        </li>
                    </ul>
                </div> */}


            </div>
        </div >
    )
}

export default Sidebar