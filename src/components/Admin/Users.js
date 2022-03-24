import { useState } from "react";
import { useEffect } from "react";
import { useAxios } from "../../axios-utils";
import spinner from "../Spinner/Spinner.module.scss";
import Spinner from "../Spinner/Spinner";
import { UsersCard } from "./UsersCard";
import { user } from "../../reducers/auth/user";

export const Users = ({ user }) => {
    const instance = useAxios("http://localhost:8080/api/users?size=10");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function temp () {
            try {
                const getUsers = await instance.get();
                setUsers(getUsers.data.users);
                setLoading(false);

            } catch (e) {
                console.log(e);
            }
        }
        if (user.id) {
            temp();
        }
    }, [user, users]);

    return (
        <>
        {
            loading ?
            <div className={spinner.spinnerCenter}>
                <Spinner />
            </div> : 
            users.map(e => <UsersCard data={e} />)
        }
        </>
    )
}