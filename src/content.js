import React, { Component } from 'react';
import Util, {Hover, Rule, Image, VertRule, NameTag, ProfilePic, ModalWindow} from './util';
import Data from './data';

class LikesWindow extends Component {
  render() {
    var accounts = this.props.likes.map(l => this.props.fns.getAccount(l.author));
    console.log(accounts);
    return (
      <ModalWindow style={{width:300,maxHeight:400,display:Util.flex,flexDirection:Util.flexDirection('column'),}}>
        <div style=
        {{
          display:Util.flex,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          flexDirection:Util.flexDirection('row'),
          margin:-10,
          marginBottom:10,
          padding:10,
          backgroundColor:'#f6f7f8',
          borderBottom:'1px solid #e9eaed'}}>
          <div style={{marginRight:'auto',fontWeight:'bold',fontFamily:'sans-serif'}}>
            People Who Like This
          </div>
          <div onClick={this.props.close} style=
            {{
              marginLeft:'auto',
              cursor:'pointer',
              color:'grey',
              fontWeight:'bold',
            }}>✕
          </div>
        </div>
        <div style={{overflowY:'auto',marginRight:-10}}>
        {accounts.map((u, i) =>
          [i == 0 ? "" : <Rule />,
          (<div style={{padding:'2px 10px',display: Util.flex, flexDirection: Util.flexDirection('row')}}>
            <ProfilePic user={u} style={{height:30,width:30,alignItems:'center',justifyContent:'center'}}/>
            <NameTag fns={this.props.fns} user={u} style={{padding:3,marginLeft:10}}/>
          </div>)])}
        </div>
      </ModalWindow>
    );
  }
}

class PersonBrief extends Component {
  render () {
    var post = this.props.post;
    var account = this.props.fns.getAccount(post.author);
    return (
      <div style={{
        display: Util.flex,
        marginBottom: '15px'}}>
        <ProfilePic user={account} style={{
          width: '40px',
          height: '40px'}} />
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('column'),
          marginLeft: '10px'}}>
          <NameTag user={this.props.fns.getAccount(post.author)} fns={this.props.fns}/>
          <Hover
            hover={{textDecoration: 'underline'}}
            style={{
              color: '#9197a3',
              marginTop: '2px'}}>
            {Util.timeAgo(post.time)}
          </Hover>
        </div>
      </div>
    );
  }
}

class FeedBackSection extends Component {
  constructor(props){
    super(props);
    this.state = {liked: this.isAlreadyLiked()};

    this.isAlreadyLiked = this.isAlreadyLiked.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  isAlreadyLiked(){
    var likes = this.props.fns.getLikes(this.props.post);
    return likes.some(v => this.props.fns.getAccount().id === v.author);
  }

  handleLike(){
    var accId = this.props.fns.getAccount().id;
    if (this.state.liked){
      var likes = this.props.fns.getLikes().filter(v => v.author !== accId || v.post !== this.props.post.id);
      console.log(likes);
      this.props.fns.deepUpdate({'likes':{$set: likes}}, () => console.log(this.props.fns.getLikes()));
    } else {
      this.props.fns.addElement('likes',
        {
          author: accId,
          post: this.props.post.id,
          time: Date.now().toString()
        });
    }
    this.setState({liked: !this.state.liked});
  }

  render () {
    var post = this.props.post;
    var likes = this.props.fns.getLikes(post);
    console.log("render:",post.id,likes);
    var likeStyle;
    if (this.state.liked){
      likeStyle = {display:"inline", color: '#3b5998'};
    } else {
      likeStyle = {display:"inline"};
    }

    var likesString = likes.length
      ? likes.length+" "+(likes.length === 1 ? "person likes" : "people like")+" this."
      : null;

    return (
      <div style={{
        color: '#9197a3',
        fontWeight: 'bold'}}>
        <Rule />
        <Hover hover={{textDecoration: 'underline'}} style={{display:'inline',userSelect:'none',cursor:'pointer',...likeStyle}}
          onClick={this.handleLike}>
          👍 Like
        </Hover>
        <Hover hover={{textDecoration: 'underline'}} style={{display:'inline',marginLeft:30,cursor:'pointer'}}
          onClick={() => React.findDOMNode(this.refs.write).children[1].focus()}>
          💬 Comment
        </Hover>
        <Hover hover={{textDecoration: 'underline'}} style={{display:'inline',marginLeft:30,cursor:'pointer'}}>
          ➦ Share
        </Hover>
         <Rule />
         {likesString ?
           <Hover
             hover={{textDecoration: 'underline'}}
             onClick={() => this.props.fns.displayModal(c => <LikesWindow likes={likes} fns={this.props.fns} close={c}/>)}
             style={{
               cursor:'pointer',
               color:"#355089",
               fontFamily:'sans-serif',
               fontWeight:'normal'}}>{likesString}</Hover> : ""}
         {likesString ? <Rule /> : ""}
         {
           this.props.fns.getComments(post).map((v) =>
              <Comment key={'key'+v.id} comment={v} fns={this.props.fns} />)
         }
         <WriteComment post={this.props.post} fns={this.props.fns} ref="write"/>
      </div>
    );
  }
}

export class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {liked: this.isAlreadyLiked()};

    this.isAlreadyLiked = this.isAlreadyLiked.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  isAlreadyLiked(){
    var likes = this.props.fns.getCommentLikes(this.props.comment);
    return likes.some(l => this.props.fns.getAccount().id === l.author);
  }

  handleLike(){
    var accId = this.props.fns.getAccount().id;
    if (this.state.liked){
      var likes = this.props.fns.getCommentLikes().filter(l => l.author !== accId || l.comment !== this.props.comment.id);
      this.props.fns.deepUpdate({'commentLikes':{$set: likes}});
    } else {
      this.props.fns.addElement('commentLikes',
        {
          author: accId,
          comment: this.props.comment.id,
          time: Date.now().toString()
        });
    }
    this.setState({liked: !this.state.liked});
  }

  render () {
    var fns = this.props.fns;
    var author = fns.getAccount(this.props.comment.author);
    var likes = fns.getCommentLikes(this.props.comment);
    var likeText = this.state.liked ? "Unlike" : "Like";
    return (
      <div style={{
        marginTop:10,
        display: Util.flex,
        flexDirection: Util.flexDirection('row'),
      }}>
        <ProfilePic user={author} style={{height:30, width:30, display:'inline'}} />
        <div style={{flex:1, marginLeft:5, display: Util.flex, flexDirection: Util.flexDirection('column')}}>
          <div>
            <NameTag style={{display:'inline'}} user={author} fns={fns}/>
            &nbsp;
            <span style={{
              color:"black",
              fontFamily:'sans-serif',
              fontWeight:'normal',
              fontSize:'small'
            }}>
              {Util.processContent(this.props.comment.content)}
            </span>
          </div>
          <div><span style={{fontWeight:'normal', fontSize:'small'}}>
            <Hover onClick={this.handleLike}
              hover={{textDecoration:'underline'}}
              style={{display:'inline',cursor:'pointer',color:'#6182c6'}}>{likeText}</Hover>
            {
              likes.length > 0 ? <div style={{color:'#6182c6',display:'inline'}}>
              &nbsp;·&nbsp;
              <Hover hover={{textDecoration:'underline'}} style={{cursor:'pointer',display:'inline'}}
                onClick={() => this.props.fns.displayModal(c => <LikesWindow likes={likes} fns={this.props.fns} close={c}/>)}
              >
                👍 {likes.length}
              </Hover></div> : ""
            }
           &nbsp;· {Util.timeAgo(this.props.comment.time)}</span></div>
        </div>
        {
          (fns.getAccount().id == author.id) ?
          <div style={{display:'inline',marginRight:5,cursor:'pointer'}}
            onClick={() => {
              fns.deepUpdate({'commentLikes':{$set: fns.getCommentLikes().filter(l => l.comment !== this.props.comment.id)}})
              fns.deepUpdate({'comments':{$set: fns.getComments().filter(c => c !== this.props.comment)}})
            }}>
            ✕
          </div> : ""
        }
      </div>
    );
  }
}

export class WriteComment extends Component {
  constructor(props){
    super(props);
    this.state = {content: ""};
    this.submitComment = this.submitComment.bind(this);
  }

  submitComment(){
    console.log("Submitting comment '"+this.state.content+"'");
    if (this.state.content.trim()){
      //{id:'1', author:'1', post:'1', time: Date.now().toString(), content: "Thanks!"}
      var comment = {
        id: Util.genID('post'),
        author: this.props.fns.getAccount().id,
        post: this.props.post.id,
        time: Date.now().toString(),
        content: this.state.content,
      }
      this.props.fns.addElement('comments', comment);
      this.setState({content: ''});
    }
  }

  render () {
    return (
      <div style={{
          marginTop:10,
          display: Util.flex,
          flexDirection: Util.flexDirection('row'),
        }}>
        <ProfilePic user={this.props.fns.getAccount()} style={{height:30, width:30}} />
        <input
          type='text'
          placeholder="Write a comment..."
          value={this.state.content}
          onChange={(e) => this.setState({content: e.target.value})}
          onKeyPress={
            e => {
              if (e.which === 13 && !e.shiftKey){
                e.preventDefault();
                this.submitComment();
              }
            }
          }
          style={{
            height:28,
            marginLeft:5,
            paddingLeft:5,
            outline:0,
            flex:1,
            border:"1px solid lightgrey"
          }}/>
      </div>
    )
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
            <NameTag name={this.props.liked} fns={this.props.fns}/>
            <div>&nbsp;liked this.</div>
          </div>
          <Rule />
        </span> : null}
      <PersonBrief fns={this.props.fns} post={this.props.post}/>
        {Util.processContent(this.props.post.content)}
      <FeedBackSection post={this.props.post} fns={this.props.fns}/>
      </ContentWrapper>);
  }
}

export class ContentWrapper extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: '#fff',
        padding: '10px',
        margin:  '10px',
        marginLeft: '10px',
        borderRadius: '3px',
        border: '1px solid #dfe3ee',}}>
        {this.props.children}
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
        content: this.state.newStatus,
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
          {Data.edit({
            width: '20px',
            height: '20px'})}
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
            marginLeft: 5,
            marginRight: 10,
            fontWeight: 'bold'}}>
            Create Photo Album
          </div>
        </span>
        <Rule />
        <div style={{
          display: Util.flex,
          flexDirection: Util.flexDirection('row')}}>
          <ProfilePic user={this.props.fns.getAccount()} style={{
            flexShrink:0,
            margin: 5,
            width: 40,
            height: 40}} />
          <textarea
            style={{
              marginTop: 10,
              minHeight: 50,
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
