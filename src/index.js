import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugsRemoved,
  bugResolved,
  getUnresolvedBugs,
  getResolvedBugs,
  bugsAssignedToUser,
  getBugsByUser,
} from "./store/bugSlice";
import {
  bugsAssignedToProject,
  projectAdded,
  projectRemoved,
} from "./store/projectSlice";
import { addUser } from "./store/userSlice";

const store = configureStore();

store.dispatch(bugAdded({ description: "Bug 1" }));
console.log("adding bug", store.getState().entities);

store.dispatch(bugAdded({ description: "Bug 2" }));
console.log("adding bug", store.getState().entities);

store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugAdded({ description: "Bug 4" }));
store.dispatch(bugAdded({ description: "Bug 5" }));

store.dispatch(bugResolved({ id: 2 }));
store.dispatch(bugResolved({ id: 4 }));
console.log("resolving bug", store.getState().entities);

// store.dispatch(bugsRemoved({ id: 2 }));
// store.dispatch(bugActions.bugsRemoved({id: 1}));
// console.log("removing bug", store.getState().entities);

store.dispatch(projectAdded({ name: "Project 1" }));
console.log("add project ", store.getState().entities);

store.dispatch(projectAdded({ name: "Project 2" }));
console.log("add project ", store.getState().entities);

console.log("store ", store.getState().entities);

// store.dispatch(projectRemoved({ id: 1 }));
// console.log("remove project ", store.getState().entities);

// console.log("store ", store.getState().entities);

const unresovedBugs1 = getUnresolvedBugs(store.getState());
const unresovedBugs2 = getUnresolvedBugs(store.getState());
const resovedBugs = getResolvedBugs(store.getState());

console.log(unresovedBugs1);
console.log(resovedBugs);
console.log(unresovedBugs1 == unresovedBugs2);

store.dispatch(addUser({ name: "user1" }));
store.dispatch(addUser({ name: "user2" }));
console.log("store ", store.getState().entities);

store.dispatch(bugsAssignedToUser({ bugId: 2, userId: 1 }));
store.dispatch(bugsAssignedToUser({ bugId: 4, userId: 1 }));
console.log("new store ", store.getState().entities);

const getBugsFromUser = getBugsByUser(2)(store.getState());
console.log(getBugsFromUser);

store.dispatch(bugsAssignedToProject({ projectId: 1, bugId: 2 }));
console.log("new store ", store.getState().entities);
