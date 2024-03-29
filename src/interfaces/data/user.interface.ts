import { INotification, IResponseData, ISystemNotify } from "interfaces/global.interface";
import { ICities } from "./demand.interface";

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserType {
  id: string;
  name: string;
  permission: string;
}

export interface IUser {
  city: string;
  city_id?: string;
  cpf: string;
  id?: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  phone_ddd: string;
  born_date: string;
  userType_id?: string;
  userType: string;
  Notify?: ISystemNotify[] | ISystemNotify;
}

export interface IRequest {
  id: string;
  email: string;
  text: string;
  city_id: string;
  userType_id: string;
  createdAt: string;
  Cities: ICities;
  Usertype: IUserType;
  status: string;
}

export interface IUserPost {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  born_date: string;
  phone: number | string;
  phone_ddd: number | string;
  userType: string;
  city: string;
  confPassword?: string;
  password: string;
}

export interface IUserPostEdit {
  id: string;
  ename: string;
  email: string;
  cpf: string;
  born_date: string;
  phone: number | string;
  phone_ddd: number | string;
  userType: string;
  city: string;
  password: string;
}

export interface IDataUser extends IResponseData {
  tryLogin: boolean;
  typeMessage: string;
  users: IUser[];
  fullUsers: IUser[];
  requestUsers: IUser[];
  fullRequestUsers: IUser[];
  touched?: boolean;
  status: number;
  filters: {
    type: IUser[];
    search: IUser[];
    city: IUser[];
    merge: IUser[];
    clicked: IUser | undefined;
  };
}
