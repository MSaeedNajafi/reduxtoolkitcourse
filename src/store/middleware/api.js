import axios from 'axios'
import * as actions from '../../store/api';

// in this middleware we want to hanle specific types of actions
// actions that indicate an api call

/**
 * Constructing an action
 * const action = {
 *  type:  --> type can be something like apiCallBegan or apiRequested
 *  payload: --> all the data we need to make an api call {
 *      url: --> "/bugs" (for bugs or /users for users)
 *      method: --> get, post, patch, put
 *      data: --> if we want to post any data to the server
 *                  we can have some properties here as well:
 *      onSuccess: --> action that will be dispatched, if this operation is succesful
 *      onError: --> action that withh be dispatched when api call fails 
 *  }
 * }
 * 
 * for onSuccess and onError we are using strings, not functions as call backs, because 
 * the action object should be serializable, we should be able to store it, functions are not
 * serializable
 * 
 * the api middleware should be able to handle this kind of action
 */
//returns a promise since we are using async
const api = ({dispatch, getState}) => next => async  action => {

    // check the type of action

    if(action.type !== actions.apiCallBegan.type){
        // pass the action to next middlware
        return next(action)
    }

    // console.log(' --- > ' ,  action.payload)
    
    const {url, method, data, onStart, onSuccess, onError} = action.payload;

    if(onStart)
        dispatch({type: onStart});

    next(action);

    // an action for calling api end point = apiCallBegan
    // handle the result and reject cases

    try{
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url, 
            method, 
            data
        })
        //general
        dispatch(actions.apiCallSuccess(response.data))

        //specifiec
        if(onSuccess)
            dispatch({type: onSuccess, payload: response.data})
    }
    catch(error){
        //genral
        dispatch(actions.apiCallFailed(error.message));
        // specific error
        if(onError)
            dispatch({type: onError, payload: error.message});
    }
} 

export default api;