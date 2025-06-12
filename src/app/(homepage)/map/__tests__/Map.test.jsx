import { render, screen, fireEvent } from "@testing-library/react";
import { MapView } from "../app/(homepage)/map/Map";

// Mock Google Maps components to simulate map functionality
jest.mock("@vis.gl/react-google-maps", () => ({
  Map: ({ children }) => <div data-testid="mock-map">{children}</div>,
  APIProvider: ({ children }) => (
    <div data-testid="mock-api-provider">{children}</div>
  ),
  AdvancedMarker: ({ children }) => (
    <div data-testid="mock-marker">{children}</div>
  ),
  InfoWindow: ({ children }) => (
    <div data-testid="mock-info-window">{children}</div>
  ),
  CollisionBehavior: {
    REQUIRED_AND_HIDES_OPTIONAL: "required_and_hides_optional",
  },
}));

// Mock next/image to handle image rendering in tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} data-testid="mock-image" />,
}));

// Mock resource details card component
jest.mock("../app/components/features/ResourceDetailsCard", () => ({
  __esModule: true,
  default: ({ resource, onCloseAction }) => (
    <div data-testid="resource-details-card">
      <h2>{resource.name}</h2>
      <button onClick={onCloseAction}>Close</button>
    </div>
  ),
}));

// Mock resource suggest card component for editing
jest.mock("../app/components/features/ResourceSuggestCard", () => ({
  __esModule: true,
  default: ({ resource, onEditCloseAction }) => (
    <div data-testid="resource-suggest-card">
      <h2>Edit {resource.name}</h2>
      <button onClick={onEditCloseAction}>Close Edit</button>
    </div>
  ),
}));

// Mock review submit card component
jest.mock("../app/components/features/ReviewSubmitCard", () => ({
  __esModule: true,
  default: ({ resource, onReviewCloseAction }) => (
    <div data-testid="review-submit-card">
      <h2>Review {resource.name}</h2>
      <button onClick={onReviewCloseAction}>Close Review</button>
    </div>
  ),
}));

describe("MapView Component", () => {
  const mockResource = {
    id: "1",
    name: "Test Resource",
    address: "123 Test St",
    description: "Test description",
    ResourceCategory: { name: "community" },
    Location: [{ latitude: 40.7564298, longitude: -73.8872289 }],
  };

  const defaultProps = {
    resources: [mockResource],
    selectedResource: null,
    editResource: null,
    reviewResource: null,
    onSuggestEditAction: jest.fn(),
    onReviewResourceAction: jest.fn(),
    onCloseAction: jest.fn(),
    onEditCloseAction: jest.fn(),
    onReviewCloseAction: jest.fn(),
  };

  // Test that verifies the map and API provider are properly rendered
  it("renders map with API provider", () => {
    render(<MapView {...defaultProps} />);
    expect(screen.getByTestId("mock-api-provider")).toBeInTheDocument();
    expect(screen.getByTestId("mock-map")).toBeInTheDocument();
  });

  // Test that verifies resource markers are displayed on the map
  it("renders resource markers", () => {
    render(<MapView {...defaultProps} />);
    expect(screen.getAllByTestId("mock-marker")).toHaveLength(1);
  });

  // Test that verifies resource details card appears when a resource is selected
  it("shows resource details when selected", () => {
    render(<MapView {...defaultProps} selectedResource={mockResource} />);
    expect(screen.getByTestId("resource-details-card")).toBeInTheDocument();
    expect(screen.getByText("Test Resource")).toBeInTheDocument();
  });

  // Test that verifies edit card appears when editing a resource
  it("shows edit card when editing", () => {
    render(<MapView {...defaultProps} editResource={mockResource} />);
    expect(screen.getByTestId("resource-suggest-card")).toBeInTheDocument();
    expect(screen.getByText("Edit Test Resource")).toBeInTheDocument();
  });

  // Test that verifies review card appears when reviewing a resource
  it("shows review card when reviewing", () => {
    render(<MapView {...defaultProps} reviewResource={mockResource} />);
    expect(screen.getByTestId("review-submit-card")).toBeInTheDocument();
    expect(screen.getByText("Review Test Resource")).toBeInTheDocument();
  });

  // Test that verifies the close action is triggered when closing resource details
  it("handles closing resource details", () => {
    render(<MapView {...defaultProps} selectedResource={mockResource} />);
    fireEvent.click(screen.getByText("Close"));
    expect(defaultProps.onCloseAction).toHaveBeenCalledWith(null);
  });
});
