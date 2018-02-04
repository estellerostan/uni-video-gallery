import React from 'react';

class UpdateVideoForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            apiResponseMessage: "",
            title: props.details.title,
            description: props.details.description
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        data.set('url', data.get('url'));
        data.set('title', data.get('title'));
        data.set('description', data.get('description'));

        fetch('http://localhost:8080/api/u-video', {
            method: 'POST',
            body: data,
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({apiResponseMessage : json.message});
            // then update state to know the api response message
            this.props.handler(this.state.apiResponseMessage)
        }).catch((error) => {
            console.error(error);
        });
    }

    render () {
        const details = this.props.details;

        return (

        <form onSubmit={this.handleSubmit} className="form">
            <fieldset>
                <legend>Modification d'une video</legend>

                <label htmlFor="url">Url: </label>
                <input name="url" required type="url" value={details.url} readOnly/>

                <br/>

                <label htmlFor="title">Titre: </label>
                <input name="title" required type="text"  value={this.state.title} onChange={(value) => this.onChange(value)} />

                <br/>

                <label htmlFor="description">Description: </label>
                <textarea name="description" required type="text" rows="10" value={this.state.description} onChange={(value) => this.onChange(value)}  />

                <br/>

                <button>Modifier cette video</button>

            </fieldset>
        </form>
        )
    }
}

export default UpdateVideoForm;