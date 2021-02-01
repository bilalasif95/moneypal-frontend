function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Message from "./Messages";

class MessageList extends Component {
  constructor() {
    super();

    _defineProperty(this, "selectType", e => {
      if (e.target.name === "Terminology") {
        this.setState({
          selectedType: true
        });
        this.props.selectQueryType(e.target.name);
      } else {
        this.setState({
          selectedType: true,
          showCategories: true
        });
      }
    });

    _defineProperty(this, "selectCategory", e => {
      this.setState({
        showCategories: false
      });
      this.props.selectQueryType("Question", e.target.name);
    });

    this.state = {
      selectedType: false,
      showCategories: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "sc-message-list",
      ref: el => this.scrollList = el
    }, this.props.messages.map((message, i) => {
      return /*#__PURE__*/React.createElement(Message, {
        message: message,
        key: i,
        onDelete: this.props.onDelete
      });
    }), !this.state.selectedType && /*#__PURE__*/React.createElement("div", {
      className: "custom-btns"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.selectType,
      name: "Terminology"
    }, "Terminology"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectType,
      name: "Question"
    }, "Question")), this.state.showCategories && /*#__PURE__*/React.createElement("div", {
      className: "custom-btns"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category1"
    }, "Category 1"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category2"
    }, "Category 2"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category3"
    }, "Category 3"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category4"
    }, "Category 4"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category5"
    }, "Category 5"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category6"
    }, "Category 6"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category7"
    }, "Category 7"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category8"
    }, "Category 8"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category9"
    }, "Category 9"), /*#__PURE__*/React.createElement("button", {
      onClick: this.selectCategory,
      name: "Category10"
    }, "Category 10")), this.props.typing &&
    /*#__PURE__*/
    // <div
    //   style={{
    //     margin: "10px",
    //     padding: "10px",
    //     color: "grey",
    //     textAlign: "left",
    //   }}
    // >
    // {/* <span>Typing</span> */}
    // {/* <div className="typing-loader"></div> */}
    React.createElement("div", {
      className: "snippet"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dot-typing"
    }))) // </div>
    );
  }

}

export default MessageList;