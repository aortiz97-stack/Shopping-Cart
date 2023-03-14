import React from 'react';
import '@testing-library/jest-dom'
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RouteSwitch from "./RouteSwitch";
import { act } from 'react-dom/test-utils';

jest.mock("./components/App", () => () => (
    <h1>This is the app component</h1>
));

jest.mock("./components/Products", () => () => (
    <div>
        <button onClick={jest.fn()}></button>
        <button onClick={jest.fn()}></button>
        <button onClick={jest.fn()}></button>
        <button onClick={jest.fn()}></button>
        <button onClick={jest.fn()}></button>
        <button onClick={jest.fn()}></button>
        <h1>This is the products component</h1>
    </div>
));

describe("RouteSwitch component", () => {
    it("contains a navigation bar", () => {
      render(<RouteSwitch />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders route by default", () => {
      render(<RouteSwitch />)
      expect(screen.getByText("This is the app component")).toBeInTheDocument();
    });

    it("renders Products when products is clicked by user", async () => {  
        render(<RouteSwitch/>);
        const productLink = screen.getByRole("link", {name : /Products/i});

        await act(async () => userEvent.click(productLink));

        expect(screen.getByText(/This is the products component/)).toBeInTheDocument();
    });

    it("renders Home when Home is clicked by user", async() => {
        render(<RouteSwitch/>);
        const productLink = screen.getByRole("link", {name : /Products/i});
        const homeLink = screen.getByRole("link", {name: /Home/i});

        await act(async () => userEvent.click(productLink));

        await act(async () => userEvent.click(homeLink));

        expect(screen.getByText(/This is the app component/)).toBeInTheDocument();
    });

    it("renders ShoppingCart section when clicked by user", () => {
        render(<RouteSwitch/>);
        const shoppingImage = screen.getByRole("img", {name : /shopping cart icon/i});

        act(() => userEvent.click(shoppingImage));

        expect(screen.getByRole('button', {name: /x/i})).toBeInTheDocument();
    });
});