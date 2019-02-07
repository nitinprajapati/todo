import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap';
import * as ACTIONS from './actions';

class Todos extends Component {
    constructor(props){
        super(props);
        this.state = {
            input : "",
            classNames : []
        }
    }
    
    componentDidMount(){
        this.props.getTodos();
    }

    onChange = (ev) => {
        this.setState({input: ev.target.value});
    }

    handleEnter = (ev) => {
        const keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode === 13) {
            this.props.addTodo(ev.target.value);
            this.setState({input: ''});
        }
    }

    click = (element) => {
        this.props.deleteTodo(element);
    }

    checkboxHandler(ev, editing){
        let classNames = {...this.state.classNames};
        for(let key in classNames){
            if(classNames[key] === "editing"){
                classNames[key] = "";
            }
        }

        if(editing === true){
            classNames[ev] = "editing";
        }
        else if(classNames[ev] !== "done"){
            classNames[ev] = "done";
        }
        else{
            classNames[ev] = "";
        }
        this.setState({classNames});
    }

    selection(){
        if(this.props.todos.length){
            return <Form.Check type="checkbox" id="toggle-all" label="Mark all as complete" />;
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <h1>Todos</h1>
                    <input id="new-todo" type="text" onChange={this.onChange} defaultValue={this.state.input} onKeyPress={this.handleEnter} placeholder="What needs to be done?" />
                </header>
                <section>
                    {this.selection()}
                    <ul id="todo-list">
                        {this.props.todos.length !== 0 && this.props.todos.map((todo, key) => {
                            return (
                                <li key={key} className={this.state.classNames[todo]}>
                                    <div className="view" onDoubleClick={() => {this.checkboxHandler(todo, true)}}>
                                        <Form.Check type="checkbox" id={todo} className="toggle" onChange={() => {this.checkboxHandler(todo)}} label={todo} />
                                        <button className="destroy" onClick={() => this.click(todo)}></button>
                                    </div>
                                    <input className="edit" type="text" value={todo} />
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <footer>

                </footer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addTodo: ACTIONS.Add_Todo,
        deleteTodo: ACTIONS.Delete_Todo,
        selectAll: ACTIONS.Select_All_Todo,
        getTodos: ACTIONS.getTodos
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);