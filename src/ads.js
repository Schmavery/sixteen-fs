import React, { Component } from 'react';
import Util, {Hover, Rule} from './util';
import {Post, NewStatus, ContentWrapper} from './content';

export class AdsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.abort = Util.callAjax('http://content.guardianapis.com/search?api-key=test',
      res => this.setState({res:JSON.parse(res).response.results}));
    console.log(this.abort);
  }

  componentWillUnmount(){
    if (this.abort) this.abort();
  }

  render() {
    var inner;
    if (this.state.res){
      inner = this.state.res.slice(0,5).map(d => (
        <div
          style={{
            fontSize:'90%',
            color: '#9197a3',
            marginBottom:'10px',
            cursor:'pointer'}}
          key={d.webUrl}
          onClick={Util.OpenInNewTab.bind(null, d.webUrl)}
        >
          <span style={{color: '#355089',fontWeight: 'bold'}}>{d.sectionName}</span>
          :&nbsp;{d.webTitle}
        </div>));
    } else {
      inner = "Loading...";
    }
    return (
      <div>
        <ContentWrapper>
          <span style={{
            fontWeight: 'bold',
            color: '#9197a3'}}>
            TRENDING
          </span>
          <Rule />
          {inner}
        </ContentWrapper>
        <div style={{
          marginLeft: '20px',
          fontSize: '90%',
          color: '#9197a3'}}>
          English (US) · Privacy · Terms · Cookies · Advertising · Ad Choices ·
          More <br />
          {this.props.fns.getSiteName()} © 2015
        </div>
      </div>);
  }
}
