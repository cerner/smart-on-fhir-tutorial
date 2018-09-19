import React from 'react';
import { render} from 'react-dom';
import MyComponent from './my-component';
import { onError, onReady } from './utils/get-pt-data';

console.log('hello world');

const App = () => {
    console.log(FHIR.oauth2.ready(onReady, onError));
    return (
        <div>
            <MyComponent />
        </div>
    );
}

render(<App />, document.getElementById('root'));