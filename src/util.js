import React, { Component }  from 'react';

export class Hover extends Component {
  constructor(props) {
     super(props);
     this.state = {hover: false};
     this.onMouseEnter = this.onMouseEnter.bind(this)
     this.onMouseLeave = this.onMouseLeave.bind(this)
   }
  onMouseEnter() {
    this.setState({hover: true});
  }
  onMouseLeave() {
    this.setState({hover: false});
  }
  render(){
    var s = this.state.hover ? {...this.props.style,overflow:"hidden"} : {overflow:"hidden"};
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={s}>
        {this.props.children}
      </div>);
  }
}

export class Rule extends Component {
  render() {
    return (
      <hr style={{
        border:0,
        height:1,
        borderTop:"1px solid rgba(0, 0, 0, 0.1)",
        borderBottom:"1px solid rgba(255, 255, 255, 0.3)"}} />);
  }
}

export class ContentWrapper extends Component {
  render() {
    var content;
    if (!this.props.children){
      content = (<span>asfsafas gdsfgaoa sudnb osadn boasd nboasi dnboa sdoian sdbas
          doinboa
          <Rule />dnboiad asdnboasndb adsibnasdob asd boasd bojasd boajsd
          boajs dbojasd basgaknas asgkj asgj sajg asjg asg ksa gaks gas
          ga gwaogiwa giwa gawg </span>);
    } else {
      content = this.props.children;
    }
    return (<div style={{
      backgroundColor:"#fff",
      padding:"10px",
      margin: "10px",
      marginLeft:"10px",
      borderRadius:"3px",
      border:"1px solid #dfe3ee"
    }}>
      {content}
    </div>);
  }
}
