import { createSlice, createSelector } from "@reduxjs/toolkit";

let projectId = 0;

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    projectAdded: (state, action) => {
      state.projects.push({
        id: ++projectId,
        name: action.payload.name,
      });
    },
    projectRemoved: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      state.projects.splice(index, 1);
    },
    bugsAssignedToProject: (state, action) => {
      const { projectId, bugId } = action.payload;
      console.log(projectId, "projectId");
      const index = state.projects.findIndex(
        (project) => project.id === projectId
      );
      state.projects[index].bugId = bugId;
    },
  },
});
export const { projectAdded, projectRemoved, bugsAssignedToProject } =
  projectSlice.actions;
export default projectSlice.reducer;

// export const getBugsByProject = () =>
// createSelector(
//     state => state.entities.projects.projects,
//     projects => projects.filter()

// )
