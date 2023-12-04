import { useCallback, useReducer } from "react"


function todoReducer (state,action){
   
    if(action.type==="ROMOVE_TOD"){
      return {
        ...state,
        todos: state.todos.filter(todo => todo!== action.payload)
      }
    }
    if(action.type==="TOGGLE_TOD"){
      return {
        ...state,
        todos: state.todos.map(todo => todo == action.payload ? {
        ...todo,
         checked: !todo.checked
        }:todo)
      }
    }
    if(action.type==="CLEAR_COMPLETED"){
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.checked)
      }
    }
    if(action.type==="SHOW_COMPLETED"){
      return {
        ...state,
        showCompleted: !state.showCompleted
      }
    }
    return state
  }


  function useTodo (){
    const todos = [
        {
          name: 'Faire les courses',
          checked: false
        },
        {
          name : 'Ranger les courses',
          checked: false
        },
        {
          name:'Manger les courses',
          checked: false
        }
       ]
       const [state, dispatch] = useReducer(todoReducer,
        {todos,
        showCompleted:true 
        })
       const visiblesTodos = state.showCompleted ? state.todos : state.todos.filter(todo => !todo.checked )

       return {
        visiblesTodos : visiblesTodos,
        showCompleted : state.showCompleted,
        toggletodo : useCallback (
             (todo) => dispatch({type:'TOGGLE_TOD',payload: todo}),
            []
            ), 
        removetodo : useCallback (
            (todo)=>dispatch({type:'ROMOVE_TOD',payload: todo}),
            []
            ),
        clear : useCallback (()=>dispatch({type:'CLEAR_COMPLETED'}),[]),
        netoyer : useCallback (()=>dispatch({type:'SHOW_COMPLETED'}),[])

       }

  }
  export default useTodo