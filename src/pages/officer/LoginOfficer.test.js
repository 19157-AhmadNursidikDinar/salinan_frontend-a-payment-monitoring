import React from "react"; 
import { shallow } from "enzyme";
import LoginOfficer from "./LoginOfficer";
import TextField from "@material-ui/core/TextField";

describe("Login Officer". () => {
    const wrapper = shallow(<LoginOfficer/>);
    it("should render Login Officer". () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("should render two TextField". () => {
        expect(wrapper.find(TextField).length).toBe(3);
    });
})