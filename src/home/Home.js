import React, { Component } from 'react';
import header from '../header.png';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './Home.css';
import Category from '../category/Category';
import PostAd from '../postAd/PostAd';
import firebase from '../core/firebase';

class Home extends Component {


    state = {
        allCategories: [],
        loading: true
    }


    componentDidMount() {
        var categoryRef = firebase.firestore().collection('Category');
        let cateData = [];
        // eslint-disable-next-line no-undef
        categoryRef.get()
            .then(snapshot => {
                snapshot.forEach(category => {
                    cateData.push(category.data());
                });

                this.setState(
                    {
                        allCategories: cateData,
                        loading: false
                    });

            })
    }

    render() {
        return (
            !this.state.loading && this.state.allCategories.length > 0 && <div>
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
                                    <Route exact path="/category" component={() => <Category categories={this.state.allCategories} />} />
                                    <Route exact path="/postadd" component={() => <PostAd categories={this.state.allCategories} />} />
                                    <Route exact path="/" component={() => <Category categories={this.state.allCategories} />} />
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