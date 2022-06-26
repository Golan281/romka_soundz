import React, {
  useState,
  useEffect,
  useContext,
  Suspense,
} from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import { Outlet } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import Loading from 'react-simple-loading';
// import env from "react-dotenv";
const BlogPost = React.lazy(() => import("./BlogPost"));


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
          <Suspense fallback={<Loading 
    color={'#54ABAB'}
    stroke={'10px'}
    size={'100px'} />}>
          <BlogPost
            props={eachPost}
          ></BlogPost>
          </Suspense>
        </div>
      ))}
      <Outlet />
    </div>
  );
};
