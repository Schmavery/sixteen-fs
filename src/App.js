import React, { Component } from 'react/addons';
import Util, {Hover, Rule} from './util';
import {NewsFeed} from './feed'
import {LoginPage} from './login'

export class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 'login',
      siteName: 'ffffffffffffffff',
      userID: '1',
      posts: [{id:'1', author:'1', time: Date.now().toString(), content:'PSADP S A L DSA P L DA SLD'}],
      accounts: [{
        id: '1',
        first: 'Mark',
        last: 'Zuckerberg'}],
      comments: []
    };
    this.helper = {
      changePage: (page) => this.setState({page:page}),
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
      getPosts: () => this.state.posts,
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
      printAccounts: () => console.log(this.state.userID, this.state.accounts, this.state.posts)
    }
    Object.keys(this.helper).forEach(k => this.helper[k].bind(this));
  }
  render() {
    switch (this.state.page){
      case 'login':
        return <LoginPage fns={this.helper} />;
      case 'feed':
        return <NewsFeed fns={this.helper} />;
    }
  }
}
