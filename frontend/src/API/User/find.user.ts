/* eslint-disable consistent-return */
import { AxiosError } from "axios";
import { HEADERS_DATA } from "config";
import API from "..";

export const findAllUsers = async (token: string) => {
  try {
    // const token = localStorage.getItem("token_jwt")?.toString();
    const headers = { ...HEADERS_DATA, token: `${token}` };
    const responseUsers = await API.get("/user", {
      method: "GET",
      headers,
    })
      .then((response) => Promise.resolve(response.data))
      .catch((err: Error | AxiosError) => Promise.resolve(err));
    const { User } = await responseUsers.data;

    if (User) {
      return User;
    }
  } catch (e: any) {
    return [];
  }
};

export const findOneUser = async (token: string, id: string) => {
  try {
    const headers = { ...HEADERS_DATA, token: `${token}` };
    const responseUsers = await API.get(`/user/${id}`, {
      method: "GET",
      headers,
    })
      .then((response) => Promise.resolve(response.data))
      .catch((err: Error | AxiosError) => Promise.resolve(err));
    const { User } = await responseUsers.data;

    if (User) {
      return User;
    }
  } catch (e: any) {
    return [];
  }
};