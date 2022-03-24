import { useParams } from "react-router-dom";
import Spinner  from "../Spinner/Spinner";
import spinner from "../Spinner/Spinner.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./Search.module.scss";
import {ProductCard} from "../commons/Product/ProductCard";
import Paginator from "../Paginator/Paginator";
import { toast } from "react-toastify";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const category = [
    { value: "suits", label: "suits" },
    { value: "shirts", label: "shirts" },
    { value: "trousers-shorts", label: "trousers/shorts" },
    { value: "dresses", label: "dresses" },
    { value: "handbags", label: "handbags" },
    { value: "boots", label: "boots" },
    { value: "sneakers", label: "sneakers" },
    { value: "sweatshirts", label: "sweatshirts" },
    { value: "tshirts-polos", label: "tshirts/polos" },
    { value: "denim", label: "denim" }
];

const type = [{value:"M", label:"Men"},{value:"W", label:"Women"}];

const animComps = makeAnimated();

export const SearchResults = () => {
    // const categoryId = category.replace("-", "/");
    const [categories, setCategories] = useState(category[0]);
    const [types, setTypes] = useState(type[0]);

    console.log(categories, types);


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

    const onTypeChange = (selected) => {
        setTypes(selected);
    }

    const onCategoryChange = (selected) => {
        setCategories(selected);
    }

    async function temp () {
        try {
            const getProducts = await axios.get(`http://localhost:8080/api/products/?category=${categories.value.replace("-", "/")}&page=${currPage}&size=4&type=${types.value}`)
            setProducts(getProducts.data.products);
            setTotalPages(getProducts.data.totalPages);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        temp();  
    }, [currPage])

    const search = async () => {
        setCurrPage(0);
        setProducts([]);
        setTotalPages(0);
        setLoading(true);
        await temp();
    }

    return <>
        <div className="row">
            <div className="col-sm-4">
                <h5>Category</h5>
                <Select
                components={animComps}
                onChange={onCategoryChange}
                defaultValue={category[0]}
                options={category}
                />
            </div>
            <div className="col-sm-4">
                <h5>Type</h5>
                <Select
                components={animComps}
                onChange={onTypeChange}
                defaultValue={type[0]}
                options={type}
                />
            </div>
        </div>
        <button className="btn btn-success my-3" onClick={search}>Search</button>
        <br/>
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