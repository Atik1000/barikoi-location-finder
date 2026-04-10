import { render, screen } from "@testing-library/react";

import { SearchResults } from "@/components/search-results";

describe("SearchResults", () => {
  test("shows min character message", () => {
    render(
      <SearchResults
        results={[]}
        isLoading={false}
        query="ab"
        errorMessage={null}
        selectedLocation={null}
        onSelectLocation={jest.fn()}
      />,
    );

    expect(screen.getByText(/Type at least/i)).toBeInTheDocument();
  });

  test("shows skeleton when loading", () => {
    render(
      <SearchResults
        results={[]}
        isLoading={true}
        query="dhaka"
        errorMessage={null}
        selectedLocation={null}
        onSelectLocation={jest.fn()}
      />,
    );

    expect(screen.getByText("Searching locations...")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading search results")).toBeInTheDocument();
  });

  test("renders result summary", () => {
    render(
      <SearchResults
        results={[
          {
            id: 1,
            name: "Banani",
            address: "Banani, Dhaka",
            latitude: 23.79,
            longitude: 90.4,
          },
        ]}
        isLoading={false}
        query="ban"
        errorMessage={null}
        selectedLocation={null}
        onSelectLocation={jest.fn()}
      />,
    );

    expect(screen.getByText("1 result(s) found")).toBeInTheDocument();
    expect(screen.getByText("Banani")).toBeInTheDocument();
  });
});
