/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  createUserThunk,
  fetchUsersThunk,
  // deleteUserThunk,
} from "app/reducers/user/thunk";
import { IDataUser } from "interfaces/data/user.interface";

const initialState: IDataUser = {
  loading: false,
  users: [],
  error: "",
  message: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    builder.addCase(fetchUsersThunk.pending, (state: IDataUser) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state: IDataUser, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsersThunk.rejected, (state: IDataUser, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message?.toString() || "";
    });
    // CRUD users
    builder.addCase(createUserThunk.fulfilled, (state: IDataUser, action) => {
      const { payload } = action;

      if (payload !== undefined) {
        state.loading = true;
        state.message = payload.message;
      }
    });

    // builder.addCase(deleteUserThunk.fulfilled, (state: IDataUser, action) => {
    // const { payload } = action;

    // if (payload !== undefined && payload.idRemove) {
    //   state.loading = true;
    //   const dataAux: IUser[] = state.users.filter(
    //     (user: IUser) => user.name !== payload.idRemove,
    //   );
    //   if (dataAux.length > 0) {
    //     state.loading = false;
    //     state.users = dataAux;
    //   }
    // }
    // });

    // builder.addCase(updateUser.fulfilled, (state: IDataUser, actions) => {
    //   const { payload } = actions;

    //   if (payload !== undefined) {
    //     state.loading = true;

    //     const dataAux: IUser[] = state.users.filter(
    //       (item) => item.name !== payload.name,
    //     );

    //     if (dataAux.length > 0) {
    //       state.loading = false;
    //       state.users = dataAux;
    //     }
    //   }
    // });
  },
  reducers: {
    getInfo: () => {},
    deleteUser: () => {},
    updateUser: () => {},
  },
});

export const { getInfo, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;