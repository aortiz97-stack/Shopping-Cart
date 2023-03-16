
import seedWad from '../images/seedwad.png'
import soundSword from '../images/sound-sword.png';
import lemonCamel from '../images/lemoncamel.png';
import catchersMitt from '../images/catchersmitt.png';
import sleepingCap from '../images/sleeping-cap.png';
import harpSmasher from '../images/harp-smasher.png';
import { useEffect, useState, useRef } from 'react';

const Products = ({count, setCount, cart, setCart }) => {
    //const [newCart, setNewCart] = useState(cart);
    //const [newCount, setNewCount] = useState(count);

    const cartCopy = useRef(JSON.parse(JSON.stringify(cart)));
    const countCopy = useRef(count)

    const handleClick = (e) => {
        if (e.target.className.includes('add-to-cart')) {
            const qtySelector = document.querySelector(`#${e.target.id}-select`);
            //let cartCopy = JSON.parse(JSON.stringify(cart));
            //let countCopy = JSON.parse(JSON.stringify(count));
            for (let i = 0; i < Number(qtySelector.value); i += 1) {
                cartCopy.current = cartCopy.current.concat({name: e.target.id, cost: e.target.className});
                countCopy.current += 1;
            }

            setCount(countCopy.current);
            setCart(cartCopy.current);
            console.log(`cart ${JSON.stringify(cart)}`);
        }
    };
    useEffect(() => {
        cartCopy.current = JSON.parse(JSON.stringify(cart));
        countCopy.current = count
    }, [cart, count])
    useEffect(() => {
        const productContainer = document.querySelector('#products-container');
        
        
       
        productContainer.removeEventListener('click', handleClick);
        
       
        productContainer.addEventListener('click', handleClick);
    

        //return (allButtons.forEach((button) => {
            //button.removeEventListener('click', handleClick);
        //}));
    }, []);

    return(
      <div id='products-container'>
          <div id="grid-container">
              <div className="grid-cell">
                  <div className="image-container small">
                      <img src={seedWad} alt="Seedwad, a sentient pile of candy"/>
                  </div>
                  <div className="grid-cell-bottom">
                      <div className="description-container"><h2>Seedwad</h2></div>
                      <div className="price-container">
                          <h3>$59.99</h3>
                          <label htmlFor="Seedwad-select">Qty 
                              <select id="Seedwad-select" defaultValue={1}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                          <button id="Seedwad" className={'59.99 add-to-cart'}>Add to cart</button>
                      </div>
                      
                  </div>
              </div>
              <div className="grid-cell">
                  <div className="image-container small">
                      <img src={soundSword} alt="Lemongrab's weapon, the sound sword"/>
                  </div>
                  <div className="grid-cell-bottom">
                      <div className="description-container">
                          <h2>Sound Sword</h2>
                      </div>
                      <div className="price-container">
                          <h3>$1,200.32</h3>
                          <label htmlFor="Sound_Sword-select">Qty 
                              <select id="Sound_Sword-select" defaultValue={1}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                          <button id="Sound_Sword" className={'1200.32 add-to-cart'}>Add to cart</button>
                      </div>
                     
                  </div>
              </div>
              <div className="grid-cell">
                  <div className="image-container small">
                      <img src={lemonCamel} alt="Lemon Camel, Lemongrab's camel made out of lemon candy"/>
                  </div>
                  <div className="grid-cell-bottom">
                      <div className="description-container">
                          <h2>Lemon Camel</h2>
                      </div>
                      <div className="price-container">
                          <h3>$500.99</h3>
                          <label htmlFor="Lemon_Camel-select">Qty 
                              <select id="Lemon_Camel-select" defaultValue={1}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                          <button id="Lemon_Camel" className={'500.99 add-to-cart'}>Add to cart</button>
                      </div>
                  </div>
              </div>
              <div className="grid-cell">
                  <div className="image-container small">
                      <img src={catchersMitt} alt="A baseball catcher's mitt"/>
                  </div>
                  <div className="grid-cell-bottom">
                      <div className="description-container">
                          <h2>Catcher's Mitt</h2>
                      </div>
                      <div className="price-container">
                          <h3>$55.32</h3>
                          <label htmlFor="Catchers_Mitt-select">Qty 
                              <select id="Catchers_Mitt-select" defaultValue={1}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                          <button id="Catchers_Mitt" className={'55.32 add-to-cart'}>Add to cart</button>
                      </div>
                 
                  </div>
              </div>
              <div className="grid-cell">
                  <div className="image-container small">
                      <img src={sleepingCap} alt="A blue sleeping cap"/>
                  </div>
                  <div className="grid-cell-bottom">
                      <div className="description-container">
                          <h2>Lemonsweet's Cap</h2>
                      </div>
                      <div className="price-container">
                          <h3>$100,237</h3>
                          <label htmlFor="Lemonsweets_Cap-select">Qty
                              <select id="Lemonsweets_Cap-select" defaultValue={1}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                          <button id="Lemonsweets_Cap" className={'100237 add-to-cart'}>Add to cart</button>
                      </div>
                 
                  </div>
              </div>
              <div className="grid-cell">
                  <div className="image-container small">
                      <img src={harpSmasher} alt="Mallet used to smash harps"/>
                  </div>
                  <div className="grid-cell-bottom">
                      <div className="description-container">
                          <h2>Harp Smasher</h2>
                      </div>
                      <div className="price-container">
                          <h3>$23.18</h3>
                          <label htmlFor="Harp_Smasher-select">Qty 
                              <select id="Harp_Smasher-select" defaultValue={1}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                              </select>
                          </label>
                          <button id="Harp_Smasher" className={'23.18 add-to-cart'}>Add to cart</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default Products;