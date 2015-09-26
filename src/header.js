import React, { Component } from 'react';
import {Hover, Image, VertRule} from './util';

export class HeaderBar extends Component {
  render() {
    var logo = (<div style={{
      position:'relative',
      backgroundColor:'#f7f7f7',
      borderRadius:'3px',
      paddingLeft:'10px',
      paddingRight:'3px',
      paddingTop:'0px',
      marginRight:'5px',
      marginLeft:'20px',
    }}>
      <div style={{
        color:'#3b5998',
        fontFamily:'sans-serif',
        fontWeight:'bold',
        position:'relative',
        top:'10px',
        marginTop:'-12px',
        fontSize:'220%'
      }}>
        {this.props.fns.getAccount().siteName}
      </div>
    </div>);
    return (
      <div style={{
        position:'fixed',
        display:'flex',
        flexDirection: 'row',
        width:'100%',
        backgroundColor:'#3b5998',
        color:'#f7f7f7',
        order:'-2',
        padding:'10',
        margin: 0,
        top: 0,
        left: 0,
        zIndex: 99,
        alignItems: 'center'}}>
        {logo}
        <input type='text' placeholder={'Search '+this.props.fns.getAccount().siteName} style={{
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
    return <div style={{
      fontColor:'#fff',
      fontWeight:'bolder',
      marginLeft:'auto',
      marginRight:'30px',
      display:'flex',
      flexDirection: 'row',
      alignItems:'center'
      }}>
        <Hover hover={{backgroundColor:'#355089',borderRadius:'3px',cursor:'pointer'}}
               style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:'23px',height:'23px',margin:'4px',backgroundColor:'red'}} />
          <div style={{marginRight:'10px',padding:'5px',paddingRight:'0px'}}>{this.props.fns.getAccount().first}</div>
        </Hover>
        <VertRule color={'#355089'} />
        <Hover hover={{backgroundColor:'#355089',borderRadius:'3px',cursor:'pointer'}}>
          <div style={{marginRight:'10px',padding:'5px',paddingLeft:'10px'}}>Home</div>
        </Hover>
        <VertRule color={'#355089'} />
        <Hover hover={{backgroundColor:'#355089',borderRadius:'3px',cursor:'pointer'}}>
          <div style={{marginRight:'10px',padding:'5px',paddingLeft:'10px'}}
          onClick={this.props.fns.changePage.bind(null,'login')}>Logout</div>
        </Hover>
      </div>;
  }
}
