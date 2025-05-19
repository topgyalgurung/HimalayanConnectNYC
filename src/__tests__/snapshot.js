import { render } from "@testing-library/react";
import Home from "../app/page";
import { getResources } from "../app/actions/resources/getResources";

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

it("renders correctly", async () => {
  // Mock the resources data
  const mockResources = [
    { id: 1, title: "Resource 1" },
    { id: 2, title: "Resource 2" },
  ];
  getResources.mockResolvedValue(mockResources);

  const { container } = render(await Home());
  expect(container).toMatchSnapshot();
});
