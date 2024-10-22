import React from "react";
import "../styles/fixed-bg.css";
import "../styles/style.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "a433efb8-2030-459e-a196-13d70a2ea920");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      window.location.reload();
    }
  };

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Thank you for contacting us!",
      text: "We have received your message.",
      icon: "success",
    });
  };

  return (
    <>
      <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 contact d-flex justify-content-center p-5 fixed-bg">
        <form
          className="col-sm-12 col-md-10 col-lg-6 col-xl-6"
          onSubmit={onSubmit}
        >
          <h1 className="mb-4 text-center">Contact Us</h1>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="form4Example1"
              className="form-control"
              placeholder="Enter you name"
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="form4Example2"
              className="form-control"
              placeholder="Enter you email"
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example3">
              Message
            </label>
            <textarea
              className="form-control"
              name="message"
              id="form4Example3"
              rows="4"
              placeholder="Enter you message"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              data-mdb-ripple-init
              type="submit"
              onClick={showSwal}
              className="btn btn-lg btn-outline-warning mb-4"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default contact;
