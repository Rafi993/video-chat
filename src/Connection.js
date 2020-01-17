import React, { useCallback, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const Connection = ({
  setConnectionType,
  startChatting,
  user1Id,
  user2Id,
  setUser2Id
}) => {
  const [otherUserId, setOtherUserId] = useState("");

  const handleOtherUserId = useCallback(
    event => {
      setOtherUserId(event.target.value);
    },
    [setOtherUserId]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      startChatting(otherUserId);
    },
    [otherUserId, startChatting]
  );

  return (
    <form className="connection" onSubmit={handleSubmit}>
      <div className="formGroup">
        <h3>Your ID</h3>
        <input type="text" value={user1Id} spellCheck={false} readOnly />
      </div>

      <div className="formGroup">
        <h3>Other UserId</h3>
        <input
          type="text"
          value={otherUserId}
          onChange={handleOtherUserId}
          spellCheck={false}
          required
        />
      </div>

      <button type="submit" className="buttonOutline">
        Connect
      </button>
    </form>
  );
};

export default Connection;
