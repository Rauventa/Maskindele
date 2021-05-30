import {IParts} from "./partsInterface";

export interface ICars {
  _id: string,
  parts: IParts[],
  brand: string,
  model: string,
  year: number,
  description: string
}