import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';

var f16 = "ffffffffffffffff";

class HeaderBar extends Component {
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
          height:"20px",
          width:"400px",
          borderRadius:"3px",
          marginLeft:"5px",
          paddingLeft:"3px"
        }}/>
      </div>);
  }
}

class ContentItem extends Component {
  render() {
    return (<div style={{
      backgroundColor:"#fff",
      padding:"10px",
      margin:"10px",
      marginLeft:"0px",
      borderRadius:"3px",
      border:"1px solid #dfe3ee"
    }}>
      asfsafas gdsfgaoa sudnb osadn boasd nboasi dnboa sdoian sdbas doinboas
      dnboiad asdnboasndb adsibnasdob asd boasd bojasd boajsd boajs dbojasd b
    </div>);
  }
}

class NavBar extends Component {
  render() {
    var text = this.props.text;
    var arr = Array(this.props.num).join().split(",").map(function(v, i) {
      return (
        <div style={{
            float:"left",
            clear:"left",
            fontFamily:"sans-serif",
            fontWeight:"lighter",
            padding:"3px"}}>
          Nav List Item
        </div>);
    });
    console.log(arr);
    return (<div style={{paddingLeft:"50px"}}>{arr}</div>);
  }
}

class AdsBar extends Component {
  render() {
    var text = this.props.text;
    var arr = Array(this.props.num).join().split(",").map(function(v, i) {
      return <ContentItem />
    });
    console.log(arr);
    return (<div>{arr}</div>);
  }
}

export class App extends Component {
  render() {
    return (
      <div style={{
          display:"flex",
          flexDirection:"column",
          backgroundColor:"#e9eaed",
          overflow:"hidden",
          width:"100%",
          left:"0px"}}>
        <HeaderBar />
        <div style={{
            display:"flex",
            flexDirection: "row",
            flex:1,
            top:"50px",
            position:"relative"}}>
          <div style={{flex:1}}>
            <ContentItem />
            <ContentItem />
            <ContentItem />
            <ContentItem />
            <ContentItem />
            <ContentItem />
            <ContentItem />
          </div>
          <div style={{order: -1, flex:"0 0 12em"}}>
            <NavBar num={100}/>
          </div>
          <div style={{flex:"0 0 25%"}}>
            <AdsBar num={100}/>
          </div>
          <div style={{flex:"0 0 10%", order:2}}>
          </div>
        </div>
      </div>
    );
  }
}
