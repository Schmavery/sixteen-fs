import React, { Component } from 'react';
import Util, {Hover, ContentWrapper, Rule, Image, VertRule, NameTag} from './util';
var f16 = 'ffffffffffffffff';

class PersonBrief extends Component {
  render () {
    var post = this.props.post;
    var account = this.props.fns.getAccount(post.author);
    return (
      <div style={{
        display: Util.flex,
        marginBottom: '15px'}}>
        <Image style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'red'}} />
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('column'),
          marginLeft: '10px'}}>
          <NameTag user={this.props.fns.getAccount(post.author)}/>
          <Hover
            hover={{textDecoration: 'underline'}}
            style={{
              color: '#9197a3',
              marginTop: '2px'}}>
            {Util.formatTime(post.time)}
          </Hover>
        </div>
      </div>
    );
  }
}

class FeedBackSection extends Component {
  render () {
    return  (
      <div style={{
        color: '#9197a3',
        fontWeight: 'bold'}}>
        <Rule />
        Like  -  Comment  -  Share
      </div>
    );
  }
}

export class Post extends Component {
  render () {
    return (
      <ContentWrapper>
      {this.props.liked ?
        <span>
          <div style={{
            display: Util.flex,
            alignItems: Util.alignItems('center')}}>
            <NameTag name={this.props.liked}/>
            <div>&nbsp;liked this.</div>
          </div>
          <Rule />
        </span> : null}
      <PersonBrief fns={this.props.fns} post={this.props.post}/>
        {this.props.post.content}
      <FeedBackSection />
      </ContentWrapper>);
  }
}

export class Ad extends Component {
  render () {
    return (
      <ContentWrapper>
        <span style={{
          fontWeight: 'bold',
          color: '#9197a3'}}>
          TRENDING
        </span>

        <Rule />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </ContentWrapper>);
  }
}

export class AdFooter extends Component {
  render () {
    return (
      <div style={{
        marginLeft: '20px',
        fontSize: '90%',
        color: '#9197a3'}}>
        English (US) · Privacy · Terms · Cookies · Advertising · Ad Choices ·
        More <br />
        {f16} © 2015
      </div>
    );
  }
}

export class NewStatus extends Component {
  constructor (props) {
    super(props);
    this.state = {newStatus: ''};
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost () {
    if (this.state.newStatus.trim()){
      var post = {
        author: this.props.fns.getAccount().id,
        id: Util.genID('post'),
        time: Date.now(),
        content: this.state.newStatus
      }
      this.props.fns.addElement('posts', post);
      this.setState({newStatus: ''});
    }
  }

  render () {
    return (
      <ContentWrapper>
        <span style={{
          display: Util.flex,
          alignItems: Util.alignItems('center'),
          fontSize: '90%'}}>
          <Image style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'red'}} />
          <div style={{
            marginLeft: '5px',
            marginRight: '10px',
            fontWeight: 'bold'}}>
            Update Status
          </div>
          <VertRule color='#e9eaed' />
          <Image style={{
            marginLeft: '10px',
            width: '20px',
            height: '20px',
            backgroundColor: 'red'}} />
          <div style={{
            marginLeft: '5px',
            marginRight: '10px',
            fontWeight: 'bold'}}>
            Add Photos/Video
          </div>
          <VertRule color='#e9eaed' />
          <Image style={{
            marginLeft: '10px',
            width: '20px',
            height: '20px',
            backgroundColor: 'red'}} />
          <div style={{
            marginLeft: '5px',
            marginRight: '10px',
            fontWeight: 'bold'}}>
            Create Photo Album
          </div>
        </span>
        <Rule />
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('row')}}>
          <Image style={{
            margin: '5px',
            width: '40px',
            height: '40px',
            backgroundColor: 'red'}} />
          <textarea
            style={{
              marginTop: '10px',
              minHeight: '50px',
              width: '100%',
              border: '0px',
              outline: '0px',
              resize: 'none'
            }}
            placeholder="What's on your mind?"
            value={this.state.newStatus}
            onChange={e => this.setState({newStatus:e.target.value})}
            onKeyPress={
              e => (e.which === 13 && !e.shiftKey) ?
                e.preventDefault() || this.handlePost() :
                null}/>
        </div>
        <Rule />
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('row')}}>
          <div style={{
            cursor: 'pointer',
            marginLeft:'auto',
            padding:'5px 20px',
            backgroundColor:'#3b5998',
            color:'#fff',
            fontWeight:'bold',
            borderRadius:'2px'}}
            onClick={e => this.handlePost()}>
            Post
          </div>
        </div>
      </ContentWrapper>
    );
  }
}
