import React, { Component } from 'react';
import './App.css';
import Video from './components/Video'
import AddVideoForm from './components/AddVideoForm'

class App extends Component {
    constructor() {
        super();

        this.connectionResponseMessageFromApiAsync = this.connectionResponseMessageFromApiAsync.bind(this);
        this.getvideosFromApiAsync = this.getvideosFromApiAsync.bind(this);
        this.addVideo = this.addVideo.bind(this);
        this.deleteVideo = this.deleteVideo.bind(this);

        this.state = {
            apiResponseMessage: "",
            videos: {}
        };
    }

    componentDidMount() {
        this.connectionResponseMessageFromApiAsync('http://localhost:8080/api/connection');
        this.getvideosFromApiAsync('http://localhost:8080/api/videos');
    }

    connectionResponseMessageFromApiAsync(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
            this.setState({apiResponseMessage : json.message});
        }).catch((error) => {
            console.error(error);
        })
    }

    getvideosFromApiAsync(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
            this.setState({videos : json.data});
        }).catch((error) => {
            console.error(error);
        })
    }

    deleteVideo(key, apiResponseMessage) {
        const videos = {...this.state.videos};
        delete videos[key];

        this.setState({
            videos: videos,
            apiResponseMessage: apiResponseMessage
        })
    }

    addVideo(video, apiResponseMessage) {
        const videos = {...this.state.videos};

        const timestamp = Date.now();
        videos[`video-${timestamp}`] = video;

        this.setState({
            videos: videos,
            apiResponseMessage: apiResponseMessage
        })
    }

    render() {
    return (
      <div className="App">
          <p >Message de réponse API : {this.state.apiResponseMessage}</p>

          <AddVideoForm apiMessage={this.state.apiResponseMessage} handler={this.addVideo}/>

          <ul>
              {
                  Object
                      .keys(this.state.videos)
                      .map(key => <Video key={key} index={key} details={this.state.videos[key]} videos={this.state.videos} handler={this.deleteVideo}/>)
              }
          </ul>
      </div>
    );
  }
}

export default App;
