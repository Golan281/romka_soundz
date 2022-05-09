import { useState, useCallback } from "react";
import {blogPosts} from "../lib/blogPosts";

export const useBlog = () => {
    const [posts, setPosts] = useState(blogPosts);
    // const toggleModal = () => {
    //     setModalData([title, text]);
    //     setIsOpen(!isOpen);
    //   }
    // return { isOpen, onOpen, onClose , modalContent, setGlobalModalConten };
    return { posts, setPosts }
}
