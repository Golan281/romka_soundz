import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { BlogPost } from "./BlogPost";
import { APIcontrol } from "../config/fbaseCtrl";
import { Outlet } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";

export const BlogGrid = () => {
  const [err, setErr] = useState("");
  const { posts, setPosts } = useContext(BlogContext);
  const handlePosts = async () => {
    try {
      const allPosts = await APIcontrol.getPosts(
        APIcontrol.queryForAll
      );
      setPosts([...allPosts]);
      return allPosts;
    } catch (err) {
      setErr(err?.response?.data?.message);
    }
    console.log(err);
  };
  useEffect(() => {
    handlePosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={
        posts.length <= 2
          ? "blog-grid-one-post"
          : "blog-grid"
      }
    >
      {posts.map((eachPost) => (
        <div
        key={eachPost.postID}
        >
          <BlogPost
            props={eachPost}
          ></BlogPost>
        </div>
      ))}
      <Outlet />
    </div>
  );
};
