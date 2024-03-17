import { useState } from "react";
import postForm from "./postForm";
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login({ loggedIn, updateRootLoginStatus }) {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(loggedIn);
    const [loginErrMsg, setLoginErrMsg] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(loginStatus);
        const res = await postForm(formData, 'http://localhost:3300/login');
        const data = await res.json();
        console.log(data.authRes);
        if (await data.authRes) {

            setLoginErrMsg(null);
            setLoginStatus(true);
            updateRootLoginStatus(true);
            sessionStorage.setItem('user', formData.username);
            if (sessionStorage.prevpage) {
                navigate(sessionStorage.prevpage, {replace: true}); // Redirect to the previous page
              } else {
                navigate("", { replace: true }); // Redirect to a default page if no previous location is available
              }
        }
        else {
            setLoginErrMsg(data.message);
            setLoginStatus(false);
            updateRootLoginStatus(false);
        }

    }
    return (
        <div className="login-page">
            <h2>Login</h2>
            {(loginErrMsg ?
                (<div className="alert alert-danger">
                    {loginErrMsg}
                </div>) : null)}
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                    <div className="form-outline">
                        <label htmlFor="username" name="username"> Username</label>
                        <br />
                        <input
                            type="text"
                            className="rounded-input"
                            name="username"
                            id="username"
                            placeholder="User name"
                            value={formData.username}
                            onChange={handleInputChange}
                        /><br />
                    </div>
                    <div className="form-outline">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            className="rounded-input"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        /><br />
                    </div><br />
                    <input type="hidden" name="action" value="login" />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <br />
                <p>Don't have an account? <a href="/createaccount">Create</a> one!</p>
            </div>
        </div>
    );
}

export default Login;
