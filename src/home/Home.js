import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './Home.css';
import Category from '../category/Category';
import PostAd from '../postAd/PostAd';
import CategoryDetail from '../categoryDetail/CategoryDetail';
import firebase from '../core/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'


class Home extends Component {


    state = {
        allCategories: [],
        loading: true,
        loggedout: false,
        showmenu: false
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

            });

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
            return (<div className="sign-out">
                <div className={this.state.loggedout ? 'show' : 'hide'}>you are signed out successfully</div>
            </div>)
        }

        return (
            !this.state.loading && this.state.allCategories.length > 0 && <div>
                <Router>
                    <div className="profile-header">
                        <div className="home" >
                            <NavLink to="/" className="Link-header" >
                                <FontAwesomeIcon icon={faHome} />
                            </NavLink>
                        </div>
                        <div className="profile" onClick={() => this.setState({ showmenu: !this.state.showmenu })}>
                            <div className="profile-text" >{this.email}</div>
                            <div className="pull-right" >
                                <FontAwesomeIcon icon={faUserCircle} />
                            </div>
                            <div className={this.state.showmenu ? 'item-show' : 'item-hide'} onClick={this.signout}>  
                            <a href="/" onClick={this.signout}>sign out</a>
                            </div>
                        </div>

                    </div>


                    <NavLink to="/category" activeClassName="active" className="Link-header" >
                        {/* <div className="title"> One Click</div> */}
                    </NavLink>


                    <div className="content-body">
                        {
                            <Router>
                                <Switch>
                                    <Route exact path="/" component={() => <Category categories={this.state.allCategories} />} />
                                    <Route exact path="/category" component={() => <Category categories={this.state.allCategories} />} />
                                    <Route exact path="/postadd" component={() => <PostAd categories={this.state.allCategories} owner={this.props.currentUser} />} />
                                    <Route exact path="/categoryDetail/:catId" component={() => <CategoryDetail categories={this.state.allCategories} />} />
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