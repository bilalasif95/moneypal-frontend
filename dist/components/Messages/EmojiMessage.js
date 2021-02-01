import React, { Component } from 'react';

const EmojiMessage = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "sc-message--emoji"
  }, props.data.emoji);
};

export default EmojiMessage;