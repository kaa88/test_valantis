import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from '../../types/types';
import FetchService, { GetParams } from '../../services/FetchService';
import { AxiosError } from 'axios';

interface State {
   isLoading: boolean;
   loadError: string | null;
   list: IPost[];
   searchFragment: string;
   limit: number;
   pageCount: number;
   activePage: number;
   totalItemsCount: number;
}

const defaultPage = 1;

const initialState: State = {
   isLoading: true,
   loadError: null,
   list: [],
   searchFragment: '',
   limit: 10,
   pageCount: 0,
   activePage: defaultPage,
   totalItemsCount: 0
};

export const updateSearchList = createAsyncThunk('', async (params: GetParams, { getState }) => {
   const state: any = getState();
   const searchState = state.search as State;
   const response = await FetchService.getList({
      searchFragment: params.searchFragment || searchState.searchFragment,
      page: params.page || searchState.activePage,
      limit: searchState.limit
   });
   return { response, params };
});

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(updateSearchList.pending, (state) => {
         state.isLoading = true;
         state.loadError = null;
         state.activePage = defaultPage;
      });
      builder.addCase(updateSearchList.rejected, (state, action) => {
         let error: State['loadError'] = 'Unknown error';
         if (action.payload instanceof AxiosError && action.payload.response?.data)
            error = action.payload.response?.data;
         state.loadError = error;
      });
      builder.addCase(updateSearchList.fulfilled, (state, action) => {
         state.isLoading = false;
         state.loadError = null;
         const { response, params } = action.payload;
         state.list = response.data;
         state.totalItemsCount = response.headers['x-total-count'];
         state.pageCount = Math.ceil(response.headers['x-total-count'] / state.limit);
         if (params.searchFragment) state.searchFragment = params.searchFragment;
         if (params.page) state.activePage = params.page;
      });
   }
});

// export const { } = searchSlice.actions;
export default searchSlice.reducer;
