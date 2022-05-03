import axios from 'axios'
import * as actions from '../../store/api';

const api = ({dispatch, getState}) => next => async  action => {
    if(action.type !== actions.apiCallBegan.type){
        return next(action)
    }
    next(action)
    const {url, method, data, onSuccess, onError} = action.payload;

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
        dispatch(actions.apiCallFailed(error));
        // specific error
        if(onError)
            dispatch({type: onError, payload: error});
    }

} 

export default api;