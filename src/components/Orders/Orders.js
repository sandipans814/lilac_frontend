import { useSelector, useDispatch } from "react-redux";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import {useState, useEffect} from "react";
import spinner from "../Spinner/Spinner.module.scss";
import Spinner from "../Spinner/Spinner";
import { useAxios } from "../../axios-utils";
import { toast } from "react-toastify";
import { Item } from "../commons/Item";
import { Order } from "./Order";
import { OrderDetails } from "./OrderDetails";
import { useCookies } from "react-cookie";

export const Orders = () => {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const dispatch = useDispatch();

    const {path, url} = useRouteMatch();

    const orderInstance = useAxios(`http://localhost:8080/api/users/${user.id}/orders`)

    useEffect(() => {
        async function temp () {
            try {
                const res = await orderInstance.get();
                setOrders(res.data.orders);
                setLoading(false);
            } catch (e) {
                if (e.response.status === 401) {
                    toast.error("Invalid token. Please login again.");
                    removeCookie('user');
                    dispatch({type: 'SIGN-OUT'});
                }
                toast.error("Some error occurred. Please try again later.");
            }
        }

        if (user.id) {
            temp();
        }
    }, [user, orders])

    return (
        <>
            {
                !isLogged ? 
                <>
                    <h3>Please login to access your orders. </h3>
                    <Link className="btn btn-primary btn-lg" to="/login">Login</Link>
                </> :
                (loading ? 
                    <div className={spinner.spinnerCenter}>
                        <Spinner />
                    </div> :
                <> 
                    <h1>Orders</h1>
                    {orders.map(e => <Order data={e} />)}
                </>)
            }

        <Switch>
            <Route path={`${path}/:id`}>
                <OrderDetails/>
            </Route>
            <Route path={path} >
                <h2>Click on View Details for all the order items.</h2>
            </Route>

        </Switch>
        </>
    )
}