import React from "react";
import PropTypes from "prop-types";
import Message from "components/Message";

function MessageList({ messages }) {
  return messages.map((message, index) => <Message key={index} {...message} />);
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageList;
