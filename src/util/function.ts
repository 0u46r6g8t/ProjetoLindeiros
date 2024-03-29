/* eslint-disable array-callback-return */
import { IDemand } from "interfaces/data/demand.interface";
import toast from "react-hot-toast";
import { IOptions } from "../interfaces/components.interface";

export const splitTitle = (text: string) => {
  const textSplit = text.split(" ");

  return textSplit
    .map((item, index) => (index <= 2 ? item : ""))
    .toString()
    .replaceAll(",", " ");
};

export const formatKeyTypes = (datas: any[], paramsExtra?: {}) => {
  const newData: IOptions[] = [];
  datas.map((item, index) => {
    // if (datas !== undefined) {
    if (typeof item === "object") {
      newData.push({
        id: item.id,
        name: item.name,
        ...paramsExtra,
      });
    } else {
      newData.push({
        id: "none",
        name: item,
        ...paramsExtra,
      });
    }
  });
  return newData;
};

export const mergeArray = (aB: IDemand[], bB: IDemand[]) => {
  const output = [];

  if (aB.length > bB.length) {
    output.push(aB.filter((item) => bB.map((item2) => item2.id !== item.id)));
  } else {
    output.push(bB.filter((item) => aB.map((item2) => item2.id !== item.id)));
  }
  return output;
};

export const isValid = (value: string) => {
  return value !== "" || value !== undefined;
};

export const Sleep = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const SaveFile = (document: any) => {
  console.log(document);
};

export const showErrorMessage = (message: string, type: string) => {
  if (type === "error") {
    toast.error(message);
  } else {
    toast.success(message);
  }
};

export const verifyPermission = (permission: string | undefined) => {
  if (permission) {
    return permission === "Administrador";
  }
  return false;
};
