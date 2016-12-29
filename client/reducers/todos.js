import { handleActions } from 'redux-actions'
import * as types from '../actions/todos'

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}]

export default handleActions({
  [types.addTodo] (state, action) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  },

  [types.deleteTodo] (state, action) {
    return state.filter(todo => todo.id !== action.payload )
  },

  [types.editTodo] (state, action) {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    })
  },

  [types.completeTodo] (state, action) {
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    })
  },

  [types.completeAll] (state, action) {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      }
    })
  },

  [types.clearCompleted] (state, action) {
    return state.filter(todo => todo.completed === false)
  }
}, initialState)
