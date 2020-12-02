import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom';
import './Category.css'
import property from '../core/assets/property.png';
import vehicle from '../core/assets/vehicle.png';
import miscellaneous from '../core/assets/miscellaneous.png';
import furniture from '../core/assets/furniture.png';
import electronics from '../core/assets/electronics.png';
import home from '../core/assets/home.png';
import sell from '../core/assets/sell.png';
import firebase from '../core/firebase';


class Cateogry extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }
    state = {
        selectedCategoryAds: null
    }

    redirectCategoryDetail = (id) => {
        this.getAllAdsOfSelectedCateogry(id);
    }

    getAllAdsOfSelectedCateogry = (id) => {
        var classifiedRef = firebase.firestore().collection('ClassfiedAds');
        let CategoryAds = [];
        // eslint-disable-next-line no-undef
        classifiedRef.where("catId", "==", id).get()
            .then(snapshot => {
                snapshot.forEach(category => {
                    var items = category.data()
                    CategoryAds.push(items.adListing);
                });
                this.setState(
                    {
                        selectedCategoryAds: CategoryAds
                    });
                if (this.state.selectedCategoryAds)
                    this.props.history.push("/categoryDetail/" + id);
            });
    }

    getImageSrc = (id) => {

        switch (id.toLowerCase()) {
            case 'prop':
                return property;
            case 'vcl':
                return vehicle;
            case 'elec':
                return electronics;
            case 'fur':
                return furniture;
            case 'misc':
                return miscellaneous;
            case 'home':
                return home;
            default:
                return this.url + 'notFound.png';
        }
    }

    getbgColor = (id) => {

        switch (id.toLowerCase()) {
            case 'prop':
                return '#6048bec2';
            case 'vcl':
                return '#c14fcec2';
            case 'elec':
                return '#df5877c2';
            case 'fur':
                return '#5171e7c2';
            case 'misc':
                return '#20b833c2';
            case 'home':
                return '#6048bec2';
            default:
                return '#6048bec2';
        }
    }


    render() {
        return (
            <div>
                <div className="category-header">
                    <img className="dashboard-tabs-icon" src={sell} alt="" height="70px" />
                    <NavLink to="/postadd" className="Link-header"  >
                        <div className="post" >Post Ads</div>
                    </NavLink>
                </div>
                <div className="browse">
                    <div className="cateogry-title">Browse Categories</div>
                    <div className="tile-container">
                        {
                            this.props.categories.map((item, i) => {
                                return (
                                    <div key={i} className="category-tile" onClick={() => this.redirectCategoryDetail(item.catId)}>
                                        {/* <div className="category-text">{item.catName}</div> */}
                                        <img className="category-icon" src={this.getImageSrc(item.catId)} alt="" height="70px" />
                                        <div className="icon-container" style={{ backgroundColor: this.getbgColor(item.catId) }}>
                                            {item.catName}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Cateogry);