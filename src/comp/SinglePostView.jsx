import React, {useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIcontrol } from "../config/fbaseCtrl";

export const SinglePostView = () => {
  const nav = useNavigate();
  const { postID } = useParams();
  const [singlePost, setSinglePost] = useState();
  // const [err, setErr] = useState();

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
      const getPost = async () => 
      {
        let doesPostExist;
        const post = await getPosts((queryForSinglePost(postID)));
        if (post[0]?.title === undefined) {
          doesPostExist = false;
          nav('/blog/undefined')
        } else {
          doesPostExist = true;
          setSinglePost(post);
          return doesPostExist;
        }
        // console.table({singlePost, doesPostExist}); 
        //handle the err here - if didnt fetch any post ID
      
        return post;
      }
      const isPostOk = await getPost();
      return isPostOk;
        
    } catch (err) {
      // setErr(err?.response?.data?.message);
      setSinglePost({title:err})
      return err;
    }
  }
  useEffect(() => {
    let isMounted = true;  
    if (isMounted) handlePosts();
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, []);
  // 
  // console.table(singlePost?.[0],err);
  // console.log("params match title?", title);
  //fetch just the one post matching the title/postID
  // const titleForIframe = (singlePost[0].title === )


  //check if theres a valid iframe link or render without it: singlePost.link && 
  // console.log(singlePost)
  return (
    <div className="single-post-view">
      {(singlePost) ? 
      (<div className="single-post-view-flex">
        <h1>{singlePost[0].title}</h1>
        <div className="blog-txt-formatted">
        <p className="rtl single-post-content">{singlePost[0].content}</p>

        <iframe title={singlePost[0].title} className="iframe-box-mini" width="90%" height="60" src={singlePost[0].linkUrl} frameBorder="0" ></iframe>
        <img className="img" src={singlePost[0].imgUrl} alt="to accompany the title"></img>
        <p>{dateConverter(singlePost[0].date)}</p>
        </div>
      </div>)
       : 'Loading...'} 
    </div>
  );
};
