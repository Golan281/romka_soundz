import { React, useState } from "react";
import { APIcontrol } from "../config/fbaseCtrl";
import Swal from "sweetalert2";
import * as helperProps from "../lib/helpers"
import * as yup from 'yup';
import vibe_websize from '../img/vibe_websize.jpg';

export const Sub = () => {
  const [formText, setFormText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    didOptIn: false,
  });

  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  // }
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    // console.table(ev.target.name, ev.target.value)
    setFormText((formText) => {
      return {
        ...formText,
        [name]: value,
      };
    });
  };
  const handleSave = async () => {
    // console.table(formText);
    let schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      didOptIn: yup.bool().required(),
      });
    // const {firstName,lastName,email,didOptIn} = formText;
    // if (!firstName && !lastName && !email && !didOptIn) throw new Error('must fill all fields');
    
    // onSubmit()
    // console.log(formText);
    // setFormText(formText);
    try {
      const { firstName, lastName, email, didOptIn } = formText;
      const validateThenUploadSubscriber = async () => {
      schema.isValid({firstName: firstName, lastName: lastName, email: email, didOptIn: didOptIn})
      .then(async function (valid) {
        // console.log('isSchemaOK>',valid)
        if (valid === false) {
          Swal.fire({
            // title: "Couldn't upload post. Please fill out all required info and try again :)",
            title: `Please fill out all fields and select the checkbox to subscribe`,
            ...helperProps.swalProps,
          });
          return new Error(`Please fill out all fields and select the checkbox to subscribe`);
          //the curr error is not preventing the upload when mixcloud isnt a url -(b/c fBase continued the upload)
        }
        await APIcontrol.uploadSubscriber({firstName: firstName, lastName: lastName, email: email, didOptIn: didOptIn, date: helperProps.todayDate()}); //add consent checkbox?
        //   setProfilePic(postPic);
        // setInputs({}); //empty inputs
        // console.log(subscriber)
        Swal.fire({
            title: `Thanks for subscribing, ${firstName} :)`,
            ...helperProps.swalProps,
          });
          return valid; // => true
        });
      }
      validateThenUploadSubscriber();
      setFormText({
        firstName: "",
        lastName: "",
        email: "",
        didOptIn: false,
      });
     } catch (err) {
        // console.error(err);
        setFormText({
          firstName: "",
          lastName: "",
          email: "",
          didOptIn: false,
        });
        return err;

      } 
      Swal.fire({
        title: "Couldn't upload post",
        ...helperProps.swalProps,
      });
    }
  return (
    <div className="input-form">
      
      <form onChange={handleChange}
      // onSubmit={onSubmit}
      >
        <label type="text" htmlFor="firstName">
          <input
            className="input"
            name="firstName"
            value={formText.firstName}
            type="text"
            htmlFor="firstName"
            placeholder="First name"
            onChange={handleChange}
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
            onChange={handleChange}
            required
            ></input>
        </label>
        <label type="text" htmlFor="email">
          <input
            className="input"
            name="email"
            onChange={handleChange}
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
            formText.didOptIn = !formText.didOptIn;}}
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
      <button type="submit" className="btn form-btn" onClick={handleSave}>
        <b>Submit</b>
      </button>
      <div>
      <img src={vibe_websize} alt="romka in action" className="img" />
      </div>
    </div>
  );
};
