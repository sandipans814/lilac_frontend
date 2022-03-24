import { useParams } from "react-router-dom";
import { ProductCard } from "../commons/Product/ProductCard";
import { useState, useEffect } from "react";
import Spinner  from "../Spinner/Spinner";
import s from "./CategoryPage.module.scss";
import spinner from "../Spinner/Spinner.module.scss";
import axios from 'axios';
import Paginator from '../Paginator/Paginator'

export const CategoryPage = ({ type }) => {
    const { category } = useParams();
    const categoryId = category.replace("-", "/");


    const [totalPages, setTotalPages] = useState(0);
    const [loading,setLoading] = useState(true);
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
    
    useEffect(() => {
        async function temp () {
            try {
                const getProducts = await axios.get(`http://localhost:8080/api/products/?category=${categoryId}&page=${currPage}&size=4&type=${type}`)
                setProducts(getProducts.data.products);
                setTotalPages(getProducts.data.totalPages);
                setLoading(false);
            } catch(e) {
                console.log(e);
            }
        }

        temp();
       
    }, [currPage])

    return <>
        {loading ? 
            <div className={spinner.spinnerCenter}>
                <Spinner/>
            </div> :
            <>
                <div className={s.products}>
                    { 
                    products.map(e => (
                        <ProductCard data={e} />
                    ))
                    }
                </div>
                <div className="mt-2 d-flex justify-content-center">
                    <Paginator currPage={currPage} totalPages={totalPages} previousHandler={previousHandler} nextHandler={nextHandler} />
                </div>
                
            </>
        }
    </>
}

