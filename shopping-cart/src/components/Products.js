
import seedWad from '../images/seedwad.png'
import soundSword from '../images/sound-sword.png';
import lemonCamel from '../images/lemoncamel.png';
import catchersMitt from '../images/catchersmitt.png';
import sleepingCap from '../images/sleeping-cap.png';
import harpSmasher from '../images/harp-smasher.png';
import { useEffect } from 'react';
const Products = ({count, setCount, cart, setCart}) => {


    useEffect(() => {
        const allButtons = Array.from(document.querySelectorAll('#products-container button'));
        const isInCart = (button) => {
          for (let i = 0; i < cart.length; i += 1) {
              const product = cart[i];
              if (button.id === product.name) return true;
          }
          return false;
        }

        const updateCounter = () => {
          setCount(count + 1);
        }

        allButtons.forEach((button) => {
            const handleClick = (e) => {
                setCart(cart.concat({name: e.target.id, cost: e.target.className}));
                updateCounter();
            };
            if (!isInCart(button)) button.addEventListener('click', handleClick);
            else console.log('the event listener is not added');
        });

        return (allButtons.forEach((button) => {
            const handleClick = (e) => {
                setCart(cart.concat({name: e.target.id, cost: e.target.className}));
                updateCounter();
            };
            button.removeEventListener('click', handleClick);
        }));
    }, [cart])

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
                          <button id="Seedwad" className={59.99}>Add to cart</button>
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
                          <button id="Sound_Sword" className={1200.32}>Add to cart</button>
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
                          <button id="Lemon_Camel" className={500.99}>Add to cart</button>
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
                          <button id="Catcher's_Mitt" className={55.32}>Add to cart</button>
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
                          <button id="Lemonsweet's_Cap" className={100237}>Add to cart</button>
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
                          <button id="Harp_Smasher" className={23.18}>Add to cart</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default Products;