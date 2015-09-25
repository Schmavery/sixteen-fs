import React, { Component } from 'react';
import {Hover, Rule, ContentWrapper} from './util';
import {HeaderBar} from './header';
import {Post,NewStatus} from "./content";
import {NavBar} from './nav';

var f16 = 'ffffffffffffffff';

class AdsBar extends Component {
  render() {
    var text = this.props.text;
    var arr = Array(this.props.num).join().split(',').map(function(v, i) {
      return <ContentWrapper />
    });
    return (<div>{arr}</div>);
  }
}

export class App extends Component {
  render() {
    return (
      <div style={{
          display:'flex',
          flexDirection:'column',
          backgroundColor:'#e9eaed',
          overflow:'hidden',
          width:'100%',
          left:'0px',
          fontFamily:'sans-serif'}}>
        <HeaderBar />
        <div style={{
            display:'flex',
            flexDirection: 'row',
            flex:1,
            top:'50px',
            position:'relative'}}>
          <div style={{flex:'0 0 35em'}}>
            <ContentWrapper />
            <ContentWrapper />
            <ContentWrapper />
            <ContentWrapper />
            <ContentWrapper>Test</ContentWrapper>
            <ContentWrapper />
            <ContentWrapper />
          </div>
          <div style={{flex:'0 1 5em',order:-2, width:'5em'}}>
          </div>
          <div style={{order: -1, flex:'0 0 12em'}}>
            <NavBar />
          </div>
          <div style={{flex:'0 0 20em'}}>
            <AdsBar num={10}/>
          </div>
          <div style={{flex:'0 1 10em', order:2}}>
          </div>
        </div>
      </div>
    );
  }
}
