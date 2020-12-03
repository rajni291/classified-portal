import React, { Component } from 'react';
import { withRouter } from "react-router";
import firebase from '../core/firebase';
import bnglw1 from  '../core/assets/bnglw1.jpg';
import bnglw2 from  '../core/assets/bnglw2.jpg';
import bnglw3 from  '../core/assets/bnglw3.jpg';
import notFound from '../core/assets/noimage.jpg'

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

    state = {
        categoryId : "",
        categoryList:[],
        categoryType:{},
        loading: true
    }

    getSrc = (i) => {
        // let num=0;
        // for (var j = 0; j < 3; j+=2) {
        //     if (1 === 7) {
        //         break;
        //     }
        // }
        switch (i) {
            case 1:
                return bnglw1;
            case 2:
                return bnglw2;
            case 3:
                return bnglw3;
            default:
                return notFound;
        }
    }
    
    componentDidMount() {
      let categoryId =this.props.match.params.catId;
      let categoryType=this.props.categories.find(x => x.catId===categoryId);
      var classifiedRef = firebase.firestore().collection('ClassfiedAds');
      let CategoryAds = [];
      classifiedRef.where("catId", "==", categoryId).get()
      .then(snapshot => {
          snapshot.forEach(category => {
              var items = category.data()
              CategoryAds.push(items.adListing);
              console.log(CategoryAds);
          });
          this.setState(
              {
                  categoryList: CategoryAds,
                  categoryType:categoryType,
                  loading: false
              });
          
      });
    }


    render() {
        return (
            !this.state.loading && this.state.categoryList.length > 0 && <div className="category-browsecontainer">
                <div className="category-browsing">Browsing {this.state.categoryType.catName}</div>
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
                         this.state.categoryList[0].map((item,j) => {
                            return ( <div key={j} className="categoryDetail-tile" >
                            <div className="category-menu">
                                <img className="category-img" src={this.getSrc(j)} alt=""></img>
                             </div>
                         <div className="category-items">{item.description} - {j}</div>
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
