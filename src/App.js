import React, { Component } from 'react/addons';
import Util, {Hover, Rule} from './util';
import {NewsFeed, MainWrapper} from './feed';
import {LoginPage} from './login';
import {Profile} from './profile';
import {HeaderBar} from './header';

export class App extends Component {
  constructor (props) {
    super(props);
    var page = window.location.href.split('#')[1] || 'feed';
    console.log(page);
    this.state = {
      page: page,
      pageInfo: null,
      siteName: 'ffffffffffffffff',
      userID: '1',
      posts: [{id:'1', author:'1', time: Date.now().toString(), content:'PSADP S A L DSA P L DA SLD'}],
      accounts: [{
        id: '1',
        first: 'Mark',
        last: 'Zuckerberg'}],
      comments: []
    };
    console.log("COMNASONSTPISD");
    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.page){
        console.log(e.state.page, this.state.page);
        this.setState({page:e.state.page, pageInfo:e.state.pageInfo})
        //this.helper.changePage(e.state.page, e.state.pageInfo);
      }
    });
    window.history.replaceState({page:page, pageInfo:null},page,'#'+page);

    this.helper = {
      changePage: (page, info) => {
        console.log('changing page to '+page);
        window.history.pushState({page:page, pageInfo:info},this.state.siteName+" "+page,'#'+page);
        this.setState({page:page, pageInfo:info})
      },
      setAccount: (account) => {
        var newAcc = {};
        Object.keys(account).forEach(k => newAcc[k] = {$set:account[k]});
        var newState = React.addons.update(this.state, {
          account: newAcc
        });
        this.setState(newState);
      },
      addElement: (type, el, cb) => {
        var newState = React.addons.update(this.state, {[type]:{$push: [el]}});
        this.setState(newState, cb);
      },
      getAccount: (id) => this.state.accounts.filter((a) => a.id === (id || this.state.userID))[0],
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
      friends: (id1, id2) => true
    }
    Object.keys(this.helper).forEach(k => this.helper[k].bind(this));
  }
  render() {
    console.log("RENDERPAGE:"+this.state.page);
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
            <Search info={this.state.pageInfo} fns={this.helper} />
          </MainWrapper>
        );
    }
  }
}
