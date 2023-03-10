import React from 'react';
import '@testing-library/jest-dom'
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
import Products from './Products';
describe("Products component", () => {
  /*test("Component sends list of items added to cart", async () => {
    render(<Products />);

    const items = screen.getAllByRole('button', {name: /Add to cart/i});
    await act(async() => userEvent.click(items[0]));
    await act(async() => userEvent.click(items[1]));

    userEvent.
  });*/
});