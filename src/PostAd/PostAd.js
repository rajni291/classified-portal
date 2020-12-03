import React, { Component } from 'react';
import './PostAd.css';
import firebase from '../core/firebase';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';


class PostAd extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

    state = {
        categories: [],
        subCategories: [],
        selectedCategory: undefined,
        selectedSubCatgory: undefined,
        adType: undefined,
        country: undefined,
        description: '',
        location: '',
        price: '',
        title: '',
        isRedirected: false
    }


    categorySelected = event => {
        this.setState({ subCategories: [] });
        let currentVal = event.target.value;
        let selectCateogry = this.props.categories.filter(x => x.catId === currentVal)[0];

        this.setState({
            selectedCategory: currentVal,
            subCategories: selectCateogry.subCategory
        });
    }

    subCategorySelected = event => {
        this.setState({ selectedSubCatgory: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state, 'submit');

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        today.setSeconds(0);

        let data = {
            adType: this.state.adType,
            contact: 957612022,
            description: this.state.description,
            listingId: uuidv4(),
            subcategoryId: this.state.selectedSubCatgory,
            country: this.state.country,
            location: this.state.location,
            owner: this.props.owner.email,
            startDate: today,
            title: this.state.title,
            isSoldout: false
        }

        let userActivityRef = firebase.firestore().collection('ClassfiedAds');
        userActivityRef.where('catId', '==', this.state.selectedCategory).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    // var listItem = [];
                    userActivityRef.doc().set({
                        catId: this.state.selectedCategory,
                        adListing: [data]
                    }).then(() => {
                        this.setState({ isRedirected: true });

                    });
                }

                snapshot.forEach(userDoc => {
                    let updatedData = userDoc.data();
                    updatedData.adListing.push(data);
                    userActivityRef.doc(userDoc.id).update(updatedData).then(() => {
                        this.setState({ isRedirected: true });
                    })

                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    }

    render() {
        if (this.state.isRedirected)
            return (<Redirect to='/allAds' />)
        return (
        <div className="category-container">
            <div className="postAdBorder">
                <div className="postAd-title">Post Ads</div>
                <form onSubmit={this.handleSubmit} className="post-form form-container">
                    <div className="table-wrapper">
                        <label className="first-label">
                            Category
                        </label>
                        <select className="second-label form-select" value={this.state.selectedCategory} onChange={this.categorySelected}>
                            <option value="" key="-1"></option>
                            {
                                this.props.categories.map((item, i) => {
                                    return (
                                        <option value={item.catId} key={i}>{item.catName}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">
                            Sub Category
                    </label>
                        <select className="second-label form-select" value={this.state.selectedSubCatgory} onChange={this.subCategorySelected}>
                            <option value="" key="-1"></option>
                            {
                                this.state.subCategories.map((item, i) => {
                                    return (
                                        <option value={item.subCatId} key={i}>{item.subCatName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">
                            Ad Type
                        </label>
                        <select className="second-label form-select" value={this.state.adType} onChange={(e) => this.setState({ adType: e.currentTarget.value })}>
                            <option value="" key="-1"></option>
                            <option value="Sell" key="1">Sell</option>
                            <option value="Rent" key="2">Rent</option>

                        </select>
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">
                            Country
                        </label>
                        <select className="second-label form-select" value={this.state.country} onChange={(e) => this.setState({ country: e.currentTarget.value })}>
                            <option value="" key="-1"></option>
                            <option value="India" key="ind">India</option>
                            <option value="England" key="eng">England</option>
                            <option value="Ireland" key="wale">Wales</option>

                        </select>
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">
                            Location
                    </label>
                        <input type="text" className="second-label form-select"
                            value={this.state.location} onChange={(e) => this.setState({ location: e.currentTarget.value })} />

                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">Contact Number</label>
                        <input className="second-label form-select" type="number" value={this.state.contact} onChange={(e) => this.setState({ contact: e.currentTarget.value })} />
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">Ad Title</label>
                        <input className="second-label form-select" type="string"
                            value={this.state.title} onChange={(e) => this.setState({ title: e.currentTarget.value })} />
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">Description</label>
                        <textarea className="second-label descr"
                            value={this.state.description} onChange={(e) => this.setState({ description: e.currentTarget.value })} />
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">Price</label>
                        <input className="second-label form-select" type="number" value={this.state.price} onChange={(e) => this.setState({ price: e.currentTarget.value })} />
                    </div>

                  <div className="submit"><input type="submit" value="Post" /></div>

                </form>

            </div>
               
        </div>
    )
}
}

export default PostAd;