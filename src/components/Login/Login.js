import s from './Login.module.scss';
import { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const handleSubmit = async () => {
        try {
            toast.success("Logging in")
            const data = await axios.post('http://localhost:8080/api/auth/signin', {
                email, password
            }, { withCredentials: true });

            dispatch({type:'SET-USER', payload: data.data});
            setCookie('user', data.data, {path: '/'})
            dispatch({type: 'SIGN-IN'});
        } catch (e) {
            console.log(e);
            toast.error("Invalid username or password");
        }
    };
    
    const handleEnterKey = (e) => {
        console.log("Enter Pressed")
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <>
        <h1>Login</h1>
        <br/>
        <form>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" onKeyUp={handleEnterKey} className="form-control" autoComplete="email" id="email" aria-describedby="emailHelp" value={email} onChange={({ target }) => {setEmail(target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onKeyUp={handleEnterKey} className="form-control" autoComplete="current-password" id="password" value={password} onChange={({ target }) => {setPassword(target.value)}} />
            </div>            
        </form>
        <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </>  
    );
};