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

    selectAll = (event) => {
        this.props.selectAll(event);
    }

    checkboxHandler = (event) => {
        this.props.selectTodo(event)
    }

    selection() {
        let checked = this.props.checkboxCount === this.props.todos.length ? true : false;
        if(this.props.todos.length){
            return <Form.Check type="checkbox" id="toggle-all" label="Mark all as complete" onChange={this.selectAll} checked={checked} />;
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
                                   todoName={todo.name}
                                   todoChecked={todo.checked}
                                   className={todo.class}
                                   checkboxHandler={this.checkboxHandler} 
                                   click={this.click}
                                />
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
        selectTodo: ACTIONS.Select_Todo
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);