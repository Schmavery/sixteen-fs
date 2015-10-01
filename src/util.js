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
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  }
  onMouseLeave() {
    this.setState({hover: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  }
  render(){
    var {hover: isHover} = this.state;
    var {hover, style, noHover, onClick, children} = this.props;

    var s = {
      ...style,
      ...noHover,
      overflow:'hidden'
    };

    if (isHover) {
      s = {
        ...style,
        ...hover,
        overflow:'hidden'
      };
    }

    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.props.onClick}
        style={s}>
        {this.props.children}
      </div>);
  }
}

export class Rule extends Component {
  render() {
    return (
      <hr style={{
        border: 0,
        height: 0,
        width: '100%',
        borderTop: '1px solid #e9eaed'}} />
    );
  }
}

export class VertRule extends Component {
  render() {
    return (
      <div style={{
        borderLeft: '1px solid',
        height: '1.5em',
        borderColor: this.props.color}} />
    );
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

export class Image extends Component {
  render() {
    return (
      <div style={this.props.style} />
    );
  }
}

export class NameTag extends Component {
  render() {
    var name = this.props.name ||
      (this.props.user.first + " " + this.props.user.last);
    return (
      <Hover
        hover={{
          textDecoration: 'underline'
        }}
        style={{
          color: '#355089',
          fontWeight: 'bold'
        }}>
        {name}
      </Hover>
    );
  }
}

var formatTime = (t) => {
  var curTime = Date.now();
  return (new Date(parseInt(t))).toString();
}

var hash = (s) => '-hash-'+s;

var genID = (s) => s.split("").reduce(
  function (acc, v, i){return acc + v.charCodeAt(0)*Math.pow(10,i)}, 0).toString() +
  Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString();

var flex = 'flex;display:-webkit-flex;display:-ms-flexbox';
var flexDirection = (d) => d+';-webkit-flex-direction:'+d;
var alignItems = (d) => d+';-webkit-align-items:'+d;
var justifyContent = (d) => d+';-webkit-justify-content:'+d;

export default {
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  genID,
  hash,
  formatTime
};
