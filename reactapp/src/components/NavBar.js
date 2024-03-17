import { useEffect, useState } from "react";

export default function NavBar({ loggedIn, updateRootLoginStatus, updateRootSearchText }) {
    const [isHomeOrMoviePage, setIsHomeOrMoviePage] = useState(true);

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsHomeOrMoviePage(true)
        }
        else {
            setIsHomeOrMoviePage(false);
        }
    }, []);

    const handleInputChange = (e) => {
        updateRootSearchText(e.target.value);
    }

    return (
        <nav id="list" className="navbar navbar-expand-lg navbar-light">
            <div>
                <ul className="navbar-nav mr-auto" />
            </div>
            {! sessionStorage.user ?
                (<ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/createaccount">Create account</a>
                    </li>
                </ul>)
                : (<ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <form onSubmit={() => {
                            sessionStorage.removeItem('user');
                            updateRootLoginStatus(false);
                        }}>
                            <input type="submit" className="nav-link" name="logout" value="Logout" />
                        </form>
                    </li>
                </ul>)}
                { isHomeOrMoviePage ?
                    (<input type="text" id="search" className="search" placeholder="Search movies..." onChange={handleInputChange}/>)
                    : null
                }
        </nav>
    );
}
