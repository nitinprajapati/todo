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

export const Select_All_Todo =  () => {
    return {
        type: 'SELECT_ALL_TODO'
    }
}

export const getTodos = () => {
     return {
        type: 'GET_ALL_TODOS'
    }
}