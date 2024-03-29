import { IResponseData } from "interfaces/global.interface";
import { IUser } from "./user.interface";

export interface IDemand {
  id: string;
  name: string;
  progress: number;
  description: string;
  cover: string;
  createdAt: string;
  priority: string;
  status: number;
  url: string;
  Objective: IObjective;
  Axes: IAxes;
  Cities: ICities;
  User: IUser;
  Proposal?: IProposal[] | IProposal;
}

export interface IDemandPost {
  id?: string;
  name: string;
  description: string;
  priority: string;
  generalText: string;
  city_id: string;
  axes_id: string;
  user_id: string;
}

export interface IObjective {
  id: string;
  general: string;
  SpecificText: {
    text: string;
  };
}

export interface IAxes {
  id: string;
  name: string;
  sigle: string;
}

export interface ICities {
  id: string;
  name: string;
  state: string;
  uf: string;
}

export interface IProposalPost {
  time: string;
  description: string;
  value: string;
  deadline: string;
  demands_id?: string;
  numberInvolved: number;
}

export interface IProposal {
  id: string;
  description: string;
  priority: string;
  isAproved: string;
  createdAt: string;
  Details: IDetails;
  User: IUser;
}

export interface IEProposal {
  id: string;
  description?: string;
  priority?: string;
  isAproved?: string;
  Details?: IDetails;
}

export interface IDetails {
  id: string;
  value: number;
  deadline: string;
  numberInvolved: number;
}

export interface IDataDemand extends IResponseData {
  demandFilter: {
    city: IDemand[];
    axes: IDemand[];
    search: IDemand[];
    filtered: IDemand[];
    clicked: IDemand | undefined;
  };
  demand: IDemand[];
  item: IDemand[];
  fullDemand: IDemand[];
  status: number;
}

export interface IDataProposal extends IResponseData {
  proposal: IProposal[];
  secondaryLoading: boolean;
  item: IProposal | undefined;
  status: number;
}
