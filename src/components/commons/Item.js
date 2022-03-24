import { useSelector } from "react-redux";
import { useAxios } from "../../axios-utils";
import { useEffect } from "react";
import { toast } from "react-toastify";

const indexRegEx = /_[0-9]+/;

export const Item = ({ item }) => {
    const { id, product } = item;
    const { id: productId, picUrls, name, price, quantity, category, type, discounted, discountPrice } = product;
    const user = useSelector(state => state.user);
    const rmInstance = useAxios(`http://localhost:8080/api/users/${user.id}/cart/${id}`);

    useEffect(() => {
        if (picUrls) {
            picUrls.sort((a, b) => {
                const val = parseInt(a.match(indexRegEx)[0].slice(1)) - parseInt(b.match(indexRegEx)[0].slice(1));
                if (val === 0) return 0;
                else if (val > 0) return 1;
                else return -1;
            });
        }
    }, [picUrls]);

    const removeFromCart = async () => {
        try {
            const res = await rmInstance.delete();
            toast.success(res.data);
        } catch(e) {
            toast.error("Some error occurred. Please try again later.");
        }
    };

    return (
        <div class="card mb-3" title={name}>
        <div class="row g-0">
            <div class="col-md-4">
            <img src={picUrls[0]} alt={name} width="100%"/>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{discounted ? price - discountPrice : price}</p>
                <br/>
                <button className="btn btn-warning btn-lg" onClick={removeFromCart}>Remove From Cart</button>
            </div>
            </div>
        </div>
        </div>
    );
}