import { React, useState } from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers"

export const Sub = () => {
  const [formText, setFormText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    didOptIn: false,
  });
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    console.table(ev.target.name, ev.target.value)
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
        didOptIn: false,
      });
      console.log(subscriber)
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
        didOptIn: false,
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
            onChange={()=>console.log('onChng')}
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
            onChange={()=>console.log('onChng')}
            required
            ></input>
        </label>
        <label type="text" htmlFor="email">
          <input
            className="input"
            name="email"
            onChange={()=>console.log('onChng')}
            value={formText.email}
            id=""
            cols="20"
            rows="4"
            placeholder="Email address"
            required
          ></input>
          <label>
            <p></p>
          <input 
          className="checkbox"
          type="checkbox"
          name="checkbox"
          onChange={()=>{
            formText.didOptIn = !formText.didOptIn;
             console.log(formText.didOptIn)}}
            value={formText.didOptIn}
          htmlFor="checkbox"
          required></input> 
          <br></br>
          <p className="concent-p">
          <b>Yes, I want to receive occasional email updates from Romka!</b>
          <br></br>
          Your privacy is highly respected. The updates will only include relevant news about new music and shows.
          </p>
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
