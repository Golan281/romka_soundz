//make logo clickable to get back to home
import logo from '.././logo.png';
import { Link, NavLink } from 'react-router-dom';

export const Logo = () => {
    return (
        <NavLink to="./home"><img src={logo} className="App-logo" alt="logo" /></NavLink>
        
    )
}