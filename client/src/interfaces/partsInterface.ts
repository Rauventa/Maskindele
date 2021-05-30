import {ICars} from "./carsInterface";

export interface IParts {
  customer?: any;
  _id: string,
  name: string,
  vendor: string,
  status: number,
  price: number,
  car: ICars,
  owner: any
}