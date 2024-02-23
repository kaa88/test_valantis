import Axios from "axios";
import * as types from "./types";
import md5 from "md5";

const API_PATH = "http://api.valantis.store:40000";
const API_PWD = "Valantis";

const settings = {
  baseURL: API_PATH,
  timeout: 10000,
};

const api = Axios.create(settings);

api.interceptors.request.use((config) => {
  config.headers["X-Auth"] = md5(`${API_PWD}_${getTimestamp()}`);
  return config;
});

const ApiProducts = {
  async getIds(data: types.QueryBodyGetIds) {
    return await api.post<types.QueryResponseGetIds>("/", data);
  },
  async getItems(ids: types.QueryBodyGetItems) {
    const data = {
      action: "get_items",
      params: { ids },
    };
    return await api.post<types.QueryResponseGetItems>("/", data);
  },
};

export default ApiProducts;

const getTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = getFormattedNumber(now.getMonth() + 1);
  const date = getFormattedNumber(now.getDate());
  return year.toString() + month + date;
};

export const getFormattedNumber = (value: number): string => {
  let result = value.toString();
  return result.length === 1 ? "0" + result : result;
};
