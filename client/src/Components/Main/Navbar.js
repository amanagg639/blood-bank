import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DropDown from "../Util/DropDown";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
    const s1 =
        "bg-white-900 drop-shadow-lg mx-3 px-7 py-2 rounded-md text-base font-medium hover:drop-shadow-xl hover:px-10 dark:hover:bg-midnight dark:hover:drop-shadow-dark-lg";
    
    const [theme, setTheme] = useState(0);
    const { getLoggedIn } = useContext(AuthContext);
    const API_URL = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || 0;
        setTheme(Number(storedTheme));
        if (Number(storedTheme) === 1) {
            document.documentElement.classList.add("dark");
        }
    }, []);
    
    const handleThemeToggle = () => {
        const newTheme = theme === 1 ? 0 : 1;
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        if (newTheme === 1) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
            await getLoggedIn();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <>
            <nav className="p-3 bg-white-900 sticky top-0 z-10 dark:bg-gray-bg">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <div className="flex items-center justify-between">
                            <img
                                className="h-8 w-auto ml-6"
                                src={logo}  // Use the logo from your assets
                                alt="Your Company"
                                draggable={false}
                            />
                            <div className="text-2xl font-bold ml-2 text-blood">
                                BloodBridge
                            </div>
                        </div>
                    </Link>
                    <div className="flex items-center justify-between">
                        <>
                            <DropDown title="About Us" children={["Home", "About BloodBridge", "Contact Us"]} links={["/", "/about", "/contactUs"]} />
                            {props.logIn ? (
                                <>
                                    <Link to={`/${props.user}/profile`} className={s1}>
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                    <Link to="/" onClick={handleLogout} className={s1}>
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <DropDown title="Looking For Blood" children={["Patient Login/Register", "Blood Bank Directory"]} links={["/register/patient", "/bloodDirect"]} />
                                    <DropDown title="Want To Donate Blood" children={["Donor Login/Register", "Blood Donation Camps", "About Blood Donation"]} links={["/register/donor", "/bloodCamps", "/aboutBloodDonation"]} />
                                    <DropDown title="Blood Bank Login" children={["Login", "Add Your Bloodbank"]} links={["/login/bank", "/register/bank"]} />
                                </>
                            )}
                            <button
                                className="mx-2 px-3 py-2 rounded-full hover:shadow-lg"
                                onClick={handleThemeToggle}
                            >
                                <i className={`dark:text-white-900 fa-solid fa-lg fa-${theme === 0 ? "sun" : "moon"}`}></i>
                            </button>
                        </>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
