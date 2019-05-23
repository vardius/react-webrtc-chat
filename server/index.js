const express = require("express");
const path = require("path");
const http = require("http");
const PeerDataServer = require("peer-data-server");

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || (process.env.NODE_ENV === 'production' ? 3000 : 3001);
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build/static')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    })
}

const server = http.createServer(app);
const appendPeerCdnServer = PeerDataServer.default || PeerDataServer;
appendPeerCdnServer(server);

server.listen(DEFAULT_PORT, () => console.log(`Server started at port ${DEFAULT_PORT}`));
