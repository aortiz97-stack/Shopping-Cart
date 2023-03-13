import RouteSwitch from '../RouteSwitch';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe("Products component rerendered", () => {
    test("Component sends one quantity of each item correctly to cart", () => {
        render(<RouteSwitch/>);
        act(() => userEvent.click(screen.getByRole('link', {name: /Products/i})));
  
        const allButtons = screen.getAllByRole('button', {name: /Add to cart/i});
        const count = screen.getByText(0);
        act(() => userEvent.click(allButtons[0]));
        act(() => userEvent.click(allButtons[1]));
        act(() => userEvent.click(screen.getByTestId('shopping-icon')));
        act(() => userEvent.click(screen.getByRole('button', {name: /x/i})));
        act(() => userEvent.click(allButtons[0]));
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

        act(() => userEvent.click(screen.getByTestId('shopping-icon')));
        act(() => userEvent.click(screen.getByRole('button', {name: /x/i})));
        
        act(() => userEvent.selectOptions(allQuantities[1], '4'));
        act(() => userEvent.click(allButtons[1]));
  
        expect(Number(count.textContent)).toBe(10);
    });
  });

describe("ShoppingCart component", () => {
    it("receives information from the Products component", () => {
        render(<RouteSwitch />);
        act(() => userEvent.click(screen.getByRole('link', {name: /Products/i})));
        
        const allAddToCartButtons = screen.getAllByRole('button', {name: /Add to cart/i});
        act(() => userEvent.click(allAddToCartButtons[0]));

        act(() => userEvent.click(screen.getByTestId('shopping-icon')));


        expect(screen.getByTestId('l1').textContent).toBe('Seedwad x 1 = $59.99');
    });

    it("can receive information accurately even when it is closed and clicked back on", () => {
        render(<RouteSwitch />);
        act(() => userEvent.click(screen.getByRole('link', {name: /Products/i})));
        const allAddToCartButtons = screen.getAllByRole('button', {name: /Add to cart/i});
        act(() => userEvent.click(allAddToCartButtons[0]));
        act(() => userEvent.click(screen.getByTestId('shopping-icon')));
        act(() => userEvent.click(screen.getByRole("button", {name: /x/i})));

        const allQuantityAdjusters = screen.getAllByRole("combobox");
        act(() => userEvent.selectOptions(allQuantityAdjusters[1], ["2"]));
        act(() => userEvent.click(allAddToCartButtons[1]));
        act(() => userEvent.click(screen.getByTestId('shopping-icon')));
        act(() => userEvent.click(screen.getByRole("button", {name: /x/i})));

        act(() => userEvent.selectOptions(allQuantityAdjusters[2], ["3"]));
        act(() => userEvent.click(allAddToCartButtons[2]));
        act(() => userEvent.click(screen.getByTestId('shopping-icon')));

        expect(screen.getByTestId('l1').textContent).toBe('Seedwad x 1 = $59.99');
        expect(screen.getByTestId('l2').textContent).toBe('Sound Sword x 2 = $2400.64');
        expect(screen.getByTestId('l3').textContent).toBe('Lemon Camel x 3 = $1502.97');

    });
});