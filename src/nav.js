import React, { Component } from 'react';
import {Hover, Image} from './util';
var f16 = 'ffffffffffffffff';

class NavListTopItem extends Component {
  render() {
    return (
      <Hover style={{textDecoration:"underline"}}
        common={{display:'flex',flexDirection:'row',alignItems:"center",cursor:'pointer'}}>
        <Image style={{width:"20px",height:"20px",margin:"4px",marginLeft:'7px',backgroundColor:'red'}} />
        <div style={{
          float:'left',
          clear:'left',
          fontFamily:'sans-serif',
          fontWeight:'lighter',
          padding:'3px',
          marginRight:'10px',
          fontSize:"80%"}}>
        {this.props.text}
        </div>
      </Hover>);
  }
}

class NavListItem extends Component {
  render() {
    return (
      <Hover style={{backgroundColor:'#dcdee3',borderRadius:'3px',}}
        common={{display:'flex',flexDirection:'row',alignItems:"center",cursor:'pointer'}}>
        <Image style={{width:"20px",height:"20px",margin:"4px",marginLeft:'7px',backgroundColor:'red'}} />
        <div style={{
          float:'left',
          clear:'left',
          fontFamily:'sans-serif',
          fontWeight:'lighter',
          padding:'3px',
          marginRight:'10px',
          fontSize:"80%"}}>
        {this.props.text}
        </div>
      </Hover>);
  }
}

class NavTitle extends Component {
  render() {
    return (
      <Hover>
        <div style={{
          float:'left',
          clear:'left',
          fontFamily:'sans-serif',
          padding:'3px',
          paddingLeft:'10px',
          marginTop:'15px',
          marginRight:'10px',
          fontWeight:'bold',
          color:'#9197a3',
          fontVariant:'small-caps'}}>
        {this.props.text}
        </div>
      </Hover>);
  }
}


export class NavBar extends Component {
  render() {
    var text = this.props.text;
    return (
    <span>
      <NavListTopItem text='FirstName LastName'/>
      <NavListTopItem text='Edit Profile'/>
      <NavTitle text='favourites'/>
      <NavListItem text='News Feed'/>
      <NavListItem text='Messages'/>
      <NavListItem text='Events'/>
      <NavTitle text='suggested'/>
      <NavListItem text='This is a list item!'/>
      <NavTitle text='pages'/>
      <NavListItem text='This is a list item!'/>
      <NavTitle text='groups'/>
      <NavListItem text='This is a list item!'/>
      <NavListItem text='This is a list item!'/>
      <NavTitle text='events'/>
      <NavListItem text='This is a list item!'/>
      <NavListItem text='This is a list item!'/>
    </span>);
  }
}
