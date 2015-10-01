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
    var overflow = this.props.overflow || 'hidden';
    var s = {
      ...style,
      ...noHover,
      overflow:overflow
    };

    if (isHover) {
      s = {
        ...style,
        ...hover,
        overflow:overflow
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
  constructor(props) {
    super(props);
    this.toggleHoverProfile = this.toggleHoverProfile.bind(this);
    this.state = {hoverProfile: false, timeout: null}
  }

  toggleHoverProfile(on) {
    if (this.state.timeout) clearTimeout(this.state.timeout);
    if (on) {
      this.setState({timeout: setTimeout(() => this.setState({hoverProfile: true}), 500)})
    } else {
      this.setState({timeout: setTimeout(() => this.setState({hoverProfile: false}), 100)})
    }
  }

  render() {
    var name = (this.props.user.first + " " + this.props.user.last);
    var defStyle = this.props.style || {color: '#355089',fontWeight: 'bold'};
    return (
      <div style={{position:'relative'}}>
        <Hover
          hover={{
            textDecoration: 'underline'
          }}
          style={{
            ...defStyle,
            cursor: 'pointer',
          }}
          onClick={this.props.fns.changePage.bind(null,'profile',this.props.user)}
          onMouseEnter={this.toggleHoverProfile.bind(null, true)}
          onMouseLeave={this.toggleHoverProfile.bind(null, false)}>
          {name}
          {this.state.hoverProfile ?
            <HoverProfile user={this.props.user} fns={this.props.fns}/> : null}
        </Hover>
      </div>
    );
  }
}

export class FriendsDropdown extends Component {
  render() {
    return (
      <div> </div>
    );
  }
}

class HoverProfile extends Component {
  render() {
    var fullName = this.props.user.first + " " +this.props.user.last;
    return (
      <div style={{
        position:'absolute',
        top:'-13em',
        height:'12em',
        width:'20em',
        backgroundColor:'#fff',
        border:'solid 1px #dcdee3',
        borderRadius:'2px',
        zIndex:'50'
      }}>
        <Image style={{backgroundColor:"blue",width:'20em',height:'6em'}} />
        <div style={{
          background:'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))',
          width:'20em',height:'6em',
          position:'absolute',
          top:'0'
        }} />
        <div style={{
          backgroundColor:'#fff',
          padding:'3px',
          border:'solid 1px #dcdee3',
          borderRadius:'3px',
          position:'absolute',
          top:'2em',
          left:'1em',
        }}>
          <div style={{
            backgroundColor:"red",
            width:'6em',
            height:'6em',
            zIndex:'999',
          }}/>
        </div>
        <div style={{
          position:'absolute',
          top:'4em',
          left:'8em',
          color:'#fff',
          fontWeight:'bold'
        }}>
        {fullName}
        </div>

        <div style={{
          background:"#e9eaed",
          width:'20em',
          height:'2em',
          bottom:0,
          position:"absolute",
          borderTop:'solid 1px #dcdee3'}} >
          <FriendsDropdown />
        </div>
        <div style={{
           position:'absolute',
           bottom:'-20px',
           left:'20px',
           width:'0',
           height:'0',
           borderColor:'#dcdee3 transparent transparent transparent',
           borderWidth:'10px',
           borderStyle:'solid'
        }}/>
        <div style={{
          position:'absolute',
          bottom:'-19px',
          left:'20px',
          width:'0',
          height:'0',
          borderColor:'#e9eaed transparent transparent transparent',
          borderWidth:'10px',
          borderStyle:'solid'
        }}/>
      </div>
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
