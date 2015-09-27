import React, { Component } from 'react';
import Util, {Hover, Image} from './util';
var f16 = 'ffffffffffffffff';

class NavListTopItem extends Component {
  render() {
    return (
      <Hover hover={{textDecoration:'underline'}}
        style={{display:Util.flex,flexDirection:Util.flexDirection('row'),alignItems:'center',cursor:'pointer'}}>
        <Image style={{width:'20px',height:'20px',margin:'4px',backgroundColor:'red'}} />
        <div style={{
          float:'left',
          clear:'left',
          fontFamily:'sans-serif',
          fontWeight:'lighter',
          padding:'3px',
          marginRight:'10px'}}>
        {this.props.text}
        </div>
      </Hover>);
  }
}

class NavListItem extends Component {
  render() {
    return (
      <Hover hover={{backgroundColor:'#dcdee3',borderRadius:'3px',}}
        style={{display:Util.flex,flexDirection:Util.flexDirection('row'),alignItems:'center',cursor:'pointer'}}>
        <Image style={{width:'20px',height:'20px',margin:'4px',backgroundColor:'red'}} />
        <div style={{
          float:'left',
          clear:'left',
          fontFamily:'sans-serif',
          fontWeight:'lighter',
          padding:'3px',
          marginRight:'10px'}}>
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
      <NavListTopItem text={this.props.fns.getAccount().first + ' ' + this.props.fns.getAccount().last}/>
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
