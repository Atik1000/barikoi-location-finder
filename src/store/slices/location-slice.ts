import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BarikoiLocation } from "@/types/barikoi";

type LocationState = {
  query: string;
  results: BarikoiLocation[];
  isLoading: boolean;
  errorMessage: string | null;
  selectedLocation: BarikoiLocation | null;
};

const initialState: LocationState = {
  query: "",
  results: [],
  isLoading: false,
  errorMessage: null,
  selectedLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setResults(state, action: PayloadAction<BarikoiLocation[]>) {
      state.results = action.payload;

      if (!state.selectedLocation && action.payload.length > 0) {
        state.selectedLocation = action.payload[0];
      }

      if (action.payload.length === 0) {
        state.selectedLocation = null;
      }
    },
    selectLocation(state, action: PayloadAction<BarikoiLocation | null>) {
      state.selectedLocation = action.payload;
    },
    clearSearchState(state) {
      state.results = [];
      state.errorMessage = null;
      state.isLoading = false;
      state.selectedLocation = null;
    },
  },
});

export const {
  setQuery,
  setLoading,
  setError,
  setResults,
  selectLocation,
  clearSearchState,
} = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
