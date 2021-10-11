import React from "react";
import { shallow } from "enzyme";

import AddUser from './AddUser'

describe("AddUser", () => {
    const wrapper = shallow(<AddUser />);
    it("should render AddUser ", () =>{
        expect(wrapper).toMatchSnapshot();
    });
    it("should render children inside of addUser", () =>{
        expect(wrapper.find('FormAddUser').length).toBe(1)
    });

})