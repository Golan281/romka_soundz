import React from "react";
//import icons to close post/modal

//each post will include: title, content, img, shareable unique link (with id?)

export const BlogPost = (props) => {
    const {title, snippet, imgSrc} = props.props;
  return (
    <div className="single-post">
      <h1>{title}</h1>
      <div>
        <p className='rtl single-post-content'>{snippet}...</p>
        <img className='blog-img' src={imgSrc} alt={`${imgSrc}`}></img>
        {/* <p>{urlParam}</p> */}
      </div>
    </div>
  );
};
