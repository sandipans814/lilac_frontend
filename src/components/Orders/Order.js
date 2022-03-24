import { Item } from "../commons/Item";
import { OrderDetails } from "./OrderDetails";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useAxios } from "../../axios-utils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Order = ({ data }) => {
    const user = useSelector(state => state.user);
    const orderInstance = useAxios(`http://localhost:8080/api/users/${user.id}/orders/${data.id}/?action=cancel`);

    const {path, url} = useRouteMatch();

    const cancelOrder = async () => {
        try {
            const res = await orderInstance.get();
            toast.success(res.data);
        } catch (error) {
            toast.error("Some error occurred. Please try again later.")
        }
    }

    return (
        <>
        <div class="card text-dark bg-light mb-3">
        <div class="card-header">ORDER ID: {data.id}</div>
        <div class="card-body">
            <h5 class="card-title">Total Price: {data.totalPrice}</h5>
            <h4 class="card-text">{data.status}</h4>
            <Link className="btn btn-info" to={`${url}/${data.id}`}>View Details</Link>
            {
                (data.status === "PENDING" || data.status === "APPROVED") ? <button className='btn btn-danger mx-2' onClick={cancelOrder}>Cancel Order</button> : ''
            }
        </div>
        </div>
        </>
    )
}