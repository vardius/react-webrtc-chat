import React from 'react';
import ReactDOM from 'react-dom';
import { PeerDataProvider } from 'react-peer-data';
import { UserMediaProvider } from '@vardius/react-user-media';
import * as serviceWorker from './serviceWorker';

import App from 'components/App';

import "theme/scss/styles.scss";

const iceServers = [
    {
        // url: "stun:stun.1.google.com:19302"
        url: "stun:74.125.142.127:19302"
    },
    {
        urls: "turn:turn.bistri.com:80",
        credential: "homeo",
        username: "homeo"
    }
];

ReactDOM.render(
    <PeerDataProvider
        servers={{ iceServers }}
        constraints={{ ordered: true }}
        signaling={{ url: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : null }}
    >
        <UserMediaProvider constraints={{ audio: true, video: true }}>
            <App />
        </UserMediaProvider>
    </PeerDataProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
