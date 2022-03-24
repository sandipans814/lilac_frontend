import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("M");

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async () => {
        try {
        const data = await axios.post("http://localhost:8080/api/auth/signup", {
            firstName, lastName, email, password, gender
        }, {withCredentials: true});
        
        if (data.status === 200) {
            setRedirect(true);
        }
        } catch(e) {
            console.log(e);
        }
    };

    return <>
        {redirect ? <Redirect to="/"/> : ''}
        <h1>Signup</h1>
        <br/>
        <form>
            <div className="mb-3">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" value={firstName} onChange={({ target }) => setFirstName( target.value )}/>
            </div>
            <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" value={lastName} onChange={({ target }) => setLastName( target.value )}/>
            </div>
            <div className="mb-3">
            <label htmlFor="gender">Gender</label>
                <select className="form-select" aria-label="Default select example" value={gender} onChange={({ target }) => setGender( target.value )}>
                    <option value="M">Male</option>
                    <option value="W">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email Address</label>
                <input type="text" className="form-control" value={email} onChange={({ target }) => setEmail( target.value )}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" value={password} onChange={({ target }) => setPassword( target.value )}/>
            </div>
        </form>
        <button className="btn btn-success" onClick={handleSubmit}>Signup</button>
    </>

}