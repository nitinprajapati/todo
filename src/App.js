import React from 'react';
import Todo from './todos';

const App = () => {
    return (
        <div className="App">
            <div id="todoapp">
                <Todo />
            </div>
            <div id="credits">
                Created by
                <br />
                <a href="https://www.facebook.com/nitinkumar2593" target="_blank" rel="noopener noreferrer" >Nitin Kumar</a>.
                <br />
                Source code: <a href="https://github.com/nitinprajapati/todo" target="_blank" rel="noopener noreferrer">React Todo</a>.
            </div>
        </div>
    );
}

export default App;
