import RouteSwitch from '../RouteSwitch';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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

        expect(screen.getByTestId('l1').textContent).toBe('Seedwad x 1 = $59.99');
        expect(screen.getByTestId('l2').textContent).toBe('Sound Sword x 2 = $2400.64');


    });
});