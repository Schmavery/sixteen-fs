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
    this.helper = {
      changePage: (page) => this.setState({page:page}),
      setAccount: (account) => this.setState({account:account}),
      getAccount: () => this.state.account
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
