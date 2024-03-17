import { useState, useEffect, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import Header from './components/Header';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from './Movie';
import NavBar from './components/NavBar';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Successful from './Successful';
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

function App(props) {
  // 1 = yes, 0 = default (never attempted), -1 = fail
  // pass setLoggedIn to login and logout app for updating login status
  const [loggedIn , setLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleUpdateLoginStatus = (status) => {
    setLoggedIn(status);
  }
  const handleUpdateSearchText = (text) => {
    setSearchText(text);
  }

  const [theme, setTheme] = useState(localStorage.getItem('mode') || 'dark');

  const toggleTheme = () => {
      const newMode = theme === 'light' ? 'dark' : 'light';
      setTheme(newMode);
      localStorage.setItem('mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="App" id={theme}>
      <Header />
      <NavBar
        loggedIn={ loggedIn }
        updateRootLoginStatus={ handleUpdateLoginStatus }
        updateRootSearchText = {handleUpdateSearchText}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home searchText={searchText} loggedIn={loggedIn}/>} />
          <Route path="/login" element={<Login loggedIn={loggedIn} updateRootLoginStatus={ handleUpdateLoginStatus }/>} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="movie/:movieId" element={<Movie loggedIn={loggedIn}/>} />
          <Route path="/successful" element={<Successful/>} />
        </Routes>
      </BrowserRouter>
      <div className="switch">
        <label> {theme === "light" ? "Light" : "Dark"}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
