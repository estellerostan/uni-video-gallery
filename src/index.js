import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddVideoForm from './components/AddVideoForm';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path='/addVideo' component={AddVideoForm}/>
            {/*<Route path='/schedule' component={Schedule}/>*/}
        </Switch>
    </main>
)

ReactDOM.render((
    <BrowserRouter>
        <Main />
    </BrowserRouter>
), document.getElementById('root'))

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
