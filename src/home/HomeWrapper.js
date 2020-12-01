import React, { useContext } from 'react';
import header from '../header.png';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './Home.css';
import Category from '../category/Category';
import PostAd from '../postAd/PostAd';
import firebase from '../core/firebase';
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