import React from 'react';
import { Form } from 'react-bootstrap';
import moment from 'moment';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

const TodoList = ({propKey, className, updatedAt, name, createdAt, checked, checkboxHandler, click}) => {
    let createdTime = moment(createdAt).format("Do MMM YYYY, h:mm:ss a");
    let updateTime = '';
    if(updatedAt){
        updateTime =    <OverlayTrigger placement="bottom" overlay={<Tooltip>Updated at</Tooltip>}>
                            <span className="timings updatedAt">{moment(updatedAt).format("Do MMM YYYY, h:mm:ss a")}</span>
                        </OverlayTrigger>
    }
    return(
        <li key={propKey} className={className}>
            <div className="view">
                <Form.Check type="checkbox" checked={checked} id={name} className="toggle" onChange={(event) => {checkboxHandler(event, name)}} label={name} />
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Created at</Tooltip>}>
                    <span className="timings">{createdTime}</span>
                </OverlayTrigger>
                {updateTime}
                <button className="destroy" onClick={() => click(name)}></button>
            </div>
            <input className="edit" type="text" defaultValue={name} />
        </li>
    )
}

export default TodoList;