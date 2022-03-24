import axios from 'axios';
import { useSelector } from "react-redux";

export const useAxios = ( url ) => {
    const user = useSelector(state => state.user);
    const instance = axios.create({
        baseURL: url,
        headers: {
           Authorization: `Bearer ${user.accessToken}` 
        }
    });

    return instance;
}