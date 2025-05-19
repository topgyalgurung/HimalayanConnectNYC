import { render, screen, fireEvent } from "@testing-library/react";
import FilterSidebar from "../app/(homepage)/filters/FilterSidebar";

// Mock child components
jest.mock("../app/(homepage)/filters/ResourceFilter", () => ({
  __esModule: true,
  default: ({ onFilterChangeAction }) => (
    <div data-testid="resource-filter">
      <button
        data-testid="category-filter-button"
        onClick={() => onFilterChangeAction(["community"])}
      >
        Filter by Community
      </button>
    </div>
  ),
}));

jest.mock("../app/(homepage)/filters/BoroughFilter", () => ({
  __esModule: true,
  default: ({ onFilterChangeAction }) => (
    <div data-testid="borough-filter">
      <button
        data-testid="borough-filter-button"
        onClick={() => onFilterChangeAction(["Manhattan"])}
      >
        Filter by Manhattan
      </button>
    </div>
  ),
}));

describe("FilterSidebar", () => {
  // Test data
  const mockResources = [
    { id: "1", ResourceCategory: { name: "community" }, city: "Manhattan" },
    { id: "2", ResourceCategory: { name: "health" }, city: "Brooklyn" },
    { id: "3", ResourceCategory: { name: "legal" }, city: "Manhattan" },
  ];

  const mockOnFilteredResourcesChange = jest.fn();

  beforeEach(() => {
    mockOnFilteredResourcesChange.mockClear();
  });

  // Test that verifies both ResourceFilter and BoroughFilter components are properly rendered
  // in the FilterSidebar component
  it("renders filter components", () => {
    render(
      <FilterSidebar
        resources={mockResources}
        onFilteredResourcesChange={mockOnFilteredResourcesChange}
      />
    );
    expect(screen.getByTestId("resource-filter")).toBeInTheDocument();
    expect(screen.getByTestId("borough-filter")).toBeInTheDocument();
  });

  // Test that verifies filtering functionality by resource category
  // When clicking the category filter button, it should filter resources to only show
  // those matching the selected category (e.g., "community")
  it("filters by category", () => {
    render(
      <FilterSidebar
        resources={mockResources}
        onFilteredResourcesChange={mockOnFilteredResourcesChange}
      />
    );
    fireEvent.click(screen.getByTestId("category-filter-button"));
    expect(mockOnFilteredResourcesChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ ResourceCategory: { name: "community" } }),
      ])
    );
  });

  // Test that verifies filtering functionality by borough
  // When clicking the borough filter button, it should filter resources to only show
  // those in the selected borough (e.g., "Manhattan")
  it("filters by borough", () => {
    render(
      <FilterSidebar
        resources={mockResources}
        onFilteredResourcesChange={mockOnFilteredResourcesChange}
      />
    );
    fireEvent.click(screen.getByTestId("borough-filter-button"));
    expect(mockOnFilteredResourcesChange).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ city: "Manhattan" })])
    );
  });

  // Test that verifies the combination of multiple filters
  // When applying both category and borough filters, it should only show resources
  // that match both criteria (e.g., community resources in Manhattan)
  it("combines filters", () => {
    render(
      <FilterSidebar
        resources={mockResources}
        onFilteredResourcesChange={mockOnFilteredResourcesChange}
      />
    );
    fireEvent.click(screen.getByTestId("category-filter-button"));
    fireEvent.click(screen.getByTestId("borough-filter-button"));

    // Should only show resources that match both filters
    expect(mockOnFilteredResourcesChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          ResourceCategory: { name: "community" },
          city: "Manhattan",
        }),
      ])
    );
  });
});
