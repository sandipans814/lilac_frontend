import * as s from './Home.module.scss';
import {useSelector} from 'react-redux';
import { ProductCard } from '../commons/Product/ProductCard';
import { ProductPage } from '../commons/Product/ProductPage';
import { useAxios } from '../../axios-utils';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from "../Spinner/Spinner";
import spinner from "../Spinner/Spinner.module.scss";
import axios from 'axios';

export const Home = () => {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);

    const [renderData, setRenderData] = useState([]);
    const [renderDataAnon, setRenderDataAnon] = useState([]);

    const homeInst = useAxios("http://localhost:8080/api/products/home?size=4");
    
    const fetchData = async () => {
        try {
            const getData = await homeInst.get("", {withCredentials: true});
            setRenderData(getData.data.products);
            setLoading(false);  
        } catch (error) {
            toast.error("Some error occurred. Please try again later!");
        }
        
    }

    const fetchDataAnon = async () => {
        try {
            const getData = await axios.get("http://localhost:8080/api/products/sale?size=4", {withCredentials: true});
            setRenderDataAnon(getData.data.products);
            setLoading(false);  
        } catch (error) {
            toast.error("Some error occurred. Please try again later!");
        }  
    }

    useEffect(() => {
        if (user.id) {
            fetchData();
        } else {
            fetchDataAnon();
        }
    }, [user]);


    return (
        <>
        {
            loading ? 
            <div className={spinner.spinnerCenter}>
                <Spinner />
            </div>
            : 
                <> 
                    <div className={s.HomeWrapper}>
                        <div className={s.products}>
                        {
                            user.id ? renderData.map(e => (
                            <ProductCard data={e} />
                            )) : renderDataAnon.map(e => (
                            <ProductCard data={e} />
                            ))
                        }
                        </div>
                    </div>
                </>
        }
        </>
    );
}
