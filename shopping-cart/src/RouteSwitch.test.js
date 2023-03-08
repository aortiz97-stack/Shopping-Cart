import React from 'react';
import '@testing-library/jest-dom'
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RouteSwitch from "./RouteSwitch";
import { App } from './components/App';
import { MemoryRouter } from 'react-router-dom';

jest.mock("./components/App", () => () => (
    <h1>This is the app component</h1>
));

describe("RouteSwitch component", () => {
    it("contains a navigation bar", () => {
      render(<RouteSwitch />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("contains route to App by default", () => {
      render(<RouteSwitch />)
      expect(screen.getByText("This is the app component")).toBeInTheDocument();
    });
});