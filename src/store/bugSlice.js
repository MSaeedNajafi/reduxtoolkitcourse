import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from 'moment';
import axios from "axios";

const initialState = {
  bugs: [],
  loading: false,
  // usefull for cashing, 
  lastFetch: null,
};

// command - event
// command : instruction what needs to be done
// event: what has happened
// addBug (notion of a command) - bugAdded (notion of an event)

const bugSlice = createSlice({
  name: "bugs",
  initialState: initialState,
  reducers: {
    bugAdded: (state, action) => {
      // state.bugs.push({
      //   id: ++lastId,
      //   description: action.payload.description,
      //   resolved: false,
      // });
      state.bugs.push(action.payload);
      // we dont need to generate id on the client side anymore
    },

    // bugresolved (notion of an event)
    // resolvedBug (notion of command)
    bugResolved: (state, action) => {
      const index = state.bugs.findIndex((bug) => bug.id === action.payload.id);
      state.bugs[index].resolved = true;
    },
    bugsRemoved: (state, action) => {
      const index = state.bugs.findIndex((bug) => bug.id === action.payload.id);
      state.bugs.splice(index, 1);
    },
    bugsAssignedToUser: (state, action) => {
      const { userId, id: bugId } = action.payload;
      const index = state.bugs.findIndex((bug) => bug.id === bugId);
      state.bugs[index].userId = userId;
    },
    // name is bugs/bugsReceived
    bugsReceived: (state, action) => {
      state.bugs = action.payload;
      state.loading =  false;
      state.lastFetch = Date.now()
    },
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugsRequestFailed: (state, action) => {
      state.loading = false;
    }
  },
});

//disopatch the actions that have a notion of command

// reduce coupling
// these are internal function of this app and should not be used in otehr moduels, so we wont export them
export const { 
  bugAdded,               // addBug
  bugResolved, 
  bugsRemoved, 
  bugsAssignedToUser, 
  bugsReceived, 
  bugsRequested, 
  bugsRequestFailed } =
  bugSlice.actions;

export default bugSlice.reducer;

// Action creators
// fetch from api

const url = '/bugs'

// () => {} returns the plain JS object
// export const loadBugs = () => apiCallBegan({
//   url,
//   onStart: bugsRequested.type,
//   onSuccess: bugsReceived.type,
//   onError: bugsRequestFailed.type,
// })
//whithout extraction would be bugslice.actions.bugsReceived.type,
// make this function returns a function (we can have access to the state)
// () => fn(dispatch, getState) --> will be returned

export const loadBugs = () => (dispatch, getState) => {
  // getState.entities.bugs.lastFetch
  const {lastFetch} = getState().entities.bugs;

  const diffInMin = moment().diff(moment(lastFetch), 'minutes')

  // if it has been 10 min since the last fetch dont fetch anymore
  if (diffInMin < 10) return;

  // in order to start the work flow we need to
  // explicitly call this action, otherwise nothing will happen
  dispatch(apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailed.type,
  }));
}

// Memoization, so only if something hs changed
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getResolvedBugs = createSelector(
  (state) => state.entities.bugs.bugs,
  (bugs) => bugs.filter((bug) => bug.resolved)
);

// createSelector returns a functions
// so instead of assigning that function to this constant "getBugsByUser"
// we can set this constant "getBugsByUser" to a different function
// this function is gonna take aparameter called userId
// retuens the value that is returened from the createSelector
// example ===>   getBugsByUser(1)
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// making an api call
// promise resolved = dispatch(succes)
// promise unresolved = dispatch(error)
// we can do this using an API middleware
// implement these steps more explicitly 
export const addBug = bug => apiCallBegan({
  url,
  method: 'post',   // post something tos erver
  data: bug,        // will be inclided in the body of our request
  onSuccess: bugAdded.type,
})

// export const addBug = bug => async dispatch  => {
//   const response = await axios.request({
//     baseURL: 'http://localhost:9001/api', 
//     url:  '/bugs',
//     method: 'post',
//     data: bug
//   })
//   dispatch(bugAdded(response.data))
// }

// export const addingBug = bug => {
//   //make an api call
//   try{  
//     await axios.post(url, bug);
//     dispatch(bugAdded(bug))
//   }
//   catch(error){
//     dispatch({type: 'error'})
//   }
// }

// url her is a bit different => baseUrl/bugs/id ==> baseUrl/bugs/1
// put --> update the entire resource
// patch --> update one or more property
export const resolveBug = id => apiCallBegan({
  url:url + '/' + id,
  method: 'patch',   
  data: {resolved: true},        
  onSuccess: bugResolved.tyqpe,
})

// notion of a command
export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: url + '/' + bugId,
  method: 'patch',
  data: {userId},
  onSuccess: bugsAssignedToUser.type
})








