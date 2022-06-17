import React, { useState, useEffect } from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers";
import * as yup from 'yup';

export const Admin = () => {
//   const getSubs = async () => {
//     const subData = await APIcontrol.getPosts(APIcontrol.queryForSubs);
//     return subData;
// }

// console.log('grabbing subs:',getSubs());

  let schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    desc: yup.string().required(),
    linkUrl: yup.string().required(),
    imgUrl: yup.string().url().required(),
    });

  const defaultInputs = {
    title: "",
    content: "",
    desc: "",
    link: "",
    file: "",
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [linkInput, setLinkInput] = useState("");
  const [imgInput, setImgInput] = useState("");
  const handleLinkInput = (ev) => {
    setLinkInput(ev.target.value);
  };
  const handleImgInput = (ev) => {
    setImgInput(ev.target.value);
  };
  const handleChange = (ev) => {
    
    const { name, value, files } = ev.target;
    const userFile = files?.[0];
    setInputs((inputs) => {
      return {
        ...inputs,
        userFile,
        [name]: value,
      };
    });
  };
  const handleSave = async () => {
    Swal.fire({
      title: "Uploading post...",
      ...helperProps.swalProps,
    });
    try {
      const data = new FormData();
      data.append("pImg", inputs.userFile);
      const { title, content, desc, linkUrl, userFile } =
        inputs;
      const uploadPostPic = await APIcontrol.uploadPic(
        userFile
      );
      const { fileUrl, postID } = uploadPostPic;
      
      const validateThenUploadPost = async () =>{
        schema
      .isValid({
        imgUrl: fileUrl,
        postID: postID,
        title: title,
        content: content,
        desc: desc,
        linkUrl: linkUrl,
      })
      .then(async function (valid) {
        if (valid === false) {
          Swal.fire({
            title: `Error uploading post: Post must include all text, image and music link url fields`,
            ...helperProps.swalProps,
          });
          return new Error(`Error uploading post: must include all text, image and music link url fields`);
        }
        else {await APIcontrol.uploadPost({
          imgUrl: fileUrl,
          postID: postID,
          date: helperProps.todayDate(),
          title: title,
          content: content,
          desc: desc,
          linkUrl: linkUrl,
        });
        Swal.fire({
          title: `The post is live :)`,
          ...helperProps.swalProps,
        });

        return valid; 
      }
      });
      }
      validateThenUploadPost();
      setInputs(defaultInputs);
      setLinkInput("");
      setImgInput("");
      // });
    } catch (err) {
      Swal.fire({
        title: `Couldn't upload post. Please fill out all required info and try again :) ${err}`,
        ...helperProps.swalProps,
      });
    }
  };

  const handleLogin = async () => {
    const user = await APIcontrol.googleLogin();
    return user;
  };

  const handleSignout = async () => {
    await APIcontrol.signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    APIcontrol.authStateObserver((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    isLoggedIn ? (
      <div className="input-form">
        <form
          className="admin-form"
          onChange={handleChange}
        >
          <label htmlFor="title">
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Title"
              // value={inputs.title}
              value={inputs.title}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="content">
            <textarea
              className="input"
              type="text"
              name="content"
              placeholder="Post content"
              value={inputs.content}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="desc">
            <textarea
              className="input"
              type="text"
              name="desc"
              placeholder="Post description"
              value={inputs.desc}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="linkUrl">
            <textarea
              className="input"
              type="text"
              name="linkUrl"
              placeholder="Mixcloud embed link"
              value={imgInput}
              onChange={handleImgInput}
              required
            />
          </label>
          <label htmlFor="img-file">
            <input
              className="input"
              type="file"
              accept="image/*"
              name="imgFile"
              id="imgFile"
              value={linkInput}
              onChange={handleLinkInput}
              required
            />
          </label>
        </form>
        <button
          className="btn profile-pg"
          onClick={handleSave}
        >
          <b>Upload</b>
        </button>
        <button
          className="btn profile-pg"
          onClick={handleSignout}
        >
          <b>Sign out</b>
        </button>
      </div>
    ) : (
      <div className="admin-form">
        <button
          className="btn profile-pg"
          onClick={handleLogin}
        >
          Login
        </button>
        To upload posts :)
      </div>
    )
  );
};
