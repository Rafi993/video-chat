import React, { useState, useEffect, useCallback } from "react";
import SimplePeer from "simple-peer";

import ConnectionType from "./ConnectionType";
import Connection from "./Connection";

let peer = null;

const App = () => {
  // Storing the state at root component like this will cause unwanted re-renders
  // I'm doing it anyway for simplicity and the app does not have that much logic for now
  const [connectionType, setConnectionType] = useState(null);
  const [chatting, startChatting] = useState(false);
  const [user1Id, setUser1Id] = useState("");
  const [user2Id, setUser2Id] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.getUserMedia(
      {
        video: true,
        audio: false
      },
      stream => {
        peer = new SimplePeer({
          initiator: connectionType === "newConnection",
          trickle: false,
          stream
        });

        peer.on("signal", data => {
          setUser1Id(JSON.stringify(data));
        });

        peer.on("stream", otherUserStream => {
          const video = document.getElementById("video");
          video.srcObject = otherUserStream;
          video.play();
        });

        peer.on("error", err => setError("Unable to use users video camera"));
      },
      error => {
        console.log(error);
        setError("Unable to use users video camera2");
      }
    );
  }, [connectionType, setUser1Id, setError]);

  const handleChat = useCallback(() => {
    startChatting(true);
    peer.signal(JSON.parse(user2Id));
  }, [user2Id, startChatting]);

  return (
    <div className="app">
      {chatting === false && connectionType === null && (
        <ConnectionType setConnectionType={setConnectionType} />
      )}

      {chatting === false && connectionType !== null && (
        <Connection
          setConnectionType={setConnectionType}
          startChatting={handleChat}
          user1Id={user1Id}
          user2Id={user2Id}
          setUser2Id={setUser2Id}
        />
      )}

      {chatting && <video id="video"></video>}

      {error && <h3>{error}</h3>}
    </div>
  );
};

export default App;
