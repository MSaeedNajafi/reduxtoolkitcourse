import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

let lastId = 0;

const initialState = {
  bugs: [],
  loading: false,
  // usefull for cashing, 
  lastFetch: null,
};

const bugSlice = createSlice({
  name: "bugs",
  initialState: initialState,
  reducers: {
    bugAdded: (state, action) => {
      state.bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.bugs.findIndex((bug) => bug.id === action.payload.id);
      state.bugs[index].resolved = true;
    },
    bugsRemoved: (state, action) => {
      const index = state.bugs.findIndex((bug) => bug.id === action.payload.id);
      state.bugs.splice(index, 1);
    },
    bugsAssignedToUser: (state, action) => {
      const { userId, bugId } = action.payload;
      const index = state.bugs.findIndex((bug) => bug.id === bugId);
      state.bugs[index].userId = userId;
    },
    // name is bugs/bugsReceived
    bugsReceived: (state, action) => {
      state.bugs = action.payload;
      state.loading =  false;
    },
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugsRequestFailed: (state, action) => {
      state.loading = false;
    }
  },
});

export const { bugAdded, bugResolved, bugsRemoved, bugsAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } =
  bugSlice.actions;
export default bugSlice.reducer;

// Action creators
// fetch from api
const url = '/bugs'
export const loadBugs = () => apiCallBegan({
  url,
  onStart: bugsRequested.type,
  onSuccess: bugsReceived.type,
  onError: bugsRequestFailed.type,
})
//whithout extraction would be bugslice.actions.bugsReceived.type,

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


