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
  }

  changePage(page) {
    this.setState({page:page});
  }

  getHelper(){
    // return {
    //   changePage: (function(page) {this.setState({page:page});}).bind(this),
    //   setAccount: (function(account) {this.setState({account:account})});
    // }
  }

  render() {
    switch (this.state.page){
      case 'login':
        return <LoginPage changePage={this.changePage.bind(this)} account={this.state.account} />;
      case 'feed':
        return <NewsFeed account={this.state.account} />;
    }
  }
}
