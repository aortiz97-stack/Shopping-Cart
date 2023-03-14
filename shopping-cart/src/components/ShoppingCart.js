import { useState, useEffect } from "react";
import App from './App';
import Products from './Products';
//import RouteSwitch from '../RouteSwitch';
import uniqid from 'uniqid';

const ShoppingCart = ({count, setCount, cart, setCart, setCurrRoute, currRoute}) => {
    const [routeToRender, setRouteToRender] = useState(<App setCurrRoute={(e) => setCurrRoute(e)} />);
    const [itemInfo, setItemInfo] = useState({'Seedwad' : {name: 'Seedwad', cost: 59.99, quantity: 0},
                                    'Sound_Sword' : {name: 'Sound Sword', cost: 1200.32, quantity: 0},
                                    'Lemon_Camel' : {name: 'Lemon Camel', cost: 500.99, quantity: 0},
                                    'Catchers_Mitt': {name: "Catcher's Mitt", cost: 55.32, quantity: 0},
                                    'Lemonsweets_Cap': {name: "Lemonsweet's Cap", cost: 100237, quantity: 0},
                                    'Harp_Smasher': {name: "Harp Smasher", cost: 23.18, quantity: 0}});
    const [visibility, setVisibility] = useState("visible");

    const resetItemInfo = () => {
        if (visibility === 'visible') {
            const blankItemInfo = {'Seedwad' : {name: 'Seedwad', cost: 59.99, quantity: 0},
            'Sound_Sword' : {name: 'Sound Sword', cost: 1200.32, quantity: 0},
            'Lemon_Camel' : {name: 'Lemon Camel', cost: 500.99, quantity: 0},
            'Catchers_Mitt': {name: "Catcher's Mitt", cost: 55.32, quantity: 0},
            'Lemonsweets_Cap': {name: "Lemonsweet's Cap", cost: 100237, quantity: 0},
            'Harp_Smasher': {name: "Harp Smasher", cost: 23.18, quantity: 0}};
            const itemInfoCopy = JSON.parse(JSON.stringify(blankItemInfo));

            //console.log(`resetted cart ${JSON.stringify(cart)}`);
            for (let i = 0; i < cart.length; i += 1) {
                const cartItemObj = cart[i];
                const internalInfoCopy = JSON.parse(JSON.stringify(itemInfoCopy[cartItemObj.name]));
             
                internalInfoCopy.quantity = internalInfoCopy.quantity + 1;
                itemInfoCopy[cartItemObj.name] = internalInfoCopy; 
            }
            setItemInfo(itemInfoCopy);
        }
    };

    const handleExitClick = (e) => {
        if ((e.target.id !== "shopping-container" && e.target.id !== 'shopping-icon') || e.target.id === 'exit-shopping-container') {
            setVisibility("hidden");
            //shoppingContainer.style.visibility = "hidden";
        }
    };

    const handleEnterClick = (e) => {
        if (e.target.id === 'shopping-icon') {
            setVisibility("visible");
            //shoppingContainer.style.visibility = "visible";
            
        }
    };

    const renderProducts = () => {
        //console.log(`cart ${JSON.stringify(cart)}`);
        if (currRoute === "Products"){
            setRouteToRender(<Products count={count} setCount={(e) => {setCount(e)}} cart={cart} setCart={(e)=> setCart(e)} setCurrRoute={(e) => setCurrRoute(e)} />);
        }
    };
    
    useEffect(() => resetItemInfo(), [visibility]);
    useEffect(() => {
        renderProducts();
        const wholeContainer = document.querySelector("#whole-container");
        const shopIcon = document.querySelector('#shopping-icon');
        const shopExitButton = document.querySelector("#exit-shopping-container");
       
        wholeContainer.addEventListener('click', handleExitClick);
        shopIcon.addEventListener('click', handleEnterClick);
        shopExitButton.addEventListener('click', handleExitClick);
    }, [routeToRender]);

    let testID = 0;
    return (
    <div id="prev-rendered-and-shopping-container">
        <div id='shopping-container' style={{visibility: visibility}}>
            <button id="exit-shopping-container">x</button>
            <ul>
                {Object.keys(itemInfo).map((key) => {
                    testID += 1;

                    if (itemInfo[key].quantity !== 0) {
                        return <li key={uniqid()} data-testid={`l${testID}`}>{`${itemInfo[key].name} x ${itemInfo[key].quantity} = $${itemInfo[key].quantity * itemInfo[key].cost}`}</li>
                    }
                    return;
                })}
            </ul>
        </div>
    </div>)
}

export default ShoppingCart;