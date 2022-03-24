import axios from 'axios';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import Spinner from "../../Spinner/Spinner";
import spinner from "../../Spinner/Spinner.module.scss";
import { useParams } from 'react-router-dom';
import { useAxios } from "../../../axios-utils";
import { toast } from "react-toastify";

const indexRegEx = /_[0-9]+/;

export const ProductPage = () => {
    const user = useSelector(state => state.user);
    const { category, id } = useParams();
    const [product, setProduct] = useState({});
    const [loading,setLoading] = useState(true);
    const instance = useAxios(`http://localhost:8080/api/users/${user.id}/cart`);
    
    useEffect(() => {
        async function temp () {
            try {
                const getProduct = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(getProduct.data);
                setLoading(false);

            } catch(e) {
                console.log(e);
            }
        }

        temp();
    }, []);

    const addToCart = async () => {
        try {
            const res = await instance.post("", {productId: id}, {withCredentials: true});
            toast.success("Successfully added to cart!");
        } catch (e) {
            if (e.response.status === 401)
                toast.error("Please login to add items to your cart.");
        }
    }

    useEffect(() => {
        if (product.picUrls) {
            product.picUrls.sort((a, b) => {
                const val = parseInt(a.match(indexRegEx)[0].slice(1)) - parseInt(b.match(indexRegEx)[0].slice(1));
                if (val === 0) return 0;
                else if (val > 0) return 1;
                else return -1;
            });
        }
    }, [product]);

    return (
        <>
        {
            loading ? 
            <div className={spinner.spinnerCenter}>
                <Spinner/>
            </div> : 
            <div className="row">
                <div className="col-sm-5">
                    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={product.picUrls[0]} className="d-block w-100" alt="..."/>
                        </div>
                        {product.picUrls.slice(1).map(e => (
                            <div key={e} className="carousel-item">
                                <img src={e} className="d-block w-100" alt="..."/>
                            </div>
                        ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-sm-7">
                    <h2>{product.name}</h2>
                    <p style={{'fontSize': '50px'}}>€ {product.discounted ? product.price - product.discountPrice : product.price}</p>
                    {product.quantity === 0 ? <h3 style={{'color': 'red'}}>Out of Stock</h3> : '' }
                    <a className="btn btn-outline-secondary me-2 mt-1" href="#">{product.category}</a>
                    <a className="btn btn-outline-success me-2 mt-1" href={product.type === "M" ? "/men" : "/women"}>{product.type === "M" ? "Men" : "Women"}</a>
                    <br/>
                    <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sunt deleniti accusantium. Cumque minima dolore asperiores at magnam, iusto nam animi nemo reprehenderit exercitationem magni a perferendis? Voluptates, debitis sint!</p>
                    <button className="btn btn-lg btn-danger mt-2" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        }
        </>
    );
}