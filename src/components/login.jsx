import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import validatation from '../validation/';
import { withRouter } from 'react-router';
import { handleLogin } from "../actions/index";

class Login extends Component {
  constructor() {
    super();
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.updateTextFieldValue = this.updateTextFieldValue.bind(this);
    this.state = {
        loading: false,
        username: '',
        password: '',
        errorMessage: '',
        API_URL:window.API_URL,
      };
  }
  updateTextFieldValue(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  handleLoginUser(event) {
	  event.preventDefault();
	  const self = this;
	  this.setState({
		  errorMessage: ''
	  });
		var result = validatation.validate({
		  username: {rules: ['empty'], value: this.state.username, fieldname: 'User Name'},
		  password: {rules: ['empty'], value: this.state.password, fieldname: 'Password'}
		});
		if(result) {
		  this.setState({
			errorMessage: result
		  });
		}
		else {
      this.setState({
        errorMessage: result,
        loading: true
      });
        let apiURL = this.state.API_URL+'people/?search='+this.state.username;
        fetch(apiURL, {
         method: 'GET',
         headers: new Headers({
         'content-type': 'application/json; charset=utf-8',
         'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
         }),
       })
       .then((res) => res.json())
       .then((res) => {
        
        if(res.count==1 && this.state.password.toUpperCase()==res.results[0].birth_year){
          localStorage.setItem('isUserLoggedIn', true);
          localStorage.setItem('name', res.results[0].name);
          this.setState({
            loading: false
          });
          this.props.dispatch( handleLogin({ isUserLoggedIn: true, username: res.results[0].name }) )
          this.props.history.push("/dashboard");
         }
         else{
          this.setState({
            errorMessage: "Please enter correct username and password",
            loading: false
          });
          this.props.dispatch( handleLogin({ isUserLoggedIn: false, username: '' }) )
         }
       })
       .catch((err)=>{
         this.setState({
           errorMessage:err,
           loading: false
         });
       });
    }
  }
  renderSubmit(){
    if(this.state.loading){
      return(
        <button type="button" style={{width:'100%'}} className="btn btn-lg btn-primary">
          <i className="fa fa-spinner fa-spin"></i> Loading, please wait
        </button>
      )
    }
    else{
      return(
        <button type="submit" style={{width:'100%'}} className="btn btn-lg btn-primary">
          Login to access
        </button>
      )
    }
  }
  render() {
    return (
      <div className="login-wrapper">
        <div className="login-container">

            <div className="left-section">
                <img src="images/login-logo.png" />
            </div>
            <div className="right-section">
              <form onSubmit={this.handleLoginUser}>
                <div className="form-wrapper">
                <div className="login-title">Login</div>
                <div className="form-block">
                {this.state.errorMessage ? <div className="text text-danger">{this.state.errorMessage}</div>: ''}
                    <div className="login-block">
                        <label>User name</label>
                        <input type="text" name="username" placeholder="Enter user name" onChange={this.updateTextFieldValue}/>
                    </div>
                    <div className="login-block">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter your password" onChange={this.updateTextFieldValue}/>
                    </div>
                   <div className="form-action">
                     {this.renderSubmit()}
                     

                  </div>
                   <div className="poweredby">&nbsp;</div>
                </div>
              </div>
              </form>
       </div>
   </div>
   </div>
    );
  }
}

const mapStateToProps = (state) => {
	return{login_data:state.login_data};
}
export default connect(mapStateToProps)(withRouter(Login));
