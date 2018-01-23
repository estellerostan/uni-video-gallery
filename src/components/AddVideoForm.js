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

        fetch('/api/video', {
            method: 'POST',
            body: data,
        });
    }

    render () {
        return (
        //   ou {(e) => this.createFish(e)}
        <form onSubmit={this.handleSubmit}>
            <fieldset>
                <legend>Ajout d'une video</legend>

                <label htmlFor="url">Url: </label>
                <input name="url" required type="text"/>

                <label htmlFor="title">Titre: </label>
                <input name="title" required type="text"/>

                <label htmlFor="description">Description: </label>
                <input name="description" required type="text"/>

                <button>Ajouter cette video !</button>
            </fieldset>
        </form>
        )
    }
}

export default AddVideoForm;