import { useState, useEffect } from "react";
import uniqid from 'uniqid';

const ShoppingCart = ({cart, setCart, count, setCount }) => {
    const [itemInfo, setItemInfo] = useState({'Seedwad' : {name: 'Seedwad', cost: 59.99, quantity: 0},
                                    'Sound_Sword' : {name: 'Sound Sword', cost: 1200.32, quantity: 0},
                                    'Lemon_Camel' : {name: 'Lemon Camel', cost: 500.99, quantity: 0},
                                    'Catchers_Mitt': {name: "Catcher's Mitt", cost: 55.32, quantity: 0},
                                    'Lemonsweets_Cap': {name: "Lemonsweet's Cap", cost: 100237, quantity: 0},
                                    'Harp_Smasher': {name: "Harp Smasher", cost: 23.18, quantity: 0}});
    const [visibility, setVisibility] = useState("hidden");

    let cartCopy = JSON.parse(JSON.stringify(cart));
    let countCopy = count;


    const resetItemInfo = () => {
        if (visibility === 'visible') {
            const blankItemInfo = {'Seedwad' : {name: 'Seedwad', cost: 59.99, quantity: 0},
            'Sound_Sword' : {name: 'Sound Sword', cost: 1200.32, quantity: 0},
            'Lemon_Camel' : {name: 'Lemon Camel', cost: 500.99, quantity: 0},
            'Catchers_Mitt': {name: "Catcher's Mitt", cost: 55.32, quantity: 0},
            'Lemonsweets_Cap': {name: "Lemonsweet's Cap", cost: 100237, quantity: 0},
            'Harp_Smasher': {name: "Harp Smasher", cost: 23.18, quantity: 0}};
            const itemInfoCopy = JSON.parse(JSON.stringify(blankItemInfo));

            for (let i = 0; i < cartCopy.length; i += 1) {
                const cartItemObj = cartCopy[i];
                const internalInfoCopy = JSON.parse(JSON.stringify(itemInfoCopy[cartItemObj.name]));
             
                internalInfoCopy.quantity = internalInfoCopy.quantity + 1;
                itemInfoCopy[cartItemObj.name] = internalInfoCopy; 
            }
            setItemInfo(itemInfoCopy);
            setCart(cartCopy);
            setCount(countCopy);
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
        //let newCount = count;
        if (e.target.className === 'delete-button') {
            //const cartCopy = JSON.parse(JSON.stringify(newCart));
            for (let i = 0; i < cartCopy.length; i += 1) {
                const cartItem = cartCopy[i];
                if (cartItem.name === e.target.id) {
                    cartCopy.splice(i, 1);
                    i = -1;
                    countCopy -= 1;
                    setCount(countCopy);
                   
                    //setNewCount(newCount);
                }
            }

            setCart(cartCopy);
          
            //console.log(`newCart ${JSON.stringify(newCart)}`);
            //console.log(`setted newCart ${JSON.stringify(cartCopy)}`);
            resetItemInfo();
            //setNewCart(cartCopy);
            //setVisibility("hidden");
            //setVisibility("visible");
        }
    };

    const render = () => {
        console.log(`finalCart ${JSON.stringify(cart)}`);
        let testID = 0;

        const JSX = (<div id='shopping-container' style={{visibility: visibility}}>
            <button id="exit-shopping-container">x</button>
            <ul>
                {Object.keys(itemInfo).map((key) => {
                    testID += 1;

                    if (itemInfo[key].quantity !== 0) { 
                        return <li key={uniqid()} data-testid={`l${testID}`}>
                            <div data-testid={`d${testID}`}>{`${itemInfo[key].name} x ${itemInfo[key].quantity} = $${itemInfo[key].quantity * itemInfo[key].cost}`}</div>
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
        console.log(`cart at the beginning ${JSON.stringify(cart)}`);
        resetItemInfo();
        const shoppingContainer = document.querySelector("#shopping-container");

        if (visibility === 'visible')  shoppingContainer.addEventListener('click', handleDeleteClick);
        //console.log(`finalizedCart ${JSON.stringify(finalizedCart)}`)
        //setCart(finalizedCart);
        //setCount(finalizedCount);
        if (visibility === 'hidden') shoppingContainer.removeEventListener('click', handleDeleteClick);

    }, [visibility]);

    //useEffect(()=>{setCart(newCart);
        //setCount(newCount);});


    useEffect(() => {
        const wholeContainer = document.querySelector("#whole-container");
        const shopIcon = document.querySelector('#shopping-icon');
        const shopExitButton = document.querySelector("#exit-shopping-container");
       
        wholeContainer.addEventListener('click', handleExitClick);
        shopIcon.addEventListener('click', handleEnterClick);
        shopExitButton.addEventListener('click', handleExitClick);
      
    }, []);

    return (render())
}

export default ShoppingCart;