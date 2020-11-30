import React, { Component } from 'react';
import './PostAd.css';

class PostAd extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

    state = {
        categories: [],
        subCategories: [],
        selectedCategory: null
    }


    categorySelected = event => {
        this.setState({ subCategories: [] });
        let currentVal = event.target.value;
        let selectCateogry = this.props.categories.filter(x => x.catId === currentVal)[0];

        this.setState({
            selectCateogry: selectCateogry,
            subCategories: selectCateogry.subCategory
        });
    }

    render() {
        return (
            <div className="category-container ">
            <div className="cateogry-title">Post Ads</div>
                <form onSubmit={this.handleSubmit} className="post-form form-container">
                    <div className="table-wrapper">
                        <label className="first-label">
                            Category
                        </label>
                        <select className="second-label form-select" value={this.state.value} onChange={this.categorySelected}>
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
                        <select className="second-label form-select" value={this.state.value} onChange={this.handleChange}>
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
                        <label className="first-label">Price</label>
                        <input className="second-label form-select" type="number"></input>
                    </div>

                    <div className="table-wrapper">
                        <label className="first-label">Description</label>
                        <textarea  className="second-label descr" />

                    </div>

                    <div><input type="submit" value="Post" /></div>
                </form>

            </div>
        )
    }


}

export default PostAd;