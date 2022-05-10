import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIcontrol } from "../config/fbaseCtrl";
// import iframe
// import blogpost?

export const SinglePostView = () => {
  const { postID } = useParams();
  const [singlePost, setSinglePost] = useState();
  const [err, setErr] = useState();

  const dateConverter = (date) => {
    const convertedDate = new Date(Date.parse(date));
    return `${convertedDate.getFullYear()}-${convertedDate.getMonth()+1}-${convertedDate.getDate()}`;
  }
  const handlePosts = async () => {
    const { getPosts, queryForSinglePost } = APIcontrol;
    try {
      // const fetchPost = async () => {
      //   const post = await getPosts((queryForSinglePost(postID)));
      //   setSinglePost(post);
      //  };
      const post = await getPosts((queryForSinglePost(postID)));
      setSinglePost(post);
      return post;
    } catch (err) {
      setErr(err?.response?.data?.message);
    }
  }
  useEffect(() => {
    handlePosts();
    // eslint-disable-next-line
  },[]);
  // 
  console.table(singlePost?.[0],err);
  // console.log("params match title?", title);
  //fetch just the one post matching the title/postID
  // const titleForIframe = (singlePost[0].title === )


  //check if theres a valid iframe link or render without it: singlePost.link && 
  return (
    <div className="single-post-view">
      {(singlePost) ? 
      (<div>
        <h1>{singlePost[0].title}</h1>
        <p className="rtl single-post-content">{singlePost[0].content}</p>
        <img src={singlePost[0].imgUrl} alt="to accompany the title"></img>
        <p>{dateConverter(singlePost[0].date)}</p>
        <iframe title={singlePost[0].title} className="iframe-box-mini" width="90%" height="60" src={singlePost[0].linkUrl} frameBorder="0" ></iframe>
      </div>)
       : 'Loading...'} 
    </div>
  );
};
