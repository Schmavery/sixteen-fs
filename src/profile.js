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
    var MAX_WIDTH = 200;
    var MAX_HEIGHT = 200;
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = (upload) => {
      var canvas = document.createElement('canvas');
      canvas.style.display = 'none';
      document.body.appendChild(canvas);
      var img = document.createElement("img");
      img.src = upload.target.result;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var width = img.width;
      var height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      var dataUrl = canvas.toDataURL("image/png");

      canvas.parentNode.removeChild(canvas);

      console.log("DataUrl:", typeof dataUrl, "-"+dataUrl+"-", dataUrl.length, upload.target.result.length);
      var accts = this.props.fns.getAccounts();
      accts.forEach(acct => acct === this.props.fns.getAccount() ? acct.image = dataUrl : null);
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
