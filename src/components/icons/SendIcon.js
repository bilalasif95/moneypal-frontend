import React, { Component } from 'react';
import sendIcon from './../../assets/send-icon-blue.svg';
import sendIconBlue from './../../assets/send-icon-blue.svg';

class SendIcon extends Component {

  render() {
    return (
      <button
        disabled={!this.props.contentEditable}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        style={{ cursor: this.props.contentEditable ? "pointer" : "not-allowed" }}
        onClick={(e) => { e.preventDefault(); this.props.onClick(e); this.props.handleClick1() }}
        className="sc-user-input--send-icon-wrapper send-btn"
      >
        {this.props.contentEditable ? <img src={sendIconBlue} alt="Send" /> : <img src={sendIcon} alt="Send" />}
        {/* <svg
        version='1.1'
        className="sc-user-input--send-icon"
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='37.393px'
        height='37.393px'
        viewBox='0 0 37.393 37.393'
        enableBackground='new 0 0 37.393 37.393'>
        <g id='Layer_2'>
          <path d='M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263
          L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08
          l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061
          c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z' />
        </g>
      </svg> */}
      </button>
    );
  }
}

export default SendIcon;
