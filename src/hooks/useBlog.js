import { useState} from "react";
import {blogPosts} from "../lib/blogPosts";

export const useBlog = () => {
    const [posts, setPosts] = useState(blogPosts);
    return { posts, setPosts }
}
