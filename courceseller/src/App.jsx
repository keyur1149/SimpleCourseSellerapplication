import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import{Route,Routes,Navigate,BrowserRouter} from 'react-router-dom';
import Order from './component/Order';
import Payment from './component/Payment';
function App() {
    return ( <div className = "App" >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/orders" element={<Order/>}/>
                <Route path="/payment" element={<Payment/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;