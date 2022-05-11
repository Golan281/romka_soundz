import React, { useState, useEffect } from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers";

export const Admin = () => {
  // const [isPgLoading, setIsPgLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  const [inputs, setInputs] = useState({title: '', content: '',desc: '',link: '', file:''});
  const [linkInput, setLinkInput] = useState('');
  const [imgInput, setImgInput] = useState('');
  // const ref = useRef();
  // const resetInputs = () => ref.current.value="";
  // const resetInputs = () => setInputs("");
  // const [profilePic,setProfilePic] = useState();
  // const userInfo = { uid: "fakeAuthContext" };
  const handleLinkInput = (ev) => {
    setLinkInput(ev.target.value);
  }
  const handleImgInput = (ev) => {
    setImgInput(ev.target.value);
  }
  const handleChange = (ev) => {
    const { name, value, files } = ev.target;
    const userFile = files?.[0];
    console.log(files?.[0]);
    // const picMsg = userFile ? 'Image added' : 'Error, please try again'; //to add to swal
    setInputs((inputs) => {
      return {
        ...inputs,
        userFile,
        [name]: value,
      };
    });
  };
  const handleSave = async () => {
    console.log(inputs);
    try {
      const data = new FormData();
      data.append("pImg", inputs.userFile);
      //upload the image seperately and get the url, then deledte it from the input obj
      
      
      const { title, content, desc, linkUrl, userFile } = inputs;
      const uploadPostPic = await APIcontrol.uploadPic(userFile);
      console.log(uploadPostPic); //think of a diff way to save this variable
      const { fileUrl, postID } = uploadPostPic;
      const uploadPost = await APIcontrol.uploadPost({
        imgUrl: fileUrl,
        postID: postID,
        date: helperProps.todayDate(),
        title: title,
        content: content,
        desc: desc,
        linkUrl: linkUrl,
      });
      //   setProfilePic(postPic);
      // resetInputs();
      console.log(uploadPost);
      setInputs({title: '', content: '',desc: '',link: '', file:''});
      setLinkInput('');
      setImgInput('');
      Swal.fire({
        title: "The post is live :)",
        ...helperProps.swalProps,
      });
    } catch (err) {
      // setInputs('title'); //empty inputs
      // resetInputs();
      setInputs({title: '', content: '',desc: '',link: '', file:''});
      setLinkInput('');
      setImgInput('');
      console.error(err);
      Swal.fire({
        title: "Couldn't upload post",
        ...helperProps.swalProps,
      });
    }
  };

  const handleLogin = async () => {
    const user = await APIcontrol.googleLogin();
    return user;
    //catch err: sorry, only admins are allowed. Please contact the db admin.
  }
  
  const handleSignout = async () => {
    await APIcontrol.signOut();
    setIsLoggedIn(false);
    // console.log('logout')
  }

  useEffect(() => {
    APIcontrol.authStateObserver((user) => {
        if (user) {
          console.log(`User`, user);
          setIsLoggedIn(true);
          // setUserInfo(user);
        } else {
          setIsLoggedIn(false);
        }
      });
    }, []);
  return (
    // (isAuth) ? (<div>

    (isLoggedIn) ? (    <div className="input-form">
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
        <input
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
  </div>)
  : (    <div className="admin-form">
    <button className="btn profile-pg" onClick={handleLogin}>Login</button>
      To upload posts :)

      </div>)
        // </div>) : (<p></p>)

  );
};
