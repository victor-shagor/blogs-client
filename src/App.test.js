import { shallow } from "enzyme";
import App from "./App";
import toJson from "enzyme-to-json";

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders correctly", () => {
  const tree = shallow(<App />);
  expect(toJson(tree)).toMatchSnapshot();
});
