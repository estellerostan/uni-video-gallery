import React from 'react';

class AddVideoForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            videos: props.videos,
            apiResponseMessage: ""
        }
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
            // then update state
            const video = {
                url: data.get('url'),
                title: data.get('title'),
                description: data.get('description')
            }
            this.props.handler(video, this.state.apiResponseMessage)
        }).catch((error) => {
            console.error(error);
        });
    }

    render () {

        return (

        <form onSubmit={this.handleSubmit} className="form">
            <fieldset>
                <legend>Ajout d'une video</legend>

                <label htmlFor="url">Url: </label>
                <input name="url" required type="url"/>

                <br/>

                <label htmlFor="title">Titre: </label>
                <input name="title" required type="text"/>

                <br/>

                <label htmlFor="description">Description: </label>
                <textarea name="description" required type="text" rows="10"/>

                <br/>

                <button>Ajouter cette video !</button>

            </fieldset>
        </form>
        )
    }
}

export default AddVideoForm;