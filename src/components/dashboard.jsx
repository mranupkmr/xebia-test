import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { saveSearchPlannet,savePlannetDetails } from "../actions/index";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.updateTextFieldValue = this.updateTextFieldValue.bind(this);
    }
    plannetDetail(plannetKey){
        if(plannetKey){
            this.props.dispatch( savePlannetDetails({ loader: true }) )
            fetch(plannetKey, {
                method: 'GET',
                headers: new Headers({
                'content-type': 'application/json; charset=utf-8',
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                if(res.name){
                    this.props.dispatch( savePlannetDetails(
                        { 
                            loader: false,
                            detail: res, 
                            errorMessage:'' 
                        }
                        ) );
                }
                else{
                    this.props.dispatch( savePlannetDetails(
                        { 
                            loader: false, 
                            detail: res, 
                            errorMessage:'Opps plannet detail not found!' 
                        }
                        ) );
                }
            })
            .catch((err)=>{
                this.props.dispatch( savePlannetDetails({ loader: false, detail: {}, errorMessage:err   }) );
              });
        }
    }
    renderPlannet(){
        if(this.props.plannet_data.count>0){
            let self = this;
            let plannet_arr = this.props.plannet_data.plannet_arr; 
            let totalPopulation = 0;
            let listArr = [];
            let popAvg = 0;
            plannet_arr.map((item) => {
                if( !isNaN(parseInt(item.population))){
                    totalPopulation += parseInt(item.population);
                }
            });
            plannet_arr.map((item,index) => {

                if( !isNaN(parseInt(item.population))){
                    popAvg = (parseInt(item.population)/totalPopulation*100).toFixed(1);
                }
                else{
                    popAvg = 'NA';
                }
                listArr.push(
                    <li onClick={() => self.plannetDetail(item.url)} key={index}><a href="javascript:void(0)">{item.name}<span>{popAvg}</span></a></li>
                )
            });
            return(
                <div className="tagcloud03">
                    <ul>
                        {listArr}
                    </ul>
                </div>
            )
        }

        
    }
    updateTextFieldValue(e){
        let searchStr = e.target.value;
        if(searchStr!=''){
            this.props.dispatch( saveSearchPlannet({ loader: true }) )
            let apiURL = window.API_URL+'planets/?search='+searchStr;
            fetch(apiURL, {
                method: 'GET',
                headers: new Headers({
                'content-type': 'application/json; charset=utf-8',
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                if(res.count>0){
                    this.props.dispatch( saveSearchPlannet(
                        { 
                            loader: false,
                            count: res.count, 
                            plannet_arr: res.results, 
                            errorMessage:'' 
                        }
                        ) );
                }
                else{
                    this.props.dispatch( saveSearchPlannet(
                        { 
                            loader: false, 
                            count: 0, 
                            plannet_arr: [], 
                            errorMessage:'Opps no plannet found!' 
                        }
                        ) );
                }
            })
            .catch((err)=>{
                this.props.dispatch( saveSearchPlannet({ loader: false, plannet_arr: [], errorMessage:err, count: 0,  }) );
              });
        }
        else{
            this.props.dispatch( saveSearchPlannet({ loader: false, plannet_arr: [],errorMessage:'',count: 0,  }) );
            this.props.dispatch( savePlannetDetails({ loader: false, detail: {}, errorMessage:''   }) );
        }
    }
    renderPlannetDetail(){
        if(this.props.plannet_details.detail){
            return(
                <div className="col-lg-12">
                    <div className="col-lg-2">
                        <strong>Name </strong>
                        {this.props.plannet_details.detail.name}
                    </div>
                    <div className="col-lg-2">
                        <strong>Rotation Period </strong>
                        {this.props.plannet_details.detail.rotation_period}
                    </div>
                    <div className="col-lg-2">
                        <strong>Orbital Period </strong>
                        {this.props.plannet_details.detail.orbital_period}
                    </div>
                    <div className="col-lg-2">
                        <strong>Diameter </strong>
                        {this.props.plannet_details.detail.diameter}
                    </div>
                    <div className="col-lg-2">
                        <strong>Climate </strong>
                        {this.props.plannet_details.detail.climate}
                    </div>
                    <div className="col-lg-2">
                        <strong>Population </strong>
                        {this.props.plannet_details.detail.population}
                    </div>
                </div>
            )
        }
    }
    render(){console.log(this.props);
       return(
        <>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#page-top">Star Wars Plannets</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Welcome, {localStorage['name']}&nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{
                                    width: '100%',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}>
                                <a className="dropdown-item" href="javascript:void(0)" onClick={()=>this.handle_logout()} style={{margin: '15px'}}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                        <div className="form-group">
                            <input type="text" onChange={this.updateTextFieldValue} name="search" placeholder="Search star wars plannet..." className="form-control" id="search"/>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                        {this.props.plannet_data.loader &&
                            <small>Loading Data...</small>
                        }
                        {this.props.plannet_data.errorMessage &&
                            <small>{this.props.plannet_data.errorMessage}</small>
                        }
                        </div>
                        <div className="col-lg-12">
                            {this.renderPlannet()}
                        </div>
                        <div className="col-lg-12 text-center">
                            {this.props.plannet_details.loader &&
                                <small>Loading Detail Data...</small>
                            }
                            {this.props.plannet_details.errorMessage &&
                                <small>{this.props.plannet_details.errorMessage}</small>
                            }
                        </div>
                        {this.renderPlannetDetail()}
                    </div>
                </div>
            </div>                    
        </>
      
       )
    }
    handle_logout(){
        localStorage.clear();
        window.location.reload(true);
    }
}
const mapStateToProps = (state) => {
	return{ 
        plannet_data:state.plannet_data,
        plannet_details:state.plannet_details
    };
}
export default connect(mapStateToProps)(withRouter(Dashboard));
