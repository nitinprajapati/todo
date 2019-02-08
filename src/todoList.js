import React from 'react';
import { Form } from 'react-bootstrap';

const TodoList = ({propKey, classNames, todo, checkboxHandler, click}) => {
    return(
        <li key={propKey} className={classNames[todo]}>
            <div className="view" onDoubleClick={() => {checkboxHandler(todo, true)}}>
                <Form.Check type="checkbox" id={todo} className="toggle" onChange={() => {checkboxHandler(todo)}} label={todo} />
                <button className="destroy" onClick={() => click(todo)}></button>
            </div>
            <input className="edit" type="text" value={todo} />
        </li>
    )
}

export default TodoList;