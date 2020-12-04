import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import firebase from '../core/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker ,faHeart, faRupeeSign} from '@fortawesome/free-solid-svg-icons'
import notFound from '../core/assets/noimage.jpg'
import bike1 from '../core/categorytype/bike1.jpg'
import bike2 from '../core/categorytype/bike2.jpg'
import bike3 from '../core/categorytype/bike3.jpg'
import bunglow1 from '../core/categorytype/bunglow1.jpg'
import bunglow2 from '../core/categorytype/bunglow2.jpg'
import bunglow3 from '../core/categorytype/bunglow3.jpg'
import car1 from '../core/categorytype/car1.jpg'
import car2 from '../core/categorytype/car2.jpg'
import car3 from '../core/categorytype/car3.jpg'
import chair1 from '../core/categorytype/chair1.jpg'
import chair2 from '../core/categorytype/chair2.jpg'
import chair3 from '../core/categorytype/chair3.jpg'
import cupboard1 from '../core/categorytype/cupboard1.jpg'
import cupboard2 from '../core/categorytype/cupboard2.jpg'
import cupboard3 from '../core/categorytype/cupboard3.jpg'
import flat1 from '../core/categorytype/flat1.jpg'
import flat2 from '../core/categorytype/flat2.jpg'
import flat3 from '../core/categorytype/flat3.jpg'
import fridge1 from '../core/categorytype/fridge1.jpg'
import fridge2 from '../core/categorytype/fridge2.jpg'
import lap1 from '../core/categorytype/lap1.jpg'
import lap2 from '../core/categorytype/lap2.jpg'
import lap3 from '../core/categorytype/lap3.jpg'
import mobile1 from '../core/categorytype/mobile1.jpg'
import mobile2 from '../core/categorytype/mobile2.jpg'
import mobile3 from '../core/categorytype/mobile3.jpg'
import oven1 from '../core/categorytype/oven1.jpg'
import painting1 from '../core/categorytype/painting1.jpg'
import painting2 from '../core/categorytype/painting2.jpg'
import rowHouse1 from '../core/categorytype/rowHouse1.jpg'
import rowHouse2 from '../core/categorytype/rowHouse2.jpg'
import rowHouse3 from '../core/categorytype/rowHouse3.jpg'
import table1 from '../core/categorytype/table1.jpg'
import table2 from '../core/categorytype/table2.jpg'
import table3 from '../core/categorytype/table3.jpg'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './CategoryDetail.css';
import icon_mail from '../core/assets/outlook.png';
import icon_phone from '../core/assets/icon_phone.jpg';
import icon_team from '../core/assets/teams.svg';
import share_icon from '../core/assets/share.png';



class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.url = '../core/assets/';
    }

    state = {
        categoryId: "",
        categoryList: [],
        filterCategoryList: [],
        categoryType: {},
        subcategoryType: [],
        loading: true,
        openTeams: false,
        isFav:false
    }

    getSrc = (i, subcatId) => {
        let count = 3;
        let num = i + 1;
        for (var j = num; j > count; j--) {
            j = j - count;
            if (j <= count) {
                num = j;
                break;
            }
        }
        switch (subcatId + "-" + num) {
            case "bike-1": return bike1
            case "bike-2": return bike2
            case "bike-3": return bike3
            case "bunglow-1": return bunglow1
            case "bunglow-2": return bunglow2
            case "bunglow-3": return bunglow3
            case "car-1": return car1
            case "car-2": return car2
            case "car-3": return car3
            case "chair-1": return chair1
            case "chair-2": return chair2
            case "chair-3": return chair3
            case "cupboard-1": return cupboard1
            case "cupboard-2": return cupboard2
            case "cupboard-3": return cupboard3
            case "flat-1": return flat1
            case "flat-2": return flat2
            case "flat-3": return flat3
            case "fridge-1": return fridge1
            case "fridge-2": return fridge2
            case "lap-1": return lap1
            case "lap-2": return lap2
            case "lap-3": return lap3
            case "mobile-1": return mobile1
            case "mobile-2": return mobile2
            case "mobile-3": return mobile3
            case "oven-1": return oven1
            case "painting-1": return painting1
            case "painting-2": return painting2
            case "rowHouse-1": return rowHouse1
            case "rowHouse-2": return rowHouse2
            case "rowHouse-3": return rowHouse3
            case "table-1": return table1
            case "table-2": return table2
            case "table-3": return table3
            default:
                return notFound;
        };
    }

    togglefav =() =>{
        let toggle=false;
        if(!this.state.isFav){
            toggle=true
        }

        this.setState(
            {
                isFav:toggle
            });
    }

    handleChangeChk = (id) => {
        let subCategoryList = this.state.subcategoryType;
        var memidx = subCategoryList.map(
            function (mem) {
                return mem.subCatId;
            }).indexOf(id);
        if (memidx !== -1) {
            subCategoryList.splice(memidx, 1);
        }
        else {
            let getsubCategoryType = this.state.categoryType.subCategory.find(x => x.subCatId === id);
            subCategoryList.push(getsubCategoryType);
        }

        let addCategoryList = this.filterCategoryList(id);

        this.setState(
            {
                subcategoryType: subCategoryList,
                filterCategoryList: addCategoryList
            });
    }

    handleAdChangeChk = (AdType) => {
        let addCategoryList = Object.assign([], this.state.categoryList[0]);
        let selectedCategoryList = this.state.filterCategoryList;
        let selectFilterList = this.state.filterCategoryList.filter(x => x.adType === AdType);
        let count = addCategoryList.length;
        for (var i = 0; i < count; i++) {
            let listId = addCategoryList[i].listingId;
            var memidx = selectedCategoryList.map(
                function (mem) {
                    if (mem.adType === AdType)
                        return mem.listingId;
                    else return 0;
                }).indexOf(listId);
            if (memidx !== -1) { // to remove from the filter list
                selectedCategoryList.splice(memidx, 1);
            }
            else {
                console.log(memidx);
                let getcategoryList = addCategoryList[i].adType === AdType;
                if (selectFilterList.length === 0 && getcategoryList) { // to add in the filter list
                    selectedCategoryList = this.state.filterCategoryList;
                    selectedCategoryList.push(addCategoryList[i]);
                }

            }
        }
        this.setState(
            {
                filterCategoryList: selectedCategoryList
            });

    }

    filterCategoryList = (subCatId) => {
        let addCategoryList = Object.assign([], this.state.categoryList[0]);
        let selectedCategoryList = this.state.filterCategoryList;
        let selectFilterList = this.state.filterCategoryList.filter(x => x.subcategoryId === subCatId);
        let count = addCategoryList.length;
        for (var i = 0; i < count; i++) {
            let listId = addCategoryList[i].listingId;
            var memidx = selectedCategoryList.map(
                function (mem) {
                    if (mem.subcategoryId === subCatId)
                        return mem.listingId;
                    else return 0;
                }).indexOf(listId);
            if (memidx !== -1) { // to remove from the filter list
                selectedCategoryList.splice(memidx, 1);
            }
            else {
                console.log(memidx);
                let getcategoryList = addCategoryList[i].subcategoryId === subCatId;
                if (selectFilterList.length === 0 && getcategoryList) { // to add in the filter list
                    selectedCategoryList = this.state.filterCategoryList;
                    selectedCategoryList.push(addCategoryList[i]);
                }

            }
        }
        return selectedCategoryList;
    }
    componentDidMount() {
        let categoryId = this.props.match.params.catId;
        let categoryType = this.props.categories.find(x => x.catId === categoryId);
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
                    categoryType: categoryType,
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
                        <div className="menutile" >
                            <div className="menu-title">
                                Category Type
                                    </div>
                            <div className="category-menusub">
                                {
                                    this.state.categoryType.subCategory.map((item, i) => {
                                        return (
                                            <div className="category-menusubtext" key={i}>
                                                <input type="checkbox" defaultChecked={item.subCatId} onClick={() => this.handleChangeChk(item.subCatId)} />
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
                                    <input type="checkbox" defaultChecked="Sell" onClick={() => this.handleAdChangeChk("Sell")} />
                                    <span className="category-menutext">Sell</span>
                                </div>
                                <div className="category-menusubtext">
                                    <input type="checkbox" defaultChecked="Rent" onClick={() => this.handleAdChangeChk("Rent")} />
                                    <span className="category-menutext">Rent</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="category-items">
                        {
                            this.state.filterCategoryList.map((item, j) => {
                                return (<div key={j} className="categoryDetail-tile" >
                                    <div className="category-menu">
                                        <img className="category-img" src={this.getSrc(j, item.subcategoryId)} alt=""></img>
                                    </div>
                                    <div className="category-items">
                                        <div className="category-itemtext">
                                            <div className="category-itemtitle">{item.title}
                                            <Link to="/payment" className="category-itemAdtype">Buy</Link>
                                            <span onClick={()=> this.togglefav()} className={this.state.isFav? 'category-favAdded' : 'category-fav'}><FontAwesomeIcon icon={faHeart} ></FontAwesomeIcon></span>
                                            </div>
                                            <div className="category-price">Price - {item.price} <FontAwesomeIcon icon={faRupeeSign} /></div>

                                            <div className="category-itemlocation">
                                                <span><FontAwesomeIcon icon={faMapMarker} /> {item.location}</span>
                                                <Popup
                                                    trigger={open => (
                                                        <span className="category-itemspan">contact owner </span>
                                                    )}
                                                    position="right center"
                                                    closeOnDocumentClick>

                                                    <div className="contact-pop">
                                                        <div className="phone">
                                                            <img className="contact-img" src={icon_phone} alt=""></img>
                                                            <span className="contact-number"> {item.contact}</span>
                                                        </div>
                                                        <hr />
                                                        <div className="contact-secondBody">
                                                            <a href="https://login.live.com/">
                                                                <img className="contact-img" src={icon_mail} alt=""></img>

                                                            </a>
                                                            <a href="https://teams.microsoft.com/">
                                                                <img className="contact-img contact-alt" src={icon_team} alt=""

                                                                ></img>
                                                            </a>
                                                            
                                                            <img className="contact-img contact-alt" src={share_icon} alt=""/>
                                                           

                                                        </div>

                                                    </div>
                                                </Popup>
                                                {/* <span>{item.startDate}</span> */}
                                            </div>
                                            <hr></hr>
                                            <div className="category-itemdesc">{item.description}</div>
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
