import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
//import '@testing-library/jest-dom'
import App from './components/App';
import Products from './components/Products';
const RouteSwitch = () => {
    return (
    <div>
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
                <Route path="/shopping-cart" element={<App />}/>
                
            </Routes>
        </BrowserRouter>
        
    </div>   
    );
};

export default RouteSwitch;