import React from "react";
import { shallow } from "enzyme";
import AddBranch from "./AddBranch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

describe("Add Branch", () => {
    const wrapper = shallow(<AddBranch />);
    it("should render Add Branch", () =>{
        expect(wrapper).toMatchSnapshot();
    });
    it("should render TextField", () =>{
        expect(wrapper.find(TextField).length).toBe(1);
    });
})

describe("Test Button Add", () => {
    it("Test click event", () => {
        const mockCallBack = jest.fn();
        const button = shallow((<Button onClick={mockCallBack}>Success!</Button>));
        button.find("button").simulate("click");
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })
})