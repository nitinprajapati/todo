const initialState = {
    todos:[

    ],
    checkboxCount: 0
};

const CHECK_EXISTING_TODO = (json, action) => {
    let postion = -1;
    for(let i=0; i<json.length; i++){
        if (json[i].name === action.payload) {
            postion = json[i];
            postion.index = i;
            break;
        }
    }
    return postion;
}

const ADD_TODO = (state, action) => {
    let savedItems = [];
    let todos = window.localStorage.getItem("Todos");
    if(todos){
        savedItems = JSON.parse(todos);
        let existingTodo = CHECK_EXISTING_TODO(savedItems, action);
        if(existingTodo !== -1){
            savedItems.splice(existingTodo.index, 1);
            savedItems.push({name: action.payload, checked:existingTodo.checked, className: existingTodo.className, createdAt: existingTodo.createdAt, updatedAt: new Date().getTime()});
        }
        else {
            savedItems.push({name: action.payload, checked:false, className: '', createdAt: new Date().getTime()});
        }
    }
    else {
        savedItems.push({name: action.payload, checked:false, className: '', createdAt: new Date().getTime()});
    }

    window.localStorage.setItem("Todos", JSON.stringify(savedItems));

    return {
        ...state,
        todos: savedItems
    };

}

const DELETE_TODO = (state, action) => {
    let todos = window.localStorage.getItem("Todos");
    let json = JSON.parse(todos);
    for(let i=0; i<json.length; i++){
        if (json[i].name === action.payload) {
            json.splice(i, 1);
            break;
        }
    }
    window.localStorage.setItem("Todos", JSON.stringify(json));
    window.localStorage.setItem("TodosCount", json.length);
    
    return {
        ...state,
        todos: json,
        checkboxCount: json.length
    };
}

const SELECT_TODO = (state, action) => {
    let todos = window.localStorage.getItem("Todos");
    let json = JSON.parse(todos);
    let checked = action.payload.target.checked === true ? true : false;
    
    let count = 0;
    let className = "";
    if(checked){
        count = state.checkboxCount+1;
        className = "done";
    }
    else {
        count = state.checkboxCount-1;
    }    
    
    for(let i=0; i<json.length; i++){
        if (json[i].name === action.payload.target.nextElementSibling.innerText) {
            json[i].checked = checked;
            json[i].className = className;
            break;
        }
    }
    window.localStorage.setItem("Todos", JSON.stringify(json));
    window.localStorage.setItem("TodosCount", count);
  
    return {
        ...state,
        todos: json,
        checkboxCount: count
    };
}


const SELECT_ALL_TODO = (state, action) => {
    let checked = action.payload.target.checked === true ? true : false;
    let count = 0;
    let className = "";
    if(checked){
        count = state.todos.length;
        className = "done";
    }
    let checkedArray = state.todos.map((todo) => {
        let updatedAt = '';
        if(todo.updatedAt){
            updatedAt = todo.updatedAt;
        }
        return {
            checked: checked,
            name: todo.name,
            className: className,
            createdAt: todo.createdAt,
            updatedAt
        }
    });
    window.localStorage.setItem("Todos", JSON.stringify(checkedArray));
    window.localStorage.setItem("TodosCount", count);

    return {
        ...state,
        todos: checkedArray,
        checkboxCount: count
    }
}

const GET_ALL_TODO = (state) => {
    let savedItems = [];
    let todos = window.localStorage.getItem("Todos");
    let todosCount = window.localStorage.getItem("TodosCount");
    let json = JSON.parse(todos);
    if(json){
        savedItems = json;
    }

    return {
        ...state,
        todos: savedItems,
        checkboxCount: parseInt(todosCount)
    };
}

const CLEAR_COMPLETED_TASK = (state) => {
    let todos = window.localStorage.getItem("Todos");
    let json = JSON.parse(todos);
    let newArr = [];
    for(let i=0; i<json.length; i++){
        if (json[i].className !== 'done') {
            newArr.push(json[i]);
        }
    }
    window.localStorage.setItem("Todos", JSON.stringify(newArr));
    window.localStorage.setItem("TodosCount", newArr.length);
   
    return {
        ...state,
        todos: newArr,
        checkboxCount: parseInt(newArr.length)
    };
}

export default (state=initialState, action) => {
    switch(action.type){
        case "ADD_TODO" : state = ADD_TODO(state, action); break;
        case "DELETE_TODO" : state = DELETE_TODO(state, action); break;
        case "SELECT_ALL_TODO" : state = SELECT_ALL_TODO(state, action); break;
        case "GET_ALL_TODOS" : state = GET_ALL_TODO(state); break;
        case "SELECT_TODO" : state = SELECT_TODO(state, action); break;
        case "CLEAR_COMPLETED_TASK" : state = CLEAR_COMPLETED_TASK(state); break;
        default: 
    }
    return state;
};;
