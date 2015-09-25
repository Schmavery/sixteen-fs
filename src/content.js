import React, { Component } from 'react';
import {Hover, ContentWrapper} from './util';
var f16 = 'ffffffffffffffff';

export class Post extends Component {
  render () {
    return (
      <ContentWrapper>
        <Image style={{width:"100px",height:"100px",backgroundColor:"red"}} />FirstName LastName
      </ContentWrapper>);
  }
}

export class NewStatus extends Component {
  render () {
    return (<div />);
  }
}
