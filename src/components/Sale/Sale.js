import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductCard } from "../commons/Product/ProductCard";
import s from "./Sale.module.scss";
import { useAxios } from "../../axios-utils";
import { useSelector } from "react-redux";
import Spinner  from "../Spinner/Spinner";
import spinner from "../Spinner/Spinner.module.scss";
import Paginator from "../Paginator/Paginator";

export const Sale = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user);
    const saleIns = useAxios("http://localhost:8080/api/products/");

    const [totalPages, setTotalPages] = useState(0);
    const [products,setProducts] = useState([]);
    const [currPage, setCurrPage] = useState(0);

    const previousHandler=()=>{
        setLoading(true)
        setCurrPage(currPage-1)
    }
    const nextHandler= ()=>{
        setLoading(true)
        setCurrPage(currPage+1)
    }
    
    async function temp() {
        try {
        const getData = await axios.get(`http://localhost:8080/api/products/sale?page=${currPage}&size=4`, {withCredentials: true});
        setData(getData.data.products);
        setLoading(false);
        } catch(e) {
            toast.error("Some error occurred. Please try again later.");
        }
    }

    async function authTemp() {
        try {
            const getData = await saleIns.get(`/sale?page=${currPage}&size=4`,{withCredentials: true});
            setData(getData.data.products);
            setLoading(false);
            } catch(e) {
                toast.error("Some error occurred. Please try again later.");
            }
    }

    useEffect(() => {
        if (user.id)
            authTemp();
        else
            temp();
    }, [user, currPage])

    return <>
        <h1>SALE!</h1>
        {
            loading ? 
            <div className={spinner.spinnerCenter}>
                <Spinner/>
            </div> :
            <> 
            <div className={s.products}>
                {data.map(e => <ProductCard data={e} />)}
            </div>
            <div className="mt-2 d-flex justify-content-center">
                    <Paginator currPage={currPage} totalPages={totalPages} previousHandler={previousHandler} nextHandler={nextHandler} />
            </div>
            </>
        }
    </>
}
