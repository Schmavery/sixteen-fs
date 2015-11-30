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

export class ProfilePic extends Component {
  render() {
    this.props.user.id;
    //<Image style={{backgroundColor:"green", ...this.props.style}}/>
    return (
      <img src={this.props.user.image || ""} style={{...this.props.style, border:"1px solid lightgrey"}}/>
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
    console.log('test',React.findDOMNode(this).offsetTop - window.pageYOffset, window.innerHeight)
    if (!this.props.noHover){
      if (this.state.timeout) clearTimeout(this.state.timeout);
      if (on) {
        this.setState({timeout: setTimeout(() => this.setState({hoverProfile: true,
          top:(React.findDOMNode(this).offsetTop - window.pageYOffset < (window.innerHeight/2))}), 500)})
      } else {
        this.setState({timeout: setTimeout(() => this.setState({hoverProfile: false}), 100)})
      }
    }
  }

  render() {
    var name = (this.props.user.first + " " + this.props.user.last);
    var defStyle =  {color: '#355089',fontWeight: 'bold', ...this.props.style};
    return (
      <div style={{position:'relative', ...defStyle}}>
        <Hover
          hover={{
            textDecoration: 'underline'
          }}
          style={{
            ...defStyle,
            cursor: 'pointer',
          }}
          onClick={this.props.fns.changePage.bind(null,'profile',{id:this.props.user.id})}
          onMouseEnter={this.toggleHoverProfile.bind(null, true)}
          onMouseLeave={this.toggleHoverProfile.bind(null, false)}>
          {name}
          {this.state.hoverProfile ?
            <HoverProfile user={this.props.user} fns={this.props.fns} top={this.state.top}/> : null}
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
    var height = 12;
    return (
      <div style={{
        position:'absolute',
        top: this.props.top ? '2em' : (-1-height)+'em',
        height: height+'em',
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
          <ProfilePic
            user={this.props.user}
            style={{
              width:'6em',
              height:'6em',
              zIndex:'999',
            }}
          />
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
          bottom: this.props.top ? '12em' : '-20px',
          marginBottom:this.props.top ? '1px' : '0',
          left:'20px',
          width:'0',
          height:'0',
          borderColor: this.props.top ? 'transparent transparent #dcdee3 transparent' :
                                        '#dcdee3 transparent transparent transparent',
          borderWidth:'10px',
          borderStyle:'solid'
        }}/>
        <div style={{
          position:'absolute',
          bottom: this.props.top ? '12em' : '-19px',
          left:'20px',
          width:'0',
          height:'0',
          borderColor: this.props.top ? 'transparent transparent #e9eaed transparent' :
                                        '#e9eaed transparent transparent transparent',
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

function timeAgo(time){
  var units = [
    { name: "second", limit: 60, in_seconds: 1 },
    { name: "minute", limit: 3600, in_seconds: 60 },
    { name: "hour", limit: 86400, in_seconds: 3600  },
    { name: "day", limit: 604800, in_seconds: 86400 },
    { name: "week", limit: 2629743, in_seconds: 604800  },
    { name: "month", limit: 31556926, in_seconds: 2629743 },
    { name: "year", limit: null, in_seconds: 31556926 }
  ];
  var diff = (Date.now() - time) / 1000;
  if (diff < 5) return "now";
  var i = 0, unit;
  while (unit = units[i++]) {
    if (diff < unit.limit || !unit.limit){
      var diff2 =  Math.floor(diff / unit.in_seconds);
      return diff2 + " " + unit.name + (diff2>1 ? "s" : "") + " ago";
    }
  }
}

function callAjax(url, callback){
  var xmlhttp = new XMLHttpRequest();
  var abort = false;
  xmlhttp.onloadend = () =>{
    if (xmlhttp.status == 200){
        if (!abort) callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  return () => abort = true;
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

var hash = (s) => '-hash-'+s;

var genID = (s) => s.split("").reduce(
  function (acc, v, i){return acc + v.charCodeAt(0)*Math.pow(10,i)}, 0).toString() +
  Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString();

var flex = 'flex;display:-webkit-flex;display:-ms-flexbox';
var flexDirection = (d) => d+';-webkit-flex-direction:'+d;
var alignItems = (d) => d+';-webkit-align-items:'+d;
var justifyContent = (d) => d+';-webkit-justify-content:'+d;

function uriEncodeObj(obj){
  var s= Object.keys(obj || {}).reduce(
    (acc, k) => acc+k+'='+obj[k]+'&','?');
  return s.slice(0,-1);
}

function uriDecodeObj(str){
  var obj = null;
  var qArr = str.split('?');
  if (qArr[1]){
    obj = {};
    var arr = qArr[1].split('&');
    arr.forEach(el => {
      var attr = el.split('=');
      obj[attr[0]] = attr[1];
    })
  }
  return {page:qArr[0], info:obj};
}

export default {
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  genID,
  hash,
  formatTime,
  callAjax,
  timeAgo,
  OpenInNewTab,
  uriDecodeObj,
  uriEncodeObj
};
