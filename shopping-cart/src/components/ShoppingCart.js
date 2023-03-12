import { useState, useEffect } from "react";
import App from './App';
import Products from './Products';
import RouteSwitch from '../RouteSwitch';

const ShoppingCart = ({count, setCount, cart, setCart, setCurrRoute, currRoute}) => {
    const [routeToRender, setRouteToRender] = useState(<App setCurrRoute={(e) => setCurrRoute(e)}/>);

    useEffect(() => {
        if (currRoute === "Products"){
            setRouteToRender(<Products count={count} setCount={e => setCount(e)} cart={cart} setCart={e=> setCart(e)} setCurrRoute={e => setCurrRoute(e)}/>);
        }
        const wholeContainer = document.querySelector("#whole-container");
        const shoppingContainer = document.querySelector('#shopping-container');
        const handleExitClick = (e) => {
            if (e.target.id !== "shopping-container" && e.target.id !== 'shopping-icon') {
                console.log(`hmm hmm hmm`);
                shoppingContainer.style.visibility = "hidden";
            }
        };

        const handleEnterClick = (e) => {
            console.log(`id ${e.target.id}`)
            if (e.target.id === 'shopping-icon') {
                console.log(`it passed`);
                shoppingContainer.style.visibility = "visible";
                console.log(`um what`);
            }
        };
        wholeContainer.addEventListener('click', handleExitClick);

        const shopIcon = document.querySelector('#shopping-icon');
        shopIcon.addEventListener('click', handleEnterClick);
        

    },
    [routeToRender]);

    return (
    <div id="prev-rendered-and-shopping-container">
        <div id='shopping-container'></div>
        {routeToRender}
    </div>)
}

export default ShoppingCart;