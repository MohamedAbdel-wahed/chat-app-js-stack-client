import React, {useContext} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { logout } from '../actions/auth'
import { AuthContext } from '../contexts/AuthContext'



function Navbar({history}) {
    
    const {authState , dispatch }= useContext(AuthContext)
    const {user} = authState

    const logoutUser= ()=> {
        dispatch(logout())
        history.push('/login')
    }

    return (
        <div id="navbar" className="w-full ml-auto flex items-center bg-white text-gray-700 overflow-hidden shadow-sm">
            <ul className="ml-auto flex items-center font-bold text-lg"> 
                {
                    user ?
                        (<>
                            <li className="mx-2 xs:mx-4 sm:mx-6">
                                <NavLink to="/" exact={true} className="inline-block pt-3 pb-2 px-4">
                                    <img src="/svg/home.svg" className="w-5 sm:w-6" alt="home page"/>  
                                </NavLink>
                            </li>
                            <li className="mx-2 xs:mx-4:mx-6">
                                <NavLink to="/requests" className="inline-block pt-3 pb-2 px-4">
                                    <img src="/svg/friends.svg" className="w-5 sm:w-6" alt="friends page"/>  
                                </NavLink>
                            </li>
                            <li className="mx-2 xs:mx-4 sm:mx-6">
                                <NavLink to="/explore" className="inline-block pt-3 pb-2 px-4">
                                    <img src="/svg/explore.svg" className="w-5 sm:w-6" alt="explore page"/>    
                                </NavLink>   
                            </li>
                            <li className="mx-4 xs:mx-6 sm:mx-8 sm:mx-12">
                                <NavLink to="/login" onClick={logoutUser} className="inline-block pt-3 pb-2 px-4">
                                    <img src="/svg/logout.svg" className="w-8" alt="logout button" title="logout" />  
                                </NavLink>
                            </li>
                        </>) :
                        (<>
                            <li className="hover:text-purple-200 mx-6 xs:mx-8 sm:mx-10">
                                <NavLink to="/login" className="inline-block pt-2 pb-1 px-3">Login</NavLink>
                            </li>
                            <li className="hover:text-purple-200 mx-6 xs:mx-8 sm:mx-10">
                                <NavLink to="/register" className="inline-block pt-2 pb-1 px-3">Register</NavLink>
                            </li>
                        </>)
                }
               
                
            </ul>
        </div>
    )
}

export default withRouter(Navbar)
