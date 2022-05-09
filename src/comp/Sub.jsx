import { React, useState } from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers"

export const Sub = () => {
  const [formText, setFormText] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormText((formText) => {
      return {
        ...formText,
        [name]: value,
      };
    });
  };
  const handleSave = async () => {
    // console.log(formText);
    // setFormText(formText);
    try {
      const subscriber = await APIcontrol.uploadSubscriber({...formText
      }); //add consent checkbox?
      //   setProfilePic(postPic);
      // setInputs({}); //empty inputs
      setFormText({
        firstName: "",
        lastName: "",
        email: "",
      });
      Swal.fire({
        title: `Thanks for subscribing, ${formText.firstName} :)`,
        ...helperProps.swalProps,
      });
    } catch (err) {
      console.error(err);
      setFormText({
        firstName: "",
        lastName: "",
        email: "",
      });
      Swal.fire({
        title: "Couldn't upload post",
        ...helperProps.swalProps,
      });
    }
  };
  return (
    <div className="input-form">
      <form onChange={handleChange}>
        <label type="text" htmlFor="firstName">
          <input
            className="input"
            name="firstName"
            value={formText.firstName}
            type="text"
            htmlFor="firstName"
            placeholder="First name"
            required
            ></input>
        </label>
        <label type="text" htmlFor="lastName">
          <input
            className="input"
            name="lastName"
            value={formText.lastName}
            type="text"
            htmlFor="lastName"
            placeholder="Last Name"
            required
          ></input>
        </label>
        <label type="text" htmlFor="email">
          <input
            className="input"
            name="email"
            value={formText.email}
            id=""
            cols="20"
            rows="4"
            placeholder="Email address"
            required
          ></input>
          <label>
          <input type="checkbox"
          name="checkbox"
          htmlFor="checkbox"
          required></input> 
            I agree to
          </label>
        </label>
      </form>
      <button className="btn form-btn" onClick={handleSave}>
        <b>Submit</b>
      </button>
      <div></div>
    </div>
  );
};
