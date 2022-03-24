import { useSelector } from "react-redux";
import { Link, Redirect, useRouteMatch, Switch, Route } from "react-router-dom";
import {Users} from './Users';
import {Products} from './Products';

import {Orders} from './Orders';
import { useState, useEffect } from "react";
import spinner from "../Spinner/Spinner.module.scss";
import Spinner from "../Spinner/Spinner";

export const Admin = () => {
    const user = useSelector(state => state.user);
    const isLogged = useSelector(state => state.isLogged);
    const [loading, setLoading] = useState(true);
    const {path, url} = useRouteMatch();

    console.log(path, url);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {
                !isLogged ?
                <>
                    <h3>Please login with an admin account for admin dashboard. </h3>
                    <Link className="btn btn-primary btn-lg" to="/login">Login</Link>
                </>
                :
                (loading ? 
                <div className={spinner.spinnerCenter}>
                    <Spinner />
                </div> :
                user.roles[0] !== 'ROLE_ADMIN' ? <h1>You're not authorized to access this page.</h1>
                : <>
                <div>
                    <h1>Admin</h1>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className={`nav-link`} to={`${url}/users`}>Users</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={`${url}/products`}>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`${url}/orders`}>Orders</Link>
                        </li>
                    </ul>

                </div>
                </>
                )
            }
            <Switch>
                <Route path={`${path}/users`}>
                    <Users user={user}/>
                </Route>
                <Route path={`${path}/products`}>
                    <Products />
                </Route>
                <Route path={`${path}/orders`}>
                    <Orders />
                </Route>
                <Route exact path={path}>
                </Route>
            </Switch>
        </>
    );
}