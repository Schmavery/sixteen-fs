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

export class Profile extends Component{
  constructor(props){
      super(props);
      this.handleImage = this.handleImage.bind(this);
  }

  handleImage(e){
    console.log("HELLO");
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = (upload) => {
      console.log("HI", upload.target.result);
      //this.props.fns.setAccount({image: upload.target.result});
    ///this.props.fns.deepUpdate();
      var accts = this.props.fns.getAccounts();
      console.log("ACCTS",accts);
      accts.forEach(acct => acct === this.props.fns.getAccount() ? acct.image = upload.target.result : null);
      this.props.fns.deepUpdate({'accounts':{$set: accts}});
    }
    reader.readAsDataURL(file);
  }

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
            <form>
            <input type="file" onChange={this.handleImage}/>
            </form>
          </div>

        </div>
      </div>
    )
  }
}
