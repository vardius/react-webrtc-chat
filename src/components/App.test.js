import React from "react";
import ReactDOM from "react-dom";
import { EventDispatcher } from "peer-data";
import { PeerDataProvider } from "react-peer-data";
import { UserMediaProvider } from "@vardius/react-user-media";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <PeerDataProvider
      servers={{
        iceServers: [
          {
            url: "stun:stun.1.google.com:19302",
          },
        ],
      }}
      constraints={{ ordered: true }}
      signaling={{
        dispatcher: new EventDispatcher(),
      }}
    >
      <UserMediaProvider constraints={{ audio: true, video: true }}>
        <App />
      </UserMediaProvider>
    </PeerDataProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
