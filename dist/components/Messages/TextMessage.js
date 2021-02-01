import React, { Component } from 'react';
import chatIconUrl from './../../assets/chat-icon.svg';
import userIcon from './../../assets/user-icon.svg';

const TextMessage = props => {
  const meta = props.message.data.meta || null;
  const text = props.message.data.text || '';
  const author = props.message.author;
  return /*#__PURE__*/React.createElement("div", {
    className: "sc-message--text"
  }, text, meta && /*#__PURE__*/React.createElement("p", {
    className: "sc-message--meta"
  }, meta));
};

export default TextMessage;