import React, { Component } from 'react';
import './App.css';
import Video from './components/Video'
import AddVideoForm from './components/AddVideoForm'

class App extends Component {
    constructor() {
        super();

        this.connectionResponseMessageFromApiAsync = this.connectionResponseMessageFromApiAsync.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getvideosFromApiAsync = this.getvideosFromApiAsync.bind(this);

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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        data.set('url', data.get('url'));
        data.set('title', data.get('title'));
        data.set('description', data.get('description'));

        fetch('http://localhost:8080/api/video', {
            method: 'POST',
            body: data,
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({apiResponseMessage : json.message});
        }).catch((error) => {
            console.error(error);
        });

        this.getvideosFromApiAsync('http://localhost:8080/api/videos');
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

    render() {
    return (
      <div className="App">
          <p >Message de réponse API : {this.state.apiResponseMessage}</p>

          <button className="show">Ajouter une video</button>
          <button className="hide">Cacher le formulaire</button>
          <AddVideoForm/>

          <ul>
              {
                  Object
                      .keys(this.state.videos)
                      .map(key => <Video key={key} index={key} details={this.state.videos[key]}/>)
              }
          </ul>
      </div>
    );
  }
}

export default App;
