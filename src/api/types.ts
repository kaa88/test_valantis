export interface IProduct {
  id: string | null;
  price: number | null;
  brand: string | null;
  product: string | null;
}

export type Id = string;

export type IAction = "get_items" | "get_fields" | "get_ids" | "filter";

export type IFilter = "brand" | "price" | "product";

export interface IProductState {
  isLoading: boolean;
  loadStatus: number;
  loadError: string | null;
  ids: Id[] | null;
  products: IProduct[] | null;
  filterType: IFilter | null;
  filterValue: string | number | undefined;
  limit: number;
  pageCount: number;
  activePage: number;
  totalItemsCount: number;
}

export type QueryParamsKeys =
  | "offset"
  | "limit"
  | "ids"
  | "field"
  | "price"
  | "brand"
  | "product";

export type QueryParams = { [key in QueryParamsKeys]?: any };

export type QueryGetIds = {
  activePage?: number;
};
export type QueryBodyGetIds = {
  action: "get_ids" | "filter";
  params?: QueryParams;
};
export type QueryResponseGetIds = {
  result: Id[];
};

export type QueryBodyGetItems = Id[];
export type QueryResponseGetItems = {
  result: IProduct[];
};

export type QueryFilter = {
  filterType: IProductState["filterType"];
  filterValue?: IProductState["filterValue"];
};
