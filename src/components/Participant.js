import React from "react";
import PropTypes from "prop-types";
import Video from "components/Video";

function Participant({ stream, ...props }) {
  if (!stream) {
    return null;
  }

  return <Video stream={stream} {...props} autoPlay />;
}

Participant.propTypes = {
  stream: PropTypes.object
};

export default Participant;
