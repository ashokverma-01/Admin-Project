import React from 'react'
import './navbar.scss'
import {Notifications} from '@mui/icons-material'
import Logout from '../../Pages/Logout'
function Navbar() {
  return (
    <div className='navbar'>
        <div className='navwrapper'>
            <div className='topLeft'>
                <span className='logo'>
                  <p>ADMIN</p>  
                </span>
            </div>
            <div className='topRight'>
            <div className="topIconcontainer">
            <Notifications/>
            <span className="topIconBadge" >
                2
            </span>
            </div>           
            <Logout/>
        </div>
        
        </div>
        </div>
  )
}

export default Navbar