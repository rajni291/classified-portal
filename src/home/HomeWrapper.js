import React, { useContext } from 'react';
import './Home.css';
import Login from '../core/login/Login';
import Home from './Home';
import { UserContext } from '../core/providers/UserProvider';


function HomeWrapper () {
    const user = useContext(UserContext);
    return(
        user ? <Home  currentUser={user}/>:
        <Login isLoggedIn={user}></Login>
    )

}


export default HomeWrapper;