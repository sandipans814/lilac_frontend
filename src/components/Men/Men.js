import { useRouteMatch, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import axios from 'axios';
import spinner from "../Spinner/Spinner.module.scss";
import { CategoryPage } from "../CategoryPage/CategoryPage";
import { useParams } from "react-router-dom";
import { ProductPage } from "../commons/Product/ProductPage";
import { MenCardTile } from "./MenCardTiles";

export const Men = () => {
    // denim, shirts, sneakers, sweatshirts, trousers-shorts, tshirts-polos

    const { category, id } = useParams();
    const { path, url } = useRouteMatch();
    const [suits, setSuits] = useState([]);
    const [trousersShorts, setTrousersShorts] = useState([]);
    const [denim, setDenim] = useState([]);
    const [sweatShirts, setSweatShirts] = useState([]);
    const [shirts, setShirts] = useState([]);
    const [sneakers, setSneakers] = useState([]);
    const [tshirtPolos, setTshirtPolos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const temp = async () => {
            try {
                const getSuits = await axios.get('http://localhost:8080/api/products/?category=suits&size=4&type=M');
                setSuits(getSuits.data.products)
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
                const getTrousersShorts = await axios.get('http://localhost:8080/api/products/?category=trousers/shorts&size=4&type=M');
                setTrousersShorts(getTrousersShorts.data.products);
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
                const getDenim = await axios.get('http://localhost:8080/api/products/?category=denim&size=4&type=M');
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
                const getShirts = await axios.get('http://localhost:8080/api/products/?category=shirts&size=4&type=M');
                setShirts(getShirts.data.products);
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
                const getSweatShirts = await axios.get('http://localhost:8080/api/products/?category=sweatshirts&size=4&type=M');
                setSweatShirts(getSweatShirts.data.products);
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
                const getSneakers = await axios.get('http://localhost:8080/api/products/?category=sneakers&size=4&type=M');
                setSneakers(getSneakers.data.products);
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
                const getTshirtPolos = await axios.get('http://localhost:8080/api/products/?category=tshirts/polos&size=4&type=M');
                setTshirtPolos(getTshirtPolos.data.products);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        temp();
    }, []);

    console.log(path, url);

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
                        <CategoryPage type="M" />
                    </Route>
                    <Route exact path={`${path}`}>
                        <>
                            <MenCardTile url={url} category="suits" data={suits} title="Suits" />
                            <MenCardTile url={url} category="shirts" data={shirts} title="Shirts" />
                            <MenCardTile url={url} category="tshirts/polos" data={tshirtPolos} title="T-Shirts & Polos" />
                            <MenCardTile url={url} category="denim" data={denim} title="Denim" />
                            <MenCardTile url={url} category="sweatshirts" data={sweatShirts} title="Sweatshirts" />
                            <MenCardTile url={url} category="trousers/shorts" data={trousersShorts} title="Trousers & Shorts" />
                            <MenCardTile url={url} category="sneakers" data={sneakers} title="Sneakers" />
                        </>
                    </Route>
                </Switch>
            }
        </>
    )
};