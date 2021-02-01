import React from 'react';
import genericFileIcon from '../../assets/file.svg';
import closeIcon from '../../assets/close-icon.svg';

const FileMessage = props => {
  const meta = props.message.data.meta || null;
  const text = props.message.data.text || '';
  const file = props.message.data.file;
  const author = props.message.author;
  return /*#__PURE__*/React.createElement("div", {
    className: "sc-message--file"
  }, props.message && author === "me" && props.onDelete && /*#__PURE__*/React.createElement("button", {
    className: "delete-message",
    onClick: () => props.onDelete(props.message)
  }, "x"), /*#__PURE__*/React.createElement("div", {
    className: "sc-message--file-icon"
  }, /*#__PURE__*/React.createElement("a", {
    href: file.url || '#',
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: genericFileIcon,
    alt: "generic file icon",
    height: 60
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sc-message--file-name"
  }, /*#__PURE__*/React.createElement("a", {
    href: file.url ? file.url : '#',
    target: "_blank"
  }, file.name)), /*#__PURE__*/React.createElement("div", {
    className: "sc-message--file-text"
  }, text), meta && /*#__PURE__*/React.createElement("p", {
    className: "sc-message--meta"
  }, meta));
};

export default FileMessage;