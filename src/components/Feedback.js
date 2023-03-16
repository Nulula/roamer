import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function Feedback() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zk5btyu",
        "template_6dlj8ph",
        form.current,
        "DkAal7YSr6TAYJ2tT"
      )
      .then(
        (result) => {
          console.log("Email has been sent");
        },
        (error) => {
          console.log("Error");
        }
      );
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}
export default Feedback;
