import React, { Fragment, useState } from "react";
import {
  UserMediaError,
  useUserMediaFromContext
} from "@vardius/react-user-media";
import Video from "components/Video";
import UserMediaActions from "components/UserMediaActions";
import Room from "components/Room";
import RoomForm from "components/RoomForm";

function App() {
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState(null);
  const { stream, error } = useUserMediaFromContext();

  const handleJoin = values => {
    setRoom(values.room);
    setUsername(values.username);
  };

  return (
    <div className="container-fluid">
      {room && username ? (
        <Room name={room} username={username} stream={stream} />
      ) : (
        <Fragment>
          {error && (
            <div className="row justify-content-center mt-2">
              <UserMediaError error={error} />
            </div>
          )}
          <div className="row justify-content-center mt-2">
            <RoomForm onJoin={handleJoin} />
          </div>
          <div className="row justify-content-center mt-2">
            <UserMediaActions stream={stream} />
          </div>
          {stream && (
            <div className="row justify-content-center mt-2">
              <Video stream={stream} autoPlay muted />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default App;
