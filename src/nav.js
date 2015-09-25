import React, { Component } from 'react';
import {Hover} from './util';
var f16 = "ffffffffffffffff";

class NavListItem extends Component {
  render() {
    return (
      <Hover style={{backgroundColor:"#dcdee3",borderRadius:"3px"}}>
        <div style={{
          float:"left",
          clear:"left",
          fontFamily:"sans-serif",
          fontWeight:"lighter",
          padding:"3px",
          paddingLeft:"10px",
          marginRight:"10px"}}>
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
          float:"left",
          clear:"left",
          fontFamily:"sans-serif",
          padding:"3px",
          paddingLeft:"10px",
          marginRight:"10px",
          fontWeight:"bold",
          color:"#9197a3",
          fontVariant:"small-caps"}}>
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
      <NavListItem text="FirstName LastName"/>
      <NavListItem text="Edit Profile"/>
      <NavTitle text="favourites"/>
      <NavListItem text="News Feed"/>
      <NavListItem text="Messages"/>
      <NavListItem text="Events"/>
      <NavTitle text="suggested"/>
      <NavListItem text="This is a list item!"/>
      <NavTitle text="pages"/>
      <NavListItem text="This is a list item!"/>
      <NavTitle text="groups"/>
      <NavListItem text="This is a list item!"/>
      <NavListItem text="This is a list item!"/>
      <NavTitle text="events"/>
      <NavListItem text="This is a list item!"/>
      <NavListItem text="This is a list item!"/>
    </span>);
  }
}
