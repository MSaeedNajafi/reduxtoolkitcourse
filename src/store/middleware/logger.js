// action: action that was dispatched
// next: reference to next middleware function
// if its the only middleware function we have
// next is gonna be the reducer to handle the function
// curring
// replacing the ',' with '=>'
// const logger = (store, next, action) => {}

// middlwware function is a curried version of the function with
// 3 parameters
// SNA = store, next, action

// const logger = store => next => action == const logger = ({getState, dispatch}) => next => action 


// in GENERAL: store is an object with 2 methods: getState and dispatch

// when call the logger function and pass an object as a parameter we get 
// [store => next => action => { ...... next(action) }; ] as a result
const logger = param => store => next => action => {
    console.log('Logging', param)
    // console.log('next', next)
    // console.log('action', action)
    // calling the next function adn passing the action 
    return next(action)
    // logger > toast > api

}

export default logger