import React, { Component } from 'react';
import Util, {Hover, Rule} from './util';

import {HeaderBar} from './header';
import {Post, Ad, AdFooter, NewStatus} from './content';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first:'',
      last:'',
      email:'',
      email2:'',
      password:''
    };
    this.validateSignup = this.validateSignup.bind(this);
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

    var id = Util.genID('user');
    this.props.fns.addElement('accounts',
    {
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      password: Util.hash(this.state.password),
      id: id
    }, () => this.props.fns.login(this.state.email, this.state.password));
  }

  createInput(formName, niceName, style, isPassword) {
    return (
      <input
        type={isPassword ? 'password' : 'text'}
        placeholder={niceName}
        style={{
          fontSize:'120%',
          marginTop:'5px',
          marginBottom:'5px',
          display:'block',
          height:'40px',
          paddingLeft:'10px',
          outline:'0',
          border:'1px solid lightgrey',
          borderRadius:'5px',
          width: style
        }}
        onChange={e =>
          this.setState({
            [formName]: e.target.value
          })
        }/>
    );
  }


  render() {
    var loginHeader = (
      <div style={{
        display: Util.flex,
        flexDirection: Util.flexDirection('row'),
        backgroundColor: '#3b5998',
        color: '#f7f7f7',
        padding: '10',
        zIndex: 99,
        alignItems: Util.alignItems('center')}}>
        <div
          style={{
            fontSize: '350%',
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginTop: '20px',
            marginLeft: '60px'
          }}
          onClick={() => this.props.fns.deepUpdate({"userID":{$set: '1'}}, () => (this.props.fns.changePage('feed',{})))}>
          {this.props.fns.getSiteName()}
        </div>
        <div style={{
          margin: '0 50px 0 auto',
          height: '30px',
          display: Util.flex}}>
          <input
            type="text"
            placeholder="Email"
            style={{
              height: '25px',
              paddingLeft: '5px',
              marginRight: '10px'
            }}
            onChange={(e) => this.setState({'login-email': e.target.value})}/>
          <input
            type="password"
            placeholder="Password"
            style={{
              height: '25px',
              paddingLeft: '5px',
              marginRight: '10px'
            }}
            onChange={(e) => this.setState({'login-password':e.target.value})}/>
          <div
            style={{
              padding: '5px 10px',
              backgroundColor: '#4c69ba',
              border: '1px solid #354c8c',
              marginLeft: 'auto',
              height: '20px',
              cursor: 'pointer'
            }}
            onClick={this.props.fns.login.bind(null,
              this.state['login-email'],
              this.state['login-password'])}>
            Log In
          </div>
        </div>
      </div>
    );

    var signupForm = (
      <div style={{
        display: Util.flex,
        flexDirection: Util.flexDirection('column'), padding:'30px'}}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '250%',
          marginBottom: '20px'
        }}>
          Sign Up
        </div>
        <span style={{color:'red'}}>
          {this.state.error}
        </span>
        <div style={{display:Util.flex}}>
          {this.createInput('first', 'First name', '50%')}
          {this.createInput('last', 'Last name', '50%')}
        </div>
        {this.createInput('email', 'Email')}
        {this.createInput('email2', 'Re-enter email')}
        {this.createInput('password', 'New password', null, true)}
        <div style={{
          marginTop: '20px',
        }}>
        By clicking Sign Up, you agree to our Terms and that you have read our Data Policy, including our Cookie Use.
        </div>
        <Hover
          style={{
            border: '1px solid',
            marginTop: '10px',
            borderRadius: '5px',
            color: '#ffffff',
            textAlign: 'center',
            justifyContent: Util.justifyContent('center'),
            alignItems: Util.alignItems('center'),
            width: '200px',
            padding: '5px',
            cursor: 'pointer',
            background: 'linear-gradient(#67ae55, #578843)',
            boxShadow: 'inset 0 1px 1px #a4e388',
            borderColor: '#3b6e22 #3b6e22 #2c5115'
          }}
          hover={{backgroundColor: '#6bb933'}}
          noHover={{backgroundColor: '#69a74e'}}
          onClick={this.validateSignup}>
          Sign Up
        </Hover>
      </div>
    );

    return (
      <div style={{
        display: Util.flex,
        flexDirection: Util.flexDirection('column'),
        backgroundColor: '#e9eaed',
        overflow: 'hidden',
        minHeight: '100vh',
        width: '100%',
        fontFamily: 'sans-serif'}}>
        {loginHeader}
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('row'),
          justifyContent:Util.justifyContent('center'),
          top: '50px',
          position: 'relative'}}>
          <div style={{flex:'0 0 30em'}}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '200%',
              paddingRight: '50px'}}>
              Connect with friends and the
              world around you on {this.props.fns.getSiteName()}.
            </div>
          </div>
          <div style={{order: 2, flex:'0 0 30em'}}>
            {signupForm}
          </div>
        </div>
      </div>
    );
  }
}
