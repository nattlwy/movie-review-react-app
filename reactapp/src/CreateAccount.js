import { useEffect, useState } from "react";
import postForm from "./postForm";
import { useNavigate } from 'react-router-dom';
import './style.css';

function CreateAccount () {
    const navigate = useNavigate();
    const defaultColor = "#7378c5";
    const [validateUsername, setValidateUsername] = useState(null);
    const [passwordLengthColor, setPasswordLengthColor] = useState(defaultColor);
    const [capitalColor, setCapitalColor] = useState(defaultColor);
    const [smallColor, setSmallColor] = useState(defaultColor);
    const [numColor, setNumColor] = useState(defaultColor);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [applyStyle, setApplyStyle] = useState(false);
    const [hideErrorMsg, setHideErrorMsg] = useState(true);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        if (e.target.name === 'password') { setApplyStyle(true) };
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await postForm(formData, 'http://localhost:3300/createaccount');
        const data = await res.json();
        console.log(data.created);
        if (data.created) {
            navigate("/successful", {replace: true});
         } else {
            setHideErrorMsg(false)
        };
    }

    // account fields validation
    useEffect(() => {
        if (applyStyle) {
            const numColor = /\d/.test(formData.password) ? "green": "crimson";
            const capColor = /[A-Z]/.test(formData.password) ? "green": "crimson";
            const smallColor = /[a-z]/.test(formData.password) ? "green": "crimson";
            const passwordLengthColor = formData.password.length >= 8 ? "green" : "crimson";
            [numColor, capColor, smallColor, passwordLengthColor].includes("crimson") ?
                setPasswordValidation(false)
                : setPasswordValidation(true);
            formData.username.length > 0 ? (setValidateUsername(true)) : (setValidateUsername(false));
            setNumColor(numColor);
            setCapitalColor(capColor);
            setSmallColor(smallColor);
            setPasswordLengthColor(passwordLengthColor);
        }
    }, [formData])

    return (
        <div className="create-account-page">
        <h2>Enter account information below</h2>
        <div className="form-group">

        {/* {!passwordValidation ? (<div className="alert alert-danger">Password entered did not meet all requirements.</div>) : null} */}
        {hideErrorMsg ? null : (<div className="alert alert-danger">Unable to create account: Username already used.</div>)}
        <form onSubmit={handleSubmit}>
            <div className="form-outline">
                <label htmlFor="username" name="username">Username</label><br />
                <input type="text" className="rounded-input" name="username" id="username" placeholder="Username" onChange={handleInputChange} required />
            </div>
            <div className="form-outline">
                <label htmlFor="password" name="password">Password</label><br />
                <input type="text" className="rounded-input" name="password" id="password" placeholder="Password" onChange={handleInputChange} required />
            </div><br />
            <ul className="list-account-set-up-rules">
                <li style={{color: passwordLengthColor}}>Password must have at least 8 characters</li>
                <li style={{color: capitalColor}}>Password must contain capital letter</li>
                <li style={{color: smallColor}}>Password must contain smaller letter</li>
                <li style={{color: numColor}}>Password must contain number</li>
            </ul>
            <input type="hidden" name="action" value="create" />
            {passwordValidation ? (<input type="submit" className="btn btn-primary" value="Create" />)
            : (<input type="submit" className="btn btn-primary" value="Create" disabled/>)
            }
        </form>
    </div>
    </div>
    );
}

export default CreateAccount;
