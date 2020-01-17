import React, { useState, useCallback } from "react";
import SimplePeer from "simple-peer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ConnectionType from "./ConnectionType";
import Connection from "./Connection";

let peer = {};

const App = () => {
  // Storing the state at root component like this will cause unwanted re-renders
  // I'm doing it anyway for simplicity and the app does not have that much logic for now
  const [connectionType, setConnectionType] = useState(null);
  const [chatting, startChatting] = useState(false);
  const [user1Id, setUser1Id] = useState("");
  const [user2Id, setUser2Id] = useState("");

  const handleChat = useCallback(
    otherUserId => {
      startChatting(true);
      peer.signal(JSON.parse(otherUserId));
      setUser2Id(otherUserId);
    },
    [setUser2Id, startChatting]
  );

  const handleConnection = useCallback(
    type => {
      navigator.getUserMedia(
        {
          video: true,
          audio: true
        },
        stream => {
          if (type === "newConnection") {
            peer = new SimplePeer({
              initiator: type === "newConnection",
              trickle: false,
              stream
            });
          } else {
            peer = new SimplePeer({
              initiator: type === "newConnection",
              trickle: false,
              stream
            });
          }

          peer.on("signal", data => {
            setUser1Id(JSON.stringify(data));
          });

          peer.on("stream", otherUserStream => {
            const video = document.getElementById("video");
            video.srcObject = otherUserStream;
            video.play();
          });

          peer.on("error", err => toast.error("Unable start video chat"));
        },
        error => {
          console.log(error);
          toast.error("Unable start video chat");
        }
      );
      setConnectionType(type);
    },
    [setConnectionType]
  );

  return (
    <div className="app">
      {chatting === false && connectionType === null && (
        <ConnectionType setConnectionType={handleConnection} />
      )}
      {chatting === false && connectionType !== null && (
        <>
          <Connection
            setConnectionType={setConnectionType}
            startChatting={handleChat}
            user1Id={user1Id}
            user2Id={user2Id}
            setUser2Id={setUser2Id}
          />
        </>
      )}

      {chatting && connectionType !== null && (
        <>
          <h4>
            YourId: <span className="user1Id">{user1Id}</span>
          </h4>
          <video id="video"></video>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </>
      )}
    </div>
  );
};

export default App;
