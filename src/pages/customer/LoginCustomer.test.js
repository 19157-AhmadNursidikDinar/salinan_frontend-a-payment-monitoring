import React from "react";
import { shallow } from "enzyme";
import LoginCustomer from "./LoginCustomer";
import TextField from "@material-ui/core/TextField";

describe("Login Customer", () => {
    const wrapper = shallow(<LoginCustomer />);
    it("should render Login Customer", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("should render two TextField", () => {
        expect(wrapper.find(TextField).length).toBe(2);
    });
});