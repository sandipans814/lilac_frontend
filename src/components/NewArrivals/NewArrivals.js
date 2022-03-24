import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAxios } from "../../axios-utils";
import { ProductCard } from "../commons/Product/ProductCard";
import s from "./NewArrivals.module.scss";
import Spinner  from "../Spinner/Spinner";
import spinner from "../Spinner/Spinner.module.scss";
import Paginator from "../Paginator/Paginator";

export const NewArrivals = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user);

    const [totalPages, setTotalPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    const newIns = useAxios(`http://localhost:8080/api/products/`);


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
        const getData = await axios.get(`http://localhost:8080/api/products/new-arrivals?page=${currPage}&size=4`, {withCredentials: true});
        setData(getData.data.products);
        setLoading(false);
        } catch(e) {
            toast.error("Some error occurred. Please try again later.");
        }
    }

    async function authTemp() {
        try {
        const getData = await newIns.get(`/new-arrivals?page=${currPage}&size=4`, {withCredentials: true});
        setData(getData.data.products);
        setLoading(false);
        } catch(e) {
            toast.error("Some error occurred. Please try again later.");
        }
    }

    useEffect(() => {
        if (user.id) {
            authTemp();
        } else {
            temp();
        }
        
    }, [user, currPage])

    return <>
        <h1>New Arrivals</h1>
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