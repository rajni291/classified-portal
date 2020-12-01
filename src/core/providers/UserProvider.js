import { render } from '@testing-library/react';
import React, { Component, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../../home/Home';
import { auth } from '../firebase';


export const UserContext = createContext({user: null});

 class UserProvider extends Component {
     state={
         user: null
     }

     componentDidMount = () =>{
         auth.onAuthStateChanged(userAuth =>{
             if(userAuth)
             this.setState({user: userAuth});
         })
     }

     render(){
         return(           
            <UserContext.Provider value={this.state.user}>
            {this.props.children}
            </UserContext.Provider>
         )
     }
 }


export default UserProvider;