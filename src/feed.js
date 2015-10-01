import React, { Component } from 'react';
import Util, {Hover, Rule} from './util';
import {HeaderBar} from './header';
import {Post, Ad, AdFooter, NewStatus} from './content';
import {NavBar} from './nav';

class AdsBar extends Component {
  render() {
    var text = this.props.text;
    var arr = Array(this.props.num).join().split(',').map(function(v, i) {
      return <Ad />
    });
    return (<div>{arr}<AdFooter /></div>);
  }
}

export class NewsFeed extends Component {
  render() {
    return (
      <div style={{
        display: Util.flex,
        flexDirection: Util.flexDirection('column'),
        minHeight: '100vh',
        backgroundColor: '#e9eaed',
        overflow: 'hidden',
        width: '100%',
        fontSize: '90%',
        fontFamily: 'sans-serif'}}>
        <HeaderBar fns={this.props.fns}/>
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('row'),
          justifyContent:Util.justifyContent('center'),
          flex: 1,
          top: '60px',
          position: 'relative'}}>
          <div style={{flex: '0 0 35em'}}>
            <NewStatus fns={this.props.fns} />
            {
              this.props.fns.getPosts().map((v) =>
                <Post post={v} fns={this.props.fns} />
              )
            }
          </div>
          <div style={{
            flex: '0 1 5em',
            order: -2,
            width: '5em'}}>
          </div>
          <div style={{
            order: -1,
            flex: '0 0 12em'}}>
            <NavBar fns={this.props.fns}/>
          </div>
          <div style={{flex: '0 0 20em'}}>
            <AdsBar num={1}/>
          </div>
          <div style={{
            flex: '0 1 10em',
            order: 2}}>
          </div>
        </div>
        <div style={{height:'150px'}}>
        </div>
      </div>
    );
  }
}
