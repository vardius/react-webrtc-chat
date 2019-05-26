import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

function isEnabled(aggregator, track) {
  return aggregator && track.enabled;
}

function UserMediaActions({ stream, ...props }) {
  const [hasAudio, setAudio] = useState(
    stream ? stream.getAudioTracks().reduce(isEnabled, true) : true
  );
  const [hasVideo, setVideo] = useState(
    stream ? stream.getVideoTracks().reduce(isEnabled, true) : true
  );
  const [isFullscreen, setFullscreen] = useState(
    document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
  );

  useEffect(() => {
    if (!stream) {
      return;
    }

    stream.getAudioTracks().forEach(function(track) {
      track.enabled = hasAudio;
    });
  }, [stream, hasAudio]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    stream.getVideoTracks().forEach(function(track) {
      track.enabled = hasVideo;
    });
  }, [stream, hasVideo]);

  useEffect(() => {
    if (
      isFullscreen &&
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    }

    if (
      !isFullscreen &&
      (document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement)
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, [isFullscreen]);

  const handleToggleAudio = () => {
    setAudio(v => !v);
  };

  const handleToggleVideo = () => {
    setVideo(v => !v);
  };

  const handleToggleFullScreen = () => {
    setFullscreen(v => !v);
  };

  return (
    <div className="btn-group" role="group" aria-label="Controls" {...props}>
      {stream && (
        <Fragment>
          <button
            type="button"
            title="Toggle camera"
            className={"btn btn-outline-" + (hasVideo ? "success" : "danger")}
            onClick={handleToggleVideo}
          >
            <i className="fa fa-video-camera" aria-hidden="true" />
          </button>
          <button
            type="button"
            title="Toggle microphone"
            className={"btn btn-outline-" + (hasAudio ? "success" : "danger")}
            onClick={handleToggleAudio}
          >
            <i className="fa fa-deaf" aria-hidden="true" />
          </button>
        </Fragment>
      )}
      <button
        type="button"
        title="Toggle fullscreen"
        className={"btn btn-" + (isFullscreen ? "success" : "outline-success")}
        onClick={handleToggleFullScreen}
      >
        <i className="fa fa-arrows-alt" aria-hidden="true" />
      </button>
    </div>
  );
}

UserMediaActions.propTypes = {
  stream: PropTypes.object
};

export default UserMediaActions;
