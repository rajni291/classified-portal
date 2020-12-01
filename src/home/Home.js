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
        loading: true,
        loggedout: false
    }

    constructor(props) {
        super(props);
        if (this.props.currentUser) {
            this.email = this.props.currentUser.email;
            this.loggedout = false;
        }

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

    signout = () => {
        this.setState({ loggedout: true })
        firebase.auth().signOut().then(function () {
            console.log('signed out successfully')

            // Sign-out successful.
        }).catch(function (error) {
            console.log('sign out failed')
            // An error happened.
        });
    }


    render() {
        if (this.state.loggedout) {
            return (<div>
                    <div className={this.state.loggedout ? 'show' : 'hide'}>you are signed out successful</div>
                </div>)
        }

        return (
            !this.state.loading && this.state.allCategories.length > 0 && <div>
                <Router>
                    <header className="App-header">

                        <img className="dashboard-tabs-icon" src={header} alt="" height="70px" />

                        <NavLink to="/category" activeClassName="active" className="Link-header" >
                            {/* <div className="title"> One Click</div> */}
                        </NavLink>

                        <NavLink to="/postadd" className="Link-header"  >
                            <div className="post" >Post Ads</div>
                        </NavLink>

                        <div className="profile" onClick={() => this.signout()}>{this.email}</div>

                    </header>

                    <div className="content-body">
                        {
                            <Router>
                                <Switch>
                                    <Route exact path="/" component={() => <Category categories={this.state.allCategories} />} />

                                    <Route exact path="/category" component={() => <Category categories={this.state.allCategories} />} />
                                    <Route exact path="/postadd" component={() => <PostAd categories={this.state.allCategories} />} />
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