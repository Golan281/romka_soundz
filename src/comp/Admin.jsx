import React, { useState, useEffect } from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers";
import * as yup from 'yup';

export const Admin = () => {
  let schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    desc: yup.string().required(),
    linkUrl: yup.string().url().required(),
    imgUrl: yup.string().url().required(),
    });

  const defaultInputs = {
    title: "",
    content: "",
    desc: "",
    link: "",
    file: "",
  };
  // const [isPgLoading, setIsPgLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [adminPgErr, setAdmingPgErr] = useState(null);
  // const [isAuth, setIsAuth] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [linkInput, setLinkInput] = useState("");
  const [imgInput, setImgInput] = useState("");
  // const ref = useRef();
  // const resetInputs = () => ref.current.value="";
  // const resetInputs = () => setInputs("");
  // const [profilePic,setProfilePic] = useState();
  // const userInfo = { uid: "fakeAuthContext" };
  const handleLinkInput = (ev) => {
    setLinkInput(ev.target.value);
  };
  const handleImgInput = (ev) => {
    setImgInput(ev.target.value);
  };
  const handleChange = (ev) => {
    
    const { name, value, files } = ev.target;
    const userFile = files?.[0];
    // console.log(files?.[0]);
    setInputs((inputs) => {
      return {
        ...inputs,
        userFile,
        [name]: value,
      };
    });
  };
  const handleSave = async () => {
    // console.log(inputs);
    
    
    Swal.fire({
      title: "Uploading post...",
      ...helperProps.swalProps,
    });
    // const isAdmin = "resp from fbase";
    // if (!isAdmin)
    //   throw new Error(
    //     "You are not authorized to upload, please contact the webmaster"
    //   );
    try {
      const data = new FormData();
      data.append("pImg", inputs.userFile);
      //upload the image seperately and get the url, then deledte it from the input obj

      const { title, content, desc, linkUrl, userFile } =
        inputs;
      const uploadPostPic = await APIcontrol.uploadPic(
        userFile
      );
      // console.log(uploadPostPic); //think of a diff way to save this variable

      const { fileUrl, postID } = uploadPostPic;
      
      const validateThenUploadPost = async () =>{
        schema
      .isValid({
        imgUrl: fileUrl,
        postID: postID,
        // date: helperProps.todayDate(),
        title: title,
        content: content,
        desc: desc,
        linkUrl: linkUrl,
      })
      .then(async function (valid) {
        // console.log('isSchemaOK>',valid)
        if (valid === false) {
          Swal.fire({
            // title: "Couldn't upload post. Please fill out all required info and try again :)",
            title: `Error uploading post: Post must include all text, image and music link url fields`,
            ...helperProps.swalProps,
          });
          return new Error(`Error uploading post: must include all text, image and music link url fields`);
          //the curr error is not preventing the upload when mixcloud isnt a url -(b/c fBase continued the upload)
        }
        //if valid is true - only the permission err should occur (if/when)
        // setAdmingPgErr('You are not authorized, please contact the webmaster');
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

        return valid; // => true
      }
      });
      }
      validateThenUploadPost();
      // console.log(uploadPost); 
      // setAdmingPgErr(uploadPost);
      setInputs(defaultInputs);
      setLinkInput("");
      setImgInput("");
      // Swal.fire({
      //   title: `The post is live :)`, //you are not authroized
      //   ...helperProps.swalProps,
      // });
    } catch (err) {
      // setInputs(defaultInputs);
      // setLinkInput("");
      // setImgInput("");
      // console.error(err);
      Swal.fire({
        title: `Couldn't upload post. Please fill out all required info and try again :) ${err}`,
        // title: `${adminPgErr}`,
        ...helperProps.swalProps,
      });
    }
  };

  const handleLogin = async () => {
    const user = await APIcontrol.googleLogin();
    return user;
    //catch err: sorry, only admins are allowed. Please contact the db admin.
  };

  const handleSignout = async () => {
    await APIcontrol.signOut();
    setIsLoggedIn(false);
    // console.log('logout')
  };

  useEffect(() => {
    APIcontrol.authStateObserver((user) => {
      if (user) {
        // console.log(`User`, user);
        setIsLoggedIn(true);
        // setUserInfo(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    // (isAuth) ? (<div>

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
              // defaultValue={inputs.link}
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
    // </div>) : (<p></p>)
  );
};
