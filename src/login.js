import React, { Component } from 'react';
import Util, {Hover, Rule} from './util';

import {HeaderBar} from './header';
import {Post, Ad, AdFooter, NewStatus} from './content';
import {NavBar} from './nav';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {first:'',last:'',email:'',email2:'',password:''};
    this.validateSignup = this.validateSignup.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.createInput = this.createInput.bind(this);
  }

  validateSignup(){
    if (!(this.state.first &&
        this.state.last &&
        this.state.email &&
        this.state.email2 &&
        this.state.password)){
      return this.setState({error:'You must enter a value for all fields.'})
    } else if (this.state.email !== this.state.email2){
      return this.setState({error:'Emails do not match.'});
    }

    this.props.fns.setAccount({
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      password: this.state.password
    });
    this.props.fns.changePage('feed');
  }

  validateLogin(){
    if (!(this.state['login-email'] && this.state['login-password'])){
      return;
    } else if (this.state['login-password'] !== this.props.fns.getAccount().password){
      return;
    } else if (this.state['login-email'] !== this.props.fns.getAccount().email){
      return;
    }
    this.props.fns.changePage('feed');
  }

  createInput(formName, niceName, style) {
    var t = this;
    return (
        <input type='text' placeholder={niceName} style={{
          fontSize:'120%',
          marginTop:'10px',
          display:'block',
          width:'100%',
          height:'40px',
          paddingLeft:'10px',
          outline:'0px',
          border:'1px solid lightgrey',
          borderRadius:'5px'}}
          onChange={function(e) {
            var obj = {};
            obj[formName] = e.target.value;
            t.setState(obj);
          }}/>
    );
  }


  render() {
    var loginHeader = (
      <div style={{
          display:Util.flex,
          flexDirection:Util.flexDirection('row'),
          width:'100%',
          backgroundColor:'#3b5998',
          color:'#f7f7f7',
          order:'-1',
          padding:'10',
          zIndex: 99,
          alignItems: 'center'}}>
        <div style={{
            fontSize:'350%',
            fontWeight:'bold',
            letterSpacing:'2px',
            marginTop:'20px',
            marginLeft:'60px'}}
            onClick={this.props.fns.changePage.bind(null,'feed')}>
          {this.props.fns.getAccount().siteName}
        </div>
        <div style={{
            marginLeft:'auto',
            marginRight:'50px',
            display:Util.flex}}>
          <input type='text' placeholder='Email' style={{height:'25px',paddingLeft:'5px',marginRight:'10px'}}
              onChange={(e) => this.setState({'login-email':e.target.value})}/>
          <input type='text' placeholder='Password' style={{height:'25px',paddingLeft:'5px',marginRight:'10px'}}
              onChange={(e) => this.setState({'login-password':e.target.value})}/>
          <div style={{
              padding:'5px',
              backgroundColor:'#4c69ba',
              border:'1px solid #354c8c',
              marginLeft:'auto',
              marginRight:'50px',
              cursor:'pointer'}} onClick={this.validateLogin}>
            Log In
          </div>
        </div>
      </div>
    );

    var signupForm = (
      <div style={{
        display:Util.flex,
        flexDirection:Util.flexDirection('column'),
        marginRight:'50px',
      }}>
        <div style={{fontWeight:'bold',fontSize:'250%',marginBottom:'20px'}}>Sign Up</div>
        <span style={{color:'red'}}>{this.state.error}</span>
        <div style={{display:Util.flex}}>
          {this.createInput('first', 'First name')}
          &nbsp;&nbsp;
          {this.createInput('last', 'Last name')}
        </div>
        {this.createInput('email', 'Email')}
        {this.createInput('email2', 'Re-enter email')}
        {this.createInput('password', 'New password')}
        <div style={{marginRight:'50px',marginLeft:'5px',marginTop:'20px',fontSize:'70%'}}>
        By clicking Sign Up, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.
        </div>
        <Hover style={{
            border:'1px solid #2c5115',
            marginLeft:'5px',
            marginTop:'20px',
            borderRadius:'5px',
            display:Util.flex,
            justifyContent:'center',
            alignItems:'center',
            width:'200px',
            height:'35px',
            cursor:'pointer'
            }}
          hover={{backgroundColor:'#6bb933'}}
          noHover={{backgroundColor:'#519f18'}} onClick={this.validateSignup}>
          Sign Up
        </Hover>
      </div>
    );


    return (
      <div style={{
          display:Util.flex,
          flexDirection:Util.flexDirection('column'),
          backgroundColor:'#e9eaed',
          overflow:'hidden',
          minHeight: '100vh',
          width:'100%',
          fontFamily:'sans-serif'}}>
        {loginHeader}
        <div style={{
            display:Util.flex,
            flexDirection:Util.flexDirection('row'),
            top:'50px',
            position:'relative'}}>
          <div style={{flex:'0 0 60%'}}>
            <div style={{
                fontWeight:'bold',
                fontSize:'200%',
                paddingLeft:'100px',
                paddingRight:'180px'}}>
              Connect with friends and the
              world around you on {this.props.fns.getAccount().siteName}.</div>
          </div>
          <div style={{order: 2, flex:'0 0 40%'}}>
            {signupForm}
          </div>
        </div>
      </div>
    );
  }
}
