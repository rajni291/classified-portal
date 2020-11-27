import React, { Component } from 'react';
import './Category.css'
import { categoryService } from './CategoryService';

class Cateogry extends Component {

    state={
        categories:[],
    }

    componentDidMount(){
        categoryService.getAllCategory().then(result => {
            this.setState({categories: result});
        })

    }

    render() {
        return (
            <div className="category-container">
                <div className="cateogry-title">Browse Categories</div>
                <div className="tile-container">
                {
                    this.state.categories.map((item, i) => {
                        return(
                            <div key={i} className="category-tile">
                            {item.category}
                            </div>
                        )
                    })
                }

                </div>
            </div>
        )
    }
}

export default Cateogry;