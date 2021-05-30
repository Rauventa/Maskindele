import {ICars} from "./carsInterface";

export interface IParts {
  _id: string,
  name: string,
  vendor: string,
  status: number,
  price: number,
  car: ICars,
  owner: any
}