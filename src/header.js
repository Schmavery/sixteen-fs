import React, { Component } from 'react';
import {Hover} from './util';
var f16 = "ffffffffffffffff";

export class HeaderBar extends Component {
  render() {
    var logo = (<div style={{
      position:"relative",
      backgroundColor:"#f7f7f7",
      borderRadius:"3px",
      paddingLeft:"5px",
      paddingRight:"2px",
      paddingTop:"0px",
      marginRight:"5px",
      marginLeft:"20px",
    }}>
      <div style={{
        color:"#3b5998",
        fontFamily:"sans-serif",
        fontSize:"1.5em",
        fontWeight:"bold",
        position:"relative",
        top:"10px",
        margin:"0px"
      }}>
        {f16}
      </div>
    </div>);
    return (
      <div style={{
        position:"relative",
        display:"flex",
        flexDirection: "row",
        width:"100%",
        position:"fixed",
        backgroundColor:"#3b5998",
        color:"#f7f7f7",
        order:"-2",
        padding:"10",
        margin: 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        alignItems: "center"}}>
        {logo}
        <input type="text" placeholder={"Search "+f16} style={{
          height:"25px",
          width:"400px",
          borderRadius:"3px",
          marginLeft:"5px",
          paddingLeft:"5px",
          outline:"0px",
          border:"none"
        }}/>
        <HeaderMenu />
      </div>);
  }
}

class HeaderMenu extends Component {
  render() {
    return <div style={{
      fontColor:"#fff",
      fontWeight:"bolder",
      marginLeft:"auto",
      marginRight:"30px",
      display:"flex",
      flexDirection: "row",
      }}>
        <Hover style={{backgroundColor:"#354c8c",borderRadius:"3px"}}>
          <div style={{marginRight:"10px",padding:"5px",paddingRight:"0px"}}>FirstName</div>
        </Hover>
          <span style={{color:"#0e1f5b",paddingTop:"5px"}}>|</span>
        <Hover style={{backgroundColor:"#354c8c",borderRadius:"3px"}}>
          <div style={{marginRight:"10px",padding:"5px",paddingLeft:"10px"}}>Home</div>
        </Hover>
      </div>;
  }
}
