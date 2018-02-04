import React from 'react';
import UpdateVideoForm from './UpdateVideoForm'

class Video extends React.Component {
    constructor() {
        super();

        this.updateVideo = this.updateVideo.bind(this);
        this.deleteVideo = this.deleteVideo.bind(this);
    }

    updateVideo(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        data.set('url', data.get('url'));
        data.set('title', data.get('title'));
        data.set('description', data.get('description'));

        fetch('/api/video', {
            method: 'POST',
            body: data,
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({apiResponseMessage : json.message});
        }).catch((error) => {
            console.error(error);
        });
    }

    deleteVideo(event) {
        event.preventDefault();
        const data = new FormData();

        data.set('url', data.get('url'));
        data.set('title', data.get('title'));
        data.set('description', data.get('description'));

        fetch('/api/d-video', {
            method: 'POST',
            body: data,
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({apiResponseMessage : json.message});
        }).catch((error) => {
            console.error(error);
        });
    }

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

                <UpdateVideoForm details={details}/>

                <button onClick={this.deleteVideo}>Supprimer</button>
            </li>
        )
    }
}

export default Video;