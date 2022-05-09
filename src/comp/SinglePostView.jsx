import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIcontrol } from "../config/fbaseCtrl";
// import iframe
// import blogpost?

export const SinglePostView = () => {
  const { postID } = useParams();
  const [singlePost, setSinglePost] = useState();
  const [err, setErr] = useState();

  const handlePosts = async () => {
    console.log('should be postID>',postID)
    const { getPosts, queryForSinglePost } = APIcontrol;
    try {
      // const fetchPost = async () => {
      //   const post = await getPosts((queryForSinglePost(postID)));
      //   setSinglePost(post);
      //  };
      const post = await getPosts((queryForSinglePost(postID)));
      console.log('fteched base post>',post)
      setSinglePost(post);
      return post;
    } catch (err) {
      setErr(err?.response?.data?.message);
    }
  }
  useEffect( async () => {
    await handlePosts();
    
  },[]);
  // 
  console.log(singlePost?.[0]);
  // console.log("params match title?", title);
  //fetch just the one post matching the title/postID
  // const titleForIframe = (singlePost[0].title === )
  return (
    <div className="single-post-view">
      {(singlePost) ? 
      (<div>
        <h1>{singlePost[0].title}</h1>
        <p className="rtl single-post-content">{singlePost[0].content}</p>
        <img src={singlePost[0].imgUrl}></img>
        <p>{singlePost[0].date}</p>
        <iframe className="iframe-box-mini" width="90%" height="60" src={singlePost[0].linkUrl} frameBorder="0" ></iframe>
      </div>)
       : 'Loading...'} 
    </div>
  );
};
