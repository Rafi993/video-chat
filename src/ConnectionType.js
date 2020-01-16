import React from "react";

const ConnectionType = ({ setConnectionType }) => {
  return (
    <div className="connectionType">
      <h2>Start Chatting</h2>
      <button
        className="buttonOutline"
        onClick={() => setConnectionType("newConnection")}
      >
        Start New Connection
      </button>
      <button
        className="buttonOutline"
        onClick={() => setConnectionType("existingConnection")}
      >
        Join Existing Connection
      </button>
    </div>
  );
};

export default ConnectionType;
