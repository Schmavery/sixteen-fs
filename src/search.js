import React, { Component } from 'react';
import Util, {Hover, Rule} from './util';
import {Post, Ad, AdFooter, NewStatus} from './content';
import {NavBar} from './nav';
import {HeaderBar} from './header';
import {MainWrapper, AdsBar} from './feed';

class SearchResult extends Component {
  render () {
    return (
      <span>Placeholder</span>
    );
  }
}

export class Search extends Component {
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
              <SearchResult fns={this.props.fns} />
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
    );
  }
}
