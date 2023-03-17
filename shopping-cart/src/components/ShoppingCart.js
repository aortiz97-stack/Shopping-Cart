import { useState, useEffect, useRef } from "react";
import uniqid from 'uniqid';

const ShoppingCart = ({cart, setCart, count, setCount }) => {
    const [itemInfo, setItemInfo] = useState({'Seedwad' : {name: 'Seedwad', cost: 59.99, quantity: 0},
                                    'Sound_Sword' : {name: 'Sound Sword', cost: 1200.32, quantity: 0},
                                    'Lemon_Camel' : {name: 'Lemon Camel', cost: 500.99, quantity: 0},
                                    'Catchers_Mitt': {name: "Catcher's Mitt", cost: 55.32, quantity: 0},
                                    'Lemonsweets_Cap': {name: "Lemonsweet's Cap", cost: 100237, quantity: 0},
                                    'Harp_Smasher': {name: "Harp Smasher", cost: 23.18, quantity: 0}});
    const [visibility, setVisibility] = useState("hidden");

    const cartCopy = useRef(JSON.parse(JSON.stringify(cart)));
    const countCopy = useRef(count);


    const resetItemInfo = () => {
        if (visibility === 'visible') {
            const blankItemInfo = {'Seedwad' : {name: 'Seedwad', cost: 59.99, quantity: 0},
            'Sound_Sword' : {name: 'Sound Sword', cost: 1200.32, quantity: 0},
            'Lemon_Camel' : {name: 'Lemon Camel', cost: 500.99, quantity: 0},
            'Catchers_Mitt': {name: "Catcher's Mitt", cost: 55.32, quantity: 0},
            'Lemonsweets_Cap': {name: "Lemonsweet's Cap", cost: 100237, quantity: 0},
            'Harp_Smasher': {name: "Harp Smasher", cost: 23.18, quantity: 0}};
            const itemInfoCopy = JSON.parse(JSON.stringify(blankItemInfo));

            for (let i = 0; i < cartCopy.current.length; i += 1) {
                const cartItemObj = cartCopy.current[i];
                const internalInfoCopy = JSON.parse(JSON.stringify(itemInfoCopy[cartItemObj.name]));
             
                internalInfoCopy.quantity = internalInfoCopy.quantity + 1;
                itemInfoCopy[cartItemObj.name] = internalInfoCopy; 
            }
            setItemInfo(itemInfoCopy);
        }
    };

    const handleExitClick = (e) => {
        const shoppingContainer = document.querySelector("#shopping-container");
        if (e.target.id === 'exit-shopping-container') {
            setVisibility("hidden");
        } else if (!Array.from(shoppingContainer.querySelectorAll('*')).includes(e.target) && e.target.id !== "shopping-container" && e.target.id !== "shopping-icon" && e.target.className !== "delete-button") {
            setVisibility("hidden");
        }
    };

    const handleEnterClick = (e) => {
        if (e.target.id === 'shopping-icon') {
            setVisibility("visible");
        }
    };


    const handleDeleteClick = (e) => {
        if (e.target.className === 'delete-button') {
            for (let i = 0; i < cartCopy.current.length; i += 1) {
                const cartItem = cartCopy.current[i];
                if (cartItem.name === e.target.id) {
                    cartCopy.current.splice(i, 1);
                    i = -1;
                    countCopy.current -= 1;
                    setCount(countCopy.current);
                }
            }

            setCart(cartCopy.current);
            resetItemInfo();
        }
    };

    const handleSelectChange = (e) => {
        if (e.target.className === 'in-cart-qty-selector') {
            const newValue = e.target.value;
            console.log(`e.target.id ${e.target.id.split("-")}`)
            const id = e.target.id.split("-")[1];

            if (itemInfo[id].quantity < newValue) {
                const numberOfItemsToRemove = itemInfo[id].quantity - newValue;
                let numberOfElementsDeleted = 0;

                for (let i = 0; i < cartCopy.current.length; i += 1) {
                    const element = cartCopy.current[i];
                    if (JSON.stringify(element) === {name: id, cost: itemInfo[id].cost} && numberOfElementsDeleted < numberOfItemsToRemove) {
                        cartCopy.current.splice(i, 1);
                        i -= 1;
                        countCopy.current -= 1;
                        setCount(countCopy.current);
                        numberOfElementsDeleted += 1;
                    }
                }
                setCart(cartCopy.current);

            } else if (itemInfo[id].quantity > newValue) {
                const numberOfItemsToAdd = newValue - itemInfo[id].quantity;

                for (let i = 0; i < numberOfItemsToAdd; i += 1) {
                    cartCopy.current.push({name: id, cost: itemInfo[id].cost});
                    countCopy.current += 1;
                    setCount(countCopy.current);
                }
                setCart(cartCopy.current);
            }

            resetItemInfo();
        }
    }

    const render = () => {
        let testID = 0;

        const JSX = (<div id='shopping-container' style={{visibility: visibility}}>
            <button id="exit-shopping-container">x</button>
            <ul>
                {Object.keys(itemInfo).map((key) => {
                    testID += 1;

                    if (itemInfo[key].quantity !== 0) { 
                        return <li key={uniqid()} data-testid={`l${testID}`}>
                            <div data-testid={`d${testID}`}>{`${itemInfo[key].name} x ${itemInfo[key].quantity} = $${itemInfo[key].quantity * itemInfo[key].cost}`}</div>
                            <label htmlFor={`Shopping-${key}-select`}>Cart Qty 
                              <select id={`Shopping-${key}-select`} className={'in-cart-qty-selector'} defaultValue={itemInfo[key].quantity}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                            <button className='delete-button' id={key}>Delete</button>
                        </li>
                    }
                    return;
                })}
            </ul>
        </div>);

        return JSX;
    };

    
    useEffect(() => {
        resetItemInfo();
        const shoppingContainer = document.querySelector("#shopping-container");

        if (visibility === 'visible') {
            shoppingContainer.addEventListener('click', handleDeleteClick);
            shoppingContainer.addEventListener('change', handleSelectChange);
        }
        if (visibility === 'hidden') {
            shoppingContainer.removeEventListener('click', handleDeleteClick);
            shoppingContainer.removeEventListener('change', handleSelectChange);
        }

    }, [visibility]);


    useEffect(() => {
        const wholeContainer = document.querySelector("#whole-container");
        const shopIcon = document.querySelector('#shopping-icon');
        const shopExitButton = document.querySelector("#exit-shopping-container");
       
        wholeContainer.addEventListener('click', handleExitClick);
        shopIcon.addEventListener('click', handleEnterClick);
        shopExitButton.addEventListener('click', handleExitClick);
      
    }, []);

    useEffect(() => {
        cartCopy.current = JSON.parse(JSON.stringify(cart));
        countCopy.current = count
    }, [cart, count])

    return (render())
}

export default ShoppingCart;