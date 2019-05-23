import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function Video({ stream, muted = false, autoPlay = false, ...props }) {
  const element = useRef(null);

  useEffect(() => {
    if (element.current && stream) {
      element.current.srcObject = stream;
    }
  }, [stream, element]);

  return <video {...props} autoPlay={autoPlay} muted={muted} ref={element} />;
}

Video.propTypes = {
  stream: PropTypes.object,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool
};

export default Video;
