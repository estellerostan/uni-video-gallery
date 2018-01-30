import React from 'react';

class AddVideoForm extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        data.set('url', data.get('url'));
        data.set('title', data.get('title'));
        data.set('description', data.get('description'));

        fetch('/api/u-video', {
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
        const details = this.props;

        return (
        //   ou {(e) => this.createFish(e)}

        <form onSubmit={this.handleSubmit} className="form">
            <fieldset>
                <legend>Modification d'une video</legend>

                <label htmlFor="url">Url: </label>
                <input name="url" required type="url" placeholder={details.url} value={details.url}/>

                <br/>

                <label htmlFor="title">Titre: </label>
                <input name="title" required type="text"/>

                <br/>

                <label htmlFor="description">Description: </label>
                <textarea name="description" required type="text" rows="10"/>

                <br/>

                <button>Modifier cette video</button>
            </fieldset>
        </form>
        )
    }
}

export default AddVideoForm;