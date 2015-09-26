import React, { Component } from 'react';
import {Hover, Rule} from './util';
import {NewsFeed} from './feed'
import {LoginPage} from './login'

export class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 'login',
      account: {
        siteName: "ffffffffffffffff",
        first: "Mark",
        last: "Zuckerberg"
      }
    };
    this.changePage = this.changePage.bind(this);
    this.getHelper = this.getHelper.bind(this);
  }

  changePage(page) {
    this.setState({page:page});
  }

  getHelper(){
    var obj = {
      changePage: (page) => this.setState({page:page}),
      setAccount: (account) => this.setState({account:account})
    }
    Object.keys(obj).forEach(k => obj[k].bind(this));
    return obj; 
  }

  render() {
    switch (this.state.page){
      case 'login':
        return <LoginPage fns={this.getHelper()} account={this.state.account} />;
      case 'feed':
        return <NewsFeed account={this.state.account} />;
    }
  }
}
