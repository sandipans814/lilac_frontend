import { useRouteMatch, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import axios from 'axios';
import spinner from "../Spinner/Spinner.module.scss";
import { CategoryPage } from "../CategoryPage/CategoryPage";
import { useParams } from "react-router-dom";
import { ProductPage } from "../commons/Product/ProductPage";
import { WomenCardTile } from "./WomenCardTiles";

export const Women = () => {

    const { path, url } = useRouteMatch();
    const [dresses, setDresses] = useState([]);
    const [handbags, setHandbags] = useState([]);
    const [sneakers, setSneakers] = useState([]);
    const [boots, setBoots] = useState([]);
    const [denim, setDenim] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const temp = async () => {
            try {
                const getDresses = await axios.get('http://localhost:8080/api/products/?category=dresses&size=4&type=W');
                setDresses(getDresses.data.products);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        temp();
    }, []);

    useEffect(() => {
        const temp = async () => {
            try {
                const getHandbags = await axios.get('http://localhost:8080/api/products/?category=handbags&size=4&type=W');
                setHandbags(getHandbags.data.products);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        temp();
    }, []);

    useEffect(() => {
        const temp = async () => {
            try {
                const getDenim = await axios.get('http://localhost:8080/api/products/?category=denim&size=4&type=W');
                setDenim(getDenim.data.products);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        temp();
    }, []);

    useEffect(() => {
        const temp = async () => {
            try {
                const getBoots = await axios.get('http://localhost:8080/api/products/?category=boots&size=4&type=W');
                setBoots(getBoots.data.products);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        temp();
    }, []);

    useEffect(() => {
        const temp = async () => {
            try {
                const getSneakers = await axios.get('http://localhost:8080/api/products/?category=sneakers&size=4&type=W');
                setSneakers(getSneakers.data.products);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        temp();
    }, []);

    return (
        <>
            {loading ?
                <div className={spinner.spinnerCenter}>
                    <Spinner />
                </div> :
                <Switch>
                    <Route path={`${path}/:category/:id`}>
                        <ProductPage />
                    </Route>
                    <Route path={`${path}/:category`}>
                        <CategoryPage type="W"/>
                    </Route>
                    <Route path={`${path}`}>
                        <>
                            <WomenCardTile url={url} category="dresses" data={dresses} title="Dresses" />
                            <WomenCardTile url={url} category="denim" data={denim} title="Denim" />
                            <WomenCardTile url={url} category="handbags" data={handbags} title="Handbags" />
                            <WomenCardTile url={url} category="boots" data={boots} title="Boots" />
                            <WomenCardTile url={url} category="sneakers" data={sneakers} title="Sneakers" />
                        </>
                    </Route>
                </Switch>
            }
        </>
    )
};