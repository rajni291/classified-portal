import React, { Component } from 'react';
import { withRouter } from "react-router";
import firebase from '../core/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import notFound from '../core/assets/noimage.jpg'
import  bunglow1 from '../core/categorytype/bunglow1.jpg'
import  bunglow2 from '../core/categorytype/bunglow2.jpg'
import  bunglow3 from '../core/categorytype/bunglow3.jpg'
import  flat1 from '../core/categorytype/flat1.jpg'
import  flat2 from '../core/categorytype/flat2.jpg'
import  flat3 from '../core/categorytype/flat3.jpg'
import  rowHouse1 from '../core/categorytype/rowHouse1.jpg'
import  rowHouse2 from '../core/categorytype/rowHouse2.jpg'
import  rowHouse3 from '../core/categorytype/rowHouse3.jpg'

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

    state = {
        categoryId : "",
        categoryList:[],
        filterCategoryList:[],
        categoryType:{},
        subcategoryType:[],
        loading: true
    }

    getSrc = (i,subcatId) => {
        let count=3;
        let num=i+1;
        for (var j = num; j > count; j--) {
            j=j-count;
            if (j<=count) {
                num=j;
                break;
            }
        }
        switch (subcatId+"-"+num) {
            case "bunglow-1": return bunglow1
            case "bunglow-2": return bunglow2
            case "bunglow-3":return bunglow3
            case "flat-1":return flat1
            case "flat-2":return flat2
            case "flat-3":return flat3
            case "rowHouse-1":return rowHouse1
            case "rowHouse-2":return rowHouse2
            case "rowHouse-3":return rowHouse3
            default:
                return notFound;
        };
    }

    handleChangeChk = (id) => {
        let subCategoryList=this.state.subcategoryType;
        var memidx = subCategoryList.map(
            function(mem) {
                return mem.subCatId;
            }).indexOf(id);
        if (memidx !== -1) {
            subCategoryList.splice(memidx, 1);
        }
        else{
            let getsubCategoryType = this.state.categoryType.subCategory.find(x => x.subCatId===id);
            subCategoryList.push(getsubCategoryType);
        }

        let addCategoryList=this.filterCategoryList(id);
        
        this.setState(
        {
                subcategoryType:subCategoryList,
                filterCategoryList:addCategoryList
        });
    }

    handleAdChangeChk =(AdType) =>{
        let addCategoryList=Object.assign([], this.state.categoryList[0]);
        let selectedCategoryList = this.state.filterCategoryList;
        let selectFilterList=this.state.filterCategoryList.filter(x=> x.adType===AdType);
        let count = addCategoryList.length;
        for (var i = 0; i < count; i++) {
            let listId=addCategoryList[i].listingId;
            var memidx =selectedCategoryList.map(
                function(mem) {
                    if(mem.adType===AdType)
                    return mem.listingId;
                    else return 0;
                }).indexOf(listId);
            if (memidx !== -1) { // to remove from the filter list
                selectedCategoryList.splice(memidx, 1);
            }
            else{
              console.log(memidx);
              let getcategoryList=addCategoryList[i].adType===AdType;
              if(selectFilterList.length===0 && getcategoryList){ // to add in the filter list
                selectedCategoryList = this.state.filterCategoryList;
                selectedCategoryList.push(addCategoryList[i]);
              }
              
            }
        }
        this.setState(
        {
            filterCategoryList:selectedCategoryList
        });

    }

    filterCategoryList = (subCatId) =>{
        let addCategoryList=Object.assign([], this.state.categoryList[0]);
        let selectedCategoryList = this.state.filterCategoryList;
        let selectFilterList=this.state.filterCategoryList.filter(x=> x.subcategoryId===subCatId);
        let count = addCategoryList.length;
        for (var i = 0; i < count; i++) {
            let listId=addCategoryList[i].listingId;
            var memidx =selectedCategoryList.map(
                function(mem) {
                    if(mem.subcategoryId===subCatId)
                    return mem.listingId;
                    else return 0;
                }).indexOf(listId);
            if (memidx !== -1) { // to remove from the filter list
                selectedCategoryList.splice(memidx, 1);
            }
            else{
              console.log(memidx);
              let getcategoryList=addCategoryList[i].subcategoryId===subCatId;
              if(selectFilterList.length===0 && getcategoryList){ // to add in the filter list
                selectedCategoryList = this.state.filterCategoryList;
                selectedCategoryList.push(addCategoryList[i]);
              }
              
            }
        }
        return selectedCategoryList;
    }
    componentDidMount() {
      let categoryId =this.props.match.params.catId;
      let categoryType=this.props.categories.find(x => x.catId===categoryId);
      var classifiedRef = firebase.firestore().collection('ClassfiedAds');
      let CategoryAds = [];
      classifiedRef.where("catId", "==", categoryId).get().then(snapshot => {
          snapshot.forEach(category => {
              var items = category.data();
              CategoryAds.push(items.adListing);
             
          });
        CategoryAds[0].sort(function (a, b) {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime(); 
        }).reverse();
       this.setState(
        {
            categoryList: CategoryAds,
            filterCategoryList: Object.assign([], CategoryAds[0]),
            categoryType:categoryType,
            subcategoryType: Object.assign([], categoryType.subCategory),
            loading: false
        });
          
      });
    }


    render() {
        return (
            !this.state.loading && this.state.categoryList.length > 0 && <div className="category-browsecontainer">
                <div className="category-browsing">{this.state.categoryType.catName} for purchase</div>
                <hr />
                <div >
                    <div className="category-menu">
                    <div  className="menutile" >
                                    <div className="menu-title">
                                     Category Type
                                    </div>
                                    <div className="category-menusub">
                                        {
                                        this.state.categoryType.subCategory.map((item,i) => {
                                          return(
                                              <div className="category-menusubtext" key={i}>
                                                  <input type="checkbox" defaultChecked={item.subCatId} onClick={()=>this.handleChangeChk(item.subCatId)} />
                                                  <span className="category-menutext">{item.subCatName}</span>
                                              </div>
                                          )
                                        })
                                        }
                                   
                                    
                                    </div>
                                    <hr className="category-menuhr"></hr>

                                    <div className="menu-title">
                                     Advertisement Type
                                    </div>
                                    <div className="category-menusub">
                                        <div className="category-menusubtext">
                                        <input type="checkbox" defaultChecked="Sell" onClick={()=>this.handleAdChangeChk("Sell")} />
                                        <span className="category-menutext">Sell</span>
                                        </div>
                                        <div className="category-menusubtext">
                                        <input type="checkbox" defaultChecked="Rent" onClick={()=>this.handleAdChangeChk("Rent")} />
                                        <span className="category-menutext">Rent</span>
                                        </div>
                                    </div>
                                    
                    </div>
                    </div>
                    <div className="category-items">
                    {
                         this.state.filterCategoryList.map((item,j) => {
                            return ( <div key={j} className="categoryDetail-tile" >
                            <div className="category-menu">
                                <img className="category-img" src={this.getSrc(j,item.subcategoryId)} alt=""></img>
                             </div>
                            <div className="category-items">
                              <div className="category-itemtext">
                                <div className="category-itemtitle">{item.title} 
                                  <span className="category-itemAdtype">{item.adType}</span>
                                </div>
                                
                                <div className="category-itemlocation">
                                    <span><FontAwesomeIcon icon={faMapMarker} /> {item.location}</span>
                                    <span className="category-itemspan">Contact - {item.contact}</span>
                                    {/* <span>{item.startDate}</span> */}
                                </div>
                                <hr></hr>
                                <div  className="category-itemdesc">{item.description}</div>
                              </div>
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
};

export default withRouter(CategoryDetail);
