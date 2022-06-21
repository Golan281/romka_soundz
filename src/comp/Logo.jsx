import logo from '.././logo.png';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
    return (
        <NavLink to="./home"><img src={logo} className="App-logo" alt="logo" width="100%" height="100%"/></NavLink>
        
    )
}