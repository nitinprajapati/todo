const initialState = {
    todos:[

    ]
};

const ADD_TODO = (state, action) => {
    const savedItems = [];
    let todos = window.localStorage.getItem("Todos");
    if(todos){
        todos += `,${action.payload}`
        savedItems.push(todos.split(","));
    }
    else {
        savedItems.push([action.payload]);
    }

    window.localStorage.setItem("Todos", savedItems);

    return {
        ...state,
        todos: savedItems[0]
    };

}

const DELETE_TODO = (state, action) => {
    const savedItems = [];
    let todos = window.localStorage.getItem("Todos").split(",");
    let index = todos.indexOf(action.payload);
    if (index > -1) {
        todos.splice(index, 1);
    }
    savedItems.push(todos);
    window.localStorage.setItem("Todos", savedItems);
    return {
        ...state,
        todos: savedItems[0]
    };
}

const SELECT_ALL_TODO = (state, action) => {
    return state;
}

const GET_ALL_TODO = (state) => {
    const savedItems = [];
    let todos = window.localStorage.getItem("Todos");
    if(todos){
        savedItems.push(todos.split(","));
    }
    else{
       savedItems.push([]); 
    }

    return {
        ...state,
        todos: savedItems[0]
    };
}

export default (state=initialState, action) => {
    switch(action.type){
        case "ADD_TODO" : state = ADD_TODO(state, action); break;
        case "DELETE_TODO" : state = DELETE_TODO(state, action); break;
        case "SELECT_ALL_TODO" : state = SELECT_ALL_TODO(state, action); break;
        case "GET_ALL_TODOS" : state = GET_ALL_TODO(state); break;
        default: 
    }
    return state;
};;
