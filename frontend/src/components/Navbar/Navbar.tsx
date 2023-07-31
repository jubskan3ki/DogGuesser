import React from 'react';
import { NavLink,  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse ,faRightFromBracket , faTrophy ,faStar } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
        window.location.reload();
    }

    return (
        <div className="Navbar">
            <div>
                <NavLink to="/Home" className={({ isActive }) => (isActive ? 'selected' : '')} >
                    <FontAwesomeIcon icon={faHouse} />
                </NavLink>

                <NavLink to="/Ranking" className={({ isActive }) => (isActive ? 'selected' : '')}>
                    <FontAwesomeIcon icon={faTrophy} />
                </NavLink>

                <NavLink to="/Score" className={({ isActive }) => (isActive ? 'selected' : '')}>
                    <FontAwesomeIcon icon={faStar} />
                </NavLink>
            </div>

            <div onClick={handleLogout} className='selected'>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
        </div>
    );
};

export default NavBar;
