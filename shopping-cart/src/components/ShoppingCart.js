import { useState, useEffect } from "react";
import App from './App';
import Products from './Products';
import RouteSwitch from '../RouteSwitch';

const ShoppingCart = ({count, setCount, cart, setCart, setCurrRoute, currRoute}) => {
    const [routeToRender, setRouteToRender] = useState(<App setCurrRoute={(e) => setCurrRoute(e)}/>);

    useEffect(() => {
        if (currRoute === "Products") setRouteToRender(<Products count={count} setCount={e => setCount(e)} cart={cart} setCart={e=> setCart(e)} setCurrRoute={e => setCurrRoute(e)}/>);
    },
    []);

    return (
    <div>
        {routeToRender}
        <h1>Hi</h1>

    </div>)
}

export default ShoppingCart;