import Line from "./UIkit/Line";
import { NavLink } from "react-router-dom";

export const GlobalNav = () => {
  return (
    <Line>
      <nav className="nav-grid">
        <NavLink to="./about">
          <button className="btn">About</button>
        </NavLink>
        <NavLink to="./music">
          <button className="btn">Music</button>
        </NavLink>
        <NavLink to="./blog">
          <button className="btn">Blog</button>
        </NavLink>
        <NavLink to="./subscribe">
          <button className="btn">Subscribe</button>
        </NavLink>
      </nav>
    </Line>
  );
};
