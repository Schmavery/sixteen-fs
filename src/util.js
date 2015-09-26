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
    var s = this.state.hover ? {...this.props.style,...this.props.common,overflow:'hidden'} :
                {...this.props.common,overflow:'hidden'};
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
        height:0,
        width:'100%',
        borderTop:'1px solid #e9eaed'}} />);
  }
}

export class VertRule extends Component {
  render() {
    return (
      <div style={{borderLeft:"1px solid",height:"1.5em",borderColor:this.props.color}} />);
  }
}

export class ContentWrapper extends Component {
  render() {
    return (<div style={{
      backgroundColor:'#fff',
      padding:'10px',
      margin: '10px',
      marginLeft:'10px',
      borderRadius:'3px',
      border:'1px solid #dfe3ee',
    }}>
      {this.props.children}
    </div>);
  }
}

export class Image extends Component {
  render() {
    return (
      <div style={this.props.style} />
    );
  }
}