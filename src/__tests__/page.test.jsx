import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import { getResources } from "../app/actions/resources/getResources";

// main app page test

// Mock the getResources function
jest.mock("../app/actions/resources/getResources", () => ({
  getResources: jest.fn(),
}));

// Mock the HomeClient component
jest.mock("../app/(homepage)/HomeClient", () => {
  return function MockHomeClient({ initialResources }) {
    return (
      <div>
        <h1>Home</h1>
        <div>Resources: {initialResources.length}</div>
      </div>
    );
  };
});

describe("Home Page", () => {
  it("renders the home page with resources", async () => {
    // Mock the resources data
    const mockResources = [
      { id: 1, title: "Resource 1" },
      { id: 2, title: "Resource 2" },
    ];
    getResources.mockResolvedValue(mockResources);

    // Render the component
    render(await Home());

    // Check if the heading is present
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();

    // Check if resources count is displayed
    expect(screen.getByText("Resources: 2")).toBeInTheDocument();
  });
});
