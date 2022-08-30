/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  authLoginThunk,
  createUserThunk,
  fetchUsersThunk,
  logoutUserThunk,
  updateUserThunk,
  // deleteUserThunk,
} from "app/reducers/user/thunk";
import { IDataUser, IUser } from "interfaces/data/user.interface";

const initialState: IDataUser = {
  tryLogin: false,
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
      const { payload } = action;
      if (payload !== undefined) {
        state.users = payload.response;
      }
      state.loading = false;
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
        state.loading = false;
        state.message = payload.message;
      }
    });

    builder.addCase(authLoginThunk.fulfilled, (state: IDataUser, action) => {
      const { payload } = action;
      const token = payload.response.replaceAll('"', "");
      state.loading = false;
      if (payload.status === 200) {
        state.error = "";
        state.message = "Login realizado com sucesso!";
        localStorage.setItem("userLogin", JSON.stringify(token));
      } else {
        localStorage.setItem("userLogin", "");
        state.error = payload.response;
      }
      state.tryLogin = true;
    });

    builder.addCase(authLoginThunk.rejected, (state: IDataUser) => {
      state.loading = false;
      state.error = "Não foi possível realizar o login";
      state.message = "";
      state.tryLogin = true;
    });

    builder.addCase(authLoginThunk.pending, (state: IDataUser) => {
      state.tryLogin = false;
      state.loading = true;
    });

    builder.addCase(logoutUserThunk.pending, (state: IDataUser) => {
      state.tryLogin = false;
      state.loading = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state: IDataUser) => {
      state.tryLogin = false;
      state.loading = false;
      state.error = "";

      localStorage.removeItem("userLogin");
    });

    builder.addCase(logoutUserThunk.rejected, (state: IDataUser) => {
      state.tryLogin = true;
      state.loading = false;
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

    builder.addCase(updateUserThunk.fulfilled, (state: IDataUser, actions) => {
      const { payload } = actions;

      if (payload !== undefined) {
        state.loading = false;

        const dataAux: IUser[] = state.users.filter(
          (item) => item.name !== payload.response.name,
        );

        if (dataAux.length > 0) {
          state.users = dataAux;
        }
        state.loading = false;
      }
    });
  },
  reducers: {
    getInfo: () => {},
    deleteUser: () => {},
    updateUser: () => {},
  },
});

export const { getInfo, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
