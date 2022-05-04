import configureStore from "./store/configureStore";
import { assignBugToUser, loadBugs } from "./store/bugSlice";
import {
  bugsAssignedToProject,
  projectAdded,
  projectRemoved,
} from "./store/projectSlice";
import { addUser } from "./store/userSlice";
import * as actions from './store/api';

// store.dispatch((dispatch, getState)=> {
//   // call an API
//   // dealing with promises
//   // when the promise is resolved => dispatch()
//   // if the oprimise is rejected => dispatch()
//   // some logic is here
//   // use middleware
//   dispatch({type: 'bugsReceived', bugs: [1,2,3]})
//   console.log(getState())
// })


// UI Layer, no need to know what action to disptach or what end point to call
// store.dispatch(actions.apiCallBegan({
//   url: '/bugs',
//   // method: "get",
//   // data: {},
//   onSuccess: "bugs/bugsReceived",
//   // onError: actions.apiCallFailed.type
// }));


const store = configureStore()
store.dispatch(loadBugs())
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000 )
// store.dispatch(addBug(bug));
// store.dispatch(resolveBug(bug));

// setTimeout(()=> store.dispatch(loadBugs()), 2000)
