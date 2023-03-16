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
          console.log(result.text);
          console.log("Email has been sent");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          console.log("Error");
        }
      );
  };
  return (
    <form className="signup-form " ref={form} onSubmit={sendEmail}>
      <div className="form-group">
        <label>Your Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          name="user_name"
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          type="email"
          placeholder="example@example.com"
          name="user_email"
        />
      </div>
      <div className="form-group">
        <label>Feedback</label>
        <textarea
          className="form-control"
          name="message"
          placeholder="Your message..."
        />
      </div>
      <button className="btn btn-primary" value="submit" type="submit">
        Send
      </button>
    </form>
  );
}
export default Feedback;
