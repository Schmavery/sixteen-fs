import React, { Component } from 'react/addons';
import Util, {Hover, Rule} from './util';
import {NewsFeed, MainWrapper} from './feed';
import {LoginPage} from './login';
import {Profile} from './profile';
import {HeaderBar} from './header';
import {Search} from './search';

import Data from './data';

export class App extends Component {
  constructor (props) {
    super(props);
    var url = window.location.href.split('#')[1], page, info;
    console.log('url',url);
    if (!url) {
      page ='feed';
      info = null;
      console.log('!url',page)
    } else {
      var d = Util.uriDecodeObj(url);
      page = d.page;
      info = d.info;
      console.log("GETTING INFO FROM URL",d);
    }
    console.log(page);
    this.state = {
      page: page,
      pageInfo: info,
      siteName: 'ffffffffffffffff',
      userID: '1',
      posts: [{id:'1', author:'1', time: Date.now().toString(), content:'Welcome to the site!'}],
      accounts: [{
        id: '1',
        first: 'Mark',
        last: 'Zuckerberg',
        email: 'mark@gmail.com',
        about: 'I made facebook.com!',
        image: Data.zuck
      }],
      comments: [{id:'1', author:'1', post:'1', time: Date.now().toString(), content: "Thanks!"}],
      commentLikes: [],
      likes: []
    };

    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.page){
        console.log(e.state.page, this.state.page);
        this.setState({page:e.state.page, pageInfo:e.state.pageInfo})
      }
    });
    window.history.replaceState({page:page, pageInfo:info},page,'#'+page+Util.uriEncodeObj(info));

    this.helper = {
      changePage: (page, info) => {
        console.log('changing page to '+page);
        window.history.pushState({page:page, pageInfo:info},this.state.siteName+" "+page,'#'+page+Util.uriEncodeObj(info));
        this.setState({page:page, pageInfo:info})
      },
      setAccount: account => {
        var newAcc = {};
        Object.keys(account).forEach(k => newAcc[k] = {$set:account[k]});
        var newState = React.addons.update(this.state, {
          account: newAcc
        });
        this.setState(newState);
      },
      addElement: (type, el, cb) => {
        this.helper.deepUpdate({[type]:{$push: [el]}}, cb)
      },
      deepUpdate: (el, cb) => {
        var newState = React.addons.update(this.state, el);
        this.setState(newState, cb);
      },
      getAccount: id => this.state.accounts.filter((a) => a.id === (id || this.state.userID))[0],
      getAccounts: () => this.state.accounts,
      getSiteName: () => this.state.siteName,
      getPosts: () => this.state.posts
        .filter((e) => this.helper.friends(this.state.userID, e.author))
        .sort((e1, e2) => e2.time - e1.time),
      login: (e, p) => {
        if (!(e && p)){
          return false;
        }
        var accts = this.state.accounts.filter(
          (a) => a.password === Util.hash(p) && a.email === e)
        if (accts) {
          this.setState({userID: accts[0].id})
          this.helper.changePage('feed');
          return true;
        }
        return false;
      },
      friends: (id1, id2) => true,
      setSiteName: name => this.setState({siteName:name}),
      getLikes: post => post ? this.state.likes.filter(like => (post.id === like.post)) : this.state.likes,
      getComments: post => post ? this.state.comments.filter(comment => (post.id === comment.post)) : this.state.comments,
      getCommentLikes: c => c ? this.state.commentLikes.filter(l => c.id === l.comment) : this.state.commentLikes,
      getStateDebug: () => this.state
    }


    Object.keys(this.helper).forEach(k => this.helper[k].bind(this));
    window.helper = this.helper;
  }
  render() {
    switch (this.state.page){
      case 'login':
        return <LoginPage fns={this.helper} />;
      case 'feed':
        return (
          <MainWrapper fns={this.helper}>
            <NewsFeed fns={this.helper} />;
          </MainWrapper>
        );
      case 'profile':
        return (
          <MainWrapper fns={this.helper}>
            <Profile user={this.state.pageInfo} fns={this.helper} />
          </MainWrapper>
        );
      case 'search':
        return (
          <MainWrapper fns={this.helper}>
            <Search info={this.state.pageInfo || {}} fns={this.helper} />
          </MainWrapper>
        );
      default:
        console.log('ERROR in App.render:',this.state.page, this.state.info);
    }
  }
}
