import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../../axios-utils";
import { Item } from "../commons/Item";
import { toast } from "react-toastify";

export const OrderDetails = () => {
    const { id } = useParams();
    const user = useSelector(state => state.user);
    const orderInstance = useAxios(`http://localhost:8080/api/users/${user.id}/orders/${id}`);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        async function temp() {
            try {
                const res = await orderInstance.get();
                console.log(res);
                setOrderItems(res.data.orderItems);
            } catch (error) {
                toast.error("Some error occurred. Please try again.")
            }
        }

        if (user.id) {
            temp();
        }
    }, [user, id]);

    return orderItems.map(e => <Item item={e} />);
}