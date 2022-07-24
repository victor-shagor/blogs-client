import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Blog from "../components/blogs";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  shallow(<Blog blogs={[]} />);
});

it("renders correctly", () => {
  const tree = shallow(<Blog blogs={[]} />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("", () => {
  act(() => {
    render(<Blog blogs={[]} />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
});
