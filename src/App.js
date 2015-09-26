import React, { Component } from 'react';
import {Hover, Rule} from './util';
import {HeaderBar} from './header';
import {Post, Ad, AdFooter, NewStatus} from "./content";
import {NavBar} from './nav';

var f16 = 'ffffffffffffffff';

class AdsBar extends Component {
  render() {
    var text = this.props.text;
    var arr = Array(this.props.num).join().split(',').map(function(v, i) {
      return <Ad />
    });
    return (<div>{arr}<AdFooter /></div>);
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
          fontSize:'90%',
          fontFamily:'sans-serif'}}>
        <HeaderBar />
        <div style={{
            display:'flex',
            flexDirection: 'row',
            flex:1,
            top:'50px',
            position:'relative'}}>
          <div style={{flex:'0 0 35em'}}>
            <NewStatus />
            <Post liked={'Bob Joe'}/>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <div style={{flex:'0 1 5em',order:-2, width:'5em'}}>
          </div>
          <div style={{order: -1, flex:'0 0 12em'}}>
            <NavBar />
          </div>
          <div style={{flex:'0 0 20em'}}>
            <AdsBar num={1}/>
          </div>
          <div style={{flex:'0 1 10em', order:2}}>
          </div>
        </div>
      </div>
    );
  }
}
