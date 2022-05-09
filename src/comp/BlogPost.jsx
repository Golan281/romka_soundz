import React, {useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useModal } from "@chakra-ui/react";
//import icons to close post/modal
import { BlogContext } from './../contexts/BlogContext';
import { useBlog } from "../hooks/useBlog";

//each post will include: title, content, img, shareable unique link (with id?)

export const BlogPost = (props) => {
  // console.log(props)
  const { postID, title, desc, content, imgUrl, linkUrl, date } = props.props;
   // const nav = useNavigate();
   const { posts, setPosts } = useContext(BlogContext);
  //  console.log('all posts on blogPost comp>',posts)
  // const [{ postID, title, desc, content, imgUrl, linkUrl, date }] = props.props;
  // const { modalContent, setGlobalModalContent } = useModal();

  const onPostClick = () => {
    // console.log(`render global modal for post ${id}`);
    // console.log('current context>',modalData)
    // setModalData([title,snippet]);
    // setIsModalOpen(true);
    // console.log(modalContent);
//     on blogPost click:
// setGlobalModalContent(postContent)
// open the modal itself
  }
  // console.log('id on first load>',id);

  // const redirectToPost = (id) => {
  //   console.log('is id grabbed for url? >', id) //looks like it's working but not on click, it's done on the first render for each blog post - should it be on the grid comp?
  //   //the onclick func that will create/assign the post id as the url:
  //   nav(`/blog/${id}`);
  //   //then should open it in a modal/specific page that receives the post as a prop (look what I did in the notes app)
  // }
  // const postParams = () => {
  //   console.log("original ID>", id);
  //   return id;
  // };
  // const { blogId } = useParams();
  // console.log("params match id?", blogId);
  return (
    <div className="single-post"
    onClick={onPostClick}>
      <h1>{title}</h1>
      {/* <div onClick={redirectToPost(id)}> */}
      <div>
        <p className="rtl single-post-content">
          {desc}...
        </p>
        <img
          className="blog-img"
          src={imgUrl}
          alt={`${title}: blog post image`}
        ></img>
      </div>
    </div>
  );
};
