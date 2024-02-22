import Axios from 'axios';
import { IPost } from '../types/types';

const API_PATH = 'https://jsonplaceholder.typicode.com';

const settings = {
   baseURL: API_PATH,
   timeout: 10000
};

const api = Axios.create(settings);

export interface GetParams {
   searchFragment?: string;
   limit?: number;
   page?: number;
}

const FetchService = {
   async getList(params: GetParams) {
      const queryItems = [];
      if (params.searchFragment) queryItems.push('q=' + params.searchFragment);
      if (params.limit) queryItems.push('_limit=' + params.limit);
      if (params.page) queryItems.push('_page=' + params.page);
      const query = queryItems.length ? `?${queryItems.join('&')}` : '';
      return await api.get<IPost[]>(`/posts${query}`);
   }
};

export default FetchService;
