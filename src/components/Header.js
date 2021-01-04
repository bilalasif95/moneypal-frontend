import React, { Component } from 'react';
import closeIcon from './../assets/close-icon.png';
import handIcon from './../assets/hand-icon.svg';

class Header extends Component {

  render() {
    return (
      <div className="sc-header">
        <div>
          <h1>Hi there <img src={handIcon} /></h1>
          <p>Good to see you here.</p>
        </div>
        {/* <img className="sc-header--img" src={this.props.imageUrl} alt="" />
        <div className="sc-header--team-name"> {this.props.teamName} </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div> */}
      </div>
    );
  }
}

export default Header;
