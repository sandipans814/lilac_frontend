import s from "./Men.module.scss";
import { Link } from "react-router-dom";
import {ProductCard} from "../commons/Product/ProductCard";

export const MenCardTile = ({ url, data, title, category }) => {
    return <div>
        <div className={s.divHeader}>
            <h1 className="mt-4 mb-4">
                {title}
            </h1>
            <div>
                <Link to={`${url}/${category.replace("/","-")}`}>View All</Link>
            </div>
        </div>
        <div className={s.flexView}>
            {
                data.map(e => (
                    <ProductCard key={e.id} data={e} />
                ))
            }
        </div>
    </div>
};