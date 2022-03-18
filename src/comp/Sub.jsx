import { React, useState } from "react";

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
  const handleSave = () => {
    console.log(formText);
    setFormText(formText);
  };
  return (
    <div className="input-form">
      <form onChange={handleChange}>
        <label type="text" htmlFor="firstName">
          <input
            className="input"
            name="firstName"
            // value={formText.firstName}
            type="text"
            htmlFor="firstName"
            placeholder="Add firstName here"
          ></input>
        </label>
        <label type="text" htmlFor="lastName">
          <input
            className="input"
            name="lastName"
            // value={formText.lastName}
            type="text"
            htmlFor="lastName"
            placeholder="Add lastName here"
          ></input>
        </label>
        <label type="text" htmlFor="email">
          <input
            className="input"
            name="email"
            // value={formText.email}
            id=""
            cols="20"
            rows="4"
            placeholder="Add email here"
          ></input>
        </label>
      </form>
      <button className="btn form-btn" onClick={handleSave}>
        <b>Submit</b>
      </button>
      <div></div>
    </div>
  );
};
