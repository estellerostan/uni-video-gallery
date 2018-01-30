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