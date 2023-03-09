import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './RouteSwitch.css';
import App from './components/App';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
const RouteSwitch = () => {
    return (
    <div id='whole-container'>
        <BrowserRouter>
            <nav role="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><button><Link to="/shopping-cart">Shopping Cart</Link></button></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/shopping-cart" element={<ShoppingCart />}/>
                
            </Routes>
        </BrowserRouter>
        
    </div>   
    );
};

export default RouteSwitch;