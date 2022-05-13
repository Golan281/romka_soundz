import React from "react";
import { NavLink } from "react-router-dom";


export const BlogPost = (props) => {
  const { title, desc, imgUrl, postID} = props.props;

  return (
    <div className="single-post"
    >
    <NavLink 
        to={`./${postID}`}
        >

      <h1>{title}</h1>
      <div>
        <p className="rtl single-post-content">
          {desc}...
        </p>
        <img
          className="blog-img"
          src={imgUrl}
          alt={`${title}: blog post`}
          ></img>
      </div>
      </NavLink>
    </div>
  );
};
