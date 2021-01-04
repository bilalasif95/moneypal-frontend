import React, { Component } from 'react';
import Message from './Messages'

class MessageList extends Component {

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    return (
      <div className="sc-message-list">
        <div className="sc-message-scroller" ref={el => this.scrollList = el}>
        {this.props.messages.map((message, i) => {
          return <Message message={message} key={i} onDelete={this.props.onDelete} />
        })}
      </div>
      </div >)
  }
}

export default MessageList