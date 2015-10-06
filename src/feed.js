import React, { Component } from 'react';
import Util, {Hover, Rule} from './util';
import {Post, AdFooter, NewStatus, ContentWrapper} from './content';
import {NavBar} from './nav';
import {AdsBar} from './ads';
import {HeaderBar} from './header';

export class MainWrapper extends Component {
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

        {this.props.children}
        <div style={{height:'150px'}}>
        </div>
      </div>);

  }
}

export class NewsFeed extends Component {
  componentDidMount(){
    // Update times every 5 seconds
    this.interval = setInterval(() => {this.forceUpdate()}, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    this.internal = null;
  }

  render() {
    return (
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
              <Post key={'key'+v.id} post={v} fns={this.props.fns} />
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
          <AdsBar fns={this.props.fns}/>
        </div>
        <div style={{
          flex: '0 1 10em',
          order: 2}}>
        </div>
      </div>
    );
  }
}
