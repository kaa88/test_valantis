import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiProducts from "../../api/ApiProducts";
import { AxiosError } from "axios";
import * as types from "../../api/types";
import { RootState } from "../store";

const STATE_UPDATE_DELAY = 500;

const initialState: types.IProductState = {
  isLoading: true,
  loadStatus: 0,
  loadError: null,
  ids: null,
  products: null,
  filterType: null,
  filterValue: undefined,
  limit: 50,
  pageCount: 0,
  activePage: 0,
  totalItemsCount: 0,
};

export const fetchUpdateList = createAsyncThunk<
  types.QueryResponseGetIds,
  void,
  { state: RootState; rejectValue: any }
>(
  "fetchUpdateList",
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const state = getState().product;
    const data: types.QueryBodyGetIds = {
      action: state.filterType ? "filter" : "get_ids",
      params: {},
    };
    if (data.action === "filter" && data.params && state.filterType)
      data.params[state.filterType] =
        state.filterType === "price"
          ? Number(state.filterValue)
          : state.filterValue;

    try {
      const response = await ApiProducts.getIds(data);
      setTimeout(() => {
        dispatch(fetchGetItems());
      }, STATE_UPDATE_DELAY);

      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchGetItems = createAsyncThunk<
  types.QueryResponseGetItems & { activePage: number },
  number | undefined,
  { state: RootState; rejectValue: any }
>(
  "fetchGetItems",
  async (activePage, { rejectWithValue, fulfillWithValue, getState }) => {
    let page = 0;
    if (activePage && activePage > 0) page = activePage;
    const { ids: allIds, limit } = getState().product;

    try {
      if (!allIds) throw new Error("No item Ids");
      if (!allIds.length)
        return fulfillWithValue({ result: [], activePage: page });
      const ids = [...allIds].splice(limit * page, limit);
      const response = await ApiProducts.getItems(ids);
      return fulfillWithValue({ ...response.data, activePage: page });
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchApplyFilter = createAsyncThunk<
  types.QueryFilter,
  types.QueryFilter,
  { state: RootState; rejectValue: any }
>(
  "fetchApplyFilter",
  async (query, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    const state = getState().product;
    if (query.filterType !== state.filterType) {
      setTimeout(() => {
        dispatch(fetchUpdateList());
      }, STATE_UPDATE_DELAY);
    }

    try {
      return fulfillWithValue(query);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateList.pending, (state) => {
        state.isLoading = true;
        state.loadStatus = initialState.loadStatus;
        state.loadError = initialState.loadError;
        state.products = initialState.products;
        state.pageCount = initialState.pageCount;
        state.activePage = initialState.activePage;
        state.totalItemsCount = initialState.totalItemsCount;
      })
      .addCase(fetchUpdateList.rejected, (state, action) => {
        state.isLoading = false;
        let error = "Unknown error";
        if (
          action.payload instanceof AxiosError &&
          action.payload.isAxiosError &&
          action.payload.response?.data
        ) {
          error = action.payload.response?.data;
        } else if (action.payload instanceof Error) {
          error = action.payload.message;
        }
        state.loadError = error;
        state.loadStatus =
          action.payload?.response?.status || initialState.loadStatus;
      })
      .addCase(fetchUpdateList.fulfilled, (state, action) => {
        const ids = action.payload.result;
        state.isLoading = false;
        state.loadError = initialState.loadError;
        state.ids = ids;
        state.totalItemsCount = ids.length;
        state.pageCount = Math.ceil(ids.length / state.limit);
      })

      .addCase(fetchGetItems.pending, (state) => {
        state.isLoading = true;
        state.loadStatus = initialState.loadStatus;
        state.loadError = initialState.loadError;
      })
      .addCase(fetchGetItems.rejected, (state, action) => {
        state.isLoading = false;
        let error = "Unknown error";
        if (
          action.payload instanceof AxiosError &&
          action.payload.isAxiosError &&
          action.payload.response?.data
        ) {
          error = action.payload.response?.data;
        } else if (action.payload instanceof Error) {
          error = action.payload.message;
        }
        state.loadError = error;
        state.loadStatus =
          action.payload?.response?.status || initialState.loadStatus;
      })
      .addCase(fetchGetItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loadError = initialState.loadError;
        state.products = action.payload.result;
        state.activePage = action.payload.activePage;
      })

      .addCase(fetchApplyFilter.fulfilled, (state, action) => {
        state.filterType = action.payload.filterType;
        state.filterValue = action.payload.filterValue;
      });
  },
});

// export const { } = productSlice.actions;
export default productSlice.reducer;
