import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

function ButtonGroup({ stream, ...props }) {
  const [hasAudio, setAudio] = useState(true);
  const [hasVideo, setVideo] = useState(true);
  const [isFullscreen, setFullscreen] = useState(false);

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

  const toggleAudio = () => {
    setAudio(v => !v);
  };

  const toggleVideo = () => {
    setVideo(v => !v);
  };

  const toggleFullScreen = () => {
    setFullscreen(v => !v);
  };

  return (
    <div className="btn-group" role="group" aria-label="Controls" {...props}>
      {stream && (
        <Fragment>
          <button
            type="button"
            title="Toggle camera"
            onClick={toggleVideo}
            className={"btn btn-secondary " + (hasVideo ? "active" : "")}
            aria-pressed={hasVideo}
          >
            <i className="fa fa-video-camera" aria-hidden="true" />
          </button>
          <button
            type="button"
            title="Toggle microphone"
            onClick={toggleAudio}
            aria-pressed={toggleAudio}
            className={"btn btn-secondary " + (hasAudio ? "active" : "")}
          >
            <i className="fa fa-deaf" aria-hidden="true" />
          </button>
        </Fragment>
      )}
      <button
        type="button"
        title="Toggle fullscreen"
        onClick={toggleFullScreen}
        aria-pressed={isFullscreen}
        className={"btn btn-secondary " + (isFullscreen ? "active" : "")}
      >
        <i className="fa fa-arrows-alt" aria-hidden="true" />
      </button>
    </div>
  );
}

ButtonGroup.propTypes = {
  stream: PropTypes.object
};

export default ButtonGroup;
