import { useSelector, useDispatch } from 'react-redux';
import s from './Navbar.module.scss';
import { useCookies } from 'react-cookie';
import { useState } from "react";
import {
    NavLink, Redirect, Link, useLocation
} from "react-router-dom";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';

const category = [
    { value: "suits", label: "suits" },
    { value: "shirts", label: "shirts" },
    { value: "trousers-shorts", label: "trousers/shorts" },
    { value: "dresses", label: "dresses" },
    { value: "handbags", label: "handbags" },
    { value: "boots", label: "boots" },
    { value: "sneakers", label: "sneakers" },
    { value: "sweatshirts", label: "sweatshirts" },
    { value: "tshirts-polos", label: "tshirts/polos" },
    { value: "denim", label: "denim" }
];

const type = [{value:"M", label:"Men"},{value:"W", label:"Women"}];

const animComps = makeAnimated();

export const Navbar = () => {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const [cookie, setCookie, removeCookie] = useCookies(['user']);

    const logout = () => {
        removeCookie('user');
        dispatch({ type: "SIGN-OUT" });
    }
    return (
        <>
        <nav className={`navbar sticky-top navbar-expand-lg navbar-dark ${s.bgBlue}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/lilac.png" alt="" height="40" />
                </a>
                <button className={`navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={`navbar-toggler-icon ${s.navbarToggler}`}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" exact>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/new-arrivals">New Arrivals</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/men">Men</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/women">Women</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/sale">SALE!</NavLink>
                        </li>
                    </ul>
                    {!isLogged ? <>
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                            <li className="nav-item">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signup">Register</NavLink>
                            </li>
                        </ul>
                    </> :
                        <>
                            <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                                <li className="nav-item">
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                {
                                    cookie.user.roles[0] === 'ROLE_ADMIN' ? 
                                    <li className="nav-item">
                                        <NavLink to="/admin">Admin</NavLink>
                                    </li> : ''
                                }
                                <li className="nav-item">
                                    <NavLink to="/cart">Cart</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/orders">Orders</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className={s.navLink} href="/" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        </>}
                        <Link to="/search-results" className="btn btn-success">Search</Link>
                </div>
            </div>
        </nav>
    </>
    );
}
