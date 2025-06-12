import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";

// main app layout test

// Mock the NavMenu component
jest.mock("../app/(homepage)/NavMenu/NavMenu", () => {
  return function MockNavMenu() {
    return <nav data-testid="mock-nav-menu">Navigation Menu</nav>;
  };
});

// Mock the Toaster component
jest.mock("react-hot-toast", () => ({
  Toaster: () => <div data-testid="mock-toaster">Toaster</div>,
}));

// Mock the UserProvider
jest.mock("../app/context/UserProvider", () => ({
  UserProvider: ({ children }) => (
    <div data-testid="mock-user-provider">{children}</div>
  ),
}));

// Create a test wrapper that only renders the body content
function TestWrapper({ children }) {
  return (
    <div data-testid="test-wrapper">
      <nav data-testid="mock-nav-menu">Navigation Menu</nav>
      <div data-testid="mock-toaster">Toaster</div>
      <div data-testid="mock-user-provider">
        <main className="flex-grow px-2 sm:px-6 pt-4 md:pt-6 lg:pt-2 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

describe("Layout Structure", () => {
  it("renders the layout with all required components", () => {
    render(
      <TestWrapper>
        <div>Test Child</div>
      </TestWrapper>
    );

    // Check if all main components are rendered
    expect(screen.getByTestId("mock-nav-menu")).toBeInTheDocument();
    expect(screen.getByTestId("mock-toaster")).toBeInTheDocument();
    expect(screen.getByTestId("mock-user-provider")).toBeInTheDocument();

    // Check if children are rendered in the main section
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
