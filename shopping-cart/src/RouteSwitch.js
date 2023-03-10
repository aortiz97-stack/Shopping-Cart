import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './RouteSwitch.css';
import App from './components/App';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import shopIcon from './images/shopping-cart.png';
import {useState} from 'react';
const RouteSwitch = () => {
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    return (
    <div id='whole-container'>
        <BrowserRouter>
            <nav role="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><button><Link to="/shopping-cart">
                        <div id='shopping-icon-container'>
                            <img src={shopIcon} alt="shopping cart icon"/>
                            <div id='counter-container'>
                                <div id='counter'>{count}</div>
                            </div>
                        </div>
                        </Link></button></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/products" element={<Products count={count} setCount={(e) => {setCount(e)}} cart={cart} setCart={(e)=> setCart(e)}/>}/>
                <Route path="/shopping-cart" element={<ShoppingCart />}/>
                
            </Routes>
        </BrowserRouter>
        
    </div>   
    );
};

export default RouteSwitch;