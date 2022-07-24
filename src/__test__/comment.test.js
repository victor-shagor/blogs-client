import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Comments from "../components/comments";
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
  shallow(<Comments comments={[]} id={"1234"} toggleModal={() => {}} />);
});

it("renders correctly", () => {
  const tree = shallow(
    <Comments comments={[]} id={"1234"} toggleModal={() => {}} />
  );
  expect(toJson(tree)).toMatchSnapshot();
});

it("", () => {
  act(() => {
    render(
      <Comments comments={[]} id={"1234"} toggleModal={() => {}} />,
      container
    );
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"<div class=\\"css-16ml5pn-MuiStack-root\\"></div>"`);
});
