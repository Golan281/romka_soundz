import Line from "./UIkit/Line";
import { NavLink } from 'react-router-dom';

export const GlobalNav = () => {
    return (
        <Line>
            <nav>
            <NavLink to="./about"><button className="btn">Romka</button></NavLink>
            <NavLink to="./music"><button className="btn">Music</button></NavLink>
            <NavLink to="./blog"><button className="btn">Blog</button></NavLink>
            </nav>
            {/* <a href="#"><button className="btn">Romka</button></a>
            <a href="#"><button className="btn">Music</button></a>
            <a href="#"><button className="btn">Blog</button></a> */}
        </Line>
    )
};