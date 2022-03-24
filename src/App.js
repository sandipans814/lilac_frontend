import './App.scss';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

import {
    BrowserRouter as Router
} from "react-router-dom";

import { Login } from './components/Login/Login';
import { NewArrivals } from './components/NewArrivals/NewArrivals';
import { Signup } from './components/Signup/Signup';
import { Men } from './components/Men/Men';
import { Women } from './components/Women/Women';
import { Admin } from './components/Admin/Admin';
import { Cart } from './components/Cart/Cart';
import { Orders } from './components/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchResults } from './components/Search/SearchResults';
import { Sale } from "./components/Sale/Sale";

function App() {
    const isLogged = useSelector(state => state.isLogged)
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cookie.user) {
            dispatch({ type: 'SET-USER', payload: cookie.user });
            dispatch({ type: 'SIGN-IN' });
        }
    }, []);
    return (
        <>
            <Router>
                <Navbar />
                <ToastContainer />
                <div className="container HomeWrapper">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/new-arrivals">
                            <NewArrivals />
                        </Route>
                        <Route path="/sale">
                            <Sale />
                        </Route>
                        <Route path="/login">
                            { isLogged ? <Redirect to="/" /> : <Login /> }
                        </Route>
                        <Route path="/signup">
                            { isLogged ? <Redirect to="/" /> : <Signup /> }
                        </Route>
                        <Route path="/admin">
                            <Admin />
                        </Route>
                        <Route path="/women">
                            <Women />
                        </Route>
                        <Route path="/men">
                            <Men />
                        </Route>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/orders">
                            <Orders />
                        </Route>
                        <Route path="/search-results">
                            <SearchResults />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
