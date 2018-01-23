import React from 'react';

class Video extends React.Component {

    render () {
        const { details, index} = this.props;

        // we want a valid playbackId for our src video
        // but it can come in different url formats
        // so this is a basic attempt at cleaning it
        let playbackId = details.url;
        if(details.url.indexOf("watch?v=") !== -1) {
            playbackId = details.url.split("watch?v=")[1];

            if(playbackId.indexOf("&list") !== -1) {
                playbackId = playbackId.split("&list")[0];
            }
        }
        else if (playbackId.indexOf("youtu.be")) {
            playbackId = playbackId.split("youtu.be/")[1];
        }

        // the video will not load
        // but this way we prevent unhandled exceptions
        if(typeof playbackId === 'undefined') {
            playbackId = details.url;
        }

        return (
            <li>
                <iframe width="560" height="315"
                        src={"https://www.youtube.com/embed/" + playbackId +"?rel=0"}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen>
                </iframe>
                <h3>
                {details.title}
                </h3>
                <p>{details.description}</p>
            </li>
        )
    }
}

export default Video;