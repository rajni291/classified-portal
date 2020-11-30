import React, { Component } from 'react';
import './Category.css'
import property from '../core/assets/property.png';
import vehicle from '../core/assets/vehicle.png';
import miscellaneous2 from '../core/assets/miscellaneous2.png';
import furniture2 from '../core/assets/furniture2.png';
import electronics2 from '../core/assets/electronics2.png';
import home from '../core/assets/home.png';

class Cateogry extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }


    getImageSrc = (id) => {

        switch (id.toLowerCase()) {
            case 'prop':
                return property;
            case 'vcl':
                return vehicle;
            case 'elec':
                return electronics2;
            case 'fur':
                return furniture2;
            case 'misc':
                return miscellaneous2;
            case 'home':
                return home;
            default:
                return this.url + 'notFound.png';
        }
    }


    render() {
        return (
            <div className="category-container">
                <div className="cateogry-title">Browse Categories</div>
                <div className="tile-container">
                    {
                        this.props.categories.map((item, i) => {
                            return (
                                <div key={i} className="category-tile">
                                    <div className="category-text">{item.catName}</div>
                                    <div className="icon-container">
                                        <img  className="category-icon" src={this.getImageSrc(item.catId)} alt="" height="70px" />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

// Cateogry.defaultProps ={
//     categories: PropTypes.array = []
// }


export default Cateogry;