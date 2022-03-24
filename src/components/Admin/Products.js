import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";
import { useAxios } from "../../axios-utils";
import { ProductCard } from "../commons/Product/ProductCard";
import Paginator from "../Paginator/Paginator";
import s from "./Admin.module.scss";
import spinner from "../Spinner/Spinner.module.scss";
import Spinner from "../Spinner/Spinner";

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

export const Products = () => {
    const dataSize = 20;
    const [currPage, setCurrPage] = useState(0);
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState(category[0]);
    const [types, setTypes] = useState(type[0]);

    const prodIns = useAxios(`http://localhost:8080/api/products/?type=${types.value}&category=${categories.value}&page=${currPage}&size=${dataSize}`);

    const onTypeChange = (selected) => {
        setTypes(selected);
    }

    const onCategoryChange = (selected) => {
        setCategories(selected);
    }

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
            const res = await prodIns.get();
            setData(res.data.products);
            setTotalPages(res.data.totalPages);
            setLoading(false);
            toast.info(`${dataSize} items loaded.`)
        } catch (error) {
            toast.error("Some error occurred. Please try again later.")
        }
    }

    useEffect(() => {
        temp();
    }, [currPage]);

    const search = async () => {
        setCurrPage(0);
        setData([]);
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
    {
        loading ? 
        <div className={spinner.spinnerCenter}>
            <Spinner/>
        </div> : <>
        <br/>
        <div className={s.products}>
            {
            data.map(e => {
                return <ProductCard data={e} admin/>
            })}
        </div>
        <div className="mt-2 d-flex justify-content-center">
            <Paginator currPage={currPage} totalPages={totalPages} previousHandler={previousHandler} nextHandler={nextHandler} />
        </div>
        </>
    }
    </>
}
