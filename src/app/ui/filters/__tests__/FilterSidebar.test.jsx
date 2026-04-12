import { render, screen, fireEvent } from "@testing-library/react";
import FilterSidebar from "@/app/ui/filters/FilterSidebar";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams("query=help&page=2"),
}));

// Mock child components
jest.mock("../ResourceFilter", () => ({
  __esModule: true,
  default: ({ onFilterChangeAction, selectedCategories }) => (
    <div data-testid="resource-filter">
      <span data-testid="selected-categories">{selectedCategories.join(",")}</span>
      <button
        data-testid="category-filter-button"
        onClick={() => onFilterChangeAction(["Community"])}
      >
        Filter by Community
      </button>
    </div>
  ),
}));

jest.mock("../BoroughFilter", () => ({
  __esModule: true,
  default: ({ onFilterChangeAction, selectedBoroughs }) => (
    <div data-testid="borough-filter">
      <span data-testid="selected-boroughs">{selectedBoroughs.join(",")}</span>
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
  beforeEach(() => {
    replaceMock.mockClear();
  });

  it("renders filter components", () => {
    render(
      <FilterSidebar
        selectedCategories={[]}
        selectedBoroughs={[]}
      />
    );
    expect(screen.getByTestId("resource-filter")).toBeInTheDocument();
    expect(screen.getByTestId("borough-filter")).toBeInTheDocument();
  });

  it("updates the URL when a category is selected", () => {
    render(
      <FilterSidebar
        selectedCategories={[]}
        selectedBoroughs={[]}
      />
    );

    fireEvent.click(screen.getByTestId("category-filter-button"));

    expect(replaceMock).toHaveBeenCalledWith("/?query=help&categories=Community");
  });

  it("updates the URL when a borough is selected", () => {
    render(
      <FilterSidebar
        selectedCategories={[]}
        selectedBoroughs={[]}
      />
    );

    fireEvent.click(screen.getByTestId("borough-filter-button"));

    expect(replaceMock).toHaveBeenCalledWith("/?query=help&boroughs=Manhattan");
  });

  it("preserves existing filters and resets pagination", () => {
    render(
      <FilterSidebar
        selectedCategories={["Community"]}
        selectedBoroughs={[]}
      />
    );

    fireEvent.click(screen.getByTestId("borough-filter-button"));

    expect(screen.getByTestId("selected-categories")).toHaveTextContent("Community");
    expect(replaceMock).toHaveBeenCalledWith(
      "/?query=help&categories=Community&boroughs=Manhattan"
    );
  });
});
