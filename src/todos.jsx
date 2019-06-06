import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import * as ACTIONS from './actions';
import TodoList from './todoList';

class Todos extends Component {
    constructor(props){
        super(props);
        this.state = {
            input : ""
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
        if (keycode === 13 && ev.currentTarget.value.trim() !== "") {
            this.props.addTodo(ev.target.value);
            this.setState({input: ''});
        }
    }

    click = (element) => {
        this.props.deleteTodo(element);
    }

    selectAll = (event) => {
        this.props.selectAll(event);
    }

    checkboxHandler = (event) => {
        this.props.selectTodo(event)
    }

    selection() {
        let leftCount = 0;

        for(let i=0; i<this.props.todos.length; i++){
            if (this.props.todos[i].className === "done") {
                leftCount += 1;
            }
        }
        let checked = leftCount === this.props.todos.length && this.props.checkboxCount !== 0 ? true : false;
        if(this.props.todos.length){
            return  (
                <React.Fragment>
                    <Form.Check type="checkbox" id="toggle-all" className="markAll" label="Mark all as complete" onChange={this.selectAll} checked={checked} />
                    <hr />
                </React.Fragment>
            );
        }
        else {
            return null;
        }
    }

    clearCompletedTask = () => {
        this.props.clearCompletedTask();
    }

    edit = text => this.setState({input: text});

    leftItem() {
        let leftCount = 0;

        if(this.props.todos.length){

            for(let i=0; i<this.props.todos.length; i++){
                if (this.props.todos[i].className === "done") {
                    leftCount += 1;
                }
            }

            let leftTasks = this.props.todos.length-leftCount;
            let clearText =  <button id="clear-completed" onClick={this.clearCompletedTask}>Clear {leftCount} completed items</button>;
            if(leftCount === 0){
                clearText = '';
            }

            return (
                <React.Fragment>
                    {clearText}
                    <div className="todo-count"><b>{leftTasks}</b> items left</div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <h1>Todos</h1>
                    <input 
                        id="new-todo" 
                        type="text" 
                        onChange={this.onChange} 
                        value={this.state.input} 
                        onKeyPress={this.handleEnter} 
                        placeholder="What needs to be done?" 
                    />
                </header>
                <section>
                    {this.selection()}
                    <ul id="todo-list">
                        {this.props.todos.length !== 0 && this.props.todos.map((todo, key) => {
                            return (
                                <TodoList 
                                   propKey={key}
                                   key={key}
                                   {...todo}
                                   checkboxHandler={this.checkboxHandler} 
                                   click={this.click}
                                   edit={this.edit}
                                />
                            );
                        })}
                    </ul>
                </section>
                <footer>
                    {this.leftItem()}
                </footer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos,
        checkboxCount: state.todo.checkboxCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addTodo: ACTIONS.Add_Todo,
        deleteTodo: ACTIONS.Delete_Todo,
        selectAll: ACTIONS.Select_All_Todo,
        getTodos: ACTIONS.getTodos,
        selectTodo: ACTIONS.Select_Todo,
        clearCompletedTask: ACTIONS.CLEAR_COMPLETED_TASK
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
