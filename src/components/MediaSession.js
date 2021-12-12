import React, { Fragment, useEffect } from "react";

const HAS_MEDIA_SESSION =
    window && window.navigator && "mediaSession" in window.navigator;

// #region useMediaSession
const useMediaSession = (props) => {
    const {
        title = "",
        artist = "",
        album = "",
        artwork = [],

        onPlay,
        onPause,
        onSeekBackward,
        onSeekForward,
        onPreviousTrack,
        onNextTrack,
    } = props;

    const { mediaSession } = navigator;
    console.log(mediaSession);

    useEffect(() => {
        mediaSession.metadata = new window.MediaMetadata({
            title,
            artist,
            album,
            artwork,
        });
        return () => {
            mediaSession.metadata = null;
        };
        // eslint-disable-next-line
    }, [title, artist, album, artwork]);

    useEffect(() => {
        mediaSession.setActionHandler("play", onPlay);
        return () => {
            mediaSession.setActionHandler("play", null);
        };
        // eslint-disable-next-line
    }, [onPlay]);
    useEffect(() => {
        mediaSession.setActionHandler("pause", onPause);
        return () => {
            mediaSession.setActionHandler("pause", null);
        };
        // eslint-disable-next-line
    }, [onPause]);
    useEffect(() => {
        mediaSession.setActionHandler("seekbackward", onSeekBackward);
        return () => {
            mediaSession.setActionHandler("seekbackward", null);
        };
        // eslint-disable-next-line
    }, [onSeekBackward]);
    useEffect(() => {
        mediaSession.setActionHandler("seekforward", onSeekForward);
        return () => {
            mediaSession.setActionHandler("seekforward", null);
        };
        // eslint-disable-next-line
    }, [onSeekForward]);
    useEffect(() => {
        mediaSession.setActionHandler("previoustrack", onPreviousTrack);
        return () => {
            mediaSession.setActionHandler("previoustrack", null);
        };
        // eslint-disable-next-line
    }, [onPreviousTrack]);
    useEffect(() => {
        mediaSession.setActionHandler("nexttrack", onNextTrack);
        return () => {
            mediaSession.setActionHandler("nexttrack", null);
        };
        // eslint-disable-next-line
    }, [onNextTrack]);
};
// #endregion

// #region MediaSession
const MediaSessionComponent = (props) => {
    const { children, ...rest } = props;
    useMediaSession(rest);
    return <Fragment>{children || null}</Fragment>;
};
// #endregion

const MediaSession = (props) => {
    if (!HAS_MEDIA_SESSION) {
        return <Fragment>{props.children || null}</Fragment>;
    }
    return <MediaSessionComponent {...props} />;
};

export default MediaSession;
