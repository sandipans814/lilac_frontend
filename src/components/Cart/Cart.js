import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import spinner from "../Spinner/Spinner.module.scss";
import Spinner from "../Spinner/Spinner";
import { useAxios } from "../../axios-utils";
import { toast } from "react-toastify";
import { Item } from "../commons/Item";
import { useCookies } from "react-cookie";

export const Cart = () => {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems]= useState([]);
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const dispatch = useDispatch();

    const instance = useAxios(`http://localhost:8080/api/users/${user.id}/cart`);
    const orderInstance = useAxios(`http://localhost:8080/api/users/${user.id}/orders/`)

    useEffect(() => {
        async function temp () {
            try {
                const res = await instance.get();
                setCartItems(res.data.cartItems);
                setLoading(false);
            } catch (e) {
                if (e.response.status === 401) {
                    toast.error("Invalid token. Please login again.");
                    removeCookie('user');
                    dispatch({ type: "SIGN-OUT" });
                }
                toast.error("Some error occurred. Please try again later.");
            }
        }

        if (user.id) {
            console.log(user,"userId")
            temp();
        }
    }, [user, cartItems]);

    const placeOrder = async () => {
        try {
            setCartItems([]);
            const res = await orderInstance.post("", null, {withCredentials: true});
            toast.success(res.data);
        } catch (e) {
            /* Logout here if 401*/
            if (e.response.status === 400) {
                toast.error("Order cannot be placed when cart is empty!")
            } else if (e.response.status === 409) {
                toast.error("Some error occurred. Please try again later!")
            }
        }

    }

    return (
        <div>
            {
                !isLogged ? 
                <>
                    <h3>Please login to access your cart. </h3>
                    <Link className="btn btn-primary btn-lg" to="/login">Login</Link>
                </> :
                (loading ? 
                    <div className={spinner.spinnerCenter}>
                        <Spinner />
                    </div> :
                <> 
                <div className="d-flex flex-row justify-content-between">
                    <h1>Cart</h1>
                    <div>
                        <button className="btn btn-danger btn-lg" 
                        onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
                    {
                        cartItems.map(e => <Item item={e}/>)
                    }
                </>)
            }
        </div>
    )
}