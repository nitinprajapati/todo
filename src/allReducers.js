import todoReducer from './reducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    todo: todoReducer
});

export default allReducers;