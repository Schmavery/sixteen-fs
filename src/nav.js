import React, { Component } from 'react';
import Util, {Hover, Image, ProfilePic} from './util';

class NavListTopItem extends Component {
  render() {
    var img;
    if (this.props.user) {
      img = (<ProfilePic
        user={this.props.user}
        style={{
          width:'20px',
          height:'20px',
          margin:'4px'}} />);
    } else {
      img = (<Image style={{
        width:'20px',
        height:'20px',
        margin:'4px',
        backgroundColor:'red'}} />);
    }

    return (
      <Hover
        hover={{textDecoration: 'underline'}}
        onClick={this.props.onClick}
        style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('row'),
          alignItems: Util.alignItems('center'),
          cursor: 'pointer'
        }}>
        {img}
        <div style={{
          float: 'left',
          clear: 'left',
          fontFamily: 'sans-serif',
          fontWeight: 'lighter',
          padding: '3px',
          marginRight: '10px'
        }}>
          {this.props.text}
        </div>
      </Hover>);
  }
}

class NavListItem extends Component {
  render() {

    return (
      <Hover
        hover={{
          backgroundColor:'#dcdee3',
          borderRadius:'3px',
        }}
        onClick={this.props.onClick}
        style={{
          display:Util.flex,
          flexDirection:Util.flexDirection('row'),
          alignItems: Util.alignItems('center'),
          cursor:'pointer'}}>
          <Image style={{
            width:'20px',
            height:'20px',
            margin:'4px',
            backgroundColor:'red'}} />
        <div style={{
          float:'left',
          clear:'left',
          fontFamily:'sans-serif',
          fontWeight:'lighter',
          padding:'3px',
          marginRight:'10px'}}>
          {this.props.text}
        </div>
      </Hover>
    );
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
    var user = this.props.fns.getAccount();
    return (
    <span>
      <NavListTopItem
        user={user}
        text={user.first + ' ' + user.last}
        onClick={this.props.fns.changePage.bind(null,'profile',{id:user.id})}
      />
      <NavListTopItem
        text='Edit Profile'
        onClick={this.props.fns.changePage.bind(null,'profile',{id:user.id})}
      />
      <NavTitle text='favourites'/>
      <NavListItem
        text='News Feed'
        onClick={this.props.fns.changePage.bind(null,'feed')}
      />
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
