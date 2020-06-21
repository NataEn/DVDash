import React, { useState } from "react";
const RegistrationForm = () => {
  const postUrl = `${process.env.REACT_APP_APISERVER}/users/register`;
  return (
    <>
      <h1>Get in Touch</h1>
      <form action={`${postUrl}`} method="POST">
        <div>
          <a href="mailto:info@mysite.com">info@mysite.com</a>
          <a href="tel:123-456-7890">123-456-7890</a>
        </div>
        <div>
          <p>500 Terry Francois Street</p>
          <p>San Francisco, CA94158</p>
        </div>
        <div>
          <input type="text" name="FN" placeholder="First Name" required />
          <input type="email" name="mail" placeholder="Email" required />
        </div>
        <div>
          <input type="text" name="LN" placeholder="Last Name" required />
          <input type="text" name="Phone" placeholder="Phone" required />
        </div>
        <textarea
          type="text"
          name="message"
          placeholder="Type your message here..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default RegistrationForm;
