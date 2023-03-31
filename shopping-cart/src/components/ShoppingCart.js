import { useState, useEffect, useRef } from "react";
import uniqid from 'uniqid';
import interact from 'interactjs';
import Checkout from './Checkout';

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

    const getTotal = () => {
        let total = 0;
        const itemInfoKeys = Object.keys(itemInfo);

        for (let i = 0; i < itemInfoKeys.length; i += 1) {
            const key = itemInfoKeys[i];
            total += (Number(itemInfo[key].cost) * Number(itemInfo[key].quantity));
        }
        return total;
    }
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
        if (e.target.className === 'in-cart-qty-input') {

            const newValue = Number(e.target.value);
            if (newValue <= 100 && newValue >= 0) {
                const id = e.target.id.split("-")[1];
                let quantity = 0;
                for (let i = 0; i < cartCopy.current.length; i += 1) {
                    if (cartCopy.current[i].name === id) {
                        quantity += 1
                    }
                }
    
                if (quantity > newValue) {
                    const numberOfItemsToRemove = quantity - newValue;
                    let numberOfElementsDeleted = 0;
    
                    for (let i = 0; i < cartCopy.current.length; i += 1) {
                        const element = cartCopy.current[i];
                        if (JSON.stringify(element) === JSON.stringify({name: id, cost: itemInfo[id].cost}) && numberOfElementsDeleted < numberOfItemsToRemove) {
                            cartCopy.current.splice(i, 1);
                            i -= 1;
                            countCopy.current -= 1;
                            setCount(countCopy.current);
                            numberOfElementsDeleted += 1;
                        }
                    }
                    setCart(cartCopy.current);
    
                } else if (quantity < newValue) {
                    const numberOfItemsToAdd = newValue - quantity;
    
                    for (let i = 0; i < numberOfItemsToAdd; i += 1) {
                        cartCopy.current.push({name: id, cost: itemInfo[id].cost});
                        countCopy.current += 1;
                        setCount(countCopy.current);
                    }
                    setCart(cartCopy.current);
                }
    
                resetItemInfo();
            } else {
                if (newValue < 0) {
                    alert("Your desired quantity is unacceptable! It's negative, I do not owe you, peasant!");
                    throw new Error("You cannot input a negative number for quantity.");
                }
                else if (newValue > 100) {
                    alert("Your desired quantity is unacceptable! No more than 100! I have not enough lemons for all!");
                    throw new Error("The quantity of your items is too much.");
                }
                alert("What's this rigamarole? Numbers only!!!");
            }
        }
    }

    const handleCheckout = (e) => {
        if (e.target.id === 'submit') {
            e.preventDefault();

            const wholeContainer = document.querySelector('#whole-container');
            const nav = document.querySelector('nav');
            const shoppingContainer = document.querySelector('#shopping-container');
            
            const homeContainer = document.querySelector("#app-container");
            const productsContainer = document.querySelector("#products-container");

            if (homeContainer !== null) {
                wholeContainer.removeChild(homeContainer);
            } else {
                wholeContainer.removeChild(productsContainer);
            }

            nav.style.display = "none";
            shoppingContainer.style.display =  "none";
        
            const checkOutContainer = document.querySelector('#checkout-container');
            checkOutContainer.style.display = "flex";
            
        }

    };

    const render = () => {
        let testID = 0;

        const JSX = (<div id='shopping-container' style={{visibility: visibility}}>
            <button id="exit-shopping-container">x</button>
            <h1>Your Cart</h1>
            <ul>
                {Object.keys(itemInfo).map((key) => {
                    testID += 1;

                    if (itemInfo[key].quantity !== 0) { 
                        return <li key={uniqid()} data-testid={`l${testID}`}>
                             <label htmlFor={`Shopping-${key}-select`}>Cart Qty 
                              <input id={`Shopping-${key}-select`} className={'in-cart-qty-input'} defaultValue={itemInfo[key].quantity} type='text' />
                          </label>
                            <div data-testid={`d${testID}`}>{`${itemInfo[key].name} x ${itemInfo[key].quantity} = $${(itemInfo[key].quantity * itemInfo[key].cost).toFixed(2).toLocaleString("en-US")}`}</div>
                            <button className='delete-button' id={key}>Delete</button>
                        </li>
                    }
                    return;
                })}
            </ul>
            <h3>{`Total: $${getTotal().toFixed(2)}`}</h3>
            <button type="submit" id="submit">Proceed to Checkout</button>
        </div>);

        return JSX;
    };

    
    useEffect(() => {
        resetItemInfo();
        const shoppingContainer = document.querySelector("#shopping-container");

        if (visibility === 'visible') {
            shoppingContainer.addEventListener('click', handleDeleteClick);
            shoppingContainer.addEventListener('change', handleSelectChange);
            shoppingContainer.addEventListener('click', handleCheckout);
        }
        if (visibility === 'hidden') {
            shoppingContainer.removeEventListener('click', handleDeleteClick);
            shoppingContainer.removeEventListener('change', handleSelectChange);
            shoppingContainer.removeEventListener('click', handleCheckout);
        }

    }, [visibility]);


    useEffect(() => {
        const wholeContainer = document.querySelector("#whole-container");
        const shopIcon = document.querySelector('#shopping-icon');
        const shopExitButton = document.querySelector("#exit-shopping-container");
       
        wholeContainer.addEventListener('click', handleExitClick);
        shopIcon.addEventListener('click', handleEnterClick);
        shopExitButton.addEventListener('click', handleExitClick);

        interact('#shopping-container').resizable({
    edges: { top: false, left: true, bottom: false, right: true },
    listeners: {
      move: function (event) {
        let { x } = event.target.dataset

        x = event.deltaRect.left

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          transform: `translate(${x}px)`
        })

        Object.assign(event.target.dataset, { x })
      }
    }
  })
      
    }, []);

    useEffect(() => {
        cartCopy.current = JSON.parse(JSON.stringify(cart));
        countCopy.current = count
    }, [cart, count])

    return (render())
}

export default ShoppingCart;