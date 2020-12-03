import React, { Component } from 'react';
import { withRouter } from "react-router";
import bnglw from '../core/assets/bnglw1.jpg';

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

    state = {
        categories: [],
        categoryId : "",
        categoryData:{},
        subCategory:[]
    }

    getSrc = (imgName) => {
        if(imgName!=="" || imgName!==undefined ){
            return "../core/assets/"+imgName;
        }
        else{
            return "../core/assets/noimage.jpg";;
        }
    }
    

    componentDidMount() {
      
      let categoryId =this.props.match.params.catId;
      let categoriesList=this.props.categories;
      let categoryData= categoriesList.filter((e) => e.catId === categoryId);
      if(categoryData.length!==0){
          this.setState(
          { 
              categoryId :  categoryId,
              categoryData:categoryData[0],
              subCategory: categoryData[0].subCategory
          })
      }

    }


    render() {
        return (
            <div className="category-browsecontainer">
                <div className="category-browsing">Browsing {this.state.categoryData.catName }</div>
                <hr />
                <div >
                    <div className="category-menu">
                    <div  className="menutile" >
                                    <div className="icon-container">
                                    Menu
                                    </div>
                                </div>
                    </div>
                    <div className="category-items">
                    {
                        this.state.subCategory.map((item,j) => {
                            return ( <div key={j} className="categoryDetail-tile" >
                            <div className="category-menu">
                                <img src={bnglw} alt=""></img>
                             </div>
                     <div className="category-items">{item.description}</div>
                         </div>
                            )
                        })
                    }
                    </div>
                </div>
           </div>
        )
    }
};

export default withRouter(CategoryDetail);
