import React, { Component } from 'react';
import Util, {Hover, Rule, NameTag} from './util';
import {Post, Ad, AdFooter, NewStatus, ContentWrapper} from './content';
import {NavBar} from './nav';
import {HeaderBar} from './header';
import {AdsBar} from './ads';
import {MainWrapper} from './feed';

function match(q, el) {
  return (el.first + el.last).split("").reduce(
    (acc, v) => acc+(q.indexOf(v) > -1), 0);
}

class SearchResult extends Component {
  render () {
    var q = this.props.info.q || "";
    console.log(this.props.fns.getAccounts());
    return (
      <ContentWrapper>
      {this.props.fns.getAccounts().sort((e1, e2) => match(q, e2) - match(q, e1)).map(
        d => (
          <div key={d.email} style={{
            marginTop:'15px'
          }}>
            <NameTag user={d} fns={this.props.fns} noHover={true} />
          </div>
        )
      )}
      </ContentWrapper>
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
          <SearchResult info={this.props.info} fns={this.props.fns}/>
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
