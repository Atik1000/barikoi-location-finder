import { locationReducer, setQuery, setResults, clearSearchState } from "@/store/slices/location-slice";
import type { LocationState } from "@/types/location-state";

describe("location-slice", () => {
  const initialState: LocationState = {
    query: "",
    results: [],
    isLoading: false,
    errorMessage: null,
    selectedLocation: null,
  };

  test("setQuery updates search query", () => {
    const state = locationReducer(initialState, setQuery("dhaka"));
    expect(state.query).toBe("dhaka");
  });

  test("setResults sets first result as selected when none selected", () => {
    const incoming = [
      { id: 1, name: "Banani" },
      { id: 2, name: "Dhanmondi" },
    ];

    const state = locationReducer(initialState, setResults(incoming));

    expect(state.results).toHaveLength(2);
    expect(state.selectedLocation).toEqual(incoming[0]);
  });

  test("clearSearchState resets result and selected location", () => {
    const dirtyState: LocationState = {
      ...initialState,
      query: "abc",
      results: [{ id: 1, name: "Banani" }],
      selectedLocation: { id: 1, name: "Banani" },
      errorMessage: "failed",
      isLoading: true,
    };

    const state = locationReducer(dirtyState, clearSearchState());

    expect(state.results).toEqual([]);
    expect(state.selectedLocation).toBeNull();
    expect(state.errorMessage).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});
