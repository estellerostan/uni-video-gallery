import React from 'react';
import UpdateVideoForm from './UpdateVideoForm'

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.deleteVideo = this.deleteVideo.bind(this);
        this.updateVideo = this.updateVideo.bind(this);

        this.state = {
            videos: props.videos,

            apiResponseMessage : "bbb",
            url: props.details.url,
            title: props.details.title,
            description: props.details.description
        }
    }

    deleteVideo(event, key) {
        event.preventDefault();
        const data = new FormData();

        data.set('url', this.state.url);
        data.set('title', this.state.title);
        data.set('description', this.state.description);

        fetch('http://localhost:8080/api/d-video', {
            method: 'POST',
            body: data,
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({apiResponseMessage : json.message});
            // then update state
            this.props.handler(key, this.state.apiResponseMessage)
        }).catch((error) => {
            console.error(error);
        });
    }

    updateVideo(msg) {
        this.setState({ apiResponseMessage: msg })
    }

    render () {
        const { details, index, videos} = this.props;

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

                <UpdateVideoForm details={details} handler={this.updateVideo}/>

                <button onClick={(e) => this.deleteVideo(e, index)} >Supprimer</button>
            </li>
        )
    }
}

export default Video;