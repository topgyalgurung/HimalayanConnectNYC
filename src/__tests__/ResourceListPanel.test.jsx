import { render, screen } from "@testing-library/react";
import ResourceListPanel from "../app/(homepage)/resources/ResourceListPanel";

// Mock the ResourceList component
jest.mock("../app/(homepage)/resources/ResourceList", () => ({
  __esModule: true,
  default: ({ filteredResources, onViewDetailsAction }) => (
    <div data-testid="resource-list">
      {filteredResources.map((resource) => (
        <div key={resource.id} data-testid={`resource-${resource.id}`}>
          <h3>{resource.name}</h3>
          <button
            data-testid={`view-details-${resource.id}`}
            onClick={() => onViewDetailsAction(resource)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  ),
}));

describe("ResourceListPanel", () => {
  // Test data setup
  const mockResources = [
    {
      id: "1",
      name: "Community Center",
      description: "A place for community gatherings",
    },
    {
      id: "2",
      name: "Health Clinic",
      description: "Medical services for the community",
    },
  ];

  const mockOnViewDetailsAction = jest.fn();

  beforeEach(() => {
    mockOnViewDetailsAction.mockClear();
  });

  // Verifies the panel renders with correct title and structure
  it("renders the panel with correct structure", () => {
    render(
      <ResourceListPanel
        filteredResources={mockResources}
        onViewDetailsAction={mockOnViewDetailsAction}
      />
    );

    expect(screen.getByText("RESOURCES")).toBeInTheDocument();
    expect(screen.getByTestId("resource-list")).toBeInTheDocument();
  });

  // Checks if the panel displays the correct number of resources
  it("displays all filtered resources", () => {
    render(
      <ResourceListPanel
        filteredResources={mockResources}
        onViewDetailsAction={mockOnViewDetailsAction}
      />
    );

    expect(screen.getByTestId("resource-1")).toBeInTheDocument();
    expect(screen.getByTestId("resource-2")).toBeInTheDocument();
  });

  // Verifies the panel handles empty resource list gracefully
  it("handles empty resource list", () => {
    render(
      <ResourceListPanel
        filteredResources={[]}
        onViewDetailsAction={mockOnViewDetailsAction}
      />
    );

    expect(screen.getByTestId("resource-list")).toBeInTheDocument();
    expect(screen.queryByTestId("resource-1")).not.toBeInTheDocument();
  });

  // Tests if clicking view details triggers the callback with correct resource
  it("triggers view details action with correct resource", () => {
    render(
      <ResourceListPanel
        filteredResources={mockResources}
        onViewDetailsAction={mockOnViewDetailsAction}
      />
    );

    const viewDetailsButton = screen.getByTestId("view-details-1");
    viewDetailsButton.click();

    expect(mockOnViewDetailsAction).toHaveBeenCalledWith(mockResources[0]);
  });

  // Verifies the panel maintains correct styling classes
  it("applies correct styling classes", () => {
    const { container } = render(
      <ResourceListPanel
        filteredResources={mockResources}
        onViewDetailsAction={mockOnViewDetailsAction}
      />
    );

    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-full", "md:w-[35%]", "lg:w-[30%]");
  });
});
