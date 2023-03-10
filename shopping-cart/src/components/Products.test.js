import React from 'react';
import '@testing-library/jest-dom'
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
import Products from './Products';
import RouteSwitch from '../RouteSwitch';

describe("Products component", () => {
  test("Component sends one quantity of each item correctly to cart", () => {
      render(<RouteSwitch/>);
      act(() => userEvent.click(screen.getByRole('link', {name: /Products/i})));

      const allButtons = screen.getAllByRole('button', {name: /Add to cart/i});
      const count = screen.getByText(0);
      act(() => userEvent.click(allButtons[0]));
      act(() => userEvent.click(allButtons[0]));
      act(() => userEvent.click(allButtons[1]));
      expect(Number(count.textContent)).toBe(3);

  });

  test("Component adds multiple quantities of an item to cart", () => {
      render(<RouteSwitch />);
      act(() => userEvent.click(screen.getByRole('link', {name: /Products/i})));
      const allButtons = screen.getAllByRole('button', {name: /Add to cart/i});
      const allQuantities = screen.getAllByRole('combobox');
      const count = screen.getByText(0);

      act(() => userEvent.selectOptions(allQuantities[0], '1'));
      act(() => userEvent.click(allButtons[0]));
      act(() => userEvent.selectOptions(allQuantities[1], '5'));
      act(() => userEvent.click(allButtons[1]));
      act(() => userEvent.selectOptions(allQuantities[1], '4'));
      act(() => userEvent.click(allButtons[1]));

      expect(Number(count.textContent)).toBe(10);
  });
});