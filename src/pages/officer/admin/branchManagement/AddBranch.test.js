import React from "react";
import {shallow} from "enzyme";
import {FormAddBranch} from "./AddBranch";
import TextField from "@material-ui/core/TextField";

describe("Add Branch", () => {
    const wrapper = shallow(<FormAddBranch />);

    it("should render Add Branch", () =>{
        expect(wrapper).toMatchSnapshot();
    });
    it("should render TextField", () =>{
        expect(wrapper.find(TextField).length).toBe(1);
    });
})

