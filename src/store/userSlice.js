import { createSlice, createSelector } from "@reduxjs/toolkit";

let lastId = 0;

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: lastId++,
        name: action.payload.name,
      });
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
