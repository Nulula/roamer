import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.success("Your message has been sent");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          toast.error("There was an error sending your message");
          form.current.reset();
        }
      );
  };
  return (
    <form className="feedback-form" ref={form} onSubmit={sendEmail}>
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
