import React from "react"; 
import { shallow } from "enzyme";
import {FormRequest} from "./IsiFormPayment";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from "@material-ui/pickers";

describe("Form Payment", () => {
    const wrapper = shallow(<FormRequest/>);

    it("should render Form Payment", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render six TextField", () => {
        expect(wrapper.find(TextField).length).toBe(6);

    });
    it("should render Button", () => {
        expect(wrapper.find(Button).length).toBe(1);

    });

    it("should render Datepicker", () => {
        expect(wrapper.find(KeyboardDatePicker).length).toBe(1);

    });
   

});
