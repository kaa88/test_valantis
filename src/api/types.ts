export interface IProduct {
  id: string | null;
  price: number | null;
  brand: string | null;
  product: string | null;
}

export type IAction = "get_items" | "get_ids" | "offset" | "limit" | "filter";

export type Query = {};

export type QueryBody = {
  action: IAction;
  params: any; //?
};

export type QueryResponse = {
  result: any; //?
};
