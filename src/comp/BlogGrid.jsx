
import React, { useState, useEffect, useContext } from "react";
import { BlogPost } from "./BlogPost";
import { APIcontrol } from "../config/fbaseCtrl";
import {
  NavLink,
  Outlet,
} from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";

export const BlogGrid = () => {
  const [err, setErr] = useState("");
  const { posts, setPosts } = useContext(BlogContext);
  const handlePosts = async () => {
    try {
      const allPosts = await APIcontrol.getPosts(APIcontrol.queryForAll);
      // console.log('base posts>',allPosts)
      setPosts([...allPosts]);
      return allPosts;
    } catch (err) {
      setErr(err?.response?.data?.message);
    }
    console.log(err)
  }
  useEffect(() => {
    handlePosts();
    // console.log(posts)
    // eslint-disable-next-line
  },[]);


  return (
    <div key="blog-grid" className={(posts.length === 1) ? "blog-grid  one-post" : "blog-grid"}>
      {posts.map((eachPost) => (
        <NavLink 
        to={`./${eachPost.postID}`} 
        key={eachPost.id}>
          <BlogPost
            key={eachPost.id}
            props={eachPost}
            >
          </BlogPost>
        </NavLink>
        ))}
        <Outlet />
    </div>
  );
};
