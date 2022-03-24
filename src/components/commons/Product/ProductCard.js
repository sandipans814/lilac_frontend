import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../../axios-utils";

export const ProductCard = ({ data, admin }) => {
    const user = useSelector(state => state.user);
    const { id, picUrls, name, price, quantity, category, type, discounted, discountPrice } = data;
    const [hoverPic, setHoverPic] = useState(picUrls.find(e => e.endsWith("0.jpg")));
    const instance = useAxios(`http://localhost:8080/api/users/${user.id}/cart`);

    const categoryCon = category.replace("/", "-");

    const addToCart = async () => {
        try {
            const res = await instance.post("", {productId: id}, {withCredentials: true});
            toast.success("Successfully added to cart!");
        } catch (e) {
            if (e.response.status === 401)
                toast.error("Please login to add items to your cart.");
        }
    }

    return (
        <div className="card" 
            style={{'width': '18rem'}} 
            title={name} 
            onMouseEnter={() => setHoverPic(picUrls.find(e => e.endsWith("1.jpg")))}
            onMouseLeave={() => setHoverPic(picUrls.find(e => e.endsWith("0.jpg")))}
        >
        <img src={hoverPic} className="card-img-top" alt={name}/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
                € {discounted ? <>
                        <span style={{"textDecoration": "line-through"}}>{price}</span> ➡️ € {price - discountPrice}
                    </> : price}
                {quantity === 0 ? <span className="ms-1" style={{'color': 'red'}}>Out of Stock</span> : '' }
                <br/>
                <Link to={`${type === "M" ? "/men" : "/women"}/${categoryCon}`} className="btn btn-sm btn-outline-secondary me-2 mt-1">{categoryCon}</Link>
                <a className="btn btn-sm btn-outline-success me-2 mt-1" href={type === "M" ? "/men" : "/women"}>{type === "M" ? "Men" : "Women"}</a>
            </p>
            <Link to={`${type === "M" ? "/men" : "/women"}/${categoryCon}/${id}`} className="btn btn-outline-primary me-1">View</Link>
            {
                quantity === 0 ? 
                <button className="btn btn-outline-danger mx-1" disabled onClick={addToCart}>Add to Cart</button> :
                <button className="btn btn-outline-danger mx-1" onClick={addToCart}>Add to Cart</button>
            }
            {admin ? <button className="btn btn-outline-warning ms-1">Edit</button> : ''}
        </div>
        </div>
    );
}
