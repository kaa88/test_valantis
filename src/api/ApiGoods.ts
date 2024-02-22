import Axios from "axios";
import { QueryBody } from "./types";

const API_PATH = "http://api.valantis.store:40000";
const API_PWD = "Valantis";

const settings = {
  baseURL: API_PATH,
  timeout: 10000,
};

const api = Axios.create(settings);

api.interceptors.request.use((config) => {
  config.headers["x-auth"] = `md5("${API_PWD}_${getTimestamp()}")`;
  return config;
});

export interface GetParams {
  searchFragment?: string;
  limit?: number;
  page?: number;
}

const ApiGoods = {
  async getList(data: QueryBody) {
    const fakeData: QueryBody = {
      action: "get_items",
      params: {},
    };
    return await api.post("/", fakeData);
  },
};

export default ApiGoods;

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
