export const Add_Todo =  (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    }
}

export const Delete_Todo =  (todo) => {
   return {
        type: 'DELETE_TODO',
        payload: todo
    }  
}

export const Select_All_Todo =  (element) => {
    return {
        type: 'SELECT_ALL_TODO',
        payload: element
    }
}

export const Select_Todo =  (element) => {
    return {
        type: 'SELECT_TODO',
        payload: element
    }
}

export const getTodos = () => {
     return {
        type: 'GET_ALL_TODOS'
    }
}

export const CLEAR_COMPLETED_TASK =  () => {
    return {
        type: 'CLEAR_COMPLETED_TASK'
    }
}