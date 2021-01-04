import React, { Component } from "react";
import Message from "./Messages";

class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      selectedType: false,
      showCategories: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  selectType = (e) => {
    if (e.target.name === "Terminology") {
      this.setState({
        selectedType: true,
      });
      this.props.selectQueryType(e.target.name);
    } else {
      this.setState({
        selectedType: true,
        showCategories: true,
      });
    }
  };

  selectCategory = (e) => {
    this.setState({
      showCategories: false,
    });
    this.props.selectQueryType("Question", e.target.name);
  };

  render() {
    return (
      <div className="sc-message-list" ref={(el) => (this.scrollList = el)}>
        {this.props.messages.map((message, i) => {
          return (
            <Message message={message} key={i} onDelete={this.props.onDelete} />
          );
        })}
        {!this.state.selectedType && (
          <div className="custom-btns">
            <button onClick={this.selectType} name="Terminology">
              Terminology
            </button>
            <button onClick={this.selectType} name="Question">
              Question
            </button>
          </div>
        )}
        {this.state.showCategories && (
          <div className="custom-btns">
            <button onClick={this.selectCategory} name="Category1">
              Category 1
            </button>
            <button onClick={this.selectCategory} name="Category2">
              Category 2
            </button>
            <button onClick={this.selectCategory} name="Category3">
              Category 3
            </button>
            <button onClick={this.selectCategory} name="Category4">
              Category 4
            </button>
            <button onClick={this.selectCategory} name="Category5">
              Category 5
            </button>
            <button onClick={this.selectCategory} name="Category6">
              Category 6
            </button>
            <button onClick={this.selectCategory} name="Category7">
              Category 7
            </button>
            <button onClick={this.selectCategory} name="Category8">
              Category 8
            </button>
            <button onClick={this.selectCategory} name="Category9">
              Category 9
            </button>
            <button onClick={this.selectCategory} name="Category10">
              Category 10
            </button>
          </div>
        )}
        {this.props.typing && (
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
          <div className="snippet">
            <div className="stage">
              <div className="dot-typing"></div>
            </div>
          </div>
          // </div>
        )}
      </div>
    );
  }
}

export default MessageList;
