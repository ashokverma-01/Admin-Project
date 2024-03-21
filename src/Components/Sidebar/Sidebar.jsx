import React from 'react';
import './sidebar.scss';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdTaxiAlert } from "react-icons/md";
import { FaPeopleRoof, FaCarSide } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className='sidebar'>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                theme="dark"
                defaultOpenKeys={['cab']}
            >
                <Menu.Item key="/">
                    <Link to="/" className='link'>
                        <FaHome className='sidebarIcons' />
                        <span style={{ marginLeft: '10px' }} className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="cab"
                    title={
                        <span>
                            <MdTaxiAlert className='sidebarIcons' style={{ marginTop: '10px' }} />
                            <span className="nav-text" style={{ marginLeft: '10px' }}>Cab Booking</span>
                        </span>
                    }
                >
                    <Menu.Item key="/users">
                        <Link to='/users' className='link'>
                            <ImUsers className='sidebarIcons' />
                            <span className="nav-text" style={{ marginLeft: '10px' }}>Users</span>
                        </Link>
                    </Menu.Item>
                    <Menu.SubMenu
                        key="cars"
                        title={
                            <span>
                                <FaCarSide className='sidebarIcons' />
                                <span className="nav-text" style={{ marginLeft: '10px' }}>Cars</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/brands">
                            <Link to='/brands' className='link'>
                                <span className="nav-text" style={{ marginLeft: '10px' }}>Brands</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/varients">
                            <Link to='/varients' className='link'>
                                <span className="nav-text" style={{ marginLeft: '10px' }}>Varients</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/cars">
                            <Link to='/cars' className='link'>
                                <span className="nav-text" style={{ marginLeft: '10px' }}>Cars</span>
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="/drivers">
                        <Link to='/drivers' className='link'>
                            <FaPeopleRoof className='sidebarIcons' />
                            <span className="nav-text" style={{ marginLeft: '10px' }}>Drivers</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
};

export default Sidebar;
