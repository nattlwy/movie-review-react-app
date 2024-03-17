import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Successful () {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(function () {
            navigate('/login', {replace: true})
        }, 3000)
    }, []);

    return (
        <div className="create-successful">
            <h2>Create Account Successful</h2>
            <p>You will be redirect shortly ...</p>
        </div>
    );
}

export default Successful;
