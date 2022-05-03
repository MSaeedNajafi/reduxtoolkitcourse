// Thunk
// we this middleware we can dispatch function,
// so we can make a synchronous API call
const func = ({dispatch, getState}) => next => action => {
    // check the tyoeof action is a function then call it
    if(typeof action === 'function')
        action(dispatch, getState)
    // if the type is plain object, pass it to the next middleware function
    else
        next(action)
}

export default func;