import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import App from './components/App';
import '@testing-library/jest-dom'
import {render, screen, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RouteSwitch from "./RouteSwitch";
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { isContentEditable } from '@testing-library/user-event/dist/utils';

jest.mock("./components/App", () => () => (
    <h1>This is the app component</h1>
));

jest.mock("./components/Products", () => () => (
    <h1>This is the products component</h1>
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
        const history = createMemoryHistory();     
        render(<RouteSwitch history={history}/>);
        const productLink = screen.getByRole("link", {name : /Products/i});

        await act(async () => userEvent.click(productLink));

        expect(screen.getByText(/This is the products component/)).toBeInTheDocument();
    });
});