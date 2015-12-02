import React, { Component } from 'react';
import Util, {Hover, Image, VertRule, ProfilePic} from './util';

export class HeaderBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  render() {
    var logo = (
      <div style={{
        position: 'relative',
        backgroundColor: '#f7f7f7',
        borderRadius: '3px',
        paddingLeft: '10px',
        paddingRight: '3px',
        paddingTop: '0px',
        marginRight: '5px',
        marginLeft: '20px',}}>
        <div style={{
          color: '#3b5998',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          position: 'relative',
          top: '10px',
          marginTop: '-12px',
          fontSize: '220%'}}>
          {this.props.fns.getSiteName()}
        </div>
      </div>
    );

    return (
      <div style={{
        position: 'fixed',
        display: Util.flex,
        flexDirection: Util.flexDirection('row'),
        width: '100%',
        backgroundColor: '#3b5998',
        color: '#f7f7f7',
        order: '-2',
        padding: '10',
        margin: 0,
        top: 0,
        left: 0,
        zIndex: 50,
        alignItems: Util.alignItems('center')}}>
        {logo}
        <input
          type='text'
          placeholder={'Search '+this.props.fns.getSiteName()}
          value={this.state.search}
          onChange={(e) => this.setState({search: e.target.value})}
          onKeyPress={
            e => {
              if (e.which === 13 && !e.shiftKey){
                e.preventDefault();
                this.setState({search:""});
                this.props.fns.changePage('search', {q:this.state.search});
              }
            }
          }
          style={{
            height:'25px',
            width:'400px',
            borderRadius:'3px',
            marginLeft:'5px',
            paddingLeft:'5px',
            outline:'0px',
            border:'none'
          }}/>
        <HeaderMenu fns={this.props.fns}/>
      </div>);
  }
}

class HeaderMenu extends Component {
  render() {
    var account = this.props.fns.getAccount();
    return (
      <div style={{
        fontColor: '#fff',
        fontWeight: 'bolder',
        marginLeft: 'auto',
        marginRight: '30px',
        display: Util.flex,
        flexDirection: Util.flexDirection('row'),
        alignItems: Util.alignItems('center')}}>
        <Hover
          hover={{
            backgroundColor: '#355089',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
          style={{
            display: Util.flex,
            flexDirection: Util.flexDirection('row'),
            alignItems: Util.alignItems('center')}}>
          <ProfilePic user={account} style={{
            width:'23px',
            height:'23px',
            margin:'4px'
          }} />
          <div style={{
            marginRight:'10px',
            padding:'5px',
            paddingRight:'0px'}}
            onClick = {this.props.fns.changePage.bind(null, 'profile', {id:account.id})}>
            {account.first}
          </div>
        </Hover>
        <VertRule color="#355089" />
        <Hover hover={{
          backgroundColor: '#355089',
          borderRadius: '3px'}}
          style ={{
          marginRight: '10px',
          padding: '5px',
          paddingLeft: '10px',
          cursor: 'pointer'}}
          onClick={this.props.fns.changePage.bind(null, 'feed',{})}>
            Home
        </Hover>
        <VertRule color="#355089" />
        <Hover hover={{
          backgroundColor:'#355089',
          borderRadius:'3px',
          cursor:'pointer'}}>
          <div
            style={{
              marginRight:'10px',
              padding:'5px',
              paddingLeft:'10px'
            }}
            onClick={this.props.fns.changePage.bind(null,'login',{})}>
            Logout
          </div>
        </Hover>
      </div>
    );
  }
}
