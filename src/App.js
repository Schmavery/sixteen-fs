import React, { Component } from 'react';
import {Hover, Rule, ContentWrapper} from './util';
import {HeaderBar} from './header';
import {NavBar} from './nav';
import { NICE, SUPER_NICE } from './colors';

var f16 = "ffffffffffffffff";

class AdsBar extends Component {
  render() {
    var text = this.props.text;
    var arr = Array(this.props.num).join().split(",").map(function(v, i) {
      return <ContentWrapper />
    });
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
          left:"0px",
          fontFamily:"sans-serif"}}>
        <HeaderBar />
        <div style={{
            display:"flex",
            flexDirection: "row",
            flex:1,
            top:"50px",
            position:"relative"}}>
          <div style={{flex:"0 0 30em"}}>
            <ContentWrapper />
            <ContentWrapper />
            <ContentWrapper />
            <ContentWrapper />
            <ContentWrapper>Test</ContentWrapper>
            <ContentWrapper />
            <ContentWrapper />
          </div>
          <div style={{flex:1, order:-2, maxWidth:"3em"}}>
          </div>
          <div style={{order: -1, flex:"0 0 12em"}}>
            <NavBar num={100}/>
          </div>
          <div style={{flex:"0 0 17em"}}>
            <AdsBar num={100}/>
          </div>
          <div style={{flex:"0 0 10em", order:2}}>
          </div>
        </div>
      </div>
    );
  }
}
