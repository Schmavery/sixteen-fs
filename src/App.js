import React, { Component } from 'react/addons';
import {Hover, Rule} from './util';
import {NewsFeed} from './feed'
import {LoginPage} from './login'

export class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 'login',
      account: {
        siteName: 'ffffffffffffffff',
        first: 'Mark',
        last: 'Zuckerberg',
        posts: [{id:1, content:"PSADP S A L DSA P L DA SLD"}],
        comments: []
      }
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
      addAccountElement: (type, el) => {
        var newState = React.addons.update(this.state, {
          account: {[type]:{$push: el}}
        });
        this.setState(newState);
      },
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
