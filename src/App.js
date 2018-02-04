import React, { Component } from 'react';
import './App.css';
import Video from './components/Video'
import AddVideoForm from './components/AddVideoForm'

class App extends Component {
    constructor() {
        super();

        this.connectionResponseMessageFromApiAsync = this.connectionResponseMessageFromApiAsync.bind(this);
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

          <AddVideoForm apiMessage={this.state.apiResponseMessage}/>

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
