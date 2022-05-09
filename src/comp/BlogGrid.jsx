// import Grid from './UIkit/Grid';
//import blogArr & map here
import React, { useState, useEffect, useContext } from "react";
import { BlogPost } from "./BlogPost";
import { APIcontrol } from "../config/fbaseCtrl";
// const axios = require('axios'); ===don't forget npm uninstall
// import { useParams } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";
//blog images here: (how can I make it even easier?)

import { axios } from 'axios';
import { BlogContext } from "../contexts/BlogContext";
import {blogPosts} from "../lib/blogPosts";

export const BlogGrid = () => {
  const [err, setErr] = useState("");
  // const [posts, setPosts] = useState(blogPosts);
  const { posts, setPosts } = useContext(BlogContext);
  const handlePosts = async () => {
    try {
      const allPosts = await APIcontrol.getPosts(APIcontrol.queryForAll);
      // const { fetchedPosts, lastKey } = allPosts;
      console.log('base posts>',allPosts)
      setPosts([...blogPosts, ...allPosts]);
      return allPosts;
    } catch (err) {
      setErr(err?.response?.data?.message);
    }
  }
  useEffect(async () => {
    await handlePosts();
    // console.log(posts)
    
  },[]);

    console.log(posts)

  


  const param = useParams();
  const nav = useNavigate();
  //this means a route path of "/:param" for the blog param
  // const redirectToPost = (id) => {
  //   console.log('is id grabbed for url? >', id) //looks like it's working but not on click, it's done on the first render for each blog post - should it be on the grid comp?
  //   //the onclick func that will create/assign the post id as the url:
  //   nav(`/blog/${id}`);
  //   //then should open it in a modal/specific page that receives the post as a prop (look what I did in the notes app)
  // }
  return (
    <div key="blog-grid" className="blog-grid">
      {/* <ReactModal /> */}
      {/* <Modl /> */}
      {posts.map((eachPost) => (
        <NavLink 
        to={`./${eachPost.postID}`} 
        key={eachPost.id}>
          <BlogPost
            key={eachPost.id}
            props={eachPost}
            // onClick={onPostClick} //not working on the grid page
            >
          {/* <Modl /> */}
          </BlogPost>
        </NavLink>
        ))}
        <Outlet />
        {/* <Outlet /> //breaks code for some reason */} 
    </div>
  );
};
