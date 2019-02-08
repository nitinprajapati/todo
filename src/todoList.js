import React from 'react';
import { Form } from 'react-bootstrap';

const TodoList = ({propKey, className, todoName, todoChecked, checkboxHandler, click}) => {
    return(
        <li key={propKey} className={className}>
            <div className="view">
                <Form.Check type="checkbox" checked={todoChecked} id={todoName} className="toggle" onChange={(event) => {checkboxHandler(event, todoName)}} label={todoName} />
                <button className="destroy" onClick={() => click(todoName)}></button>
            </div>
            <input className="edit" type="text" defaultValue={todoName} />
        </li>
    )
}

export default TodoList;