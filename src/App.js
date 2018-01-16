import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.connectionResponseMessageFromApiAsync = this.connectionResponseMessageFromApiAsync.bind(this);

        this.state = {
            apiResponseMessage: ""
        };
    }

    componentDidMount() {
        this.connectionResponseMessageFromApiAsync('http://localhost:8080/api/connection')
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

  render() {
    return (
      <div className="App">
          <p >Message de réponse API : {this.state.apiResponseMessage}</p>
      </div>
    );
  }
}

export default App;
