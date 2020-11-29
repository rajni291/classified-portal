import React, { Component } from 'react';
import header from '../header.png';
import { HashRouter as Router, Route, Switch, NavLink, useLocation } from 'react-router-dom';
import './Home.css';
import Category from '../category/Category';
import PostAd from '../postAd/PostAd';
import {categoryService} from '../category/CategoryService';
import { createBrowserHistory } from "history";


class Home extends Component {


    state = {
        allCategories: [],
        loading: true
    }


    componentDidMount() {
        this.history = createBrowserHistory()

        categoryService.getAllCategory().then(result => {
            this.setState(
                {  allCategories: result, 
                    loading: false 
                });
        })

    }

    render() {
        return (
            !this.state.loading  && this.state.allCategories.length >0 &&  <div>
                <Router>
                    <header className="App-header">

                        <img className="dashboard-tabs-icon" src={header} alt="" height="70px" />

                        <NavLink to="/category" activeClassName="active" className="Link-header" >
                            <div className="title"> One Click</div>
                        </NavLink>

                        <NavLink to="/postadd" className="Link-header"  >
                            <div className="post" >Post Ads</div>
                        </NavLink>

                    </header>

                    <div className="content-body">
                        {
                            <Router>
                                <Switch>
                                    <Route exact path="/category" component={()=> <Category categories={this.state.allCategories} />} />
                                    <Route exact path="/postadd" component={()=> <PostAd categories={this.state.allCategories} />} />
                                    <Route exact path="/" component={()=> <Category categories={this.state.allCategories} />} />
                                </Switch>
                            </Router>
                        }
                    </div>
                </Router>

                <footer className="footer">About us</footer>
            </div>
        )
    }
}


   export default Home;