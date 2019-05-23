import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function RoomForm({ onJoin, ...props }) {
  const roomInput = useRef(null);
  const userNameInput = useRef(null);

  useEffect(() => {
    if (roomInput.current) {
      roomInput.current.focus();
    }
  }, []);

  const handleFormSubmit = event => {
    event.preventDefault();

    const room = roomInput.current.value;
    const username = userNameInput.current.value;
    if (room.length === 0 && username.length === 0) {
      return;
    }

    onJoin({ room, username });

    roomInput.current.value = "";
    userNameInput.current.value = "";
  };

  return (
    <form {...props} onSubmit={handleFormSubmit}>
      <div className="form-row text-center">
        <div className="form-group col-md-5">
          <input
            ref={roomInput}
            type="text"
            className="form-control"
            placeholder="Type a room name..."
          />
        </div>
        <div className="form-group col-md-5">
          <input
            ref={userNameInput}
            type="text"
            className="form-control"
            placeholder="Username"
          />
        </div>
        <div className="form-group col-md-2">
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </div>
      </div>
    </form>
  );
}

RoomForm.propTypes = {
  onJoin: PropTypes.func.isRequired
};

export default RoomForm;
