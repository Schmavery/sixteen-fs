import React, { Component } from 'react';
import Util, {Hover, Rule, NameTag} from './util';

import {HeaderBar} from './header';
import {NavBar} from './nav';
import {AdsBar} from './feed';

class CoverSection {
  render () {
    return (
      <div style={{backgroundColor:'blue',width:'60em',height:'20em'}}>

      </div>
    )
  }
}

export class Profile {
  render () {
    var user = this.props.fns.getAccount(this.props.user.id);
    return (
      <div style={{
        display: Util.flex,
        flexDirection: Util.flexDirection('column'),
        top: '50px',
        marginRight: 'auto',
        marginLeft: '30px',
        position: 'relative'}}>
        <CoverSection />
        <div style={{
          display: Util.flex,
          top: '60px',
          position: 'relative'}}>
          <div style={{flex: '0 0 35em'}}>
            <NameTag user={user} fns={this.props.fns}/>
          </div>

        </div>
      </div>
    )
  }
}
